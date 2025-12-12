'use client';

import Link from 'next/link';
import { Wallet } from 'lucide-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

interface HeaderProps {
  showOperator?: boolean;
}

export function Header({ showOperator = false }: HeaderProps) {
  return (
    <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">SolVault</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/user"
              className="text-white hover:text-purple-200 transition-colors"
            >
              User
            </Link>
            <Link
              href="/operator"
              className="text-white hover:text-purple-200 transition-colors"
            >
              Operator
            </Link>
            {!showOperator && <WalletMultiButton />}
          </div>
        </div>
      </div>
    </header>
  );
}
