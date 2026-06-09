import { useState } from "react";
import { useCart } from "../context/CartContext";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80";

export default function CartPage({ setPage }) {
  const { cart, cartTotal, removeFromCart, updateQty, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState("");
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("visa");
  const [paymentValue, setPaymentValue] = useState("");
  const [processing, setProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  if (orderPlaced) return (
    <div style={{ maxWidth: 620, margin: "80px auto", textAlign: "center", padding: "0 24px", fontFamily: "'Cormorant Garamond', serif" }}>
      <div style={{ fontSize: 68, marginBottom: 20 }}>✅</div>
      <h2 style={{ fontSize: 38, fontWeight: 300, margin: "0 0 12px" }}>Payment <em>Successful</em></h2>
      <p style={{ color: "#666", margin: "0 0 28px", fontFamily: "sans-serif", fontSize: 15 }}>
        Your order has been placed successfully. A confirmation message has been sent.
      </p>
      <button onClick={() => setPage("home")} style={{ background: "#1A1A1A", color: "#fff", border: "none", padding: "14px 36px", fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", borderRadius: 8, fontFamily: "sans-serif" }}>
        Continue Shopping
      </button>
    </div>
  );

  if (cart.length === 0) return (
    <div style={{ maxWidth: 600, margin: "80px auto", textAlign: "center", padding: "0 24px", fontFamily: "'Cormorant Garamond', serif" }}>
      <div style={{ fontSize: 80, marginBottom: 24 }}>🛍️</div>
      <h2 style={{ fontSize: 36, fontWeight: 300, margin: "0 0 12px" }}>Your bag is <em>empty</em></h2>
      <p style={{ color: "#888", margin: "0 0 32px", fontFamily: "sans-serif", fontSize: 15 }}>Looks like you haven't added anything yet.</p>
      <button onClick={() => setPage("listing")} style={{ background: "#1A1A1A", color: "#fff", border: "none", padding: "14px 36px", fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", borderRadius: 8, fontFamily: "sans-serif" }}>Start Shopping</button>
    </div>
  );

  const shipping = cartTotal >= 999 ? 0 : 99;
  const tax = Math.round(cartTotal * 0.05);
  const promoDiscount = promoApplied === "SAVE10" ? Math.round(cartTotal * 0.1) : 0;
  const finalTotal = cartTotal + shipping + tax - promoDiscount;

  const applyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === "SAVE10") {
      setPromoApplied(code);
      setPaymentError("");
      return;
    }
    setPromoApplied("");
    setPaymentError("Promo code is invalid. Try SAVE10.");
  };

  const validatePayment = () => {
    if (paymentMethod === "upi") {
      return /^[\w.-]+@[\w.-]+$/.test(paymentValue.trim()) ? "" : "Enter a valid UPI ID (example: name@bank).";
    }
    if (paymentMethod === "paytm") {
      return /^\d{10}$/.test(paymentValue.trim()) ? "" : "Enter your 10-digit PayTM number.";
    }
    const numberOnly = paymentValue.replace(/\s+/g, "");
    return /^\d{12,19}$/.test(numberOnly) ? "" : "Enter a valid card number.";
  };

  const handleCheckout = () => {
    setPaymentError("");
    const paymentValidationError = validatePayment();
    if (paymentValidationError) {
      setPaymentError(paymentValidationError);
      return;
    }

    setProcessing(true);
    setTimeout(() => {
      clearCart();
      setProcessing(false);
      setOrderPlaced(true);
    }, 1200);
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 5% 80px", fontFamily: "'Cormorant Garamond', serif" }}>
      <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 300, margin: "0 0 40px" }}>Shopping <em>Bag</em> <span style={{ fontSize: 18, color: "#888", fontFamily: "sans-serif" }}>({cart.length} items)</span></h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 40, alignItems: "flex-start" }} className="cart-grid">
        {/* Items */}
        <div>
          {cart.map(item => (
            <div key={item.key} style={{ display: "flex", gap: 20, paddingBottom: 24, marginBottom: 24, borderBottom: "1px solid #F0EDE8" }}>
              <div style={{ width: 100, height: 130, borderRadius: 10, overflow: "hidden", flexShrink: 0, background: "#F9F7F4", cursor: "pointer" }} onClick={() => {}}>
                <img
                  src={item.image}
                  alt={item.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = FALLBACK_IMAGE;
                  }}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <h3 style={{ fontSize: 18, fontWeight: 500, margin: "0 0 6px" }}>{item.name}</h3>
                  <span style={{ fontSize: 18, fontWeight: 600, fontFamily: "sans-serif" }}>₹{(item.price * item.qty).toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", gap: 16, marginBottom: 12, fontFamily: "sans-serif", fontSize: 13, color: "#666" }}>
                  <span>Size: <strong>{item.size}</strong></span>
                  <span style={{ display: "flex", alignItems: "center", gap: 5 }}>Color: <span style={{ display: "inline-block", width: 14, height: 14, borderRadius: "50%", background: item.color, border: "1px solid rgba(0,0,0,0.15)", verticalAlign: "middle" }} /></span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", border: "1px solid #DDD", borderRadius: 6 }}>
                    <button onClick={() => updateQty(item.key, item.qty - 1)} style={{ width: 32, height: 32, background: "none", border: "none", cursor: "pointer", fontSize: 16 }}>−</button>
                    <span style={{ width: 28, textAlign: "center", fontSize: 14, fontFamily: "sans-serif" }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.key, item.qty + 1)} style={{ width: 32, height: 32, background: "none", border: "none", cursor: "pointer", fontSize: 16 }}>+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.key)} style={{ background: "none", border: "none", cursor: "pointer", color: "#E11D48", fontSize: 12, fontWeight: 600, fontFamily: "sans-serif", letterSpacing: "0.06em" }}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div style={{ background: "#F9F7F4", borderRadius: 16, padding: 28, position: "sticky", top: 84 }}>
          <h3 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 24px" }}>Order Summary</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20, fontFamily: "sans-serif", fontSize: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#555" }}>
              <span>Subtotal</span><span>₹{cartTotal.toLocaleString()}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#555" }}>
              <span>Shipping</span><span style={{ color: shipping === 0 ? "#0F6E56" : undefined }}>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#555" }}>
              <span>GST (5%)</span><span>₹{tax.toLocaleString()}</span>
            </div>
            {promoDiscount > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", color: "#0F6E56" }}>
                <span>Promo Discount</span><span>-₹{promoDiscount.toLocaleString()}</span>
              </div>
            )}
          </div>

          <div style={{ borderTop: "1px solid #E0DDD8", paddingTop: 16, marginBottom: 20, display: "flex", justifyContent: "space-between", fontWeight: 600, fontSize: 18 }}>
            <span>Total</span><span>₹{finalTotal.toLocaleString()}</span>
          </div>

          {shipping > 0 && <p style={{ fontSize: 12, color: "#C4A882", fontFamily: "sans-serif", margin: "0 0 16px", background: "#FFF9F0", padding: "8px 12px", borderRadius: 8 }}>Add ₹{(999-cartTotal).toLocaleString()} more for free shipping!</p>}

          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 8 }}>
              <input value={promoCode} onChange={(e) => setPromoCode(e.target.value)} placeholder="Promo code (SAVE10)" style={{ flex: 1, border: "1px solid #DDD", borderRadius: 8, padding: "10px 14px", fontSize: 13, outline: "none", fontFamily: "sans-serif", background: "#fff" }} />
              <button onClick={applyPromo} style={{ background: "#1A1A1A", color: "#fff", border: "none", borderRadius: 8, padding: "10px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "sans-serif", letterSpacing: "0.08em" }}>Apply</button>
            </div>
            {promoApplied && <p style={{ margin: "8px 0 0", color: "#0F6E56", fontSize: 12, fontFamily: "sans-serif" }}>Promo {promoApplied} applied successfully.</p>}
          </div>

          <button onClick={() => setCheckoutOpen((v) => !v)} style={{ width: "100%", background: "#1A1A1A", color: "#fff", border: "none", borderRadius: 10, padding: "16px", fontSize: 14, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", fontFamily: "sans-serif", marginBottom: 12 }}>
            {checkoutOpen ? "Hide Checkout" : "Proceed to Checkout →"}
          </button>

          {checkoutOpen && (
            <div style={{ background: "#fff", border: "1px solid #E7E2DC", borderRadius: 10, padding: 14, marginBottom: 12, fontFamily: "sans-serif" }}>
              <p style={{ margin: "0 0 8px", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 700, color: "#666" }}>Select Payment Option</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
                {[
                  { id: "visa", label: "Visa" },
                  { id: "mastercard", label: "MasterCard" },
                  { id: "upi", label: "UPI" },
                  { id: "paytm", label: "PayTM" },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => {
                      setPaymentMethod(method.id);
                      setPaymentValue("");
                      setPaymentError("");
                    }}
                    style={{
                      border: `1.5px solid ${paymentMethod === method.id ? "#1A1A1A" : "#DDD"}`,
                      borderRadius: 8,
                      padding: "10px 8px",
                      cursor: "pointer",
                      fontSize: 12,
                      background: paymentMethod === method.id ? "#1A1A1A" : "#fff",
                      color: paymentMethod === method.id ? "#fff" : "#333",
                      fontWeight: 600,
                    }}
                  >
                    {method.label}
                  </button>
                ))}
              </div>

              <input
                value={paymentValue}
                onChange={(e) => {
                  if (paymentMethod === "upi") setPaymentValue(e.target.value);
                  else if (paymentMethod === "paytm") setPaymentValue(e.target.value.replace(/[^\d]/g, ""));
                  else setPaymentValue(e.target.value.replace(/[^\d\s]/g, ""));
                }}
                placeholder={paymentMethod === "upi" ? "Enter UPI ID (name@bank)" : paymentMethod === "paytm" ? "Enter PayTM number" : "Enter card number"}
                maxLength={paymentMethod === "paytm" ? 10 : undefined}
                style={{ width: "100%", border: "1px solid #DDD", borderRadius: 8, padding: "10px 12px", fontSize: 13, outline: "none", marginBottom: 10 }}
              />

              {paymentError && <p style={{ margin: "0 0 10px", color: "#C62828", fontSize: 12 }}>{paymentError}</p>}

              <button
                onClick={handleCheckout}
                disabled={processing}
                style={{ width: "100%", background: processing ? "#777" : "#0F6E56", color: "#fff", border: "none", borderRadius: 8, padding: "12px", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", cursor: processing ? "not-allowed" : "pointer" }}
              >
                {processing ? "Processing Payment..." : `Pay ₹${finalTotal.toLocaleString()} Now`}
              </button>
            </div>
          )}

          <button onClick={() => setPage("listing")} style={{ width: "100%", background: "none", border: "1.5px solid #1A1A1A", color: "#1A1A1A", borderRadius: 10, padding: "12px", fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: "sans-serif" }}>
            Continue Shopping
          </button>

          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 20, opacity: 0.5 }}>
            {["Visa","MC","UPI","PayTM"].map(m => <span key={m} style={{ fontSize: 11, fontFamily: "sans-serif", fontWeight: 600 }}>{m}</span>)}
          </div>
        </div>
      </div>

      <style>{`@media (max-width: 768px) { .cart-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}