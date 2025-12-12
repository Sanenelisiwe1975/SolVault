import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function setupDatabase() {
  console.log("🗄️  Setting up database...\n");

  try {
    // Create default operator
    const operatorHash = await bcrypt.hash('demo-operator-key', 10);
    
    const operator = await prisma.operator.upsert({
      where: { username: 'admin' },
      update: {},
      create: {
        username: 'admin',
        passwordHash: operatorHash,
        isActive: true,
      },
    });

    console.log("✅ Created operator:", operator.username);

    // Create demo users
    const demoUsers = [
      { walletAddress: '7xKXtg2CvAnpLwEwNAzdAN82XGsqQEqLVKSYqBNZ9YvZ', balance: 125.50 },
      { walletAddress: '9pQwErt2CvAnpLwEwNAzdAN82XGsqQEqLVKSYqBNZ3RtM', balance: 89.25 },
      { walletAddress: '4mNbVfg2CvAnpLwEwNAzdAN82XGsqQEqLVKSYqBNZ8KpL', balance: 320.00 },
    ];

    for (const userData of demoUsers) {
      const user = await prisma.user.upsert({
        where: { walletAddress: userData.walletAddress },
        update: {},
        create: {
          walletAddress: userData.walletAddress,
          balances: {
            create: {
              amount: userData.balance,
            },
          },
        },
      });

      console.log(`✅ Created user: ${user.walletAddress.substring(0, 8)}...`);
    }

    console.log("\n🎉 Database setup completed!");
    
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

setupDatabase();