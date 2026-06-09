import { useState } from "react";
import { useCart } from "../context/CartContext";

const socialLinks = [
  { icon: "Instagram", href: "https://instagram.com", svg: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></> },
  { icon: "Facebook", href: "https://facebook.com", svg: <><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></> },
  { icon: "Twitter/X", href: "https://x.com", svg: <><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></> },
];

const footerLinkMap = {
  Women: "women",
  Men: "men",
  Kids: "kids",
  Sale: "sale",
  "New Arrivals": "listing",
  "Size Guide": "info-size-guide",
  "Shipping Info": "info-shipping",
  "Returns & Exchanges": "info-returns",
  "Track Order": "info-track-order",
  FAQ: "info-faq",
  "About Us": "info-about-us",
  Sustainability: "info-sustainability",
  Careers: "info-careers",
  Press: "info-press",
  "Privacy Policy": "info-privacy-policy",
  "Terms of Service": "info-terms-of-service",
  "Cookie Policy": "info-cookie-policy",
};
const OWNER_EMAIL = "owner@voila.com";
const OWNER_PASSWORD = "Owner@123";

export function Footer({ setPage }) {
  const openSocial = (href) => window.open(href, "_blank", "noopener,noreferrer");

  const navigateFooterLink = (label) => {
    const target = footerLinkMap[label];
    if (target) setPage(target);
  };

  return (
    <footer style={{ background: "#1A1A1A", color: "#DDD", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 5% 40px", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40 }} className="footer-grid">
        {/* Brand */}
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, letterSpacing: "0.1em", color: "#fff", marginBottom: 16 }}>VOILÀ</div>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: "#888", maxWidth: 260, margin: "0 0 24px" }}>Curated fashion for every occasion. Crafted with care, delivered with love.</p>
          <div style={{ display: "flex", gap: 12 }}>
            {socialLinks.map((s) => (
              <button key={s.icon} aria-label={s.icon} onClick={() => openSocial(s.href)} style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(255,255,255,0.08)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#C4A882"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}>
                <svg width="16" height="16" fill="none" stroke="#DDD" strokeWidth="2" viewBox="0 0 24 24">{s.svg}</svg>
              </button>
            ))}
          </div>
        </div>

        {/* Links */}
        {[
          { title: "Shop", links: ["Women", "Men", "Kids", "Sale", "New Arrivals"] },
          { title: "Help", links: ["Size Guide", "Shipping Info", "Returns & Exchanges", "Track Order", "FAQ"] },
          { title: "Company", links: ["About Us", "Sustainability", "Careers", "Press", "Privacy Policy"] },
        ].map(col => (
          <div key={col.title}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", color: "#C4A882", textTransform: "uppercase", margin: "0 0 16px" }}>{col.title}</p>
            {col.links.map(l => (
              <p key={l} style={{ margin: "0 0 10px" }}>
                <button
                  onClick={() => navigateFooterLink(l)}
                  style={{ fontSize: 14, color: "#888", cursor: "pointer", transition: "color 0.2s", background: "none", border: "none", padding: 0 }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#888"; }}
                >
                  {l}
                </button>
              </p>
            ))}
          </div>
        ))}
      </div>

      {/* Contact bar */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 5%", borderTop: "1px solid #2A2A2A", display: "flex", gap: 32, flexWrap: "wrap" }}>
        <a href="mailto:hello@voila.in" style={{ fontSize: 13, color: "#666", textDecoration: "none" }}>📧 hello@voila.in</a>
        <a href="tel:+919876543210" style={{ fontSize: 13, color: "#666", textDecoration: "none" }}>📞 +91 98765 43210</a>
        <a href="https://maps.google.com/?q=Mumbai,India" target="_blank" rel="noreferrer" style={{ fontSize: 13, color: "#666", textDecoration: "none" }}>📍 Mumbai, India</a>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 5%", borderTop: "1px solid #2A2A2A", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <p style={{ fontSize: 13, color: "#555", margin: 0 }}>© 2026 Voilà Fashion. All rights reserved.</p>
        <div style={{ display: "flex", gap: 20 }}>
          {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(l => (
            <button key={l} onClick={() => navigateFooterLink(l)} style={{ fontSize: 12, color: "#555", cursor: "pointer", background: "none", border: "none", padding: 0 }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#DDD"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#555"; }}>{l}</button>
          ))}
        </div>
      </div>

      <style>{`@media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
    </footer>
  );
}

export function AccountPage({ setPage }) {
  const { user, setUser } = useCart();
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAuth = () => {
    setError("");
    setSuccess("");

    const email = form.email.trim().toLowerCase();
    const password = form.password.trim();
    const name = form.name.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    const savedUsers = JSON.parse(localStorage.getItem("voila-users") || "[]");

    if (tab === "register") {
      if (name.length < 2) {
        setError("Enter your full name.");
        return;
      }
      if (savedUsers.some((u) => u.email === email)) {
        setError("Account already exists. Please sign in.");
        return;
      }

      const newUser = { name, email, password, role: "customer" };
      const updatedUsers = [...savedUsers, newUser];
      localStorage.setItem("voila-users", JSON.stringify(updatedUsers));
      setUser({ name, email, role: "customer" });
      setSuccess("Account created successfully.");
      setTimeout(() => setPage("home"), 700);
      return;
    }

    if (email === OWNER_EMAIL && password === OWNER_PASSWORD) {
      setUser({ name: "Owner", email: OWNER_EMAIL, role: "owner" });
      setSuccess("Owner login successful.");
      setTimeout(() => setPage("owner-listing"), 500);
      return;
    }

    const foundUser = savedUsers.find((u) => u.email === email && u.password === password);
    if (!foundUser) {
      setError("Invalid email or password.");
      return;
    }

    setUser({ name: foundUser.name, email: foundUser.email, role: foundUser.role || "customer" });
    setSuccess("Signed in successfully.");
    setTimeout(() => setPage("home"), 700);
  };

  const handleLogout = () => {
    setUser(null);
    setSuccess("Logged out successfully.");
    setError("");
  };

  if (user) {
    return (
      <div style={{ maxWidth: 520, margin: "60px auto 80px", padding: "0 24px", fontFamily: "'Cormorant Garamond', serif", textAlign: "center" }}>
        <h1 style={{ fontSize: 40, fontWeight: 300, margin: "0 0 10px" }}>My <em>Account</em></h1>
        <p style={{ fontFamily: "sans-serif", color: "#666", margin: "0 0 6px" }}><strong>Name:</strong> {user.name}</p>
        <p style={{ fontFamily: "sans-serif", color: "#666", margin: "0 0 28px" }}><strong>Email:</strong> {user.email}</p>
        {user.role === "owner" && <p style={{ fontFamily: "sans-serif", color: "#0F6E56", margin: "0 0 12px" }}><strong>Role:</strong> Owner</p>}
        {success && <p style={{ color: "#0F6E56", fontFamily: "sans-serif", fontSize: 13, margin: "0 0 16px" }}>{success}</p>}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => setPage(user.role === "owner" ? "owner-listing" : "home")} style={{ background: "#1A1A1A", color: "#fff", border: "none", borderRadius: 10, padding: "12px 20px", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: "sans-serif" }}>{user.role === "owner" ? "Open Owner Listing" : "Go to Home"}</button>
          <button onClick={handleLogout} style={{ background: "none", color: "#1A1A1A", border: "1.5px solid #1A1A1A", borderRadius: 10, padding: "12px 20px", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: "sans-serif" }}>Logout</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 480, margin: "60px auto 80px", padding: "0 24px", fontFamily: "'Cormorant Garamond', serif" }}>
      <h1 style={{ fontSize: 38, fontWeight: 300, textAlign: "center", marginBottom: 8 }}>
        {tab === "login" ? "Welcome" : "Join"} <em>Back</em>
      </h1>
      <p style={{ textAlign: "center", color: "#888", fontSize: 14, marginBottom: 36, fontFamily: "sans-serif" }}>
        {tab === "login" ? "Sign in to your account" : "Create your Voilà account"}
      </p>

      <div style={{ display: "flex", background: "#F9F7F4", borderRadius: 10, padding: 4, marginBottom: 32 }}>
        {["login","register"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ flex: 1, background: tab === t ? "#fff" : "none", border: "none", padding: "10px", borderRadius: 8, fontSize: 13, fontWeight: 600, letterSpacing: "0.06em", textTransform: "capitalize", cursor: "pointer", color: tab === t ? "#1A1A1A" : "#888", fontFamily: "sans-serif", boxShadow: tab === t ? "0 1px 4px rgba(0,0,0,0.08)" : "none", transition: "all 0.2s" }}>
            {t === "login" ? "Sign In" : "Register"}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {tab === "register" && <input placeholder="Full Name" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} style={inputStyle} />}
        <input placeholder="Email address" type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} style={inputStyle} />
        <input placeholder="Password" type="password" value={form.password} onChange={e => setForm(f => ({...f, password: e.target.value}))} style={inputStyle} />

        {tab === "login" && <span style={{ fontSize: 13, color: "#C4A882", textAlign: "right", cursor: "pointer", fontFamily: "sans-serif" }}>Forgot password?</span>}

        {error && <p style={{ color: "#C62828", fontFamily: "sans-serif", fontSize: 13, margin: 0 }}>{error}</p>}
        {success && <p style={{ color: "#0F6E56", fontFamily: "sans-serif", fontSize: 13, margin: 0 }}>{success}</p>}

        <button onClick={handleAuth} style={{ background: "#1A1A1A", color: "#fff", border: "none", borderRadius: 10, padding: "15px", fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", fontFamily: "sans-serif", marginTop: 8 }}>
          {tab === "login" ? "Sign In →" : "Create Account →"}
        </button>
      </div>

      <div style={{ textAlign: "center", marginTop: 32, fontSize: 13, color: "#888", fontFamily: "sans-serif" }}>
        {tab === "login" ? "Don't have an account? " : "Already have an account? "}
        <span style={{ color: "#C4A882", cursor: "pointer", fontWeight: 600 }} onClick={() => setTab(tab === "login" ? "register" : "login")}>
          {tab === "login" ? "Sign up" : "Sign in"}
        </span>
      </div>
    </div>
  );
}

const inputStyle = { border: "1.5px solid #DDD", borderRadius: 10, padding: "13px 16px", fontSize: 14, outline: "none", fontFamily: "sans-serif", transition: "border-color 0.2s", width: "100%", boxSizing: "border-box" };    