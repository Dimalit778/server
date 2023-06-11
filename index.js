import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
import axios from 'axios';

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//middlewares

app.use('/auth', authRoute);
app.use('/users', userRoute);
// app.use('/products');

// Error handler
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong!';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// app.use('/', (req, res, next) => {
//   const data = JSON.stringify({
//     collection: 'Products',
//     database: 'Store_items',
//     dataSource: 'storeClus',
//     projection: {
//       _id: 1,
//     },
//   });

//   const config = {
//     method: 'post',
//     url: 'https://eu-central-1.aws.data.mongodb-api.com/app/data-conyx/endpoint/data/v1/action/findOne',
//     headers: {
//       'Content-Type': 'application/json',
//       'Access-Control-Request-Headers': '*',
//       'api-key': process.env.API_KEY,
//     },
//     data: data,
//   };

//   axios(config)
//     .then(function (response) {
//       console.log(JSON.stringify(response.data));
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// });

const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose
  .connect(process.env.DB_STORE, dbOptions)
  .then(() => console.log('DB store connected!'))
  .catch((err) => console.log(err));

// const db_products = mongoose
//   .connect(process.env.DB_PRODUCTS, dbOptions)
//   .then(() => console.log('DB PRODUCTS connected!'))
//   .catch((err) => console.log(err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('running on port ' + port);
  console.log('Connected to backend');
});
