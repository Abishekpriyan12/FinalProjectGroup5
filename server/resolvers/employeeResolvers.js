const Employee = require('../models/Employee');

const resolvers = {
  Query: {
    employees: async (_, { type, filterRetirement }) => {
      let query = {};
      if (type && type !== 'all') {
        query.employeeType = type;
      }
      if (filterRetirement) {
        const sixMonthsAhead = new Date(new Date().setMonth(new Date().getMonth() + 6));
        query.retirementDate = { $lt: sixMonthsAhead.toISOString() };
      }
      return await Employee.find(query);
    },
    employee: async (_, { id }) => await Employee.findById(id),
  },
  Mutation: {
    createEmployee: async (_, { firstName, lastName, age, dateOfJoining, title, department, employeeType, currentStatus = true }) => {
      // Default currentStatus to true if not provided
      const newEmployee = new Employee({
        firstName,
        lastName,
        age,
        dateOfJoining,
        title,
        department,
        employeeType,
        currentStatus,
        retirementDate: new Date(new Date(dateOfJoining).setFullYear(new Date(dateOfJoining).getFullYear() + 65 - age)).toISOString()
      });
      await newEmployee.save();
      return newEmployee;
    },
    updateEmployee: async (_, { id, title, department, currentStatus }) => {
      // Ensures that all fields are treated properly and currentStatus is not accidentally set to undefined
      const updateData = { title, department };
      if (currentStatus !== undefined) {
        updateData.currentStatus = currentStatus;
      }
      const updatedEmployee = await Employee.findByIdAndUpdate(id, updateData, { new: true });
      return updatedEmployee;
    },
    deleteEmployee: async (_, { id }) => {
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
          message: "CAN'T DELETE EMPLOYEE – STATUS ACTIVE",
          employee: null
        };
      }
      await Employee.findByIdAndDelete(id);
      return {
        success: true,
        message: "Employee deleted successfully",
        employee
      };
    }
    
  }
};

module.exports = resolvers;
