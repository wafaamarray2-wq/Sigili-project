import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./layouts/AdminDashboard";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Products from "./Pages/Products/Products";
import Cashier from "./Pages/Cashier/Cashier";
import SalesHistory from "./Pages/Cashier/SalesHistory";
import Expenses from "./Pages/Expenses/Expenses";
import Employees from "./Pages/Employees/Employees";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />



  <Route path="/dashboard" element={<AdminDashboard />}>
  <Route index element={<Dashboard />} />
  <Route path="products" element={<Products />} />
  <Route path="casher" element={<Cashier />} />
  

  <Route path="sales-history" element={<SalesHistory />} /> 
  <Route path="expenses" element={<Expenses />} /> 
  <Route path="employees" element={<Employees />} /> 
</Route>
    </Routes>


  );
}

export default App;
