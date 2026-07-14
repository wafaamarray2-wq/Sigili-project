import { useState } from "react";
import { FiUser, FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./Login.css"
import Input from "../../components/Input/Input";
import logo from "../../assets/Images/photo_2026-07-05_17-49-05.jpg";
import icon from "../../assets/Images/ChatGPT Image Jul 14, 2026, 02_57_38 AM.png";

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
<div className="welcome-section">





  {/* اللوجو */}
  <img src={logo} alt="سجلي" className="logo" />

  {/* اسم البرنامج */}
  <h1 className="logo-title">سجلي</h1>

  {/* العنوان */}
  <h3 className="sub-title">
    نظام إدارة المحلات
  </h3>

  {/* الخط الذهبي */}
  <div className="gold-line"></div>

  {/* الوصف */}
  <p className="description">
   إدارة المبيعات والمخزون والمشتريات بكل سهولة
  </p>

  {/* أسفل الصفحة */}
  <div className="footer-content">

    <div className="security">

         <img
      src={icon}
      alt="Security"
      className="shield-icon"
    />

      <span>آمن • سريع • موثوق</span>

    </div>

    <p className="version">
      الإصدار 1.0.0
    </p>

    <p className="copyright">
      © 2026 Sjilli جميع الحقوق محفوظة
    </p>

  </div>

</div>

      {/* الجزء اليمين */}
      <div className="login-section">

        <form className="login-card" onSubmit={handleSubmit}>

          <h2>تسجيل الدخول</h2>

          <p className="subtitle">
           👋 أهلاً بعودتك 
          </p>

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

            <Link
              to="/forgot-password"
              className="forgot-password"
            >
              نسيت كلمة المرور؟
            </Link>

          </div>

          <button
            className="login-btn"
            type="submit"
          >
            تسجيل الدخول
          </button>

          <button
            className="register-btn"
            type="button"
          >
            إنشاء حساب محل جديد
          </button>

        </form>

      </div>
    </div>
  );
}

export default Login;