import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [signupError, setSignupError] = useState("");

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("user"));
    if (auth) {
      navigate("/");
    }
  }, []);

  const handleInputBox = (type) => (e) => {
    const value = e.target.value;
    if (type === "name") setName(value);
    if (type === "email") setEmail(value);
    if (type === "password") setPassword(value);
    setSignupError(""); // clear error on typing
  };

  const handleSignupData = async () => {
    if (!name || !email || !password) {
      setError(true);
      return;
    }

    try {
      const result = await fetch("http://localhost:6000/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "Content-type": "application/json",
        },
      });

      const data = await result.json();

      if (data.auth) {
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("token", JSON.stringify(data.auth));
        navigate("/");
      } else {
        setSignupError("❌ Email already exists or something went wrong.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setSignupError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="signup-main-container">
      <div className="signup-container">
        <h1 className="register-heading">📝 Sign Up</h1>

        <input
          className="inputbox"
          value={name}
          type="text"
          placeholder="Enter Name"
          onChange={handleInputBox("name")}
        />
        {error && !name && (
          <span className="error-msg">Please enter a valid name</span>
        )}

        <input
          className="inputbox"
          value={email}
          type="email"
          placeholder="Enter Email"
          onChange={handleInputBox("email")}
        />
        {error && !email && (
          <span className="error-msg">Please enter a valid email</span>
        )}

        <input
          className="inputbox"
          value={password}
          type="password"
          placeholder="Enter Password"
          onChange={handleInputBox("password")}
        />
        {error && !password && (
          <span className="error-msg">Password is required</span>
        )}

        <div className="btn-container">
          <button className="signup-btn" onClick={handleSignupData}>
            Sign Up
          </button>
        </div>

        {signupError && <span className="error-msg">{signupError}</span>}
      </div>
    </div>
  );
};

export default Signup;
