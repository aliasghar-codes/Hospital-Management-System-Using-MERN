import React from 'react'
import iconOne from "../../images/icon01.png"
import iconTwo from "../../images/icon02.png"
import iconThree from "../../images/icon03.png"
import "./Service.css"
import useMainContext from "../../Context.js"

const Service = () => {
    const { themeMode } = useMainContext();

    return (
        <section className='services'>
            <h2>
                Providing the best <br /> medical services
            </h2>
            <p style={themeMode ? {color: "var(--color-white)"} : null}>
                World-class care for everyone. Our health System offers <br /> unmatched, expert health care.
            </p>
            <div className="service_container">
                <div className="service">
                    <img src={iconOne} alt="" />
                    <h3>
                        Find a Doctor
                    </h3>
                    <p style={themeMode ? {color: "var(--color-white)"} : null}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam nulla enim iste at.
                    </p>
                    <a style={themeMode ? {color: "white", border: "1.8px solid white"} : null} href="/doctors">&rarr;</a>
                </div>
                <div className="service">
                    <img src={iconTwo} alt="" />
                    <h3>
                        Track Ambulance Location
                    </h3>
                    <p style={themeMode ? {color: "var(--color-white)"} : null}>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus non ea dslfj.
                    </p>
                    <a style={themeMode ? {color: "white", border: "1.8px solid white"} : null} href="/doctors">&rarr;</a>
                </div>
                <div className="service">
                    <img src={iconThree} alt="" />
                    <h3>
                        Book Appointment
                    </h3>
                    <p style={themeMode ? {color: "var(--color-white)"} : null}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi dignissimos a ducimus.
                    </p>
                    <a style={themeMode ? {color: "white", border: "1.8px solid white"} : null} href="/doctors">&rarr;</a>
                </div>
            </div>
        </section>
    )
}

export default Service