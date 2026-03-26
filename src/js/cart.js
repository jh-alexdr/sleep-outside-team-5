import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

async function init() {

  // Load header and footer dynamically
  await loadHeaderFooter();

  //Update the cart
  renderCartContents();
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  const productList = document.querySelector(".product-list");
  if (!productList) return;

  if (!cartItems || cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML = "<p>Your cart is empty</p>";
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // Calcular y mostrar el total
  const total = cartItems.reduce(
  (sum, item) => sum + (item.FinalPrice || item.SuggestedRetailPrice || 0), 0
  );

  const totalElement = document.querySelector("#cart-total");
  if (totalElement) {
    totalElement.textContent = `$${total.toFixed(2)}`;
  }
}

function cartItemTemplate(item) {
  // ✅ Use PrimaryMedium from Images object
  const imageUrl = item.Images?.PrimaryMedium || "/images/placeholder.jpg";
  
  // ✅ Get color name (Colors is an object, not an array)
  const colorName = item.Colors?.ColorName || "";
  
  // ✅ Use SuggestedRetailPrice instead of FinalPrice
  const price = item.SuggestedRetailPrice || 0;

  return `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${imageUrl}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${colorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${price}</p>
</li>`;
}

// Initialize the cart
//renderCartContents();
init();