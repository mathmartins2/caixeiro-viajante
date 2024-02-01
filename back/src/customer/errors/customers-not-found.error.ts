import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomersNotFound extends HttpException {
  constructor() {
    super('Customers not found', HttpStatus.NOT_FOUND);
  }
}
