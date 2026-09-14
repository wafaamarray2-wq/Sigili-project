import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = [
  "#071D49",
  "#2563EB",
  "#22C55E",
  "#7C3AED",
  "#D8B56A",
];

function SalesByCategory() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const sales =
      JSON.parse(localStorage.getItem("sales")) || [];

    const categoryTotals = {};

    sales.forEach((sale) => {
      (sale.items || []).forEach((item) => {
        const category = item.category || "أخرى";

        const itemTotal =
          Number(item.price || 0) * Number(item.qty || 0);

        categoryTotals[category] =
          (categoryTotals[category] || 0) + itemTotal;
      });
    });

    const totalSales = Object.values(categoryTotals).reduce(
      (sum, value) => sum + value,
      0,
    );

    if (totalSales === 0) {
      setData([]);
      return;
    }

    const categoryData = Object.entries(categoryTotals).map(
      ([name, value], index) => ({
        name,
        value: Math.round((value / totalSales) * 100),
        color: COLORS[index % COLORS.length],
      }),
    );

    setData(categoryData);
  }, []);

  return (
    <div className="category-card">
      <h3>المبيعات حسب التصنيف</h3>

      {data.length > 0 ? (
        <div className="category-content">
          <div className="category-chart">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={3}
                >
                  {data.map((item, index) => (
                    <Cell
                      key={index}
                      fill={item.color}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) => [
                    `${value}%`,
                    "النسبة",
                  ]}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #E5E7EB",
                    boxShadow:
                      "0 8px 20px rgba(0,0,0,.08)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="category-list">
            {data.map((item, index) => (
              <div
                key={index}
                className="category-item"
              >
                <div className="category-name">
                  <span
                    className="dot"
                    style={{
                      background: item.color,
                    }}
                  ></span>

                  <span>{item.name}</span>
                </div>

                <span className="category-percent">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="category-empty">
          لا توجد مبيعات لعرض التصنيفات
        </div>
      )}
    </div>
  );
}

export default SalesByCategory;