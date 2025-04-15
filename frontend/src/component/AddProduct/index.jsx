import react from "react";
import "./style.css"

const AddProduct = ()=>{
    return(
        <>
        <div className="add-prod-main-container">
        <h1>Add Product</h1>
        <input type="text" placeholder="Enter product name" />
        <input type="text" placeholder="Enter product price" />
        <input type="text" placeholder="Enter product category" />
        <input type="text" placeholder="Enter product company" />
        <button>Add Product</button>
        </div>


        </>
    )
};

export default AddProduct;