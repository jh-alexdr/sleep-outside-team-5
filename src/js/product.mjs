import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// Initialize data source for tents
const dataSource = new ProductData("tents");

// Get the product ID from the URL parameter
const productId = getParam("product");

// Create and initialize the ProductDetails instance
const product = new ProductDetails(productId, dataSource);
product.init();
