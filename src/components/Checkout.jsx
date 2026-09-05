import { useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, CreditCard, Mail, MapPin, Phone, ShoppingBag, UserRound, X } from "lucide-react";

const initialForm = {
  fullName: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  payment: "Order enquiry",
  notes: ""
};

function Checkout({ cart, onClose, onChangeQty, onRemove, onOrderPlaced }) {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [orderId, setOrderId] = useState("");

  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const orderLines = useMemo(
    () => cart.map((item) => `${item.name} (${item.model}) x ${item.qty}`).join("\n"),
    [cart]
  );

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const submit = (event) => {
    event.preventDefault();
    const id = `MX${Date.now().toString().slice(-8)}`;
    const order = {
      id,
      createdAt: new Date().toISOString(),
      customer: form,
      items: cart
    };
    localStorage.setItem("maxwell-last-order", JSON.stringify(order));
    setOrderId(id);
    setSubmitted(true);
    onOrderPlaced?.(order);
  };

  const emailOrder = () => {
    const subject = `Maxwell Order Enquiry - ${orderId}`;
    const body = [
      `Order ID: ${orderId}`,
      `Customer: ${form.fullName}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `Address: ${form.address}, ${form.city}, ${form.state} - ${form.pincode}`,
      `Order Type: ${form.payment}`,
      "",
      "Products:",
      orderLines,
      "",
      `Notes: ${form.notes || "-"}`
    ].join("\n");
    window.location.href = `mailto:info@maxwellgroup.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  if (submitted) {
    return (
      <div className="checkout-screen">
        <div className="checkout-success">
          <div className="success-icon"><CheckCircle2 size={42} /></div>
          <p className="small-title">MAXWELL ORDER REQUEST</p>
          <h1>Thank you, {form.fullName.split(" ")[0] || "Customer"}.</h1>
          <p>Your order request has been saved on this device. Your reference number is:</p>
          <strong className="order-number">{orderId}</strong>
          <div className="success-actions">
            <button className="checkout-btn" onClick={emailOrder}><Mail size={17} /> Send Order by Email</button>
            <button className="hero-secondary" onClick={onClose}>Continue Shopping</button>
          </div>
          <small>Maxwell will confirm product availability and pricing before final order processing.</small>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-screen">
      <div className="checkout-topbar">
        <button className="back-checkout" onClick={onClose}><ArrowLeft size={18} /> Back to cart</button>
        <div className="checkout-brand"><img src="/maxwell-logo.png" alt="Maxwell" /></div>
        <div className="checkout-secure"><ShoppingBag size={16} /> Secure enquiry</div>
      </div>

      <div className="checkout-content">
        <div className="checkout-main">
          <div className="checkout-heading">
            <div><p className="small-title">CHECKOUT</p><h1>Complete your order request</h1><p>Enter your contact and delivery details. Maxwell will confirm availability and final pricing.</p></div>
          </div>

          <form id="checkout-form" onSubmit={submit}>
            <section className="checkout-card">
              <div className="checkout-card-title"><span>01</span><div><h2>Contact information</h2><p>How should we reach you?</p></div></div>
              <div className="checkout-form-grid">
                <label>Full name<input value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Enter your full name" required /></label>
                <label>Mobile number<input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value.replace(/[^0-9+ -]/g, ""))} placeholder="10-digit mobile number" minLength="10" required /></label>
                <label className="full-field">Email address<input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" required /></label>
              </div>
            </section>

            <section className="checkout-card">
              <div className="checkout-card-title"><span>02</span><div><h2>Delivery details</h2><p>Where should we contact you for delivery?</p></div></div>
              <div className="checkout-form-grid">
                <label className="full-field">Address<textarea value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="House / shop number, street, locality" rows="3" required /></label>
                <label>City<input value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="City" required /></label>
                <label>State<input value={form.state} onChange={(e) => update("state", e.target.value)} placeholder="State" required /></label>
                <label>Pincode<input inputMode="numeric" value={form.pincode} onChange={(e) => update("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="6-digit pincode" pattern="[0-9]{6}" required /></label>
              </div>
            </section>

            <section className="checkout-card">
              <div className="checkout-card-title"><span>03</span><div><h2>Order preference</h2><p>Tell Maxwell how you want to proceed.</p></div></div>
              <div className="payment-options">
                {[
                  ["Order enquiry", "Confirm availability and pricing first", <CreditCard size={20} />],
                  ["Dealer / bulk enquiry", "For business, retail or bulk requirements", <ShoppingBag size={20} />]
                ].map(([value, text, icon]) => (
                  <label className={`payment-option ${form.payment === value ? "selected" : ""}`} key={value}>
                    <input type="radio" name="payment" value={value} checked={form.payment === value} onChange={(e) => update("payment", e.target.value)} />
                    <span className="payment-icon">{icon}</span>
                    <span><strong>{value}</strong><small>{text}</small></span>
                  </label>
                ))}
              </div>
              <label className="notes-field">Additional notes<textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Any colour, quantity, delivery or product notes?" rows="3" /></label>
            </section>
          </form>
        </div>

        <aside className="checkout-summary">
          <div className="summary-card">
            <div className="summary-head"><div><p className="small-title">YOUR BAG</p><h2>Order summary</h2></div><span>{itemCount} items</span></div>
            <div className="summary-items">
              {cart.map((item) => (
                <div className="summary-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div><strong>{item.name}</strong><small>{item.model}</small><div className="summary-qty"><button type="button" onClick={() => onChangeQty(item.id, -1)}>-</button><b>{item.qty}</b><button type="button" onClick={() => onChangeQty(item.id, 1)}>+</button><button type="button" onClick={() => onRemove(item.id)} className="summary-remove"><X size={13} /></button></div></div>
                </div>
              ))}
            </div>
            <div className="summary-note"><strong>Pricing confirmation</strong><span>Catalogue pricing is not displayed on this website. Maxwell will confirm final product pricing and availability.</span></div>
            <div className="summary-total"><span>Final amount</span><strong>On confirmation</strong></div>
            <button form="checkout-form" type="submit" className="checkout-btn">Place Order Request</button>
            <div className="checkout-trust"><span><UserRound size={15} /> Your details stay with this order request</span><span><MapPin size={15} /> Delivery details included</span><span><Phone size={15} /> Maxwell support available</span></div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Checkout;
