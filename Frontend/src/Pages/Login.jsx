import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import "./css/login.css"
import axios from 'axios'
import loginImage from "../images/login image.png"
import useMainContext from "../Context.js"

const Login = () => {
    const { isAuthenticated, setIsAuthenticated } = useMainContext();

    if(isAuthenticated){
        return <Navigate to={"/"} />
    }
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigateTo = useNavigate();

    const handleLogin = async e => {

        e.preventDefault();

        try{
            const response = await axios.post(
                "http://localhost:4000/api/v1/user/login",
                {email, password},
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            toast.success(response.data.message);
            setIsAuthenticated(true);
            navigateTo("/");
        } catch (error){
            toast.error(error.response.data.message);
            console.log(error.response.data.message);
        }
    }

    return (
        <section className="login_body">
            <div className="login-container container">
                <div className="login-left">
                    <img src={loginImage} alt="" />
                </div>
                <div className="login-right">
                    <h2>Login Account </h2>
                    <form onSubmit={handleLogin}>
                        <input 
                        required 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        type="email" 
                        placeholder='Email ID' 
                        name='email' />

                        <input 
                        required 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        type="password" 
                        name='pass'
                        placeholder='Password' />

                        <div className="login-bottom">
                            <div className="keep-signed">
                                <input type="checkbox" id='kmsi' />
                                <label htmlFor="kmsi">
                                    Keep me signed in
                                </label>
                            </div>
                            <Link to={"/register"} style={{ textDecoration: "none", color: "rgb(2, 2, 172)" }}>Not a member?</Link>
                        </div>
                        <button type="submit">LOGIN</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Login