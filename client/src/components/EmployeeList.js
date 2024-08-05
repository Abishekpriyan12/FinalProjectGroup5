import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Table, Thead, Tbody, Tr, Th, Td, Select } from '@chakra-ui/react';
import { GET_EMPLOYEES } from '../graphql/queries';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeList = () => {
  const { type } = useParams(); 
  const { loading, error, data, refetch } = useQuery(GET_EMPLOYEES, {
    variables: { type: type === 'all' ? null : type }, 
  });
  const navigate = useNavigate();

  useEffect(() => {
    refetch(); 
  }, [type, refetch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    navigate(`/employees/${value}`);
  };

  return (
    <>
      <Select mb={5} value={type || 'all'} onChange={handleFilterChange}>
        <option value="all">All Employees</option>
        <option value="FullTime">FullTime</option>
        <option value="PartTime">PartTime</option>
        <option value="Contract">Contract</option>
        <option value="Seasonal">Seasonal</option>
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
          </Tr>
        </Thead>
        <Tbody>
          {data.employees.map((employee) => (
            <Tr key={employee.id}>
              <Td>{employee.firstName}</Td>
              <Td>{employee.lastName}</Td>
              <Td>{employee.age}</Td>
              <Td>{new Date (parseInt(employee.dateOfJoining)).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</Td>
              <Td>{employee.title}</Td>
              <Td>{employee.department}</Td>
              <Td>{employee.employeeType}</Td>
              <Td>{employee.currentStatus ? '1' : '0'}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export default EmployeeList;
