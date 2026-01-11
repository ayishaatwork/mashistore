export type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  gsm: string;
  color: string;
  size: string;
  quantity: number;
};

const CART_KEY = "mashi_cart";

/* =========================
   READ CART
   ========================= */
export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  const raw = localStorage.getItem(CART_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);

    return parsed.map((item: any) => ({
      ...item,
      gsm: item.gsm ?? "Default GSM",
      size: item.size ?? "Default",
      quantity: item.quantity ?? 1,
    }));
  } catch {
    return [];
  }
}

/* =========================
   SAVE CART
   ========================= */
export function saveCart(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
}

/* =========================
   CLEAR CART
   ========================= */
export function clearCart() {
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new Event("cartUpdated"));
}

/* =========================
   ADD TO CART (THE FIX)
   ========================= */
export function addToCart(item: Omit<CartItem, "quantity">) {
  if (typeof window === "undefined") return;

  const cart = getCart();

  const existingItem = cart.find(
    (cartItem) =>
      cartItem.id === item.id &&
      cartItem.gsm === item.gsm &&
      cartItem.color === item.color &&
      cartItem.size === item.size
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...item,
      quantity: 1,
    });
  }

  saveCart(cart);
}
