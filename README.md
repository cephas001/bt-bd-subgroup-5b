# 📦 Product Inventory API - JSON File Storage (Subgroup 5B)

This repository contains Subgroup 5B's implementation of the Product Inventory API. This solution uses **File System Data Persistence**, meaning all inventory data is written to and read from a local `products.json` file using Node.js's native `fs/promises` and `crypto` modules.

## ✨ Features

- **Persistent Storage:** Data survives server restarts by saving to a local JSON file.
- **Batch Creation:** The POST endpoint supports creating a single product or an array of products in one request.
- **Auto-Generated IDs:** Uses Node.js's native `crypto.randomUUID()` to generate unique identifiers.
- **Safe Updates:** Prevents accidental overwriting of a product's unique `id` during updates.

## 🚀 Getting Started

### Prerequisites

- Node.js v18.11.0 or later (recommended for `--watch` and `crypto.randomUUID()` support)
- npm (Node Package Manager)

### Installation & Execution

1. Install dependencies:

```bash
npm install
```

2. Start the server:

Development mode (auto-restarts on file changes):

```bash
npm run dev
```

Standard mode:

```bash
npm start
```

The server will start on:

```text
http://localhost:3000
```

> **Note:** A `products.json` file will be automatically generated in the project root when the first product is created.

---

## 📖 API Documentation

**Base URL:**

```text
http://localhost:3000
```

| Method | Endpoint            | Description                                                                      |
| ------ | ------------------- | -------------------------------------------------------------------------------- |
| GET    | `/api/products`     | Retrieve all products in the inventory.                                          |
| POST   | `/api/products`     | Create one or multiple products. Accepts a single object or an array of objects. |
| PUT    | `/api/products/:id` | Update an existing product by its ID.                                            |
| DELETE | `/api/products/:id` | Delete a product by its ID.                                                      |

### Example Payloads

#### POST `/api/products` (Single Product)

```json
{
  "name": "Wireless Mouse",
  "price": 25.99,
  "stock": 150
}
```

#### POST `/api/products` (Multiple Products)

```json
[
  {
    "name": "Mechanical Keyboard",
    "price": 89.99
  },
  {
    "name": "Monitor Stand",
    "price": 45.0
  }
]
```

#### PUT `/api/products/:id`

```json
{
  "price": 22.5,
  "stock": 120
}
```

## 🛠️ Tech Stack

- **Express.js (v5.2.1):** Web framework for routing and request handling.
- **fs/promises:** Native Node.js module for asynchronous file operations.
- **crypto:** Native Node.js module used to generate UUIDs.

## 📄 License

This project was developed
