import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
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
    CustomerModule,
  ],
})
export class AppModule {}
