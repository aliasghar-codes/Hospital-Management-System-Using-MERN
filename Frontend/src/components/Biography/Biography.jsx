import React from 'react'
import "./Biography.css"
import { Link } from "react-router-dom"
import doctorImage from "../../images/about_doctor.png"
import useMainContext from "../../Context.js"

const Biography = () => {
    const { themeMode } = useMainContext();

    return (
        <section className="about_section container">
                <div className="left">
                    <img src={doctorImage} alt="" />
                </div>
                <div className="right">
                    <h2>Providing <br /> Excellence in Healthcare</h2>
                    <div className="about_container">
                        <div className="content_left_side">
                            <p>ABOUT</p>
                            <hr />
                        </div>
                        <div className="content_right_side">
                            <p style={themeMode ? {color: "var(--color-white)"} : null}>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. <span>Cupiditate provident </span> pariatur labore Lorem ipsum dolor, sit amet consectetur adipisicing.
                            </p>
                            <p style={themeMode ? {color: "var(--color-white)"} : null} className='last_para'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt assumenda id temporibus tempora iste <span> voluptate officiis natus pariatur </span> consequuntur Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                            <Link style={themeMode ? {color: "white"} : null} to="/about">Learn More <span>&rarr;</span></Link>
                        </div>
                    </div>
                </div>
        </section>
    )
}

export default Biography