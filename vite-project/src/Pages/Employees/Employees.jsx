import { useState } from "react";

import "./Employees.css";

import EmployeeStats from "./components/EmployeeStats";
import EmployeeSearch from "./components/EmployeeSearch"
import EmployeeTable from "./components/EmployeeTable"
import EmployeeModal from "./components/EmployeeModal"
function Employees() {

  const [employees, setEmployees] = useState([]);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  return (

    <div className="employees-page">

      <EmployeeStats employees={employees} />

      <EmployeeSearch
        search={search}
        setSearch={setSearch}
        onAdd={() => setShowModal(true)}
      />

      <EmployeeTable
        employees={employees}
        search={search}
      />

      <EmployeeModal
        open={showModal}
        onClose={() => setShowModal(false)}
      />

    </div>

  );
}

export default Employees;