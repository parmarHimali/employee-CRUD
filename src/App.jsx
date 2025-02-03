import EmployeeList from "./components/EmployeeList";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import UpdateEmployee from "./components/UpdateEmployee";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
export const EmployeeContext = React.createContext([]);
function App() {
  const storedEmp = JSON.parse(localStorage.getItem("employees"));
  const [employees, setEmployees] = useState(
    storedEmp.length > 0 ? storedEmp : []
  );

  const designations = [
    "HR",
    "Manager",
    "Frontend developer",
    "Backend developer",
    "Fullstack developer",
    "Trainee",
    "Accountant",
  ];
  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);
  return (
    <>
      <EmployeeContext.Provider
        value={{ employees, setEmployees, designations }}
      >
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/update/:id" element={<UpdateEmployee />} />
        </Routes>
        <Toaster />
      </EmployeeContext.Provider>
    </>
  );
}

export default App;
