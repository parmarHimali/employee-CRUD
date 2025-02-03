import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { EmployeeContext } from "../App";
import toast from "react-hot-toast";

const AddEmployee = ({ showAdd, setShowAdd, setEmployees, employees }) => {
  const [uniqId, setUniqId] = useState(employees.length + 1);
  const handleClose = () => {
    setShowAdd(false);
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [experience, setExperiece] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [doj, setdoj] = useState("");

  const [error, setError] = useState({
    name: "",
    email: "",
    designation: "",
    experience: "",
    gender: "",
    phone: "",
    doj: "",
  });
  const { designations } = useContext(EmployeeContext);

  const handleAddEmployee = (e) => {
    e.preventDefault();

    const err = {};

    if (employees.some((employee) => employee.email === email)) {
      err.email = "Email already exists!";
    }
    if (employees.some((employee) => employee.phone == phone)) {
      err.phone = "Mobile number already exists! ";
    }
    if (name === "") {
      err.name = "Please provide your name";
    } else if (!/^[A-Za-z ]+$/.test(name)) {
      err.name = "Name must contain only alphabets";
    }
    if (email === "") {
      err.email = "Please provide you email";
    } else if (!/^[a-z0-9-._]+@[a-z0-9-_.]+\.[a-z]{2,}$/.test(email)) {
      err.email = "Please provide valid email format";
    }

    if (designation === "") {
      err.designation = "Please select a designation";
    }
    if (experience === "") {
      err.experience = "Please provide experience in year";
    } else if (experience < 0) {
      err.experience = "Experience year cannot be less then 0";
    }
    if (gender === "") {
      err.gender = "Please select gender";
    }
    if (phone === "") {
      err.phone = "Please provide employee mobile number";
    } else if (!/^\d{10}$/.test(phone)) {
      err.phone = "Mobile number must be of 10 digits";
    }

    if (doj === "") {
      err.doj = "Please select Date of Join";
    } else if (doj > new Date().toISOString().split("T")[0]) {
      err.doj = "Date must be less than today's date";
    }

    setError({ ...err });

    if (Object.keys(err).length === 0) {
      setEmployees([
        ...employees,
        {
          id: `EMP_${name[0]}${name[1]}${Math.floor(Math.random() * 1000)}`,
          name,
          email,
          designation,
          experience,
          gender,
          phone,
          doj,
        },
      ]);
      toast.success("Employee Added successfully!");
      setUniqId((prev) => prev + 1);
      setName("");
      setEmail("");
      setDesignation("");
      setExperiece("");
      setdoj("");
      setPhone("");
      setGender("");
      handleClose();
    }
  };

  return (
    <>
      <Modal show={showAdd} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4">
          <Form noValidate autoComplete="off">
            <Form.Group className="mb-2">
              <Form.Label htmlFor="name">Employee Name</Form.Label>
              <Form.Control
                type="text"
                id="name"
                placeholder="enter employee name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {error.name && (
                <Form.Text style={{ color: "red" }}>* {error.name}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="email">Email Address</Form.Label>
              <Form.Control
                type="email"
                id="email"
                placeholder="enter employee email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error.email && (
                <Form.Text style={{ color: "red", display: "block" }}>
                  * {error.email}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="phone">Mobile Number</Form.Label>
              <Form.Control
                type="number"
                id="phone"
                placeholder="enter mobile number"
                value={phone}
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
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
                onChange={(e) => setGender(e.target.value)}
                id="Male"
              />
              <Form.Check
                inline
                label="Female"
                value="Female"
                type="radio"
                onChange={(e) => setGender(e.target.value)}
                name="gender"
                id="Female"
              />
              {error.gender && (
                <Form.Text style={{ color: "red" }}>* {error.gender}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="designation">Designation</Form.Label>
              <Form.Select
                id="designation"
                onChange={(e) => setDesignation(e.target.value)}
              >
                <option>Select Designation</option>

                {designations.map((desig) => {
                  return (
                    <option key={desig} value={desig}>
                      {desig}
                    </option>
                  );
                })}
              </Form.Select>
              {error.designation && (
                <Form.Text style={{ color: "red" }}>
                  * {error.designation}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date of Join</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setdoj(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
              />
              {error.doj && (
                <Form.Text style={{ color: "red" }}>* {error.doj}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="experience">Experience</Form.Label>
              <Form.Control
                placeholder="experience in year"
                type="number"
                id="experience"
                value={experience}
                onChange={(e) => setExperiece(e.target.value)}
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
          <Button onClick={handleAddEmployee} variant="success">
            Add Employee
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddEmployee;
