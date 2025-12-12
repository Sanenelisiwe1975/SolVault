'use client';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Wallet } from 'lucide-react';

export function WalletConnect() {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-white/20 text-center max-w-2xl mx-auto">
      <div className="bg-purple-500/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
        <Wallet className="w-12 h-12 text-purple-300" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-4">Connect Your Wallet</h2>
      <p className="text-purple-200 mb-8 text-lg">
        Connect your Solana wallet to start managing your balance
      </p>
      <WalletMultiButton />
    </div>
  );
}
