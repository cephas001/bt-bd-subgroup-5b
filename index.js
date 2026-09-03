const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto"); // Built-in Node module for generating unique IDs

const app = express();
const PORT = process.env.PORT || 3000;
const FILE_PATH = path.join(__dirname, "products.json");

app.use(express.json());

// --- Helper Functions for File Operations ---

// Reads the JSON file. If it doesn't exist yet, returns an empty array.
async function getProducts() {
  try {
    const data = await fs.readFile(FILE_PATH, "utf8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      // File not found, return empty array
      return [];
    }
    throw error;
  }
}

// Writes the array back to the JSON file
async function saveProducts(products) {
  await fs.writeFile(FILE_PATH, JSON.stringify(products, null, 2));
}

// --- API Endpoints ---

// GET all products
app.get("/products", async (req, res) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (err) {
    console.error("GET /products error:", err.message);
    res.status(500).json({ error: true, message: "Failed to fetch products" });
  }
});

// POST add one or many products
app.post("/api/products", async (req, res) => {
  const input = req.body.products || req.body;

  if (!input || (Array.isArray(input) && input.length === 0)) {
    return res.status(400).json({
      error: true,
      message: "Please define the products you wish to add",
    });
  }

  try {
    const products = await getProducts();
    let created;

    if (Array.isArray(input)) {
      // Generate an ID for each new product in the array
      created = input.map((p) => ({ id: crypto.randomUUID(), ...p }));
      products.push(...created);
    } else {
      // Generate an ID for a single product object
      created = { id: crypto.randomUUID(), ...input };
      products.push(created);
    }

    await saveProducts(products);
    res.status(201).json({ status: "success", created });
  } catch (err) {
    console.error("POST /products error:", err.message);
    res.status(500).json({ error: true, message: "Failed to add products" });
  }
});

// DELETE product by id
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const products = await getProducts();
    const filteredProducts = products.filter((p) => p.id !== id);

    // If the arrays are the same length, nothing was removed
    if (products.length === filteredProducts.length) {
      return res
        .status(404)
        .json({ error: true, message: "Product not found" });
    }

    await saveProducts(filteredProducts);
    res.json({ status: "success", message: `Product ${id} deleted` });
  } catch (err) {
    console.error(`DELETE /products/${id} error:`, err.message);
    res.status(500).json({ error: true, message: "Failed to delete product" });
  }
});

// PUT update product by id
app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const products = await getProducts();
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
      return res
        .status(404)
        .json({ error: true, message: "Product not found" });
    }

    // Update the product while ensuring the original ID cannot be overwritten
    products[index] = {
      ...products[index],
      ...updates,
      id: products[index].id,
    };

    await saveProducts(products);
    res.json({ status: "success", product: products[index] });
  } catch (err) {
    console.error(`PUT /products/${id} error:`, err.message);
    res.status(500).json({ error: true, message: "Failed to update product" });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
