import React, { useState, useEffect } from 'react'
import "./adminLogin.css"
import useMainContext from '../../Context.js';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { isAuthenticated, setIsAuthenticated, user, setUser } = useMainContext();
    const navigateTo = useNavigate();

    useEffect(() => {
        if(isAuthenticated && user.role == "Admin"){
            navigateTo("/admin")
        }
    }, [ isAuthenticated ])
    

    const handleAdminLogin = async e => {
        e.preventDefault();

        try{
            const response = await axios.post(
                "http://localhost:4000/api/v1/user/login",
                { email, password },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            toast.success(response.data.message);
            setIsAuthenticated(true);
            setUser(response.data.user);

            if(response.data.user.role === "Admin"){
                navigateTo("/admin");
            }else{
                navigateTo("/");
            }

        } catch (error){
            toast.error(error.response.data.message || "error occured while logging you in.");
        }
    }

    return (
        <main className='admin-login-main'>
            <div className="admin-login-container">
                <h2>
                    Login <sub>( Admin )</sub>
                </h2>
                <form onSubmit={handleAdminLogin}>
                    <input
                        type="text"
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        placeholder='Email'
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        placeholder='Password'
                    />
                    <button type='submit'>
                        Login
                    </button>
                </form>
            </div>
        </main>
    )
}

export default AdminLogin