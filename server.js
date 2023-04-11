const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const productManager = require('./productManager');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('API is running');
});

app.get('/api/products', productManager.getAllProducts);

app.get('/api/products/:id', productManager.getProductById);

app.post('/api/products', productManager.createProduct);

app.put('/api/products/:id', productManager.updateProduct);

app.delete('/api/products/:id', productManager.deleteProduct);

app.listen(5000, () => {
  console.log('Server started at http://localhost:5000');
});
