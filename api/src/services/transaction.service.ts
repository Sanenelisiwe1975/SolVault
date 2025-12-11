import { prisma } from '../config/database';
import { TransactionType, TransactionStatus } from '@prisma/client';
import { BalanceService } from './balance.service';
import { SolanaService } from './solana.service';

export class TransactionService {
  private balanceService = new BalanceService();
  private solanaService = new SolanaService();

  async processDeposit(userId: string, amount: number, signature: string) {
    // Verify transaction on Solana
    const isValid = await this.solanaService.verifyTransaction(signature);
    
    if (!isValid) {
      throw new Error('Invalid transaction signature');
    }

    const currentBalance = await this.balanceService.getBalance(userId);
    const newBalance = currentBalance + amount;

    const transaction = await prisma.$transaction(async (tx) => {
      await tx.balance.update({
        where: { userId },
        data: { amount: newBalance }
      });

      return tx.transaction.create({
        data: {
          userId,
          type: TransactionType.DEPOSIT,
          amount,
          balanceBefore: currentBalance,
          balanceAfter: newBalance,
          signature,
          status: TransactionStatus.CONFIRMED
        }
      });
    });

    return transaction;
  }

  async processWithdrawal(userId: string, amount: number) {
    const currentBalance = await this.balanceService.getBalance(userId);
    
    if (currentBalance < amount) {
      throw new Error('Insufficient balance');
    }

    const newBalance = currentBalance - amount;

    const transaction = await prisma.$transaction(async (tx) => {
      await tx.balance.update({
        where: { userId },
        data: { amount: newBalance }
      });

      return tx.transaction.create({
        data: {
          userId,
          type: TransactionType.WITHDRAWAL,
          amount,
          balanceBefore: currentBalance,
          balanceAfter: newBalance,
          status: TransactionStatus.CONFIRMED
        }
      });
    });

    // process withdrawal on Solana
    const signature = await this.solanaService.processWithdrawal(userId, amount);
    
    if (signature) {
      await prisma.transaction.update({
        where: { id: transaction.id },
        data: { signature }
      });
    }

    return transaction;
  }

  async getTransactionHistory(userId: string, limit: number, offset: number) {
    return prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset
    });
  }
}
