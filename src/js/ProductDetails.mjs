import { setLocalStorage, getLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // 1. Fetch product details using the ID from the URL
    this.product = await this.dataSource.findProductById(this.productId);

    // 2. Render the product details HTML
    this.renderProductDetails("main");

    // 3. Add listener to the 'Add to Cart' button
    // .bind(this) ensures 'this' refers to the class instance inside the method
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }

  addToCart() {
    // Get the current cart content (or an empty array if it doesn't exist)
    const cart = getLocalStorage("so-cart") || [];
    
    // Add the current product to the cart
    cart.push(this.product);
    
    // Save the updated cart back to localStorage
    setLocalStorage("so-cart", cart);
    
    alert("Product added to cart!");
  }

  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.innerHTML = `
      <section class="product-detail">
        <h3>${this.product.Brand.Name}</h3>
        <h2 class="divider">${this.product.NameWithoutBrand}</h2>
        <img
          class="divider"
          src="${this.product.Image}"
          alt="${this.product.NameWithoutBrand}"
        />
        <p class="product-card__price">$${this.product.FinalPrice}</p>
        <p class="product__color">${this.product.Colors[0].ColorName}</p>
        <p class="product__description">${this.product.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
        </div>
      </section>`;
  }
}