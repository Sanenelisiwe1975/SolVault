import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiClient } from '../api/client';

interface OperatorState {
  isAuthenticated: boolean;
  token: string | null;
  login: (operatorKey: string) => Promise<boolean>;
  logout: () => void;
}

export const useOperatorStore = create<OperatorState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      login: async (operatorKey: string) => {
        try {
          const data = await apiClient.operatorLogin(operatorKey);
          set({ isAuthenticated: true, token: data.token });
          return true;
        } catch (error) {
          return false;
        }
      },
      logout: () => set({ isAuthenticated: false, token: null }),
    }),
    {
      name: 'operator-storage',
    }
  )
);
