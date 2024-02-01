import { RouteCalculatorService } from './route-calculator.service';

describe('RouteCalculatorService', () => {
  let routeCalculatorService: RouteCalculatorService;

  beforeEach(() => {
    routeCalculatorService = new RouteCalculatorService();
  });

  describe('calculateRoute', () => {
    it('should calculate the route for a list of clients', () => {
      const clients = [
        {
          name: 'John Doe',
          coordXY: '(1,2)',
          email: 'john@example.com',
          phone: '1234567890',
        },
        {
          name: 'Jane Doe',
          coordXY: '(3,4)',
          email: 'jane@example.com',
          phone: '1234567890',
        },
        {
          name: 'Alice Smith',
          coordXY: '(5,6)',
          email: 'alice@example.com',
          phone: '1234567890',
        },
      ];

      const expectedRoute = [
        {
          name: 'John Doe',
          coordXY: '(1,2)',
          email: 'john@example.com',
          phone: '1234567890',
        },
        {
          name: 'Jane Doe',
          coordXY: '(3,4)',
          email: 'jane@example.com',
          phone: '1234567890',
        },
        {
          name: 'Alice Smith',
          coordXY: '(5,6)',
          email: 'alice@example.com',
          phone: '1234567890',
        },
      ];

      const result = routeCalculatorService.calculateRoute(clients);

      expect(result).toEqual(expectedRoute);
    });

    it('should return an empty array if no clients are provided', () => {
      const clients = [];

      const result = routeCalculatorService.calculateRoute(clients);

      expect(result).toEqual([]);
    });
  });
});
