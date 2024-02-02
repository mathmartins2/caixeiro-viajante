import { Injectable } from '@nestjs/common';
import { Customer } from './entity/customer';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { FindCustomerDto } from './dto/find-customer.dto';
import { ClientRepository } from './repository/customer.repository';
import { RouteCalculatorService } from '../route-calculator/route-calculator.service';

/**
 * Service responsible for managing clients.
 */
@Injectable()
export class CustomerService {
  constructor(
    private readonly customerRepository: ClientRepository,
    private readonly routeCalculatorService: RouteCalculatorService,
  ) {}

  /**
   * Creates a new customer.
   * @param customerDto - The data of the customer to be created.
   */
  async create(customerDto: CreateCustomerDto): Promise<void> {
    const customer = new Customer(
      customerDto.name,
      customerDto.coordXY,
      customerDto.email,
      customerDto.phone,
    );
    await this.customerRepository.create(customer);
  }

  /**
   * Finds clients based on the provided criteria.
   * @param findClientDto - The criteria to search for clients.
   * @returns A list of clients that match the criteria.
   */
  async findAll(findClientDto: FindCustomerDto): Promise<Customer[]> {
    return this.customerRepository.findAll(findClientDto);
  }

  /**
   * Calculates the route for the customers.
   * @returns A promise that resolves to an array of Customer objects.
   * @throws CustomersNotFound if no customers are found.
   */
  async calculateRoute(): Promise<Customer[]> {
    const customers = await this.customerRepository.findAll();
    return this.routeCalculatorService.calculateRoute(customers);
  }
}
