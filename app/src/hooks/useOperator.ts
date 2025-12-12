import { useState } from 'react';
import { apiClient } from '@/lib/api/client';
import { UserData } from '@/types';

export function useOperator() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await apiClient.getAllUsers();
      setUsers(data.users);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    loading,
    fetchUsers,
  };
}