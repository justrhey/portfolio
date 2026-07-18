import { useEffect, useRef } from "react";
import { skillGraph } from "../data.js";

// Build node/link graph from the grouped skill data.
function buildGraph() {
  const nodes = [];
  const links = [];
  const byId = {};
  const color = { center: "#0b1b3a" };

  const add = (id, group, kind) => {
    const n = { id, label: id, group, kind, x: 0, y: 0, vx: 0, vy: 0 };
    nodes.push(n);
    byId[id] = n;
    return n;
  };

  add(skillGraph.center, "center", "center");
  skillGraph.groups.forEach((g) => {
    color[g.name] = g.color;
    add(g.name, g.name, "hub");
    links.push({ a: skillGraph.center, b: g.name });
    g.skills.forEach((s) => {
      add(s, g.name, "skill");
      links.push({ a: g.name, b: s });
    });
  });

  // neighbor sets for hover-focus
  const neighbors = {};
  nodes.forEach((n) => (neighbors[n.id] = new Set([n.id])));
  links.forEach((l) => {
    neighbors[l.a].add(l.b);
    neighbors[l.b].add(l.a);
    l.na = byId[l.a];
    l.nb = byId[l.b];
  });

  return { nodes, links, byId, color, neighbors };
}

const R = { center: 24, hub: 15, skill: 9.5 };
const MONO = "ui-monospace, 'SF Mono', Menlo, Consolas, monospace";
const FONT = { center: `700 14px ${MONO}`, hub: `600 12px ${MONO}`, skill: `500 10.5px ${MONO}` };

