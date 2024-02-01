import { Client } from './clients';

describe('Client', () => {
  it('should create a new client instance', () => {
    const client = new Client(
      'John Doe',
      '123,456',
      'john@example.com',
      '1234567890',
    );

    expect(client).toBeDefined();
    expect(client.name).toEqual('John Doe');
    expect(client.coordXY).toEqual('123,456');
    expect(client.email).toEqual('john@example.com');
    expect(client.phone).toEqual('1234567890');
  });

  it('should create a new client instance with optional properties', () => {
    const client = new Client('John Doe', '123,456');

    expect(client).toBeDefined();
    expect(client.name).toEqual('John Doe');
    expect(client.coordXY).toEqual('123,456');
    expect(client.email).toBeUndefined();
    expect(client.phone).toBeUndefined();
  });
});
