import React, { useEffect, useState } from 'react'
import "./adminMsg.css"
import useMainContext from '../../Context'
import { toast } from 'react-toastify';
import axios from 'axios';

const AdminMsg = () => {

    const [messages, setMessages] = useState([]);
    const { themeMode } = useMainContext();

    useEffect(() => {
        fetchMessages();
    }, [])

    const fetchMessages = async () => {
        try {
            const res = await axios.get("http://localhost:4000/api/v1/message/getmessages", {
                withCredentials: true
            });
            setMessages(res.data.message);
        } catch (error) {
            toast.error("Error occured while fetching messages");
        }
    }

    return (
        <main style={themeMode ? { color: 'white', backgroundColor: "#1B1C1E", borderLeft: "1px solid gray" } : null} className='admin-messages' >

            {
                messages.length > 0 && <h1>Messages</h1>
            }
            {
                messages.length > 0 ? messages.map(message => (
                    <section key={message._id}
                    style={themeMode ? { backgroundColor: 'rgb(29, 29, 29)', borderTop: "1px solid rgb(48, 48, 48)" } : null}
                    className='message-container'>
                        <div>
                            <h4>Name: </h4>
                            <p>{message.firstName} {message.lastName}</p>
                        </div>
                        <div>
                            <h4>Email: </h4>
                            <p>{message.email}</p>
                        </div>
                        <div>
                            <h4>Phone: </h4>
                            <p>{message.phone}</p>
                        </div>
                        <div>
                            <h4>Message: </h4>
                            <p>{message.message}</p>
                        </div>
                    </section>
                )) : (
                    <section className='not-found'
                        style={themeMode ? { backgroundColor: 'rgb(29, 29, 29)' } : null}>
                        No Messages Found
                    </section>
                )
            }
        </main>
    )
}

export default AdminMsg