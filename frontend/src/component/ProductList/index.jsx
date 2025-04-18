import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchProductList();
  }, []);

  const fetchProductList = async () => {
    try {
      setLoading(true);
      setErrorMsg("");

      const response = await fetch("http://localhost:5000/products", {
        headers: {
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      });

      if (!response.ok) throw new Error("Failed to fetch product list.");

      const result = await response.json();
      setProducts(result);
    } catch (error) {
      setErrorMsg(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBtn = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/product/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete the product.");

      const result = await response.json();
      if (result) {
        fetchProductList();
      }
    } catch (error) {
      alert(error.message || "An error occurred while deleting the product.");
    }
  };

  const handleSearchProduct = async (e) => {
    const key = e.target.value.trim();
    setErrorMsg("");

    if (key) {
      try {
        const response = await fetch(`http://localhost:5000/search/${key}`, {
          headers: {
            authorization: JSON.parse(localStorage.getItem("token")),
          },
        });

        if (!response.ok) throw new Error("Search failed.");

        const result = await response.json();
        setProducts(result.length ? result : []);
      } catch (error) {
        setErrorMsg("Error searching for products. Please try again.");
      }
    } else {
      fetchProductList();
    }
  };

  return (
    <div className="productlist-main-container">
      <div className="productlist-container">
        <h1 className="product-list-heading">📦 Product List</h1>

        <input
          className="inputbox search-box"
          type="text"
          placeholder="🔍 Search by name, company, or category"
          onChange={handleSearchProduct}
          aria-label="Search Product"
        />

        {loading ? (
          <p className="info-text">Loading products, please wait...</p>
        ) : errorMsg ? (
          <p className="error-text">{errorMsg}</p>
        ) : products.length === 0 ? (
          <p className="info-text">No products available.</p>
        ) : (
          <table className="productlist-table">
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Company</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td>{item.category}</td>
                  <td>{item.company}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn delete-btn"
                        onClick={() => handleDeleteBtn(item._id)}
                      >
                        🗑️ Delete
                      </button>
                      <button
                        className="btn update-btn"
                        onClick={() => navigate("/update/" + item._id)}
                      >
                        ✏️ Update
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProductList;
