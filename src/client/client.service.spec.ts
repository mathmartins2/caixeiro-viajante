import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from './client.service';
import { RouteCalculatorService } from './route-calculator.service';
import { CreateClientDto } from './dto/create-client.dto';
import { FindClientDto } from './dto/find-client.dto';
import { ClientRepository } from './repository/client.repository';
import { Client } from './entity/clients';
import { ClientsNotFound } from './errors/clients-not-found.error';

describe('ClientService', () => {
  let clientService: ClientService;
  let clientRepository: ClientRepository;
  let routeCalculatorService: RouteCalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        {
          provide: ClientRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findByListOfIds: jest.fn(),
          },
        },
        {
          provide: RouteCalculatorService,
          useValue: {
            calculateRoute: jest.fn(),
          },
        },
      ],
    }).compile();

    clientService = module.get<ClientService>(ClientService);
    clientRepository = module.get<ClientRepository>(ClientRepository);
    routeCalculatorService = module.get<RouteCalculatorService>(
      RouteCalculatorService,
    );
  });

  describe('create', () => {
    it('should create a new client', async () => {
      const createClientDto: CreateClientDto = {
        name: 'John Doe',
        coordXY: '123,456',
        email: 'john@example.com',
        phone: '1234567890',
      };

      await clientService.create(createClientDto);

      expect(clientRepository.create).toHaveBeenCalledWith(expect.any(Client));
    });
  });

  describe('findAll', () => {
    it('should find all clients', async () => {
      const findClientDto: FindClientDto = {
        name: 'John Doe',
      };

      const clients: Client[] = [
        {
          name: 'John Doe',
          coordXY: '123,456',
          email: 'john@example.com',
          phone: '1234567890',
        },
        {
          name: 'Jane Doe',
          coordXY: '123,456',
          email: 'jane@example.com',
          phone: '1234567890',
        },
      ];
      jest.spyOn(clientRepository, 'findAll').mockResolvedValue(clients);

      const result = await clientService.findAll(findClientDto);

      expect(result).toEqual(clients);
    });
  });

  describe('calculateRoute', () => {
    it('should calculate route for given client IDs', async () => {
      const clientIds: string[] = [
        '5f4c7b6d-3e3f-4d3b-bd8e-1392e8b1e1c2',
        '5f4c7b6d-3e3f-4d3b-bd8e-1392e8b1e1c3',
      ];
      const clients: Client[] = [
        {
          name: 'John Doe',
          coordXY: '(123,456)',
          email: 'john@example.com',
          phone: '1234567890',
        },
        {
          name: 'Jane Doe',
          coordXY: '(123,456)',
          email: 'jane@example.com',
          phone: '1234567890',
        },
      ];
      jest
        .spyOn(clientRepository, 'findByListOfIds')
        .mockResolvedValue(clients);
      jest
        .spyOn(routeCalculatorService, 'calculateRoute')
        .mockReturnValue(clients);

      const result = await clientService.calculateRoute(clientIds);

      expect(result).toEqual(clients);
    });

    it('should throw an error if no clients found', async () => {
      const clientIds: string[] = [
        '5f4c7b6d-3e3f-4d3b-bd8e-1392e8b1e1c2',
        '5f4c7b6d-3e3f-4d3b-bd8e-1392e8b1e1c3',
      ];
      jest.spyOn(clientRepository, 'findByListOfIds').mockResolvedValue([]);

      await expect(clientService.calculateRoute(clientIds)).rejects.toThrow(
        ClientsNotFound,
      );
    });
  });

  it('should throw an error if no clients found', async () => {
    const clientIds: string[] = [
      '5f4c7b6d-3e3f-4d3b-bd8e-1392e8b1e1c2',
      '5f4c7b6d-3e3f-4d3b-bd8e-1392e8b1e1c3',
    ];
    jest.spyOn(clientRepository, 'findByListOfIds').mockResolvedValue([]);

    await expect(clientService.calculateRoute(clientIds)).rejects.toThrow(
      ClientsNotFound,
    );
  });
});
