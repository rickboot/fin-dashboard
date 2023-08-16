import express from 'express';
import Transaction from '../models/Transaction.js';

const router = express.Router();

router.get('/transactions', async (_req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(404);
  }
});

export default router;