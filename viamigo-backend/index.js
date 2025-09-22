// src/index.ts
import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (_req, res) => {
  res.send('ViaMigo backend is running!');
});

// Health check route
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Backend is reachable' });
});

// Start server
app.listen(PORT, () => {
  console.log(`ViaMigo backend running on port ${PORT}`);
});
