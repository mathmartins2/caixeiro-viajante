import { Injectable } from '@nestjs/common';
import { Customer, CustomerWithCoordinates } from '../customer/entity/customer';

@Injectable()
export class RouteCalculatorService {
  private findNearest(
    current: CustomerWithCoordinates,
    clients: CustomerWithCoordinates[],
  ): CustomerWithCoordinates {
    let nearest = clients[0];
    let shortestDistance = this.calculateDistance(
      current.coordinates,
      nearest.coordinates,
    );

    clients.forEach((cwc) => {
      const distance = this.calculateDistance(
        current.coordinates,
        cwc.coordinates,
      );
      if (distance < shortestDistance) {
        shortestDistance = distance;
        nearest = cwc;
      }
    });

    return nearest;
  }

  private parseCoordinates(coordStr: string): { x: number; y: number } | null {
    const regex = /\((-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)\)/;
    const match = regex.exec(coordStr);
    if (!match) return null;

    const x = parseFloat(match[1]);
    const y = parseFloat(match[3]);
    return { x, y };
  }

  private calculateDistance(
    a: { x: number; y: number },
    b: { x: number; y: number },
  ): number {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
  }

  calculateRoute(clients: Customer[]): Customer[] {
    let customerWithCoordinates: CustomerWithCoordinates[] = clients.map(
      (customer) => ({
        customer,
        coordinates: this.parseCoordinates(customer.coordXY),
      }),
    );

    if (customerWithCoordinates.length === 0) return [];

    let current = customerWithCoordinates.shift();
    const route: CustomerWithCoordinates[] = [current];

    while (customerWithCoordinates.length > 0) {
      const nearest = this.findNearest(current, customerWithCoordinates);
      customerWithCoordinates = customerWithCoordinates.filter(
        (cwc) => cwc !== nearest,
      );
      route.push(nearest);
      current = nearest;
    }
    return route.map((cwc) => cwc.customer);
  }
}
