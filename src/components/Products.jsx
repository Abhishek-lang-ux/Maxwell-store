import { Filter, SearchX, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "./ProductCard";

function Products({
  products,
  search,
  activeCategory,
  wishlist,
  onWishlist,
  onDetails,
  onAddToCart,
  onClearFilters,
  onFilterOpen,
  warrantyFilter,
  sortBy,
}) {
  return (
    <section className="products-section" id="products">
      <div className="products-toolbar">
        <div className="section-heading">
          <div>
            <p className="small-title">FEATURED MODELS</p>
            <h2>Explore the Maxwell Range</h2>
          </div>
          <span className="section-note">{products.length} product{products.length === 1 ? "" : "s"} shown</span>
        </div>
        <button className="filter-trigger" onClick={onFilterOpen}>
          <SlidersHorizontal size={17} />
          <span>Filter & Sort</span>
          <span className="filter-trigger-arrow">→</span>
        </button>
      </div>

      <div className="filter-summary">
        <div className="summary-left">
          {search && <span className="summary-chip">Search: “{search}”</span>}
          {activeCategory !== "All" && <span className="summary-chip">{activeCategory}</span>}
          {warrantyFilter !== "All" && <span className="summary-chip">Warranty: {warrantyFilter === "None" ? "Not listed" : warrantyFilter}</span>}
          {sortBy !== "featured" && <span className="summary-chip">Sorted: {sortBy === "name-asc" ? "A–Z" : "Z–A"}</span>}
          {!search && activeCategory === "All" && warrantyFilter === "All" && sortBy === "featured" && (
            <span className="browse-hint"><Filter size={14} /> Browse the range or refine it with filters</span>
          )}
        </div>
        {(search || activeCategory !== "All" || warrantyFilter !== "All" || sortBy !== "featured") && (
          <button className="clear-all-btn" onClick={onClearFilters}><X size={14} /> Clear all</button>
        )}
      </div>
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
