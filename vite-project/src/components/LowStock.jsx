import { FiAlertTriangle } from "react-icons/fi";

function LowStock() {
  const products = [
    {
      id: 1,
      name: "سكر أبيض",
      stock: 3,
    },
    {
      id: 2,
      name: "شاي العروسة",
      stock: 5,
    },
    {
      id: 3,
      name: "نسكافيه",
      stock: 2,
    },
    {
      id: 4,
      name: "أرز الضحى",
      stock: 4,
    },
  ];

  return (
    <div className="low-stock-card">
      <div className="low-header">
        <h3>المنتجات قليلة المخزون</h3>

        <FiAlertTriangle className="warning-icon" />
      </div>

      <div className="low-list">
        {products.map((product) => (
          <div className="low-item" key={product.id}>
            <div>
              <h4>{product.name}</h4>
            </div>

            <span>{product.stock} قطع</span>
          </div>
        ))}
      </div>

      <button className="view-btn">
        عرض جميع المنتجات
      </button>
    </div>
  );
}

export default LowStock;
