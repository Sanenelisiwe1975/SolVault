use anchor_lang::prelude::*;

pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use instructions::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod solvault {
    use super::*;

    /// Initialize the vault program
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        instructions::initialize::handler(ctx)
    }

    /// Initialize a user account
    pub fn initialize_user(ctx: Context<InitializeUser>) -> Result<()> {
        instructions::initialize::initialize_user_handler(ctx)
    }

    /// Deposit SOL into the vault
    pub fn deposit(ctx: Context<Deposit>, amount: u64) -> Result<()> {
        instructions::deposit::handler(ctx, amount)
    }

    /// Withdraw SOL from the vault
    pub fn withdraw(ctx: Context<Withdraw>, amount: u64) -> Result<()> {
        instructions::withdraw::handler(ctx, amount)
    }

    /// Update user balance (operator only)
    pub fn update_balance(
        ctx: Context<UpdateBalance>,
        new_balance: u64,
    ) -> Result<()> {
        instructions::update_balance::handler(ctx, new_balance)
    }

    /// Close user account
    pub fn close_user_account(ctx: Context<CloseUserAccount>) -> Result<()> {
        instructions::close_account::handler(ctx)
    }
}
