import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Box, Input, Button, Select, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import { CREATE_EMPLOYEE } from '../graphql/mutations';
import { GET_EMPLOYEES } from '../graphql/queries';
import { useNavigate } from 'react-router-dom';
import './EmployeeCreate.css';

const EmployeeCreate = () => {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    age: '',
    dateOfJoining: '',
    title: 'Employee',
    department: 'IT',
    employeeType: 'FullTime',
  });

  const [errors, setErrors] = useState({});
  const [createEmployee] = useMutation(CREATE_EMPLOYEE, {
    update(cache, { data: { createEmployee } }) {
      const { employees } = cache.readQuery({ query: GET_EMPLOYEES });
      cache.writeQuery({
        query: GET_EMPLOYEES,
        data: { employees: [...employees, createEmployee] },
      });
    }
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: name === "dateOfJoining" ? new Date(value).toISOString() : value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formState.firstName) newErrors.firstName = 'First name is required';
    if (!formState.lastName) newErrors.lastName = 'Last name is required';
    if (!formState.age) newErrors.age = 'Age is required';
    if (formState.age < 20 || formState.age > 70) newErrors.age = 'Age must be between 20 and 70';
    if (!formState.dateOfJoining) newErrors.dateOfJoining = 'Date of joining is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    await createEmployee({ variables: { ...formState, age: parseInt(formState.age) } });
    setFormState({
      firstName: '',
      lastName: '',
      age: '',
      dateOfJoining: '',
      title: 'Employee',
      department: 'IT',
      employeeType: 'FullTime',
    });
    navigate('/employees/all'); // Redirect to the employee list page on successful creation
  };

  return (
    <Box bg="white" p={8} borderRadius="md" boxShadow="lg" maxWidth="500px" mx="auto" mt={10}>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4} isInvalid={errors.firstName}>
          <FormLabel>First Name</FormLabel>
          <Input name="firstName" value={formState.firstName} onChange={handleInputChange} />
          <FormErrorMessage>{errors.firstName}</FormErrorMessage>
        </FormControl>
        <FormControl mb={4} isInvalid={errors.lastName}>
          <FormLabel>Last Name</FormLabel>
          <Input name="lastName" value={formState.lastName} onChange={handleInputChange} />
          <FormErrorMessage>{errors.lastName}</FormErrorMessage>
        </FormControl>
        <FormControl mb={4} isInvalid={errors.age}>
          <FormLabel>Age</FormLabel>
          <Input name="age" value={formState.age} onChange={handleInputChange} type="number" min="20" max="70" />
          <FormErrorMessage>{errors.age}</FormErrorMessage>
        </FormControl>
        <FormControl mb={4} isInvalid={errors.dateOfJoining}>
          <FormLabel>Date of Joining</FormLabel>
          <Input name="dateOfJoining" value={formState.dateOfJoining} onChange={handleInputChange} type="date" />
          <FormErrorMessage>{errors.dateOfJoining}</FormErrorMessage>
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Title</FormLabel>
          <Select name="title" value={formState.title} onChange={handleInputChange}>
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="Director">Director</option>
            <option value="VP">VP</option>
          </Select>
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Department</FormLabel>
          <Select name="department" value={formState.department} onChange={handleInputChange}>
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
          </Select>
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Employee Type</FormLabel>
          <Select name="employeeType" value={formState.employeeType} onChange={handleInputChange}>
            <option value="FullTime">FullTime</option>
            <option value="PartTime">PartTime</option>
            <option value="Contract">Contract</option>
            <option value="Seasonal">Seasonal</option>
          </Select>
        </FormControl>
        <Button colorScheme="red" type="submit">
          Save
        </Button>
      </form>
    </Box>
  );
};

export default EmployeeCreate;
