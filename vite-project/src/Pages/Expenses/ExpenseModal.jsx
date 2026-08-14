import "./ExpenseModal.css";

function ExpenseModal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="modal-overlay">

      <div className="expense-modal">

        <div className="expense-modal-header">

          <h2>إضافة مصروف جديد</h2>

          <button onClick={onClose}>
            ✕
          </button>

        </div>

        <div className="expense-modal-body">

          {children}

        </div>

      </div>

    </div>
  );
}

export default ExpenseModal;