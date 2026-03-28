import {
  getLocalStorage,
  loadHeaderFooter,
  updateCartCounter,
// eslint-disable-next-line import/no-unresolved
} from "/js/utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

async function init() {
  // Load header and footer dynamically
  await loadHeaderFooter();

  // Update cart counter
  updateCartCounter();

  // Get cart items
  const cartItems = getLocalStorage("so-cart") || [];

  // Check if cart is empty
  if (cartItems.length === 0) {
    const orderSummary = document.querySelector("#order-summary");
    if (orderSummary) {
      orderSummary.innerHTML =
        "<p>Your cart is empty. <a href='/index.html'>Go shopping</a></p>";
    }
    const submitButton = document.querySelector("#checkoutSubmit");
    if (submitButton) submitButton.style.display = "none";
    return;
  }

  // Initialize checkout process
  const myCheckout = new CheckoutProcess("so-cart", "#order-summary");
  myCheckout.init();

  // Calculate totals when zip code changes
  const zipInput = document.querySelector("#zip");
  if (zipInput) {
    zipInput.addEventListener("blur", () => {
      myCheckout.calculateOrderTotal(zipInput.value);
    });
    myCheckout.calculateOrderTotal(zipInput.value || "00000");
  }

  // Handle form submission
  const form = document.querySelector("#checkout-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const chk_status = form.checkValidity();
      form.reportValidity();
      if (chk_status) {
        await myCheckout.checkout(form);
      }
    });
  }
}

// Run initialization when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}