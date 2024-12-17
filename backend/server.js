import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import taskRouter from './routes/taskRouter.js';
import 'dotenv/config';

// app config
const app = express();
const PORT = process.env.PORT || 4000;

// middleware
// whenever we will get a request from frontend to backend that will be parsed using this json middleware
app.use(express.json());
// this will allow us to access the backend from any frontend
app.use(cors());

//db connection
connectDB();

// api endpoints
app.use('/api/task', taskRouter);

app.get('/', (req, res) => {
  res.send('API Working!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
