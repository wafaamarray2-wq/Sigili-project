import "./Dashboard.css";

import StatsCards from "../../components/StatsCards";
import RecentSales from "../../components/RecentSales";
import LowStock from "../../components/LowStock";
import SalesChart from "../../components/SalesChart";
import SalesByCategory from "../../components/SalesByCategory";
function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>مرحبا بك👋, احمد</h1>
          <p>اليك نظره عامه علي نشاط متجرك اليوم</p>
        </div>
      </div>

      <StatsCards />

      <div className="dashboard-grid">
        <SalesChart />
        <LowStock />
      </div>
      <div className="dashboard-bottom">
        <RecentSales />

        <SalesByCategory />
      </div>
    </div>
  );
}

export default Dashboard;
