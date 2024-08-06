import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Table, Thead, Tbody, Tr, Th, Td, Button, useToast, Select } from '@chakra-ui/react';
import { GET_EMPLOYEES } from '../graphql/queries';
import { DEACTIVATE_EMPLOYEE } from '../graphql/mutations';
import { Link } from 'react-router-dom';
import EmployeeUpdateModal from './EmployeeUpdateModal';

const EmployeeTable = () => {
  const [isActiveFilter, setIsActiveFilter] = useState(true);
  const { loading, error, data, refetch } = useQuery(GET_EMPLOYEES, {
    variables: { isActive: isActiveFilter }
  });
  const toast = useToast();
  const [deactivateEmployee] = useMutation(DEACTIVATE_EMPLOYEE, {
    onCompleted: (data) => {
      if (data.deactivateEmployee.success) {
        toast({
          title: 'Employee deactivated.',
          description: data.deactivateEmployee.message,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        refetch();
      } else {
        toast({
          title: "Operation failed",
          description: data.deactivateEmployee.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  });
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const handleDeactivate = (employee) => {
    deactivateEmployee({ variables: { id: employee.id } });
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
  if (!data || !data.employees) return <p>No data found.</p>;

  return (
    <>
      <Select
        mb={5}
        value={isActiveFilter}
        onChange={(e) => setIsActiveFilter(e.target.value === 'true')}
      >
        <option value={true}>Active Employees</option>
        <option value={false}>Inactive Employees</option>
      </Select>
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
                <Button
                  colorScheme="red"
                  onClick={() => handleDeactivate(employee)}
                  disabled={employee.currentStatus}
                >
                  Deactivate
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
