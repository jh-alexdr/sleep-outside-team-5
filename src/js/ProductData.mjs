// src/js/ProductData.mjs

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    
    // Automatic environment detection
    // This helps the app find the JSON files whether on localhost or published on Render
    const isProduction = window.location.hostname !== "localhost" && 
                         !window.location.hostname.includes("127.0.0.1");
    
    if (isProduction) {
      // Path for production (Render)
      this.path = `./json/${this.category}.json`;
    } else {
      // Path for development (Localhost)
      this.path = `../json/${this.category}.json`;
    }
  }
  
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }
  
  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}