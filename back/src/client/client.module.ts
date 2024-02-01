import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { ClientRepository } from 'src/client/repository/client.repository';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { RouteCalculatorService } from '../route-calculator/route-calculator.service';
import { RouteCalculatorModule } from '../route-calculator/route-calculator.module';

@Module({
  imports: [DbModule, RouteCalculatorModule],
  controllers: [ClientController],
  providers: [ClientService, ClientRepository, RouteCalculatorService],
})
export class ClientModule {}
