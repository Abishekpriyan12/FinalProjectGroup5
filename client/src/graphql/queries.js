import { gql } from '@apollo/client';

export const GET_EMPLOYEES = gql`
  query GetEmployees($type: String, $isActive: Boolean) {
    employees(type: $type, isActive: $isActive) {
      id
      firstName
      lastName
      age
      dateOfJoining
      title
      department
      employeeType
      currentStatus
      isActive
    }
  }
`;

export const GET_EMPLOYEE = gql`
  query GetEmployee($id: ID!) {
    employee(id: $id) {
      id
      firstName
      lastName
      age
      dateOfJoining
      title
      department
      employeeType
      currentStatus
      isActive
    }
  }
`;
