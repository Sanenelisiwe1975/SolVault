import { Router } from 'express';
import authRoutes from './auth.routes';
import balanceRoutes from './balance.routes';
import transactionRoutes from './transaction.routes';
import operatorRoutes from './operator.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/balance', balanceRoutes);
router.use('/transactions', transactionRoutes);
router.use('/operator', operatorRoutes);

export default router;