import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./Input.css";

function Input({
  label,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  icon,
  error,
}) {
  // هل الباسورد ظاهر؟
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="input-group">
      {/* عنوان الحقل */}
      <label>{label}</label>

      <div className={`input-box ${error ? "error" : ""}`}>
        {/* الأيقونة */}
        <span className="input-icon">{icon}</span>

        {/* الـ Input */}
        <input
          type={
            type === "password"
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />

        {/* العين تظهر للباسورد فقط */}
        {/* {type === "password" && (
          <button
            type="button"
            className="eye-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        )} */}
      </div>

      {/* رسالة الخطأ */}
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

export default Input;


