
import { useEffect, useState } from "react";

function EmployeeForm({
  onClose,
  onAdd,
  onUpdate,
  editingEmployee,
}) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    position: "",
    salary: "",
    email: "",
    status: "نشط",

    // بيانات تسجيل الدخول
    username: "",
    password: "",
    role: "employee",
  });

  useEffect(() => {
    if (editingEmployee) {
      setFormData({
        name: editingEmployee.name || "",
        phone: editingEmployee.phone || "",
        position: editingEmployee.role || "",
        salary: editingEmployee.salary || "",
        email: editingEmployee.email || "",
        status: editingEmployee.status || "نشط",

        username: editingEmployee.username || "",
        password: editingEmployee.password || "",
        role: editingEmployee.accountRole || "employee",
      });
    } else {
      setFormData({
        name: "",
        phone: "",
        position: "",
        salary: "",
        email: "",
        status: "نشط",

        username: "",
        password: "",
        role: "employee",
      });
    }
  }, [editingEmployee]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingEmployee) {
      onUpdate(formData);
    } else {
      onAdd(formData);
    }
  };

  return (
    <form
      className="employee-form"
      onSubmit={handleSubmit}
    >
      <div className="form-group">
        <label>اسم الموظف</label>

        <input
          type="text"
          name="name"
          placeholder="أدخل اسم الموظف"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>رقم الهاتف</label>

        <input
          type="tel"
          name="phone"
          placeholder="أدخل رقم الهاتف"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>الوظيفة</label>

        <input
          type="text"
          name="position"
          placeholder="مثال: كاشير"
          value={formData.position}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>الراتب</label>

        <input
          type="number"
          name="salary"
          placeholder="أدخل الراتب"
          value={formData.salary}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>البريد الإلكتروني</label>

        <input
          type="email"
          name="email"
          placeholder="أدخل البريد الإلكتروني"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>الحالة</label>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="نشط">نشط</option>
          <option value="غير نشط">غير نشط</option>
        </select>
      </div>

      {/* بيانات الحساب */}

      <div className="form-group">
        <label>اسم المستخدم</label>

        <input
          type="text"
          name="username"
          placeholder="أدخل اسم المستخدم"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>كلمة المرور</label>

        <input
          type="password"
          name="password"
          placeholder="أدخل كلمة المرور"
          value={formData.password}
          onChange={handleChange}
          required={!editingEmployee}
        />
      </div>

      <div className="form-group">
        <label>نوع الحساب</label>

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="employee">موظف</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="employee-form-actions">
        <button
          type="button"
          className="cancel-btn"
          onClick={onClose}
        >
          إلغاء
        </button>

        <button
          type="submit"
          className="save-btn"
        >
          {editingEmployee
            ? "حفظ التعديلات"
            : "حفظ الموظف"}
        </button>
      </div>
    </form>
  );
}

export default EmployeeForm;

