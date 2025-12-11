import jwt from 'jsonwebtoken';
import { prisma } from '../config/database';
import { env } from '../config/env';

export class OperatorService {
  async authenticate(operatorKey: string) {
    if (operatorKey !== env.OPERATOR_SECRET) {
      throw new Error('Invalid operator credentials');
    }

    const token = jwt.sign(
      { role: 'operator' },
      env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return { token };
  }

  async getAllUsers(search?: string, limit: number = 50, offset: number = 0) {
    const where = search
      ? { walletAddress: { contains: search, mode: 'insensitive' as any } }
      : {};

    const users = await prisma.user.findMany({
      where,
      include: {
        balances: true,
        transactions: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      },
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' }
    });

    return users.map(user => ({
      id: user.id,
      walletAddress: user.walletAddress,
      balance: user.balances[0]?.amount || 0,
      lastActivity: user.transactions[0]?.createdAt || user.createdAt,
      createdAt: user.createdAt
    }));
  }

  async updateUserBalance(userId: string, newAmount: number) {
    const balance = await prisma.balance.update({
      where: { userId },
      data: { amount: newAmount }
    });

    return balance;
  }

  async getAllTransactions(limit: number = 100, offset: number = 0) {
    return prisma.transaction.findMany({
      include: {
        user: {
          select: {
            walletAddress: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset
    });
  }
}