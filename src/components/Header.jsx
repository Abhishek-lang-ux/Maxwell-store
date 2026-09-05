import { Menu, Search, MapPin, Headphones, ShoppingBag, UserRound, X, Home, Grid3X3, Fan, CookingPot, Droplets, Wind, Info, PhoneCall, ChevronRight } from "lucide-react";

const menuItems = [
  { label: "Home", icon: Home, target: "home", type: "scroll" },
  { label: "All Products", icon: Grid3X3, target: "products", type: "scroll", category: "All" },
  { label: "Fans", icon: Fan, target: "products", type: "category", category: "Fan" },
  { label: "Kitchen Appliances", icon: CookingPot, target: "products", type: "category", category: "Kitchen Appliances" },
  { label: "Water Heaters", icon: Droplets, target: "products", type: "category", category: "Water Heater" },
  { label: "Air Coolers", icon: Wind, target: "products", type: "category", category: "Air Cooler" },
  { label: "About Maxwell", icon: Info, target: "about", type: "scroll" },
  { label: "Contact & Support", icon: PhoneCall, target: "contact", type: "scroll" },
];

function Header({ search, setSearch, cartCount, onCart, onLogin, onMenu, menuOpen, onMenuNavigate }) {
  return (
    <header className="top-header">
      <button className={`menu-btn ${menuOpen ? "is-open" : ""}`} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={onMenu}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
      <a className="maxwell-logo" href="#home" aria-label="Maxwell Home Appliances"><img src="/maxwell-logo.png" alt="Maxwell" /></a>
      <div className="search-box">
        <Search size={17} />
        <input value={search} onChange={(e) => setSearch(e.target.value)} type="search" placeholder="Search Maxwell appliances" aria-label="Search Maxwell appliances" />
        {search && <button className="search-clear" onClick={() => setSearch("")} aria-label="Clear search"><X size={15} /></button>}
      </div>
      <div className="header-actions">
        <a className="header-link" href="https://www.google.com/maps/search/?api=1&query=Plot+No.+28%2F1%2C+Sector-94%2C+Greater+Faridabad" target="_blank" rel="noreferrer"><MapPin size={16} /><span>Locate Store</span></a>
        <a className="header-link" href="mailto:info@maxwellgroup.in"><Headphones size={16} /><span>Support</span></a>
        <button className="cart-icon" aria-label="Shopping bag" onClick={onCart}><ShoppingBag size={20} /><span className="cart-count">{cartCount}</span></button>
        <button className="login-link" aria-label="Login" onClick={onLogin}><span className="user-circle"><UserRound size={17} /></span><span>Login</span></button>
      </div>

      {menuOpen && (
        <div className="menu-overlay" onMouseDown={(e) => e.target === e.currentTarget && onMenu()}>
          <aside className="menu-drawer" aria-label="Maxwell navigation menu">
            <div className="menu-drawer-head">
              <div>
                <span className="menu-eyebrow">MAXWELL</span>
                <h2>Explore Maxwell</h2>
                <p>Discover appliances, categories and support.</p>
              </div>
              <button className="menu-close" onClick={onMenu} aria-label="Close menu"><X size={20} /></button>
            </div>

            <div className="menu-drawer-list">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    type="button"
                    className="menu-drawer-item"
                    key={item.label}
                    onClick={() => onMenuNavigate(item)}
                  >
                    <span className="menu-item-icon"><Icon size={19} /></span>
                    <span className="menu-item-copy"><strong>{item.label}</strong>{item.category && <small>Shop this range</small>}</span>
                    <ChevronRight size={17} className="menu-item-arrow" />
                  </button>
                );
              })}
            </div>

            <div className="menu-drawer-footer">
              <div><span className="menu-footer-dot" /><span>Maxwell Home Appliances</span></div>
              <small>Quality • Performance • Value</small>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}

export default Header;
