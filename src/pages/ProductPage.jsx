import { useState } from "react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80";

const reviews = [
  { name: "Priya S.", rating: 5, date: "March 2025", comment: "Absolutely love this! The fabric is so soft and the fit is perfect. Got so many compliments." },
  { name: "Anika R.", rating: 4, date: "Feb 2025", comment: "Great quality, ships fast. Slightly smaller than expected but overall a great buy." },
  { name: "Meera T.", rating: 5, date: "Jan 2025", comment: "My go-to piece this season. Washed it multiple times and it still looks brand new!" },
];

export default function ProductPage({ product: p, setPage, setSelectedProduct }) {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(p.colors[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [tab, setTab] = useState("description");

  const isWished = wishlist.includes(p.id);
  const related = products.filter(x => x.category === p.category && x.id !== p.id).slice(0, 4);

  const handleAdd = () => {
    if (!selectedSize) { alert("Please select a size"); return; }
    addToCart(p, selectedSize, selectedColor, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 5% 80px", fontFamily: "'Cormorant Garamond', serif" }}>
      {/* Breadcrumb */}
      <p style={{ fontSize: 12, color: "#888", margin: "0 0 28px", fontFamily: "sans-serif" }}>
        <span style={{ cursor: "pointer" }} onClick={() => setPage("home")}>Home</span> /{" "}
        <span style={{ cursor: "pointer" }} onClick={() => setPage(p.category)}>{p.category.charAt(0).toUpperCase() + p.category.slice(1)}</span> /{" "}
        <span style={{ color: "#1A1A1A" }}>{p.name}</span>
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, marginBottom: 80 }} className="product-grid">
        {/* Image */}
        <div style={{ borderRadius: 16, overflow: "hidden", aspectRatio: "3/4", background: "#F9F7F4" }}>
          <img
            src={p.image}
            alt={p.name}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = FALLBACK_IMAGE;
            }}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Details */}
        <div style={{ paddingTop: 8 }}>
          {p.badge && <span style={{ background: p.badge === "Sale" ? "#E11D48" : p.badge === "New" ? "#1E3A5F" : "#C4A882", color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", padding: "4px 12px", borderRadius: 20, fontFamily: "sans-serif", textTransform: "uppercase" }}>{p.badge}</span>}
          
          <h1 style={{ fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 400, margin: p.badge ? "16px 0 8px" : "0 0 8px", lineHeight: 1.2 }}>{p.name}</h1>
          
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <div style={{ display: "flex", gap: 2 }}>
              {"★★★★★".split("").map((s, i) => (
                <span key={i} style={{ fontSize: 15, color: i < Math.floor(p.rating) ? "#C4A882" : "#DDD" }}>★</span>
              ))}
            </div>
            <span style={{ fontSize: 14, color: "#888", fontFamily: "sans-serif" }}>{p.rating} · {p.reviews} reviews</span>
          </div>

          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 28 }}>
            <span style={{ fontSize: 32, fontWeight: 600 }}>₹{p.price.toLocaleString()}</span>
            {p.originalPrice && <>
              <span style={{ fontSize: 20, color: "#AAA", textDecoration: "line-through", fontFamily: "sans-serif" }}>₹{p.originalPrice.toLocaleString()}</span>
              <span style={{ background: "#FFF0F3", color: "#E11D48", fontSize: 13, fontWeight: 700, padding: "4px 10px", borderRadius: 20, fontFamily: "sans-serif" }}>-{Math.round((1-p.price/p.originalPrice)*100)}%</span>
            </>}
          </div>

          {/* Color */}
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.06em", margin: "0 0 10px", fontFamily: "sans-serif", color: "#444" }}>Color</p>
            <div style={{ display: "flex", gap: 8 }}>
              {p.colors.map((c, i) => (
                <button key={i} onClick={() => setSelectedColor(c)} title={c}
                  style={{ width: 32, height: 32, borderRadius: "50%", background: c, border: selectedColor === c ? "2px solid #1A1A1A" : "1.5px solid rgba(0,0,0,0.15)", cursor: "pointer", boxShadow: selectedColor === c ? "0 0 0 3px #fff, 0 0 0 5px #1A1A1A" : "none", transition: "box-shadow 0.2s" }} />
              ))}
            </div>
          </div>

          {/* Size */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.06em", margin: 0, fontFamily: "sans-serif", color: "#444" }}>Size {selectedSize && <span style={{ color: "#C4A882" }}>— {selectedSize}</span>}</p>
              <span style={{ fontSize: 12, color: "#C4A882", fontFamily: "sans-serif", cursor: "pointer", textDecoration: "underline" }}>Size guide</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {p.sizes.map(s => (
                <button key={s} onClick={() => setSelectedSize(s)}
                  style={{ padding: "8px 16px", border: `1.5px solid ${selectedSize === s ? "#1A1A1A" : "#DDD"}`, background: selectedSize === s ? "#1A1A1A" : "#fff", color: selectedSize === s ? "#fff" : "#444", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "sans-serif", transition: "all 0.15s" }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Qty + Add */}
          <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", border: "1.5px solid #DDD", borderRadius: 8, overflow: "hidden" }}>
              <button onClick={() => setQty(q => Math.max(1, q-1))} style={{ width: 40, height: 52, background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#444" }}>−</button>
              <span style={{ width: 40, textAlign: "center", fontSize: 15, fontFamily: "sans-serif" }}>{qty}</span>
              <button onClick={() => setQty(q => q+1)} style={{ width: 40, height: 52, background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#444" }}>+</button>
            </div>
            <button onClick={handleAdd} style={{ flex: 1, background: added ? "#0F6E56" : "#1A1A1A", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", fontFamily: "sans-serif", transition: "background 0.3s" }}>
              {added ? "✓ Added to Cart" : "Add to Cart"}
            </button>
            <button onClick={() => toggleWishlist(p.id)} style={{ width: 52, height: 52, background: "none", border: "1.5px solid #DDD", borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" fill={isWished ? "#E11D48" : "none"} stroke={isWished ? "#E11D48" : "#666"} strokeWidth="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </button>
          </div>

          <button onClick={() => setPage("cart")} style={{ width: "100%", background: "#C4A882", color: "#fff", border: "none", borderRadius: 8, padding: "14px", fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", fontFamily: "sans-serif", marginBottom: 24 }}>
            Buy Now
          </button>

          {/* Features */}
          <div style={{ display: "flex", gap: 20, padding: "16px 0", borderTop: "1px solid #F0EDE8", borderBottom: "1px solid #F0EDE8", marginBottom: 28, flexWrap: "wrap" }}>
            {[["🚚","Free shipping above ₹999"],["🔄","30-day returns"],["🌿","Sustainable fabric"]].map(([icon, txt]) => (
              <div key={txt} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#555", fontFamily: "sans-serif" }}>
                <span>{icon}</span><span>{txt}</span>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div>
            <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #F0EDE8", marginBottom: 16 }}>
              {["description","details","care"].map(t => (
                <button key={t} onClick={() => setTab(t)} style={{ background: "none", border: "none", borderBottom: tab === t ? "2px solid #1A1A1A" : "2px solid transparent", padding: "8px 16px", fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "capitalize", cursor: "pointer", color: tab === t ? "#1A1A1A" : "#888", fontFamily: "sans-serif" }}>
                  {t}
                </button>
              ))}
            </div>
            {tab === "description" && <p style={{ fontSize: 15, lineHeight: 1.8, color: "#555", margin: 0, fontFamily: "sans-serif" }}>{p.description}</p>}
            {tab === "details" && <ul style={{ fontSize: 14, lineHeight: 2, color: "#555", fontFamily: "sans-serif", paddingLeft: 18 }}>
              <li>Category: {p.category.charAt(0).toUpperCase() + p.category.slice(1)}</li>
              <li>Available sizes: {p.sizes.join(", ")}</li>
              <li>Material: 100% Premium Cotton</li>
              <li>Country of origin: India</li>
            </ul>}
            {tab === "care" && <ul style={{ fontSize: 14, lineHeight: 2, color: "#555", fontFamily: "sans-serif", paddingLeft: 18 }}>
              <li>Machine wash cold, gentle cycle</li><li>Do not bleach</li><li>Tumble dry low</li><li>Iron on low heat</li>
            </ul>}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section style={{ marginBottom: 80 }}>
        <h2 style={{ fontSize: 30, fontWeight: 300, marginBottom: 28 }}>Customer <em>Reviews</em></h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
          {reviews.map((r, i) => (
            <div key={i} style={{ background: "#F9F7F4", borderRadius: 12, padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontWeight: 600, fontSize: 15 }}>{r.name}</span>
                <span style={{ fontSize: 12, color: "#888", fontFamily: "sans-serif" }}>{r.date}</span>
              </div>
              <div style={{ display: "flex", gap: 2, marginBottom: 10 }}>
                {"★★★★★".split("").map((s, j) => <span key={j} style={{ color: j < r.rating ? "#C4A882" : "#DDD", fontSize: 13 }}>★</span>)}
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "#555", margin: 0, fontFamily: "sans-serif" }}>{r.comment}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section>
          <h2 style={{ fontSize: 30, fontWeight: 300, marginBottom: 28 }}>You May Also <em>Like</em></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 24 }}>
            {related.map(product => <ProductCard key={product.id} product={product} setPage={setPage} setSelectedProduct={setSelectedProduct} />)}
          </div>
        </section>
      )}

      <style>{`
        @media (max-width: 768px) {
          .product-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </div>
  );
}