import { CartProvider } from "../../src/app/Context/CartContext";

export function GlobalProvider({ children }) {
  return <CartProvider>{children}</CartProvider>;
}