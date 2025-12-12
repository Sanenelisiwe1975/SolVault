'use client';

import { useState } from 'react';
import { Shield } from 'lucide-react';
import { useOperatorStore } from '@/lib/stores/operatorStore';
import toast from 'react-hot-toast';

export function AuthForm() {
  const [operatorKey, setOperatorKey] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useOperatorStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login(operatorKey);
      if (success) {
        toast.success('Authentication successful');
      } else {
        toast.error('Invalid operator key');
      }
    } catch (error) {
      toast.error('Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-white/20 text-center max-w-2xl mx-auto">
      <div className="bg-purple-500/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
        <Shield className="w-12 h-12 text-purple-300" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-4">
        Operator Authentication
      </h2>
      <p className="text-purple-200 mb-8">
        Enter your operator key to access the dashboard
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          value={operatorKey}
          onChange={(e) => setOperatorKey(e.target.value)}
          placeholder="Enter operator key"
          className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50"
        >
          {loading ? 'Authenticating...' : 'Authenticate'}
        </button>
        <p className="text-purple-300 text-sm">Demo key: demo-operator-key</p>
      </form>
    </div>
  );
}
