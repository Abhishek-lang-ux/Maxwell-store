const categories = [
  { name: "Cooktops", value: "Four Burner Cooktop", image: "/catalogue/categories/cooktops.jpg", meta: "Glass & stainless steel" },
  { name: "Electric Chimneys", value: "Electric Chimney", image: "/catalogue/categories/chimneys.jpg", meta: "60 / 90 cm" },
  { name: "Mixer Grinders", value: "Mixer Grinder", image: "/catalogue/categories/mixer-grinders.jpg", meta: "500W – 1000W" },
  { name: "Kitchen Appliances", value: "Kitchen Appliances", image: "/catalogue/categories/kitchen-appliances.jpg", meta: "Processor & blender" },
  { name: "Induction / Infrared", value: "Induction / Infrared", image: "/catalogue/categories/induction-infrared.jpg", meta: "Up to 2200W" },
  { name: "Electric Kettles", value: "Electric Kettle", image: "/catalogue/categories/electric-kettles.jpg", meta: "1.5L – 2.0L" },
  { name: "Heaters", value: "Heater", image: "/catalogue/categories/heaters.jpg", meta: "Spot heating" },
  { name: "Electric Iron", value: "Electric Iron", image: "/catalogue/categories/electric-irons.jpg", meta: "750W – 1000W" },
  { name: "Water Heaters", value: "Water Heater", image: "/catalogue/categories/water-heaters.jpg", meta: "Maxtherm & Warmwell" },
  { name: "Pressure Cookers", value: "Pressure Cooker", image: "/catalogue/categories/pressure-cookers.jpg", meta: "3/5L & 3/5/6.5L" },
  { name: "Ceiling Fans", value: "Fan", image: "/catalogue/categories/ceiling-fans.jpg", meta: "1200 mm sweep" },
  { name: "Pedestal Fans", value: "Fan", image: "/catalogue/categories/pedestal-fans.jpg", meta: "12–22 inch" },
  { name: "Freshair Fans", value: "Fan", image: "/catalogue/categories/freshair-fans.jpg", meta: "6–12 inch" },
];

function Categories({ onCategory, activeCategory }) {
  return (
    <section className="categories-section" id="categories">
      <div className="section-heading"><div><p className="small-title">2025–26 RANGE</p><h2>Shop by Category</h2></div><span className="section-note">Select a category to filter products</span></div>
      <div className="categories-grid">
        {categories.map((category) => (
          <button className={`category-card ${activeCategory === category.value ? "selected" : ""}`} onClick={() => onCategory(category.value)} key={category.name}>
            <div className="category-image"><img src={category.image} alt={category.name} loading="lazy" /></div>
            <div className="category-card-info"><h3>{category.name}</h3><span>{category.meta}</span></div>
          </button>
        ))}
      </div>
    </section>
  );
}
export default Categories;
