const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    age: Int!
    dateOfJoining: String!
    title: String!
    department: String!
    employeeType: String!
    currentStatus: Boolean!
    isActive: Boolean!
  }

  type DeleteResponse {
    success: Boolean!
    message: String!
    employee: Employee
  }

  type Query {
    employees(type: String, isActive: Boolean): [Employee]
    employee(id: ID!): Employee
  }

  type Mutation {
    createEmployee(
      firstName: String!,
      lastName: String!,
      age: Int!,
      dateOfJoining: String!,
      title: String!,
      department: String!,
      employeeType: String!,
      currentStatus: Boolean!
    ): Employee

    updateEmployee(
      id: ID!,
      title: String,
      department: String,
      currentStatus: Boolean!
    ): Employee

    deactivateEmployee(id: ID!): DeleteResponse
  }
`;

module.exports = typeDefs;
