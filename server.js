import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';

import genreRoute from './routes/genreRoute';
import customerRoute from './routes/customerRoute'

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1/genres', genreRoute);
app.use('/api/v1/customer', customerRoute);

app.get('/', (req, res) => {
  res.status(200).send({
    status: 200,
    message: 'Hello this is a Rental App',
  });
});

const { PORT } = process.env;
app.listen(PORT, () => console.log(`server is running on port ${PORT}...`));

export default app;
