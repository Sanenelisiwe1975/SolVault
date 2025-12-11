import jwt from 'jsonwebtoken';
import { prisma } from '../config/database';
import { env } from '../config/env';

export class AuthService {
  async verifyAndCreateUser(walletAddress: string, signature: string) {
    // In production, verify the signature here
    // For MVP, we'll skip signature verification
    
    let user = await prisma.user.findUnique({
      where: { walletAddress }
    });

    if (!user) {
      user = await prisma.user.create({
        data: { walletAddress },
      });

      await prisma.balance.create({
        data: {
          userId: user.id,
          amount: 0
        }
      });
    }

    const token = this.generateToken(user.id, walletAddress);
    
    return {
      user: {
        id: user.id,
        walletAddress: user.walletAddress,
      },
      token
    };
  }

  generateToken(userId: string, walletAddress: string): string {
    return jwt.sign(
      { userId, walletAddress },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN }
    );
  }

  verifyToken(token: string): any {
    return jwt.verify(token, env.JWT_SECRET);
  }

  async refreshAccessToken(refreshToken: string) {
    const decoded = this.verifyToken(refreshToken);
    const newToken = this.generateToken(decoded.userId, decoded.walletAddress);
    
    return { token: newToken };
  }
}