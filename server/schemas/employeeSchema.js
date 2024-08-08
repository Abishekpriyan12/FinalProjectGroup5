const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type RetirementTime {
    days: Int
    months: Int
    years: Int
  }

  type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    dob: String
    dateOfJoining: String!
    title: String!
    department: String!
    employeeType: String!
    currentStatus: Boolean!
    isActive: Boolean!
    timeToRetirement: RetirementTime
  }

  type DeleteResponse {
    success: Boolean!
    message: String!
    employee: Employee
  }

  type Query {
    employees(
      type: String
      isActive: Boolean
      upcomingRetirement: Boolean
    ): [Employee]
    employee(id: ID!): Employee
  }

  type Mutation {
    createEmployee(
      firstName: String!
      lastName: String!
      dob: String
      dateOfJoining: String!
      title: String!
      department: String!
      employeeType: String!
      currentStatus: Boolean!
    ): Employee

    updateEmployee(
      id: ID!
      title: String
      department: String
      currentStatus: Boolean!
      dob: String
    ): Employee

    deactivateEmployee(id: ID!): DeleteResponse
  }
`;

module.exports = typeDefs;
