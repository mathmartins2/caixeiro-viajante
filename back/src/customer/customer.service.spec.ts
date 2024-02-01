import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { RouteCalculatorService } from '../route-calculator/route-calculator.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { FindCustomerDto } from './dto/find-customer.dto';
import { ClientRepository } from './repository/customer.repository';
import { Customer } from './entity/customer';
import { CustomersNotFound } from './errors/customers-not-found.error';

describe('ClientService', () => {
  let customerService: CustomerService;
  let customerRepository: ClientRepository;
  let routeCalculatorService: RouteCalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
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

    customerService = module.get<CustomerService>(CustomerService);
    customerRepository = module.get<ClientRepository>(ClientRepository);
    routeCalculatorService = module.get<RouteCalculatorService>(
      RouteCalculatorService,
    );
  });

  describe('create', () => {
    it('should create a new customer', async () => {
      const createCustomerDto: CreateCustomerDto = {
        name: 'John Doe',
        coordXY: '123,456',
        email: 'john@example.com',
        phone: '1234567890',
      };

      await customerService.create(createCustomerDto);

      expect(customerRepository.create).toHaveBeenCalledWith(
        expect.any(Customer),
      );
    });
  });

  describe('findAll', () => {
    it('should find all clients', async () => {
      const findClientDto: FindCustomerDto = {
        name: 'John Doe',
      };

      const clients: Customer[] = [
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
      jest.spyOn(customerRepository, 'findAll').mockResolvedValue(clients);

      const result = await customerService.findAll(findClientDto);

      expect(result).toEqual(clients);
    });
  });

  describe('calculateRoute', () => {
    it('should calculate route for given customer IDs', async () => {
      const clientIds: string[] = [
        '5f4c7b6d-3e3f-4d3b-bd8e-1392e8b1e1c2',
        '5f4c7b6d-3e3f-4d3b-bd8e-1392e8b1e1c3',
      ];
      const clients: Customer[] = [
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
        .spyOn(customerRepository, 'findByListOfIds')
        .mockResolvedValue(clients);
      jest
        .spyOn(routeCalculatorService, 'calculateRoute')
        .mockReturnValue(clients);

      const result = await customerService.calculateRoute(clientIds);

      expect(result).toEqual(clients);
    });

    it('should throw an error if no clients found', async () => {
      const clientIds: string[] = [
        '5f4c7b6d-3e3f-4d3b-bd8e-1392e8b1e1c2',
        '5f4c7b6d-3e3f-4d3b-bd8e-1392e8b1e1c3',
      ];
      jest.spyOn(customerRepository, 'findByListOfIds').mockResolvedValue([]);

      await expect(customerService.calculateRoute(clientIds)).rejects.toThrow(
        CustomersNotFound,
      );
    });
  });

  it('should throw an error if no clients found', async () => {
    const clientIds: string[] = [
      '5f4c7b6d-3e3f-4d3b-bd8e-1392e8b1e1c2',
      '5f4c7b6d-3e3f-4d3b-bd8e-1392e8b1e1c3',
    ];
    jest.spyOn(customerRepository, 'findByListOfIds').mockResolvedValue([]);

    await expect(customerService.calculateRoute(clientIds)).rejects.toThrow(
      CustomersNotFound,
    );
  });
});
