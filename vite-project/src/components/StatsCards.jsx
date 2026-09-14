import { useEffect, useState } from "react";
import {
  FiShoppingCart,
  FiTrendingUp,
  FiCalendar,
  FiDollarSign,
} from "react-icons/fi";

function StatsCards() {
  const [stats, setStats] = useState({
    todaySales: 0,
    todayProfit: 0,
    monthSales: 0,
    monthProfit: 0,
  });

  useEffect(() => {
    const sales = JSON.parse(localStorage.getItem("sales")) || [];
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    const now = new Date();

    const isToday = (dateString) => {
      const date = new Date(dateString);

      return (
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    };

    const isThisMonth = (dateString) => {
      const date = new Date(dateString);

      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    };

    // حساب ربح عملية البيع
    const calculateProfit = (sale) => {
      const productProfit = (sale.items || []).reduce(
        (sum, item) => {
          const purchasePrice = Number(item.purchasePrice || 0);
          const sellingPrice = Number(item.price || 0);
          const quantity = Number(item.qty || 0);

          return (
            sum +
            (sellingPrice - purchasePrice) * quantity
          );
        },
        0,
      );

      // الخصم يقلل الربح
      const discount = Number(sale.discount || 0);

      return productProfit - discount;
    };

    // =========================
    // مبيعات اليوم
    // =========================

    const todaySales = sales
      .filter((sale) => isToday(sale.date))
      .reduce(
        (sum, sale) => sum + Number(sale.finalTotal || 0),
        0,
      );

    // =========================
    // مبيعات الشهر
    // =========================

    const monthSales = sales
      .filter((sale) => isThisMonth(sale.date))
      .reduce(
        (sum, sale) => sum + Number(sale.finalTotal || 0),
        0,
      );

    // =========================
    // ربح المنتجات اليوم
    // =========================

    const todayProfitFromSales = sales
      .filter((sale) => isToday(sale.date))
      .reduce(
        (sum, sale) => sum + calculateProfit(sale),
        0,
      );

    // =========================
    // ربح المنتجات الشهر
    // =========================

    const monthProfitFromSales = sales
      .filter((sale) => isThisMonth(sale.date))
      .reduce(
        (sum, sale) => sum + calculateProfit(sale),
        0,
      );

    // =========================
    // مصروفات اليوم
    // =========================

    const todayExpenses = expenses
      .filter((expense) => isToday(expense.date))
      .reduce(
        (sum, expense) => sum + Number(expense.amount || 0),
        0,
      );

    // =========================
    // مصروفات الشهر
    // =========================

    const monthExpenses = expenses
      .filter((expense) => isThisMonth(expense.date))
      .reduce(
        (sum, expense) => sum + Number(expense.amount || 0),
        0,
      );

    // =========================
    // صافي المكسب
    // =========================

    setStats({
      todaySales,
      todayProfit: todayProfitFromSales - todayExpenses,

      monthSales,
      monthProfit: monthProfitFromSales - monthExpenses,
    });
  }, []);

  const cards = [
    {
      title: "مبيعات اليوم",
      value: stats.todaySales,
      icon: <FiShoppingCart />,
      color: "#2563EB",
      bg: "#EEF4FF",
    },

    {
      title: "مكسب اليوم",
      value: stats.todayProfit,
      icon: <FiTrendingUp />,
      color: "#16A34A",
      bg: "#ECFDF3",
    },

    {
      title: "مبيعات الشهر",
      value: stats.monthSales,
      icon: <FiCalendar />,
      color: "#D8B56A",
      bg: "#FFF8E7",
    },

    {
      title: "مكسب الشهر",
      value: stats.monthProfit,
      icon: <FiDollarSign />,
      color: "#071D49",
      bg: "#EEF3FB",
    },
  ];

  return (
    <div className="stats-grid">
      {cards.map((card, index) => (
        <div className="stat-card" key={index}>
          <div className="stat-top">
            <div className="stat-info">
              <h4>{card.title}</h4>

              <h2>
                {Number(card.value).toLocaleString("ar-EG")}
              </h2>

              <span className="unit">ج.م</span>
            </div>

            <div
              className="stat-icon"
              style={{
                background: card.bg,
                color: card.color,
              }}
            >
              {card.icon}
            </div>
          </div>

          <div className="stat-bottom">
            <div className="change">
              <FiTrendingUp />
              <span>حسب العمليات المسجلة</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;