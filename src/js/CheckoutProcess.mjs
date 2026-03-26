import { getLocalStorage } from "./utils.mjs";

function packageItems(items) {
  return items.map((item) => ({
    id: item.Id,
    name: item.Name,
    price: item.FinalPrice || item.SuggestedRetailPrice,
    quantity: item.quantity || 1,
  }));
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSubTotal();
  }

  calculateItemSubTotal() {
    this.itemTotal = this.list.reduce(
      (sum, item) => sum + (item.FinalPrice || item.SuggestedRetailPrice || 0),
      0
    );

    // Mostrar subtotal y número de items
    const subtotalEl = document.querySelector(`${this.outputSelector} #subtotal`);
    const itemCountEl = document.querySelector(`${this.outputSelector} #item-count`);

    if (subtotalEl) subtotalEl.innerText = `$${this.itemTotal.toFixed(2)}`;
    if (itemCountEl) itemCountEl.innerText = `${this.list.length} item(s)`;
  }

  calculateOrderTotal() {
    // 6% de impuesto sobre el subtotal
    this.tax = this.itemTotal * 0.06;
    // $10 primer artículo + $2 por cada adicional
    this.shipping = this.list.length > 0 ? 10 + (this.list.length - 1) * 2 : 0;
    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const taxEl = document.querySelector(`${this.outputSelector} #tax`);
    const shippingEl = document.querySelector(`${this.outputSelector} #shipping`);
    const orderTotalEl = document.querySelector(`${this.outputSelector} #order-total`);

    if (taxEl) taxEl.innerText = `$${this.tax.toFixed(2)}`;
    if (shippingEl) shippingEl.innerText = `$${this.shipping.toFixed(2)}`;
    if (orderTotalEl) orderTotalEl.innerText = `$${this.orderTotal.toFixed(2)}`;
  }

  async checkout(form) {
    const formData = new FormData(form);
    const orderData = Object.fromEntries(formData);

    // Agregar los datos calculados
    orderData.orderDate = new Date().toISOString();
    orderData.orderTotal = this.orderTotal.toFixed(2);
    orderData.tax = this.tax.toFixed(2);
    orderData.shipping = this.shipping;
    orderData.items = packageItems(this.list);

    console.log("Order data:", orderData);

    // Importar ExternalServices y enviar el pedido
    const { default: ExternalServices } = await import("./ExternalServices.mjs");
    const services = new ExternalServices();
    const response = await services.checkout(orderData);
    return response;
  }
}