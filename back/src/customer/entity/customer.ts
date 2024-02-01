export class Customer {
  constructor(
    public name: string,
    public coordXY: string,
    public email?: string,
    public phone?: string,
    public id?: string,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}
}

export type CustomerWithCoordinates = {
  customer: Customer;
  coordinates: { x: number; y: number };
};
