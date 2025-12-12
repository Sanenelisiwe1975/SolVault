# Solana Program Documentation

## Overview

The SolVault program is an Anchor-based Solana program that manages user deposits, withdrawals, and balances.

## Program ID

```
Devnet: Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS
Mainnet: TBD
```

## Accounts

### VaultState

Global vault configuration and statistics.

**PDA Seeds:** `["vault"]`

**Structure:**
```rust
pub struct VaultState {
    pub authority: Pubkey,      // Admin authority
    pub operator: Pubkey,       // Operator for balance updates
    pub bump: u8,              // PDA bump
    pub total_users: u64,      // Total number of users
    pub total_deposits: u64,   // Total deposits count
    pub total_withdrawals: u64,// Total withdrawals count
    pub total_balance: u64,    // Total SOL in vault
    pub is_paused: bool,       // Emergency pause flag
}
```

### UserAccount

Individual user balance and activity.

**PDA Seeds:** `["user", user_pubkey]`

**Structure:**
```rust
pub struct UserAccount {
    pub owner: Pubkey,           // User's wallet
    pub balance: u64,            // Current balance (lamports)
    pub total_deposited: u64,    // Lifetime deposits
    pub total_withdrawn: u64,    // Lifetime withdrawals
    pub deposit_count: u64,      // Number of deposits
    pub withdrawal_count: u64,   // Number of withdrawals
    pub created_at: i64,         // Creation timestamp
    pub last_activity: i64,      // Last activity timestamp
    pub bump: u8,               // PDA bump
}
```

### VaultAuthority

PDA that holds deposited SOL.

**PDA Seeds:** `["vault_authority"]`

## Instructions

### 1. initialize

Initialize the global vault state.

**Accounts:**
- `vault_state` - Vault state PDA (writable, init)
- `authority` - Admin authority (writable, signer)
- `system_program` - System program

**Example:**
```typescript
await program.methods
  .initialize()
  .accounts({
    vaultState: vaultStatePda,
    authority: authority.publicKey,
    systemProgram: SystemProgram.programId,
  })
  .rpc();
```

### 2. initialize_user

Create a user account.

**Accounts:**
- `user_account` - User account PDA (writable, init)
- `owner` - User's wallet (writable, signer)
- `vault_state` - Vault state (writable)
- `system_program` - System program

**Example:**
```typescript
await program.methods
  .initializeUser()
  .accounts({
    userAccount: userAccountPda,
    owner: user.publicKey,
    vaultState: vaultStatePda,
    systemProgram: SystemProgram.programId,
  })
  .rpc();
```

### 3. deposit

Deposit SOL into the vault.

**Parameters:**
- `amount: u64` - Amount in lamports

**Accounts:**
- `user_account` - User account (writable)
- `user` - User wallet (writable, signer)
- `vault_state` - Vault state (writable)
- `vault_authority` - Vault authority PDA (writable)
- `system_program` - System program

**Constraints:**
- Amount >= 1,000,000 lamports (0.001 SOL)
- Amount <= 1,000,000,000,000 lamports (1000 SOL)
- Vault not paused

**Example:**
```typescript
const amount = new BN(1 * LAMPORTS_PER_SOL);

await program.methods
  .deposit(amount)
  .accounts({
    userAccount: userAccountPda,
    user: user.publicKey,
    vaultState: vaultStatePda,
    vaultAuthority: vaultAuthorityPda,
    systemProgram: SystemProgram.programId,
  })
  .rpc();
```

### 4. withdraw

Withdraw SOL from the vault.

**Parameters:**
- `amount: u64` - Amount in lamports

**Accounts:**
- `user_account` - User account (writable)
- `owner` - Account owner (validation)
- `user` - User wallet (writable, signer)
- `vault_state` - Vault state (writable)
- `vault_authority` - Vault authority PDA (writable)
- `system_program` - System program

**Constraints:**
- Amount >= 1,000,000 lamports (0.001 SOL)
- Amount <= user's balance
- Vault not paused

