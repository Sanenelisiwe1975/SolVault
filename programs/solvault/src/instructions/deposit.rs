use anchor_lang::prelude::*;
use anchor_lang::system_program::{transfer, Transfer};
use crate::constants::*;
use crate::error::ErrorCode;
use crate::state::*;

#[derive(Accounts)]
pub struct Deposit<'info> {
    #[account(
        mut,
        seeds = [USER_SEED, user.key().as_ref()],
        bump = user_account.bump
    )]
    pub user_account: Account<'info, UserAccount>,
    
    #[account(mut)]
    pub user: Signer<'info>,
    
    #[account(
        mut,
        seeds = [VAULT_SEED],
        bump = vault_state.bump
    )]
    pub vault_state: Account<'info, VaultState>,
    
    /// CHECK: Vault's SOL holding account
    #[account(
        mut,
        seeds = [VAULT_AUTHORITY_SEED],
        bump
    )]
    pub vault_authority: UncheckedAccount<'info>,
    
    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<Deposit>, amount: u64) -> Result<()> {
    let vault_state = &mut ctx.accounts.vault_state;
    let user_account = &mut ctx.accounts.user_account;
    
    // Check if vault is paused
    require!(!vault_state.is_paused, ErrorCode::VaultPaused);
    
    // Validate amount
    require!(amount >= MIN_DEPOSIT, ErrorCode::BelowMinimumDeposit);
    require!(amount <= MAX_TRANSACTION, ErrorCode::ExceedsMaximumTransaction);
    require!(amount > 0, ErrorCode::InvalidAmount);
    
    // Transfer SOL from user to vault
    let cpi_context = CpiContext::new(
        ctx.accounts.system_program.to_account_info(),
        Transfer {
            from: ctx.accounts.user.to_account_info(),
            to: ctx.accounts.vault_authority.to_account_info(),
        },
    );
    transfer(cpi_context, amount)?;
    
    // Update user account
    user_account.deposit(amount)?;
    
    // Update vault state
    vault_state.total_deposits = vault_state.total_deposits
        .checked_add(1)
        .ok_or(ErrorCode::Overflow)?;
    vault_state.total_balance = vault_state.total_balance
        .checked_add(amount)
        .ok_or(ErrorCode::Overflow)?;
    
    msg!("Deposit successful");
    msg!("User: {}", user_account.owner);
    msg!("Amount: {} lamports", amount);
    msg!("New balance: {} lamports", user_account.balance);
    
    Ok(())
}
