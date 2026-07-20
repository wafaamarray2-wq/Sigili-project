import "./ProductModal.css";

function ProductModal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="modal-overlay">

      <div className="modal-box">

        <div className="modal-header">

          <h2>إضافة منتج جديد</h2>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ✕
          </button>

        </div>

        <div className="modal-body">

          {children}

        </div>

      </div>

    </div>
  );
}

export default ProductModal;