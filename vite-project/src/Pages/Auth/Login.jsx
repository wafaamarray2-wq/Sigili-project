import { useState } from "react";
import { FiUser, FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./Login.css";
import Input from "../../components/Input/Input";
import WelcomeSection from "./WelcomeSection";

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

    console.log(formData);
  };

  return (
    <div className="login-page">
      {/* الجزء الشمال */}
      <WelcomeSection />

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

          <Link  to="/register">
            <button className="register-btn" type="button">
              إنشاء حساب محل جديد
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
