import React from "react";

import {
  ArrowLeft,
  Filter,
  SlidersHorizontal,
  X,
} from "lucide-react";
import ProductCard from "./ProductCard";

function CategoryProducts({
  category,
  products,
  wishlist,
  onWishlist,
  onDetails,
  onAddToCart,
  onBack,
}) {
  const [warranty, setWarranty] = React.useState("All");
  const [sortBy, setSortBy] = React.useState("featured");
  const [filterOpen, setFilterOpen] = React.useState(false);

  const categoryProducts = products.filter((product) => {
    return (
      product.category === category ||
      product.categoryGroup === category
    );
  });

  const filteredProducts = categoryProducts.filter((product) => {
    if (warranty === "All") return true;

    if (warranty === "None") {
      return !product.warranty;
    }

    return product.warranty?.startsWith(warranty);
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "name-asc") {
      return a.name.localeCompare(b.name);
    }

    if (sortBy === "name-desc") {
      return b.name.localeCompare(a.name);
    }

    return 0;
  });

  return (
    <section className="category-products-page">

      {/* TOP BAR */}

      <div className="category-products-topbar">

        <button
          className="category-back-btn"
          onClick={onBack}
        >
          <ArrowLeft size={18} />
          Back to Categories
        </button>

        <div className="category-page-title">
          <span>MAXWELL CATALOGUE</span>
          <h1>{category}</h1>
          <p>
            Explore our {category.toLowerCase()} range
          </p>
        </div>

      </div>


      {/* CONTENT */}

      <div className="category-products-layout">

        {/* DESKTOP FILTER */}

        <aside className="category-filter-sidebar">

          <div className="category-filter-heading">
            <div>
              <span>REFINE</span>
              <h2>Filter</h2>
            </div>

            <Filter size={19} />
          </div>


          {/* WARRANTY */}

          <div className="category-filter-block">

            <div className="category-filter-label">
              <strong>Warranty</strong>

              {warranty !== "All" && (
                <button
                  onClick={() => setWarranty("All")}
                >
                  Clear
                </button>
              )}
            </div>

            <label>
              <input
                type="radio"
                name="warranty"
                checked={warranty === "All"}
                onChange={() =>
                  setWarranty("All")
                }
              />
              Any Warranty
            </label>

            <label>
              <input
                type="radio"
                name="warranty"
                checked={warranty === "1 Year"}
                onChange={() =>
                  setWarranty("1 Year")
                }
              />
              1 Year
            </label>

            <label>
              <input
                type="radio"
                name="warranty"
                checked={warranty === "2 Years"}
                onChange={() =>
                  setWarranty("2 Years")
                }
              />
              2 Years
            </label>

            <label>
              <input
                type="radio"
                name="warranty"
                checked={warranty === "5 Years"}
                onChange={() =>
                  setWarranty("5 Years")
                }
              />
              5 Years
            </label>

            <label>
              <input
                type="radio"
                name="warranty"
                checked={warranty === "None"}
                onChange={() =>
                  setWarranty("None")
                }
              />
              Not Listed
            </label>

          </div>


          {/* SORT */}

          <div className="category-filter-block">

            <div className="category-filter-label">
              <strong>Sort By</strong>
            </div>

            <label>
              <input
                type="radio"
                name="sort"
                checked={sortBy === "featured"}
                onChange={() =>
                  setSortBy("featured")
                }
              />
              Featured
            </label>

            <label>
              <input
                type="radio"
                name="sort"
                checked={sortBy === "name-asc"}
                onChange={() =>
                  setSortBy("name-asc")
                }
              />
              Name: A to Z
            </label>

            <label>
              <input
                type="radio"
                name="sort"
                checked={sortBy === "name-desc"}
                onChange={() =>
                  setSortBy("name-desc")
                }
              />
              Name: Z to A
            </label>

          </div>

        </aside>


        {/* PRODUCT AREA */}

        <div className="category-products-content">

          {/* HEADING */}

          <div className="category-products-heading">

            <div>
              <span className="small-title">
                MAXWELL RANGE
              </span>

              <h2>{category}</h2>

              <p>
                {sortedProducts.length} product
                {sortedProducts.length === 1
                  ? ""
                  : "s"} available
              </p>
            </div>


            <button
              className="mobile-filter-btn"
              onClick={() =>
                setFilterOpen(true)
              }
            >
              <SlidersHorizontal size={17} />
              Filter
            </button>

          </div>


          {/* ACTIVE FILTERS */}

          {(warranty !== "All" ||
            sortBy !== "featured") && (

            <div className="category-active-filters">

              {warranty !== "All" && (
                <span>
                  Warranty:{" "}
                  {warranty === "None"
                    ? "Not Listed"
                    : warranty}

                  <button
                    onClick={() =>
                      setWarranty("All")
                    }
                  >
                    <X size={12} />
                  </button>
                </span>
              )}

              {sortBy !== "featured" && (
                <span>
                  {sortBy === "name-asc"
                    ? "A to Z"
                    : "Z to A"}

                  <button
                    onClick={() =>
                      setSortBy("featured")
                    }
                  >
                    <X size={12} />
                  </button>
                </span>
              )}

            </div>

          )}


          {/* PRODUCTS */}

          {sortedProducts.length > 0 ? (

            <div className="category-product-grid">

              {sortedProducts.map((product) => (

                <ProductCard
                  key={product.id}
                  product={product}
                  wished={wishlist.includes(
                    product.id
                  )}
                  onWishlist={onWishlist}
                  onDetails={onDetails}
                  onAddToCart={onAddToCart}
                />

              ))}

            </div>

          ) : (

            <div className="category-empty">

              <Filter size={42} />

              <h3>
                No products found
              </h3>

              <p>
                Try changing the current
                filter.
              </p>

              <button
                onClick={() => {
                  setWarranty("All");
                  setSortBy("featured");
                }}
              >
                Clear Filters
              </button>

            </div>

          )}

        </div>

      </div>


      {/* MOBILE FILTER DRAWER */}

      {filterOpen && (

        <div
          className="category-mobile-filter-overlay"
          onMouseDown={(e) => {
            if (
              e.target ===
              e.currentTarget
            ) {
              setFilterOpen(false);
            }
          }}
        >

          <aside className="category-mobile-filter">

            <div className="category-mobile-filter-header">

              <div>
                <span>REFINE RANGE</span>
                <h2>Filter</h2>
              </div>

              <button
                onClick={() =>
                  setFilterOpen(false)
                }
              >
                <X size={21} />
              </button>

            </div>


            <div className="category-mobile-filter-body">

              <h3>Warranty</h3>

              {[
                ["All", "Any Warranty"],
                ["1 Year", "1 Year"],
                ["2 Years", "2 Years"],
                ["5 Years", "5 Years"],
                ["None", "Not Listed"],
              ].map(([value, label]) => (

                <label key={value}>

                  <input
                    type="radio"
                    name="mobile-warranty"
                    checked={
                      warranty === value
                    }
                    onChange={() =>
                      setWarranty(value)
                    }
                  />

                  {label}

                </label>

              ))}


              <h3>Sort By</h3>

              {[
                ["featured", "Featured"],
                ["name-asc", "Name: A to Z"],
                ["name-desc", "Name: Z to A"],
              ].map(([value, label]) => (

                <label key={value}>

                  <input
                    type="radio"
                    name="mobile-sort"
                    checked={
                      sortBy === value
                    }
                    onChange={() =>
                      setSortBy(value)
                    }
                  />

                  {label}

                </label>

              ))}

            </div>


            <div className="category-mobile-filter-footer">

              <button
                onClick={() => {
                  setWarranty("All");
                  setSortBy("featured");
                }}
              >
                Reset
              </button>

              <button
                onClick={() =>
                  setFilterOpen(false)
                }
              >
                Show{" "}
                {sortedProducts.length} Products
              </button>

            </div>

          </aside>

        </div>

      )}

    </section>
  );
}

export default CategoryProducts;