import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  {
    name: "مواد غذائية",
    value: 45,
    color: "#071D49",
  },
  {
    name: "مشروبات",
    value: 20,
    color: "#2563EB",
  },
  {
    name: "منظفات",
    value: 15,
    color: "#22C55E",
  },
  {
    name: "عناية شخصية",
    value: 10,
    color: "#7C3AED",
  },
  {
    name: "أخرى",
    value: 10,
    color: "#D8B56A",
  },
];

function SalesByCategory() {
  return (
    <div className="category-card">
      <h3>المبيعات حسب التصنيف</h3>

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
                  <Cell key={index} fill={item.color} />
                ))}
              </Pie>

              <Tooltip
                formatter={(value) => [`${value}%`, "النسبة"]}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 20px rgba(0,0,0,.08)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="category-list">
          {data.map((item, index) => (
            <div key={index} className="category-item">
              <div className="category-name">
                <span className="dot" style={{ background: item.color }}></span>

                <span>{item.name}</span>
              </div>

              <span className="category-percent">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SalesByCategory;
