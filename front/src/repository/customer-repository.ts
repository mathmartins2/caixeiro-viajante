import axios from 'axios';
import { Customer } from '../App';
import { validatedEnv } from '../main';

export function CustomerRepository() {
  const getCustomers = async (filters?: Partial<Customer>) => {
    return (
      await axios.get<Customer[]>(validatedEnv.VITE_API_URL, {
        params: filters,
      })
    ).data;
  };

  const createCustomer = async (customer: Omit<Customer, 'id'>) => {
    return (await axios.post<Customer>(validatedEnv.VITE_API_URL, customer))
      .data;
  };

  const customerRoutes = async () => {
    return (
      await axios.post<Customer[]>(
        validatedEnv.VITE_API_URL + '/calculate-route'
      )
    ).data;
  };

  return {
    getCustomers,
    createCustomer,
    customerRoutes,
  };
}
