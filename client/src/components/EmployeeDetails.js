import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { GET_EMPLOYEE } from '../graphql/queries';
import { DEACTIVATE_EMPLOYEE } from '../graphql/mutations'; 
import { Box, Heading, Text, Button, Flex } from '@chakra-ui/react';

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_EMPLOYEE, {
    variables: { id },
  });
  const [deactivateEmployee] = useMutation(DEACTIVATE_EMPLOYEE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const employee = data.employee;

  const handleDeactivate = async () => {
    await deactivateEmployee({ variables: { id: employee.id } });
    navigate('/'); // Redirect to the homepage or employee list after operation
  };

  const handleEdit = () => {
    navigate(`/employee/edit/${employee.id}`);
  };

  return (
    <Box p={4}>
      <Heading as="h2" size="lg" mb={4}>
        Employee Details
      </Heading>
      <Text><strong>First Name:</strong> {employee.firstName}</Text>
      <Text><strong>Last Name:</strong> {employee.lastName}</Text>
      <Text><strong>Age:</strong> {employee.age}</Text>
      <Text><strong>Date of Joining:</strong> {new Date(employee.dateOfJoining).toLocaleDateString()}</Text>
      <Text><strong>Title:</strong> {employee.title}</Text>
      <Text><strong>Department:</strong> {employee.department}</Text>
      <Text><strong>Employee Type:</strong> {employee.employeeType}</Text>
      <Text><strong>Status:</strong> {employee.currentStatus ? 'Working' : 'Retired'}</Text>
      <Flex mt={4}>
        <Button colorScheme="blue" onClick={handleEdit} mr={2}>
          Edit
        </Button>
        <Button colorScheme="red" onClick={handleDeactivate}>
          {employee.currentStatus ? 'Deactivate' : 'Already Inactive'}
        </Button>
      </Flex>
    </Box>
  );
};

export default EmployeeDetails;
