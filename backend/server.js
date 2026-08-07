import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import taskRoutes from "./src/routes/taskRoutes.js";
import cors from 'cors';
import path from 'path';
import authRoutes from "./src/routes/authRoutes.js";
import cookieParser from 'cookie-parser';
import { authMiddleware } from "./src/middleware/authMiddleware.js";
import userRoutes from "./src/routes/userRoutes.js";

dotenv.config();

const __dirname = path.resolve();

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.json());
app.use(cookieParser());


if (process.env.NODE_ENV !== 'production') {
    app.use(cors({ origin: "http://localhost:5173", credentials: true }));
}

//Public routes
app.use('/api/auth', authRoutes);

//Private routes
app.use('/api/tasks', authMiddleware, taskRoutes);
app.use('/api/user', authMiddleware, userRoutes);

//Static
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
    });
}

connectDB().then(() => {
    app.listen(PORT, () => { console.log(`Server listening on http://localhost:${PORT}`);
});
}).catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
});
