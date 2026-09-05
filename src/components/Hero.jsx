import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Zap, BadgeIndianRupee } from "lucide-react";

const slides = [
  {
    image: "/catalogue/mixer.png",
    kicker: "MAXWELL HOME APPLIANCES",
    title: <>Power your kitchen with <span>confidence.</span></>,
    text: "Explore Maxwell's appliance range — thoughtfully selected for dependable everyday performance, practical design and lasting value.",
    features: ["Reliable performance", "Smart everyday design", "Value focused"],
    theme: "hero-red",
    tag: "KITCHEN COLLECTION",
  },
  {
    image: "/catalogue/mixer2.png",
    kicker: "MAXWELL COOKTOPS",
    title: <>Made for <span>everyday cooking.</span></>,
    text: "Discover cooktops designed around easy cleaning, steady cooking performance and a modern kitchen experience.",
    features: ["Easy-clean surfaces", "Heavy-duty build", "Everyday efficiency"],
    theme: "hero-blue",
    tag: "COOKTOP COLLECTION",
  },
  {
    image: "/catalogue/hero-lifestyle.jpg",
    kicker: "MAXWELL KITCHEN RANGE",
    title: <>A better kitchen starts with <span>better appliances.</span></>,
    text: "Bring practical Maxwell appliances into your home with a range built around performance, durability and value.",
    features: ["Home-ready appliances", "Quality focused", "Designed for value"],
    theme: "hero-dark",
    tag: "2025–26 CATALOGUE",
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
    <section className={`hero hero-banner ${slide.theme}`} id="home">
      <div className="hero-progress"><span style={{ width: `${((active + 1) / slides.length) * 100}%` }} /></div>

      <div className="hero-content">
        <div className="hero-visual">
          <div className="hero-visual-glow" />
          <img key={slide.image} src={slide.image} alt="Maxwell home appliances" />
          <div className="hero-visual-tag">{slide.tag}</div>
        </div>

        <div className="hero-copy">
          <span className="hero-kicker">{slide.kicker}</span>
          <h1>{slide.title}</h1>
          <p>{slide.text}</p>

          <div className="hero-buttons">
            <button className="hero-btn" onClick={onExplore}>Explore Products <ArrowRight size={18} /></button>
            <a className="hero-secondary" href="#about">About Maxwell</a>
          </div>

          <div className="hero-points">
            {slide.features.map((feature, index) => {
              const Icon = [ShieldCheck, Zap, BadgeIndianRupee][index];
              return <div key={feature}><Icon size={17} /><span>{feature}</span></div>;
            })}
          </div>
        </div>
      </div>

      <button className="hero-arrow hero-left" onClick={previous} aria-label="Previous slide"><ChevronLeft size={22} /></button>
      <button className="hero-arrow hero-right" onClick={next} aria-label="Next slide"><ChevronRight size={22} /></button>
      <div className="hero-dots">
        {slides.map((_, index) => <button key={index} className={index === active ? "active" : ""} onClick={() => setActive(index)} aria-label={`Slide ${index + 1}`} />)}
      </div>
    </section>
  );
}

export default Hero;
