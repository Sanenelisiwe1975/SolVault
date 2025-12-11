import { Router } from 'express';
import { TransactionController } from '../controllers/transaction.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validation.middleware';
import { body } from 'express-validator';

const router = Router();
const transactionController = new TransactionController();

router.post(
  '/deposit',
  authMiddleware,
  [
    body('amount').isFloat({ min: 0.000001 }),
    body('signature').isString().notEmpty(),
    validateRequest
  ],
  transactionController.deposit
);

router.post(
  '/withdraw',
  authMiddleware,
  [
    body('amount').isFloat({ min: 0.000001 }),
    validateRequest
  ],
  transactionController.withdraw
);

router.get(
  '/history',
  authMiddleware,
  transactionController.getHistory
);

export default router;