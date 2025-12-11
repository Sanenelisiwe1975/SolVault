import { Request, Response } from 'express';
import { OperatorService } from '../services/operator.service';
import { AuthRequest } from '../types';

export class OperatorController {
  private operatorService = new OperatorService();

  login = async (req: Request, res: Response) => {
    try {
      const { operatorKey } = req.body;
      
      const result = await this.operatorService.authenticate(operatorKey);
      
      res.json(result);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  };

  getAllUsers = async (req: AuthRequest, res: Response) => {
    try {
      const { search, limit = 50, offset = 0 } = req.query;
      
      const users = await this.operatorService.getAllUsers(
        search as string,
        Number(limit),
        Number(offset)
      );
      
      res.json({ users });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  };

  updateBalance = async (req: AuthRequest, res: Response) => {
    try {
      const { userId } = req.params;
      const { amount } = req.body;
      
      const balance = await this.operatorService.updateUserBalance(userId, amount);
      
      res.json({ balance });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  getAllTransactions = async (req: AuthRequest, res: Response) => {
    try {
      const { limit = 100, offset = 0 } = req.query;
      
      const transactions = await this.operatorService.getAllTransactions(
        Number(limit),
        Number(offset)
      );
      
      res.json({ transactions });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch transactions' });
    }
  };
}
