import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { EmployeeContext } from "../App";
import toast from "react-hot-toast";

const UpdateEmployee = () => {
  const { id } = useParams();
  const { employees, designations, setEmployees } = useContext(EmployeeContext);
  const navigateTo = useNavigate();

  const [employee, setEmployee] = useState({
    id: "",
    name: "",
    email: "",
    designation: "",
    experience: "",
    gender: "",
    phone: "",
    doj: "",
  });
  const [error, setError] = useState({
    name: "",
    email: "",
    designation: "",
    experience: "",
    gender: "",
    phone: "",
    doj: "",
  });
  useEffect(() => {
    const udpateEmp = employees.filter((emp) => emp.id == id);
    setEmployee(udpateEmp[0]);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value.trimStart() });
  };

  const handleUpdate = () => {
    const err = {};

    if (
      employees.some((emp) => emp.id !== id && emp.email === employee.email)
    ) {
      err.email = "Email already exists!";
    }
    if (
      employees.some((emp) => emp.id !== id && emp.phone === employee.phone)
    ) {
      err.phone = "Mobile number already exists! ";
    }

    if (employee.name.trim() === "") {
      err.name = "Please provide your name";
    } else if (!/^[A-Za-z ]+$/.test(employee.name)) {
      err.name = "Name must contain only alphabets";
    } else if (employee.name.length < 2) {
      err.name = "Name must contain atleast 2 character";
    } else if (employee.name.length > 50) {
      err.name = "Name cannot exceed 50 characters";
    }

    if (employee.email.trim() === "") {
      err.email = "Please provide you email";
    } else if (!/^[a-z0-9-._]+@[a-z0-9-_.]+\.[a-z]{2,}$/.test(employee.email)) {
      err.email = "Please provide valid email format";
    }

    if (employee.designation === "") {
      err.designation = "Please select a designation";
    }
    if (employee.experience === "") {
      err.experience = "Please provide experience in year";
    } else if (employee.experience < 0) {
      err.experience = "Experience year cannot be less then 0";
    }
    if (employee.gender === "") {
      err.gender = "Please select gender";
    }
    if (employee.phone === "") {
      err.phone = "Please provide employee mobile number";
    } else if (!/^\d{10}$/.test(employee.phone)) {
      err.phone = "Mobile number must be of 10 digits";
    }
    if (employee.doj === "") {
      err.doj = "Please select Date of Joining";
    } else if (employee.doj > new Date().toISOString().split("T")[0]) {
      err.doj = "Date must be less than today's date";
    }
    setError({ ...err });
    if (Object.keys(err).length === 0) {
      const updatedEmployees = employees.map((emp) => {
        return emp.id == id
          ? {
              ...employee,
              name: employee.name.trim(),
              email: employee.email.trim(),
            }
          : emp;
      });
      setEmployees(updatedEmployees);
      toast.success("Employee Updated Successfully!");
      navigateTo("/");
    }
  };

  return (
    <>
      <Modal show>
        <Modal.Header>
          <Modal.Title>Update Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="name">Employee Name</Form.Label>
              <Form.Control
                type="text"
                id="name"
                name="name"
                value={employee.name}
                onChange={handleChange}
                placeholder="enter employee name"
              ></Form.Control>
              {error.name && (
                <Form.Text style={{ color: "red" }}>* {error.name}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="email">Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                id="email"
                value={employee.email}
                onChange={handleChange}
                placeholder="enter your email"
              ></Form.Control>
              {error.email && (
                <Form.Text style={{ color: "red" }}>* {error.email}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="phone">Mobile Number</Form.Label>
              <Form.Control
                type="number"
                id="phone"
                placeholder="enter mobile number"
                value={employee.phone}
                name="phone"
                onChange={handleChange}
              />
              {error.phone && (
                <Form.Text style={{ color: "red" }}>* {error.phone}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="me-4">Gender</Form.Label>
              <Form.Check
                inline
                label="Male"
                type="radio"
                name="gender"
                value="Male"
                onChange={handleChange}
                checked={employee.gender === "Male"}
                id="Male"
              />
              <Form.Check
                inline
                label="Female"
                value="Female"
                type="radio"
                onChange={handleChange}
                checked={employee.gender === "Female"}
                name="gender"
                id="Female"
              />
              {error.gender && (
                <Form.Text style={{ color: "red" }}>* {error.gender}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="designation" onChange={handleChange}>
                Designation
              </Form.Label>
              <Form.Select
                id="designation"
                value={employee.designation}
                name="designation"
                onChange={handleChange}
              >
                <option>Select Designation</option>
                {designations.map((desig) => {
                  return (
                    <option
                      key={desig}
                      value={desig}
                      // selected={employee.designation === desig}
                    >
                      {desig}
                    </option>
                  );
                })}
              </Form.Select>
              <Form.Group className="mb-2">
                <Form.Label>Date of Join</Form.Label>
                <Form.Control
                  type="date"
                  value={employee.doj}
                  name="doj"
                  max={new Date().toISOString().split("T")[0]}
                  onChange={handleChange}
                />
                {error.doj && (
                  <Form.Text style={{ color: "red" }}>* {error.doj}</Form.Text>
                )}
              </Form.Group>
              {error.designation && (
                <Form.Text style={{ color: "red" }}>
                  * {error.designation}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="experience">Experience</Form.Label>
              <Form.Control
                placeholder="experience in year"
                type="number"
                id="experience"
                name="experience"
                value={employee.experience}
                min={0}
                onChange={handleChange}
              ></Form.Control>
              {error.experience && (
                <Form.Text style={{ color: "red" }}>
                  * {error.experience}
                </Form.Text>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleUpdate}>
            Update Employee
          </Button>
          <Button variant="secondary" onClick={() => navigateTo("/")}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateEmployee;
