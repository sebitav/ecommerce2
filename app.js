const express = require('express');
const ProductManager = require('./productManagerproductManager');

const app = express();
const port = 3000;

const productManager = new ProductManager();

app.get('/products', (req, res) => {
  let products = productManager.getProducts();

  // Si se recibe el query de limit, se filtran los productos según el límite especificado
  if (req.query.limit) {
    const limit = parseInt(req.query.limit);
    products = products.slice(0, limit);
  }

  res.json(products);
});

app.get('/products/:pid', (req, res) => {
  const pid = parseInt(req.params.pid);
  const product = productManager.getProductById(pid);

  if (!product) {
    res.status(404).send('Product not found');
  } else {
    res.json(product);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
