import React, { useState } from "react";
import "./style.css";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAddProductBtn = async () => {
    const userId = JSON.parse(localStorage.getItem("user"))?._id;
    if (!name || !price || !category || !company) {
      setError(true);
      setSuccess(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/add-product", {
        method: "POST",
        body: JSON.stringify({ name, price, category, company, userId }),
        headers: {
          "Content-type": "application/json",
        },
      });

      const result = await response.json();

      if (result) {
        setName("");
        setPrice("");
        setCategory("");
        setCompany("");
        setSuccess(true);
        setError(false);
      }
    } catch (err) {
      setError(true);
      setSuccess(false);
      console.error("Product not added:", err);
    }
  };

  return (
    <div className="add-prod-main-container">
      <div className="add-prod-container">
        <h1 className="product-heading">➕ Add New Product</h1>

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
        {error && !category && <span className="error-msg">Product category is required.</span>}

        <input
          className="inputbox"
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        {error && !company && <span className="error-msg">Company name is required.</span>}

        <button className="add-product-btn" onClick={handleAddProductBtn}>
          Add Product
        </button>

        {success && <p className="success-msg">🎉 Product added successfully!</p>}
      </div>
    </div>
  );
};

export default AddProduct;
