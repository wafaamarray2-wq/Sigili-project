import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { day: "السبت", sales: 7000 },
  { day: "الأحد", sales: 20000 },
  { day: "الاثنين", sales: 27000 },
  { day: "الثلاثاء", sales: 35000 },
  { day: "الأربعاء", sales: 26000 },
  { day: "الخميس", sales: 29000 },
  { day: "الجمعة", sales: 18000 },
];

function SalesChart() {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>المبيعات خلال آخر 7 أيام</h3>

        <select>
          <option>آخر 7 أيام</option>
          <option>آخر 30 يوم</option>
        </select>
      </div>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.35}/>
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />

            <XAxis
              dataKey="day"
              tick={{ fill: "#64748B", fontSize: 13 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: "#64748B", fontSize: 13 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v / 1000} ألف`}
            />

            <Tooltip
              formatter={(value) => [`${value.toLocaleString()} ج.م`, "المبيعات"]}
              contentStyle={{
                borderRadius: "14px",
                border: "1px solid #E5E7EB",
                boxShadow: "0 10px 25px rgba(0,0,0,.08)",
              }}
            />

            <Area
              type="monotone"
              dataKey="sales"
              stroke="#2563EB"
              strokeWidth={3}
              fill="url(#colorSales)"
              dot={{ r: 4, fill: "#2563EB" }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SalesChart;
