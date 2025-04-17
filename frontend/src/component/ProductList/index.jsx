import React, { useEffect, useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";

const ProductList = () => {
    const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProductList();
  }, []);

  const fetchProductList = async () => {
    let result = await fetch("http://localhost:5000/products");
    result = await result.json();
    setProducts(result);
  };

  const handleDeleteBtn = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "Delete",
    });

    result = await result.json();

    if (result) {
      fetchProductList();
    } else {
      alert("Failed to delete product");
    }
  };


  const handleSearchProduct =async(e)=>{
    let key = e.target.value;
    if(key){
      let result = await fetch(`http://localhost:5000/search/${key}`)
      result = await result.json();
      if(result){
       setProducts(result)
      }
    }else{
      setProducts();
    }
 

  }

  return (
    <div className="productlist-main-container">
      <div className="productlist-container">
        <h1 className="product-list-heading">Product List</h1>
        <input className="inputbox" type="text" placeholder="Search product" onChange={handleSearchProduct}/>

        <table className="productlist-table">
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Company</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.category}</td>
                  <td>{item.company}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteBtn(item._id)}
                      className="dlt-btn"
                    >
                      Delete
                    </button>
                    <button className="update-btn" onClick={()=>navigate("/update/"+item._id)}>Update</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
