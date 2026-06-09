import { useState, useEffect } from "react";
import { products, collections, offers } from "../data/products";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

export default function HomePage({ setPage, setSelectedProduct }) {
  const [heroSlide, setHeroSlide] = useState(0);

  const heroSlides = [
    { headline: "The Summer", sub: "Collection", tag: "New In", bg: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80", cta: "Shop Women", ctaPage: "women" },
    { headline: "Refined", sub: "Essentials", tag: "Men's Edit", bg: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=1600&q=80", cta: "Shop Men", ctaPage: "men" },
    { headline: "Little", sub: "Adventures", tag: "Kids '25", bg: "https://images.unsplash.com/photo-1471286174890-9c112ac6476f?w=1600&q=80", cta: "Shop Kids", ctaPage: "kids" },
  ];

  useEffect(() => {
    const t = setInterval(() => setHeroSlide(p => (p + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const trending = products.filter(p => p.badge === "Trending" || p.badge === "Bestseller" || p.rating >= 4.7).slice(0, 4);

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
      {/* Hero */}
      <div style={{ position: "relative", height: "92vh", minHeight: 520, overflow: "hidden" }}>
        {heroSlides.map((s, i) => (
          <div key={i} style={{ position: "absolute", inset: 0, transition: "opacity 1s ease", opacity: i === heroSlide ? 1 : 0 }}>
            <img src={s.bg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.1) 60%)" }} />
          </div>
        ))}
        <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 8%", maxWidth: 720 }}>
          <div style={{ display: "inline-block", background: "#C4A882", color: "#fff", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", padding: "5px 14px", borderRadius: 20, marginBottom: 20, fontFamily: "sans-serif", textTransform: "uppercase" }}>{heroSlides[heroSlide].tag}</div>
          <h1 style={{ color: "#fff", fontSize: "clamp(52px, 8vw, 96px)", fontWeight: 300, lineHeight: 1.0, margin: "0 0 8px", letterSpacing: "-0.01em" }}>
            {heroSlides[heroSlide].headline}
          </h1>
          <h1 style={{ color: "#F0D9BA", fontSize: "clamp(52px, 8vw, 96px)", fontWeight: 600, lineHeight: 1.0, margin: "0 0 32px", letterSpacing: "-0.01em", fontStyle: "italic" }}>
            {heroSlides[heroSlide].sub}
          </h1>
          <button onClick={() => setPage(heroSlides[heroSlide].ctaPage)}
            style={{ alignSelf: "flex-start", background: "#fff", color: "#1A1A1A", border: "none", padding: "14px 32px", fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", borderRadius: 4, fontFamily: "sans-serif", transition: "transform 0.2s" }}
            onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.target.style.transform = "translateY(0)"}>
            {heroSlides[heroSlide].cta} →
          </button>
        </div>
        {/* Dots */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 2 }}>
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => setHeroSlide(i)} style={{ width: i === heroSlide ? 28 : 8, height: 8, borderRadius: 4, background: i === heroSlide ? "#C4A882" : "rgba(255,255,255,0.5)", border: "none", cursor: "pointer", transition: "all 0.3s" }} />
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div style={{ background: "#1A1A1A", color: "#C4A882", padding: "12px 0", overflow: "hidden", whiteSpace: "nowrap" }}>
        <div style={{ display: "inline-block", animation: "marquee 20s linear infinite", fontSize: 12, fontWeight: 600, letterSpacing: "0.2em", fontFamily: "sans-serif", textTransform: "uppercase" }}>
          {Array(6).fill("✦  Free shipping on orders above ₹999  ✦  New Summer Collection  ✦  Up to 40% off select styles  ✦  Easy 30-day returns  ").join("")}
        </div>
      </div>

      {/* Collections */}
      <section style={{ padding: "80px 5%", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.2em", color: "#C4A882", textTransform: "uppercase", fontFamily: "sans-serif", margin: "0 0 12px" }}>Shop By</p>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 300, margin: 0, color: "#1A1A1A" }}>Featured <em>Collections</em></h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {collections.map(col => (
            <div key={col.id} onClick={() => setPage(col.id)} style={{ cursor: "pointer", position: "relative", borderRadius: 12, overflow: "hidden", aspectRatio: "3/4" }}
              onMouseEnter={e => e.currentTarget.querySelector("img").style.transform = "scale(1.06)"}
              onMouseLeave={e => e.currentTarget.querySelector("img").style.transform = "scale(1)"}>
              <img src={col.image} alt={col.label} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)" }} />
              <div style={{ position: "absolute", bottom: 28, left: 28 }}>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "sans-serif", margin: "0 0 6px" }}>{col.tagline}</p>
                <h3 style={{ color: "#fff", fontSize: 34, fontWeight: 600, margin: "0 0 16px" }}>{col.label}</h3>
                <span style={{ color: "#fff", fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "sans-serif", borderBottom: "1.5px solid #C4A882", paddingBottom: 3 }}>Explore →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section style={{ padding: "0 5% 80px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 40, flexWrap: "wrap", gap: 12 }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.2em", color: "#C4A882", textTransform: "uppercase", fontFamily: "sans-serif", margin: "0 0 8px" }}>Right Now</p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, margin: 0 }}>Trending <em>Pieces</em></h2>
          </div>
          <button onClick={() => setPage("listing")} style={{ background: "none", border: "1.5px solid #1A1A1A", color: "#1A1A1A", padding: "10px 24px", fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", borderRadius: 4, fontFamily: "sans-serif" }}>View All</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 24 }}>
          {trending.map(p => <ProductCard key={p.id} product={p} setPage={setPage} setSelectedProduct={setSelectedProduct} />)}
        </div>
      </section>

      {/* Seasonal Offers */}
      <section style={{ background: "#F9F7F4", padding: "80px 5%" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.2em", color: "#C4A882", textTransform: "uppercase", fontFamily: "sans-serif", margin: "0 0 12px" }}>Limited Time</p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, margin: 0 }}>Seasonal <em>Offers</em></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {offers.map((o, i) => (
              <div key={i} style={{ background: o.bg, borderRadius: 16, padding: "36px 32px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", right: -20, top: -20, width: 120, height: 120, borderRadius: "50%", background: o.accent, opacity: 0.1 }} />
                <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.16em", color: o.accent, textTransform: "uppercase", fontFamily: "sans-serif", margin: "0 0 10px" }}>{o.label}</p>
                <h3 style={{ fontSize: 28, fontWeight: 600, margin: "0 0 8px", color: "#1A1A1A" }}>{o.discount}</h3>
                <p style={{ color: "#888", fontSize: 13, margin: "0 0 20px", fontFamily: "sans-serif" }}>Use code: <strong style={{ color: "#1A1A1A", fontFamily: "monospace", letterSpacing: "0.08em" }}>{o.code}</strong></p>
                <button onClick={() => setPage("listing")} style={{ background: o.accent, color: "#fff", border: "none", padding: "10px 22px", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", borderRadius: 6, fontFamily: "sans-serif" }}>Shop Now</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ padding: "80px 5%", background: "#1A1A1A", textAlign: "center" }}>
        <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.2em", color: "#C4A882", textTransform: "uppercase", fontFamily: "sans-serif", margin: "0 0 16px" }}>Stay in the loop</p>
        <h2 style={{ color: "#fff", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 300, margin: "0 0 12px" }}>Style, <em>curated</em> for you</h2>
        <p style={{ color: "#888", fontSize: 15, margin: "0 0 32px", fontFamily: "sans-serif" }}>Subscribe and get 10% off your first order.</p>
        <div style={{ display: "flex", gap: 0, maxWidth: 420, margin: "0 auto", borderRadius: 8, overflow: "hidden", border: "1px solid #333" }}>
          <input placeholder="Your email address" style={{ flex: 1, background: "#222", border: "none", color: "#fff", padding: "14px 18px", fontSize: 14, outline: "none", fontFamily: "sans-serif" }} />
          <button style={{ background: "#C4A882", border: "none", color: "#fff", padding: "14px 22px", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: "sans-serif", whiteSpace: "nowrap" }}>Subscribe</button>
        </div>
      </section>

      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}