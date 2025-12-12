import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react';
import { useEffect } from 'react';
import { useAuthStore } from '@/lib/stores/authStore';

export function useWallet() {
  const wallet = useSolanaWallet();
  const { setToken } = useAuthStore();

  useEffect(() => {
    if (wallet.connected && wallet.publicKey) {
      // Auto-authenticate when wallet connects
      authenticateWallet();
    }
  }, [wallet.connected, wallet.publicKey]);

  const authenticateWallet = async () => {
    if (!wallet.publicKey) return;

    try {
      // In production, sign a message and send to backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walletAddress: wallet.publicKey.toBase58(),
          signature: 'mock-signature', // Replace with actual signature
        }),
      });

      const data = await response.json();
      if (data.token) {
        setToken(data.token);
      }
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  };

  return wallet;
}