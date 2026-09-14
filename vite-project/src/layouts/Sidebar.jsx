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

import { getCurrentUser, logoutUser } from "../storage/authStorage";

function Sidebar() {
  const currentUser = getCurrentUser();
  const isAdmin = currentUser?.role === "admin";

  const handleLogout = () => {
    logoutUser();
    window.location.href = "/";
  };

  return (
    <aside className="sidebar">
      <div className="logo">
        <img src={logo} alt="logo" />
        <h2>سجلي</h2>
        <p>نظام إدارة المحلات</p>
        <div className="logo-line"></div>
      </div>

      <nav>
        {/* Admin فقط */}
        {isAdmin && (
          <NavLink to="/dashboard">
            <FiHome />
            <span>الرئيسية</span>
          </NavLink>
        )}

        {/* الكاشير - الكل */}
        <NavLink to="/dashboard/casher">
          <FiShoppingCart />
          <span>الكاشير (POS)</span>
        </NavLink>

        {/* Admin فقط */}
        {isAdmin && (
          <NavLink to="/dashboard/products">
            <FiBox />
            <span>المنتجات</span>
          </NavLink>
        )}

        {/* الكل */}
        <NavLink to="/dashboard/sales-history">
          <FiFileText />
          <span>سجل المبيعات</span>
        </NavLink>

        {/* الكل */}
        <NavLink to="/dashboard/expenses">
          <FiDollarSign />
          <span>المصروفات</span>
        </NavLink>

        {/* Admin فقط */}
        {isAdmin && (
          <NavLink to="/dashboard/employees">
            <FiUsers />
            <span>إدارة الموظفين</span>
          </NavLink>
        )}

        {/* Admin فقط */}
        {isAdmin && (
          <NavLink to="/settings">
            <FiSettings />
            <span>الإعدادات</span>
          </NavLink>
        )}
      </nav>

      <button className="logout" onClick={handleLogout}>
        <FiLogOut />
        تسجيل الخروج
      </button>
    </aside>
  );
}

export default Sidebar;