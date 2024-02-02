import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import {
  Button,
  Flex,
  Input,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Stack,
  Center,
} from '@chakra-ui/react';
import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import Header from './components/Header/Header';
import NewCostumerModal from './components/Customer/NewCostumerModal/Modal';
import { CustomerRepository } from './repository/customer-repository';
import { useSearchParams } from 'react-router-dom';
import CustomerRouteModal from './components/Customer/CustomerRouteModal/Modal';
import { Customer } from './entity/customer.entity';

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get('name');
  const email = searchParams.get('email');
  const phone = searchParams.get('phone');

  const { data, isLoading, error } = useQuery<Customer[]>({
    queryKey: ['customers', name, email, phone],
    queryFn: () =>
      CustomerRepository().getCustomers({
        name: name ?? undefined,
        email: email ?? undefined,
        phone: phone ?? undefined,
      }),
  });
  const {
    isOpen: newCostumerIsOpen,
    onOpen: newCostumerOnOpen,
    onClose: newCostumerOnClone,
  } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, reset } = useForm<Partial<Customer>>({
    values: {
      name: name ?? '',
      email: email ?? '',
      phone: phone ?? '',
    },
    resetOptions: { keepValues: false },
  });

  const onFilterSubmit = async (data: Partial<Customer>) => {
    const params = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    setSearchParams(params);
  };

  const onClearFilters = () => {
    setSearchParams('');
    reset();
  };

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Header />
      <Flex direction="column" align="center" width="100%" pt="4">
        <Stack direction={{ base: 'column', md: 'row' }} spacing="4" mb="4">
          <Input placeholder="Filter by Name" {...register('name')} />
          <Input placeholder="Filter by Email" {...register('email')} />
          <Input placeholder="Filter by Phone" {...register('phone')} />
        </Stack>
        <Center padding={3}>
          <Button
            margin={3}
            colorScheme="blue"
            onClick={handleSubmit(onFilterSubmit)}
          >
            Apply Filters
          </Button>
          <Button colorScheme="gray" onClick={onClearFilters}>
            Clear Filters
          </Button>
        </Center>
        <Button
          leftIcon={<AddIcon />}
          colorScheme="teal"
          size="lg"
          mb="4"
          onClick={newCostumerOnOpen}
        >
          Add Customer
        </Button>
        <Button
          leftIcon={<SearchIcon />}
          colorScheme="teal"
          size="lg"
          mb="4"
          onClick={onOpen}
        >
          Customers routes
        </Button>
        {isLoading && <Spinner size="xl" />}
        <TableContainer>
          <Table variant="simple">
            <TableCaption placement="top">Customers List</TableCaption>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Coordinates</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.map((customer) => (
                <Tr key={customer.id}>
                  <Td>{customer.id}</Td>
                  <Td>{customer.name}</Td>
                  <Td>{customer.email}</Td>
                  <Td>{customer.phone ?? 'N/A'}</Td>
                  <Td>{customer.coordXY}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
      <NewCostumerModal
        isOpen={newCostumerIsOpen}
        onClose={newCostumerOnClone}
      />
      <CustomerRouteModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default App;
