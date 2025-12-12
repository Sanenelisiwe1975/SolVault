'use client';

import { useState } from 'react';
import { AuthForm } from '@/components/operator/AuthForm';
import { UserList } from '@/components/operator/UserList';
import { BalanceManager } from '@/components/operator/BalanceManager';
import { Header } from '@/components/shared/Header';
import { useOperatorStore } from '@/lib/stores/operatorStore';

export default function OperatorPage() {
  const { isAuthenticated } = useOperatorStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <Header showOperator />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {!isAuthenticated ? (
          <AuthForm />
        ) : (
          <div className="space-y-6">
            <UserList />
          </div>
        )}
      </div>
    </div>
  );
}