// server.js
import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServerRoutes } from './controller.js';

const PORT = 3000;
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.json());

createServerRoutes(app);

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
