const Employee = require("../models/Employee");
const retirementAge = 65;

const calculateTimeToRetirement = (dob) => {
  const today = new Date();
  const retirementDate = new Date(dob.getFullYear() + retirementAge, dob.getMonth(), dob.getDate());
  const diffTime = Math.abs(retirementDate - today);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffYears = retirementDate.getFullYear() - today.getFullYear();
  const diffMonths = (retirementDate.getMonth() + 12 * diffYears) - today.getMonth();
  
  const timeToRetirement = {
    days: diffDays % 30,
    months: diffMonths % 12,
    years: Math.floor(diffMonths / 12),
  };

  console.log("Calculated time to retirement:", timeToRetirement);
  return timeToRetirement;
};
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

      let employees = await Employee.find(query);

      if (upcomingRetirement) {
        const today = new Date();
        const sixMonthsLater = new Date(
          today.getFullYear(),
          today.getMonth() + 6,
          today.getDate()
        );

        employees = employees.filter((employee) => {
          const dob = new Date(employee.dob);
          if (isNaN(dob.getTime())) {
            console.error("Invalid DOB for employee:", employee);
            return false;
          }

          // Calculate the exact retirement date
          const retirementDate = new Date(
            dob.getFullYear() + retirementAge,
            dob.getMonth(),
            dob.getDate()
          );
          console.log(
            `Employee: ${employee.firstName} ${
              employee.lastName
            }, Retirement Date: ${retirementDate.toISOString()}`
          );

          // Check if retirement is within the next six months
          return retirementDate >= today && retirementDate <= sixMonthsLater;
        });

        console.log("Employees retiring soon:", employees.length);
      }

      return employees;
    },
    employee: async (_, { id }) => {
      const employee = await Employee.findById(id);
      if (!employee) {
        throw new Error(`Employee with ID ${id} not found`);
      }

      
      const result = {
        id: employee._id.toString(),  
        firstName: employee.firstName,
        lastName: employee.lastName,
        dob: employee.dob.toISOString(),
        dateOfJoining: employee.dateOfJoining.toISOString(),
        title: employee.title,
        department: employee.department,
        employeeType: employee.employeeType,
        currentStatus: employee.currentStatus,
        isActive: employee.isActive,
        timeToRetirement: calculateTimeToRetirement(new Date(employee.dob))
      };

      console.log(result); 
      return result;
    },
  
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
      });
      await newEmployee.save();
      return newEmployee;
    },
    // Update an existing employee
    updateEmployee: async (
      _,
      { id, title, department, currentStatus, dob }
    ) => {
      const updateData = { title, department, currentStatus };
      if (dob) {
        const dobDate = new Date(dob);
        updateData.dob = dobDate;
      }
      return await Employee.findByIdAndUpdate(id, updateData, { new: true });
    },
    // Deactivate an employee (set isActive to false)
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
