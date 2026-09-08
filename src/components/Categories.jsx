import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { useRef } from "react";

const categories = [
  {
    name: "Cooktops",
    value: "Four Burner Cooktop",
    image: "/catalogue/categories/cooktops.jpg",
    meta: "Glass & stainless steel",
  },
  {
    name: "Electric Chimneys",
    value: "Electric Chimney",
    image: "/catalogue/categories/chimneys.jpg",
    meta: "60 / 90 cm",
  },
  {
    name: "Mixer Grinders",
    value: "Mixer Grinder",
    image: "/catalogue/categories/mixer-grinders.jpg",
    meta: "500W – 1000W",
  },
  {
    name: "Kitchen Appliances",
    value: "Kitchen Appliances",
    image: "/catalogue/categories/kitchen-appliances.jpg",
    meta: "Processor & blender",
  },
  {
    name: "Induction / Infrared",
    value: "Induction / Infrared",
    image: "/catalogue/categories/induction-infrared.jpg",
    meta: "Up to 2200W",
  },
  {
    name: "Electric Kettles",
    value: "Electric Kettle",
    image: "/catalogue/categories/electric-kettles.jpg",
    meta: "1.5L – 2.0L",
  },
  {
    name: "Heaters",
    value: "Heater",
    image: "/catalogue/categories/heaters.jpg",
    meta: "Spot heating",
  },
  {
    name: "Electric Iron",
    value: "Electric Iron",
    image: "/catalogue/categories/electric-irons.jpg",
    meta: "750W – 1000W",
  },
  {
    name: "Water Heaters",
    value: "Water Heater",
    image: "/catalogue/categories/water-heaters.jpg",
    meta: "Maxtherm & Warmwell",
  },
  {
    name: "Pressure Cookers",
    value: "Pressure Cooker",
    image: "/catalogue/categories/pressure-cookers.jpg",
    meta: "3/5L & 3/5/6.5L",
  },
  {
    name: "Ceiling Fans",
    value: "Fan",
    image: "/catalogue/categories/ceiling-fans.jpg",
    meta: "1200 mm sweep",
  },
  {
    name: "Pedestal Fans",
    value: "Fan",
    image: "/catalogue/categories/pedestal-fans.jpg",
    meta: "12–22 inch",
  },
  {
    name: "Freshair Fans",
    value: "Fan",
    image: "/catalogue/categories/freshair-fans.jpg",
    meta: "6–12 inch",
  },
];

function Categories({ onCategory, activeCategory }) {
  const sliderRef = useRef(null);

  const scrollCategories = (direction) => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: direction === "next" ? 330 : -330,
      behavior: "smooth",
    });
  };

  return (
    <section className="categories-section" id="categories">

      {/* SECTION HEADER */}
      <div className="categories-heading">

        <div className="categories-title">
          <span className="category-eyebrow">
            EXPLORE MAXWELL
          </span>

          <h2>
            Shop by <span>Category</span>
          </h2>

          <p>
            Discover appliances designed for every part of your home.
          </p>
        </div>

        <div className="category-controls">

          <span className="category-count">
            {categories.length} Categories
          </span>

          <button
            className="category-arrow"
            onClick={() => scrollCategories("prev")}
            aria-label="Previous categories"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            className="category-arrow"
            onClick={() => scrollCategories("next")}
            aria-label="Next categories"
          >
            <ChevronRight size={20} />
          </button>

        </div>
      </div>

      {/* CATEGORY SLIDER */}
      <div
        className="categories-slider"
        ref={sliderRef}
      >
        {categories.map((category, index) => {
          const isActive =
            activeCategory === category.value;

          return (
            <button
              key={category.name}
              className={`category-showcase-card ${
                isActive ? "active" : ""
              }`}
              onClick={() => onCategory(category.value)}
            >

              {/* IMAGE */}
              <img
                src={category.image}
                alt={category.name}
                loading="lazy"
              />

              {/* DARK GRADIENT */}
              <div className="category-overlay" />

              {/* NUMBER */}
              <span className="category-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* ARROW */}
              <span className="category-open">
                <ArrowUpRight size={17} />
              </span>

              {/* CONTENT */}
              <div className="category-showcase-content">

                <span className="category-meta">
                  {category.meta}
                </span>

                <h3>
                  {category.name}
                </h3>

                <span className="category-explore">
                  Explore collection
                  <span>→</span>
                </span>

              </div>

            </button>
          );
        })}
      </div>

      {/* SCROLL HINT */}
      <div className="category-scroll-hint">
        <span className="category-scroll-line">
          <span />
        </span>

        <span>
          Swipe to explore more categories
        </span>
      </div>

    </section>
  );
}

export default Categories;