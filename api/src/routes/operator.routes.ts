import { Router } from 'express';
import { OperatorController } from '../controllers/operator.controller';
import { operatorAuthMiddleware } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validation.middleware';
import { body } from 'express-validator';

const router = Router();
const operatorController = new OperatorController();

router.post(
  '/login',
  [
    body('operatorKey').isString().notEmpty(),
    validateRequest
  ],
  operatorController.login
);

router.get(
  '/users',
  operatorAuthMiddleware,
  operatorController.getAllUsers
);

router.put(
  '/balance/:userId',
  operatorAuthMiddleware,
  [
    body('amount').isFloat({ min: 0 }),
    validateRequest
  ],
  operatorController.updateBalance
);

router.get(
  '/transactions',
  operatorAuthMiddleware,
  operatorController.getAllTransactions
);

export default router;