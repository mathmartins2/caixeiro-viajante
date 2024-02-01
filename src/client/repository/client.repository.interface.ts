import { FindClientDto } from 'src/client/dto/find-client.dto';
import { Client } from '../entity/clients';

export abstract class ClientRepositoryInterface {
  abstract create(client: Client): Promise<void>;
  abstract findAll(findClientDto: FindClientDto): Promise<Client[]>;
  abstract findById(id: string): Promise<Client>;
  abstract findByListOfIds(ids: string[]): Promise<Client[]>;
}
