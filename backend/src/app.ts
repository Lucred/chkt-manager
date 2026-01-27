import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mainRouter from './routes/index';

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use(mainRouter);

// Health check
app.get('/', (req, res) => {
  res.send('Checkout Manager API');
});

export default app;
