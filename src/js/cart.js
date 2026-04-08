import { getLocalStorage, loadHeaderFooter, updateCartCounter } from "../js/utils.mjs";

async function init() {
  await loadHeaderFooter();
  updateCartCounter();
  renderCartContents();
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const productList = document.querySelector(".product-list");

  if (!productList) return;

  if (!cartItems || cartItems.length === 0) {
    productList.innerHTML = "<p>Your cart is empty</p>";
    const cartFooter = document.querySelector(".cart-footer");
    if (cartFooter) cartFooter.style.display = "none";
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  productList.innerHTML = htmlItems.join("");

  updateCartTotal(cartItems);
}

function cartItemTemplate(item) {
  const imageUrl = item.Images?.PrimaryMedium || "/images/placeholder.jpg";
  const colorName = item.Colors?.[0]?.ColorName || "";
  const price = item.FinalPrice || item.SuggestedRetailPrice || 0;

  return `<li class="cart-card">
  <div class="cart-card__image">
    <img src="${imageUrl}" alt="${item.Name}" />
  </div>
  <h2 class="card__name">${item.Name}</h2>
  <p class="cart-card__color">${colorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${price.toFixed(2)}</p>
</li>`;
}

function updateCartTotal(cartItems) {
  // Use FinalPrice if available, fallback to SuggestedRetailPrice
  const total = cartItems.reduce(
    (sum, item) => sum + (item.FinalPrice || item.SuggestedRetailPrice || 0),
    0
  );

  const totalElement = document.querySelector("#cart-total");
  if (totalElement) {
    totalElement.textContent = `$${total.toFixed(2)}`;
  }

  // Show item count next to total
  const itemCount = cartItems.length;
  const countElement = document.querySelector("#cart-item-count");
  if (countElement) {
    countElement.textContent = `${itemCount} item${itemCount !== 1 ? "s" : ""}`;
  }
}

init();