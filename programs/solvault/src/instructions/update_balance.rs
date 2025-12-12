use anchor_lang::prelude::*;
use crate::constants::*;
use crate::error::ErrorCode;
use crate::state::*;

#[derive(Accounts)]
pub struct UpdateBalance<'info> {
    #[account(
        mut,
        seeds = [USER_SEED, user_account.owner.as_ref()],
        bump = user_account.bump
    )]
    pub user_account: Account<'info, UserAccount>,
    
    #[account(
        seeds = [VAULT_SEED],
        bump = vault_state.bump,
        has_one = operator
    )]
    pub vault_state: Account<'info, VaultState>,
    
    pub operator: Signer<'info>,
}

pub fn handler(ctx: Context<UpdateBalance>, new_balance: u64) -> Result<()> {
    let user_account = &mut ctx.accounts.user_account;
    let vault_state = &ctx.accounts.vault_state;
    
    // Verify operator authorization
    require!(
        ctx.accounts.operator.key() == vault_state.operator,
        ErrorCode::UnauthorizedOperator
    );
    
    let old_balance = user_account.balance;
    user_account.set_balance(new_balance)?;
    
    msg!("Balance updated by operator");
    msg!("User: {}", user_account.owner);
    msg!("Old balance: {} lamports", old_balance);
    msg!("New balance: {} lamports", new_balance);
    
    Ok(())
}