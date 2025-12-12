'use client';

import { useEffect, useState } from 'react';
import { Search, Settings } from 'lucide-react';
import { useOperator } from '@/hooks/useOperator';
import { Loading } from '../shared/Loading';
import { BalanceManager } from './BalanceManager';

export function UserList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const { users, loading, fetchUsers } = useOperator();

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.walletAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Loading message="Loading users..." />;
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-6 h-6 text-purple-400" />
        <h3 className="text-xl font-bold text-white">User Management</h3>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by wallet address"
            className="w-full bg-white/5 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400"
          />
        </div>
      </div>

      <div className="space-y-3">
        {filteredUsers.map((user) => (
          <div key={user.id} className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-white font-mono text-sm">
                  {user.walletAddress}
                </p>
                <p className="text-purple-300 text-sm">
                  Last activity: {new Date(user.lastActivity).toLocaleString()}
                </p>
              </div>
              <p className="text-2xl font-bold text-white">
                {user.balance.toFixed(4)} SOL
              </p>
            </div>
            <BalanceManager userId={user.id} currentBalance={user.balance} onUpdate={fetchUsers} />
          </div>
        ))}
      </div>
    </div>
  );
}
