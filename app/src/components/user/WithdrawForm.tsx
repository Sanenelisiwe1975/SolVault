'use client';

import { useState } from 'react';
import { ArrowUpCircle } from 'lucide-react';
import { useWithdraw } from '@/hooks/useWithdraw';
import { Loading } from '../shared/Loading';

interface WithdrawFormProps {
  onSuccess: () => void;
}

export function WithdrawForm({ onSuccess }: WithdrawFormProps) {
  const [amount, setAmount] = useState('');
  const { withdraw, loading } = useWithdraw();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await withdraw(parseFloat(amount));
    if (success) {
      setAmount('');
      onSuccess();
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-orange-500/20 p-3 rounded-lg">
          <ArrowUpCircle className="w-6 h-6 text-orange-400" />
        </div>
        <h3 className="text-xl font-bold text-white">Withdraw</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          step="0.001"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount in SOL"
          className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-purple-300 mb-4 focus:outline-none focus:border-purple-400"
          disabled={loading}
          required
        />
        <button
          type="submit"
          disabled={loading || !amount}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <Loading message="Processing..." />
          ) : (
            'Withdraw SOL'
          )}
        </button>
      </form>
    </div>
  );
}