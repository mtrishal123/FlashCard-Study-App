import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { createServerRoutes } from '../../controller.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

createServerRoutes(app);

app.use(express.static(path.join(__dirname, '../../client/dist')));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
});

app.get('/', (req, res) => {
  res.send('✅ FlashCard Server is running successfully!');
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});



app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
