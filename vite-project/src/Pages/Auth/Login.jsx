import { useState } from "react";
import { FiUser, FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./Login.css";
import Input from "../../components/Input/Input";
import WelcomeSection from "./WelcomeSection";
import { saveCurrentUser, getDefaultAdmin } from "../../storage/authStorage";

import { getEmployees } from "../../storage/employeeStorage";
function Login() {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const admin = getDefaultAdmin();
    const employees = getEmployees();

    const foundEmployee = employees.find(
      (employee) =>
        employee.username === formData.userName &&
        employee.password === formData.password &&
        employee.status === "نشط",
    );

    const isAdmin =
      formData.userName === admin.username &&
      formData.password === admin.password;

    if (isAdmin) {
      saveCurrentUser(admin);
      window.location.href = "/dashboard";
      return;
    }

    if (foundEmployee) {
      saveCurrentUser({
        id: foundEmployee.id,
        name: foundEmployee.name,
        username: foundEmployee.username,
        role: foundEmployee.accountRole,
      });

      window.location.href = "/dashboard";
      return;
    }

    alert("اسم المستخدم أو كلمة المرور غير صحيحة");
  };

  return (
    <div className="login-page">
      {/* الجزء الشمال */}
      {/* الجزء اليمين */}
      <div className="login-section">
        <form className="login-card" onSubmit={handleSubmit}>
          <h2>تسجيل الدخول</h2>

          <p className="subtitle">👋 أهلاً بعودتك</p>

          {/* اسم المستخدم */}

          <Input
            label="اسم المستخدم"
            type="text"
            name="userName"
            placeholder="أدخل اسم المستخدم"
            value={formData.userName}
            onChange={handleChange}
            icon={<FiUser />}
          />

          {/* كلمة المرور */}

          <Input
            label="كلمة المرور"
            type="password"
            name="password"
            placeholder="أدخل كلمة المرور"
            value={formData.password}
            onChange={handleChange}
            icon={<FiLock />}
          />

          <div className="login-options">
            <label className="remember">
              <input type="checkbox" />
              تذكرني
            </label>

            <Link to="/forgot-password" className="forgot-password">
              نسيت كلمة المرور؟
            </Link>
          </div>
          <button className="login-btn" type="submit">
            تسجيل الدخول
          </button>

          <Link to="/register">
            <button className="New-register-btn" type="button">
              إنشاء حساب محل جديد
            </button>
          </Link>
        </form>
      </div>{" "}
      <WelcomeSection />
    </div>
  );
}

export default Login;
