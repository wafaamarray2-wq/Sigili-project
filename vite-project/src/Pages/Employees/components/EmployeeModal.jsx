import "./EmployeeModal.css";
import EmployeeForm from "./EmployeeForm";

function EmployeeModal({
  open,
  onClose,
  onAdd,
  onUpdate,
  editingEmployee,
}) {

  if (!open) return null;

  const isEditing = !!editingEmployee;

  return (
    <div className="employee-modal-overlay">

      <div className="employee-modal">

        <div className="employee-modal-header">

          <h2>
            {isEditing
              ? "تعديل بيانات الموظف"
              : "إضافة موظف"}
          </h2>

          <button
            className="employee-close-btn"
            onClick={onClose}
          >
            ✕
          </button>

        </div>

        <div className="employee-modal-body">

          <EmployeeForm
            onClose={onClose}
            onAdd={onAdd}
            onUpdate={onUpdate}
            editingEmployee={editingEmployee}
          />

        </div>

      </div>

    </div>
  );
}

export default EmployeeModal;