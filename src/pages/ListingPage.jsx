import { useState, useMemo } from "react";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

const allSizes = ["XS","S","M","L","XL","XXL","28","30","32","34","36","2-3Y","3-4Y","4-5Y","5-6Y","7-8Y","9-10Y","11-12Y"];
const priceRanges = [
  { label: "Under ₹1,000", min: 0, max: 1000 },
  { label: "₹1,000 – ₹2,000", min: 1000, max: 2000 },
  { label: "₹2,000 – ₹3,500", min: 2000, max: 3500 },
  { label: "Above ₹3,500", min: 3500, max: Infinity },
];
const colorOptions = [
  { name: "White/Cream", hex: "#F5F0E8" }, { name: "Black", hex: "#2C2C2C" }, { name: "Navy", hex: "#1E3A5F" },
  { name: "Tan", hex: "#C4A882" }, { name: "Pink", hex: "#F9A8D4" }, { name: "Blue", hex: "#60A5FA" },
  { name: "Green", hex: "#86EFAC" }, { name: "Yellow", hex: "#FCD34D" }, { name: "Red", hex: "#F87171" },
];

export default function ListingPage({ category, setPage, setSelectedProduct }) {
  const { searchQuery, user, products, addProduct, removeProduct } = useCart();
  const [filters, setFilters] = useState({ sizes: [], priceRange: null, colors: [], sort: "popular" });
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [ownerForm, setOwnerForm] = useState({ name: "", price: "", category: "women", image: "", description: "" });
  const [ownerMsg, setOwnerMsg] = useState("");

  const cat = category || "all";

  const filtered = useMemo(() => {
    let list = products;
    if (cat === "sale") {
      list = list.filter((p) => (p.originalPrice && p.originalPrice > p.price) || p.badge === "Sale");
    } else if (cat !== "all") {
      list = list.filter((p) => p.category === cat);
    }
    if (searchQuery) list = list.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    if (filters.sizes.length) list = list.filter(p => p.sizes.some(s => filters.sizes.includes(s)));
    if (filters.priceRange) list = list.filter(p => p.price >= filters.priceRange.min && p.price < filters.priceRange.max);
    if (filters.colors.length) list = list.filter(p => p.colors.some(c => filters.colors.includes(c)));
    if (filters.sort === "popular") list = [...list].sort((a,b) => b.reviews - a.reviews);
    if (filters.sort === "price-asc") list = [...list].sort((a,b) => a.price - b.price);
    if (filters.sort === "price-desc") list = [...list].sort((a,b) => b.price - a.price);
    if (filters.sort === "rating") list = [...list].sort((a,b) => b.rating - a.rating);
    return list;
  }, [cat, searchQuery, filters, products]);

  const toggle = (key, val) => setFilters(f => {
    const arr = f[key];
    return { ...f, [key]: arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val] };
  });

  const activeCount = filters.sizes.length + filters.colors.length + (filters.priceRange ? 1 : 0);
  const titleByCategory = cat === "all" ? "All Products" : cat === "sale" ? "Sale" : `${cat.charAt(0).toUpperCase() + cat.slice(1)}'s`;
  const isOwner = user?.role === "owner";

  const handleAddProduct = () => {
    setOwnerMsg("");
    if (!ownerForm.name.trim() || !ownerForm.price.trim() || !ownerForm.image.trim()) {
      setOwnerMsg("Enter product name, price, and image URL.");
      return;
    }
    const numericPrice = Number(ownerForm.price);
    if (Number.isNaN(numericPrice) || numericPrice <= 0) {
      setOwnerMsg("Price must be a valid number.");
      return;
    }

    addProduct({
      name: ownerForm.name.trim(),
      price: numericPrice,
      category: ownerForm.category,
      subcategory: "custom",
      image: ownerForm.image.trim(),
      description: ownerForm.description.trim() || "Added by owner from admin listing.",
    });
    setOwnerForm({ name: "", price: "", category: "women", image: "", description: "" });
    setOwnerMsg("Product added successfully.");
  };

  const FilterPanel = () => (
    <div style={{ fontFamily: "sans-serif" }}>
      {/* Sort */}
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: "#888", textTransform: "uppercase", margin: "0 0 12px" }}>Sort By</p>
        {[["popular","Most Popular"],["price-asc","Price: Low to High"],["price-desc","Price: High to Low"],["rating","Top Rated"]].map(([val, lbl]) => (
          <label key={val} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, cursor: "pointer", fontSize: 13, color: filters.sort === val ? "#1A1A1A" : "#666" }}>
            <input type="radio" name="sort" checked={filters.sort === val} onChange={() => setFilters(f => ({...f, sort: val}))} style={{ accentColor: "#C4A882" }} />
            {lbl}
          </label>
        ))}
      </div>

      {/* Price */}
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: "#888", textTransform: "uppercase", margin: "0 0 12px" }}>Price Range</p>
        {priceRanges.map(r => (
          <label key={r.label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, cursor: "pointer", fontSize: 13, color: filters.priceRange?.label === r.label ? "#1A1A1A" : "#666" }}>
            <input type="radio" name="price" checked={filters.priceRange?.label === r.label} onChange={() => setFilters(f => ({...f, priceRange: f.priceRange?.label === r.label ? null : r}))} style={{ accentColor: "#C4A882" }} />
            {r.label}
          </label>
        ))}
      </div>

      {/* Colors */}
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: "#888", textTransform: "uppercase", margin: "0 0 12px" }}>Color</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {colorOptions.map(c => (
            <button key={c.hex} onClick={() => toggle("colors", c.hex)} title={c.name}
              style={{ width: 28, height: 28, borderRadius: "50%", background: c.hex, border: filters.colors.includes(c.hex) ? "2.5px solid #1A1A1A" : "1.5px solid rgba(0,0,0,0.15)", cursor: "pointer", boxShadow: filters.colors.includes(c.hex) ? "0 0 0 2px #fff, 0 0 0 4px #1A1A1A" : "none" }} />
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: "#888", textTransform: "uppercase", margin: "0 0 12px" }}>Size</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {(cat === "kids" ? allSizes.slice(10) : cat === "men" ? [...allSizes.slice(2,6), ...allSizes.slice(4,9)] : allSizes.slice(0, 6)).map(s => (
            <button key={s} onClick={() => toggle("sizes", s)}
              style={{ padding: "5px 12px", border: `1.5px solid ${filters.sizes.includes(s) ? "#1A1A1A" : "#DDD"}`, background: filters.sizes.includes(s) ? "#1A1A1A" : "#fff", color: filters.sizes.includes(s) ? "#fff" : "#555", borderRadius: 4, cursor: "pointer", fontSize: 12, fontWeight: 600, letterSpacing: "0.04em" }}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {activeCount > 0 && (
        <button onClick={() => setFilters({ sizes: [], priceRange: null, colors: [], sort: "popular" })}
          style={{ width: "100%", background: "none", border: "1.5px solid #DDD", padding: "10px", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", borderRadius: 6, color: "#666" }}>
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 5% 80px", fontFamily: "'Cormorant Garamond', serif" }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 12, color: "#888", margin: "0 0 4px", fontFamily: "sans-serif" }}>
          <span style={{ cursor: "pointer" }} onClick={() => setPage("home")}>Home</span> / {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </p>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 300, margin: 0 }}>
            {titleByCategory} <em>Collection</em>
          </h1>
          <span style={{ color: "#888", fontSize: 14, fontFamily: "sans-serif" }}>{filtered.length} products</span>
        </div>
      </div>

      {isOwner && (
        <div style={{ background: "#F9F7F4", border: "1px solid #ECE6DE", borderRadius: 12, padding: 16, marginBottom: 24, fontFamily: "sans-serif" }}>
          <p style={{ margin: "0 0 12px", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#555" }}>Owner Panel: Add Product</p>
          <div style={{ display: "grid", gap: 8 }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 8 }}>
              <input value={ownerForm.name} onChange={(e) => setOwnerForm((prev) => ({ ...prev, name: e.target.value }))} placeholder="Product name" style={ownerInputStyle} />
              <input value={ownerForm.price} onChange={(e) => setOwnerForm((prev) => ({ ...prev, price: e.target.value }))} placeholder="Price" style={ownerInputStyle} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 8 }}>
              <select value={ownerForm.category} onChange={(e) => setOwnerForm((prev) => ({ ...prev, category: e.target.value }))} style={{ ...ownerInputStyle, background: "#fff" }}>
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="kids">Kids</option>
              </select>
              <input value={ownerForm.image} onChange={(e) => setOwnerForm((prev) => ({ ...prev, image: e.target.value }))} placeholder="Image URL" style={ownerInputStyle} />
            </div>
            <textarea value={ownerForm.description} onChange={(e) => setOwnerForm((prev) => ({ ...prev, description: e.target.value }))} placeholder="Description" style={{ ...ownerInputStyle, minHeight: 72, resize: "vertical" }} />
            <button onClick={handleAddProduct} style={{ background: "#1A1A1A", color: "#fff", border: "none", borderRadius: 8, padding: "10px 14px", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", width: "fit-content" }}>
              Add Product
            </button>
            {ownerMsg && <p style={{ margin: 0, fontSize: 12, color: ownerMsg.includes("successfully") ? "#0F6E56" : "#C62828" }}>{ownerMsg}</p>}
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: 40, alignItems: "flex-start" }}>
        {/* Desktop Filters */}
        <aside style={{ width: 220, flexShrink: 0, position: "sticky", top: 84 }} className="desktop-filters">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <p style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Filters {activeCount > 0 && <span style={{ background: "#C4A882", color: "#fff", borderRadius: 12, padding: "1px 8px", fontSize: 11, fontFamily: "sans-serif" }}>{activeCount}</span>}</p>
          </div>
          <FilterPanel />
        </aside>

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Mobile filter toggle */}
          <button onClick={() => setFiltersOpen(!filtersOpen)} className="mobile-filter-btn"
            style={{ display: "none", alignItems: "center", gap: 8, background: "none", border: "1.5px solid #1A1A1A", padding: "10px 18px", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", borderRadius: 6, marginBottom: 24, fontFamily: "sans-serif" }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
            Filters {activeCount > 0 && `(${activeCount})`}
          </button>

          {filtersOpen && (
            <div style={{ background: "#F9F7F4", borderRadius: 12, padding: 24, marginBottom: 24 }}>
              <FilterPanel />
            </div>
          )}

          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "#888", fontFamily: "sans-serif" }}>
              <p style={{ fontSize: 48, margin: "0 0 16px" }}>🔍</p>
              <h3 style={{ fontWeight: 400, fontSize: 20 }}>No products found</h3>
              <p>Try adjusting your filters</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 28 }}>
              {filtered.map((p) => (
                <div key={p.id} style={{ position: "relative" }}>
                  {isOwner && (
                    <button
                      onClick={() => removeProduct(p.id)}
                      style={{ position: "absolute", top: 8, right: 8, zIndex: 3, background: "#E11D48", color: "#fff", border: "none", borderRadius: 6, padding: "6px 8px", fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer", fontFamily: "sans-serif" }}
                    >
                      Remove
                    </button>
                  )}
                  <ProductCard product={p} setPage={setPage} setSelectedProduct={setSelectedProduct} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .desktop-filters { display: block !important; }
        .mobile-filter-btn { display: none !important; }
        @media (max-width: 768px) {
          .desktop-filters { display: none !important; }
          .mobile-filter-btn { display: flex !important; }
        }
      `}</style>
    </div>
  );
}   

const ownerInputStyle = {
  border: "1px solid #DDD",
  borderRadius: 8,
  padding: "10px 12px",
  fontSize: 13,
  outline: "none",
  fontFamily: "sans-serif",
};