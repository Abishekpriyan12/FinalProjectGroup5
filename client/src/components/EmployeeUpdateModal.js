import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Box, Button, Select, FormControl, FormLabel, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { GET_EMPLOYEE } from '../graphql/queries';
import { UPDATE_EMPLOYEE } from '../graphql/mutations';

const EmployeeUpdateModal = ({ employeeId, onClose }) => {
  const { loading, error, data } = useQuery(GET_EMPLOYEE, {
    variables: { id: employeeId },
  });
  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE);

  const [formState, setFormState] = useState({
    title: '',
    department: '',
    currentStatus: true,
  });

  useEffect(() => {
    if (data && data.employee) {
      setFormState({
        title: data.employee.title,
        department: data.employee.department,
        currentStatus: data.employee.currentStatus ? '1' : '0',
      });
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateEmployee({
      variables: {
        id: employeeId,
        title: formState.title,
        department: formState.department,
        currentStatus: formState.currentStatus === '1',
      },
    });
    onClose(); 
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="white">
        <ModalHeader color="black">Update Employee</ModalHeader>
        <ModalCloseButton color="black" />
        <ModalBody>
          <Box bg="white" p={4} borderRadius="md">
            <form onSubmit={handleSubmit}>
              <FormControl mb={3}>
                <FormLabel color="black">Title</FormLabel>
                <Select name="title" value={formState.title} onChange={handleInputChange} color="black" borderColor="gray.300">
                  <option value="Employee">Employee</option>
                  <option value="Manager">Manager</option>
                  <option value="Director">Director</option>
                  <option value="VP">VP</option>
                </Select>
              </FormControl>
              <FormControl mb={3}>
                <FormLabel color="black">Department</FormLabel>
                <Select name="department" value={formState.department} onChange={handleInputChange} color="black" borderColor="gray.300">
                  <option value="IT">IT</option>
                  <option value="Marketing">Marketing</option>
                  <option value="HR">HR</option>
                  <option value="Engineering">Engineering</option>
                </Select>
              </FormControl>
              <FormControl mb={3}>
                <FormLabel color="black">Current Status</FormLabel>
                <Select name="currentStatus" value={formState.currentStatus} onChange={handleInputChange} color="black" borderColor="gray.300">
                  <option value="1">Working</option>
                  <option value="0">Retired</option>
                </Select>
              </FormControl>
              <ModalFooter>
                <Button colorScheme="red" type="submit">
                  Save
                </Button>
                <Button onClick={onClose} ml={3}>
                  Cancel
                </Button>
              </ModalFooter>
            </form>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EmployeeUpdateModal;
