import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import 'express-async-errors';
import authRoutes from './routes/auth';
import destRoutes from './routes/destinations';
import itineraryRoutes from './routes/itineraries';
import groupRoutes from './routes/groups';
import recRoutes from './routes/recommendations';
import healthRoutes from './routes/health';
import errorHandler from './middlewares/errorHandler';

dotenv.config();

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/destinations', destRoutes);
app.use('/itineraries', itineraryRoutes);
app.use('/groups', groupRoutes);
app.use('/recommendations', recRoutes);
app.use('/health', healthRoutes);
// Add this above app.use(errorHandler);
app.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'ViaMigo backend running — try /health or /auth/login',
  });
});

// Global error handler
app.use(errorHandler);

// Start server
const PORT: number = Number(process.env.PORT) || 4000;
app.listen(PORT, () => {
  console.log(`ViaMigo backend running on port ${PORT}`);
});

app.get('/', (_req, res) => {
  return res.json({ status: 'ViaMigo API', message: 'Backend running — try /health or /auth' });
});
