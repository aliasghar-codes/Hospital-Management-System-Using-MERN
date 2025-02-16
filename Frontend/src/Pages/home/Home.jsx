import React from 'react';
import Hero from "../../components/Hero/Hero.jsx"
import Services from "../../components/Services/Service.jsx"
import Biography from "../../components/Biography/Biography.jsx"
import DepartmentCard from "../../components/DepartmentCard/DepartmentCard.jsx"
import MessageForm from "../../components/Message Form/MessageForm.jsx"
import Faq from "../../components/FAQ/Faq.jsx"
import useMainContext from "../../Context.js"
import heroImage from "../../images/doctor hero-banner 1.png"
import cardImageOne from "../../images/card_image 1.jpg";
import cardImageTwo from "../../images/card_image 2.jpg";
import cardImageThree from "../../images/card_image 3.jpg";
import cardImageFour from "../../images/card_image 4.jpg";

const Home = () => {
    const { themeMode } = useMainContext();

    return (
        <>
            <Hero
                image={heroImage}
                heading={ "We help patients live a healthy, longer life." }
                miniHeading={ "CERTIFIED DOCTORS" }
                para={ `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi, sapiente veniam. Vero, quaerat cupiditate aliquam magni perspiciatis.` }
                bgImage={ true }
                buttonState={ true }
            />
            <Services />
            <Biography />

            <section className='department_section container'>
                <h3 style={themeMode ? { color: "var(--color-white)" } : null}>Departments</h3>
                <div className="cards">
                    <DepartmentCard
                        img={cardImageOne}
                        heading={"PEDIATRICS"}
                        content={"We provide comprehensive pediatric care for children from newborns to young adults, focusing on preventive care."}
                        title={"Your Child's Pediatric Partner"} />
                    <DepartmentCard
                        img={cardImageTwo}
                        heading={"ORTHOPEDICS"}
                        content={"Our board-certified orthopedic surgeons, physiatrists, and therapists deliver comprehensive care for a wide range of bone."}
                        title={"Expert Care for Your Bones"} />
                    <DepartmentCard
                        img={cardImageThree}
                        heading={"CARDIOLOGY"}
                        content={"We understand the importance of heart health. We are committed to educating and empowering our patients to take."}
                        title={"Personalized Care"} />
                    <DepartmentCard
                        img={cardImageFour}
                        heading={"NEUROLOGY"}
                        content={"Our dedicated team of neurologists and specialists provide comprehensive neurological care."}
                        title={"Advanced Neurology Solutions"} />
                </div>
            </section>
            <Faq />
            <MessageForm />
        </>
    )
}

export default Home