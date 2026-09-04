import { ArrowUpRight, Heart, ShoppingBag } from "lucide-react";

function ProductCard({ product, wished, onWishlist, onDetails, onAddToCart }) {
  return (
    <article className="product-card">
      <div className="product-image-wrapper">
        <span className="catalogue-badge">CATALOGUE</span>
        <button className={`wishlist-btn ${wished ? "liked" : ""}`} onClick={() => onWishlist(product.id)} aria-label={`${wished ? "Remove" : "Add"} ${product.name} ${wished ? "from" : "to"} wishlist`}><Heart size={18} fill={wished ? "currentColor" : "none"} /></button>
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3>{product.name}</h3>
        <p className="product-model">Model: <strong>{product.model}</strong></p>
        <p className="product-spec">{product.spec}</p>
        {product.warranty && <span className="warranty">{product.warranty}</span>}
        <div className="product-actions">
          <button className="add-cart-btn" onClick={() => onAddToCart(product)}><ShoppingBag size={16} /> Add to Cart</button>
          <button className="details-btn" onClick={() => onDetails(product)} aria-label={`View details of ${product.name}`}><ArrowUpRight size={16} /></button>
        </div>
      </div>
    </article>
  );
}
export default ProductCard;
