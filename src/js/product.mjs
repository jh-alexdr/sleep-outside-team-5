/* OLD import { setLocalStorage } from "./utils.mjs"; */
import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

/* function addProductToCart(product) {
  setLocalStorage("so-cart", product);
} OLD FUNCTION*/

/* This is my personal as Alejandro Pérez
NEW FUNCTION addProductToCart */
function addProductToCart(product) {
  //First I need am¿n empty array here
  const cartContent = getLocalStorage("so-cart") || [];
  //Later, I will add a new product
  cartContent.push(product);
  //Finally, I save the update array
  setLocalStorage("so-cart", cartContent);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
