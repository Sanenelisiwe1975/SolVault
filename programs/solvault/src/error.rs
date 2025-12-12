use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("Insufficient balance for withdrawal")]
    InsufficientBalance,
    
    #[msg("Amount is below minimum deposit")]
    BelowMinimumDeposit,
    
    #[msg("Amount is below minimum withdrawal")]
    BelowMinimumWithdrawal,
    
    #[msg("Amount exceeds maximum transaction limit")]
    ExceedsMaximumTransaction,
    
    #[msg("Unauthorized: caller is not the authority")]
    Unauthorized,
    
    #[msg("Unauthorized: caller is not the operator")]
    UnauthorizedOperator,
    
    #[msg("Vault is paused")]
    VaultPaused,
    
    #[msg("Mathematical overflow occurred")]
    Overflow,
    
    #[msg("Mathematical underflow occurred")]
    Underflow,
    
    #[msg("Invalid amount")]
    InvalidAmount,
    
    #[msg("User account already exists")]
    UserAccountExists,
    
    #[msg("User account not found")]
    UserAccountNotFound,
    
    #[msg("Invalid vault state")]
    InvalidVaultState,
}