'use client';

import { useEffect } from 'react';
import { Activity, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import { useTransactionHistory } from '@/hooks/useTransactionHistory';
import { Loading } from '../shared/Loading';
import { formatDate } from '@/utils/formatters';

export function TransactionHistory() {
  const { transactions, loading, fetchTransactions } = useTransactionHistory();

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (loading) {
    return <Loading message="Loading transactions..." />;
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
      <div className="flex items-center gap-3 mb-6">
        <Activity className="w-6 h-6 text-purple-400" />
        <h3 className="text-xl font-bold text-white">Transaction History</h3>
      </div>
      
      {transactions.length === 0 ? (
        <p className="text-purple-200 text-center py-8">No transactions yet</p>
      ) : (
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="bg-white/5 rounded-lg p-4 flex items-center justify-between hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    tx.type === 'DEPOSIT'
                      ? 'bg-green-500/20'
                      : 'bg-orange-500/20'
                  }`}
                >
                  {tx.type === 'DEPOSIT' ? (
                    <ArrowDownCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <ArrowUpCircle className="w-5 h-5 text-orange-400" />
                  )}
                </div>
                <div>
                  <p className="text-white font-medium capitalize">
                    {tx.type.toLowerCase()}
                  </p>
                  <p className="text-purple-300 text-sm">
                    {formatDate(tx.createdAt)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`font-bold ${
                    tx.type === 'DEPOSIT' ? 'text-green-400' : 'text-orange-400'
                  }`}
                >
                  {tx.type === 'DEPOSIT' ? '+' : '-'}
                  {tx.amount.toFixed(4)} SOL
                </p>
                <p className="text-purple-300 text-sm capitalize">{tx.status.toLowerCase()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
