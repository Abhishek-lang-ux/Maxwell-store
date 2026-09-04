import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Zap, BadgeIndianRupee } from "lucide-react";

const slides = [
  {
    image: "/catalogue/hero-lifestyle.jpg",
    kicker: "MAXWELL HOME APPLIANCES",
    title: <>Quality appliances for <span>modern living.</span></>,
    text: "Explore Maxwell's 2025–26 appliance range — designed around durability, reliable performance, energy efficiency and value for money.",
  },
  {
    image: "/catalogue/products/reflecta.jpg",
    kicker: "MAXWELL COOKTOPS",
    title: <>Built for <span>everyday cooking.</span></>,
    text: "Explore Maxwell cooktops with toughened glass, brass burners and heavy-duty pan supports from the catalogue range.",
  },
  {
    image: "/catalogue/products/mg-305.jpg",
    kicker: "MAXWELL KITCHEN RANGE",
    title: <>Power that fits your <span>kitchen.</span></>,
    text: "Discover mixer grinders, kettles, irons, heaters and other Maxwell home appliances from the 2025–26 range.",
  },
];

function Hero({ onExplore }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((value) => (value + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[active];
  const previous = () => setActive((value) => (value - 1 + slides.length) % slides.length);
  const next = () => setActive((value) => (value + 1) % slides.length);

  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <div className="hero-copy">
          <span className="hero-kicker">{slide.kicker}</span>
          <h1>{slide.title}</h1>
          <p>{slide.text}</p>
          <div className="hero-buttons">
            <button className="hero-btn" onClick={onExplore}>Explore Products <ArrowRight size={18} /></button>
            <a className="hero-secondary" href="#about">About Maxwell</a>
          </div>
          <div className="hero-points">
            <div><ShieldCheck size={18} /><span>Quality focused</span></div>
            <div><Zap size={18} /><span>Reliable performance</span></div>
            <div><BadgeIndianRupee size={18} /><span>Value for money</span></div>
          </div>
        </div>
        <div className="hero-visual">
          <img key={slide.image} src={slide.image} alt="Maxwell home appliances" />
          <div className="hero-visual-label"><span>2025–26</span><strong>APPLIANCES CATALOGUE</strong></div>
        </div>
      </div>
      <button className="hero-arrow hero-left" onClick={previous} aria-label="Previous slide"><ChevronLeft size={22} /></button>
      <button className="hero-arrow hero-right" onClick={next} aria-label="Next slide"><ChevronRight size={22} /></button>
      <div className="hero-dots">{slides.map((_, index) => <button key={index} className={index === active ? "active" : ""} onClick={() => setActive(index)} aria-label={`Slide ${index + 1}`} />)}</div>
    </section>
  );
}
export default Hero;
