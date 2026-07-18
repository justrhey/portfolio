import Section from "./Section.jsx";
import { contributions } from "../data/contributions.js";

// dot size + intensity per contribution level (0–4), blue theme
const RADIUS = [1.3, 2.2, 3, 3.7, 4.4];
const OPACITY = [0.13, 0.42, 0.62, 0.82, 1];
const STEP = 14;

export default function GithubContrib() {
  const { levels, total } = contributions;
  const cols = Math.ceil(levels.length / 7);
  const w = cols * STEP;
  const h = 7 * STEP;

  return (
    <Section title="GitHub" action={{ label: "@justrhey ↗", href: "https://github.com/justrhey" }}>
      <div className="ghdots">
        <svg
          className="ghdots__svg"
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label={`${total} GitHub contributions in the last year`}
        >
          {levels.map((lv, i) => (
            <circle
              key={i}
              cx={Math.floor(i / 7) * STEP + STEP / 2}
              cy={(i % 7) * STEP + STEP / 2}
              r={RADIUS[lv]}
              fill="#1877f2"
              fillOpacity={OPACITY[lv]}
            />
          ))}
        </svg>
      </div>
      <p className="ghdots__caption">{total.toLocaleString()} contributions in the last year</p>
    </Section>
  );
}
