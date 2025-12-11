import { Request, Response } from 'express';
import { TransactionService } from '../services/transaction.service';
import { AuthRequest } from '../types';

export class TransactionController {
  private transactionService = new TransactionService();

  deposit = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user!.id;
      const { amount, signature } = req.body;
      
      const transaction = await this.transactionService.processDeposit(
        userId,
        amount,
        signature
      );
      
      res.json({ transaction });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  withdraw = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user!.id;
      const { amount } = req.body;
      
      const transaction = await this.transactionService.processWithdrawal(
        userId,
        amount
      );
      
      res.json({ transaction });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  getHistory = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user!.id;
      const { limit = 50, offset = 0 } = req.query;
      
      const transactions = await this.transactionService.getTransactionHistory(
        userId,
        Number(limit),
        Number(offset)
      );
      
      res.json({ transactions });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch transaction history' });
    }
  };
}