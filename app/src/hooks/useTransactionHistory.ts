import { useState } from 'react';
import { apiClient } from '@/lib/api/client';
import { Transaction } from '@/types';

export function useTransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const data = await apiClient.getTransactionHistory();
      setTransactions(data.transactions);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    transactions,
    loading,
    fetchTransactions,
  };
}
