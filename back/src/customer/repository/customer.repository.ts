import { InjectClient } from 'nest-postgres';
import { Customer } from '../entity/customer';
import { Client } from 'pg';
import { CustomerRepositoryInterface } from './customer.repository.interface';
import { FindCustomerDto } from 'src/customer/dto/find-customer.dto';

export class ClientRepository implements CustomerRepositoryInterface {
  constructor(@InjectClient() private readonly pg: Client) {}

  async create(customer: Customer): Promise<void> {
    await this.pg.query<Customer>(
      'INSERT INTO customers (name, email, phone, coordxy) VALUES ($1, $2, $3, $4)',
      [customer.name, customer.email, customer.phone, customer.coordXY],
    );
  }

  async findAll(findCustomerDto: FindCustomerDto): Promise<Customer[]> {
    const { name, email, phone } = findCustomerDto;
    const where = [];
    const values = [];

    if (name) {
      where.push(`name = $${values.length++}`);
      values.push(name);
    }

    if (email) {
      where.push(`email = $${values.length++}`);
      values.push(email);
    }

    if (phone) {
      where.push(`phone = $${values.length++}`);
      values.push(phone);
    }

    const whereClause = where.length > 0 ? `WHERE ${where.join(' AND ')}` : '';
    return (
      await this.pg.query<Customer>(
        `SELECT * FROM customers ${whereClause}`,
        values,
      )
    ).rows;
  }

  async findById(id: string): Promise<Customer> {
    return (
      await this.pg.query<Customer>('SELECT * FROM customers WHERE id = $1', [
        id,
      ])
    ).rows[0];
  }

  async findByListOfIds(ids: string[]): Promise<Customer[]> {
    return (
      await this.pg.query<Customer>(
        'SELECT *, coordxy as "coordXY" FROM customers WHERE id = ANY($1)',
        [ids],
      )
    ).rows;
  }
}
