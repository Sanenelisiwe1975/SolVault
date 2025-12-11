import { JWTPayload } from './index';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        walletAddress: string;
        role?: string;
      };
    }
  }
}