import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("user"));
    if (auth) {
      navigate("/");
    }
  }, []);

  const handleLogindata = async () => {
    if (!email || !password) {
      setError(true);
      return;
    }

    try {
      let response = await fetch("http://localhost:6000/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-type": "application/json",
        },
      });

      const result = await response.json();

      if (result.data) {
        localStorage.setItem("user", JSON.stringify(result));
        localStorage.setItem("token", JSON.stringify(result.auth));
        navigate("/");
      } else {
        setLoginError("❌ Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setLoginError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="login-main-container">
      <div className="login-container">
        <h1 className="login-heading">🔐 Login</h1>

        <input
          className="inputbox"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setLoginError("");
          }}
        />
        {error && !email && (
          <span className="error-msg">Please enter a valid email</span>
        )}

        <input
          className="inputbox"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setLoginError("");
          }}
        />
        {error && !password && (
          <span className="error-msg">Password is required</span>
        )}

        <button className="login-btn" onClick={handleLogindata}>
          Login
        </button>

        {loginError && <span className="error-msg">{loginError}</span>}
      </div>
    </div>
  );
};

export default Login;
