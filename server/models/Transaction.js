import mongoose from 'mongoose';
import { loadType } from 'mongoose-currency';

loadType(mongoose);

const TransactionSchema = mongoose.Schema(
  {
    buyer: {
      type: String,
      required: true,
    },
    amount: {
      type: mongoose.Types.Currency,
      currency: 'USD',
      get: (v) => v / 100,
    },
    productIds: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  { timestamps: true, toJSON: { getters: true } }
);

const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;
