import react from "react";
import "./style.css"

const AddProduct = ()=>{
    return(
        <>
        <div className="add-prod-main-container">
        <div className="add-prod-container">
        <h1 className="product-heading">Add Product</h1>
        <input className="inputbox" type="text" placeholder="Enter product name" />
        <input className="inputbox" type="text" placeholder="Enter product price" />
        <input className="inputbox" type="text" placeholder="Enter product category" />
        <input className="inputbox" type="text" placeholder="Enter product company" />
        <button className="add-product-btn">Add Product</button>
        </div>
        </div>


        </>
    )
};

export default AddProduct;