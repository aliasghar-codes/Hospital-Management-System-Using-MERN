import React from 'react';
import Hero from "../components/Hero/Hero.jsx"
import Services from "../components/Services/Service.jsx"
import Biography from "../components/Biography/Biography.jsx"
import Departments from "../components/Departments/Departments.jsx"
import MessageForm from "../components/Message Form/MessageForm.jsx"
import Faq from "../components/FAQ/Faq.jsx"
import heroImage from "../images/doctor hero-banner 1.png"

const Home = () => {
    return (
        <>
        <Hero
            image = { heroImage }
            heading = { "We help patients live a healthy, longer life." }
            miniHeading = { "CERTIFIED DOCTORS" }
            para = { `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi, sapiente veniam. Vero, quaerat cupiditate aliquam magni perspiciatis.
            ` }
            bgImage={ true }
            buttonState = { true }
        />
        <Services />
        <Biography />
        <Departments />
        <Faq />
        <MessageForm />
        </>
    )
}

export default Home