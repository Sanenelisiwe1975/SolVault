# API Documentation

## Base URL

```
Development: http://localhost:3001/api
Production: https://api.yourdomain.com/api
```

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### Authentication

#### POST /auth/verify
Verify wallet and get JWT token.

**Request:**
```json
{
  "walletAddress": "7xKXtg2CvAnpLwEwNAzdAN82XGsqQEqLVKSYqBNZ9YvZ",
  "signature": "signed_message"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "walletAddress": "7xKXtg..."
  },
  "token": "jwt_token"
}
```

#### POST /auth/refresh
Refresh access token.

**Request:**
```json
{
  "refreshToken": "refresh_token"
}
```

**Response:**
```json
{
  "token": "new_jwt_token"
}
```

### Balance

#### GET /balance
Get current user balance.

**Headers:** Authorization required

**Response:**
```json
{
  "balance": 125.5
}
```

#### GET /balance/:walletAddress
Get balance by wallet address.

**Headers:** Authorization required

**Response:**
```json
{
  "balance": 125.5
}
```

### Transactions

#### POST /transactions/deposit
Process a deposit.

**Headers:** Authorization required

**Request:**
```json
{
  "amount": 1.5,
  "signature": "transaction_signature"
}
```

**Response:**
```json
{
  "transaction": {
    "id": "uuid",
    "type": "DEPOSIT",
    "amount": 1.5,
    "status": "CONFIRMED",
    "signature": "...",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

#### POST /transactions/withdraw
Process a withdrawal.

**Headers:** Authorization required

**Request:**
```json
{
  "amount": 0.5
}
```

**Response:**
```json
{
  "transaction": {
    "id": "uuid",
    "type": "WITHDRAWAL",
    "amount": 0.5,
    "status": "CONFIRMED",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

#### GET /transactions/history
Get transaction history.

**Headers:** Authorization required

**Query Parameters:**
- `limit` (optional): Number of transactions (default: 50)
- `offset` (optional): Pagination offset (default: 0)

**Response:**
```json
{
  "transactions": [
    {
      "id": "uuid",
      "type": "DEPOSIT",
      "amount": 1.5,
      "balanceBefore": 100,
      "balanceAfter": 101.5,
      "status": "CONFIRMED",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### Operator

#### POST /operator/login
Operator authentication.

**Request:**
```json
{
  "operatorKey": "operator_secret_key"
}
```

**Response:**
```json
{
  "token": "operator_jwt_token"
}
```

#### GET /operator/users
Get all users (operator only).

**Headers:** Authorization required (operator token)

**Query Parameters:**
- `search` (optional): Search by wallet address
- `limit` (optional): Number of users (default: 50)
- `offset` (optional): Pagination offset (default: 0)

**Response:**
```json
{
  "users": [
    {
      "id": "uuid",
      "walletAddress": "7xKXtg...",
      "balance": 125.5,
      "lastActivity": "2024-01-01T00:00:00Z",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### PUT /operator/balance/:userId
Update user balance (operator only).

**Headers:** Authorization required (operator token)

**Request:**
```json
{
  "amount": 150.0
}
```

**Response:**
```json
{
  "balance": {
    "userId": "uuid",
    "amount": 150.0,
    "lastUpdated": "2024-01-01T00:00:00Z"
  }
}
```

#### GET /operator/transactions
Get all transactions (operator only).

**Headers:** Authorization required (operator token)

**Query Parameters:**
- `limit` (optional): Number of transactions (default: 100)
- `offset` (optional): Pagination offset (default: 0)

**Response:**
```json
{
  "transactions": [
    {
      "id": "uuid",
      "userId": "uuid",
      "user": {
        "walletAddress": "7xKXtg..."
      },
      "type": "DEPOSIT",
      "amount": 1.5,
      "status": "CONFIRMED",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

## Error Responses

All endpoints return errors in this format:

```json
{
  "error": "Error message",
  "errors": [
    {
      "field": "amount",
      "message": "Amount must be positive"
    }
  ]
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

## Rate Limiting

- Standard endpoints: 100 requests per 15 minutes
- Operator endpoints: 10 requests per 15 minutes

Rate limit headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1640000000
```

## Examples

### JavaScript/TypeScript

```typescript
// Deposit
const response = await fetch('http://localhost:3001/api/transactions/deposit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    amount: 1.5,
    signature: 'tx_signature'
  })
});

const data = await response.json();
```

### cURL

```bash
# Get balance
curl -X GET http://localhost:3001/api/balance \
  -H "Authorization: Bearer YOUR_TOKEN"

# Deposit
curl -X POST http://localhost:3001/api/transactions/deposit \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"amount":1.5,"signature":"tx_sig"}'
```
