import { FaEdit, FaTrash } from "react-icons/fa";

function EmployeeRow({
  employee,
  index,
  onEdit,
  onDelete,
}) {
  return (
    <tr>

      <td>{index + 1}</td>

      <td>{employee.name}</td>

      <td>{employee.role}</td>

      <td>{employee.phone}</td>

      <td>{employee.email}</td>

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
            onClick={() => onEdit(employee)}
          >
            <FaEdit />
          </button>

          <button
            className="employee-delete-btn"
            onClick={() => onDelete(employee.id)}
          >
            <FaTrash />
          </button>

        </div>
      </td>

    </tr>
  );
}

export default EmployeeRow;