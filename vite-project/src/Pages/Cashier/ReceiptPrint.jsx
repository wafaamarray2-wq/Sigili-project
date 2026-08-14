import React, { forwardRef } from "react";
import "./ReceiptPrint.css";

const ReceiptPrint = forwardRef(
  (
    {
      invoiceNo,
      customer,
      cart,
      total,
      discount,
      finalTotal,
      paid,
      remaining,
      paymentMethod,
    },
    ref
  ) => {
    return (
      <div ref={ref} className="print-receipt">

        <div className="receipt-header">
          <div className="shop-badge">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 8h12l1 12.5A1.5 1.5 0 0 1 17.5 22h-11A1.5 1.5 0 0 1 5 20.5L6 8Z" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round"/>
              <path d="M9 8V6.5a3 3 0 0 1 6 0V8" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="shop-name">سجلي</h2>
          <p className="shop-subtitle">SALES RECEIPT</p>
        </div>

        <div className="divider" />

        <div className="invoice-info">

          <div className="info-row">
            <span>رقم الفاتورة</span>
            <strong>{invoiceNo}</strong>
          </div>

          <div className="info-row">
            <span>التاريخ</span>
            <strong>{new Date().toLocaleDateString("en-GB")}</strong>
          </div>

          <div className="info-row">
            <span>الوقت</span>
            <strong>
              {new Date().toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </strong>
          </div>

          <div className="info-row">
            <span>العميل</span>
            <strong>{customer || "عميل نقدي"}</strong>
          </div>

          <div className="info-row">
            <span>طريقة الدفع</span>
            <strong className="payment-pill">{paymentMethod}</strong>
          </div>

        </div>

        <div className="divider" />

        <table className="print-table">

          <thead>
            <tr>
              <th>المنتج</th>
              <th>السعر</th>
              <th>الكمية</th>
              <th>الإجمالي</th>
            </tr>
          </thead>

          <tbody>

            {cart.map((item, idx) => (

              <tr key={item.id} className={idx % 2 === 1 ? "row-alt" : ""}>

                <td className="product-cell">
                  <div>{item.name}</div>
                </td>

                <td>{item.price} ج</td>

                <td>{item.qty}</td>

                <td className="line-total">{item.price * item.qty} ج</td>

              </tr>

            ))}

          </tbody>

        </table>

        <div className="print-totals">

          <div className="print-total">
            <span>الإجمالي</span>
            <strong>{total} ج</strong>
          </div>

          <div className="print-total">
            <span>الخصم</span>
            <strong>{discount} ج</strong>
          </div>

          <div className="print-total">
            <span>المطلوب</span>
            <strong>{finalTotal} ج</strong>
          </div>

          <div className="print-total">
            <span>المدفوع</span>
            <strong>{paid} ج</strong>
          </div>

        </div>

        <div className="print-total final">
          <span>الباقي</span>
          <strong>{remaining} ج</strong>
        </div>

        <div className="divider" />

        <p className="print-footer">
          ❤️ شكراً لزيارتكم
        </p>

        

      </div>
    );
  }
);

export default ReceiptPrint;