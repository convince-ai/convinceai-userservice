import * as dotenv from 'dotenv';

dotenv.config();

export type environmentTypes = 'prod' | 'hmlg' | 'dev';

export const envVars: {
  HOST: string;
  PORT: number;
  JWT_SECRET: string;
  ENVIRONMENT: environmentTypes;
} = {
  HOST: process.env.HOST,
  PORT: +process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  ENVIRONMENT: process.env.ENV as environmentTypes,
};
