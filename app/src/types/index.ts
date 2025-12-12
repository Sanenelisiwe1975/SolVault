export interface Transaction {
  id: string;
  type: 'DEPOSIT' | 'WITHDRAWAL';
  amount: number;
  status: 'PENDING' | 'CONFIRMED' | 'FAILED';
  createdAt: string;
  signature?: string;
}

export interface UserData {
  id: string;
  walletAddress: string;
  balance: number;
  lastActivity: string;
  createdAt: string;
}

export interface BalanceData {
  balance: number;
}
