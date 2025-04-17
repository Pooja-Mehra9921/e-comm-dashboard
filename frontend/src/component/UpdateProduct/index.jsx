import react, { useEffect, useState, } from "react";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
    const navigate = useNavigate();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [company, setCompany] = useState();
  const [error, setError] = useState(false);
  const params = useParams();

useEffect(()=>{
    handleUpdateProductApi();
},[])
  const handleUpdateProductApi = async()=>{
let result = await fetch(`http://localhost:5000/product/${params.id}`)
result = await result.json();
console.log(result);
setName(result.name);
setCategory(result.category);
setCompany(result.company);
setPrice(result.price);
  }

  const handleUpdateProductBtn = async () => {  
    console.log(name, price, category, company);
    let result = await fetch(`http://localhost:5000/update/${params.id}`,{
        method:"put",
        body:JSON.stringify({name, category, company, price}),
        headers:{
            "content-type" : "application/json"
        }
    })

    result = await result.json();
    console.log(result);
    navigate("/");
  };

  return (
    <>
      <div className="add-prod-main-container">
        <div className="add-prod-container">
          <h1 className="product-heading">Update Product</h1>
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

          <button className="add-product-btn" onClick={handleUpdateProductBtn}>
            Update Product
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
