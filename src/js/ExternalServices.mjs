function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`Bad Response: ${res.status} ${res.statusText}`);
  }
}

// Hardcoded URL (temporal, until .env works)
const baseURL = "https://wdd330-backend.onrender.com/";
console.log("🚀 baseURL:", baseURL);

export default class ExternalServices {
  constructor() {}

  async getData(category) {
    console.log("📦 getData calling by category:", category);
    const url = `${baseURL}products/search/${category}`;
    console.log("🌐 URL generated:", url);

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
    console.log("🔍 Searching product by ID:", id);
    const url = `${baseURL}product/${id}`;
    console.log("🌐 URL generada:", url);

    try {
      const response = await fetch(url);
      console.log("📡 Status:", response.status);
      console.log("📡 Content-Type:", response.headers.get("content-type"));

      const data = await convertToJson(response);
      console.log("✅ JSON parseado correctamente:", data);

      return data.Result;
    } catch (error) {
      console.error("❌ Error in findProductById:", error.message);
      throw error;
    }
  }

  async checkout(payload) {
    const url = `https://wdd330-backend.onrender.com/checkout`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    const response = await fetch(url, options);
    const data = await convertToJson(response);
    return data;
  }
}