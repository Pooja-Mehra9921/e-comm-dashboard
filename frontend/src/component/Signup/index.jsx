import React, { useState } from "react";

import "./style.css"

const Signup = ()=>{
   
 const[name, setName] = useState();
 const[email, setEmail] = useState();
 const[password, setPassword] = useState();

const handleInputBox =(type)=>(e)=>{
    const value = e.target.value
    if(type === "name"){setName(value)}
    if(type === "email"){setEmail(value)}
    if(type === "password"){setPassword(value)}
}

const handleSignupData = ()=>{
    console.log(name, email, password);
}


    return(
        <>
        <div className="signup-main-container">
            <div className="signup-container" >
            <h1 className="register-heading">Register</h1>
            <input className="inputbox" value={name} type="text" placeholder="Enter Name" onChange={handleInputBox("name")} />
            <input className="inputbox" value={email} type="email" placeholder="Enter Email" onChange={handleInputBox("email")}/>
            <input className="inputbox" value={password} type="password" placeholder="Enter Password" onChange={handleInputBox("password")} />
            <div className="btn-container">
            <button className="signup-btn" onClick={handleSignupData}>Sign Up</button>

            </div>
            </div>
            
        </div>
        </>
    )
};

export default Signup;