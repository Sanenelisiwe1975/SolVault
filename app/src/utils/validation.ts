export function isValidSolanaAddress(address: string): boolean {
  return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
}

export function isValidAmount(amount: number): boolean {
  return amount > 0 && Number.isFinite(amount);
}

export function validateDepositAmount(amount: number): string | null {
  if (!isValidAmount(amount)) {
    return 'Invalid amount';
  }
  if (amount < 0.001) {
    return 'Minimum deposit is 0.001 SOL';
  }
  if (amount > 1000) {
    return 'Maximum deposit is 1000 SOL';
  }
  return null;
}

export function validateWithdrawAmount(amount: number, balance: number): string | null {
  if (!isValidAmount(amount)) {
    return 'Invalid amount';
  }
  if (amount < 0.001) {
    return 'Minimum withdrawal is 0.001 SOL';
  }
  if (amount > balance) {
    return 'Insufficient balance';
  }
  return null;
}