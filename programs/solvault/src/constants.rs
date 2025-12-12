use anchor_lang::prelude::*;

#[constant]
pub const VAULT_SEED: &[u8] = b"vault";

#[constant]
pub const USER_SEED: &[u8] = b"user";

#[constant]
pub const VAULT_AUTHORITY_SEED: &[u8] = b"vault_authority";

/// Minimum deposit amount (0.001 SOL)
pub const MIN_DEPOSIT: u64 = 1_000_000;

/// Minimum withdrawal amount (0.001 SOL)
pub const MIN_WITHDRAWAL: u64 = 1_000_000;

/// Maximum single transaction amount (1000 SOL)
pub const MAX_TRANSACTION: u64 = 1_000_000_000_000;
