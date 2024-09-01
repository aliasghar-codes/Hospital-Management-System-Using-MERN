import React from 'react'
import "./Header.css"
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"
import useMainContext from "../../Context.js"
import { FaSun, FaMoon } from "react-icons/fa"

const Navbar = () => {
    const navigateTo = useNavigate();
    const currentLocation = useLocation();
    const homeRoute = currentLocation.pathname === "/";

    const { isAuthenticated, setIsAuthenticated, themeMode, setThemeMode } = useMainContext();

    const goToLogin = () => {
        navigateTo("/login");
    }

    const handleLogout = async () => {
        await axios.get(
            "http://localhost:4000/api/v1/user/logout",
            {
                withCredentials: true
            })
        .then(res => {
            toast.success(res.data.message);
            setIsAuthenticated(false);
        })
        .catch(err => {
            toast.error(err.response.data.message);
        })
    }
    
    function changeTheme(){
        setThemeMode(!themeMode);
        const body = document.getElementsByTagName("body")[0];
        themeMode ? body.classList.remove("dark") : body.classList.add("dark");
    }

    return (
        <>
        <header style={themeMode || !homeRoute ? { backgroundImage: "url('')", borderBottom: ".5px solid grey" } : null} >
            <div className="logo">
                <Link to="/">
                <h3 style={themeMode ? { color: 'white' } : null}><span>+</span> MediBot</h3>
                </Link>
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink style={themeMode ? { color: 'white' } : null} 
                        className={({isActive}) => `${isActive ? "activeLink" : " nonActiveLink"}`}
                        to={"/"}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink style={themeMode ? { color: 'white' } : null} 
                        className={({isActive}) => `${isActive ? "activeLink" : " nonActiveLink"}`}
                        to={"/appointment"}>
                            Appointment
                        </NavLink>
                    </li>
                    <li>
                        <NavLink style={themeMode ? { color: 'white' } : null} 
                        className={({isActive}) => `${isActive ? "activeLink" : " nonActiveLink"}`}
                        to="/about">
                            About Us
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div className='header-btns'>
            {
                themeMode ? 
                (<button style={{ color: 'white' }}  className='theme-btn' onClick={changeTheme}><FaSun /></button>) : 
                (<button className='theme-btn' onClick={changeTheme}><FaMoon /></button>)
            }
            {
                isAuthenticated ? (<button className='login_button logout_button' onClick={handleLogout}><span>LOGOUT</span></button>) : (<button onClick={goToLogin} className="login_button"><span>Log In</span></button>)
            }
            </div>
        </header>
        </>
    )
}

export default Navbar