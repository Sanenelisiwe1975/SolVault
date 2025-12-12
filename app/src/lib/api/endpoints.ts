export const API_ENDPOINTS = {
  // Auth
  VERIFY_WALLET: '/auth/verify',
  REFRESH_TOKEN: '/auth/refresh',

  // Balance
  GET_BALANCE: '/balance',
  GET_BALANCE_BY_ADDRESS: (address: string) => `/balance/${address}`,

  // Transactions
  DEPOSIT: '/transactions/deposit',
  WITHDRAW: '/transactions/withdraw',
  TRANSACTION_HISTORY: '/transactions/history',

  // Operator
  OPERATOR_LOGIN: '/operator/login',
  OPERATOR_USERS: '/operator/users',
  OPERATOR_UPDATE_BALANCE: (userId: string) => `/operator/balance/${userId}`,
  OPERATOR_TRANSACTIONS: '/operator/transactions',
};
