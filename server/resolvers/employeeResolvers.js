const Employee = require('../models/Employee');

const resolvers = {
  Query: {
    employees: async (_, { type, isActive }) => {
      let query = {};
      if (type && type !== 'all') {
        query.employeeType = type;
      }
      if (isActive !== undefined) {
        query.isActive = isActive;
      }
      return await Employee.find(query);
    },
    employee: async (_, { id }) => await Employee.findById(id),
  },
  Mutation: {
    createEmployee: async (_, { firstName, lastName, age, dateOfJoining, title, department, employeeType, currentStatus }) => {
      const newEmployee = new Employee({
        firstName,
        lastName,
        age,
        dateOfJoining,
        title,
        department,
        employeeType,
        currentStatus,
        isActive: true  
      });
      await newEmployee.save();
      return newEmployee;
    },
    updateEmployee: async (_, { id, title, department, currentStatus }) => {
      return await Employee.findByIdAndUpdate(id, { title, department, currentStatus }, { new: true });
    },
    deactivateEmployee: async (_, { id }) => {
      const employee = await Employee.findById(id);
      if (!employee) {
        return {
          success: false,
          message: "Employee not found",
          employee: null
        };
      }
      if (employee.currentStatus) {
        return {
          success: false,
          message: "Active employees cannot be deactivated",
          employee
        };
      }
      employee.isActive = false;
      await employee.save();
      return {
        success: true,
        message: "Employee deactivated successfully",
        employee
      };
    }
  }
};

module.exports = resolvers;
