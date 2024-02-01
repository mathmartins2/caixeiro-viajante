import { Module } from '@nestjs/common';
import { EnvService } from './env-validator.service';

@Module({
  providers: [EnvService],
})
export class EnvModule {}
