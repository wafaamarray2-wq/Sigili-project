import "./EmployeeTable.css";
import { FaEdit, FaTrash } from "react-icons/fa";

function EmployeeTable({ employees, search }) {
  return (
    <div className="employee-table-container">
      <table className="employee-table">
        <thead>
          <tr>
            <th>#</th>
            <th>الاسم</th>
            <th>الوظيفة</th>
            <th>رقم الهاتف</th>
            <th>الراتب</th>
            <th>الحالة</th>
            <th>الإجراءات</th>
          </tr>
        </thead>

        <tbody>
          {employees.length > 0 ? (
            employees.map((employee, index) => (
              <tr key={employee.id}>
                <td>{index + 1}</td>

                <td>{employee.name}</td>

                <td>{employee.role}</td>

                <td>{employee.phone}</td>

                <td>{employee.salary} ج</td>

                <td>
                  <span
                    className={
                      employee.status === "نشط"
                        ? "employee-status-active"
                        : "employee-status-stop"
                    }
                  >
                    {employee.status}
                  </span>
                </td>

                <td>
                  <div className="employee-actions">
                    <button
                      className="employee-edit-btn"
                    //   onClick={() => onEdit(employee)}
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="employee-delete-btn"
                    //   onClick={() => onDelete(employee.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="employee-empty">
                لا يوجد موظفون
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;
