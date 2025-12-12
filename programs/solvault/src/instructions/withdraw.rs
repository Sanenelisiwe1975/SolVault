use anchor_lang::prelude::*;
use crate::constants::*;
use crate::error::ErrorCode;
use crate::state::*;

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(
        mut,
        seeds = [USER_SEED, user.key().as_ref()],
        bump = user_account.bump,
        has_one = owner
    )]
    pub user_account: Account<'info, UserAccount>,
    
    /// CHECK: Owner validation in constraint
    pub owner: UncheckedAccount<'info>,
    
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

pub fn handler(ctx: Context<Withdraw>, amount: u64) -> Result<()> {
    let vault_state = &mut ctx.accounts.vault_state;
    let user_account = &mut ctx.accounts.user_account;
    
    // Check if vault is paused
    require!(!vault_state.is_paused, ErrorCode::VaultPaused);
    
    // Validate amount
    require!(amount >= MIN_WITHDRAWAL, ErrorCode::BelowMinimumWithdrawal);
    require!(amount <= MAX_TRANSACTION, ErrorCode::ExceedsMaximumTransaction);
    require!(amount > 0, ErrorCode::InvalidAmount);
    require!(user_account.balance >= amount, ErrorCode::InsufficientBalance);
    
    // Update user account first
    user_account.withdraw(amount)?;
    
    // Transfer SOL from vault to user
    let vault_seeds = &[
        VAULT_AUTHORITY_SEED,
        &[ctx.bumps.vault_authority],
    ];
    let signer_seeds = &[&vault_seeds[..]];
    
    let cpi_context = CpiContext::new_with_signer(
        ctx.accounts.system_program.to_account_info(),
        anchor_lang::system_program::Transfer {
            from: ctx.accounts.vault_authority.to_account_info(),
            to: ctx.accounts.user.to_account_info(),
        },
        signer_seeds,
    );
    anchor_lang::system_program::transfer(cpi_context, amount)?;
    
    // Update vault state
    vault_state.total_withdrawals = vault_state.total_withdrawals
        .checked_add(1)
        .ok_or(ErrorCode::Overflow)?;
    vault_state.total_balance = vault_state.total_balance
        .checked_sub(amount)
        .ok_or(ErrorCode::Underflow)?;
    
    msg!("Withdrawal successful");
    msg!("User: {}", user_account.owner);
    msg!("Amount: {} lamports", amount);
    msg!("New balance: {} lamports", user_account.balance);
    
    Ok(())
}
