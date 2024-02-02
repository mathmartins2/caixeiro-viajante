import { Controller, Get, Post, Query } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Body } from '@nestjs/common/decorators';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { FindCustomerDto } from './dto/find-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  async findAll(@Query() findClientDto: FindCustomerDto) {
    return this.customerService.findAll(findClientDto);
  }

  @Post('calculate-route')
  async calculateRoute() {
    return this.customerService.calculateRoute();
  }
}
