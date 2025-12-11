# SolVault API

REST API backend for the SolVault Solana cashier system.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Setup database:
```bash
npm run generate
npm run migrate
npm run seed
```

4. Start development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/verify` - Verify wallet and get JWT
- `POST /api/auth/refresh` - Refresh access token

### Balance
- `GET /api/balance` - Get user balance
- `GET /api/balance/:walletAddress` - Get balance by address

### Transactions
- `POST /api/transactions/deposit` - Process deposit
- `POST /api/transactions/withdraw` - Process withdrawal
- `GET /api/transactions/history` - Get transaction history

### Operator (Authenticated)
- `POST /api/operator/login` - Operator login
- `GET /api/operator/users` - Get all users
- `PUT /api/operator/balance/:userId` - Update user balance
- `GET /api/operator/transactions` - Get all transactions

## Testing

```bash
npm test
```

## Production Build

```bash
npm run build
npm start
```

## Environment Variables

See `.env.example` for required configuration.
