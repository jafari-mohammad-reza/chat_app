import React, {Fragment, useEffect, useState} from "react";
import {Form, FormContainer} from "../components/AuthComponents";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

function Login() {

    const navigate = useNavigate();
    useEffect(() => {
        if (JSON.parse(localStorage.getItem("user"))) {
            navigate("/");
        }
    }, [])

    async function handleSubmit(e) {
        e.preventDefault();
        const body = {identifier, password,};
        if ((!identifier || !password)) {
            return alert("Please fill all fields");
        }
        await axios
            .post("http://localhost:5000/api/auth/login", body)
            .then((result) => {
                if (result.status === 200) {
                    localStorage.setItem("user", JSON.stringify(result.data.user))
                    alert("Logged In successful");
                    navigate("/set-avatar");
                } else {
                    return alert("Loggin failed");
                }
            })
            .catch((err) => {
                console.log(err);
                alert(err.response.data.message)

            });
    }

    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    return (
        <Fragment>
            <FormContainer>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <div className="brand">
                        <img src="" alt="" className="logo"/>
                        <h1>ChatApp</h1>
                    </div>

                    <input
                        type="text"
                        required
                        name="identifier"
                        placeholder="Username or email"
                        onChange={(e) => setIdentifier(e.target.value)}
                    />
                    <input
                        type="password"
                        required
                        name="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">Login</button>
                    <span>
            Don't have any account yet ? <Link to="/Register">Register</Link>
          </span>
                </Form>
            </FormContainer>
        </Fragment>
    );
}

export default Login;
