import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";



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
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
              >
                {data.map((item, index) => (
                  <Cell
                    key={index}
                    fill={item.color}
                  />
                ))}
              </Pie>

              <Tooltip />
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
                  style={{ background: item.color }}
                ></span>

                {item.name}
              </div>

              <span>{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SalesByCategory;
