module.exports = {
  PORT: process.env.PORT || 3000,
  DB_CONNECTION_URL: process.env.DB_CONNECTION_URL || 'mongodb://localhost:27017/feb-2021',
  SYSTEM_EMAIL: process.env.SYSTEM_EMAIL || 'noreply@noreply.com',
  SYSTEM_EMAIL_PASSWORD: process.env.SYSTEM_EMAIL_PASSWORD || '121123',

  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'Secret',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'Refresh_Secret',

  AUTHORIZATION: 'Authorization'
};
