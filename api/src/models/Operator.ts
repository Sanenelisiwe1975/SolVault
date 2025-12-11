import { prisma } from '../config/database';
import bcrypt from 'bcrypt';

export class Operator {
  static async create(username: string, password: string) {
    const passwordHash = await bcrypt.hash(password, 10);
    
    return prisma.operator.create({
      data: {
        username,
        passwordHash
      }
    });
  }

  static async findByUsername(username: string) {
    return prisma.operator.findUnique({
      where: { username }
    });
  }

  static async verifyPassword(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  static async updateStatus(id: string, isActive: boolean) {
    return prisma.operator.update({
      where: { id },
      data: { isActive }
    });
  }
}
