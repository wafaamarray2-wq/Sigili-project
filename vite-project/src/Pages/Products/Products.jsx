import { useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import ProductModal from "./ProductModal";
import { useEffect } from "react";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("products");

    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);
  const [editingId, setEditingId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",

    price: "",
    quantity: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addProduct = () => {
    if (!form.name || !form.price || !form.quantity) return;

    if (editingId) {
      setProducts(
        products.map((item) =>
          item.id === editingId ? { ...item, ...form } : item,
        ),
      );

      setEditingId(null);
    } else {
      setProducts([
        ...products,
        {
          id: products.length + 1,
          ...form,
        },
      ]);
    }

    setForm({
      name: "",
      price: "",
      quantity: "",
    });
  };

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  const deleteProduct = (id) => {
    if (window.confirm("هل أنت متأكد من حذف المنتج؟")) {
      setProducts(products.filter((item) => item.id !== id));
    }
  };

  const editProduct = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    });

    setEditingId(product.id);

    setOpenModal(true);
  };
  return (
    <div className="products-page">
      <div className="products-header">
        <h2>📦 المنتجات</h2>

        <button className="add-btn" onClick={() => setOpenModal(true)}>
          <FiPlus />
          إضافة منتج
        </button>
      </div>

      <div className="search-box">
        <FiSearch className="search-icon" />

        <input
          type="text"
          placeholder="ابحث عن منتج..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="products-table">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>الاسم</th>

              <th>السعر</th>
              <th>الكمية</th>
              <th>التحكم</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>

                <td>{item.name}</td>

                <td>{item.price} ج.م</td>

                <td>{item.quantity}</td>

                <td>
                  <button
                    className="edit-btn"
                    onClick={() => editProduct(item)}
                  >
                    تعديل
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteProduct(item.id)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ProductModal open={openModal} onClose={() => setOpenModal(false)}>
        <div className="modal-form">
          <input
            type="text"
            placeholder="اسم المنتج"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="number"
            placeholder="السعر"
            name="price"
            value={form.price}
            onChange={handleChange}
          />

          <input
            type="number"
            placeholder="الكمية"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
          />
        </div>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={() => setOpenModal(false)}>
            إلغاء
          </button>

          <button
            className="save-btn"
            onClick={() => {
              addProduct();
              setOpenModal(false);
            }}
          >
            حفظ المنتج
          </button>
        </div>
      </ProductModal>
    </div>
  );
}

export default Products;
