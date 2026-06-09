import { useState } from "react";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import HomePage from "../pages/HomePage";
import ListingPage from "../pages/ListingPage";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";
import { Footer, AccountPage } from "./components/Footer";

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const category = ["women", "men", "kids"].includes(page) ? page : "all";

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage setPage={setPage} setSelectedProduct={setSelectedProduct} />;
      case "listing": return <ListingPage category="all" setPage={setPage} setSelectedProduct={setSelectedProduct} />;
      case "women": return <ListingPage category="women" setPage={setPage} setSelectedProduct={setSelectedProduct} />;
      case "men": return <ListingPage category="men" setPage={setPage} setSelectedProduct={setSelectedProduct} />;
      case "kids": return <ListingPage category="kids" setPage={setPage} setSelectedProduct={setSelectedProduct} />;
      case "product": return selectedProduct ? <ProductPage product={selectedProduct} setPage={setPage} setSelectedProduct={setSelectedProduct} /> : null;
      case "cart": return <CartPage setPage={setPage} />;
      case "account": return <AccountPage setPage={setPage} />;
      default: return <HomePage setPage={setPage} setSelectedProduct={setSelectedProduct} />;
    }
  };

  return (
    <CartProvider>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar page={page} setPage={setPage} />
        <main style={{ flex: 1 }}>
          {renderPage()}
        </main>
        <Footer setPage={setPage} />
      </div>
    </CartProvider>
  );
}