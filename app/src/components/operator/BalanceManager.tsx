'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { apiClient } from '@/lib/api/client';

interface BalanceManagerProps {
  userId: string;
  currentBalance: number;
  onUpdate: () => void;
}

export function BalanceManager({ userId, currentBalance, onUpdate }: BalanceManagerProps) {
  const [newBalance, setNewBalance] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!newBalance) return;

    setLoading(true);
    try {
      await apiClient.updateUserBalance(userId, parseFloat(newBalance));
      toast.success('Balance updated successfully');
      setNewBalance('');
      onUpdate();
    } catch (error) {
      toast.error('Failed to update balance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="number"
        step="0.001"
        value={newBalance}
        onChange={(e) => setNewBalance(e.target.value)}
        placeholder="New balance"
        className="flex-1 bg-white/5 border border-white/20 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-400"
      />
      <button
        onClick={handleUpdate}
        disabled={loading || !newBalance}
        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded text-sm font-medium transition-all disabled:opacity-50"
      >
        {loading ? 'Updating...' : 'Update'}
      </button>
    </div>
  );
}
