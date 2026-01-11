"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import styles from "./page.module.css";
import Link from "next/link";
export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
     <main className={`${styles.legalPage} page-container`}>
      <div className={styles.legalGrid}>{children}</div>
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


















