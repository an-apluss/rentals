/* eslint-disable linebreak-style */
import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';

import genreRoute from './routes/genreRoute';
import customerRoute from './routes/customerRoute';
import movieRoute from './routes/movieRoute';
import userRoute from './routes/userRoute';


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send({
    status: 200,
    message: 'Hello this is a Rental App',
  });
});

app.use('/api/v1/auth', userRoute);
app.use('/api/v1/genres', genreRoute);
app.use('/api/v1/customer', customerRoute);
app.use('/api/v1/movie', movieRoute);

const { PORT } = process.env;
app.listen(PORT, () => console.log(`server is running on port ${PORT}...`));

export default app;
