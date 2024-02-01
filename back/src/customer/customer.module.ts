import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { ClientRepository } from 'src/customer/repository/customer.repository';
import { CustomersController } from './customer.controller';
import { CustomerService } from './customer.service';
import { RouteCalculatorService } from '../route-calculator/route-calculator.service';
import { RouteCalculatorModule } from '../route-calculator/route-calculator.module';

@Module({
  imports: [DbModule, RouteCalculatorModule],
  controllers: [CustomersController],
  providers: [CustomerService, ClientRepository, RouteCalculatorService],
})
export class CustomerModule {}
