import  "./EmployeeStats.css";

import {
  FaUsers,
  FaUserCheck,
  FaUserSlash,
  FaCashRegister,
} from "react-icons/fa";
 
function EmployeeStats({ employees }) {
  const totalEmployees = employees.length;

  const activeEmployees = employees.filter(
    (emp) => emp.status === "نشط"
  ).length;

  const inactiveEmployees = employees.filter(
    (emp) => emp.status === "موقوف"
  ).length;

  const cashierEmployees = employees.filter(
    (emp) => emp.role === "كاشير"
  ).length;

  return (
    <div className="employee-stats-section">

      <div className="employee-stat-card">

        <div className="employee-stat-content">
          <span className="employee-stat-title">
            عدد الموظفين
          </span>

          <h2 className="employee-stat-value">
            {totalEmployees}
          </h2>
        </div>

        <div className="employee-stat-icon employee-total">
          <FaUsers />
        </div>

      </div>

      <div className="employee-stat-card">

        <div className="employee-stat-content">
          <span className="employee-stat-title">
            الموظفون النشطون
          </span>

          <h2 className="employee-stat-value">
            {activeEmployees}
          </h2>
        </div>

        <div className="employee-stat-icon employee-active">
          <FaUserCheck />
        </div>

      </div>

      <div className="employee-stat-card">

        <div className="employee-stat-content">
          <span className="employee-stat-title">
            الموظفون الموقوفون
          </span>

          <h2 className="employee-stat-value">
            {inactiveEmployees}
          </h2>
        </div>

        <div className="employee-stat-icon employee-inactive">
          <FaUserSlash />
        </div>

      </div>

      <div className="employee-stat-card">

        <div className="employee-stat-content">
          <span className="employee-stat-title">
            الكاشير
          </span>

          <h2 className="employee-stat-value">
            {cashierEmployees}
          </h2>
        </div>

        <div className="employee-stat-icon employee-cashier">
          <FaCashRegister />
        </div>

      </div>

    </div>
  );
}

export default EmployeeStats;