import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorMiddleware } from './middleware/error.middleware';
import { requestLogger } from './middleware/logger.middleware';
import routes from './routes';

export function createServer(): Application {
  const app = express();

  // security middleware
  app.use(helmet());
  app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
  }));

  // cody parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // logging
  app.use(requestLogger);

  // cealth check
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // API routes
  app.use('/api', routes);

  // error handling
  app.use(errorMiddleware);

  return app;
}
