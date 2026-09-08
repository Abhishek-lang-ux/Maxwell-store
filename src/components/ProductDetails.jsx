import {
  X,
  ShoppingBag,
  Minus,
  Plus,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  ArrowLeft,
} from "lucide-react";
import { useState } from "react";

function ProductDetails({
  product,
  products,
  onClose,
  onAddToCart,
  onOpenProduct,
}) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  if (!product) return null;

  const increaseQty = () => {
    setQuantity((q) => q + 1);
  };

  const decreaseQty = () => {
    setQuantity((q) => Math.max(1, q - 1));
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
  };

  const relatedProducts = products
    .filter(
      (item) =>
        item.id !== product.id &&
        (item.category === product.category ||
          item.categoryGroup === product.categoryGroup)
    )
    .slice(0, 4);

  const reviews = [
    {
      name: "Rahul Sharma",
      rating: 5,
      text: "Very good product. Build quality is excellent and the product looks premium.",
    },
    {
      name: "Amit Verma",
      rating: 5,
      text: "Good quality and performance. Maxwell product is value for money.",
    },
    {
      name: "Priya Singh",
      rating: 4,
      text: "Product quality is good. Design is also very attractive.",
    },
  ];

  return (
    <div
      className="product-detail-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="product-detail-page">

        {/* TOP BAR */}
        <div className="product-detail-topbar">
          <button className="product-back-btn" onClick={onClose}>
            <ArrowLeft size={18} />
            Back to Products
          </button>

          <button
            className="product-detail-close"
            onClick={onClose}
            aria-label="Close product details"
          >
            <X size={21} />
          </button>
        </div>

        {/* MAIN PRODUCT */}
        <div className="product-detail-main">

          {/* IMAGE */}
          <div className="product-detail-gallery">
            <div className="product-detail-image">
              <span className="product-detail-badge">
                MAXWELL
              </span>

              <img
                src={product.image}
                alt={product.name}
              />
            </div>

            <div className="product-trust-row">
              <div>
                <ShieldCheck size={20} />
                <span>Quality Assured</span>
              </div>

              <div>
                <Truck size={20} />
                <span>Fast Delivery</span>
              </div>

              <div>
                <RotateCcw size={20} />
                <span>Easy Support</span>
              </div>
            </div>
          </div>

          {/* PRODUCT INFO */}
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
                4.6 <Star size={13} fill="currentColor" />
              </span>

              <span className="rating-text">
                128 Ratings & 24 Reviews
              </span>
            </div>

            <div className="product-detail-divider" />

            {/* PRICE */}
            <div className="product-price">
              Contact for Price
            </div>

            <p className="price-note">
              Best price available from Maxwell authorised sellers.
            </p>

            {/* WARRANTY */}
            {product.warranty && (
              <div className="product-detail-warranty">
                <ShieldCheck size={18} />
                <div>
                  <strong>{product.warranty}</strong>
                  <span>Official Maxwell warranty</span>
                </div>
              </div>
            )}

            {/* HIGHLIGHTS */}
            <div className="product-highlights">
              <h3>Highlights</h3>

              <div className="highlight-list">
                <div>
                  <Check size={16} />
                  <span>Premium Maxwell quality</span>
                </div>

                <div>
                  <Check size={16} />
                  <span>Designed for everyday use</span>
                </div>

                <div>
                  <Check size={16} />
                  <span>Reliable performance</span>
                </div>

                <div>
                  <Check size={16} />
                  <span>Customer support available</span>
                </div>
              </div>
            </div>

            {/* QUANTITY */}
            <div className="detail-quantity-row">
              <span>Quantity</span>

              <div className="detail-quantity">
                <button onClick={decreaseQty}>
                  <Minus size={15} />
                </button>

                <strong>{quantity}</strong>

                <button onClick={increaseQty}>
                  <Plus size={15} />
                </button>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="product-detail-actions">

              <button
                className="detail-add-cart"
                onClick={handleAddToCart}
              >
                <ShoppingBag size={18} />
                Add to Cart
              </button>

              <button
                className="detail-buy-now"
                onClick={() => {
                  handleAddToCart();
                  onClose();
                }}
              >
                Buy Now
              </button>

            </div>

          </div>
        </div>

        {/* TABS */}
        <div className="product-detail-tabs">

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

        {/* TAB CONTENT */}
        <div className="product-detail-tab-content">

          {activeTab === "description" && (
            <div className="detail-description">

              <h2>About this product</h2>

              <p>
                {product.name} is designed to deliver dependable
                performance, premium build quality and convenient
                everyday usage. Maxwell focuses on practical
                appliances that combine performance, durability
                and modern design.
              </p>

              <p>
                This product is suitable for customers looking for
                reliable Maxwell appliances with a balance of
                performance and value.
              </p>

            </div>
          )}

          {activeTab === "specifications" && (
            <div className="detail-specifications">

              <h2>Product Specifications</h2>

              <div className="spec-table">

                <div>
                  <span>Product Name</span>
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
                  <span>Features</span>
                  <strong>{product.spec}</strong>
                </div>

                <div>
                  <span>Warranty</span>
                  <strong>
                    {product.warranty || "Not listed"}
                  </strong>
                </div>

                <div>
                  <span>Brand</span>
                  <strong>Maxwell</strong>
                </div>

              </div>

            </div>
          )}

          {activeTab === "reviews" && (
            <div className="detail-reviews">

              <div className="review-summary">

                <div className="review-score">
                  <strong>4.6</strong>

                  <div>
                    <div className="review-stars">
                      ★★★★★
                    </div>

                    <span>
                      128 Ratings & 24 Reviews
                    </span>
                  </div>
                </div>

              </div>

              <div className="review-list">

                {reviews.map((review, index) => (
                  <div className="review-item" key={index}>

                    <div className="review-header">
                      <strong>{review.name}</strong>

                      <span className="review-rating">
                        {review.rating} ★
                      </span>
                    </div>

                    <p>{review.text}</p>

                  </div>
                ))}

              </div>

            </div>
          )}

        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <section className="related-products">

            <div className="related-heading">
              <div>
                <p className="small-title">
                  YOU MAY ALSO LIKE
                </p>

                <h2>More from Maxwell</h2>
              </div>
            </div>

            <div className="related-grid">

              {relatedProducts.map((item) => (
                <button
                  className="related-product-card"
                  key={item.id}
                  onClick={() => onOpenProduct(item)}
                >
                  <div className="related-product-image">
                    <img
                      src={item.image}
                      alt={item.name}
                    />
                  </div>

                  <div className="related-product-info">
                    <p>{item.category}</p>
                    <h3>{item.name}</h3>
                    <span>{item.model}</span>
                  </div>
                </button>
              ))}

            </div>

          </section>
        )}

      </div>
    </div>
  );
}

export default ProductDetails;