import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./layouts/AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";

import Dashboard from "./Pages/Dashboard/Dashboard";
import Products from "./Pages/Products/Products";
import Cashier from "./Pages/Cashier/Cashier";
import SalesHistory from "./Pages/Cashier/SalesHistory";
import Expenses from "./Pages/Expenses/Expenses";
import Employees from "./Pages/Employees/Employees";

import { getCurrentUser } from "./storage/authStorage";

function AdminRoute({ children }) {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  if (currentUser.role !== "admin") {
    return <Navigate to="/dashboard/casher" replace />;
  }

  return children;
}

function App() {
  return (
    <Routes>
      {/* الصفحات العامة */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* الصفحات المحمية */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<AdminDashboard />}>
          {/* الرئيسية - Admin فقط */}
          <Route
            index
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />

          {/* المنتجات - Admin فقط */}
          <Route
            path="products"
            element={
              <AdminRoute>
                <Products />
              </AdminRoute>
            }
          />

          {/* الكاشير - الكل */}
          <Route path="casher" element={<Cashier />} />

          {/* سجل المبيعات - الكل */}
          <Route
            path="sales-history"
            element={<SalesHistory />}
          />

          {/* المصروفات - الكل */}
          <Route
            path="expenses"
            element={<Expenses />}
          />

          {/* الموظفين - Admin فقط */}
          <Route
            path="employees"
            element={
              <AdminRoute>
                <Employees />
              </AdminRoute>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;