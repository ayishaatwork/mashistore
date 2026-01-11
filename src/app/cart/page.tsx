"use client";

import "./cart.css";
import { getCart, saveCart } from "@/lib/cart";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { CartItem } from "@/lib/cart";
import Link from "next/link";

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("mashi_cart");
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  const isEmpty = cart.length === 0;

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const removeItem = (
    id: number,
    gsm: string,
    color: string,
    size: string
  ) => {
    const updatedCart = cart.filter(
      (item) =>
        !(
          item.id === id &&
          item.gsm === gsm &&
          item.color === color &&
          item.size === size
        )
    );

    setCart(updatedCart);
    saveCart(updatedCart);
  };

  const updateQuantity = (
  id: number,
  gsm: string,
  color: string,
  size: string,
  delta: number
) => {
  let updatedCart: CartItem[] = [];

  cart.forEach((item) => {
    if (
      item.id === id &&
      item.gsm === gsm &&
      item.color === color &&
      item.size === size
    ) {
      const newQty = item.quantity + delta;

      // 👇 THIS is the missing behavior
      if (newQty > 0) {
        updatedCart.push({ ...item, quantity: newQty });
      }
      // else → quantity 0 → item is removed
    } else {
      updatedCart.push(item);
    }
  });

  setCart(updatedCart);
  saveCart(updatedCart);
};


  return (
    <>
    <main className="cart-page page-container">
      <div className="cart-layout">
        {/* LEFT — Shopping Bag */}
        <section className="cart-left">
          <h1 className="cart-title">Shopping Bag</h1>

          {!isEmpty &&
            cart.map((item) => (
              <div
                key={`${item.id}-${item.gsm}-${item.color}-${item.size}`}
                className="cart-item"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />

                <div className="cart-item-details">
                  <p className="cart-item-name">{item.name}</p>

                  <p className="cart-item-meta">
                    {item.gsm} · {item.color}
                  </p>

                  <p className="cart-item-price">Rs.{item.price}</p>

                  <div className="cart-qty-controls">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.gsm,
                          item.color,
                          item.size,
                          -1
                        )
                      }
                    >
                      –
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.gsm,
                          item.color,
                          item.size,
                          1
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="cart-item-remove"
                    onClick={() =>
                      removeItem(
                        item.id,
                        item.gsm,
                        item.color,
                        item.size
                      )
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
        </section>

        {/* RIGHT — Order Summary */}
        <aside className="cart-right">
          <h2 className="order-title">Order Summary</h2>

          {!isEmpty && (
            <>
             {cart.map((item) => (
  <div
    key={`${item.id}-${item.gsm}-${item.color}-${item.size}-summary`}
    className="order-row"
  >
    <span>
      {item.name} Sketchbook   <span className="item-detail-down">{item.color}   {item.gsm} × {item.quantity} </span>
    </span>
    <span>Rs.{item.price * item.quantity}</span>
  </div>
))}


              <div className="order-divider" />

              <div className="order-subtotal">
                <span>Subtotal:</span>
                <span>Rs.{subtotal}</span>
              </div>
            </>
          )}

          <button
            className="checkout-btn"
            disabled={isEmpty}
            onClick={() => !isEmpty && router.push("/checkout")}
          >
            {isEmpty ? "Empty Cart" : "Checkout"}
          </button>

          <div className="order-divider light"/>

          {/* NOTE — always visible */}
          <p className="checkout-note">
            Note: Orders are usually dispatched within 2 to 5 working days
            from our studio, unless stated otherwise in the product
            description. If you have any queries, please feel free to reach
            out to us. We are always happy to help.
          </p>
        </aside>
      </div>
    </main>
      <footer className="site-footer">
        <div className="footer-grid">
          <a href="/">Home</a>
          <a href="/shipping-and-returns">Shipping and returns</a>

          <a href="/store">Store</a>
          <a href="/payment-information">Payment Information</a>

          <a href="/collective">Collective</a>
          <a href="/terms-and-conditions">Terms and Conditions</a>

          <a href="/contact">Contact us</a>
          <a href="/privacy-policy">Privacy Policy</a>
        </div>

        <div className="footer-copyright">© 2025 Mashi, Inc.</div>
      </footer>
      </>
  );
}










