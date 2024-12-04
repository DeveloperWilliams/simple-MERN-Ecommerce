"use client";  // Ensure this directive is at the top

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import "./style.css";

export default function LowerNav() {
  const pathname = usePathname(); // Get current pathname using usePathname

  return (
    <div className="lower-nav">
      <ul>
        <li className={pathname === "/product-category/smartphones" ? "active" : ""}>
          <Link href="/product-category/smartphones">Smartphones</Link>
        </li>
        <li className={pathname === "/product-category/laptops" ? "active" : ""}>
          <Link href="/product-category/laptops">Laptops</Link>
        </li>
        <li className={pathname === "/product-category/gaming" ? "active" : ""}>
          <Link href="/product-category/gaming">Gaming</Link>
        </li>
        <li className={pathname === "/product-category/televisions" ? "active" : ""}>
          <Link href="/product-category/televisions">Televisions</Link>
        </li>
        <li className={pathname === "/product-category/accessories" ? "active" : ""}>
          <Link href="/product-category/accessories">Accessories</Link>
        </li>
      </ul>
    </div>
  );
}
