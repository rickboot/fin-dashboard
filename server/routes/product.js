import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

router.get('/products', async (_req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404);
  }
});

export default router;
