import "./EmployeeTable.css";
import EmployeeRow from "./EmployeeRow";

function EmployeeTable({ employees, search, onEdit, onDelete }) {
  const filteredEmployees = employees.filter((employee) => {
    const searchValue = search.toLowerCase().trim();

    return (
      employee.name.toLowerCase().includes(searchValue) ||
      employee.role.toLowerCase().includes(searchValue) ||
      employee.phone.includes(searchValue)
    );
  });

  return (
    <div className="employee-table-container">
      <table className="employee-table">
        <thead>
          <tr>
            <th>#</th>
            <th>الاسم</th>
            <th>الوظيفة</th>
            <th>اسم المستخدم</th>
            <th>رقم الهاتف</th>
            <th>البريد الإلكتروني</th>
            <th>الراتب</th>
            <th>الحالة</th>
            <th>الإجراءات</th>
          </tr>
        </thead>

        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee, index) => (
              <EmployeeRow
                key={employee.id}
                employee={employee}
                index={index}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          ) : (
            <tr>
              <td colSpan="9" className="employee-empty">
                {search ? "لا توجد نتائج مطابقة للبحث" : "لا يوجد موظفون"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;
