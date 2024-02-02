import { Controller, Get, Post, Query } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Body } from '@nestjs/common/decorators';
import { CalculateRouteDto } from './dto/calculate-route.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { FindCustomerDto } from './dto/find-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  findAll(@Query() findClientDto: FindCustomerDto) {
    console.log(findClientDto);
    return this.customerService.findAll(findClientDto);
  }

  @Post('calculate-route')
  calculateRoute(@Body() calculateRouteDto: CalculateRouteDto) {
    const { clientIds } = calculateRouteDto;
    return this.customerService.calculateRoute(clientIds);
  }
}
