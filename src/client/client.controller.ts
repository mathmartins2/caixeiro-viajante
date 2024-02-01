import { Controller, Get, Post, Query } from '@nestjs/common';
import { ClientService } from './client.service';
import { Body } from '@nestjs/common/decorators';
import { CalculateRouteDto } from './dto/calculate-route.dto';
import { CreateClientDto } from './dto/create-client.dto';
import { FindClientDto } from './dto/find-client.dto';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get()
  findAll(@Query() findClientDto: FindClientDto) {
    return this.clientService.findAll(findClientDto);
  }

  @Post('calculate-route')
  calculateRoute(@Body() calculateRouteDto: CalculateRouteDto) {
    const { clientIds } = calculateRouteDto;
    return this.clientService.calculateRoute(clientIds);
  }
}
