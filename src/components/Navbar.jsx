import { useState } from "react";
import {
  Fan, Lightbulb, Droplets, Wind, Home, CookingPot, PanelsTopLeft, Waves, Cable, Sun, Smartphone, Gem, Gauge,
  Zap, Table2, Monitor, AirVent, UserRound, Utensils, CircleGauge, Heater, PackageOpen
} from "lucide-react";

const groups = [
  { label: "Fans", value: "Fan", icon: Fan, subs: [
    ["Ceiling Fans", "Fan", Fan], ["BLDC Fans", "Fan", Zap], ["Table Fans", "Fan", Table2],
    ["Wall Mounted Fans", "Fan", Monitor], ["Pedestal Fans", "Fan", AirVent], ["Exhaust Fans", "Fan", Wind], ["Personal Fans", "Fan", UserRound]
  ]},
  { label: "Lights", value: "Lights", icon: Lightbulb, subs: [] },
  { label: "Geysers / Water Heaters", value: "Water Heater", icon: Droplets, subs: [["Water Heaters", "Water Heater", Droplets]] },
  { label: "Air Coolers", value: "Air Cooler", icon: Wind, subs: [["Air Coolers", "Air Cooler", Wind]] },
  { label: "Home Appliances", value: "Kitchen Appliances", icon: Home, subs: [["Kitchen Appliances", "Kitchen Appliances", Home], ["Electric Irons", "Electric Iron", Zap], ["Electric Kettles", "Electric Kettle", PackageOpen], ["Heaters", "Heater", Heater]] },
  { label: "Kitchen Appliances", value: "Kitchen Appliances", icon: CookingPot, subs: [["Cooktops", "Four Burner Cooktop", CookingPot], ["Electric Chimneys", "Electric Chimney", AirVent], ["Mixer Grinders", "Mixer Grinder", Zap], ["Induction / Infrared", "Induction / Infrared", CircleGauge], ["Pressure Cookers", "Pressure Cooker", Utensils]] },
  { label: "Built-in Appliances", value: "Built-in Appliances", icon: PanelsTopLeft, subs: [] },
  { label: "Pumps", value: "Pumps", icon: Waves, subs: [] },
  { label: "Wires", value: "Wires", icon: Cable, subs: [] },
  { label: "Solar Rooftop", value: "Solar Rooftop", icon: Sun, subs: [] },
  { label: "Mobile Accessories", value: "Mobile Accessories", icon: Smartphone, subs: [] },
  { label: "Accessories", value: "Accessories", icon: Gem, subs: [] },
  { label: "Stabilizers", value: "Stabilizers", icon: Gauge, subs: [] },
];

function Navbar({ activeCategory, onCategory, menuOpen }) {
  const [activeGroup, setActiveGroup] = useState("Fan");
  const selectedGroup = groups.find((group) => group.value === activeGroup) || groups[0];

  const chooseGroup = (group) => {
    setActiveGroup(group.value);
    if (group.value !== "Lights" && group.value !== "Built-in Appliances" && group.value !== "Pumps" && group.value !== "Wires" && group.value !== "Solar Rooftop" && group.value !== "Mobile Accessories" && group.value !== "Accessories" && group.value !== "Stabilizers") {
      onCategory(group.value);
    }
  };

  return (
    <nav className={`category-navbar ${menuOpen ? "mobile-open" : ""}`} aria-label="Maxwell product categories">
      <div className="category-top-row">
        <div className="category-top-scroll">
          {groups.map((group) => {
            const Icon = group.icon;
            return (
              <button type="button" key={group.label} className={`category-nav-item ${activeGroup === group.value ? "active" : ""}`} onClick={() => chooseGroup(group)}>
                <Icon size={21} strokeWidth={1.45} />
                <span>{group.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="category-sub-row">
        <div className="category-sub-scroll">
          {selectedGroup.subs.length ? selectedGroup.subs.map(([label, value, Icon]) => (
            <button type="button" key={label} className={`category-sub-item ${activeCategory === value ? "active" : ""}`} onClick={() => onCategory(value)}>
              <Icon size={20} strokeWidth={1.35} />
              <span>{label}</span>
            </button>
          )) : (
            <div className="category-sub-empty">Explore {selectedGroup.label}</div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
