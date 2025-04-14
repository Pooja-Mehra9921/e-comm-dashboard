import React, { useEffect, useState } from "react";

import "./style.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(()=>{
const auth = JSON.parse (localStorage.getItem("user"));
if(auth){
    navigate("/");
}

  },[])

  const handleInputBox = (type) => (e) => {
    const value = e.target.value;
    if (type === "name") {
      setName(value);
    }
    if (type === "email") {
      setEmail(value);
    }
    if (type === "password") {
      setPassword(value);
    }
  };

  const handleSignupData = async () => {
    let result = await fetch("http://localhost:5000/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-type": "application/json",
      },
    });
    result = await result.json();
    localStorage.setItem("user", JSON.stringify(result));
    navigate("/");
  };

  return (
    <>
      <div className="signup-main-container">
        <div className="signup-container">
          <h1 className="register-heading">Register</h1>
          <input
            className="inputbox"
            value={name}
            type="text"
            placeholder="Enter Name"
            onChange={handleInputBox("name")}
          />
          <input
            className="inputbox"
            value={email}
            type="email"
            placeholder="Enter Email"
            onChange={handleInputBox("email")}
          />
          <input
            className="inputbox"
            value={password}
            type="password"
            placeholder="Enter Password"
            onChange={handleInputBox("password")}
          />
          <div className="btn-container">
            <button className="signup-btn" onClick={handleSignupData}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
