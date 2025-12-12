import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Solvault } from "../target/types/solvault";
import { PublicKey, SystemProgram, Keypair } from "@solana/web3.js";
import fs from 'fs';
import path from 'path';

async function deployProgram() {
  console.log("🚀 Starting SolVault Program Deployment...\n");

  // Setup provider
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Solvault as Program<Solvault>;

  console.log("📋 Program ID:", program.programId.toString());
  console.log("👤 Deployer:", provider.wallet.publicKey.toString());
  console.log("🌐 Cluster:", provider.connection.rpcEndpoint);
  console.log();

  // Derive PDAs
  const [vaultStatePda] = PublicKey.findProgramAddressSync(
    [Buffer.from("vault")],
    program.programId
  );

  const [vaultAuthorityPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("vault_authority")],
    program.programId
  );

  console.log("📍 Vault State PDA:", vaultStatePda.toString());
  console.log("📍 Vault Authority PDA:", vaultAuthorityPda.toString());
  console.log();

  try {
    // Check if vault is already initialized
    try {
      const existingVault = await program.account.vaultState.fetch(vaultStatePda);
      console.log("✅ Vault already initialized!");
      console.log("   Authority:", existingVault.authority.toString());
      console.log("   Total Users:", existingVault.totalUsers.toString());
      console.log("   Total Balance:", existingVault.totalBalance.toString());
      return;
    } catch (e) {
      // Vault doesn't exist, proceed with initialization
      console.log("📝 Initializing new vault...");
    }

    // Initialize vault
    const tx = await program.methods
      .initialize()
      .accounts({
        vaultState: vaultStatePda,
        authority: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    console.log("✅ Vault initialized successfully!");
    console.log("   Transaction:", tx);
    console.log();

    // Fetch and display vault state
    const vaultState = await program.account.vaultState.fetch(vaultStatePda);

    console.log("📊 Vault State:");
    console.log("   Authority:", vaultState.authority.toString());
    console.log("   Operator:", vaultState.operator.toString());
    console.log("   Total Users:", vaultState.totalUsers.toString());
    console.log("   Total Deposits:", vaultState.totalDeposits.toString());
    console.log("   Total Withdrawals:", vaultState.totalWithdrawals.toString());
    console.log("   Total Balance:", vaultState.totalBalance.toString());
    console.log("   Is Paused:", vaultState.isPaused);
    console.log();

    // Save deployment info
    const deploymentInfo = {
      programId: program.programId.toString(),
      vaultState: vaultStatePda.toString(),
      vaultAuthority: vaultAuthorityPda.toString(),
      authority: provider.wallet.publicKey.toString(),
      cluster: provider.connection.rpcEndpoint,
      timestamp: new Date().toISOString(),
    };

    const deploymentPath = path.join(__dirname, '../deployments');
    if (!fs.existsSync(deploymentPath)) {
      fs.mkdirSync(deploymentPath, { recursive: true });
    }

    fs.writeFileSync(
      path.join(deploymentPath, 'latest.json'),
      JSON.stringify(deploymentInfo, null, 2)
    );

    console.log("💾 Deployment info saved to deployments/latest.json");
    console.log();
    console.log("🎉 Deployment completed successfully!");
    
  } catch (error) {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  }
}

deployProgram()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
