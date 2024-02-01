import { InjectClient } from 'nest-postgres';
import { Client } from '../entity/clients';
import { Client as PgClient } from 'pg';
import { ClientRepositoryInterface } from './client.repository.interface';
import { FindClientDto } from 'src/client/dto/find-client.dto';

export class ClientRepository implements ClientRepositoryInterface {
  constructor(@InjectClient() private readonly pg: PgClient) {}

  async create(client: Client): Promise<void> {
    await this.pg.query<Client>(
      'INSERT INTO clients (name, email, phone, coordxy) VALUES ($1, $2, $3, $4)',
      [client.name, client.email, client.phone, client.coordXY],
    );
  }

  async findAll(findClientDto: FindClientDto): Promise<Client[]> {
    const { name, email, phone } = findClientDto;
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
      await this.pg.query<Client>(
        `SELECT * FROM clients ${whereClause}`,
        values,
      )
    ).rows;
  }

  async findById(id: string): Promise<Client> {
    return (
      await this.pg.query<Client>('SELECT * FROM clients WHERE id = $1', [id])
    ).rows[0];
  }

  async findByListOfIds(ids: string[]): Promise<Client[]> {
    return (
      await this.pg.query<Client>(
        'SELECT *, coordxy as "coordXY" FROM clients WHERE id = ANY($1)',
        [ids],
      )
    ).rows;
  }
}
