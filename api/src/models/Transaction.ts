import { prisma } from '../config/database';
import { TransactionType, TransactionStatus } from '@prisma/client';

export class Transaction {
  static async create(data: {
    userId: string;
    type: TransactionType;
    amount: number;
    balanceBefore: number;
    balanceAfter: number;
    signature?: string;
    status?: TransactionStatus;
  }) {
    return prisma.transaction.create({
      data: {
        ...data,
        status: data.status || TransactionStatus.PENDING
      }
    });
  }

  static async findById(id: string) {
    return prisma.transaction.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            walletAddress: true
          }
        }
      }
    });
  }

  static async findByUserId(
    userId: string,
    limit: number = 50,
    offset: number = 0
  ) {
    return prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset
    });
  }

  static async updateStatus(id: string, status: TransactionStatus) {
    return prisma.transaction.update({
      where: { id },
      data: { status }
    });
  }

  static async list(limit: number = 100, offset: number = 0) {
    return prisma.transaction.findMany({
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            walletAddress: true
          }
        }
      }
    });
  }

  static async getStats(userId?: string) {
    const where = userId ? { userId } : {};

    const [totalDeposits, totalWithdrawals, count] = await Promise.all([
      prisma.transaction.aggregate({
        where: { ...where, type: TransactionType.DEPOSIT },
        _sum: { amount: true }
      }),
      prisma.transaction.aggregate({
        where: { ...where, type: TransactionType.WITHDRAWAL },
        _sum: { amount: true }
      }),
      prisma.transaction.count({ where })
    ]);

    return {
      totalDeposits: totalDeposits._sum.amount || 0,
      totalWithdrawals: totalWithdrawals._sum.amount || 0,
      transactionCount: count
    };
  }
}
