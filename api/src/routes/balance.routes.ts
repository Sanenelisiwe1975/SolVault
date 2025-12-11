import { Router } from 'express';
import { BalanceController } from '../controllers/balance.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { rateLimitMiddleware } from '../middleware/rateLimit.middleware';

const router = Router();
const balanceController = new BalanceController();

router.get(
  '/',
  authMiddleware,
  rateLimitMiddleware,
  balanceController.getBalance
);

router.get(
  '/:walletAddress',
  authMiddleware,
  balanceController.getBalanceByAddress
);

export default router;