import React from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure, Box } from '@chakra-ui/react';
import EmployeeCreate from './EmployeeCreate';
import { useQuery } from '@apollo/client';
import { GET_EMPLOYEES } from '../graphql/queries';

const EmployeeCreateModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { refetch } = useQuery(GET_EMPLOYEES);

  return (
    <Box>
      <Button onClick={onOpen} colorScheme="red" mb={5}>
        Create Employee
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="white">
          <ModalHeader color="black">Create Employee</ModalHeader>
          <ModalCloseButton color="black" />
          <ModalBody>
            <EmployeeCreate onClose={onClose} refetch={refetch} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EmployeeCreateModal;
