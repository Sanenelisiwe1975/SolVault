import { connection } from '../config/solana';
import { PublicKey } from '@solana/web3.js';

export class SolanaService {
  async verifyTransaction(signature: string): Promise<boolean> {
    try {
      const tx = await connection.getTransaction(signature);
      return tx !== null;
    } catch (error) {
      return false;
    }
  }

  async processWithdrawal(userId: string, amount: number): Promise<string | null> {
    // This would interact with our Solana program
    // For MVP, return mock signature
    return `mock_withdrawal_signature_${Date.now()}`;
  }

  async getAccountBalance(publicKey: string): Promise<number> {
    try {
      const balance = await connection.getBalance(new PublicKey(publicKey));
      return balance / 1e9; // Convert lamports to SOL
    } catch (error) {
      return 0;
    }
  }
}