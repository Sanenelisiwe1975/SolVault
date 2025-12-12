import { Connection, clusterApiUrl } from '@solana/web3.js';

const NETWORK = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet';
const RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || clusterApiUrl(NETWORK as any);

export const connection = new Connection(RPC_URL, 'confirmed');

export function getConnection() {
  return connection;
}
