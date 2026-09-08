import { ArrowLeft, Filter, SearchX, SlidersHorizontal } from "lucide-react";
import ProductCard from "./ProductCard";

function FilteredProducts({
  products,
  search,
  activeCategory,
  warrantyFilter,
  sortBy,
  wishlist,
  onWishlist,
  onDetails,
  onAddToCart,
  onBack,
  onFilterOpen,
  onClearFilters,
}) {
  const hasFilters =
    search ||
    activeCategory !== "All" ||
    warrantyFilter !== "All" ||
    sortBy !== "featured";

  return (
    <section className="filtered-products-page">
      <div className="filtered-products-container">

        {/* TOP BAR */}
        <div className="filtered-page-top">

          <button
            className="back-home-btn"
            onClick={onBack}
          >
            <ArrowLeft size={17} />
            Back
          </button>

          <button
            className="filter-trigger filtered-filter-btn"
            onClick={onFilterOpen}
          >
            <SlidersHorizontal size={17} />
            <span>Filter & Sort</span>
            <span className="filter-trigger-arrow">→</span>
          </button>

        </div>

        {/* HEADING */}
        <div className="filtered-page-heading">

          <div>
            <p className="small-title">FILTERED RANGE</p>

            <h1>
              {activeCategory !== "All"
                ? activeCategory
                : "Explore Maxwell Products"}
            </h1>

            <p className="filtered-page-subtitle">
              {products.length} product
              {products.length === 1 ? "" : "s"} found
            </p>
          </div>

        </div>

        {/* ACTIVE FILTERS */}
        {hasFilters && (
          <div className="filtered-active-bar">

            <div className="filtered-active-items">

              {search && (
                <span className="summary-chip">
                  Search: “{search}”
                </span>
              )}

              {activeCategory !== "All" && (
                <span className="summary-chip">
                  {activeCategory}
                </span>
              )}

              {warrantyFilter !== "All" && (
                <span className="summary-chip">
                  Warranty:{" "}
                  {warrantyFilter === "None"
                    ? "Not listed"
                    : warrantyFilter}
                </span>
              )}

              {sortBy !== "featured" && (
                <span className="summary-chip">
                  Sorted:{" "}
                  {sortBy === "name-asc"
                    ? "A–Z"
                    : "Z–A"}
                </span>
              )}

            </div>

            <button
              className="clear-all-btn"
              onClick={onClearFilters}
            >
              Clear all
            </button>

          </div>
        )}

        {/* PRODUCTS */}
        {products.length > 0 ? (
          <div className="filtered-products-grid">

            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                wished={wishlist.includes(product.id)}
                onWishlist={onWishlist}
                onDetails={onDetails}
                onAddToCart={onAddToCart}
              />
            ))}

          </div>
        ) : (
          <div className="filtered-no-results">

            <SearchX size={48} />

            <h2>No products found</h2>

            <p>
              No Maxwell products match the selected filters.
            </p>

            <button
              className="hero-btn"
              onClick={onClearFilters}
            >
              Show All Products
            </button>

          </div>
        )}

      </div>
    </section>
  );
}

export default FilteredProducts;