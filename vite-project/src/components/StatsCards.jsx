import {
  FiShoppingCart,
  FiDollarSign,
  FiBox,
  FiUsers,
  FiTrendingUp,
} from "react-icons/fi";

function StatsCards() {
  const cards = [
    {
      title: "إجمالي المبيعات",
      value: "156,820",
      unit: "ج.م",
      change: "+8.7%",
      icon: <FiShoppingCart />,
      color: "#2563EB",
      bg: "#EEF4FF",
    },
    {
      title: "إجمالي الأرباح",
      value: "28,560",
      unit: "ج.م",
      change: "+12.5%",
      icon: <FiDollarSign />,
      color: "#D8B56A",
      bg: "#FFF8E7",
    },
    {
      title: "عدد المنتجات",
      value: "1,248",
      unit: "منتج",
      change: "+6",
      icon: <FiBox />,
      color: "#071D49",
      bg: "#EEF3FB",
    },
    {
      title: "عدد الموظفين",
      value: "7",
      unit: "موظف",
      change: "+1",
      icon: <FiUsers />,
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

              <h2>{card.value}</h2>

              <span className="unit">{card.unit}</span>
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
              <span>{card.change}</span>
            </div>

            <p>عن الشهر الماضي</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;
