import { Injectable } from '@nestjs/common';
import { Client } from './entity/clients';
import { CreateClientDto } from './dto/create-client.dto';
import { FindClientDto } from './dto/find-client.dto';
import { ClientRepository } from './repository/client.repository';
import { RouteCalculatorService } from './route-calculator.service';
import { ClientsNotFound } from './errors/clients-not-found.error';

/**
 * Service responsible for managing clients.
 */
@Injectable()
export class ClientService {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly routeCalculatorService: RouteCalculatorService,
  ) {}

  /**
   * Creates a new client.
   * @param clientDto - The data of the client to be created.
   */
  async create(clientDto: CreateClientDto): Promise<void> {
    const client = new Client(
      clientDto.name,
      clientDto.coordXY,
      clientDto.email,
      clientDto.phone,
    );
    await this.clientRepository.create(client);
  }

  /**
   * Finds clients based on the provided criteria.
   * @param findClientDto - The criteria to search for clients.
   * @returns A list of clients that match the criteria.
   */
  async findAll(findClientDto: FindClientDto): Promise<Client[]> {
    return this.clientRepository.findAll(findClientDto);
  }

  /**
   * Calculates the route for a list of clients.
   * @param clientIds - The IDs of the clients to calculate the route for.
   * @returns A list of clients with the calculated route.
   * @throws ClientsNotFound if no clients are found with the provided IDs.
   */
  async calculateRoute(clientIds: string[]): Promise<Client[]> {
    const clients = await this.clientRepository.findByListOfIds(clientIds);
    if (!clients.length) throw new ClientsNotFound();
    return this.routeCalculatorService.calculateRoute(clients);
  }
}
