import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    walletAddress: string;
  };
}

export interface JWTPayload {
  userId: string;
  walletAddress: string;
  role?: string;
  iat?: number;
  exp?: number;
}

export interface TransactionData {
  id: string;
  userId: string;
  type: 'DEPOSIT' | 'WITHDRAWAL';
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  signature: string | null;
  status: 'PENDING' | 'CONFIRMED' | 'FAILED';
  createdAt: Date;
  updatedAt: Date;
}

export interface UserData {
  id: string;
  walletAddress: string;
  balance: number;
  lastActivity: Date;
  createdAt: Date;
}

export interface BalanceData {
  id: string;
  userId: string;
  amount: number;
  lastUpdated: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
