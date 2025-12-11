import dotenv from 'dotenv';
dotenv.config();

import { createServer } from './server';
import { logger } from './utils/logger';
import { prisma } from './config/database';

const PORT = process.env.PORT || 3001;

async function bootstrap() {
  try {
    // test database connection
    await prisma.$connect();
    logger.info('Database connected successfully');

    // create and start server
    const app = createServer();
    
    app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
      logger.info(`📝 Environment: ${process.env.NODE_ENV}`);
      logger.info(`🔗 API URL: ${process.env.API_URL}`);
    });

    // graceful shutdown
    process.on('SIGTERM', async () => {
      logger.info('SIGTERM received, shutting down gracefully');
      await prisma.$disconnect();
      process.exit(0);
    });

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

bootstrap();
