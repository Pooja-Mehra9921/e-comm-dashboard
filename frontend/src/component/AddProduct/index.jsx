import react, { useState } from "react";
import "./style.css";

const AddProduct = () => {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [company, setCompany] = useState();
  const [error, setError] = useState(false);

  const handleAddProductBtn = async () => {
    console.log(name, price, category, company);
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    if (!name || !price || !category || !company) {
      setError(true);
      return console.log(false);
    }
    let result = await fetch("http://localhost:5000/add-product", {
      method: "POST",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-type": "application/json",
      },
    });

    result = await result.json();
    console.log("result---------", result);
  };

  return (
    <>
      <div className="add-prod-main-container">
        <div className="add-prod-container">
          <h1 className="product-heading">Add Product</h1>
          <input
            className="inputbox"
            type="text"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          {error && !name && <span className="error-msg">Please Enter valid name</span>}
          <input
            className="inputbox"
            type="text"
            placeholder="Enter product price"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          {error && !price && <span className="error-msg">Please Enter valid price</span>}

          <input
            className="inputbox"
            type="text"
            placeholder="Enter product category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
          {error && !category && <span className="error-msg">Please Enter valid category</span>}

          <input
            className="inputbox"
            type="text"
            placeholder="Enter product company"
            value={company}
            onChange={(e) => {
              setCompany(e.target.value);
            }}
          />
          {error && !company && <span className="error-msg">Please Enter valid company</span>}

          <button className="add-product-btn" onClick={handleAddProductBtn}>
            Add Product
          </button>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
