import { SearchX } from "lucide-react";
import ProductCard from "./ProductCard";

function Products({ products, search, activeCategory, wishlist, onWishlist, onDetails, onAddToCart, onClearFilters }) {
  return (
    <section className="products-section" id="products">
      <div className="section-heading"><div><p className="small-title">FEATURED MODELS</p><h2>Explore the Maxwell Range</h2></div><span className="section-note">{products.length} product{products.length === 1 ? "" : "s"} shown</span></div>
      {(search || activeCategory !== "All") && <div className="active-filter"><span>{search ? `Search: “${search}”` : `Category: ${activeCategory}`}</span><button onClick={onClearFilters}>Clear filters</button></div>}
      {products.length ? (
        <div className="products-grid">
          {products.map((product) => <ProductCard key={product.id} product={product} wished={wishlist.includes(product.id)} onWishlist={onWishlist} onDetails={onDetails} onAddToCart={onAddToCart} />)}
        </div>
      ) : (
        <div className="no-results"><SearchX size={42} /><h3>No products found</h3><p>Try another product name or clear the current filter.</p><button className="hero-btn" onClick={onClearFilters}>Show All Products</button></div>
      )}
    </section>
  );
}
export default Products;
