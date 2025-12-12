import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { apiClient } from '@/lib/api/client';
import toast from 'react-hot-toast';

export function useWithdraw() {
  const [loading, setLoading] = useState(false);
  const { publicKey } = useWallet();

  const withdraw = async (amount: number): Promise<boolean> => {
    if (!publicKey) {
      toast.error('Wallet not connected');
      return false;
    }

    setLoading(true);
    try {
      await apiClient.withdraw(amount);
      toast.success(`Successfully withdrew ${amount} SOL`);
      return true;
    } catch (error: any) {
      toast.error(error.message || 'Withdrawal failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { withdraw, loading };
}
