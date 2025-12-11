import { PublicKey } from '@solana/web3.js';

export class ValidationUtils {
  static isValidSolanaAddress(address: string): boolean {
    try {
      new PublicKey(address);
      return true;
    } catch {
      return false;
    }
  }

  static isValidAmount(amount: number): boolean {
    return amount > 0 && Number.isFinite(amount) && amount <= 1000000;
  }

  static sanitizeWalletAddress(address: string): string {
    return address.trim().toLowerCase();
  }

  static isValidSignature(signature: string): boolean {
    return /^[1-9A-HJ-NP-Za-km-z]{87,88}$/.test(signature);
  }
}
