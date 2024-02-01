import { HttpException, HttpStatus } from '@nestjs/common';

export class ClientsNotFound extends HttpException {
  constructor() {
    super('Clients not found', HttpStatus.NOT_FOUND);
  }
}
