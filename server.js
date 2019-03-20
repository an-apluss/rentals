import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send({
    status: 200,
    message: 'Hello this is a Rental App',
  });
});

const { PORT } = process.env;
app.listen(PORT, () => console.log(`server is running on port ${PORT}...`));

export default app;
