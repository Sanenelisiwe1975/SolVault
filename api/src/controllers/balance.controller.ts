import { Request, Response } from 'express';
import { BalanceService } from '../services/balance.service';
import { AuthRequest } from '../types';

export class BalanceController {
  private balanceService = new BalanceService();

  getBalance = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user!.id;
      
      const balance = await this.balanceService.getBalance(userId);
      
      res.json({ balance });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch balance' });
    }
  };

  getBalanceByAddress = async (req: AuthRequest, res: Response) => {
    try {
      const { walletAddress } = req.params;
      
      const balance = await this.balanceService.getBalanceByAddress(walletAddress);
      
      res.json({ balance });
    } catch (error) {
      res.status(404).json({ error: 'User not found' });
    }
  };
}
