
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import pool from './config/db.js';
import orderRoutes from './routes/orders.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const checkDBConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('MySQL Database Connected');
    connection.release();
  } catch (error) {
    console.error('MySQL Connection Failed:', error);
    process.exit(1); 
  }
};
checkDBConnection();

app.use('/api/orders', orderRoutes);

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});

