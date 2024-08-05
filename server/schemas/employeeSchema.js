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
  }

  type Query {
    employees(type: String, searchTerm: String): [Employee]
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
      currentStatus: Boolean
    ): Employee

    updateEmployee(
      id: ID!,
      title: String,
      department: String,
      currentStatus: Boolean
    ): Employee

    deleteEmployee(id: ID!): Employee
  }
`;

module.exports = typeDefs;
