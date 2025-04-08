import * as dotenv from 'dotenv';
dotenv.config();

export const configuration = () => ({
  jwtSecret: process.env.JWT_SECRET ?? 'defaultSecret',
  port: parseInt(process.env.PORT as string, 10) ?? 3000,
  logLevel: process.env.LOG_LEVEL ?? 'info',
});
