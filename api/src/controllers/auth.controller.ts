import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { logger } from '../utils/logger';

export class AuthController {
  private authService = new AuthService();

  verifyWallet = async (req: Request, res: Response) => {
    try {
      const { walletAddress, signature } = req.body;
      
      const result = await this.authService.verifyAndCreateUser(
        walletAddress,
        signature
      );
      
      res.json(result);
    } catch (error) {
      logger.error('Wallet verification error:', error);
      res.status(401).json({ error: 'Invalid signature' });
    }
  };

  refreshToken = async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.body;
      
      const result = await this.authService.refreshAccessToken(refreshToken);
      
      res.json(result);
    } catch (error) {
      logger.error('Token refresh error:', error);
      res.status(401).json({ error: 'Invalid refresh token' });
    }
  };
}