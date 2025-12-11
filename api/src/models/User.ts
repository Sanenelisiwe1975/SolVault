import { prisma } from '../config/database';

export class User {
  static async findByWalletAddress(walletAddress: string) {
    return prisma.user.findUnique({
      where: { walletAddress },
      include: {
        balances: true,
        transactions: {
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    });
  }

  static async create(walletAddress: string) {
    return prisma.user.create({
      data: { walletAddress }
    });
  }

  static async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        balances: true
      }
    });
  }

  static async list(limit: number = 50, offset: number = 0) {
    return prisma.user.findMany({
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' },
      include: {
        balances: true
      }
    });
  }
}
