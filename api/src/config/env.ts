import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('3001'),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default('7d'),
  OPERATOR_SECRET: z.string(),
  SOLANA_NETWORK: z.string().default('devnet'),
  SOLANA_RPC_URL: z.string(),
  PROGRAM_ID: z.string(),
});

export const env = envSchema.parse(process.env);