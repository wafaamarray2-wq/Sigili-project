import React from 'react'
import logo from "../../assets/Images/photo_2026-07-05_17-49-05.jpg";
import icon from "../../assets/Images/ChatGPT Image Jul 14, 2026, 02_57_38 AM.png";
function WelcomeSection() {
  return (
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
  )
}

export default WelcomeSection
