"use client";

import React, { useState, useEffect, useCallback } from "react";
import "./style.css";
import Link from "next/link";

const banners = [
  { src: "/images/smartphone-banner.jpg", alt: "smartphone-banner", href: "/product-category/smartphones" },
  { src: "/images/gaming-banner.jpg", alt: "gaming-banner", href: "/product-category/gaming" },
  { src: "/images/laptop-banner.jpg", alt: "laptop-banner", href: "/product-category/laptops" },
  { src: "/images/television-banner.jpg", alt: "television-banner", href: "/product-category/televisions" },
  { src: "/images/accessories-banner.jpg", alt: "accessories-banner", href: "/product-category/accessories" },
];

export default function Banner() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Update the scroll position
  const updateScrollPosition = useCallback(() => {
    setScrollPosition((prev) => (prev + 1) % banners.length); // Loop back to 0 after the last banner
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        updateScrollPosition();
      }
    }, 8000); // Interval of 8 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [isTransitioning, updateScrollPosition]);

  useEffect(() => {
    if (isTransitioning) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false); // Reset transition state after animation completes
      }, 500); // Timeout matches the transition duration
      return () => clearTimeout(timeout); // Cleanup timeout on unmount
    }
  }, [isTransitioning]);

  return (
    <div className="banner-wrapper">
      <div
        className="banner"
        style={{
          transform: `translateX(-${scrollPosition * 100}%)`, // Move the banner leftwards based on scroll position
        }}
      >
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`product-banner ${
              scrollPosition === index ? "visible" : ""
            }`}
          >
            <Link href={banner.href}>
              <img
                src={banner.src}
                alt={banner.alt}
                className="banner-image"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}