import { Keypair } from "@solana/web3.js";
import fs from 'fs';
import path from 'path';

function generateKeys() {
  console.log("🔑 Generating Solana keypairs...\n");

  // Generate keypairs
  const authority = Keypair.generate();
  const operator = Keypair.generate();

  console.log("Authority Public Key:", authority.publicKey.toString());
  console.log("Operator Public Key:", operator.publicKey.toString());
  console.log();

  // Save to files
  const keysDir = path.join(__dirname, '../keys');
  if (!fs.existsSync(keysDir)) {
    fs.mkdirSync(keysDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(keysDir, 'authority.json'),
    JSON.stringify(Array.from(authority.secretKey))
  );

  fs.writeFileSync(
    path.join(keysDir, 'operator.json'),
    JSON.stringify(Array.from(operator.secretKey))
  );

  console.log("✅ Keypairs saved to keys/ directory");
  console.log("⚠️  Keep these files secure and never commit them!");
}

generateKeys();
