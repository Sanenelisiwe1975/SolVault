use anchor_lang::prelude::*;
use crate::constants::*;
use crate::error::ErrorCode;
use crate::state::*;

#[derive(Accounts)]
pub struct CloseUserAccount<'info> {
    #[account(
        mut,
        seeds = [USER_SEED, owner.key().as_ref()],
        bump = user_account.bump,
        has_one = owner,
        close = owner
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
}

pub fn handler(ctx: Context<CloseUserAccount>) -> Result<()> {
    let user_account = &ctx.accounts.user_account;
    let vault_state = &mut ctx.accounts.vault_state;
    
    // Ensure user has withdrawn all funds
    require!(
        user_account.balance == 0,
        ErrorCode::InsufficientBalance
    );
    
    vault_state.total_users = vault_state.total_users
        .checked_sub(1)
        .ok_or(ErrorCode::Underflow)?;
    
    msg!("User account closed: {}", user_account.owner);
    
    Ok(())
}
