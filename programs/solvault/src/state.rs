use anchor_lang::prelude::*;

/// Global vault state
#[account]
pub struct VaultState {
    /// Authority that can perform admin operations
    pub authority: Pubkey,
    /// Bump seed for PDA
    pub bump: u8,
    /// Total number of users
    pub total_users: u64,
    /// Total deposits processed
    pub total_deposits: u64,
    /// Total withdrawals processed
    pub total_withdrawals: u64,
    /// Total SOL in vault
    pub total_balance: u64,
    /// Emergency pause flag
    pub is_paused: bool,
    /// Operator public key
    pub operator: Pubkey,
}

impl VaultState {
    pub const LEN: usize = 8 + // discriminator
        32 + // authority
        1 +  // bump
        8 +  // total_users
        8 +  // total_deposits
        8 +  // total_withdrawals
        8 +  // total_balance
        1 +  // is_paused
        32;  // operator
}

/// User account state
#[account]
pub struct UserAccount {
    /// User's wallet address
    pub owner: Pubkey,
    /// Current balance in lamports
    pub balance: u64,
    /// Total deposited (all time)
    pub total_deposited: u64,
    /// Total withdrawn (all time)
    pub total_withdrawn: u64,
    /// Number of deposits
    pub deposit_count: u64,
    /// Number of withdrawals
    pub withdrawal_count: u64,
    /// Account creation timestamp
    pub created_at: i64,
    /// Last activity timestamp
    pub last_activity: i64,
    /// Bump seed for PDA
    pub bump: u8,
}

impl UserAccount {
    pub const LEN: usize = 8 + // discriminator
        32 + // owner
        8 +  // balance
        8 +  // total_deposited
        8 +  // total_withdrawn
        8 +  // deposit_count
        8 +  // withdrawal_count
        8 +  // created_at
        8 +  // last_activity
        1;   // bump

    pub fn deposit(&mut self, amount: u64) -> Result<()> {
        self.balance = self.balance.checked_add(amount)
            .ok_or(error::ErrorCode::Overflow)?;
        self.total_deposited = self.total_deposited.checked_add(amount)
            .ok_or(error::ErrorCode::Overflow)?;
        self.deposit_count = self.deposit_count.checked_add(1)
            .ok_or(error::ErrorCode::Overflow)?;
        self.last_activity = Clock::get()?.unix_timestamp;
        Ok(())
    }

    pub fn withdraw(&mut self, amount: u64) -> Result<()> {
        require!(
            self.balance >= amount,
            error::ErrorCode::InsufficientBalance
        );
        
        self.balance = self.balance.checked_sub(amount)
            .ok_or(error::ErrorCode::Underflow)?;
        self.total_withdrawn = self.total_withdrawn.checked_add(amount)
            .ok_or(error::ErrorCode::Overflow)?;
        self.withdrawal_count = self.withdrawal_count.checked_add(1)
            .ok_or(error::ErrorCode::Overflow)?;
        self.last_activity = Clock::get()?.unix_timestamp;
        Ok(())
    }

    pub fn set_balance(&mut self, new_balance: u64) -> Result<()> {
        self.balance = new_balance;
        self.last_activity = Clock::get()?.unix_timestamp;
        Ok(())
    }
}
