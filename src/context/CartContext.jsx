import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { products as seedProducts } from "../data/products";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState(seedProducts);

  useEffect(() => {
    const savedUser = localStorage.getItem("voila-current-user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("voila-current-user");
      }
    }
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("voila-current-user", JSON.stringify(user));
    else localStorage.removeItem("voila-current-user");
  }, [user]);

  useEffect(() => {
    const savedProducts = localStorage.getItem("voila-products");
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch {
        localStorage.removeItem("voila-products");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("voila-products", JSON.stringify(products));
  }, [products]);

  const addToCart = useCallback((product, size, color, qty = 1) => {
    setCart(prev => {
      const key = `${product.id}-${size}-${color}`;
      const existing = prev.find(i => i.key === key);
      if (existing) return prev.map(i => i.key === key ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { ...product, size, color, qty, key }];
    });
  }, []);

  const removeFromCart = useCallback((key) => setCart(prev => prev.filter(i => i.key !== key)), []);
  const clearCart = useCallback(() => setCart([]), []);
  const updateQty = useCallback((key, qty) => {
    if (qty < 1) { removeFromCart(key); return; }
    setCart(prev => prev.map(i => i.key === key ? { ...i, qty } : i));
  }, [removeFromCart]);

  const toggleWishlist = useCallback((id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }, []);

  const addProduct = useCallback((productData) => {
    setProducts((prev) => {
      const maxId = prev.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0);
      const product = {
        id: maxId + 1,
        originalPrice: null,
        rating: 4.5,
        reviews: 0,
        badge: "New",
        colors: ["#F5F0E8", "#2C2C2C"],
        sizes: ["S", "M", "L", "XL"],
        ...productData,
      };
      return [product, ...prev];
    });
  }, []);

  const removeProduct = useCallback((productId) => {
    setProducts((prev) => prev.filter((item) => item.id !== productId));
    setCart((prev) => prev.filter((item) => item.id !== productId));
    setWishlist((prev) => prev.filter((id) => id !== productId));
  }, []);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, cartCount, cartTotal, addToCart, removeFromCart, clearCart, updateQty, wishlist, toggleWishlist, user, setUser, searchQuery, setSearchQuery, products, addProduct, removeProduct }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);