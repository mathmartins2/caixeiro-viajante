import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  ModalFooter,
  Button,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { ModalProps } from '../interfaces';
import { CustomerRepository } from '../../../repository/customer-repository';
import { useQuery } from '@tanstack/react-query';
import { Customer } from '../../../entity/customer.entity';

function CustomerRouteModal({ isOpen, onClose }: Readonly<ModalProps>) {
  const { data, isLoading, error } = useQuery<Customer[]>({
    queryKey: ['customers-route'],
    queryFn: () => CustomerRepository().customerRoutes(),
  });

  if (error) return <div>Error: {error.message}</div>;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
      size={'xl'}
    >
      <ModalOverlay />
      <ModalContent maxW="900px">
        <ModalHeader>Customer route</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <TableContainer>
            <Table variant="simple">
              <TableCaption placement="top">Customers best route</TableCaption>
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
              <Center>{isLoading && <Spinner size="xl" />}</Center>
            </Table>
          </TableContainer>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CustomerRouteModal;
