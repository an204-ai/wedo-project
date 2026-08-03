import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import taskRoutes from "./src/routes/taskRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

//Middleware
app.use(express.json());

//Routes
app.use('/api/task', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
