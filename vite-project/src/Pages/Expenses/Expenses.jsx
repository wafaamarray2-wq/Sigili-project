import "./Expenses.css";
import ExpenseModal from "./ExpenseModal";
import { useState,useEffect } from "react";

function Expenses() {
  const [open, setOpen] = useState(false);
  const [expenses, setExpenses] = useState([]);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("expenses")) || [];

    setExpenses(saved);
  }, []);

  const handleSaveExpense = () => {
    if (!name || !amount || !category || !date) {
      alert("أكمل البيانات");
      return;
    }

    if (editingId) {
      const updatedExpenses = expenses.map((expense) =>
        expense.id === editingId
          ? {
              ...expense,
              name,
              amount: Number(amount),
              category,
              date,
              notes,
            }
          : expense,
      );

      setExpenses(updatedExpenses);

      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    } else {
      const newExpense = {
        id: Date.now(),

        name,

        amount: Number(amount),

        category,

        date,

        notes,
      };

      const updatedExpenses = [...expenses, newExpense];

      setExpenses(updatedExpenses);

      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    }

    setEditingId(null);

    setName("");

    setAmount("");

    setCategory("");

    setDate("");

    setNotes("");

    setOpen(false);
  };

  const handleDeleteExpense = (id) => {
    if (!window.confirm("هل تريد حذف هذا المصروف؟")) return;

    const updatedExpenses = expenses.filter((expense) => expense.id !== id);

    setExpenses(updatedExpenses);

    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  const handleEditExpense = (expense) => {
    setEditingId(expense.id);

    setName(expense.name);

    setAmount(expense.amount);

    setCategory(expense.category);

    setDate(expense.date);

    setNotes(expense.notes);

    setOpen(true);
  };

  const totalExpenses = expenses.reduce(
  (sum, expense) => sum + Number(expense.amount),
  0
);

const expenseCount = expenses.length;

const highestExpense =
  expenses.length > 0
    ? Math.max(...expenses.map((e) => Number(e.amount)))
    : 0;

  return (
    <div className="expenses-page">
      {/* Header */}

      <div className="expenses-header">
        <h2>
          المصروفات
          <span>💲</span>
        </h2>

        <button className="add-expense-btn" onClick={() => setOpen(true)}>
          + إضافة مصروف
        </button>
      </div>

      {/* Search */}

      <div className="expense-search">
        <input type="text" placeholder="ابحث عن مصروف..." />
      </div>

      {/* Cards */}

      <div className="expense-cards">
        <div className="expense-card">
          <p>إجمالي المصروفات هذا الشهر</p>

          <h3>{totalExpenses} ج</h3>
        </div>

        <div className="expense-card">
          <p>عدد المصروفات</p>

          <h3>{expenseCount}</h3>
        </div>

        <div className="expense-card">
          <p>أعلى مصروف</p>

        <h3>{highestExpense} ج</h3>
        </div>
      </div>

      {/* Table */}

      <table className="expenses-table">
        <thead>
          <tr>
            <th>#</th>

            <th>الاسم</th>

            <th>التصنيف</th>

            <th>المبلغ</th>

            <th>التاريخ</th>

            <th>التحكم</th>
          </tr>
        </thead>

        <tbody>
          {expenses.length > 0 ? (
            expenses.map((expense, index) => (
              <tr key={expense.id}>
                <td>{index + 1}</td>

                <td>{expense.name}</td>

                <td>{expense.category}</td>

                <td>{expense.amount} ج</td>

                <td>{expense.date}</td>

                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEditExpense(expense)}
                  >
                    تعديل
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteExpense(expense.id)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>لا توجد مصروفات</td>
            </tr>
          )}
        </tbody>
      </table>

      <ExpenseModal open={open} onClose={() => setOpen(false)}>
        <div className="expense-form">
          <input
            type="text"
            placeholder="اسم المصروف"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            placeholder="المبلغ"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>اختر التصنيف</option>

            <option>إيجار</option>

            <option>رواتب</option>

            <option>فواتير</option>

            <option>مستلزمات</option>

            <option>صيانة</option>

            <option>أخرى</option>
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <textarea
            placeholder="ملاحظات (اختياري)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <div className="expense-buttons">
            <button className="cancel-btn">إلغاء</button>

            <button className="save-btn" onClick={handleSaveExpense}>
              حفظ المصروف
            </button>
          </div>
        </div>
      </ExpenseModal>
    </div>
  );
}

export default Expenses;
