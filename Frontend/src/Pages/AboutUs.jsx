import React from 'react'
import "./css/about.css"
import aboutImage1 from "../images/about-1.jpg"
import aboutImage2 from "../images/about-2.jpg"

const About = () => {
    return (
        <section className='about-container'>
            <div className="about-top">
                <div className="about-top-left">
                    <h2>Welcome to the future of hospital management. MediBot offers innovative tools for a connected healthcare experience.</h2>
                </div>
                <div className="about-top-right">
                    <img src={aboutImage1} alt="" />
                </div>
            </div>
            <div className="about-middle">
                <div className="about-middle-left">
                    <h1>About us</h1>
                </div>
                <div className="about-middle-middle">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, commodi! Corrupti quod numquam natus! Tenetur incidunt nulla fuga libero.</p><br />
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae sint eligendi voluptas nisi fugit modi commodi eos dolorem rem perspiciatis, Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, eos.</p><br />
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci magnam et hic deserunt id animi inventore voluptates necessitatibus sed delectus.</p>
                </div>
                <div className="about-middle-right">

                </div>
            </div>
            <div className="about-bottom">
                <div className="about-bottom-left">
                    <img src={aboutImage2} alt="" />
                </div>
                <div className="about-bottom-right">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum explicabo perferendis eligendi dicta laboriosam. Inventore, ipsum voluptatem, molestiae voluptates, ex optio ratione vel nostrum dicta eaque laborum quod doloribus consequatur.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default About