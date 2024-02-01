import { Module } from '@nestjs/common';
import { RouteCalculatorService } from './route-calculator.service';

@Module({
  providers: [RouteCalculatorService],
})
export class RouteCalculatorModule {}
