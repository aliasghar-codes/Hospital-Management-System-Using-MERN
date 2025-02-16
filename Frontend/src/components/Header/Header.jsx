import React, { useRef } from 'react'
import "./Header.css"
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"
import useMainContext from "../../Context.js"
import { FaSun, FaMoon } from "react-icons/fa"
import { RiAdminFill } from "react-icons/ri";
import { IoMenu } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";

const Navbar = () => {
    const navigateTo = useNavigate();
    const currentLocation = useLocation();
    const homeRoute = currentLocation.pathname === "/";

    const { isAuthenticated, user, setUser, setIsAuthenticated, themeMode, setThemeMode } = useMainContext();

    const mobileNav = useRef();

    const goToLogin = () => {
        navigateTo("/login");
    };

    const handleLogout = async () => {
        try {
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

            setIsAuthenticated(false);
            setUser({});
            handleCloseNav();
        } catch (error) {
            toast.error("Error occured while logging out");
        }
    }

    async function changeTheme() {

        try {
            await axios.get(`http://localhost:4000/api/v1/user/change-theme/${themeMode ? "Light" : "Dark"}`, {
                withCredentials: true
            });
        } catch (error) {
            toast.error("Error occured while changing theme");
            return;
        }

        setThemeMode(!themeMode);
        const body = document.getElementsByTagName("body")[0];
        themeMode ? body.classList.remove("dark") : body.classList.add("dark");
    }

    const handleCloseNav = () => {
        mobileNav.current.style.display = "none";
    }

    const handleShowNav = () => {
        mobileNav.current.style.display = "block";
    }

    return (
        <>
            <header style={themeMode || !homeRoute ? { backgroundImage: "url('')", borderBottom: ".5px solid grey" } : null} >
                <Link to="/">
                    <div className="logo">
                        <span>+</span>
                        <h3 style={themeMode ? { color: 'white' } : null}>
                            MediBot
                        </h3>
                    </div>
                </Link>
                <nav>
                    <ul>
                        <li>
                            <NavLink style={themeMode ? { color: 'white' } : null}
                                className={({ isActive }) => `${isActive ? "activeLink" : " nonActiveLink"}`}
                                to={"/"}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink style={themeMode ? { color: 'white' } : null}
                                className={({ isActive }) => `${isActive ? "activeLink" : " nonActiveLink"}`}
                                to={"/appointment"}>
                                Appointment
                            </NavLink>
                        </li>
                        <li>
                            <NavLink style={themeMode ? { color: 'white' } : null}
                                className={({ isActive }) => `${isActive ? "activeLink" : " nonActiveLink"}`}
                                to="/about">
                                About Us
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <div className='header-btns'>
                    {
                        themeMode ?
                            (<button style={{ color: 'white' }} className='theme-btn'
                                onClick={changeTheme} >
                                <FaSun />
                            </button>) :

                            (<button className='theme-btn' onClick={changeTheme}>
                                <FaMoon />
                            </button>)
                    }
                    {
                        isAuthenticated ?
                            user.role == "User" ? (
                                <button
                                    className='login_button logout_button'
                                    onClick={handleLogout} >
                                    <span>LOGOUT</span>
                                </button>
                            ) :
                                <Link to="/admin">
                                    <RiAdminFill
                                        style={themeMode ? { color: 'white' } : null} />
                                </Link>

                            : (
                                <button onClick={goToLogin} className="login_button">
                                    <span>Log In</span>
                                </button>)
                    }
                </div>
                <IoMenu className='hamburger-menu' onClick={handleShowNav} />
                <div className="mobile-nav" ref={mobileNav}
                    style={themeMode ? { backgroundColor: "var(--color-dark)" } : {}}>
                    <div className="top">
                        <div className="theme-btns-mobile">
                            {
                                themeMode ?
                                    (<button
                                        className='theme-btn-mobile'
                                        onClick={changeTheme} >
                                        <FaSun />
                                    </button>) :

                                    (<button
                                        className='theme-btn-mobile'
                                        onClick={changeTheme}>
                                        <FaMoon />
                                    </button>)
                            }
                        </div>
                        <IoCloseSharp className='icon' onClick={handleCloseNav} />
                    </div>
                    <ul>
                        <li>
                            <NavLink
                                onClick={handleCloseNav} 
                                style={themeMode ? { color: 'white' } : null}
                                className={({ isActive }) => `${isActive ? "activeLink" : " nonActiveLink"}`}
                                to={"/"} >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                onClick={handleCloseNav} 
                                style={themeMode ? { color: 'white' } : null}
                                className={({ isActive }) => `${isActive ? "activeLink" : " nonActiveLink"}`}
                                to={"/appointment"}>
                                Appointment
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                onClick={handleCloseNav}  
                                style={themeMode ? { color: 'white' } : null}
                                className={({ isActive }) => `${isActive ? "activeLink" : " nonActiveLink"}`}
                                to="/about">
                                About Us
                            </NavLink>
                        </li>
                        {
                            isAuthenticated ?
                                user.role == "User" ? null : (
                                    <li>
                                        <NavLink
                                            onClick={handleCloseNav}  
                                            style={themeMode ? { color: 'white' } : null}
                                            className={({ isActive }) => `${isActive ? "activeLink" : " nonActiveLink"}`}
                                            to="/admin">
                                            Admin Panel
                                        </NavLink>
                                    </li>
                                ) : null}
                    </ul>
                    <div className='header-btns-mobile'>
                        {
                            isAuthenticated ?
                                user.role == "User" ? (
                                    <button
                                        className='logout-btn-mobile'
                                        onClick={handleLogout} >
                                        <span>Logout</span>
                                    </button>
                                ) : null
                                : (
                                    <button onClick={goToLogin} className="login-btn-mobile">
                                        <span>Log In</span>
                                    </button>)
                        }
                    </div>
                </div>
            </header>
        </>
    )
}

export default Navbar