import React from 'react'
import { Link } from "react-router-dom"
import "./Footer.css"
import useMainContext from "../../Context.js"

const Footer = () => {
    const { themeMode } = useMainContext();

    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <div className="footer_container container">
                <div className="footer_first">
                    <div className="logo">
                        <Link to="/">
                            <h3 style={themeMode ? { color: 'white' } : null}><span>+</span> MediBot</h3>
                        </Link>
                    </div>
                    <p style={themeMode ? { color: 'var(--color-white)' } : null}>123 Maple Street, Anytown, CA 98765</p>
                    <p style={themeMode ? { color: 'var(--color-white)' } : null}>Call us: +99999999999</p>
                    <div className="icons">
                        <div className="icon_wrapper">
                            <a href="https://www.facebook.com" target='_blank'>
                                <i className="ri-facebook-line"></i>
                            </a>
                        </div>
                        <a href="https://www.twitter.com" target='_blank'>
                            <i className="ri-twitter-fill"></i>
                        </a>
                        <a href="https://www.instagram.com" target='_blank'>
                            <i className="ri-instagram-line"></i>
                        </a>
                    </div>
                </div>
                <div className="footer_second">
                    <h3 style={themeMode ? { color: 'white' } : null}>Explore</h3>
                    <Link  style={themeMode ? { color: 'var(--color-white)' } : null} to='/'>Home</Link>
                    <Link  style={themeMode ? { color: 'var(--color-white)' } : null} to='/appointment'>Appointment</Link>
                    <Link  style={themeMode ? { color: 'var(--color-white)' } : null} to='/about'>About Us</Link>
                    <a  style={themeMode ? { color: 'var(--color-white)' } : null} href='#contact'>Contact</a>
                    <Link  style={themeMode ? { color: 'var(--color-white)' } : null} to='/login'>Login</Link>
                </div>
                <div className="footer_third">
                    <h3 style={themeMode ? { color: 'white' } : null}>Legal</h3>
                    <Link  style={themeMode ? { color: 'var(--color-white)' } : null} to='/policy'>Privacy Policy</Link>
                    <Link  style={themeMode ? { color: 'var(--color-white)' } : null} to='/terms'>Terms of Services</Link>
                    <Link  style={themeMode ? { color: 'var(--color-white)' } : null} to='/documentation'>Documentations</Link>
                    <Link  style={themeMode ? { color: 'var(--color-white)' } : null} to='/sitemap'>Site Map</Link>
                </div>
                <div className="footer_fourth">
                    <h3 style={themeMode ? { color: 'white' } : null}>Timing</h3>
                    <div className="footer_fourth_container">
                    <div className="day_container">
                        <p  style={themeMode ? { color: 'var(--color-white)' } : null}>Monday</p>
                        <p  style={themeMode ? { color: 'var(--color-white)' } : null}>Tuesday</p>
                        <p  style={themeMode ? { color: 'var(--color-white)' } : null}>Wednesday</p>
                        <p  style={themeMode ? { color: 'var(--color-white)' } : null}>Thursday</p>
                        <p  style={themeMode ? { color: 'var(--color-white)' } : null}>Saturday</p>
                        <p  style={themeMode ? { color: 'var(--color-white)' } : null}>Sunday</p>
                    </div>
                    <div className="time_container">
                    <p  style={themeMode ? { color: 'var(--color-white)' } : null}>12:00PM - 12:00AM</p>
                    <p  style={themeMode ? { color: 'var(--color-white)' } : null}>12:00PM - 12:00AM</p>
                    <p  style={themeMode ? { color: 'var(--color-white)' } : null}>12:00PM - 12:00AM</p>
                    <p  style={themeMode ? { color: 'var(--color-white)' } : null}>12:00PM - 12:00AM</p>
                    <p  style={themeMode ? { color: 'var(--color-white)' } : null}>12:00PM - 12:00AM</p>
                    <p  style={themeMode ? { color: 'var(--color-white)' } : null}>12:00PM - 12:00AM</p>
                    </div>
                    </div>
                </div>
            </div>
            <h3 style={themeMode ? { color: 'var(--color-white)' } : null}>&copy; {currentYear} Ali Asghar. -All rights reserved</h3>
        </footer>
    )
}

export default Footer