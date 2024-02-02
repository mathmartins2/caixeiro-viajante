import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { PhoneIcon, EmailIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CustomerRepository } from '../../../repository/customer-repository';
import { customerSchema } from './schemas/customer-schema';
import { ModalProps } from '../interfaces';

type Customer = z.infer<typeof customerSchema>;

function NewCostumerModal({ isOpen, onClose }: Readonly<ModalProps>) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Customer>({
    resolver: zodResolver(customerSchema),
  });
  const queryClient = useQueryClient();
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: (newCustomer: Customer) =>
      CustomerRepository().createCustomer(newCustomer),
    onSuccess: () => {
      toast({
        title: 'Customer created.',
        description: 'We have created a new customer for you.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      onClose();
      queryClient.invalidateQueries();
      reset();
    },
    onError: (error) => {
      toast({
        title: 'An error occurred.',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    },
  });

  const onSubmit = (data: Customer) => {
    mutation.mutate(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
      size={'xl'}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create new customer</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl isInvalid={!!errors.name}>
            <FormLabel>Name</FormLabel>
            <Input {...register('name')} placeholder="name" />
            <FormErrorMessage>
              <>{errors.name?.message}</>
            </FormErrorMessage>
          </FormControl>

          <FormControl mt={4} isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <EmailIcon color="gray.300" />
              </InputLeftElement>
              <Input {...register('email')} type="email" placeholder="Email" />
            </InputGroup>
            <FormErrorMessage>
              <>{errors.email?.message}</>
            </FormErrorMessage>
          </FormControl>

          <FormControl mt={4} isInvalid={!!errors.phone}>
            <FormLabel>Phone</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <PhoneIcon color="gray.300" />
              </InputLeftElement>
              <Input
                {...register('phone')}
                type="tel"
                placeholder="Phone number"
              />
            </InputGroup>
            <FormErrorMessage>
              <>{errors.phone?.message}</>
            </FormErrorMessage>
          </FormControl>

          <FormControl mt={4} isInvalid={!!errors.coordXY}>
            <FormLabel>Coordinates</FormLabel>
            <Input {...register('coordXY')} placeholder="(x,y)" />
            <FormErrorMessage>
              <>{errors.coordXY?.message}</>
            </FormErrorMessage>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit(onSubmit)}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default NewCostumerModal;
