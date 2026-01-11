"use client";

import { useRef } from "react";
import { addToCart } from "@/lib/cart";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

/* COLOR HEX MAP */
const COLOR_MAP: Record<string, string> = {
  lemongrass: "#555B29",
  terracotta: "#93483A",
  gulaab: "#6D4147",
};

/* TYPES */
type Product = {
  id: number;
  name: string;
  images: string[];
  sizes: string[];
  description: string;
  variants: GSMVariant[];
};

type GSMVariant = {
  gsm: string;
  price: number;
  colors: ColorVariant[];
};

type ColorVariant = {
  name: string;
  type: "COLOR" | "FORMAT";
  soldOut?: boolean;
  price?: number;
};

export default function ProductPage() {
  const params = useParams();
  const rawId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<GSMVariant | null>(null);
  const [selectedOption, setSelectedOption] = useState<ColorVariant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const wheelLocked = useRef(false);

  /* FETCH PRODUCT */
  useEffect(() => {
  if (!rawId) return;

  fetch(`/api/products/${rawId}`)
    .then((res) => {
      if (!res.ok) throw new Error("Product not found");
      return res.json();
    })
    .then((data: Product) => {
      const defaultVariant = data.variants[0];

      const defaultFormatOption =
        defaultVariant.colors?.find((opt) => opt.type === "FORMAT") ?? null;

      setProduct(data);
      setSelectedVariant(defaultVariant);
      setSelectedOption(defaultFormatOption);
      setImageIndex(0);
      setLoading(false);
    })
    .catch((err) => {
      setError(err.message);
      setLoading(false);
    });
}, [rawId]);

 function ProductLoader() {
  return (
    <div className="product-loader">
      <video
        src="/icons/loader.MP4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="loader-video"
      />
    </div>
  );
}
  if (loading) return <ProductLoader />;
  if (error || !product || !selectedVariant) {
    return <p>{error ?? "Product unavailable"}</p>;
  }

  /* OPTIONS */
  const optionList = selectedVariant.colors ?? [];
  const requiresOption = optionList.length > 0;
  const isOptionSelected = !requiresOption || selectedOption !== null;

  /* PRICE */
  const displayPrice =
    selectedOption?.type === "FORMAT" && selectedOption.price
      ? selectedOption.price
      : selectedVariant.price;
   
  function handleAddToCart() {
    if (!isOptionSelected) return;

    addToCart({
      id: product.id,
      name: product.name,
      price: displayPrice,
      image: product.images[imageIndex],
      gsm: selectedVariant.gsm,
      color: selectedOption?.name ?? "",
      size: product.sizes[0],
    });
  }

  return (
    <>
    <main className="product-page page-container">
      <div className="product-layout">
        {/* IMAGE */}
        <div
          className="product-media"
          onWheel={(e) => {
            e.preventDefault();

            if (wheelLocked.current) return;

            wheelLocked.current = true;

            setImageIndex((prev) => {
              if (e.deltaY > 0) {
                return Math.min(prev + 1, product.images.length - 1);
              } else {
                return Math.max(prev - 1, 0);
              }
            });

            setTimeout(() => {
              wheelLocked.current = false;
            }, 400); // 👈 adjust speed here
          }}
        >
          <img
            src={product.images[imageIndex]}
            alt={product.name}
            className="product-image"
          />
        </div>

        {/* DETAILS */}
        <div className="product-details">
          <div className="product-details-sub">
          <div className="product-header">
            <h1 className="product-title">{product.name}</h1>
            <span className="product-price">Rs. {displayPrice}</span>
          </div>
          <div className="product-detail-metasub">
          {/* COLOR + FORMAT OPTIONS */}
          {optionList.length > 0 && (
            <div className="product-meta-row">
              <div className="product-badges">
                {optionList.map((opt) => {
                  const colorKey = opt.name.toLowerCase().trim(); // for COLOR
                  const imageKey =
                    opt.type === "FORMAT"
                      ? opt.name.toLowerCase().replace(/\s+/g, "")
                      : colorKey;
                  const isActive = selectedOption?.name === opt.name;
                  

                  const imageIdx = product.images.findIndex((img) =>
                    img.toLowerCase().includes(imageKey)
                  );

                  return (
                    <div
                      key={opt.name}
                      className={`color-swatch ${
                        isActive ? "active" : ""
                      } ${opt.type === "FORMAT" ? "format-swatch" : ""}`}
                      style={
                        opt.type === "COLOR"
                          ? ({
                              "--swatch-color": COLOR_MAP[colorKey],
                            } as React.CSSProperties)
                          : undefined
                      }
                      onClick={() => {
                        if (opt.soldOut) return;
                        setSelectedOption(opt);
                        if (imageIdx >= 0) setImageIndex(imageIdx);
                      }}
                    >
                      <span
                        className={`color-text ${
                          opt.type === "FORMAT" && isActive ? "bold" : ""
                        }`}
                      >
                        {opt.name}
                      </span>

                      {opt.type === "COLOR" && <span className="color-dot" />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* GSM */}
          <div className="product-meta-row">
            {product.variants.length > 1 ? (
              <div className="product-badges">
                {product.variants.map((variant) => (
                  <span
                    key={variant.gsm}
                    className={`product-badge ${
                      selectedVariant.gsm === variant.gsm ? "active" : ""
                    }`}
                    onClick={() => {
                      setSelectedVariant(variant);
                      setSelectedOption(null);
                    }}
                  >
                    {variant.gsm}
                  </span>
                ))}
              </div>
            ) : (
              <p className="product-info">{selectedVariant.gsm}</p>
            )}
          </div>
          </div>
        </div>

          

          {/* INFO */}
          <div className="product-meta-row">

            <button
              className="add-to-cart-btn"
              disabled={!isOptionSelected}
              onClick={handleAddToCart}
            >
              {isOptionSelected ? "Add to Cart" : "Select an option"}
          </button>

            <h2 className="product-section-title">Item info</h2>

            <div className="product-sizes">
              <span className="size-label">SIZE:</span>
              {product.sizes.map((size) => (
                <span key={size} className="size-value">
                  {size}
                </span>
              ))}
            </div>

            <p className="product-description">{product.description}</p>

            {/* MOBILE IMAGE GALLERY */}
            <div className="mobile-product-gallery">
              {product.images
                .filter((img) => {
                  const name = img.toLowerCase();
                  return name.includes("main") || name.includes("book");
                })
                .map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${product.name} detail ${idx + 1}`}
                    className="mobile-gallery-image"
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      </main>
      {/* MOBILE FOOTER */}
      <footer className="site-footer mobile-footer">
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



















