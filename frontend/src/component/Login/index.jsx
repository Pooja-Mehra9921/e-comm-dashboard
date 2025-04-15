import react, { useEffect, useState } from "react";

// styles
import "./style.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(()=>{
const auth = JSON.parse (localStorage.getItem("user"));
if(auth){
    navigate("/");
}
  },[])

  const handleLogindata = async () => {
    console.log(email, password);
    let result = await fetch("http://localhost:5000/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);

    if (result.name) {
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/");
    } else {
      console.alert("please enter valid credencials ");
    }
  };

  return (
    <>
      <div className="login-main-container">
        <div className="login-container">
          <h1 className="login-heading">Login</h1>
          <input
            className="inputbox"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            className="inputbox"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button onClick={handleLogindata} className="login-btn">
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
