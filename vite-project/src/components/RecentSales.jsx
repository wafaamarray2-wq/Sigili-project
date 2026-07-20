function RecentSales() {
  const sales = [
    {
      id: "#1025",
      customer: "أحمد محمد",
      total: "350 ج.م",
      payment: "كاش",
      date: "اليوم",
      status: "مكتملة",
    },
    {
      id: "#1024",
      customer: "سارة علي",
      total: "1,250 ج.م",
      payment: "فيزا",
      date: "اليوم",
      status: "مكتملة",
    },
    {
      id: "#1023",
      customer: "محمد حسن",
      total: "820 ج.م",
      payment: "كاش",
      date: "أمس",
      status: "مكتملة",
    },
    {
      id: "#1022",
      customer: "خالد محمود",
      total: "470 ج.م",
      payment: "فودافون كاش",
      date: "أمس",
      status: "مكتملة",
    },
  ];

  return (
    <div className="recent-sales">

      <div className="recent-header">
        <h3>آخر عمليات البيع</h3>

        <button>عرض الكل</button>
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

          {sales.map((sale) => (
            <tr key={sale.id}>

              <td>{sale.id}</td>

              <td>{sale.customer}</td>

              <td>{sale.total}</td>

              <td>{sale.payment}</td>

              <td>{sale.date}</td>

              <td>
                <span className="status completed">
                  {sale.status}
                </span>
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default RecentSales;