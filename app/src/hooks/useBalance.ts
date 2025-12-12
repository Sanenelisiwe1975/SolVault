import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { apiClient } from '@/lib/api/client';
import toast from 'react-hot-toast';

export function useBalance() {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const { connected } = useWallet();

  const fetchBalance = async () => {
    if (!connected) return;

    setLoading(true);
    try {
      const data = await apiClient.getBalance();
      setBalance(data.balance);
    } catch (error) {
      toast.error('Failed to fetch balance');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (connected) {
      fetchBalance();
    }
  }, [connected]);

  return {
    balance,
    loading,
    refresh: fetchBalance,
  };
}
