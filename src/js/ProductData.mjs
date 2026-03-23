const baseURL = import.meta.env.VITE_SERVER_URL;

import { convertToJson } from "./utils.mjs";

export default class ProductData {
  constructor() {
  }

  async getData(category) {
    try {
      const response = await fetch(`${baseURL}products/search/${category}`);
      const data = await convertToJson(response);
      return data.Result;
    } catch (error) {
      console.error("Error fetching product data:", error);
      return [];
    }
  }
}
