import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const imageUrl = product.Images?.PrimaryMedium || "/images/placeholder.jpg";
  const brandName = product.Brand.Name || product.Brand || "Brand";
  const productName = product.NameWithoutBrand || product.Name || "Product";
  const price = product.SuggestedRetailPrice || 0;

  return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
      <img
        src="${imageUrl}"
        alt="Image of ${productName}"
      />
      <h3 class="card__brand">${brandName}</h3>
      <h2 class="card__name">${productName}</h2>
      <p class="product-card__price">$${price}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.products = []; // ✅ guardamos los productos para re-ordenar
  }

  async init() {
    const list = await this.dataSource.getData(this.category);

    this.products = list; // ✅ guardamos referencia

    this.renderList(this.products);

    // ✅ Contador de productos
    const countElement = document.querySelector("#product-count");
    if (countElement && list) {
      countElement.textContent = `(${list.length} items found)`;
    }

    // ✅ Conectar el selector de ordenamiento
    const sortSelector = document.querySelector("#sort-options");
    if (sortSelector) {
      sortSelector.addEventListener("change", (e) => {
        const sorted = this.sortList(e.target.value);
        this.renderList(sorted);
      });
    }
  }

  // ✅ Nuevo método de ordenamiento
  sortList(criteria) {
    const sorted = [...this.products]; // copia para no mutar el original

    if (criteria === "name") {
      sorted.sort((a, b) => {
        const nameA = (a.NameWithoutBrand || a.Name || "").toLowerCase();
        const nameB = (b.NameWithoutBrand || b.Name || "").toLowerCase();
        return nameA.localeCompare(nameB);
      });
    } else if (criteria === "price-asc") {
      sorted.sort((a, b) => (a.SuggestedRetailPrice || 0) - (b.SuggestedRetailPrice || 0));
    } else if (criteria === "price-desc") {
      sorted.sort((a, b) => (b.SuggestedRetailPrice || 0) - (a.SuggestedRetailPrice || 0));
    }

    return sorted;
  }

  renderList(list) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      "afterbegin",
      true,
    );
  }
}