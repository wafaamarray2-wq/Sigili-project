import "./Register.css";
import { FiUser, FiMail, FiPhone, FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from "react";
import WelcomeSection from "./WelcomeSection";
import Input from "../../components/Input/Input";

function Register() {
     
       const [formDetails, setFormDetails] = useState({
         userName: "",
         shopName:"",
         email:"",
         phoneNumber:"",
         password: "",
         confirmPssword: "",
      
       });

         const handleChange = (e) => {
    const { name, value } = e.target;

    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

   const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formDetails);
  };
  return (
    <div className="register-page">
      <WelcomeSection />

      <div className="register-section">
        <div className="register-card">
          <h1 className="register-title">إنشاء حساب</h1>

          <p className="register-subtitle">🚀 ابدأ إدارة متجرك مع سجلي</p>

          <form className="register-form"  onSubmit={handleSubmit}>
            <Input
              label="اسم المحل"
              value={formDetails.shopName}
             name="shopName"
              type="text"
              placeholder="أدخل اسم المحل"
              icon={<FiUser />}
               onChange={handleChange}
            />

            <Input
              label="اسم المستخدم"
              type="text"
              value={formDetails.userName}
             name="userName"
              placeholder="أدخل اسم المستخدم"
              icon={<FiUser />}
               onChange={handleChange}
            />

           

            <Input
              label="رقم الهاتف"
              type="text"
              value={formDetails.phoneNumber}
             name="phoneNumber"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="أدخل رقم الهاتف"
              icon={<FiPhone />}
               onChange={handleChange}
            />
            
             <Input
              label="البريد الإلكتروني"
              type="email"
              value={formDetails.email}
             name="email"
              placeholder="أدخل البريد الإلكتروني"
              icon={<FiMail />}
               onChange={handleChange}
            />

          

            <Input
              label="تأكيد كلمة المرور"
              type="password"
              value={formDetails.confirmPssword}
             name="confirmPssword"
              placeholder="اعد ادخال كلمة المرور"
              icon={<FiLock />}
               onChange={handleChange}
            />
            
              <Input
              label="كلمة المرور"
              type="password"
              value={formDetails.password}
             name="password"
              placeholder="ادخل كلمة المرور"
              icon={<FiLock />}
               onChange={handleChange}
            />

            <div className="terms">
              <input type="checkbox" id="terms" />
              
              <label htmlFor="terms">أوافق على الشروط والأحكام</label>
            </div>

            <button className="register-btn">إنشاء الحساب</button>

            <div className="login-link">
              لديك حساب بالفعل؟
              <Link to="/">تسجيل الدخول</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
