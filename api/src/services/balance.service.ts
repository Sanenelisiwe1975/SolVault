import { prisma } from '../config/database';

export class BalanceService {
  async getBalance(userId: string): Promise<number> {
    const balance = await prisma.balance.findUnique({
      where: { userId }
    });

    return balance?.amount || 0;
  }

  async getBalanceByAddress(walletAddress: string): Promise<number> {
    const user = await prisma.user.findUnique({
      where: { walletAddress },
      include: { balances: true }
    });

    if (!user || !user.balances[0]) {
      throw new Error('User not found');
    }

    return user.balances[0].amount;
  }

  async updateBalance(userId: string, newAmount: number): Promise<number> {
    const balance = await prisma.balance.update({
      where: { userId },
      data: { amount: newAmount }
    });

    return balance.amount;
  }
}
