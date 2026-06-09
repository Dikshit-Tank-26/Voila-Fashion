import { useState } from "react";
import { useCart } from "../context/CartContext";

const categories = ["Women", "Men", "Kids", "Sale", "New In"];

export default function Navbar({ page, setPage }) {
  const { cartCount, searchQuery, setSearchQuery } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(255,255,255,0.96)", backdropFilter: "blur(12px)", borderBottom: "1px solid #F0EDE8", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", height: 64, gap: 24 }}>
          {/* Logo */}
          <div onClick={() => setPage("home")} style={{ cursor: "pointer", fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 700, letterSpacing: "0.08em", color: "#1A1A1A", flexShrink: 0 }}>
            VOILÀ
          </div>

          {/* Desktop Nav */}
          <div style={{ display: "flex", gap: 2, flex: 1, justifyContent: "center" }} className="desktop-nav">
            {categories.map(c => (
              <button key={c}
                onClick={() => setPage(c.toLowerCase() === "new in" ? "listing" : c.toLowerCase())}
                style={{ background: "none", border: "none", cursor: "pointer", padding: "8px 14px", fontSize: 13, fontWeight: 500, letterSpacing: "0.1em", color: "#3D3D3D", fontFamily: "inherit", textTransform: "uppercase", borderRadius: 6, transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "#C4A882"}
                onMouseLeave={e => e.target.style.color = "#3D3D3D"}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            {/* Search */}
            {searchOpen ? (
              <div style={{ display: "flex", alignItems: "center", background: "#F9F7F4", borderRadius: 24, padding: "6px 14px", gap: 8 }}>
                <svg width="14" height="14" fill="none" stroke="#888" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                <input autoFocus value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={e => { if(e.key === "Enter") { setPage("listing"); setSearchOpen(false); } if(e.key === "Escape") setSearchOpen(false); }}
                  placeholder="Search..." style={{ border: "none", background: "none", outline: "none", fontSize: 13, width: 140, fontFamily: "inherit" }} />
                <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#888", fontSize: 16, lineHeight: 1 }}>×</button>
              </div>
            ) : (
              <button onClick={() => setSearchOpen(true)} style={iconBtn}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              </button>
            )}

            <button onClick={() => setPage("account")} style={iconBtn}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </button>

            <button onClick={() => setPage("cart")} style={{ ...iconBtn, position: "relative" }}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              {cartCount > 0 && <span style={{ position: "absolute", top: -4, right: -4, background: "#C4A882", color: "#fff", borderRadius: "50%", width: 16, height: 16, fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif", fontWeight: 700 }}>{cartCount}</span>}
            </button>

            {/* Mobile menu */}
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ ...iconBtn, display: "none" }} className="mobile-menu-btn">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {menuOpen ? <><path d="M18 6 6 18"/><path d="m6 6 12 12"/></> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ borderTop: "1px solid #F0EDE8", background: "#fff", padding: "12px 24px 20px" }}>
            {categories.map(c => (
              <button key={c} onClick={() => { setPage(c.toLowerCase().replace(" ","") === "newin" ? "listing" : c.toLowerCase()); setMenuOpen(false); }}
                style={{ display: "block", width: "100%", background: "none", border: "none", cursor: "pointer", padding: "12px 0", fontSize: 15, fontWeight: 500, letterSpacing: "0.08em", color: "#3D3D3D", fontFamily: "inherit", textTransform: "uppercase", textAlign: "left", borderBottom: "1px solid #F9F7F4" }}>
                {c}
              </button>
            ))}
          </div>
        )}
      </nav>

      <style>{`
        .desktop-nav { display: flex !important; }
        .mobile-menu-btn { display: none !important; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}

const iconBtn = { background: "none", border: "none", cursor: "pointer", width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8, color: "#3D3D3D", transition: "background 0.2s" };