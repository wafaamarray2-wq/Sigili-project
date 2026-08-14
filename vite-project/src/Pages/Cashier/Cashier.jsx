import { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import ReceiptPrint from "./ReceiptPrint";
import "./Cashier.css";

function Cashier() {
  // المنتجات الموجودة عندك
  const [products, setProducts] = useState([]);

  // المنتج المختار
  const [selectedProduct, setSelectedProduct] = useState("");
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("كاش");
  // الكمية
  const [qty, setQty] = useState(1);

  // الخصم
  const [discount, setDiscount] = useState(0);
  const [paid, setPaid] = useState(0);

  // منتجات الفاتورة
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const receiptRef = useRef(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const savedProducts = localStorage.getItem("products");

    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
    generateInvoiceNo();
  }, []);

  const updateCart = (id, change) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    const cartItem = cart.find((c) => c.id === id);

    // =====================
    // إضافة منتج لأول مرة
    // =====================
    if (!cartItem) {
      if (change <= 0) return;

      if (product.quantity < change) {
        alert("الكمية المطلوبة أكبر من المخزون");
        return;
      }

      const updatedProducts = products.map((p) =>
        p.id === id ? { ...p, quantity: p.quantity - change } : p,
      );

      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));

      setCart([
        ...cart,
        {
          ...product,
          qty: change,
        },
      ]);
      setSelectedProduct("");
      setSearch("");
      setShowResults(false);
      setQty(1);

      return;
    }

    // =====================
    // زيادة الكمية
    // =====================
    if (change > 0) {
      if (product.quantity < change) {
        alert("لا يوجد مخزون كافي");
        return;
      }

      const updatedProducts = products.map((p) =>
        p.id === id ? { ...p, quantity: p.quantity - change } : p,
      );

      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));

      setCart(
        cart.map((item) =>
          item.id === id
            ? {
                ...item,
                qty: item.qty + change,
              }
            : item,
        ),
      );

      return;
    }

    // =====================
    // تقليل الكمية
    // =====================
    const updatedQty = cartItem.qty + change;

    const updatedProducts = products.map((p) =>
      p.id === id ? { ...p, quantity: p.quantity - change } : p,
    );

    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    if (updatedQty <= 0) {
      setCart(cart.filter((item) => item.id !== id));
    } else {
      setCart(
        cart.map((item) =>
          item.id === id
            ? {
                ...item,
                qty: updatedQty,
              }
            : item,
        ),
      );
    }
  };

  const generateInvoiceNo = () => {
    const sales = JSON.parse(localStorage.getItem("sales")) || [];
    setInvoiceNo(`INV-${sales.length + 1001}`);
  };
  const completeSale = () => {
    if (cart.length === 0) {
      alert("الفاتورة فارغة");
      return;
    }

    const sales = JSON.parse(localStorage.getItem("sales")) || [];

    const newSale = {
      id: Date.now(),
      invoiceNo: `INV-${sales.length + 1001}`,
      customer: name || "عميل نقدي",
      items: cart,
      total,
      discount,
      finalTotal,
      paid,
      remaining,
      paymentMethod,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };

    sales.push(newSale);

    localStorage.setItem("sales", JSON.stringify(sales));
    // setCart([]);
    // setDiscount(0);
    // setPaid(0);
    // setName("");
    // setPaymentMethod("كاش");

    // generateInvoiceNo();
    setShowSuccessModal(true);
  };

  const handlePrint = useReactToPrint({
    contentRef: receiptRef,

    documentTitle: `Invoice-${invoiceNo}`,

    onAfterPrint: () => {
      setShowSuccessModal(false);

      setCart([]);
      setDiscount(0);
      setPaid(0);
      setName("");
      setPaymentMethod("كاش");

      generateInvoiceNo();
    },
  });

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  const selectedItem = products.find(
    (item) => item.id === Number(selectedProduct),
  );
  // الإجمالي
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // المطلوب بعد الخصم
  const finalTotal = total - Number(discount);
  const remaining = Math.max(finalTotal - Number(paid), 0);

  return (
    <div className="cashier-page">
      {/* الجزء اليمين */}

      <div className="cashier-content">
        <h2>المبيعات</h2>

        <div className="search-product">
          <input
            type="text"
            placeholder="🔍 ابحث عن منتج..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowResults(true);
            }}
          />

          {showResults && search && (
            <div className="search-results">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item) => (
                  <div
                    key={item.id}
                    className="search-item"
                    onClick={() => {
                      setSelectedProduct(item.id);
                      setSearch(item.name);
                      setShowResults(false);
                      setQty(1);
                    }}
                  >
                    <div className="product-details">
                      <h4>{item.name}</h4>
                      <div className="product-meta">
                        <span>💰 {item.price} ج</span>
                        <span>📦 {item.quantity} قطعة</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results">لا يوجد منتج بهذا الاسم</div>
              )}
            </div>
          )}
        </div>

        {selectedItem && (
          <div className="selected-product-card">
            <div className="product-top">
              <div className="product-info">
                <div className="product-icon">📦</div>
                <div>
                  <h3>{selectedItem.name}</h3>
                  <div className="product-tags">
                    <span className="tag">📦 {selectedItem.quantity} قطعة</span>
                  </div>
                </div>
              </div>

              <div className="price-box">
                <span>السعر</span>
                <h2>{selectedItem.price} ج</h2>
              </div>
            </div>

            <hr className="product-divider" />

            <div className="product-bottom">
              <div className="qty-section">
                <span className="qty-title">الكمية</span>
                <div className="qty-controls">
                  <button
                    onClick={() => setQty((prev) => (prev > 1 ? prev - 1 : 1))}
                  >
                    -
                  </button>
                  <span>{qty}</span>
                  <button onClick={() => setQty((prev) => prev + 1)}>+</button>
                </div>
              </div>

              <button
                className="add-cart-btn"
                onClick={() => updateCart(selectedItem.id, qty)}
              >
                🛒 إضافة إلى الفاتورة
              </button>
            </div>
          </div>
        )}

        <table>
          <thead>
            <tr>
              <th>المنتج</th>
              <th>السعر</th>
              <th>الكمية</th>
              <th>الإجمالي</th>
              <th>التحكم</th>
            </tr>
          </thead>

          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>

                <td>{item.price} ج</td>

                <td>
                  <div className="qty-cell">
                    <button onClick={() => updateCart(item.id, -1)}>-</button>

                    <span>{item.qty}</span>

                    <button onClick={() => updateCart(item.id, 1)}>+</button>
                  </div>
                </td>

                <td>{item.qty * item.price} ج</td>

                <td>
                  <button
                    className="del-btn"
                    onClick={() => updateCart(item.id, -item.qty)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* الفاتورة */}

      <div className="receipt">
        <h3>👜 اسم المحل</h3>

        <hr />

        <p>رقم الفاتورة : {invoiceNo}</p>

        <p>التاريخ : {new Date().toLocaleDateString()}</p>

        <p>الوقت : {new Date().toLocaleTimeString()}</p>

        <label htmlFor="customerName">اسم العميل</label>

        <input
          id="customerName"
          type="text"
          value={name}
          placeholder="اختياري"
          onChange={(e) => setName(e.target.value)}
        />

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
            {cart.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.qty}</td>
                <td>{item.price * item.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="receipt-input">
          <label>طريقة الدفع</label>

          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="كاش">كاش</option>
            <option value="فودافون كاش">فودافون كاش</option>
            <option value="فيزا">فيزا</option>
            <option value="إنستا باي">إنستا باي</option>
          </select>

          <label>الخصم</label>

          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="أدخل الخصم"
          />

          <label>المبلغ المدفوع</label>

          <input
            type="number"
            value={paid}
            onChange={(e) => setPaid(e.target.value)}
            placeholder="0"
          />
        </div>

        <div className="receipt-total">
          <span>الإجمالي</span>
          <span>{total} ج</span>
        </div>

        <div className="receipt-total">
          <span>الخصم</span>
          <span>{discount} ج</span>
        </div>

        <div className="receipt-total">
          <span>المطلوب</span>
          <span>{finalTotal} ج</span>
        </div>

        <div className="receipt-total">
          <span>المدفوع</span>
          <span>{paid} ج</span>
        </div>

        <div className="receipt-total">
          <span>الباقي</span>
          <span>{remaining} ج</span>
        </div>

        <button onClick={completeSale}>إتمام البيع</button>

        <p className="par">شكراً لزيارتكم ❤️</p>
      </div>

      {showSuccessModal && (
        <div className="success-overlay">
          <div className="success-modal">
            <div className="success-icon">✅</div>

            <h2>تمت عملية البيع بنجاح</h2>

            <p>تم حفظ الفاتورة بنجاح.</p>

            <button className="print-btn" onClick={handlePrint}>
              🖨️ طباعة الفاتورة
            </button>
            <button onClick={() => setShowSuccessModal(false)}>إغلاق</button>
          </div>
        </div>
      )}
    

       <div  style={{ display: "none" }}>
      <ReceiptPrint
        ref={receiptRef}
        invoiceNo={invoiceNo}
        customer={name}
        cart={cart}
        total={total}
        discount={discount}
        finalTotal={finalTotal}
        paid={paid}
        remaining={remaining}
        paymentMethod={paymentMethod}
      /> 
      </div>
    </div>
  );
}

export default Cashier;
