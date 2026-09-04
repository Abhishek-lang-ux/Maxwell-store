import { Menu, Search, MapPin, Headphones, ShoppingBag, UserRound, X } from "lucide-react";

function Header({ search, setSearch, cartCount, onCart, onLogin, onMenu }) {
  return (
    <header className="top-header">
      <button className="menu-btn" aria-label="Open menu" onClick={onMenu}><Menu size={22} /></button>
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
    </header>
  );
}

export default Header;
