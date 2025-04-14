import React from "react";
import {Link, useNavigate} from "react-router-dom";

import "./style.css"


const Header = ()=>{
    const navigate = useNavigate();
const auth = JSON.parse (localStorage.getItem("user"));

const handleLogout = ()=>{
    localStorage.clear();
    navigate("/signup")
}

    return(
        <>
        <div className="nav-container">
            <ul className="nav-ul">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                <li><Link to="/update">Update Product</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li>{ auth? <Link to="/signup" onClick={handleLogout}>Logout</Link> : <Link to="/signup">Sign up</Link>}</li>
            </ul>
        </div>
        </>
    )
};

export default Header;