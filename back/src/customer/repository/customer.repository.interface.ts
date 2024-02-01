import { FindCustomerDto } from 'src/customer/dto/find-customer.dto';
import { Customer } from '../entity/customer';

export abstract class CustomerRepositoryInterface {
  abstract create(customer: Customer): Promise<void>;
  abstract findAll(findCustomerDto: FindCustomerDto): Promise<Customer[]>;
  abstract findById(id: string): Promise<Customer>;
  abstract findByListOfIds(ids: string[]): Promise<Customer[]>;
}
