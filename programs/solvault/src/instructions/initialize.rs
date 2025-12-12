use anchor_lang::prelude::*;
use crate::constants::*;
use crate::state::*;

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = authority,
        space = VaultState::LEN,
        seeds = [VAULT_SEED],
        bump
    )]
    pub vault_state: Account<'info, VaultState>,
    
    #[account(mut)]
    pub authority: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<Initialize>) -> Result<()> {
    let vault_state = &mut ctx.accounts.vault_state;
    
    vault_state.authority = ctx.accounts.authority.key();
    vault_state.operator = ctx.accounts.authority.key(); // Initially set to authority
    vault_state.bump = ctx.bumps.vault_state;
    vault_state.total_users = 0;
    vault_state.total_deposits = 0;
    vault_state.total_withdrawals = 0;
    vault_state.total_balance = 0;
    vault_state.is_paused = false;
    
    msg!("Vault initialized successfully");
    msg!("Authority: {}", vault_state.authority);
    
    Ok(())
}

#[derive(Accounts)]
pub struct InitializeUser<'info> {
    #[account(
        init,
        payer = owner,
        space = UserAccount::LEN,
        seeds = [USER_SEED, owner.key().as_ref()],
        bump
    )]
    pub user_account: Account<'info, UserAccount>,
    
    #[account(mut)]
    pub owner: Signer<'info>,
    
    #[account(
        mut,
        seeds = [VAULT_SEED],
        bump = vault_state.bump
    )]
    pub vault_state: Account<'info, VaultState>,
    
    pub system_program: Program<'info, System>,
}

pub fn initialize_user_handler(ctx: Context<InitializeUser>) -> Result<()> {
    let user_account = &mut ctx.accounts.user_account;
    let vault_state = &mut ctx.accounts.vault_state;
    let clock = Clock::get()?;
    
    user_account.owner = ctx.accounts.owner.key();
    user_account.balance = 0;
    user_account.total_deposited = 0;
    user_account.total_withdrawn = 0;
    user_account.deposit_count = 0;
    user_account.withdrawal_count = 0;
    user_account.created_at = clock.unix_timestamp;
    user_account.last_activity = clock.unix_timestamp;
    user_account.bump = ctx.bumps.user_account;
    
    vault_state.total_users = vault_state.total_users
        .checked_add(1)
        .ok_or(crate::error::ErrorCode::Overflow)?;
    
    msg!("User account initialized for: {}", user_account.owner);
    
    Ok(())
}