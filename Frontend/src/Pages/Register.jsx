import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import "./css/register.css"
import axios from 'axios'
import loginImage from "../images/login image.png"
import useMainContext from "../Context.js"

const Register = () => {
    const { isAuthenticated, setIsAuthenticated } = useMainContext();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [nic, setNic] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");

    const navigateTo = useNavigate();
    
    if (isAuthenticated) {
        return <Navigate to={"/"} />
    }

    const handleRegister = async e => {
        e.preventDefault();

        try{
            const response = await axios.post(
                "http://localhost:4000/api/v1/user/register",
                {firstName, lastName, email, phone, nic, dob, gender, password},
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
        }catch(err){
            toast.error(err.response.data.message);
            console.log(err.response.data.message);
        }

    }

    return (
        <section className="register_body">
            <div className="register-container container">
                <div className="register-left">
                    <img src={loginImage} alt="" />
                </div>
                <div className="register-right">
                    <h2>Register Account</h2>
                    <form onSubmit={handleRegister}>
                        <div>
                        <input 
                        required
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        placeholder='First Name'
                        name='firstName'
                        type="text" />

                        <input 
                        required
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        placeholder='Last Name'
                        name='lastName'
                        type="text" />
                        </div>

                        <div>
                        <input 
                        required 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        type="email" 
                        placeholder='Email ID' 
                        name='email' />

                        <input 
                        required 
                        value={phone} 
                        onChange={e => setPhone(e.target.value)} 
                        type="tel" 
                        placeholder='Phone Number' 
                        name='phone' />
                        </div>

                        <div>
                        <input 
                        required 
                        value={nic} 
                        onChange={e => setNic(e.target.value)} 
                        type="text" 
                        placeholder='NIC' 
                        name='nic' />

                        <input 
                        required 
                        value={dob} 
                        onChange={e => setDob(e.target.value)} 
                        type="date" 
                        placeholder='Date of Birth' 
                        name='dob' />
                        </div>

                        <div>
                            
                        <select name="gender" value={gender} 
                        onChange={e => setGender(e.target.value)}>
                            <option value="Select Gender">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>

                        <input 
                        required 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        type="password" 
                        name='pass' 
                        placeholder='Password' />
                        </div>

                        <div id="register-bottom">
                            <Link to={"/login"} style={{ textDecoration: "none", color: "rgb(2, 2, 172)" }}>Already Registered?</Link>
                        </div>
                        <button type="submit">Signup</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Register