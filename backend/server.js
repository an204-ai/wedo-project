import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import taskRoutes from "./src/routes/taskRoutes.js";
import cors from 'cors';
import path from 'path';

dotenv.config();

const __dirname = path.resolve();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

//Middleware
app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
    app.use(cors());
}

//Routes
app.use('/api/task', taskRoutes);

//Static
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
    });
}

app.listen(PORT, () => { console.log(`Server listening on http://localhost:${PORT}`);
});
