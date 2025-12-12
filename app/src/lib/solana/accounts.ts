import { PublicKey } from '@solana/web3.js';
import { PROGRAM_ID } from './program';

export function getProgramPDAs(userPublicKey: PublicKey) {
  const [vaultState] = PublicKey.findProgramAddressSync(
    [Buffer.from('vault')],
    PROGRAM_ID
  );

  const [vaultAuthority] = PublicKey.findProgramAddressSync(
    [Buffer.from('vault_authority')],
    PROGRAM_ID
  );

  const [userAccount] = PublicKey.findProgramAddressSync(
    [Buffer.from('user'), userPublicKey.toBuffer()],
    PROGRAM_ID
  );

  return {
    vaultState,
    vaultAuthority,
    userAccount,
  };
}