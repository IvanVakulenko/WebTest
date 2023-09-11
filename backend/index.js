import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { PORT, mongoDBURL } from './config.js';

import usersRoute from './routes/usersRoute.js';
import testsRoute from './routes/testsRoute.js';


const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY

app.use(cors());

//Cookies

// app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));


app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome To MERN Stack Tutorial');
});

app.use('/users', usersRoute);

app.use('/tests', testsRoute);


mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });


export default app;