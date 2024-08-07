const Employee = require("../models/Employee");

const resolvers = {
  Query: {
    employees: async (_, { type, isActive, upcomingRetirement }) => {
      let query = {};
      if (type && type !== "all") {
        query.employeeType = type;
      }
      if (isActive !== undefined) {
        query.isActive = isActive;
      }
      if (upcomingRetirement) {
        const today = new Date();
        const sixMonthsLater = new Date();
        sixMonthsLater.setMonth(today.getMonth() + 6); // Correct way to set 6 months ahead
        query.dateOfRetirement = { $lte: sixMonthsLater };
      }
      return await Employee.find(query);
    },
    employee: async (_, { id }) => await Employee.findById(id),
  },
  Mutation: {
    createEmployee: async (
      _,
      {
        firstName,
        lastName,
        dob,
        dateOfJoining,
        title,
        department,
        employeeType,
        currentStatus,
      }
    ) => {
      const retirementAge = 65;
      const dateOfBirth = new Date(dob);
      const dateOfRetirement = new Date(
        dateOfBirth.setFullYear(dateOfBirth.getFullYear() + retirementAge)
      );

      const newEmployee = new Employee({
        firstName,
        lastName,
        dob,
        dateOfJoining,
        title,
        department,
        employeeType,
        currentStatus,
        isActive: true,
        dateOfRetirement,
      });
      await newEmployee.save();
      return newEmployee;
    },
    updateEmployee: async (
      _,
      { id, title, department, currentStatus, dob }
    ) => {
      const updateData = { title, department, currentStatus };
      if (dob) {
        const retirementAge = 65;
        const dateOfBirth = new Date(dob);
        updateData.dateOfRetirement = new Date(
          dateOfBirth.setFullYear(dateOfBirth.getFullYear() + retirementAge)
        );
      }
      return await Employee.findByIdAndUpdate(id, updateData, { new: true });
    },
    deactivateEmployee: async (_, { id }) => {
      const employee = await Employee.findById(id);
      if (!employee) {
        return {
          success: false,
          message: "Employee not found",
          employee: null,
        };
      }
      if (employee.currentStatus) {
        return {
          success: false,
          message: "Active employees cannot be deactivated",
          employee,
        };
      }
      employee.isActive = false;
      await employee.save();
      return {
        success: true,
        message: "Employee deactivated successfully",
        employee,
      };
    },
  },
};

module.exports = resolvers;
