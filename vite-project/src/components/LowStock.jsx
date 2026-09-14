import { useEffect, useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";

function LowStock() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const savedProducts =
      JSON.parse(localStorage.getItem("products")) || [];

    const lowStockProducts = savedProducts.filter(
      (product) => Number(product.quantity) <= 5
    );

    setProducts(lowStockProducts);
  }, []);

  return (
    <div className="low-stock-card">
      <div className="low-header">
        <h3>المنتجات قليلة المخزون</h3>

        <FiAlertTriangle className="warning-icon" />
      </div>

      <div className="low-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="low-item" key={product.id}>
              <h4>{product.name}</h4>

              <span>{product.quantity} قطع</span>
            </div>
          ))
        ) : (
          <p>لا توجد منتجات قليلة المخزون 🎉</p>
        )}
      </div>

      <button className="view-btn">
        عرض جميع المنتجات
      </button>
    </div>
  );
}

export default LowStock;