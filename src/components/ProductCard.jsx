import {
  ArrowUpRight,
  Heart,
  ShoppingBag,
  ShieldCheck,
} from "lucide-react";

function ProductCard({
  product,
  wished,
  onWishlist,
  onDetails,
  onAddToCart,
}) {
  return (
    <article
      className={`product-card ${wished ? "is-wished" : ""}`}
      onClick={() => onDetails(product)}
    >

      {/* ================= IMAGE ================= */}
      <div className="product-image-wrapper">

        {/* TOP BADGE */}
        <span className="catalogue-badge">
          <span className="badge-dot" />
          MAXWELL
        </span>

        {/* WISHLIST */}
        <button
          className={`wishlist-btn ${wished ? "liked" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onWishlist(product.id);
          }}
          aria-label={`${wished ? "Remove" : "Add"} ${
            product.name
          } ${wished ? "from" : "to"} wishlist`}
        >
          <Heart
            size={18}
            fill={wished ? "currentColor" : "none"}
          />
        </button>

        {/* IMAGE */}
        <div className="product-image-inner">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
          />
        </div>

        {/* HOVER DETAILS */}
        <div className="image-hover-label">
          <span>View Product</span>
          <ArrowUpRight size={15} />
        </div>

        {/* CORNER NUMBER */}
        <span className="product-corner-number">
          #{String(product.id).padStart(2, "0")}
        </span>
      </div>

      {/* ================= INFO ================= */}
      <div className="product-info">

        {/* CATEGORY */}
        <p className="product-category">
          {product.category}
        </p>

        {/* NAME */}
        <h3>{product.name}</h3>

        {/* MODEL */}
        <div className="product-model">
          <span>MODEL</span>
          <strong>{product.model}</strong>
        </div>

        {/* SPECIFICATION */}
        <p className="product-spec">
          {product.spec}
        </p>

        {/* WARRANTY */}
        {product.warranty && (
          <div className="warranty">
            <ShieldCheck size={13} />
            {product.warranty} Warranty
          </div>
        )}

        {/* ACTIONS */}
        <div className="product-actions">

          <button
            className="add-cart-btn"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
          >
            <ShoppingBag size={16} />

            <span>Add to Cart</span>

            <ArrowUpRight
              className="cart-arrow"
              size={14}
            />
          </button>

          <button
            className="details-btn"
            onClick={(e) => {
              e.stopPropagation();
              onDetails(product);
            }}
            aria-label={`View details of ${product.name}`}
          >
            <ArrowUpRight size={17} />
          </button>

        </div>
      </div>
    </article>
  );
}

export default ProductCard;