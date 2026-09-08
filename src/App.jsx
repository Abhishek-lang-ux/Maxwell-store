import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Products from "./components/Products";
import About from "./components/About";
import Footer from "./components/Footer";
import { X, Minus, Plus, Trash2, ShoppingBag, UserRound, LogIn } from "lucide-react";
import Checkout from "./components/Checkout";
import Contact from "./components/Contact";
import localProducts from "./data/products";
import Chatbot from "./components/Chatbot";

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function App() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState(() => readStorage("maxwell-cart", []));
  const [wishlist, setWishlist] = useState(() => readStorage("maxwell-wishlist", []));
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [warrantyFilter, setWarrantyFilter] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState("");
  useEffect(() => {
  // Backend abhi deploy nahi hai,
  // isliye frontend local product data use karega.
  setProducts(localProducts);
  setProductsLoading(false);
  setProductsError("");
}, []);

  useEffect(() => {
    localStorage.setItem("maxwell-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("maxwell-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const addToCart = (product) => {
    setCart((current) => {
      const found = current.find((item) => item.id === product.id);
      if (found) {
        return current.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...current, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  };

  const changeQty = (id, delta) => {
    setCart((current) => current
      .map((item) => item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item)
      .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((current) => current.filter((item) => item.id !== id));
  };

  const toggleWishlist = (id) => {
    setWishlist((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();

    const result = products.filter((product) => {
      const matchesCategory =
        activeCategory === "All" ||
        product.category === activeCategory ||
        product.categoryGroup === activeCategory;

      const haystack =
        `${product.name} ${product.model} ${product.category} ${product.spec}`.toLowerCase();

      const matchesSearch = !q || haystack.includes(q);
      const matchesWarranty =
        warrantyFilter === "All"
          ? true
          : warrantyFilter === "None"
            ? !product.warranty
            : product.warranty?.startsWith(warrantyFilter);

      return matchesCategory && matchesSearch && matchesWarranty;
    });

    if (sortBy === "name-asc") {
      return [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortBy === "name-desc") {
      return [...result].sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [products, search, activeCategory, warrantyFilter, sortBy]);

  const handleCategory = (category) => {
    setActiveCategory(category);
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="maxwell-app">
      <Header
        search={search}
        setSearch={setSearch}
        cartCount={cartCount}
        onCart={() => setCartOpen(true)}
        onLogin={() => setLoginOpen(true)}
        menuOpen={menuOpen}
        onMenu={() => setMenuOpen((value) => !value)}
        onMenuNavigate={(item) => {
          if (item.category) {
            handleCategory(item.category);
          } else {
            document.getElementById(item.target)?.scrollIntoView({ behavior: "smooth", block: "start" });
          }
          setMenuOpen(false);
        }}
      />

      <main>
        <Hero onExplore={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })} />
        <Navbar activeCategory={activeCategory} onCategory={handleCategory} menuOpen={menuOpen} />
        <Categories onCategory={handleCategory} activeCategory={activeCategory} />
        {productsLoading ? (
  <section className="products-section" id="products">
    <div className="no-results">
      <h3>Loading products...</h3>
      <p>Please wait while Maxwell products are loading.</p>
    </div>
  </section>
) : productsError ? (
  <section className="products-section" id="products">
    <div className="no-results">
      <h3>Unable to load products</h3>
      <p>{productsError}</p>
      <button
        className="hero-btn"
        onClick={() => window.location.reload()}
      >
        Try Again
      </button>
    </div>
  </section>
) : (
  <Products
    products={filteredProducts}
    search={search}
    activeCategory={activeCategory}
    wishlist={wishlist}
    onWishlist={toggleWishlist}
    onDetails={setSelectedProduct}
    onAddToCart={addToCart}
    onClearFilters={() => {
      setSearch("");
      setActiveCategory("All");
      setWarrantyFilter("All");
      setSortBy("featured");
    }}
    filterOpen={filterOpen}
    onFilterOpen={() => setFilterOpen(true)}
    onFilterClose={() => setFilterOpen(false)}
    warrantyFilter={warrantyFilter}
    setWarrantyFilter={setWarrantyFilter}
    sortBy={sortBy}
    setSortBy={setSortBy}
  />
)}
        {filterOpen && (
          <div className="filter-backdrop" onMouseDown={(e) => e.target === e.currentTarget && setFilterOpen(false)}>
            <aside className="filter-drawer" aria-label="Product filters">
              <div className="filter-drawer-header">
                <div>
                  <p className="small-title">REFINE RANGE</p>
                  <h2>Filter Products</h2>
                </div>
                <button className="icon-btn" onClick={() => setFilterOpen(false)} aria-label="Close filters"><X size={21} /></button>
              </div>

              <div className="filter-drawer-body">
                <div className="filter-block">
                  <div className="filter-label-row"><strong>Category</strong><span>{activeCategory === "All" ? "All products" : activeCategory}</span></div>
                  <div className="filter-chips">
                    <button className={activeCategory === "All" ? "filter-chip active" : "filter-chip"} onClick={() => setActiveCategory("All")}>All</button>
                    {[...new Set(products.map((p) => p.category))].map((category) => (
                      <button
                        key={category}
                        className={activeCategory === category ? "filter-chip active" : "filter-chip"}
                        onClick={() => setActiveCategory(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="filter-block">
                  <div className="filter-label-row"><strong>Warranty</strong><span>Choose coverage</span></div>
                  <div className="filter-chips">
                    {[
                      ["All", "Any warranty"],
                      ["1 Year", "1 Year"],
                      ["2 Years", "2 Years"],
                      ["5 Years", "5 Years"],
                      ["None", "Not listed"],
                    ].map(([value, label]) => (
                      <button key={value} className={warrantyFilter === value ? "filter-chip active" : "filter-chip"} onClick={() => setWarrantyFilter(value)}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="filter-block">
                  <div className="filter-label-row"><strong>Sort by</strong><span>Display order</span></div>
                  <div className="sort-options">
                    {[
                      ["featured", "Featured"],
                      ["name-asc", "Name: A to Z"],
                      ["name-desc", "Name: Z to A"],
                    ].map(([value, label]) => (
                      <button key={value} className={sortBy === value ? "sort-option active" : "sort-option"} onClick={() => setSortBy(value)}>
                        <span className="sort-radio" />{label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="filter-drawer-footer">
                <button className="filter-reset" onClick={() => { setSearch(""); setActiveCategory("All"); setWarrantyFilter("All"); setSortBy("featured"); }}>Reset all</button>
                <button className="checkout-btn" onClick={() => setFilterOpen(false)}>Show {filteredProducts.length} product{filteredProducts.length === 1 ? "" : "s"}</button>
              </div>
            </aside>
          </div>
        )}

        <About />
        <Contact />
      </main>

      <Footer />

      <Chatbot products={products} />

      {cartOpen && (
        <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && setCartOpen(false)}>
          <aside className="side-drawer" aria-label="Shopping cart">
            <div className="drawer-header">
              <div><p className="small-title">YOUR BAG</p><h2>Shopping Cart</h2></div>
              <button className="icon-btn" onClick={() => setCartOpen(false)} aria-label="Close cart"><X size={21} /></button>
            </div>
            <div className="drawer-body">
              {cart.length === 0 ? (
                <div className="empty-state"><ShoppingBag size={40} /><h3>Your cart is empty</h3><p>Add products from the Maxwell range to get started.</p><button className="hero-btn" onClick={() => setCartOpen(false)}>Continue Shopping</button></div>
              ) : cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-info">
                    <strong>{item.name}</strong><span>{item.model}</span>
                    <div className="qty-control">
                      <button onClick={() => changeQty(item.id, -1)}><Minus size={14} /></button>
                      <b>{item.qty}</b>
                      <button onClick={() => changeQty(item.id, 1)}><Plus size={14} /></button>
                    </div>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.name}`}><Trash2 size={17} /></button>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <div className="drawer-footer">
                <p>Items in cart <strong>{cartCount}</strong></p>
                <button className="checkout-btn" onClick={() => { setCartOpen(false); setCheckoutOpen(true); }}>Proceed to Checkout</button>
              </div>
            )}
          </aside>
        </div>
      )}

      {checkoutOpen && (
        <Checkout
          cart={cart}
          onClose={() => setCheckoutOpen(false)}
          onChangeQty={changeQty}
          onRemove={removeFromCart}
          onOrderPlaced={() => {}}
        />
      )}

      {loginOpen && (
        <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && setLoginOpen(false)}>
          <div className="login-modal">
            <button className="modal-close" onClick={() => setLoginOpen(false)}><X size={20} /></button>
            <div className="login-icon"><UserRound size={26} /></div>
            <p className="small-title">MAXWELL ACCOUNT</p>
            <h2>Welcome back</h2>
            <p className="modal-copy">Login is ready for your customer account. Connect this form to your backend when authentication is enabled.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Login backend is not connected yet."); }}>
              <label>Email address<input type="email" placeholder="you@example.com" required /></label>
              <label>Password<input type="password" placeholder="••••••••" required /></label>
              <button className="checkout-btn" type="submit"><LogIn size={17} /> Login</button>
            </form>
          </div>
        </div>
      )}

      {selectedProduct && (
        <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && setSelectedProduct(null)}>
          <div className="product-modal">
            <button className="modal-close" onClick={() => setSelectedProduct(null)}><X size={20} /></button>
            <div className="product-modal-image"><img src={selectedProduct.image} alt={selectedProduct.name} /></div>
            <div className="product-modal-info">
              <p className="product-category">{selectedProduct.category}</p>
              <h2>{selectedProduct.name}</h2>
              <p className="product-model">Model: <strong>{selectedProduct.model}</strong></p>
              <p className="product-spec large">{selectedProduct.spec}</p>
              {selectedProduct.warranty && <span className="warranty">{selectedProduct.warranty}</span>}
              <button className="checkout-btn" onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}>Add to Cart</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
