export default function CatScrollSection() {
  return <div className="cat-scroll" aria-label="A small hello from a black cat companion">
    <div className="cat-character">
      <video autoPlay loop muted playsInline preload="metadata" aria-hidden="true">
        <source src="/black-cat-scroll.webm" type="video/webm" />
        <source src="/black-cat-scroll.mp4" type="video/mp4" />
      </video>
      <span className="cat-speech">hi.</span>
    </div>
  </div>;
}
