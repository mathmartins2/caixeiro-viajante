import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';
import { EnvModule } from './env/env-validator.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      cache: true,
    }),
    EnvModule,
    ClientModule,
  ],
})
export class AppModule {}
