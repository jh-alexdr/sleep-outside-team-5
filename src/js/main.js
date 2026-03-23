import ProductData from "./ProductData.mjs";
import ProductList from "./productList.mjs";
import { updateCartCounter } from "./utils.mjs";

async function init() {
const dataSource = new ProductData();
const products = await dataSource.getData("tents");


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
