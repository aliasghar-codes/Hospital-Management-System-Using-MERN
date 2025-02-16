import React, { useState } from 'react'
import "./Faq.css"
import faqImage from "../../images/faq image.png"

const data = [
    {
        id: 178934789234,
        title: "How do I schedule an appointment with a doctor?",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. A, cupiditate tenetur! Maxime ut excepturi reprehenderit deserunt voluptatum voluptatem minus architecto fugiat, dolorum accusamus unde rerum atque, totam molestiae labore necessitatibus? Unde magni quide."
    },
    {
        id: 2234234234325,
        title: "Can I reschedule or cancel my appointment online?",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. A, cupiditate tenetur! Maxime ut excepturi reprehenderit deserunt voluptatum voluptatem minus architecto fugiat, dolorum accusamus unde rerum atque, totam molestiae labore necessitatibus? Unde magni quide."
    },
    {
        id: 3234234234234,
        title: "What information do I need to provide when scheduling an appointment?",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. A, cupiditate tenetur! Maxime ut excepturi reprehenderit deserunt voluptatum voluptatem minus architecto fugiat, dolorum accusamus unde rerum atque, totam molestiae labore necessitatibus? Unde magni quide."
    },
    {
        id: 42342342342342,
        title: "How do I report a technical issue with the website?",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. A, cupiditate tenetur! Maxime ut excepturi reprehenderit deserunt voluptatum voluptatem minus architecto fugiat, dolorum accusamus unde rerum atque, totam molestiae labore necessitatibus? Unde magni quide."
    }
]

const Faq = () => {

    const [selected, setSelected] = useState(-1);

    const toggleAccordian = e => {
        
        if (e === selected){
            setSelected(-1);
        }else{
            setSelected(e);
        }
    }

    return (
        <section className='faq_container container'>
            <div className="faq_left">
                <img src={faqImage} alt="" />
            </div>
            <div className="faq_right">
                <h2>Frequently asked questions</h2>
                <ul>
                    {data.map(item => {
                        return (
                            <li onClick={() => toggleAccordian(item.id)} key={item.id}>
                                <div className="title">
                                <h4>{item.title}</h4>
                                <h4>{item.id === selected ? '-' : '+'}</h4>
                                </div>
                                {
                                    item.id === selected ? <p>{item.content}</p> : null
                                }
                            </li>
                        )
                    })}
                </ul>
            </div>
        </section>
    )
}

export default Faq