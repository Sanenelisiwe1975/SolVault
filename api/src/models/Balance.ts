import { prisma } from '../config/database';

export class Balance {
  static async getByUserId(userId: string) {
    return prisma.balance.findUnique({
      where: { userId }
    });
  }

  static async create(userId: string, initialAmount: number = 0) {
    return prisma.balance.create({
      data: {
        userId,
        amount: initialAmount
      }
    });
  }

  static async update(userId: string, newAmount: number) {
    return prisma.balance.update({
      where: { userId },
      data: { amount: newAmount }
    });
  }

  static async incrementBalance(userId: string, amount: number) {
    const current = await this.getByUserId(userId);
    if (!current) throw new Error('Balance not found');
    
    return prisma.balance.update({
      where: { userId },
      data: { amount: current.amount + amount }
    });
  }

  static async decrementBalance(userId: string, amount: number) {
    const current = await this.getByUserId(userId);
    if (!current) throw new Error('Balance not found');
    if (current.amount < amount) throw new Error('Insufficient balance');
    
    return prisma.balance.update({
      where: { userId },
      data: { amount: current.amount - amount }
    });
  }
}
