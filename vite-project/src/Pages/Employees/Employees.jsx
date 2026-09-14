import { useEffect, useRef, useState } from "react";

import "./Employees.css";

import EmployeeStats from "./components/EmployeeStats";
import EmployeeSearch from "./components/EmployeeSearch";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeModal from "./components/EmployeeModal";
import { getEmployees, saveEmployees } from "../../storage/employeeStorage";
function Employees() {
 const [employees, setEmployees] = useState(() => getEmployees());

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editingEmployee, setEditingEmployee] = useState(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
  if (isFirstRender.current) {
    isFirstRender.current = false;
    return;
  }

  saveEmployees(employees);
}, [employees]);

  // =========================
  // إضافة موظف
  // =========================



  const handleAddEmployee = (employeeData) => {
    const newEmployee = {
      id: Date.now(),
      name: employeeData.name,
      phone: employeeData.phone,
      role: employeeData.position,
      salary: employeeData.salary,
      email: employeeData.email,
      status: employeeData.status,

      // بيانات تسجيل الدخول
      username: employeeData.username,
      password: employeeData.password,
      accountRole: employeeData.role,
    };

    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);

    setShowModal(false);
  };

  // =========================
  // فتح التعديل
  // =========================

  const handleEdit = (employee) => {
    setEditingEmployee(employee);

    setShowModal(true);
  };

  // =========================
  // حفظ التعديل
  // =========================

  const handleUpdateEmployee = (employeeData) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.id === editingEmployee.id
          ? {
              ...employee,

              name: employeeData.name,

              phone: employeeData.phone,

              role: employeeData.position,

              salary: employeeData.salary,

              email: employeeData.email,

              status: employeeData.status,
              username: employeeData.username,
              password: employeeData.password,
              accountRole: employeeData.role,
            }
          : employee,
      ),
    );

    setEditingEmployee(null);

    setShowModal(false);
  };

  // =========================
  // حذف موظف
  // =========================

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("هل أنت متأكد من حذف هذا الموظف؟");

    if (!confirmDelete) return;

    setEmployees((prevEmployees) =>
      prevEmployees.filter((employee) => employee.id !== id),
    );
  };

  // =========================
  // إغلاق الـ Modal
  // =========================

  const handleCloseModal = () => {
    setShowModal(false);

    setEditingEmployee(null);
  };

  return (
    <div className="employees-page">
      <EmployeeStats employees={employees} />

      <EmployeeSearch
        search={search}
        setSearch={setSearch}
        onAdd={() => {
          setEditingEmployee(null);
          setShowModal(true);
        }}
      />

      <EmployeeTable
        employees={employees}
        search={search}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <EmployeeModal
        open={showModal}
        onClose={handleCloseModal}
        onAdd={handleAddEmployee}
        onUpdate={handleUpdateEmployee}
        editingEmployee={editingEmployee}
      />
    </div>
  );
}

export default Employees;
