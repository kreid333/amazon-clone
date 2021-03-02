import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const postRequest = () => {
    axios
      .post("/api/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        if (response.data === "Successfully authenticated") {
          history.push("/");
        } else {
          alert("Invalid login credentials. Please try again.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    postRequest();
  };

  const handleRegister = (e) => {
    axios
      .post("/api/register", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        if (response.data === "User created.") {
          postRequest();
        } else {
          alert("Invalid register credentials. Please try again.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>
      <div className="login-container">
        <h1>Sign-In</h1>
        <form>
          <h5>Email</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            type="submit"
            className="login-signInButton"
            onClick={handleSignIn}
          >
            Sign in
          </button>
        </form>
        <p>
          By signing-in you agree to the AMAZON CLONE Conditions of Use and
          Sale. Please see our Privacy Notice and our Interest-Based Ads Notice.
        </p>
        <button className="login-registerButton" onClick={handleRegister}>
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
};

export default Login;
