const infoContent = {
  "info-size-guide": {
    title: "Size Guide",
    text: "Use our standard size chart: XS (34), S (36), M (38), L (40), XL (42). For kids, use age-based sizing shown on each product.",
  },
  "info-shipping": {
    title: "Shipping Info",
    text: "Orders are dispatched within 24-48 hours. Standard delivery takes 3-6 business days. Express delivery is available in selected cities.",
  },
  "info-returns": {
    title: "Returns & Exchanges",
    text: "You can request return or exchange within 30 days of delivery. Items must be unused with original tags intact.",
  },
  "info-track-order": {
    title: "Track Order",
    text: "After your order is shipped, tracking details are shared via SMS and email. You can also check status from your account section.",
  },
  "info-faq": {
    title: "FAQ",
    text: "Common questions include shipping timelines, return eligibility, payment modes, and order tracking. Reach support for anything else.",
  },
  "info-about-us": {
    title: "About Us",
    text: "Voila Fashion curates modern essentials with quality fabrics and timeless design for women, men, and kids.",
  },
  "info-sustainability": {
    title: "Sustainability",
    text: "We prioritize low-impact fabrics, ethical sourcing, and durable design to reduce waste and support responsible fashion.",
  },
  "info-careers": {
    title: "Careers",
    text: "We are always looking for design, merchandising, and product talent. Send your profile to careers@voila.in.",
  },
  "info-press": {
    title: "Press",
    text: "For media kits, collaborations, and interviews, contact press@voila.in.",
  },
  "info-privacy-policy": {
    title: "Privacy Policy",
    text: "We collect only required customer data for order processing, communication, and service improvement. Your data is never sold.",
  },
  "info-terms-of-service": {
    title: "Terms of Service",
    text: "By using this website, you agree to our purchase, delivery, and return terms along with acceptable use policies.",
  },
  "info-cookie-policy": {
    title: "Cookie Policy",
    text: "Cookies help us remember preferences, improve experience, and measure site performance. You can control them in browser settings.",
  },
};

export default function InfoPage({ pageKey, setPage }) {
  const content = infoContent[pageKey] || {
    title: "Information",
    text: "Details are currently unavailable.",
  };

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "56px 5% 80px", fontFamily: "'Cormorant Garamond', serif" }}>
      <button
        onClick={() => setPage("home")}
        style={{ background: "none", border: "1px solid #DDD", borderRadius: 8, padding: "8px 14px", cursor: "pointer", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: 24 }}
      >
        Back to Home
      </button>
      <h1 style={{ fontSize: "clamp(30px, 5vw, 48px)", fontWeight: 300, margin: "0 0 14px" }}>{content.title}</h1>
      <p style={{ fontSize: 17, color: "#555", lineHeight: 1.8, fontFamily: "sans-serif", margin: 0 }}>{content.text}</p>
    </div>
  );
}
