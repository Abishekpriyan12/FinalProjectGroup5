import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Table, Thead, Tbody, Tr, Th, Td, Button, useToast } from '@chakra-ui/react';
import { GET_EMPLOYEES } from '../graphql/queries';
import { DELETE_EMPLOYEE } from '../graphql/mutations';
import { Link } from 'react-router-dom';
import EmployeeUpdateModal from './EmployeeUpdateModal';

const EmployeeTable = () => {
  const { loading, error, data } = useQuery(GET_EMPLOYEES);
  const toast = useToast();
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    update(cache, { data: { deleteEmployee } }) {
      if (deleteEmployee) {
        const existingEmployees = cache.readQuery({ query: GET_EMPLOYEES });
        const newEmployees = existingEmployees.employees.filter(emp => emp.id !== deleteEmployee.id);
        cache.writeQuery({
          query: GET_EMPLOYEES,
          data: { employees: newEmployees },
        });
        toast({
          title: 'Employee deleted.',
          description: "The employee has been successfully deleted.",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  });
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const handleDelete = (employee) => {
    if (employee.currentStatus) {
      toast({
        title: "Can't delete employee",
        description: "CAN’T DELETE EMPLOYEE – STATUS ACTIVE",
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    } else {
      deleteEmployee({ variables: { id: employee.id } });
    }
  };

  const openUpdateModal = (id) => {
    setSelectedEmployeeId(id);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedEmployeeId(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th>Age</Th>
            <Th>Date of Joining</Th>
            <Th>Title</Th>
            <Th>Department</Th>
            <Th>Employee Type</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.employees.map((employee) => (
            <Tr key={employee.id}>
              <Td>{employee.firstName}</Td>
              <Td>{employee.lastName}</Td>
              <Td>{employee.age}</Td>
              <Td>{new Date(parseInt(employee.dateOfJoining)).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</Td>
              <Td>{employee.title}</Td>
              <Td>{employee.department}</Td>
              <Td>{employee.employeeType}</Td>
              <Td>{employee.currentStatus ? 'Working' : 'Retired'}</Td>
              <Td>
                <Button as={Link} to={`/employee/${employee.id}`} colorScheme="blue" mr={2}>
                  Details
                </Button>
                <Button colorScheme="yellow" onClick={() => openUpdateModal(employee.id)} mr={2}>
                  Edit
                </Button>
                <Button colorScheme="red" onClick={() => handleDelete(employee)}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {isUpdateModalOpen && (
        <EmployeeUpdateModal
          employeeId={selectedEmployeeId}
          onClose={closeUpdateModal}
        />
      )}
    </>
  );
};

export default EmployeeTable;
