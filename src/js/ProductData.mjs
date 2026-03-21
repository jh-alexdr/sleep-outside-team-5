function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`Bad Response: ${res.status} ${res.statusText}`);
  }
}

// Hardcoded URL (temporary, until .env works)
const baseURL = "https://wdd330-backend.onrender.com/";
console.log("🚀 baseURL (hardcoded):", baseURL);

export default class ProductData {
  constructor() {}

  async getData(category) {
    console.log("📦 getData called with category:", category);
    const url = `${baseURL}products/search/${category}`;
    console.log("🌐 Generated URL:", url);

    try {
      const response = await fetch(url);
      console.log("📡 Status:", response.status);

      const data = await convertToJson(response);
      console.log("📦 Data received:", data);

      return data.Result;
    } catch (error) {
      console.error("❌ Error in getData:", error.message);
      throw error;
    }
  }

  async findProductById(id) {
    console.log("🔍 Searching product with ID:", id);
    const url = `${baseURL}product/${id}`;
    console.log("🌐 Generated URL:", url);

    try {
      const response = await fetch(url);
      console.log("📡 Status:", response.status);
      console.log("📡 Content-Type:", response.headers.get("content-type"));

      // ✅ Read directly as JSON (cleaner)
      const data = await convertToJson(response);
      console.log("✅ JSON parsed successfully:", data);

      // ✅ Return data.Result (the actual product)
      return data.Result;
    } catch (error) {
      console.error("❌ Error in findProductById:", error.message);
      throw error;
    }
  }
}