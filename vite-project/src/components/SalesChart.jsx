import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function SalesChart() {
  const [salesData, setSalesData] = useState([]);
  const [period, setPeriod] = useState("7");

  useEffect(() => {
    const sales =
      JSON.parse(localStorage.getItem("sales")) || [];

    const daysCount = Number(period);
    const today = new Date();

    const data = [];

    for (let i = daysCount - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setHours(0, 0, 0, 0);
      date.setDate(today.getDate() - i);

      const daySales = sales
        .filter((sale) => {
          const saleDate = new Date(sale.date);

          return (
            saleDate.getDate() === date.getDate() &&
            saleDate.getMonth() === date.getMonth() &&
            saleDate.getFullYear() === date.getFullYear()
          );
        })
        .reduce(
          (sum, sale) =>
            sum + Number(sale.finalTotal || 0),
          0
        );

      data.push({
        day:
          daysCount === 7
            ? date.toLocaleDateString("ar-EG", {
                weekday: "short",
              })
            : date.toLocaleDateString("ar-EG", {
                day: "numeric",
                month: "numeric",
              }),
        sales: daySales,
      });
    }

    setSalesData(data);
  }, [period]);

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>المبيعات خلال {period === "7" ? "آخر 7 أيام" : "آخر 30 يوم"}</h3>

        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option value="7">آخر 7 أيام</option>
          <option value="30">آخر 30 يوم</option>
        </select>
      </div>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={salesData}>
            <defs>
              <linearGradient
                id="colorSales"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#2563EB"
                  stopOpacity={0.35}
                />

                <stop
                  offset="95%"
                  stopColor="#2563EB"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E5E7EB"
            />

            <XAxis
              dataKey="day"
              tick={{
                fill: "#64748B",
                fontSize: 13,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{
                fill: "#64748B",
                fontSize: 13,
              }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) =>
                value >= 1000
                  ? `${value / 1000} ألف`
                  : value
              }
            />

            <Tooltip
              formatter={(value) => [
                `${Number(value).toLocaleString("ar-EG")} ج.م`,
                "المبيعات",
              ]}
              contentStyle={{
                borderRadius: "14px",
                border: "1px solid #E5E7EB",
                boxShadow:
                  "0 10px 25px rgba(0,0,0,.08)",
              }}
            />

            <Area
              type="monotone"
              dataKey="sales"
              stroke="#2563EB"
              strokeWidth={3}
              fill="url(#colorSales)"
              dot={{
                r: 4,
                fill: "#2563EB",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SalesChart;