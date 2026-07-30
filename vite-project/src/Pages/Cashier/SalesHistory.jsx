import { useEffect, useState } from "react";
import "./SalesHistory.css";

function SalesHistory() {
  const [sales, setSales] = useState([]);
  const [selectedSale, setSelectedSale] = useState(null);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const savedSales = JSON.parse(localStorage.getItem("sales")) || [];

    setSales(savedSales);
  }, []);

  const filteredSales = sales.filter(
    (sale) =>
      (sale.customer || "").toLowerCase().includes(search.toLowerCase()) ||
      (sale.invoiceNo || "").toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="sales-page">
      <div className="sales-header">
        <h2>سجل المبيعات</h2>

        <input
          type="text"
          placeholder="🔍 ابحث برقم الفاتورة أو اسم العميل..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="sales-table">
        <thead>
          <tr>
            <th>رقم الفاتورة</th>
            <th>العميل</th>
            <th>التاريخ</th>
            <th>الإجمالي</th>
            <th>الخصم</th>
            <th>المطلوب</th>
            <th>المدفوع</th>
            <th>المتبقي</th>
            <th>الدفع</th>
            <th>التفاصيل</th>
          </tr>
        </thead>

        <tbody>
          {filteredSales.length > 0 ? (
            filteredSales.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.invoiceNo}</td>

                <td>{sale.customer || "عميل نقدي"}</td>

                <td>
                  <div>{sale.date}</div>
                  <small>{sale.time}</small>
                </td>

                <td>{sale.total} ج</td>

                <td>{sale.discount} ج</td>

                <td>{sale.finalTotal} ج</td>

                <td>{sale.paid} ج</td>

                <td
                  style={{
                    color: sale.remaining > 0 ? "#ef4444" : "#16a34a",
                    fontWeight: "bold",
                  }}
                >
                  {sale.remaining} ج
                </td>

                <td>
                  <span className="payment-badge">{sale.paymentMethod}</span>
                </td>

                <td>
                  <button
                    className="view-sale-btn"
                    onClick={() => setSelectedSale(sale)}
                  >
                    عرض
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr className="empty-row">
              <td colSpan="10">لا توجد عمليات بيع</td>
            </tr>
          )}
        </tbody>
      </table>

   
   {selectedSale && (
  <div className="modal-overlay">
    <div className="sale-modal">

      <h2>تفاصيل الفاتورة</h2>

      <p><strong>رقم الفاتورة:</strong> {selectedSale.invoiceNo}</p>

      <p><strong>العميل:</strong> {selectedSale.customer}</p>

      <p><strong>التاريخ:</strong> {selectedSale.date}</p>

      <p><strong>الوقت:</strong> {selectedSale.time}</p>

      <hr />

      <table className="modal-table">
        <thead>
          <tr>
            <th>المنتج</th>
            <th>السعر</th>
            <th>الكمية</th>
            <th>الإجمالي</th>
          </tr>
        </thead>

        <tbody>
          {selectedSale.items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.price} ج</td>
              <td>{item.qty}</td>
              <td>{item.price * item.qty} ج</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      <div className="invoice-summary">
        <p>الإجمالي : {selectedSale.total} ج</p>
        <p>الخصم : {selectedSale.discount} ج</p>
        <p>المطلوب : {selectedSale.finalTotal} ج</p>
        <p>المدفوع : {selectedSale.paid} ج</p>
        <p>المتبقي : {selectedSale.remaining} ج</p>
        <p>طريقة الدفع : {selectedSale.paymentMethod}</p>
      </div>

      <button
        className="close-modal"
        onClick={() => setSelectedSale(null)}
      >
        إغلاق
      </button>

    </div>
  </div>
)}

    </div>
  );
}

export default SalesHistory;
