# Deployment Guide

## Prerequisites

- Solana CLI installed
- Anchor CLI installed
- Node.js 18+
- PostgreSQL database
- Domain name (for production)
- SSL certificate (for production)

## Development Deployment

### 1. Local Solana Validator

```bash
# Start local validator
solana-test-validator

# In another terminal, set to localhost
solana config set --url localhost

# Airdrop SOL for testing
solana airdrop 10
```

### 2. Deploy Program

```bash
# Build program
anchor build

# Deploy to local validator
anchor deploy

# Initialize vault
npm run initialize-vault
```

### 3. Setup Database

```bash
cd api

# Create database
createdb solvault

# Run migrations
npm run migrate

# Seed data
npm run seed
```

### 4. Start Services

```bash
# Terminal 1: API
cd api
npm run dev

# Terminal 2: Frontend
cd app
npm run dev
```

## Devnet Deployment

### 1. Setup Devnet

```bash
# Set cluster to devnet
solana config set --url devnet

# Create/use devnet wallet
solana-keygen new -o ~/.config/solana/devnet.json

# Airdrop devnet SOL
solana airdrop 2 --url devnet
```

### 2. Deploy Program to Devnet

```bash
# Build
anchor build

# Deploy
anchor deploy --provider.cluster devnet

# Save program ID
echo "PROGRAM_ID=$(solana address -k target/deploy/solvault-keypair.json)" >> .env

# Initialize vault
anchor run deploy
```

### 3. Deploy Backend

```bash
cd api

# Setup environment
cp .env.example .env
# Edit .env with production values

# Deploy to your hosting service
# Example: Heroku
heroku create solvault-api
git push heroku main

# Run migrations
heroku run npm run migrate
```

### 4. Deploy Frontend

```bash
cd app

# Setup environment
cp .env.local.example .env.local
# Edit with production API URL and program ID

# Deploy to Vercel
vercel deploy --prod
```

## Mainnet Deployment

### 1. Prepare Mainnet Wallet

```bash
# Create mainnet wallet (SECURE THIS!)
solana-keygen new -o ~/.config/solana/mainnet.json

# Set to mainnet
solana config set --url mainnet-beta

# Fund wallet (buy SOL from exchange)
```

### 2. Audit & Security

- [ ] Complete security audit of smart contract
- [ ] Review all error handling
- [ ] Test all edge cases
- [ ] Verify PDA derivations
- [ ] Check authority controls
- [ ] Test pause mechanism

### 3. Deploy Program to Mainnet

```bash
# Final build
anchor build --verifiable

# Deploy
anchor deploy --provider.cluster mainnet-beta

# Save program ID securely
PROGRAM_ID=$(solana address -k target/deploy/solvault-keypair.json)

# Verify on Solana Explorer
```

### 4. Initialize Mainnet Vault

```bash
# Initialize with mainnet wallet
anchor run deploy --provider.cluster mainnet-beta

# Verify vault state
solana account 
```

### 5. Production Backend

```bash
# Setup managed PostgreSQL
# - AWS RDS, DigitalOcean, or Heroku Postgres

# Deploy API
# - AWS ECS, DigitalOcean App Platform, or Heroku

# Configure environment variables
DATABASE_URL=postgresql://...
JWT_SECRET=
OPERATOR_SECRET=
SOLANA_NETWORK=mainnet-beta
PROGRAM_ID=

# Run migrations
npm run migrate
```

### 6. Production Frontend

```bash
# Deploy to Vercel/Netlify
vercel deploy --prod

# Configure environment variables
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
NEXT_PUBLIC_PROGRAM_ID=
```

## Post-Deployment

### 1. Monitoring Setup

```bash
# Setup monitoring for:
- Program transactions
- API response times
- Error rates
- Database performance
```

### 2. Verify Everything Works

```bash
# Test deposit flow
# Test withdrawal flow
# Test operator functions
# Verify transaction history
# Check balance accuracy
```

### 3. Documentation

- Update README with mainnet program ID
- Document operator procedures
- Create runbook for common issues
- Setup on-call rotation

## Rollback Procedure

### If Issues Arise

1. **Pause the vault**
```typescript
// Emergency pause instruction
await program.methods
  .pause()
  .accounts({
    vaultState,
    authority
  })
  .rpc();
```

2. **Communicate with users**
- Post status update
- Twitter/Discord announcement
- Email notification

3. **Fix and redeploy**
- Fix the issue
- Test thoroughly
- Deploy fix
- Unpause

## Maintenance

### Regular Tasks

```bash
# Weekly
- Review error logs
- Check database size
- Monitor gas costs
- Review user growth

# Monthly
- Security updates
- Dependency updates
- Performance optimization
- Backup verification
```

### Upgrades

```bash
# For program upgrades
anchor build
anchor upgrade  target/deploy/solvault.so

# For API upgrades
# Deploy new version with zero downtime
# Use blue-green deployment

# For frontend upgrades
# Deploy to Vercel (automatic)
```

## Security Checklist

- [ ] Program code audited
- [ ] API endpoints rate-limited
- [ ] Database backups automated
- [ ] SSL certificates configured
- [ ] Environment variables secured
- [ ] Operator keys in hardware wallet
- [ ] Monitoring and alerts setup
- [ ] Incident response plan documented
- [ ] Insurance considered

## Cost Estimation

### Solana Costs
- Program deployment: ~5-10 SOL
- Rent for vault state: ~0.002 SOL
- Transaction fees: ~0.000005 SOL per transaction

### Infrastructure Costs (Monthly)
- Database: $15-50
- API hosting: $20-100
- Frontend hosting: $0-20 (Vercel)
- Monitoring: $0-50
- Total: $35-220/month

## Support

For deployment issues:
- GitHub Issues
- Discord: discord.gg/solvault
- Email: devops@solvault.com