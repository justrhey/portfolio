import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { topProjects } from "../data.js";

const FALLBACK_ACCENT = "#5b6b8c";

export default function ProjectStack() {
  // Center the #1 project on load.
  const initial = Math.max(0, topProjects.findIndex((p) => p.badge?.startsWith("#1")));

  return (
    <div className="pcarousel">
      <Swiper
        modules={[EffectCoverflow, Pagination]}
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView="auto"
        initialSlide={initial}
        coverflowEffect={{ rotate: 40, stretch: 0, depth: 100, modifier: 1, slideShadows: true }}
        pagination={{ clickable: true }}
      >
        {topProjects.map((p) => (
          <SwiperSlide key={p.title}>
            <a className="pcarousel__link" href={p.url} target="_blank" rel="noreferrer">
              {p.image ? (
                <img className="pcarousel__img" src={p.image} alt={p.title} />
              ) : (
                <span className="pcarousel__fallback" style={{ "--accent": FALLBACK_ACCENT }} aria-hidden="true">
                  {p.title.charAt(0)}
                </span>
              )}
              <span className="pcarousel__cap">
                <span className="pcarousel__kicker">{p.badge}</span>
                <span className="pcarousel__title">{p.title}</span>
                <span className="pcarousel__cta">
                  {p.cta}
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17 17 7M9 7h8v8" />
                  </svg>
                </span>
              </span>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
