const fs = require('fs');

class ProductManager {
  constructor(products) {
    this.products = products || [];
    this.nextId = 1;
  }

  addProduct(product) {
    if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
      console.error('All fields are required');
      return;
    }

    if (this.products.find(p => p.code === product.code)) {
      console.error('Product code already exists');
      return;
    }

    product.id = this.nextId++;
    this.products.push(product);
    console.log('Product added successfully');

    // Save products to file
    try {
      const data = JSON.stringify(this.products);
      fs.writeFileSync('products.txt', data);
      console.log('Products saved to file');
    } catch (err) {
      console.error('Error saving products file', err);
    }
  }

  updateProduct(id, updates) {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) {
      console.error('Product not found');
      return;
    }
    const product = this.products[index];
    this.products[index] = { ...product, ...updates };
    console.log('Product updated successfully');

    // Save products to file
    try {
      const data = JSON.stringify(this.products);
      fs.writeFileSync('products.txt', data);
      console.log('Products saved to file');
    } catch (err) {
      console.error('Error saving products file', err);
    }
  }

  deleteProduct(id) {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) {
      console.error('Product not found');
      return;
    }
    this.products.splice(index, 1);
    console.log('Product deleted successfully');

    // Save products to file
    try {
      const data = JSON.stringify(this.products);
      fs.writeFileSync('products.txt', data);
      console.log('Products saved to file');
    } catch (err) {
      console.error('Error saving products file', err);
    }
  }

  getProducts() {
    // Load products from file
    try {
      const data = fs.readFileSync('products.txt', 'utf8');
      const products = JSON.parse(data);
      this.products = products;
    } catch (err) {
      console.error('Error reading products file', err);
    }
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(p => p.id === id);
    if (!product) {
      console.error('Product not found');
      return;
    }
    return product;
  }
}

const productManager = new ProductManager();

console.log(productManager.getProducts());

const newProduct = {
  title: 'Polo de rayas',
  description: 'Polo de algodón en tonos rojos y blancos con cuello en V.',
  price: 19.99,
  thumbnail: 'https://example.com/polo-rayas.jpg',
  code: 'PL5001',
  stock: 15
};

productManager.addProduct(newProduct);

console.log
