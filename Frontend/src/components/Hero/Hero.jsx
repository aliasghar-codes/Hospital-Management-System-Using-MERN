import React from 'react';
import "./Hero.css";
import useMainContext from "../../Context.js"

const Hero = ({ image, heading, miniHeading, para, buttonState, bgImage }) => {
    const { themeMode } = useMainContext();

    return (
        <section className="hero-container" style={themeMode || !bgImage ? {backgroundImage: "url('')"} : null}>
            <div className="hero-banner">
                <h4>{miniHeading}</h4>
                <h1 style={themeMode ? {color: "white"} : null}>
                    {heading}
                </h1>
                <p style={themeMode ? {color: "var(--color-white)"} : null}>
                    { para }
                </p>
                <a href="#contact">
                    {
                        buttonState ? (
                            <button>Contact us  &rarr;</button>
                        ) : null
                    }
                </a>
            </div>
            <div className="hero-image">
                <img style={bgImage ? null : { filter: "none" } } src={image} alt="" />
            </div>
        </section>
    )
}

export default Hero