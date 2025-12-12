import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Solvault } from "../target/types/solvault";
import { PublicKey, SystemProgram } from "@solana/web3.js";

async function initializeVault() {
  console.log("🔧 Initializing SolVault...\n");

  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Solvault as Program<Solvault>;

  const [vaultStatePda] = PublicKey.findProgramAddressSync(
    [Buffer.from("vault")],
    program.programId
  );

  try {
    const tx = await program.methods
      .initialize()
      .accounts({
        vaultState: vaultStatePda,
        authority: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    console.log("✅ Vault initialized!");
    console.log("Transaction:", tx);

    const vaultState = await program.account.vaultState.fetch(vaultStatePda);
    console.log("\nVault State:", vaultState);
    
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

initializeVault();