import React from 'react';
import { ChakraProvider, Box, Heading } from '@chakra-ui/react';
import EmployeeSearch from './EmployeeSearch';
import EmployeeTable from './EmployeeTable';
import theme from '../theme';

const EmployeeDirectory = () => (
  <ChakraProvider theme={theme}>
    <Box p={5}>
      {/* <Heading mb={5}>Employee Directory</Heading> */}
      <EmployeeSearch />
      <EmployeeTable />
    </Box>
  </ChakraProvider>
);

export default EmployeeDirectory;
