const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ 
        message: 'Welcome to the BeTechified Project Group 5B Product Inventory API!',
        endpoints: {
            products: "/api/products"
        }
    });
});

app.get('/api/products', (req, res) => {
    res.status(200).json({
        success: true,
        count: products.length,
        data: products
    });
});

app.get('/api/products/:id', (req, res) => {
    const id = Number(req.params.id);
    const product = products.find(product => product.id === id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    }

    res.status(200).json({
        success: true,
        data: product
    });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});