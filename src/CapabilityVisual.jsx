import { useEffect, useId, useRef, useState } from 'react';

export default function CapabilityVisual({ kind }) {
  const visualRef = useRef(null);
  const [live, setLive] = useState(false);
  const clipId = useId();

  useEffect(() => {
    let visible = false;
    const update = () => setLive(visible && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    }, { threshold: .15 });
    observer.observe(visualRef.current);
    document.addEventListener('visibilitychange', update);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  return <svg ref={visualRef} className={`capability-visual capability-${kind}`} data-live={live} viewBox="0 0 440 310" aria-hidden="true">
    {kind === 'product' && <>
      <text className="art-eyebrow" x="18" y="18">FROM INTERFACE TO INFRASTRUCTURE</text>
      <path className="visual-soft" d="M256 112h48v71M132 173v44h76m99 32v26H158" strokeDasharray="3 5" />
      <g className="visual-loop product-layer product-layer-ui">
        <rect className="art-window" x="16" y="35" width="260" height="162" rx="10" />
        <path className="visual-soft" d="M16 65h260M48 65v132" />
        <circle className="visual-fill" cx="31" cy="50" r="3" /><circle cx="41" cy="50" r="3" /><circle cx="51" cy="50" r="3" />
        <text className="art-text" x="67" y="54">projects.service.ts</text>
        <text className="art-code-muted" x="28" y="89">01</text><text className="art-code-muted" x="28" y="109">02</text><text className="art-code-muted" x="28" y="129">03</text><text className="art-code-muted" x="28" y="149">04</text><text className="art-code-muted" x="28" y="169">05</text>
        <text className="art-code" x="61" y="89">async <tspan className="art-ink">findProjects() {'{'}</tspan></text>
        <text className="art-code" x="73" y="109">return <tspan className="art-ink">this.db.project</tspan></text>
        <text className="art-code art-ink" x="85" y="129">.findMany({'{'}</text>
        <text className="art-code" x="97" y="149">include: <tspan className="art-ink">{'{ owner: true }'}</tspan></text>
        <text className="art-code art-ink" x="73" y="169">{'});'}</text>
        <path className="visual-loop visual-content-line visual-accent" d="M74 178h155" pathLength="100" />
      </g>
      <g className="visual-loop product-layer product-layer-data">
        <rect className="art-window" x="35" y="223" width="166" height="66" rx="8" />
        <ellipse className="visual-soft" cx="58" cy="244" rx="9" ry="4" /><path className="visual-soft" d="M49 244v14c0 6 18 6 18 0v-14m-18 7c0 6 18 6 18 0" />
        <text className="art-title-sm" x="80" y="246">PostgreSQL</text><text className="art-small" x="80" y="264">users · projects · roles</text>
        <circle className="visual-fill" cx="184" cy="238" r="2.5" />
      </g>
      <g className="visual-loop product-layer product-layer-api">
        <rect className="art-window" x="228" y="144" width="193" height="137" rx="10" />
        <path className="visual-soft" d="M228 171h193" />
        <circle className="visual-fill" cx="242" cy="158" r="3" /><text className="art-small" x="253" y="162">React / product preview</text>
        <rect className="art-panel" x="240" y="183" width="35" height="85" rx="4" />
        <path className="visual-soft" d="M249 196h17m-17 12h12m-12 12h17m-17 12h11" />
        <text className="art-title-sm" x="286" y="198">Projects</text>
        <rect className="art-panel" x="286" y="211" width="121" height="24" rx="5" /><circle className="visual-fill" cx="296" cy="223" r="2" /><path className="visual-soft" d="M305 220h56m-56 7h37" />
        <rect className="art-panel" x="286" y="243" width="121" height="24" rx="5" /><circle className="visual-soft" cx="296" cy="255" r="2" /><path className="visual-soft" d="M305 252h67m-67 7h32" />
      </g>
      <path className="visual-loop visual-packet request-packet" d="M278 112h26v32" pathLength="100" />
      <text className="art-caption" x="18" y="306">TYPESCRIPT → NESTJS → POSTGRESQL · SCHEMATIC</text>
    </>}
    {kind === 'frontend' && <>
      <rect className="art-window" x="14" y="22" width="386" height="255" rx="11" />
      <path className="visual-soft" d="M14 49h386" />
      <circle className="visual-fill" cx="29" cy="36" r="3" /><circle cx="39" cy="36" r="3" /><circle cx="49" cy="36" r="3" />
      <rect className="art-panel" x="112" y="29" width="176" height="14" rx="5" /><text className="art-small" x="158" y="39">studio / workspace</text>
      <path className="visual-soft" d="M77 49v228" />
      <rect className="art-panel" x="26" y="63" width="37" height="29" rx="7" /><path className="visual-accent" d="m36 83 8-12 9 12m-14-4h11" />
      {[108, 138, 168, 198].map((y, index) => <g key={y}><rect className={index === 0 ? 'art-neutral-selection' : 'art-empty'} x="23" y={y - 9} width="45" height="23" rx="5" /><rect className="visual-soft" x="33" y={y - 2} width="9" height="9" rx="2" /><path className="visual-soft" d={`M48 ${y}h11m-11 5h7`} /></g>)}
      <text className="art-small" x="93" y="70">STUDIO / PROJECTS</text>
      <text className="art-heading" x="93" y="94">Project workspace</text>
      <circle className="art-panel" cx="372" cy="76" r="10" /><text className="art-avatar" x="372" y="79">JR</text>
      <rect className="art-neutral-selection" x="93" y="106" width="45" height="20" rx="6" /><text className="art-tab" x="104" y="120">Board</text><text className="art-small" x="151" y="120">Timeline</text>
      <path className="visual-soft" d="M93 135h289" />
      <circle className="visual-soft" cx="98" cy="151" r="2.5" /><text className="art-small" x="107" y="155">IN PROGRESS</text>
      <circle className="visual-fill" cx="245" cy="151" r="2.5" /><text className="art-small" x="254" y="155">REVIEW</text>
      <rect className="art-panel" x="93" y="166" width="135" height="85" rx="7" />
      <text className="art-small" x="104" y="183">INTERFACE</text><text className="art-title-sm" x="104" y="202">Portfolio refresh</text>
      <path className="visual-soft" d="M104 216h103" /><path className="visual-accent" d="M104 216h62" />
      <circle className="art-neutral-selection" cx="112" cy="237" r="6" /><circle className="art-neutral-selection" cx="121" cy="237" r="6" /><path className="visual-soft" d="M195 234h20m-15 5h15" />
      <rect className="visual-loop visual-click-target" x="240" y="166" width="141" height="61" rx="7" />
      <text className="art-small" x="251" y="183">COMPONENTS</text><g className="visual-loop frontend-check"><path className="visual-accent" d="m360 180 3 3 6-6" /></g><text className="art-title-sm" x="251" y="203">Design system</text>
      <path className="visual-soft" d="M252 215h74" />
      <g className="visual-loop art-phone">
        <rect className="art-window" x="328" y="181" width="98" height="123" rx="12" />
        <rect className="art-panel" x="334" y="187" width="86" height="111" rx="8" />
        <path d="M361 192h31" className="visual-soft" /><text className="art-small art-ink" x="342" y="212">My projects</text>
        <rect className="art-window" x="342" y="222" width="70" height="29" rx="4" /><path className="visual-soft" d="M348 231h47m-47 7h32" />
        <rect className="art-window" x="342" y="257" width="70" height="29" rx="4" /><path className="visual-soft" d="M348 266h42" /><path className="visual-accent" d="M348 275h48" />
      </g>
      <g className="visual-loop visual-cursor"><path className="art-cursor" d="m286 137 4 24 6-8 11 1Z" /></g>
      <text className="art-caption" x="16" y="306">DESKTOP + MOBILE · ORIGINAL UI STUDY</text>
    </>}
    {kind === 'backend' && <>
      <text className="art-eyebrow" x="16" y="18">A RECORD'S PATH THROUGH THE SYSTEM</text>
      <path className="visual-soft" d="M170 97h48m94 47v35H124v24m188-24h65v24m-131-24v24" />
      <g>
        <rect className="art-window" x="16" y="39" width="155" height="119" rx="9" />
        <path className="visual-soft" d="M16 68h155" /><text className="art-code" x="29" y="58">POST</text><text className="art-small" x="66" y="58">record request</text>
        <text className="art-small" x="29" y="88">Authorization: Bearer …</text><text className="art-code" x="29" y="110">{'{ patient_id, record }'}</text>
        <path className="visual-soft" d="M29 126h110m-110 9h79" /><circle className="visual-fill" cx="151" cy="51" r="2.5" />
      </g>
      <rect className="art-window" x="218" y="39" width="204" height="105" rx="10" />
      <rect className="art-neutral-selection" x="230" y="51" width="27" height="27" rx="7" /><path className="visual-accent" d="m243 56 7 3v6c0 4-7 8-7 8s-7-4-7-8v-6Z" /><path className="visual-accent" d="m240 64 2 2 4-4" />
      <text className="art-title-sm" x="268" y="62">Rust / Actix-web</text><text className="art-small" x="268" y="77">Validate · authorize · encrypt</text>
      <path className="visual-soft" d="M230 89h180" />
      <text className="art-code" x="232" y="108">JWT</text><text className="art-code" x="285" y="108">RBAC</text><text className="art-code" x="343" y="108">AES-GCM</text>
      <text className="art-small" x="232" y="129">Only authorized roles proceed</text>
      <g>
        <rect className="art-window" x="16" y="203" width="140" height="84" rx="8" />
        <text className="art-title-sm" x="28" y="225">PostgreSQL</text><text className="art-small" x="28" y="244">Encrypted records</text><text className="art-code-muted" x="28" y="266">aes256: ████…</text>
        <rect className="art-window" x="171" y="203" width="112" height="84" rx="8" />
        <text className="art-title-sm" x="183" y="225">Audit log</text><text className="art-small" x="183" y="244">Who · what · when</text><path className="visual-soft" d="M184 259h82m-82 9h62" />
        <rect className="art-window" x="298" y="203" width="124" height="84" rx="8" />
        <text className="art-title-sm" x="310" y="225">Soroban</text><text className="art-small" x="310" y="244">Record hash only</text><path className="visual-accent" d="M311 260h18v13h-18Zm26 0h18v13h-18Zm26 0h18v13h-18Zm-34 7h8m18 0h8" />
      </g>
      <path className="visual-loop visual-packet request-packet" d="M171 97h47" pathLength="100" />
      <path className="visual-loop visual-packet database-packet" d="M312 144v35H124v24" pathLength="100" />
      <path className="visual-loop visual-packet audit-packet" d="M312 179h65v24" pathLength="100" />
      <text className="art-caption" x="16" y="306">PATIENT DATA OFF-CHAIN · HASHES ON-CHAIN</text>
    </>}
    {kind === 'data' && <>
      <defs><clipPath id={clipId}><rect x="151" y="62" width="271" height="223" rx="0" /></clipPath></defs>
      <rect className="art-window" x="16" y="30" width="406" height="255" rx="10" />
      <path className="visual-soft" d="M16 62h406M151 62v223" />
      <circle className="visual-fill" cx="32" cy="46" r="3" /><text className="art-title-sm" x="43" y="50">Community map</text><text className="art-small" x="313" y="50">ILLUSTRATIVE</text>
      <rect className="art-panel" x="28" y="76" width="110" height="24" rx="5" /><circle className="visual-soft" cx="40" cy="87" r="3" /><path className="visual-soft" d="m42 90 3 3" /><text className="art-small" x="51" y="91">Find a place</text>
      <text className="art-small" x="28" y="121">LOCAL REPORTS</text>
      <rect className="art-neutral-selection" x="25" y="132" width="117" height="43" rx="6" /><circle className="visual-fill" cx="37" cy="147" r="3" /><text className="art-title-sm" x="47" y="149">Road damage</text><text className="art-small" x="47" y="165">For review</text>
      <circle className="visual-soft" cx="37" cy="194" r="3" /><text className="art-small art-ink" x="47" y="197">Street lighting</text><path className="visual-soft" d="M47 207h67" />
      <circle className="visual-soft" cx="37" cy="235" r="3" /><text className="art-small art-ink" x="47" y="238">Waste collection</text><path className="visual-soft" d="M47 248h54" />
      <g clipPath={`url(#${clipId})`}>
        <path className="art-river" d="M346 60c-59 38 18 91-40 129s-20 62-48 99h36c26-40-1-59 40-89s-7-97 43-139Z" />
        <g className="art-blocks">{[[167,78,38,32],[216,78,47,32],[168,126,37,40],[220,126,44,40],[168,183,44,31],[171,231,40,33],[225,230,33,34],[364,81,43,36],[360,133,44,37],[351,190,47,29],[338,239,63,27]].map(([x,y,w,h])=><rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} rx="3" />)}</g>
        <path className="art-street" d="M211 62v109l16 25v89M151 119h271M151 176h142l35 10h94M151 223h271M274 62v92M346 203v82" />
        <path className="visual-soft" d="M156 121h265M213 66v101m-54 57h255" strokeDasharray="2 5" />
        <circle className="visual-loop map-report-pulse map-report-first" cx="229" cy="196" r="8" />
        <g className="visual-loop map-pin map-pin-first"><path className="visual-accent art-map-pin" d="M218 180a11 11 0 1 1 22 0c0 8-11 16-11 16s-11-8-11-16Z" /><circle className="visual-fill" cx="229" cy="180" r="3" /></g>
        <g className="visual-loop map-pin map-pin-second"><path className="art-map-pin" d="M368 227a9 9 0 1 1 18 0c0 7-9 14-9 14s-9-7-9-14Z" /><circle className="visual-fill" cx="377" cy="227" r="2" /></g>
        <g className="visual-loop map-popup"><rect className="art-window" x="232" y="91" width="156" height="60" rx="7" /><text className="art-title-sm" x="245" y="112">Road damage</text><text className="art-small" x="245" y="131">Report details · review</text><path className="visual-soft" d="m250 151 6 7 6-7" /></g>
        <rect className="art-window" x="390" y="244" width="23" height="33" rx="4" /><path className="visual-soft" d="M397 253h9m-4-4v8m-5 11h9" />
      </g>
      <text className="art-caption" x="16" y="306">REPORTS + LOCATION · SCHEMATIC MAP</text>
    </>}
  </svg>;
}
