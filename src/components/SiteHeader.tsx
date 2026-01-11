"use client";

import Link from "next/link";
import SearchToggle from "@/components/SearchToggle";
import CartIcon from "@/components/CartIcon";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <nav className="site-nav">
        {/* LEFT */}
        <div className="site-nav-left">
          <div className="site-logo-button">
            <Link href="/" className="logo-desktop">
              <img src="/icons/logo.svg" alt="Mashi logo" />
            </Link>
          </div>

          {/* NAV LINKS (same for all screen sizes) */}
          <ul className="site-nav-links">
            <li>
              <Link href="/store">Store</Link>
            </li>
            <li>
              <Link href="/collective">Collective</Link>
            </li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="site-nav-right">
          <SearchToggle />
          <CartIcon />
        </div>
      </nav>
    </header>
  );
}

