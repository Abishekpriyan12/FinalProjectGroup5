const Employee = require('../models/Employee');

const resolvers = {
  Query: {
    employees: async (_, { type }) => {
      if (type && type !== 'all') {
        return await Employee.find({ employeeType: type });
      }
      return await Employee.find();
    },
    employee: async (_, { id }) => await Employee.findById(id),
  },
  Mutation: {
    createEmployee: async (_, { firstName, lastName, age, dateOfJoining, title, department, employeeType }) => {
      const employee = new Employee({
        firstName,
        lastName,
        age,
        dateOfJoining,
        title,
        department,
        employeeType,
        currentStatus: true,
      });
      await employee.save();
      return employee;
    },
    updateEmployee: async (_, { id, firstName, lastName, age, dateOfJoining, title, department, employeeType, currentStatus }) => {
      const employee = await Employee.findByIdAndUpdate(
        id,
        { firstName, lastName, age, dateOfJoining, title, department, employeeType, currentStatus },
        { new: true }
      );
      return employee;
    },
    deleteEmployee: async (_, { id }) => {
      const employee = await Employee.findByIdAndDelete(id);
      return employee;
    }
  },
};

module.exports = resolvers;
