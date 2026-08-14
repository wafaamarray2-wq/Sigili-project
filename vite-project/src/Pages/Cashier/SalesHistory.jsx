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
        <div className="modal-overlay" onClick={() => setSelectedSale(null)}>
          <div className="sale-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-icon"
              onClick={() => setSelectedSale(null)}
            >
              ✕
            </button>

            <h3 className="receipt-title">اسم المحل</h3>

            <hr />

            <div className="receipt-info">
              <div className="receipt-line">
                <span>رقم الفاتورة :</span>
                <strong>{selectedSale.invoiceNo}</strong>
              </div>

              <div className="receipt-line">
                <span>التاريخ :</span>
                <strong>{selectedSale.date}</strong>
              </div>

              <div className="receipt-line">
                <span>الوقت :</span>
                <strong>{selectedSale.time}</strong>
              </div>
              <div className="receipt-line">
                <span>اسم العميل :</span>
                <strong>{selectedSale.customer || "عميل نقدي"}</strong>
              </div>

              <div className="receipt-line">
                <span>طريقة الدفع :</span>
                <strong>{selectedSale.paymentMethod}</strong>
              </div>
            </div>

            <table className="receipt-table">
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

            <div className="receipt-summary">
              <div className="receipt-total">
                <span>الإجمالي</span>
                <span>{selectedSale.total} ج</span>
              </div>

              <div className="receipt-total">
                <span>الخصم</span>
                <span>{selectedSale.discount} ج</span>
              </div>

              <div className="receipt-total total-required">
                <span>المطلوب</span>
                <span>{selectedSale.finalTotal} ج</span>
              </div>

              <div className="receipt-total">
                <span>المدفوع</span>
                <span>{selectedSale.paid} ج</span>
              </div>

              <div className="receipt-total">
                <span>الباقي</span>

                <span
                  className={
                    selectedSale.remaining === 0 ? "paid" : "remaining"
                  }
                >
                  {selectedSale.remaining} ج
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SalesHistory;
