import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import AddEmployee from "./AddEmployee";
import { useNavigate } from "react-router-dom";
import { EmployeeContext } from "../App";
import { IoPersonAdd } from "react-icons/io5";
import { MdOutlineEdit, MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
const EmployeeList = () => {
  const { employees, setEmployees } = useContext(EmployeeContext);
  const [showAdd, setShowAdd] = useState(false);
  const navigateTo = useNavigate();

  useEffect(() => {
    const storedEmp = JSON.parse(localStorage.getItem("employees") || []);
    setEmployees(storedEmp);
  }, []);
  const handleShowUpdate = (id) => {
    navigateTo(`/update/${id}`);
  };
  const handleDelete = (id) => {
    const isDelete = confirm("Are you sure to delete the employee??");
    if (isDelete) {
      setEmployees(employees.filter((emp) => emp.id !== id));
      toast.success("employee deleted successfully!");
    }
  };
  return (
    <Container>
      <div className="d-flex flex-column flex-md-row justify-content-between w-100 align-items-center my-3">
        <h2 className="">Employee List</h2>
        <div className="">
          <Button
            variant="primary"
            className=" d-flex align-items-center"
            onClick={() => setShowAdd(true)}
          >
            <span className="me-2">Add Employee</span>
            <IoPersonAdd />
          </Button>
        </div>
      </div>
      <AddEmployee
        showAdd={showAdd}
        setShowAdd={setShowAdd}
        setEmployees={setEmployees}
        employees={employees}
      />

      <Table
        bordered
        hover
        striped
        responsive
        variant="light"
        className="text-center"
      >
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Contact Number</th>
            <th>Designation</th>
            <th>Date of Joining</th>
            <th>Experience</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            [...employees].reverse().map((employee) => {
              return (
                <tr key={employee.id}>
                  {/* <td>{employee.id}</td> */}
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.gender}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.designation}</td>
                  <td>{employee.doj}</td>
                  <td>
                    {employee.experience}{" "}
                    {employee.experience == 1 || employee.experience == 0
                      ? "Year"
                      : "Years"}
                  </td>
                  <td>
                    <Button
                      variant="dark"
                      className="me-2 d-inline-flex align-items-center"
                      onClick={() => handleShowUpdate(employee.id)}
                    >
                      <span className="me-1">Edit</span>
                      <MdOutlineEdit />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(employee.id)}
                    >
                      <MdDelete />
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={8}>No Employees found!</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default EmployeeList;
