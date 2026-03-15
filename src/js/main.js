import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCounter } from "./utils.mjs";

function init() {
  const dataSource = new ProductData("tents");
  const listElement = document.querySelector(".product-list");

  if (!listElement) {
    console.error("It´s not found .product-list in DOM");
    return;
  }

  const productListInstance = new ProductList("tents", dataSource, listElement);
  productListInstance.init();

  // Update cart counter when page loads
  updateCartCounter();
}

// Wait for DOM to be ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
// src/main.js
import ProductList from './ProductList.mjs';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const productListElement = document.getElementById('product-list');

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = searchInput.value.trim();

  if (!query) return;

  // Example: fetch from your API endpoint
  const response = await fetch(`/api/products?search=${encodeURIComponent(query)}`);
  const results = await response.json();

  // Render results using ProductList
  const searchResultsList = new ProductList('search', `/api/products?search=${query}`, productListElement);
  searchResultsList.render(results);
});

