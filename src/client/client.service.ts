import { Injectable } from '@nestjs/common';
import { Client } from './entity/clients';
import { CreateClientDto } from './dto/create-client.dto';
import { FindClientDto } from './dto/find-client.dto';
import { ClientRepository } from './repository/client.repository';
import { RouteCalculatorService } from './route-calculator.service';
import { ClientsNotFound } from './errors/clients-not-found.error';

@Injectable()
export class ClientService {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly routeCalculatorService: RouteCalculatorService,
  ) {}

  async create(clientDto: CreateClientDto): Promise<void> {
    const client = new Client(
      clientDto.name,
      clientDto.coordXY,
      clientDto.email,
      clientDto.phone,
    );
    await this.clientRepository.create(client);
  }

  async findAll(findClientDto: FindClientDto): Promise<Client[]> {
    return this.clientRepository.findAll(findClientDto);
  }

  async calculateRoute(clientIds: string[]): Promise<Client[]> {
    const clients = await this.clientRepository.findByListOfIds(clientIds);
    if (!clients.length) throw new ClientsNotFound();
    return this.routeCalculatorService.calculateRoute(clients);
  }
}
