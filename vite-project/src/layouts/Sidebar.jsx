import { NavLink } from "react-router-dom";
import logo from "../assets/Images/photo_2026-07-05_17-49-05.jpg";
import {
  FiHome,
  FiShoppingCart,
  FiBox,
  FiDollarSign,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiFileText,
} from "react-icons/fi";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <img src={logo} alt="logo" />
        <h2>سجلي</h2>

        <p>نظام إدارة المحلات</p>

        <div className="logo-line"></div>
      </div>

      <nav>
        <NavLink to="/dashboard">
          <FiHome />
          <span>الرئيسية</span>
        </NavLink>
        <NavLink to="/casher">
          <FiShoppingCart />
          <span>الكاشير (pos)</span>
        </NavLink>
        <NavLink to="products">
          <FiBox />
          <span>المنتجات</span>
        </NavLink>
        <NavLink to="/sales-history">
          <FiFileText />
          <span>سجل المبيعات</span>
        </NavLink>

        <NavLink to="/expenses">
          <FiDollarSign />
          <span>المصروفات</span>
        </NavLink>

        <NavLink to="/employees">
          <FiUsers />
          <span>الموظفون</span>
        </NavLink>

        <NavLink to="/settings">
          <FiSettings />
          <span>الإعدادات</span>
        </NavLink>
      </nav>

      <button className="logout">
        <FiLogOut />
        تسجيل الخروج
      </button>
    </aside>
  );
}

export default Sidebar;
