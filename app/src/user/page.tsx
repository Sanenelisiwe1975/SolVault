'use client';

import { useState } from 'react';
import { WalletConnect } from '@/components/user/WalletConnect';
import { BalanceCard } from '@/components/user/BalanceCard';
import { DepositForm } from '@/components/user/DepositForm';
import { WithdrawForm } from '@/components/user/WithdrawForm';
import { TransactionHistory } from '@/components/user/TransactionHistory';
import { Header } from '@/components/shared/Header';
import { useWallet } from '@solana/wallet-adapter-react';
import { useBalance } from '@/hooks/useBalance';

export default function UserPage() {
  const { connected } = useWallet();
  const { balance, refresh } = useBalance();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {!connected ? (
          <WalletConnect />
        ) : (
          <div className="space-y-6">
            <BalanceCard balance={balance} onRefresh={refresh} />
            
            <div className="grid md:grid-cols-2 gap-6">
              <DepositForm onSuccess={refresh} />
              <WithdrawForm onSuccess={refresh} />
            </div>

            <TransactionHistory />
          </div>
        )}
      </div>
    </div>
  );
}