**Example:**
```typescript
const amount = new BN(0.5 * LAMPORTS_PER_SOL);

await program.methods
  .withdraw(amount)
  .accounts({
    userAccount: userAccountPda,
    owner: user.publicKey,
    user: user.publicKey,
    vaultState: vaultStatePda,
    vaultAuthority: vaultAuthorityPda,
    systemProgram: SystemProgram.programId,
  })
  .rpc();
```

### 5. update_balance

Update user balance (operator only).

**Parameters:**
- `new_balance: u64` - New balance in lamports

**Accounts:**
- `user_account` - User account (writable)
- `vault_state` - Vault state (readonly)
- `operator` - Operator wallet (signer)

**Constraints:**
- Caller must be the authorized operator

**Example:**
```typescript
const newBalance = new BN(10 * LAMPORTS_PER_SOL);

await program.methods
  .updateBalance(newBalance)
  .accounts({
    userAccount: userAccountPda,
    vaultState: vaultStatePda,
    operator: operator.publicKey,
  })
  .rpc();
```

### 6. close_user_account

Close user account and reclaim rent.

**Accounts:**
- `user_account` - User account (writable, close)
- `owner` - Account owner (writable, signer)
- `vault_state` - Vault state (writable)

**Constraints:**
- User balance must be 0

**Example:**
```typescript
await program.methods
  .closeUserAccount()
  .accounts({
    userAccount: userAccountPda,
    owner: user.publicKey,
    vaultState: vaultStatePda,
  })
  .rpc();
```

## Error Codes

| Code | Name | Description |
|------|------|-------------|
| 6000 | InsufficientBalance | Not enough balance for withdrawal |
| 6001 | BelowMinimumDeposit | Deposit below 0.001 SOL |
| 6002 | BelowMinimumWithdrawal | Withdrawal below 0.001 SOL |
| 6003 | ExceedsMaximumTransaction | Amount exceeds 1000 SOL |
| 6004 | Unauthorized | Caller not authorized |
| 6005 | UnauthorizedOperator | Caller not the operator |
| 6006 | VaultPaused | Vault operations paused |
| 6007 | Overflow | Math overflow occurred |
| 6008 | Underflow | Math underflow occurred |
| 6009 | InvalidAmount | Invalid amount provided |

## Constants

```rust
MIN_DEPOSIT: 1_000_000       // 0.001 SOL
MIN_WITHDRAWAL: 1_000_000    // 0.001 SOL
MAX_TRANSACTION: 1_000_000_000_000  // 1000 SOL
```

## Events

The program emits logs for all operations:

```
msg!("Vault initialized successfully");
msg!("User account initialized for: {}", user);
msg!("Deposit successful");
msg!("Withdrawal successful");
msg!("Balance updated by operator");
msg!("User account closed: {}", user);
```

## Security Considerations

1. **PDA Validation**: All accounts use PDAs with proper seed derivation
2. **Authority Checks**: Only authorized operators can update balances
3. **Balance Validation**: Prevents overdrafts and invalid amounts
4. **Overflow Protection**: All math uses checked operations
5. **Pause Mechanism**: Emergency pause for critical situations

## Testing

```bash
# Run all tests
anchor test

# Run specific test
anchor test -- --grep "deposits"

# Test with logs
anchor test --skip-local-validator
```

## Deployment

```bash
# Build
anchor build

# Deploy to devnet
anchor deploy --provider.cluster devnet

# Deploy to mainnet
anchor deploy --provider.cluster mainnet

# Verify deployment
solana program show 
```

## Integration Example

```typescript
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Solvault } from "./target/types/solvault";

// Setup
const provider = anchor.AnchorProvider.env();
const program = anchor.workspace.Solvault as Program;

// Derive PDAs
const [vaultState] = PublicKey.findProgramAddressSync(
  [Buffer.from("vault")],
  program.programId
);

const [userAccount] = PublicKey.findProgramAddressSync(
  [Buffer.from("user"), userPublicKey.toBuffer()],
  program.programId
);

// Deposit
const tx = await program.methods
  .deposit(new BN(1 * LAMPORTS_PER_SOL))
  .accounts({
    userAccount,
    user: userPublicKey,
    vaultState,
    vaultAuthority,
  })
  .rpc();
```
