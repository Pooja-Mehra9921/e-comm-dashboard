import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";

const UpdateFoodItem = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [CategoryName, setCategoryName] = useState("");
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");
  const [halfPrice, setHalfPrice] = useState("");
  const [fullPrice, setFullPrice] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const res = await fetch(`http://localhost:5000/product/${params.id}`);
      const result = await res.json();

      setCategoryName(result.CategoryName || "");
      setName(result.name || "");
      setImg(result.img || "");
      setDescription(result.description || "");
      setHalfPrice(result.options?.[0]?.half || "");
      setFullPrice(result.options?.[0]?.full || "");
    } catch (err) {
      console.error("Failed to fetch product:", err);
    }
  };

  const handleUpdateProduct = async () => {
    if (!CategoryName || !name || !img || !description || !halfPrice || !fullPrice) {
      setError(true);
      setSuccess(false);
      return;
    }

    const updatedProduct = {
      CategoryName,
      name,
      img,
      description,
      options: [{ half: halfPrice, full: fullPrice }],
    };

    try {
      const res = await fetch(`http://localhost:5000/update/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      const result = await res.json();

      if (result) {
        setSuccess(true);
        setError(false);
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (err) {
      console.error("Update failed:", err);
      setError(true);
      setSuccess(false);
    }
  };

  return (
    <div className="add-prod-main-container">
      <div className="add-prod-container">
        <h1 className="product-heading">✏️ Update Food Item</h1>

        <input className="inputbox" type="text" placeholder="Category" value={CategoryName} onChange={(e) => setCategoryName(e.target.value)} />
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

        <button className="add-product-btn" onClick={handleUpdateProduct}>
          Update Food Item
        </button>

        {success && <p className="success-msg">✅ Food Item updated successfully!</p>}
      </div>
    </div>
  );
};

export default UpdateFoodItem;
