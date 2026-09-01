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