export default function SkillsGraph() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const g = buildGraph();
    const { nodes, links, color, neighbors } = g;

    let W = 0, H = 0;
    let alpha = 1;
    let raf = null;
    let running = false;
    let hoverId = null;
    let drag = null;
    let pan = null;
    let scale = 1, camX = 0, camY = 0; // camera: screen = world * scale + cam

    const seeded = () => {
      // place hubs on a ring, skills near their hub, center in middle
      const cx = W / 2, cy = H / 2;
      const hubs = nodes.filter((n) => n.kind === "hub");
      hubs.forEach((h, i) => {
        const a = (i / hubs.length) * Math.PI * 2;
        h.x = cx + Math.cos(a) * Math.min(W, H) * 0.3;
        h.y = cy + Math.sin(a) * Math.min(W, H) * 0.3;
      });
      nodes.forEach((n) => {
        if (n.kind === "center") { n.x = cx; n.y = cy; }
        else if (n.kind === "skill") {
          const hub = nodes.find((h) => h.kind === "hub" && h.group === n.group);
          n.x = hub.x + (Math.random() - 0.5) * 60;
          n.y = hub.y + (Math.random() - 0.5) * 60;
        }
      });
    };

    const resize = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const first = W === 0;
      W = w; H = h;
      if (first) seeded();
      kick();
    };

    const step = () => {
      const cx = W / 2, cy = H / 2;
      const REPULSE = 3200, SPRING = 0.05, GRAVITY = 0.03, DAMP = 0.86;
      nodes.forEach((n) => { n.fx = 0; n.fy = 0; });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          let dx = a.x - b.x, dy = a.y - b.y;
          let d = Math.hypot(dx, dy) || 0.1;
          const f = REPULSE / (d * d);
          const ux = dx / d, uy = dy / d;
          a.fx += ux * f; a.fy += uy * f;
          b.fx -= ux * f; b.fy -= uy * f;
        }
      }
      links.forEach((l) => {
        const a = l.na, b = l.nb;
        const rest = l.na.kind === "center" || l.nb.kind === "center" ? Math.min(W, H) * 0.3 : 50;
        let dx = b.x - a.x, dy = b.y - a.y;
        let d = Math.hypot(dx, dy) || 0.1;
        const f = (d - rest) * SPRING;
        const ux = dx / d, uy = dy / d;
        a.fx += ux * f; a.fy += uy * f;
        b.fx -= ux * f; b.fy -= uy * f;
      });

      nodes.forEach((n) => {
        n.fx += (cx - n.x) * GRAVITY;
        n.fy += (cy - n.y) * GRAVITY;
        if (n === drag) return;
        if (n.kind === "center") { n.x = cx; n.y = cy; return; }
        n.vx = (n.vx + n.fx) * DAMP;
        n.vy = (n.vy + n.fy) * DAMP;
        n.x += n.vx * alpha;
        n.y += n.vy * alpha;
        const px = 46, py = 30;
        n.x = Math.max(px, Math.min(W - px, n.x));
        n.y = Math.max(py, Math.min(H - py, n.y));
      });
      alpha *= 0.99;
    };

    // A node as a halftone dot cluster: dots shrink from center to edge.
    const drawNode = (n, r, fill, a) => {
      const s = n.kind === "skill" ? 3.2 : 4;
      ctx.fillStyle = fill;
      ctx.globalAlpha = a;
      for (let gy = -r; gy <= r; gy += s) {
        for (let gx = -r; gx <= r; gx += s) {
          const dist = Math.hypot(gx, gy);
          if (dist > r) continue;
          const dot = Math.max(0.55, s * 0.5 * (1 - dist / r) + 0.5);
          ctx.beginPath();
          ctx.arc(Math.round(n.x + gx) + 0.5, Math.round(n.y + gy) + 0.5, dot, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      // faint bitmap dot-grid backdrop
      ctx.fillStyle = "rgba(110,122,145,0.10)";
      const gs = 15;
      for (let y = gs; y < H; y += gs) {
        for (let x = gs; x < W; x += gs) {
          ctx.beginPath();
          ctx.arc(x, y, 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      // zoom/pan camera — world content is drawn under this transform
      ctx.save();
      ctx.translate(camX, camY);
      ctx.scale(scale, scale);
      // links — dotted to match the bitmap texture
      ctx.setLineDash([1.5, 3.5]);
      links.forEach((l) => {
        const active = hoverId && (l.a === hoverId || l.b === hoverId);
        ctx.strokeStyle = active
          ? "rgba(24,119,242,0.55)"
          : hoverId ? "rgba(180,188,200,0.22)" : "rgba(150,160,178,0.5)";
        ctx.lineWidth = active ? 1.6 : 1;
        ctx.beginPath();
        ctx.moveTo(l.na.x, l.na.y);
        ctx.lineTo(l.nb.x, l.nb.y);
        ctx.stroke();
      });
      ctx.setLineDash([]);
      // nodes — halftone dot clusters in their category color
      nodes.forEach((n) => {
        const focused = !hoverId || neighbors[hoverId].has(n.id);
        const r = R[n.kind];
        drawNode(n, r, color[n.group] || "#1877f2", focused ? 1 : 0.28);
        const showLabel = n.kind !== "skill" || (hoverId && neighbors[hoverId].has(n.id));
        if (showLabel) {
          ctx.globalAlpha = focused ? 1 : 0.28;
          ctx.fillStyle = n.kind === "skill" ? "#3a4356" : "#111a2b";
          ctx.font = FONT[n.kind];
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          ctx.fillText(n.label, n.x, n.y + r + 4);
          ctx.globalAlpha = 1;
        }
      });
      ctx.restore();
    };

    const tick = () => {
      step();
      draw();
      if (alpha > 0.02 || drag) raf = requestAnimationFrame(tick);
      else running = false;
    };
    const kick = () => {
      alpha = Math.max(alpha, 0.5);
      if (!running) { running = true; raf = requestAnimationFrame(tick); }
    };

    const pos = (e) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    // screen (CSS px) → world coordinates
    const toWorld = (p) => ({ x: (p.x - camX) / scale, y: (p.y - camY) / scale });
    const nodeAt = (x, y) => {
      for (let i = nodes.length - 1; i >= 0; i--) {
        const n = nodes[i];
        if (Math.hypot(n.x - x, n.y - y) <= R[n.kind] + 4) return n;
      }
      return null;
    };

    const onMove = (e) => {
      const p = pos(e);
      if (pan) {
        camX = pan.camX + (p.x - pan.x);
        camY = pan.camY + (p.y - pan.y);
        if (!running) draw();
        return;
      }
      const { x, y } = toWorld(p);
      if (drag) {
        drag.x = x; drag.y = y; drag.vx = 0; drag.vy = 0;
        kick();
        return;
      }
      const hit = nodeAt(x, y);
      const id = hit ? hit.id : null;
      if (id !== hoverId) {
        hoverId = id;
        canvas.style.cursor = hit ? "pointer" : "grab";
        if (!running) draw();
      }
    };
    const onDown = (e) => {
      const p = pos(e);
      const { x, y } = toWorld(p);
      const hit = nodeAt(x, y);
      if (hit && hit.kind !== "center") { drag = hit; canvas.style.cursor = "grabbing"; kick(); }
      else { pan = { x: p.x, y: p.y, camX, camY }; canvas.style.cursor = "grabbing"; }
    };
    const onUp = () => {
      if (drag) { drag = null; canvas.style.cursor = "grab"; kick(); }
      if (pan) { pan = null; canvas.style.cursor = "grab"; }
    };
    const onWheel = (e) => {
      e.preventDefault();
      const p = pos(e);
      const w = toWorld(p);
      const next = Math.max(0.4, Math.min(4, scale * Math.exp(-e.deltaY * 0.0015)));
      scale = next;
      camX = p.x - w.x * scale; // keep cursor anchored to the same world point
      camY = p.y - w.y * scale;
      if (!running) draw();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();
    canvas.style.cursor = "grab";
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("pointerup", onUp);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("wheel", onWheel);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div className="skills-graph" ref={wrapRef}>
      <canvas ref={canvasRef} />
      <p className="skills-graph__hint">Scroll to zoom · drag canvas to pan · drag nodes</p>
    </div>
  );
}
