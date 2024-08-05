import React from 'react';
import { Box, Input, Button } from '@chakra-ui/react';

const EmployeeSearch = () => (
  <Box mb={5}>
    <Input placeholder="Search Employees..." mb={3} />
    <Button colorScheme="red">Search</Button>
  </Box>
);

export default EmployeeSearch;
