"use client";  // Ensure this directive is at the top

import "./style.css";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";  // Use this for pathname access
import axios from "axios";
import { API_URL } from "../../config";
import Link from "next/link";

export default function ProductCategory() {
  const pathname = usePathname();  // Get the current pathname
  const category = pathname.split('/')[2];  // Extract category from URL path (e.g., 'smart-phone')

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(category);  // Log the category for debugging

  useEffect(() => {
    if (!category) return; // Ensure category is available
    console.log(category);  // Log the category for debugging

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const URL = `${API_URL}/products/category/${category}`;
        console.log(URL);
        const { data } = await axios.get(URL);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="product-category">
      <div className="header">
        <h1>
          {category ? category.charAt(0).toUpperCase() + category.slice(1) : "Category"}
        </h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="fetched-products-div">
        {products.length === 0 ? (
          <p>No products available in this category.</p>
        ) : (
          products.map((product) => (
            <div className="product" key={product._id}>
              <Link href={`/product/${product.productUrl}`}>
                <img src={product.image} alt={product.name || "Product Image"} />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>${product.price}</p>
                  <button>Add to Cart</button>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
