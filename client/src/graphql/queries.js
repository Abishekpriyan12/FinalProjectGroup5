import { gql } from '@apollo/client';

export const GET_EMPLOYEES = gql`
  query GetEmployees($type: String) {
    employees(type: $type) {
      id
      firstName
      lastName
      age
      dateOfJoining
      title
      department
      employeeType
      currentStatus
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
    }
  }
`;
