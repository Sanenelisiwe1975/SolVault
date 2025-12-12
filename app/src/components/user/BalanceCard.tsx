'use client';

import { DollarSign, RefreshCw } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';

interface BalanceCardProps {
  balance: number;
  onRefresh: () => void;
}

export function BalanceCard({ balance, onRefresh }: BalanceCardProps) {
  const { publicKey } = useWallet();

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-purple-100 text-sm mb-1">Your Balance</p>
          <h2 className="text-5xl font-bold">{balance.toFixed(4)} SOL</h2>
        </div>
        <div className="flex flex-col items-end gap-2">
          <DollarSign className="w-16 h-16 text-white/30" />
          <button
            onClick={onRefresh}
            className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="bg-white/20 rounded-lg p-3 mt-4">
        <p className="text-xs text-purple-100 mb-1">Wallet Address</p>
        <p className="font-mono text-sm break-all">{publicKey?.toBase58()}</p>
      </div>
    </div>
  );
}
