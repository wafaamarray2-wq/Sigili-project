import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
function RecentSales() {
  const navigate = useNavigate();
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const savedSales = JSON.parse(localStorage.getItem("sales")) || [];

    const recentSales = savedSales.slice().reverse().slice(0, 5);

    setSales(recentSales);
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "-";

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return dateString;
    }

    return date.toLocaleDateString("ar-EG");
  };

  return (
    <div className="recent-sales">
      <div className="recent-header">
        <h3>آخر عمليات البيع</h3>

        <button onClick={() => navigate("/dashboard/sales-history")}>
          عرض الكل
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>رقم الفاتورة</th>
            <th>العميل</th>
            <th>الإجمالي</th>
            <th>طريقة الدفع</th>
            <th>التاريخ</th>
            <th>الحالة</th>
          </tr>
        </thead>

        <tbody>
          {sales.length > 0 ? (
            sales.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.invoiceNo}</td>

                <td>{sale.customer}</td>

                <td>
                  {Number(sale.finalTotal || 0).toLocaleString("ar-EG")} ج.م
                </td>

                <td>{sale.paymentMethod}</td>

                <td>{formatDate(sale.date)}</td>

                <td>
                  <span className="status completed">مكتملة</span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                لا توجد عمليات بيع حتى الآن
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RecentSales;
