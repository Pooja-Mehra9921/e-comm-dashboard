// AddProduct.js
import React, { useState } from "react";
import "./style.css";

const AddProduct = () => {
  const [CategoryName, setCategoryName] = useState("");
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");
  const [halfPrice, setHalfPrice] = useState("");
  const [fullPrice, setFullPrice] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAddProduct = async () => {
    if (!CategoryName || !name || !img || !description || !halfPrice || !fullPrice) {
      setError(true);
      setSuccess(false);
      return;
    }

    const productData = {
      CategoryName,
      name,
      img,
      description,
      options: [{ half: halfPrice, full: fullPrice }],
    };

    try {
      const response = await fetch("http://localhost:5000/add-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      const result = await response.json();

      if (result) {
        setCategoryName("");
        setName("");
        setImg("");
        setDescription("");
        setHalfPrice("");
        setFullPrice("");
        setSuccess(true);
        setError(false);
      }
    } catch (err) {
      console.error("Error adding product:", err);
      setError(true);
      setSuccess(false);
    }
  };

  return (
    <div className="add-prod-main-container">
      <div className="add-prod-container">
        <h1 className="product-heading">➕ Add New Food Item</h1>

        <input className="inputbox" type="text" placeholder="Category (e.g., Pizza)" value={CategoryName} onChange={(e) => setCategoryName(e.target.value)} />
        {error && !CategoryName && <span className="error-msg">Category is required.</span>}

        <input className="inputbox" type="text" placeholder="Food Name" value={name} onChange={(e) => setName(e.target.value)} />
        {error && !name && <span className="error-msg">Food name is required.</span>}

        <input className="inputbox" type="text" placeholder="Image URL" value={img} onChange={(e) => setImg(e.target.value)} />
        {error && !img && <span className="error-msg">Image URL is required.</span>}

        <input className="inputbox" type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        {error && !description && <span className="error-msg">Description is required.</span>}

        <input className="inputbox" type="text" placeholder="Half Price" value={halfPrice} onChange={(e) => setHalfPrice(e.target.value)} />
        {error && !halfPrice && <span className="error-msg">Half price is required.</span>}

        <input className="inputbox" type="text" placeholder="Full Price" value={fullPrice} onChange={(e) => setFullPrice(e.target.value)} />
        {error && !fullPrice && <span className="error-msg">Full price is required.</span>}

        <button className="add-product-btn" onClick={handleAddProduct}>Add Product</button>

        {success && <p className="success-msg">🎉 Product added successfully!</p>}
      </div>
    </div>
  );
};

export default AddProduct;