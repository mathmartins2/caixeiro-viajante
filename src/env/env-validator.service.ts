import { z } from 'zod';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import 'dotenv/config';

const processEnv = {
  DATABASE_URL: process.env.DATABASE_URL,
};

const envSchema = z.object({
  DATABASE_URL: z.string(),
});

@Injectable()
export class EnvService implements OnModuleInit {
  private readonly logger = new Logger(EnvService.name);

  onModuleInit() {
    this.validateEnv(processEnv);
  }

  private validateEnv(env: Record<string, any>): void {
    try {
      this.logger.log('Validating environment variables');
      envSchema.parse(env);
    } catch (error) {
      this.logger.error('Environment validation failed', error);
    }
  }
}

export const env = envSchema.parse(processEnv);
