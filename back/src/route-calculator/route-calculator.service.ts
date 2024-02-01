import { Injectable } from '@nestjs/common';
import { Client, ClientWithCoordinates } from '../client/entity/clients';

@Injectable()
export class RouteCalculatorService {
  private findNearest(
    current: ClientWithCoordinates,
    clients: ClientWithCoordinates[],
  ): ClientWithCoordinates {
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

  calculateRoute(clients: Client[]): Client[] {
    let clientsWithCoordinates: ClientWithCoordinates[] = clients.map(
      (client) => ({
        client,
        coordinates: this.parseCoordinates(client.coordXY),
      }),
    );

    if (clientsWithCoordinates.length === 0) return [];

    let current = clientsWithCoordinates.shift();
    const route: ClientWithCoordinates[] = [current];

    while (clientsWithCoordinates.length > 0) {
      const nearest = this.findNearest(current, clientsWithCoordinates);
      console.log(nearest);
      clientsWithCoordinates = clientsWithCoordinates.filter(
        (cwc) => cwc !== nearest,
      );
      route.push(nearest);
      current = nearest;
    }
    return route.map((cwc) => cwc.client);
  }
}
