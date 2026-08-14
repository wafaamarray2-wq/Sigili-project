import "./EmployeeModal.css";

function EmployeeModal({ open, onClose }) {

  if (!open) return null;

  return (

    <div className="employee-modal-overlay">

      <div className="employee-modal">

        <div className="employee-modal-header">

          <h2>إضافة موظف</h2>

          <button
            className="employee-close-btn"
            onClick={onClose}
          >
            ✕
          </button>

        </div>

        <div className="employee-modal-body">

        </div>

      </div>

    </div>

  );

}

export default EmployeeModal;