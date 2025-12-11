import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { Program, AnchorProvider, Wallet } from '@coral-xyz/anchor';

export const SOLANA_NETWORK = process.env.SOLANA_NETWORK || 'devnet';
export const RPC_URL = process.env.SOLANA_RPC_URL || clusterApiUrl(SOLANA_NETWORK as any);
export const PROGRAM_ID = new PublicKey(process.env.PROGRAM_ID || '11111111111111111111111111111111');

export const connection = new Connection(RPC_URL, 'confirmed');

export function getProgram(wallet?: Wallet) {
  // This will be implemented once we have the IDL
  // For now, return null
  return null;
}