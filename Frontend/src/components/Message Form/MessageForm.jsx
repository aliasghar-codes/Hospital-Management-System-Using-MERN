import React, { useState } from 'react'
import axios from "axios"
import { toast } from "react-toastify"
import messageImage from "../../images/message_image.png"
import "./MessageForm.css"
import useMainContext from "../../Context.js"

const MessageForm = () => {
    const { themeMode } = useMainContext();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const handleMessage = async e => {
        e.preventDefault();
        try {
            await axios.post(
                "http://localhost:4000/api/v1/message/send",
                { firstName, lastName, email, phone, message },
                {
                    withCredentials: true,
                    header: {
                        "Content-Type": "application/json",
                    },
                }
            ).then(res => {
                toast.success(res.data.message);
                setFirstName("");
                setLastName("");
                setEmail("");
                setPhone("");
                setMessage("");
            })
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    return (
        <section className='send_message container' id='contact'>
            <div className="message_left">
                <img src={messageImage} alt="" />
            </div>
            <div className="message_right">
                <h2>Send us a <span>message</span></h2>
                <form method='post' onSubmit={handleMessage}>
                    <label htmlFor="fname">First Name
                        <input style={themeMode ? { backgroundColor: "var(--color-dark)", color: "white" } : null} type="text" id='fname' onChange={e => setFirstName(e.target.value)} name="firstName" value={firstName} required />
                    </label>
                    <label htmlFor="lname">Last Name
                        <input style={themeMode ? { backgroundColor: "var(--color-dark)", color: "white" } : null} type="text" id='lname' onChange={e => setLastName(e.target.value)} name="lastName" value={lastName} required />
                    </label>
                    <label htmlFor="email">Email
                        <input style={themeMode ? { backgroundColor: "var(--color-dark)", color: "white" } : null} type="email" id='email' onChange={e => setEmail(e.target.value)} name="email" value={email} required />
                    </label>
                    <label htmlFor="number">Mobile Number
                        <input style={themeMode ? { backgroundColor: "var(--color-dark)", color: "white" } : null} type="text" id='number' onChange={e => setPhone(e.target.value)} name="phone" value={phone} required />
                    </label>
                    <label htmlFor="message">How can we help ?
                        <textarea style={themeMode ? { backgroundColor: "var(--color-dark)", color: "white" } : null} id='message' onChange={e => setMessage(e.target.value)} value={message} name="message" required></textarea>
                    </label>
                    <button type='submit'>Send message</button>
                </form>
            </div>
        </section>
    )
}

export default MessageForm