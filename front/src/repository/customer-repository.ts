import axios from 'axios';
import { Customer } from '../App';

export function CustomerRepository() {
  const getCustomers = async (filters?: Partial<Customer>) => {
    return (
      await axios.get<Customer[]>('http://localhost:3000/customers', {
        params: filters,
      })
    ).data;
  };

  const createCustomer = async (customer: Omit<Customer, 'id'>) => {
    return (
      await axios.post<Customer>('http://localhost:3000/customers', customer)
    ).data;
  };

  return {
    getCustomers,
    createCustomer,
  };
}
