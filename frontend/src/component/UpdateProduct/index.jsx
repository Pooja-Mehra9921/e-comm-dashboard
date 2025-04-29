import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const res = await fetch(`http://localhost:6000/product/${params.id}`);
      const result = await res.json();
      setName(result.name || "");
      setPrice(result.price || "");
      setCategory(result.category || "");
      setCompany(result.company || "");
    } catch (err) {
      console.error("Failed to fetch product:", err);
    }
  };

  const handleUpdateProductBtn = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return;
    }

    try {
      const response = await fetch(`http://localhost:6000/update/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({ name, price, category, company }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (result) {
        setSuccess(true);
        setError(false);
        setTimeout(() => navigate("/"), 1500); // Navigate after showing message
      }
    } catch (err) {
      console.error("Update failed:", err);
      setError(true);
    }
  };

  return (
    <div className="add-prod-main-container">
      <div className="add-prod-container">
        <h1 className="product-heading">✏️ Update Product</h1>

        <input
          className="inputbox"
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error && !name && <span className="error-msg">Product name is required.</span>}

        <input
          className="inputbox"
          type="text"
          placeholder="Product Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {error && !price && <span className="error-msg">Product price is required.</span>}

        <input
          className="inputbox"
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        {error && !category && <span className="error-msg">Category is required.</span>}

        <input
          className="inputbox"
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        {error && !company && <span className="error-msg">Company name is required.</span>}

        <button className="add-product-btn" onClick={handleUpdateProductBtn}>
          Update Product
        </button>

        {success && <p className="success-msg">✅ Product updated successfully!</p>}
      </div>
    </div>
  );
};

export default UpdateProduct;
