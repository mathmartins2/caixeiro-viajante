import { Customer } from './customer';

describe('Customer', () => {
  it('should create a new customer instance', () => {
    const customer = new Customer(
      'John Doe',
      '123,456',
      'john@example.com',
      '1234567890',
    );

    expect(customer).toBeDefined();
    expect(customer.name).toEqual('John Doe');
    expect(customer.coordXY).toEqual('123,456');
    expect(customer.email).toEqual('john@example.com');
    expect(customer.phone).toEqual('1234567890');
  });

  it('should create a new customer instance with optional properties', () => {
    const customer = new Customer('John Doe', '123,456');

    expect(customer).toBeDefined();
    expect(customer.name).toEqual('John Doe');
    expect(customer.coordXY).toEqual('123,456');
    expect(customer.email).toBeUndefined();
    expect(customer.phone).toBeUndefined();
  });
});
