import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

const checkout = new CheckoutProcess("so-cart", "#order-summary");

async function init() {
  await loadHeaderFooter();

  // Calcular subtotal al cargar la página
  checkout.init();

  // Calcular impuestos y envío cuando el usuario llena el zip
  document.querySelector("#zip").addEventListener("blur", () => {
    checkout.calculateOrderTotal();
  });

  // Manejar el envío del formulario
  document.querySelector("#checkout-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const response = await checkout.checkout(e.target);
      console.log("Server response:", response);
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("There was an error placing your order. Please try again.");
    }
  });
}

init();