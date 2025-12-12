import axios from 'axios';
import { getToken } from '../stores/authStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const client = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiClient = {
  // Auth
  verifyWallet: async (walletAddress: string, signature: string) => {
    const { data } = await client.post('/auth/verify', { walletAddress, signature });
    return data;
  },

  // Balance
  getBalance: async () => {
    const { data } = await client.get('/balance');
    return data;
  },

  // Transactions
  deposit: async (amount: number, signature: string) => {
    const { data } = await client.post('/transactions/deposit', { amount, signature });
    return data;
  },

  withdraw: async (amount: number) => {
    const { data } = await client.post('/transactions/withdraw', { amount });
    return data;
  },

  getTransactionHistory: async () => {
    const { data } = await client.get('/transactions/history');
    return data;
  },

  // Operator
  operatorLogin: async (operatorKey: string) => {
    const { data } = await client.post('/operator/login', { operatorKey });
    return data;
  },

  getAllUsers: async () => {
    const { data } = await client.get('/operator/users');
    return data;
  },

  updateUserBalance: async (userId: string, amount: number) => {
    const { data } = await client.put(`/operator/balance/${userId}`, { amount });
    return data;
  },
};
