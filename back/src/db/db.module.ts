import { Module } from '@nestjs/common';
import { PostgresModule } from 'nest-postgres';
import { env } from 'src/env/env-validator.service';

@Module({
  imports: [
    PostgresModule.forRoot({
      connectionString: env.DATABASE_URL,
    }),
  ],
})
export class DbModule {}
