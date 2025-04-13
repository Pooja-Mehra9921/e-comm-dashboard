import React from "react";
import {Link} from "react-router-dom";

import "./style.css"


const Header = ()=>{
    return(
        <>
        <div className="nav-container">
            <ul className="nav-ul">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/product">Product</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                <li><Link to="/update">Update Product</Link></li>
                <li><Link to="/logout">Logout</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/signup">Sign up</Link></li>
            </ul>
        </div>
        </>
    )
};

export default Header;