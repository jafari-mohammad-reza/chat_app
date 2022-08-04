import React, { Fragment, useState, useEffect } from "react";
import { Form, FormContainer } from "../components/AuthComponents";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Register() {
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    const emailDomain = email.split("@")[1];
    const body = { email, username, password, confirmPassword };
    if ((!email, !username, !password, !confirmPassword)) {
      return alert("Please fill all fields");
    }
    if (!["gmail.com", "email.com", "yahoo.com"].includes(emailDomain)) {
      return alert("Please use a valid email domain");
    }
    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }
    await axios
      .post("http://localhost:5000/api/auth/register", body)
      .then((result) => {
        if (result.status === 201) {
          alert("Registration successful");
          navigate("/login");
        } else {
           alert("Registration failed");
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
         alert(err.response.data.message)
      });
  }

  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <Fragment>
      <FormContainer>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <div className="brand">
            <img src="" alt="" className="logo" />
            <h1>ChatApp</h1>
          </div>
          <input
            type="email"
            required
            name="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            required
            name="username"
            placeholder="User name"
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="password"
            required
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            required
            name="confirmPassword"
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit">Register</button>
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </Form>
      </FormContainer>
    </Fragment>
  );
}

export default Register;
