import express from 'express';
import authRouter from './routes/authRoute.js';
import itemRouter from './routes/itemRoute.js';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, World!');
})

app.use('/auth', authRouter);
app.use('/', itemRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
})