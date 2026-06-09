# Voilà Fashion 🛍️

A modern, fully responsive clothing e-commerce web application built with **React** and **Vite**. Features a luxury editorial aesthetic, complete shopping experience, and mobile-first design.

![Voilà Fashion](https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80)

---

## ✨ Features

### 🏠 Homepage
- Auto-sliding hero banner with 3 collection slides
- Animated marquee announcement strip
- Featured collections — Women, Men, Kids
- Trending products grid
- Seasonal offer cards with promo codes
- Newsletter subscription section

### 🗂️ Product Listing Page
- Filter by **Size**, **Price Range**, and **Color**
- Sort by Popularity, Price (Low–High / High–Low), and Rating
- Mobile-friendly collapsible filter drawer
- Live product count

### 📦 Product Detail Page
- High-quality product image with badge labels
- Color swatch selector & size picker
- Quantity control with Add to Cart
- Wishlist toggle (heart icon)
- Description / Details / Care tabs
- Customer reviews section
- Related products carousel

### 🛒 Shopping Cart
- Full line-item management (add, remove, update qty)
- Promo code input field
- Live order summary — subtotal, GST (5%), shipping
- Free shipping threshold nudge (above ₹999)
- Proceed to Checkout button

### 👤 Account Page
- Toggle between **Sign In** and **Register** forms
- Clean, minimal auth UI

### 🔍 Search
- Inline search bar in Navbar
- Live filter across all products by name

### 📱 Fully Responsive
- Mobile navigation hamburger menu
- Responsive grid layouts for all screen sizes
- Sticky navbar with backdrop blur

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build Tool | Vite 5 |
| State Management | React Context API |
| Styling | Inline CSS + CSS Variables |
| Typography | Cormorant Garamond (Google Fonts) |
| Data | Static JS data (easily swappable with API) |

---

## 📁 Project Structure

```
voila-fashion/
├── index.html                  # Entry HTML with Google Fonts
├── vite.config.js              # Vite configuration
├── package.json
└── src/
    ├── main.jsx                # React root mount
    ├── App.jsx                 # Page router & layout
    ├── context/
    │   └── CartContext.jsx     # Global cart, wishlist, search state
    ├── data/
    │   └── products.js         # Product catalog, collections, offers
    └── components/
        ├── Navbar.jsx          # Sticky nav with search, cart, mobile menu
        ├── HomePage.jsx        # Hero, collections, trending, offers
        ├── ListingPage.jsx     # Product grid with filters & sorting
        ├── ProductCard.jsx     # Reusable product card component
        ├── ProductPage.jsx     # Full product detail page
        ├── CartPage.jsx        # Shopping cart & order summary
        └── Footer.jsx          # Footer + Account/Login page
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js **18+**
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/voila-fashion.git

# 2. Navigate into the project
cd voila-fashion

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The optimized output will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| Primary Font | Cormorant Garamond | Headings, brand name |
| Body Font | System sans-serif | Labels, prices, UI text |
| Brand Gold | `#C4A882` | Accents, CTAs, badges |
| Deep Charcoal | `#1A1A1A` | Primary text, buttons |
| Warm Ivory | `#F9F7F4` | Backgrounds, cards |
| Navy | `#1E3A5F` | Men's accent |
| Coral | `#F87171` | Kids accent, sale badges |

---

## 🛒 Product Catalog

The app ships with **12 sample products** across 3 categories:

| Category | Products |
|---|---|
| 👗 Women | Linen Oversized Shirt, Cotton Sundress, Floral Midi Skirt, Wrap Maxi Dress, Lace-Trim Blouse |
| 👔 Men | Slim Tapered Trousers, Classic Oxford Shirt, Merino Crew Sweater, Tailored Blazer |
| 👧 Kids | Denim Jacket, Summer Set, Hoodie Sweatshirt |

---


## 🙌 Credits

- Product images: [Unsplash](https://unsplash.com)
- Font: [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) via Google Fonts
- Built with ❤️ using React + Vite

---

> **Voilà** — Curated fashion for every occasion. Crafted with care, delivered with love.
