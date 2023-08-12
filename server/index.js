import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';

import kpiRoutes from './routes/kpi.js';
//! for dummy data seeding - run once only - see connect
// import KPI from './models/KPI.js';
// import { kpis } from './data/data.js';

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

// ROUTES
app.use('/kpi', kpiRoutes);

// MONGOOSE SETUP
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'Fin-Dashboard',
  })
  .then(async () => {
    app.listen(PORT, () => console.log(`Server port ${PORT}`));

    //! seed dummy data - run one time only!!!
    // await mongoose.connection.db.dropDatabase();
    // KPI.insertMany(kpis).then(() => console.log('inserted!'));
  })
  .catch((err) => {
    console.log('Did not connect to server. Error: ', err);
  });
