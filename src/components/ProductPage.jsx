import { useState } from "react";
import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Check,
} from "lucide-react";

function ProductPage({
  product,
  products,
  wishlist,
  onWishlist,
  onAddToCart,
  onOpenProduct,
  onBack,
}) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const relatedProducts = products
    .filter(
      (item) =>
        item.id !== product.id &&
        (item.categoryGroup === product.categoryGroup ||
          item.category === product.category)
    )
    .slice(0, 4);

  const increaseQty = () => setQuantity((q) => q + 1);

  const decreaseQty = () => {
    setQuantity((q) => Math.max(1, q - 1));
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
  };

  return (
    <div className="product-page">

      {/* TOP BAR */}
      <div className="product-page-top">
        <button className="product-back-btn" onClick={onBack}>
          <ArrowLeft size={18} />
          Back to Products
        </button>

        <span>Maxwell Store</span>
      </div>

      {/* PRODUCT MAIN */}
      <section className="product-detail-section">

        {/* IMAGE */}
        <div className="product-detail-image-box">
          <img
            src={product.image}
            alt={product.name}
          />

          <span className="product-detail-badge">
            CATALOGUE
          </span>
        </div>

        {/* DETAILS */}
        <div className="product-detail-info">

          <p className="product-detail-category">
            {product.category}
          </p>

          <h1>{product.name}</h1>

          <p className="product-detail-model">
            Model: <strong>{product.model}</strong>
          </p>

          {/* RATING */}
          <div className="product-rating-row">
            <span className="rating-box">
              4.6 <Star size={14} fill="currentColor" />
            </span>

            <strong>128 Ratings</strong>

            <span className="rating-separator">•</span>

            <strong>24 Reviews</strong>
          </div>

          <div className="product-price-area">
            <span className="price-label">
              Product Enquiry
            </span>

            <h2>Contact for Price</h2>

            <p>
              Contact us for current price and availability.
            </p>
          </div>

          {/* WARRANTY */}
          {product.warranty && (
            <div className="product-warranty-box">
              <Check size={18} />
              <span>
                {product.warranty} Warranty
              </span>
            </div>
          )}

          {/* QUANTITY */}
          <div className="quantity-section">
            <span>Quantity</span>

            <div className="quantity-control">
              <button onClick={decreaseQty}>
                <Minus size={16} />
              </button>

              <strong>{quantity}</strong>

              <button onClick={increaseQty}>
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="product-detail-actions">

            <button
              className="product-add-cart"
              onClick={handleAddToCart}
            >
              <ShoppingBag size={19} />
              Add to Cart
            </button>

            <button
              className={`product-wishlist ${
                wishlist.includes(product.id) ? "liked" : ""
              }`}
              onClick={() => onWishlist(product.id)}
            >
              <Heart
                size={20}
                fill={
                  wishlist.includes(product.id)
                    ? "currentColor"
                    : "none"
                }
              />
            </button>

          </div>

          {/* HIGHLIGHTS */}
          <div className="product-highlights">

            <h3>Product Highlights</h3>

            <div className="highlight-item">
              <Check size={16} />
              <span>Premium Maxwell quality</span>
            </div>

            <div className="highlight-item">
              <Check size={16} />
              <span>Reliable performance</span>
            </div>

            <div className="highlight-item">
              <Check size={16} />
              <span>Designed for everyday use</span>
            </div>

            <div className="highlight-item">
              <Check size={16} />
              <span>Quality checked product</span>
            </div>

          </div>

        </div>
      </section>

      {/* INFORMATION TABS */}
      <section className="product-information">

        <div className="product-tabs">

          <button
            className={activeTab === "description" ? "active" : ""}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>

          <button
            className={activeTab === "specifications" ? "active" : ""}
            onClick={() => setActiveTab("specifications")}
          >
            Specifications
          </button>

          <button
            className={activeTab === "reviews" ? "active" : ""}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews
          </button>

        </div>

        <div className="product-tab-content">

          {activeTab === "description" && (
            <div>
              <h2>About this product</h2>

              <p>
                {product.name} is part of the Maxwell product
                catalogue, designed to provide dependable
                performance and practical everyday usability.
              </p>

              <p>
                This product is suitable for customers looking
                for reliable quality and professional Maxwell
                product standards.
              </p>
            </div>
          )}

          {activeTab === "specifications" && (
            <div className="specification-table">

              <div>
                <span>Product</span>
                <strong>{product.name}</strong>
              </div>

              <div>
                <span>Model</span>
                <strong>{product.model}</strong>
              </div>

              <div>
                <span>Category</span>
                <strong>{product.category}</strong>
              </div>

              <div>
                <span>Specification</span>
                <strong>{product.spec}</strong>
              </div>

              {product.warranty && (
                <div>
                  <span>Warranty</span>
                  <strong>{product.warranty}</strong>
                </div>
              )}

            </div>
          )}

          {activeTab === "reviews" && (
            <div className="reviews-section">

              <div className="review-summary">
                <strong>4.6</strong>

                <div>
                  <div className="stars">
                    ★★★★★
                  </div>

                  <span>
                    Based on 128 ratings
                  </span>
                </div>
              </div>

              <div className="review-card">
                <div className="review-stars">
                  ★★★★★
                </div>

                <strong>Excellent product</strong>

                <p>
                  Good quality and performance. Product
                  looks reliable and well finished.
                </p>

                <small>Verified Customer</small>
              </div>

              <div className="review-card">
                <div className="review-stars">
                  ★★★★☆
                </div>

                <strong>Good quality</strong>

                <p>
                  Overall a good product for regular use.
                </p>

                <small>Verified Customer</small>
              </div>

            </div>
          )}

        </div>
      </section>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="related-products">

          <div className="related-heading">
            <div>
              <span>YOU MAY ALSO LIKE</span>
              <h2>Related Products</h2>
            </div>
          </div>

          <div className="related-grid">

            {relatedProducts.map((item) => (
              <article
                key={item.id}
                className="related-card"
                onClick={() => onOpenProduct(item)}
              >

                <div className="related-image">
                  <img
                    src={item.image}
                    alt={item.name}
                  />
                </div>

                <div className="related-info">
                  <p>{item.category}</p>

                  <h3>{item.name}</h3>

                  <span>
                    Model: {item.model}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(item);
                    }}
                  >
                    <ShoppingBag size={15} />
                    Add to Cart
                  </button>
                </div>

              </article>
            ))}

          </div>
        </section>
      )}

    </div>
  );
}

export default ProductPage;