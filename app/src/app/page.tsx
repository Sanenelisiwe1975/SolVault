import Link from 'next/link';
import { Wallet, Shield, Zap, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center py-20">
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-2xl">
              <Wallet className="w-16 h-16 text-white" />
            </div>
          </div>
          <h1 className="text-6xl font-bold text-white mb-6">
            Welcome to SolVault
          </h1>
          <p className="text-xl text-purple-200 mb-12 max-w-2xl mx-auto">
            The most secure and efficient Solana cashier system. Deposit, withdraw, 
            and manage your SOL with confidence.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/user"
              className="bg-white text-purple-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all flex items-center gap-2"
            >
              Launch App
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/operator"
              className="bg-white/10 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-all border border-white/20"
            >
              Operator Dashboard
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 py-20">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="bg-green-500/20 p-4 rounded-lg w-fit mb-4">
              <Zap className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Lightning Fast</h3>
            <p className="text-purple-200">
              Built on Solana for instant deposits and withdrawals with minimal fees.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="bg-blue-500/20 p-4 rounded-lg w-fit mb-4">
              <Shield className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Secure</h3>
            <p className="text-purple-200">
              Your funds are protected by Solana's proven blockchain security.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="bg-purple-500/20 p-4 rounded-lg w-fit mb-4">
              <Wallet className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Easy to Use</h3>
            <p className="text-purple-200">
              Simple interface for managing your balance with just a few clicks.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
