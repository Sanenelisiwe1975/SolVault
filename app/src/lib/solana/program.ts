import { Program, AnchorProvider, Idl } from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';
import { connection } from './connection';

const PROGRAM_ID = new PublicKey(
  process.env.NEXT_PUBLIC_PROGRAM_ID || '11111111111111111111111111111111'
);

export function getProgram(wallet: any): Program | null {
  try {
    const provider = new AnchorProvider(connection, wallet, {
      commitment: 'confirmed',
    });

    // Load IDL and create program instance
    // const idl = await Program.fetchIdl(PROGRAM_ID, provider);
    // return new Program(idl as Idl, PROGRAM_ID, provider);
    
    return null; // Return null until IDL is loaded
  } catch (error) {
    console.error('Failed to get program:', error);
    return null;
  }
}

export { PROGRAM_ID };
