import React from 'react'
import "./Departments.css"
import cardImageOne from "../../images/card_image 1.jpg";
import cardImageTwo from "../../images/card_image 2.jpg";
import cardImageThree from "../../images/card_image 3.jpg";
import cardImageFour from "../../images/card_image 4.jpg";
import useMainContext from "../../Context.js"

const Departments = () => {
    const { themeMode } = useMainContext();

    return (
        <section className='department_section container'>
            <h3 style={themeMode ? {color: "var(--color-white)"} : null}>Departments</h3>
            <div className="cards">
                <div className="cards">
                    <div className="card" style={themeMode ? {background: "var(--color-dark)", borderBottom: ".1px solid #2d2e31", boxShadow: "white 4px 7px 14px -8px"} : null}>
                        <article>
                            <h2>PEDIATRICS</h2>
                            <div className="title">Your Child's Pediatric Partner</div>
                            <div className="pic"><img src={cardImageOne} /></div>

                            <div style={themeMode ? {color: "var(--color-white)"} : null} className="desc">We provide comprehensive pediatric care for children from newborns to young adults, focusing on preventive care.</div>

                        </article>
                    </div>
                    <div className="card" style={themeMode ? {background: "var(--color-dark)", borderBottom: ".1px solid #2d2e31", boxShadow: "white 4px 7px 14px -8px"} : null}>
                        <article>
                            <h2>ORTHOPEDICS</h2>
                            <div className="title">Expert Care for Your Bones</div>
                            <div className="pic"><img src={cardImageTwo} /></div>

                            <div style={themeMode ? {color: "var(--color-white)"} : null} className="desc">Our board-certified orthopedic surgeons, physiatrists, and therapists deliver comprehensive care for a wide range of bone.</div>

                        </article>
                    </div>
                    <div className="card" style={themeMode ? {background: "var(--color-dark)", borderBottom: ".1px solid #2d2e31", boxShadow: "white 4px 7px 14px -8px"} : null}>
                        <article>
                            <h2>CARDIOLOGY</h2>
                            <div className="title"> Personalized Care</div>
                            <div className="pic"><img src={cardImageThree} /></div>

                            <div style={themeMode ? {color: "var(--color-white)"} : null} className="desc">We understand the importance of heart health. We are committed to educating and empowering our patients to take.</div>
                        </article>
                    </div>
                    <div className="card" style={themeMode ? {background: "var(--color-dark)", borderBottom: ".1px solid #2d2e31", boxShadow: "white 4px 7px 14px -8px"} : null}>
                        <article>
                            <h2>NEUROLOGY</h2>
                            <div className="title">Advanced Neurology Solutions</div>
                            <div className="pic"><img src={cardImageFour} /></div>

                            <div style={themeMode ? {color: "var(--color-white)"} : null} className="desc">Our dedicated team of neurologists and specialists provide comprehensive neurological care.</div>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Departments