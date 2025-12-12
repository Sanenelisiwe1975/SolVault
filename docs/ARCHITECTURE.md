# SolVault Architecture

## System Overview

SolVault is a full-stack Solana application consisting of three main components:

1. **Solana Program (Anchor)** - On-chain smart contract
2. **Backend API (Express)** - REST API and database
3. **Frontend (Next.js)** - User interface

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend (Next.js)                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  User Pages  │  │   Operator   │  │    Wallet    │      │
│  │              │  │   Dashboard  │  │   Adapter    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└────────────┬────────────────┬────────────────┬──────────────┘
             │                │                │
             │ HTTP/REST      │ HTTP/REST      │ RPC
             │                │                │
┌────────────▼────────────────▼────────────────┼──────────────┐
│                      Backend API              │              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────▼─────┐        │
│  │  Auth Routes │  │   Balance    │  │  Solana    │        │
│  │              │  │   Routes     │  │  Service   │        │
│  └──────────────┘  └──────────────┘  └────────────┘        │
│                                                              │
│  ┌──────────────────────────────────────────────┐          │
│  │           PostgreSQL Database                 │          │
│  │  Users | Balances | Transactions | Operators  │          │
│  └──────────────────────────────────────────────┘          │
└──────────────────────────────────────────────────────────────┘
                              │
                              │ RPC
                              │
┌─────────────────────────────▼───────────────────────────────┐
│                      Solana Blockchain                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │            SolVault Program (Anchor)                  │  │
│  │                                                        │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐     │  │
│  │  │  Vault     │  │   User     │  │ Vault      │     │  │
│  │  │  State     │  │  Accounts  │  │ Authority  │     │  │
│  │  │   (PDA)    │  │   (PDAs)   │  │   (PDA)    │     │  │
│  │  └────────────┘  └────────────┘  └────────────┘     │  │
│  └──────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

## Component Details

### 1. Solana Program (On-Chain)

**Technology**: Rust, Anchor Framework

**Responsibilities**:
- Manage SOL deposits and withdrawals
- Store user balances in PDAs
- Enforce security rules
- Track statistics

**Key Accounts**:
- `VaultState` - Global vault configuration
- `UserAccount` - Individual user balances
- `VaultAuthority` - Holds deposited SOL

**Instructions**:
1. `initialize` - Setup vault
2. `initialize_user` - Create user account
3. `deposit` - Deposit SOL
4. `withdraw` - Withdraw SOL
5. `update_balance` - Operator updates
6. `close_user_account` - Close account

### 2. Backend API (Off-Chain)

**Technology**: Node.js, Express, Prisma, PostgreSQL

**Responsibilities**:
- User authentication (JWT)
- Transaction history
- Operator dashboard
- API rate limiting
- Data persistence

**Database Schema**:
```sql
User
├── id
├── walletAddress
├── createdAt
└── updatedAt

Balance
├── id
├── userId
├── amount
└── lastUpdated

Transaction
├── id
├── userId
├── type (DEPOSIT/WITHDRAWAL)
├── amount
├── signature
└── status

Operator
├── id
├── username
├── passwordHash
└── isActive
```

### 3. Frontend (Client)

**Technology**: Next.js 14, React, Tailwind CSS

**Pages**:
- `/` - Landing page
- `/user` - User interface
- `/operator` - Operator dashboard

**State Management**:
- Zustand for global state
- React hooks for local state
- Wallet adapter for Solana

## Data Flow

### Deposit Flow

```
1. User connects wallet (Frontend)
2. User enters deposit amount
3. Frontend creates Solana transaction
4. User signs transaction
5. Transaction sent to Solana network
6. Program validates and processes
7. SOL transferred to vault
8. User balance updated on-chain
9. Backend records transaction
10. Frontend updates UI
```

### Withdrawal Flow

```
1. User requests withdrawal (Frontend)
2. Backend validates balance
3. Frontend creates withdrawal transaction
4. User signs transaction
5. Transaction sent to Solana network
6. Program validates sufficient balance
7. SOL transferred from vault to user
8. User balance updated on-chain
9. Backend records transaction
10. Frontend updates UI
```

## Security Model

### On-Chain Security

- **PDA Accounts**: Deterministic addresses prevent unauthorized access
- **Authority Checks**: Only authorized operators can update balances
- **Balance Validation**: Prevents overdrafts
- **Overflow Protection**: Safe math operations
- **Emergency Pause**: Admin can pause operations

### Off-Chain Security

- **JWT Authentication**: Secure API access
- **Rate Limiting**: Prevent abuse
- **Input Validation**: Sanitize all inputs
- **HTTPS**: Encrypted communication
- **Environment Variables**: Secure secrets

## Scalability Considerations

### On-Chain

- PDAs scale linearly with users
- No global state bottlenecks
- Parallel transaction processing
- Efficient account structure

### Off-Chain

- Database indexing on walletAddress
- API caching for frequently accessed data
- Horizontal scaling of API servers
- Connection pooling

## Deployment Architecture

### Development
```
Local Machine
├── Solana Test Validator
├── PostgreSQL (Docker)
├── API (localhost:3001)
└── Frontend (localhost:3000)
```

### Production
```
Cloud Infrastructure
├── Solana Mainnet
├── PostgreSQL (Managed Service)
├── API (Container/Serverless)
└── Frontend (Vercel/CDN)
```

## Monitoring & Logging

### On-Chain
- Transaction logs
- Program events
- Account state changes

### Off-Chain
- API request logs
- Error tracking
- Performance metrics
- Database queries

## Future Enhancements

1. **Multi-token support**: Support SPL tokens
2. **Staking**: Earn yield on deposits
3. **Governance**: DAO for protocol decisions
4. **Mobile app**: Native mobile experience
5. **Analytics**: Advanced reporting dashboard

---

For implementation details, see individual component documentation.