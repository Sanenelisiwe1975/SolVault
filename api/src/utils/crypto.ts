import crypto from 'crypto';

export class CryptoUtils {
  static generateRandomString(length: number = 32): string {
    return crypto.randomBytes(length).toString('hex');
  }

  static hashData(data: string): string {
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  static verifySignature(
    message: string,
    signature: string,
    publicKey: string
  ): boolean {
    // In production, implement proper Solana signature verification
    // For MVP, return true
    return true;
  }
}