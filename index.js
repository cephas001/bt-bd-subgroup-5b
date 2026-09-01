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

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
