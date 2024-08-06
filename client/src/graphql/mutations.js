import { gql } from '@apollo/client';

export const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee(
    $firstName: String!,
    $lastName: String!,
    $age: Int!,
    $dateOfJoining: String!,
    $title: String!,
    $department: String!,
    $employeeType: String!,
    $currentStatus: Boolean!
  ) {
    createEmployee(
      firstName: $firstName,
      lastName: $lastName,
      age: $age,
      dateOfJoining: $dateOfJoining,
      title: $title,
      department: $department,
      employeeType: $employeeType,
      currentStatus: $currentStatus
    ) {
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

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee(
    $id: ID!,
    $title: String,
    $department: String,
    $currentStatus: Boolean!
  ) {
    updateEmployee(
      id: $id,
      title: $title,
      department: $department,
      currentStatus: $currentStatus
    ) {
      id
      title
      department
      currentStatus
    }
  }
`;

export const DEACTIVATE_EMPLOYEE = gql`
  mutation DeactivateEmployee($id: ID!) {
    deactivateEmployee(id: $id) {
      success
      message
      employee {
        id
        currentStatus
        isActive
      }
    }
  }
`;
  