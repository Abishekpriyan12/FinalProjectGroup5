import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useToast,
  Select,
} from "@chakra-ui/react";
import { GET_EMPLOYEES } from "../graphql/queries";
import { DEACTIVATE_EMPLOYEE } from "../graphql/mutations";
import { Link } from "react-router-dom";
import EmployeeUpdateModal from "./EmployeeUpdateModal";

// Helper function to calculate age
function calculateAge(dob) {
  if (!dob) {
    console.log("DOB is undefined or null");
    return "N/A"; // Handle undefined or null DOB
  }

  const birthday = new Date(parseInt(dob)); // Use parseInt to ensure the dob is a number
  if (isNaN(birthday.getTime())) {
    console.log(`Invalid DOB: ${dob}`);
    return "Invalid DOB"; // Handle invalid DOB
  }

  const today = new Date();
  let age = today.getFullYear() - birthday.getFullYear();
  const m = today.getMonth() - birthday.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
    age--;
  }

  return age;
}
const EmployeeTable = () => {
  const [filter, setFilter] = useState({
    isActive: true,
    upcomingRetirement: false,
    employeeType: "",
  });

  const { loading, error, data, refetch } = useQuery(GET_EMPLOYEES, {
    variables: filter,
  });

  // Console log to inspect the data and filter
  console.log("Employee Data:", data);
  console.log("Current Filters:", filter);

  const toast = useToast();
  const [deactivateEmployee] = useMutation(DEACTIVATE_EMPLOYEE, {
    onCompleted: (data) => {
      if (data.deactivateEmployee.success) {
        toast({
          title: "Employee deactivated.",
          description: data.deactivateEmployee.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        refetch();
      } else {
        toast({
          title: "Operation failed",
          description: data.deactivateEmployee.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    },
  });
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const handleDeactivate = (employee) => {
    deactivateEmployee({ variables: { id: employee.id } });
  };

  const openUpdateModal = (id) => {
    setSelectedEmployeeId(id);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedEmployeeId(null);
  };

  const handleFilterChange = (name, value) => {
    const booleanValue = value === "true"; // Convert string to Boolean
    setFilter((prev) => ({ ...prev, [name]: booleanValue }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.employees) return <p>No data found.</p>;

  return (
    <>
      <Select
        placeholder="Select status"
        value={filter.isActive.toString()}
        onChange={(e) => handleFilterChange("isActive", e.target.value)}
      >
        <option value="true">Active Employees</option>
        <option value="false">Inactive Employees</option>
      </Select>
      <Select
        placeholder="Retirement filter"
        value={filter.upcomingRetirement.toString()}
        onChange={(e) =>
          handleFilterChange("upcomingRetirement", e.target.value)
        }
      >
        <option value="false">All Employees</option>
        <option value="true">Upcoming Retirement</option>
      </Select>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th>Age</Th>
            <Th>Date of Joining</Th>
            <Th>Title</Th>
            <Th>Department</Th>
            <Th>Employee Type</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.employees.map((employee) => (
            <Tr key={employee.id}>
              <Td>{employee.firstName}</Td>
              <Td>{employee.lastName}</Td>
              <Td>{calculateAge(employee.dob)}</Td>
              <Td>
                {new Date(parseInt(employee.dateOfJoining)).toLocaleDateString(
                  "en-US",
                  { year: "numeric", month: "short", day: "numeric" }
                )}
              </Td>
              <Td>{employee.title}</Td>
              <Td>{employee.department}</Td>
              <Td>{employee.employeeType}</Td>
              <Td>{employee.currentStatus ? "Working" : "Retired"}</Td>
              <Td>
                <Button
                  as={Link}
                  to={`/employee/${employee.id}`}
                  colorScheme="blue"
                  mr={2}
                >
                  Details
                </Button>
                <Button
                  colorScheme="yellow"
                  onClick={() => openUpdateModal(employee.id)}
                  mr={2}
                >
                  Edit
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => handleDeactivate(employee)}
                  disabled={!employee.currentStatus}
                >
                  Deactivate
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {isUpdateModalOpen && (
        <EmployeeUpdateModal
          employeeId={selectedEmployeeId}
          onClose={closeUpdateModal}
        />
      )}
    </>
  );
};

export default EmployeeTable;
