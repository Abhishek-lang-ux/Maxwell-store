import { useState, useRef } from "react";

import {
  Fan,
  Lightbulb,
  Droplets,
  Wind,
  Home,
  CookingPot,
  Gem,
  Zap,
  Table2,
  AirVent,
  UserRound,
  PackageOpen,
  CircleGauge,
  Utensils,
  Heater,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const groups = [
  {
    label: "Fans",
    value: "Fan",
    icon: Fan,
    subs: [
      ["Ceiling Fans", "Fan", Fan],
      ["BLDC Fans", "BLDC Fan", Zap],
      ["Table Fans", "Table Fan", Table2],
      ["Pedestal Fans", "Pedestal Fan", AirVent],
      ["Exhaust Fans", "Exhaust Fan", Wind],
      ["Personal Fans", "Personal Fan", UserRound],
    ],
  },

  {
    label: "Lights",
    value: "Lights",
    icon: Lightbulb,
    subs: [
      ["LED Lights", "LED Lights", Lightbulb],
      ["Decorative Lights", "Decorative Lights", Gem],
      ["Emergency Lights", "Emergency Lights", Zap],
    ],
  },

  {
    label: "Geysers / Water Heaters",
    value: "Water Heater",
    icon: Droplets,
    subs: [
      ["Water Heaters", "Water Heater", Droplets],
      ["Instant Geysers", "Instant Geyser", Droplets],
    ],
  },

  {
    label: "Air Coolers",
    value: "Air Cooler",
    icon: Wind,
    subs: [
      ["Air Coolers", "Air Cooler", Wind],
      ["Personal Coolers", "Personal Cooler", Wind],
      ["Tower Coolers", "Tower Cooler", Wind],
    ],
  },

  {
    label: "Home Appliances",
    value: "Home Appliances",
    icon: Home,
    subs: [
      ["Electric Irons", "Electric Iron", Zap],
      ["Electric Kettles", "Electric Kettle", PackageOpen],
      ["Room Heaters", "Heater", Heater],
      ["Other Appliances", "Home Appliances", Home],
    ],
  },

  {
    label: "Kitchen Appliances",
    value: "Kitchen Appliances",
    icon: CookingPot,
    subs: [
      ["Cooktops", "Four Burner Cooktop", CookingPot],
      ["Electric Chimneys", "Electric Chimney", AirVent],
      ["Mixer Grinders", "Mixer Grinder", Zap],
      ["Induction / Infrared", "Induction / Infrared", CircleGauge],
      ["Pressure Cookers", "Pressure Cooker", Utensils],
    ],
  },

  {
    label: "Accessories",
    value: "Accessories",
    icon: Gem,
    subs: [
      ["Accessories", "Accessories", Gem],
    ],
  },
];

function Navbar({ activeCategory, onCategory, menuOpen }) {
  const [activeGroup, setActiveGroup] = useState("Fan");
  const [hoveredGroup, setHoveredGroup] = useState(null);

  const topScrollRef = useRef(null);
  const subScrollRef = useRef(null);

  const selectedGroup =
    groups.find((group) => group.value === activeGroup) || groups[0];

  const chooseGroup = (group) => {
    setActiveGroup(group.value);
    setHoveredGroup(null);

    // Group selection itself filters products
    onCategory(group.value);
  };

  const chooseSubCategory = (value) => {
    onCategory(value);
  };

  const scrollContainer = (ref, amount) => {
    if (!ref.current) return;

    ref.current.scrollBy({
      left: amount,
      behavior: "smooth",
    });
  };

  return (
    <nav
      className={`category-navbar ${
        menuOpen ? "mobile-open" : ""
      }`}
      aria-label="Maxwell product categories"
    >
      {/* ================= TOP CATEGORIES ================= */}
      <div className="category-top-row">
        <button
          className="category-scroll-arrow category-scroll-left"
          onClick={() => scrollContainer(topScrollRef, -260)}
          aria-label="Previous categories"
          type="button"
        >
          <ChevronLeft size={18} />
        </button>

        <div
          className="category-top-scroll"
          ref={topScrollRef}
        >
          {groups.map((group) => {
            const Icon = group.icon;

            const isActive = activeGroup === group.value;
            const isHovered = hoveredGroup === group.value;

            return (
              <button
                type="button"
                key={group.value}
                className={`category-nav-item ${
                  isActive ? "active" : ""
                } ${isHovered ? "hovered" : ""}`}
                onClick={() => chooseGroup(group)}
                onMouseEnter={() =>
                  setHoveredGroup(group.value)
                }
                onMouseLeave={() => setHoveredGroup(null)}
                aria-current={isActive ? "true" : undefined}
              >
                <span className="category-icon-wrap">
                  <Icon
                    size={30}
                    strokeWidth={1.55}
                  />
                </span>

                <span className="category-label">
                  {group.label}
                </span>

                {group.subs.length > 0 && (
                  <span className="category-count">
                    {group.subs.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <button
          className="category-scroll-arrow category-scroll-right"
          onClick={() => scrollContainer(topScrollRef, 260)}
          aria-label="Next categories"
          type="button"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* ================= SUB CATEGORIES ================= */}
      <div className="category-sub-row">
        <button
          className="category-scroll-arrow category-sub-left"
          onClick={() => scrollContainer(subScrollRef, -220)}
          aria-label="Previous subcategories"
          type="button"
        >
          <ChevronLeft size={17} />
        </button>

        <div
          className="category-sub-scroll"
          ref={subScrollRef}
        >
          {selectedGroup.subs.length > 0 ? (
            selectedGroup.subs.map(
              ([label, value, Icon]) => {
                const isActive =
                  activeCategory === value;

                return (
                  <button
                    type="button"
                    key={value}
                    className={`category-sub-item ${
                      isActive ? "active" : ""
                    }`}
                    onClick={() =>
                      chooseSubCategory(value)
                    }
                  >
                    <span className="sub-icon-wrap">
                      <Icon
                        size={30}
                        strokeWidth={1.5}
                      />
                    </span>

                    <span>{label}</span>

                    {isActive && (
                      <span className="sub-active-dot" />
                    )}
                  </button>
                );
              }
            )
          ) : (
            <div className="category-sub-empty">
              Explore {selectedGroup.label}
            </div>
          )}
        </div>

        <button
          className="category-scroll-arrow category-sub-right"
          onClick={() => scrollContainer(subScrollRef, 220)}
          aria-label="Next subcategories"
          type="button"
        >
          <ChevronRight size={17} />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;