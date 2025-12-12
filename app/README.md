# SolVault Frontend

Next.js 14 frontend application for the SolVault Solana cashier system.

## Features

- 🌟 Modern UI with Tailwind CSS
- 👛 Solana wallet integration (Phantom, Solflare)
- 💰 Deposit and withdraw SOL
- 📊 Transaction history
- 🔐 Operator dashboard
- 📱 Responsive design
- ⚡ Built with Next.js 14 App Router

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Solana**: @solana/web3.js, @solana/wallet-adapter
- **HTTP Client**: Axios
- **Notifications**: react-hot-toast
- **Icons**: Lucide React
- **Date Formatting**: date-fns

## Project Structure

```
app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Landing page
│   │   ├── user/              # User interface
│   │   ├── operator/          # Operator dashboard
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   │
│   ├── components/
│   │   ├── user/              # User components
│   │   │   ├── WalletConnect.tsx
│   │   │   ├── BalanceCard.tsx
│   │   │   ├── DepositForm.tsx
│   │   │   ├── WithdrawForm.tsx
│   │   │   └── TransactionHistory.tsx
│   │   │
│   │   ├── operator/          # Operator components
│   │   │   ├── AuthForm.tsx
│   │   │   ├── UserList.tsx
│   │   │   └── BalanceManager.tsx
│   │   │
│   │   ├── shared/            # Shared components
│   │   │   ├── Header.tsx
│   │   │   ├── Loading.tsx
│   │   │   └── ErrorBoundary.tsx
│   │   │
│   │   └── providers/         # Context providers
│   │       └── WalletProvider.tsx
│   │
│   ├── hooks/                 # Custom React hooks
│   │   ├── useWallet.ts
│   │   ├── useBalance.ts
│   │   ├── useDeposit.ts
│   │   ├── useWithdraw.ts
│   │   ├── useTransactionHistory.ts
│   │   └── useOperator.ts
│   │
│   ├── lib/
│   │   ├── api/               # API client
│   │   │   ├── client.ts
│   │   │   └── endpoints.ts
│   │   │
│   │   ├── solana/            # Solana utilities
│   │   │   ├── connection.ts
│   │   │   ├── program.ts
│   │   │   └── accounts.ts
│   │   │
│   │   └── stores/            # Zustand stores
│   │       ├── authStore.ts
│   │       └── operatorStore.ts
│   │
│   ├── types/                 # TypeScript types
│   │   └── index.ts
│   │
│   └── utils/                 # Utility functions
│       ├── formatters.ts
│       └── validation.ts
│
├── public/                    # Static assets
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Solana wallet (Phantom or Solflare)

### Installation

1. Install dependencies:
```bash
cd app
npm install
```

2. Configure environment:
```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_PROGRAM_ID=YOUR_PROGRAM_ID
```

3. Start development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Type check
```

## Pages

### Landing Page (`/`)
- Hero section
- Feature showcase
- Call-to-action buttons

### User Interface (`/user`)
- Wallet connection
- Balance display
- Deposit form
- Withdraw form
- Transaction history

### Operator Dashboard (`/operator`)
- Authentication
- User management
- Balance updates
- Transaction monitoring

## Components

### User Components

**WalletConnect**
- Wallet connection button
- Network display
- Connection status

**BalanceCard**
- Current balance display
- Wallet address
- Refresh button

**DepositForm**
- Amount input
- Validation
- Transaction processing

**WithdrawForm**
- Amount input with balance check
- Validation
- Transaction processing

**TransactionHistory**
- List of transactions
- Type indicators
- Status display

### Operator Components

**AuthForm**
- Operator key input
- Authentication
- Demo credentials display

**UserList**
- All user accounts
- Search functionality
- Balance display

**BalanceManager**
- Update user balance
- Input validation
- Confirmation

## Hooks

### useWallet
Extends Solana wallet adapter with auto-authentication.

### useBalance
Fetches and manages user balance state.

### useDeposit
Handles deposit transactions and program interaction.

### useWithdraw
Handles withdrawal transactions.

### useTransactionHistory
Fetches and displays transaction history.

### useOperator
Manages operator dashboard data.

## State Management

### Auth Store (Zustand)
```typescript
{
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}
```

### Operator Store (Zustand)
```typescript
{
  isAuthenticated: boolean;
  token: string | null;
  login: (key: string) => Promise;
  logout: () => void;
}
```

## API Integration

### Endpoints

**Authentication**
- `POST /auth/verify` - Verify wallet
- `POST /auth/refresh` - Refresh token

**Balance**
- `GET /balance` - Get balance
- `GET /balance/:address` - Get balance by address

**Transactions**
- `POST /transactions/deposit` - Deposit SOL
- `POST /transactions/withdraw` - Withdraw SOL
- `GET /transactions/history` - Get history

**Operator**
- `POST /operator/login` - Authenticate
- `GET /operator/users` - Get all users
- `PUT /operator/balance/:userId` - Update balance

## Styling

### Tailwind Configuration

Custom colors, animations, and responsive breakpoints.

### Global Styles

Dark theme with purple gradient background.

### Component Patterns

- Glassmorphism cards
- Smooth transitions
- Hover effects
- Loading states

## Wallet Integration

Supports:
- Phantom
- Solflare
- Auto-connect on load
- Network switching

## Error Handling

- Toast notifications
- Error boundaries
- Validation feedback
- Network error recovery

## Security

- JWT authentication
- Input validation
- XSS protection
- CSRF tokens
- Secure wallet signing

## Performance

- Next.js 14 App Router
- Image optimization
- Code splitting
- Lazy loading
- API caching

## Deployment

### Vercel (Recommended)

```bash
npm run build
vercel deploy
```

### Docker

```bash
docker build -t solvault-frontend .
docker run -p 3000:3000 solvault-frontend
```

### Environment Variables

Set in Vercel dashboard or `.env.production`:
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
NEXT_PUBLIC_PROGRAM_ID=YOUR_PROGRAM_ID
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## Troubleshooting

### Wallet not connecting
- Check browser extension installed
- Try different wallet
- Clear browser cache

### Transaction failing
- Check SOL balance for fees
- Verify network connection
- Check RPC endpoint status

### Build errors
- Clear `.next` folder
- Delete `node_modules`
- Reinstall dependencies

## License

MIT

---

For more information, see the [main project README](../README.md).
