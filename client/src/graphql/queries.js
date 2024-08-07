import { gql } from "@apollo/client";

export const GET_EMPLOYEES = gql`
  query GetEmployees(
    $type: String
    $isActive: Boolean
    $upcomingRetirement: Boolean
  ) {
    employees(
      type: $type
      isActive: $isActive
      upcomingRetirement: $upcomingRetirement
    ) {
      id
      firstName
      lastName
      dob
      dateOfJoining
      title
      department
      employeeType
      currentStatus
      isActive
      dateOfRetirement
    }
  }
`;

export const GET_EMPLOYEE = gql`
  query GetEmployee($id: ID!) {
    employee(id: $id) {
      id
      firstName
      lastName
      dob
      dateOfJoining
      title
      department
      employeeType
      currentStatus
      isActive
      dateOfRetirement
    }
  }
`;
                   