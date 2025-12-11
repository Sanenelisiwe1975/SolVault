import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Create demo operator
  const operatorHash = await bcrypt.hash('demo-operator-key', 10);
  
  const operator = await prisma.operator.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      passwordHash: operatorHash,
      isActive: true
    }
  });

  console.log('Created operator:', operator);

  // Create demo users
  const users = await Promise.all([
    prisma.user.upsert({
      where: { walletAddress: '7xKXtg2CvAnpLwEwNAzdAN82XGsqQEqLVKSYqBNZ9YvZ' },
      update: {},
      create: {
        walletAddress: '7xKXtg2CvAnpLwEwNAzdAN82XGsqQEqLVKSYqBNZ9YvZ',
        balances: {
          create: {
            amount: 125.50
          }
        }
      }
    }),
    prisma.user.upsert({
      where: { walletAddress: '9pQwErt2CvAnpLwEwNAzdAN82XGsqQEqLVKSYqBNZ3RtM' },
      update: {},
      create: {
        walletAddress: '9pQwErt2CvAnpLwEwNAzdAN82XGsqQEqLVKSYqBNZ3RtM',
        balances: {
          create: {
            amount: 89.25
          }
        }
      }
    }),
    prisma.user.upsert({
      where: { walletAddress: '4mNbVfg2CvAnpLwEwNAzdAN82XGsqQEqLVKSYqBNZ8KpL' },
      update: {},
      create: {
        walletAddress: '4mNbVfg2CvAnpLwEwNAzdAN82XGsqQEqLVKSYqBNZ8KpL',
        balances: {
          create: {
            amount: 320.00
          }
        }
      }
    })
  ]);

  console.log('Created users:', users.length);

  // Create demo transactions
  for (const user of users) {
    await prisma.transaction.create({
      data: {
        userId: user.id,
        type: 'DEPOSIT',
        amount: 50,
        balanceBefore: 0,
        balanceAfter: 50,
        signature: `demo_signature_${Date.now()}`,
        status: 'CONFIRMED'
      }
    });
  }

  console.log('Database seed completed!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
