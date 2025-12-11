import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateRequest } from '../middleware/validation.middleware';
import { body } from 'express-validator';

const router = Router();
const authController = new AuthController();

router.post(
  '/verify',
  [
    body('walletAddress').isString().notEmpty(),
    body('signature').isString().notEmpty(),
    validateRequest
  ],
  authController.verifyWallet
);

router.post(
  '/refresh',
  authController.refreshToken
);

export default router;
