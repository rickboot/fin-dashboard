import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';

import kpiRoutes from './routes/kpi.js';
import productRoutes from './routes/product.js';
import transactionRoutes from './routes/transaction.js';

//! for dummy data seeding - run once only - see connect
import KPI from './models/KPI.js';
import Product from './models/Product.js';
import Transaction from './models/Transaction.js';
import { kpis, products, transactions } from './data/data.js';

dotenv.config();
const PORT = process.env.PORT || 5050;
const MONGO_URL = process.env.MONGO_URL;

// CONFIG
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// ROUTES - to handle requests to get data from db
app.use('/kpi', kpiRoutes);
app.use('/product', productRoutes);
app.use('/transaction', transactionRoutes);

// MONGOOSE SETUP
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'Fin-Dashboard',
  })
  .then(async () => {
    app.listen(PORT, () => console.log(`Server port ${PORT}`));

    //! seed dummy data to mongoDB cloud - run one time only
    // await mongoose.connection.db.dropDatabase();
    // KPI.insertMany(kpis).then(() => console.log('kpis inserted!'));
    // Product.insertMany(products).then(() => console.log('products inserted!'));
    // Transaction.insertMany(transactions).then(() =>
    //   console.log('transactions inserted!')
    // );
  })
  .catch((err) => {
    console.log('Did not connect to server. Error: ', err);
  });
