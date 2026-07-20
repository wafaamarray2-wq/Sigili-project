import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./layouts/AdminDashboard";
import Dashboard from "./Pages/Dashboard/Dashboard";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />



  <Route path="/dashboard" element={<AdminDashboard />}>
  <Route index element={<Dashboard />} />
  {/* <Route path="cashier" element={<Cashier />} />
  <Route path="products" element={<Products />} />
  <Route path="sales" element={<Sales />} /> */}
</Route>
    </Routes>


  );
}

export default App;
