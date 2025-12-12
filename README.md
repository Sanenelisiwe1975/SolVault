# SolVault - Solana Cashier System

A complete full-stack Solana application for deposit, withdrawal, and balance management.

## 🚀 Features

- 💰 **Deposit & Withdraw SOL** - Seamless transactions
- 📊 **Balance Tracking** - Real-time balance updates
- 🔐 **Operator Dashboard** - Admin controls
- 🔒 **Secure** - PDA-based accounts with proper validation
- ⚡ **Fast** - Built on Solana for instant finality
- 📱 **Responsive UI** - Works on all devices

## 📁 Project Structure

```
solvault/
├── programs/          # Anchor Solana program
│   └── solvault/     # Main program
├── tests/            # Program integration tests
├── api/              # Express REST API backend
├── app/              # Next.js frontend
├── scripts/          # Deployment & utility scripts
├── docs/             # Documentation
└── README.md         # This file
```

## 🛠️ Tech Stack

### Blockchain
- **Solana** - High-performance blockchain
- **Anchor** - Solana development framework
- **Rust** - Program language

### Backend
- **Node.js** - Runtime environment
- **Express** - REST API framework
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **JWT** - Authentication

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Solana Wallet Adapter** - Wallet integration
- **Zustand** - State management

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Rust & Cargo
- Solana CLI
- Anchor CLI
- PostgreSQL
- Solana wallet (Phantom/Solflare)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/solvault.git
cd solvault
```

2. **Install all dependencies**
```bash
npm run install:all
```

3. **Setup environment variables**
```bash
# Root .env
cp .env.example .env

# API .env
cp api/.env.example api/.env

# Frontend .env
cp app/.env.local.example app/.env.local
```

4. **Setup database**
```bash
npm run setup:db
```

5. **Build and deploy Solana program**
```bash
npm run build:program
npm run deploy:program
```

6. **Start development servers**
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- API: http://localhost:3001

## 📖 Detailed Setup

### 1. Solana Program

```bash
# Build program
anchor build

# Run tests
anchor test

# Deploy to devnet
anchor deploy --provider.cluster devnet

# Deploy to mainnet
anchor deploy --provider.cluster mainnet
```

### 2. Backend API

```bash
cd api

# Install dependencies
npm install

# Setup database
npm run migrate
npm run seed

# Start development server
npm run dev

# Build for production
npm run build
npm start
```

### 3. Frontend

```bash
cd app

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
npm start
```

## 🔧 Configuration

### Environment Variables

**Root `.env`**
```env
SOLANA_NETWORK=devnet
```

**API `.env`**
```env
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/solvault
JWT_SECRET=your-secret-key
OPERATOR_SECRET=demo-operator-key
SOLANA_NETWORK=devnet
SOLANA_RPC_URL=https://api.devnet.solana.com
PROGRAM_ID=YourProgramId
```

**Frontend `.env.local`**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_PROGRAM_ID=YourProgramId
```

## 📚 Documentation

- [Architecture Overview](./docs/ARCHITECTURE.md)
- [API Documentation](./docs/API.md)
- [Program Documentation](./docs/PROGRAM.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)

## 🧪 Testing

```bash
# Test Solana program
npm run test:program

# Test API
npm run test:api

# Test all
npm run test:all
```

## 🚢 Deployment

### Devnet Deployment

```bash
# Deploy program to devnet
anchor deploy --provider.cluster devnet

# Update environment variables with new program ID
# Deploy backend and frontend
```

### Mainnet Deployment

See [Deployment Guide](./docs/DEPLOYMENT.md) for detailed instructions.

## 📊 Program Instructions

1. **initialize** - Initialize the vault
2. **initialize_user** - Create user account
3. **deposit** - Deposit SOL to vault
4. **withdraw** - Withdraw SOL from vault
5. **update_balance** - Operator updates balance
6. **close_user_account** - Close account and reclaim rent

## 🔐 Security Features

- PDA-based accounts
- Authority and operator checks
- Overflow/underflow protection
- Balance validation
- Emergency pause mechanism
- Minimum/maximum transaction limits
- JWT authentication
- Rate limiting
- Input validation

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - [@yourhandle](https://twitter.com/yourhandle)

## 🙏 Acknowledgments

- Solana Foundation
- Anchor Framework
- Next.js Team

## 📞 Support

For support, email support@solvault.com or join our Discord server.

---

Made with ❤️ by the SolVault Team