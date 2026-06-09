import { useCart } from "../context/CartContext";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80";

export default function ProductCard({ product: p, setPage, setSelectedProduct }) {
  const { toggleWishlist, wishlist, addToCart } = useCart();
  const isWished = wishlist.includes(p.id);

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", position: "relative" }}>
      {/* Image */}
      <div style={{ position: "relative", borderRadius: 10, overflow: "hidden", aspectRatio: "3/4", background: "#F9F7F4", cursor: "pointer" }}
        onClick={() => { setSelectedProduct(p); setPage("product"); }}
        onMouseEnter={e => { e.currentTarget.querySelector(".img").style.transform = "scale(1.05)"; e.currentTarget.querySelector(".quick").style.opacity = "1"; }}
        onMouseLeave={e => { e.currentTarget.querySelector(".img").style.transform = "scale(1)"; e.currentTarget.querySelector(".quick").style.opacity = "0"; }}>
        <img
          className="img"
          src={p.image}
          alt={p.name}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = FALLBACK_IMAGE;
          }}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
        />
        
        {p.badge && (
          <span style={{ position: "absolute", top: 12, left: 12, background: p.badge === "Sale" ? "#E11D48" : p.badge === "New" ? "#1E3A5F" : p.badge === "Trending" ? "#C4A882" : p.badge === "Premium" ? "#1A1A1A" : "#888", color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", padding: "4px 10px", borderRadius: 20, fontFamily: "sans-serif", textTransform: "uppercase" }}>{p.badge}</span>
        )}
        
        <button onClick={e => { e.stopPropagation(); toggleWishlist(p.id); }} style={{ position: "absolute", top: 12, right: 12, width: 32, height: 32, background: "#fff", border: "none", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.12)" }}>
          <svg width="14" height="14" fill={isWished ? "#E11D48" : "none"} stroke={isWished ? "#E11D48" : "#666"} strokeWidth="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>

        <button className="quick" onClick={e => { e.stopPropagation(); addToCart(p, p.sizes[0], p.colors[0]); }}
          style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(26,26,26,0.92)", color: "#fff", border: "none", padding: "12px", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", opacity: 0, transition: "opacity 0.25s", fontFamily: "sans-serif" }}>
          Quick Add
        </button>
      </div>

      {/* Info */}
      <div style={{ padding: "12px 2px 0" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
          <h3 onClick={() => { setSelectedProduct(p); setPage("product"); }} style={{ fontSize: 16, fontWeight: 500, margin: "0 0 4px", color: "#1A1A1A", cursor: "pointer", lineHeight: 1.3 }}>{p.name}</h3>
        </div>
        <div style={{ display: "flex", gap: 4, alignItems: "center", marginBottom: 6 }}>
          {"★★★★★".split("").map((s, i) => (
            <span key={i} style={{ fontSize: 11, color: i < Math.floor(p.rating) ? "#C4A882" : "#DDD" }}>★</span>
          ))}
          <span style={{ fontSize: 11, color: "#888", fontFamily: "sans-serif", marginLeft: 2 }}>({p.reviews})</span>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 17, fontWeight: 600, color: "#1A1A1A" }}>₹{p.price.toLocaleString()}</span>
          {p.originalPrice && <span style={{ fontSize: 14, color: "#AAA", textDecoration: "line-through", fontFamily: "sans-serif" }}>₹{p.originalPrice.toLocaleString()}</span>}
          {p.originalPrice && <span style={{ fontSize: 11, color: "#E11D48", fontWeight: 700, fontFamily: "sans-serif" }}>-{Math.round((1-p.price/p.originalPrice)*100)}%</span>}
        </div>
        {/* Color dots */}
        <div style={{ display: "flex", gap: 5, marginTop: 8 }}>
          {p.colors.map((c, i) => (
            <div key={i} style={{ width: 14, height: 14, borderRadius: "50%", background: c, border: "1.5px solid rgba(0,0,0,0.12)" }} />
          ))}
        </div>
      </div>
    </div>
  );
}