import "./EmployeeSearch.css";
import { FaPlus, FaSearch } from "react-icons/fa";
function EmployeeSearch({ search, setSearch, onAdd }) {
  return (
    <div className="employee-search">

     <button
    className="add-employee-btn"
    onClick={onAdd}
>
    <FaPlus />
    إضافة موظف
</button>

      <div className="employee-search-input">

  <FaSearch className="search-icon" />

  <input
    type="text"
    placeholder="ابحث عن موظف..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

</div>

    </div>
  );
}

export default EmployeeSearch;