'use client';

import { useState } from 'react';
import { ArrowDownCircle } from 'lucide-react';
import { useDeposit } from '@/hooks/useDeposit';
import { Loading } from '../shared/Loading';

interface DepositFormProps {
  onSuccess: () => void;
}

export function DepositForm({ onSuccess }: DepositFormProps) {
  const [amount, setAmount] = useState('');
  const { deposit, loading } = useDeposit();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await deposit(parseFloat(amount));
    if (success) {
      setAmount('');
      onSuccess();
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-green-500/20 p-3 rounded-lg">
          <ArrowDownCircle className="w-6 h-6 text-green-400" />
        </div>
        <h3 className="text-xl font-bold text-white">Deposit</h3>
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
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <Loading message="Processing..." />
          ) : (
            'Deposit SOL'
          )}
        </button>
      </form>
    </div>
  );
}
