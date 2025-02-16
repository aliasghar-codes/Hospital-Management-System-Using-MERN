import React, { useState, useEffect } from 'react'
import "./adminDashboard.css"
import { toast } from 'react-toastify'
import axios from 'axios'
import useMainContext from '../../Context.js'
import dashboradImage from "../../images/admin dashboard.png"

const adminDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [registeredDoctors, setRegisteredDoctors] = useState(0);

    const { themeMode, user } = useMainContext();

    useEffect(() => {
        fetchDoctors();
        fetchAppointments();
    }, []);

    const fetchDoctors = async () => {
        try {
            const registeredDoctors = await axios.get("http://localhost:4000/api/v1/user/doctors");
            setRegisteredDoctors(registeredDoctors.data.doctors.length)
        } catch (error) {
            toast.error("Error occured while fetching data");
        }
    }

    const fetchAppointments = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/v1/appointment/getall", {
                withCredentials: true
            });
            setAppointments(response.data.message)
        } catch (error) {
            toast.error(error.response.data.message || "Error occured while fetching data");
        }
    }

    const updateAppointmentStatus = async ({ target }) => {
        try {
            const status = target.value;
            const id = target.id; console.log(id)

            await axios.post(`http://localhost:4000/api/v1/appointment/update/${id}`, {
                status: status
            }, {
                withCredentials: true
            });

            fetchAppointments();
        } catch (error) {
            toast.error("Error occured while updating appointment status");
        }
    }

    return (
        <main style={themeMode ? { color: 'white', backgroundColor: "#1B1C1E", borderLeft: "1px solid gray" } : null} className='admin-dashboard' >
            <div className='admin-dashboard-top'>
                <section
                    style={themeMode ? { backgroundColor: 'rgb(29, 29, 29)', borderTop: "1px solid rgb(48, 48, 48)" } : null}>
                    <div className='image-container'>
                        <img src={dashboradImage} alt="" />
                    </div>
                    <div className='text-container'>
                        <h3>Hello, {user.firstName} {user.lastName}</h3>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati impedit sequi numquam consequatur mollitia voluptatibus ducimus.</p>
                    </div>
                </section>
                <section
                    style={themeMode ? { backgroundColor: 'rgb(29, 29, 29)', borderTop: "1px solid rgb(48, 48, 48)" } : null}>
                    <h3>Total Appointments</h3>
                    <h2>{appointments.length}</h2>
                </section>
                <section
                    style={themeMode ? { backgroundColor: 'rgb(29, 29, 29)', borderTop: "1px solid rgb(48, 48, 48)" } : null}>
                    <h3>Registered Doctors</h3>
                    <h2>{registeredDoctors}</h2>
                </section>
            </div>
            {
                appointments.length > 0 ?
                    <section className='admin-dashboard-bottom'
                        style={themeMode ? { backgroundColor: 'rgb(29, 29, 29)', borderTop: "1px solid rgb(48, 48, 48)" } : null}>
                        <h3>Appointments</h3>
                        <div className="headings">
                            <h4>Patient</h4>
                            <h4>Date</h4>
                            <h4>Doctor</h4>
                            <h4>Department</h4>
                            <h4>Status</h4>
                        </div>
                        {
                            appointments.map(appointment => (
                                <div className="appointment-container" key={appointment._id}>
                                    <p>{appointment.firstName} {appointment.lastName}</p>
                                    <p>{appointment.appointment_date}</p>
                                    <p>{appointment.doc.firstName} {appointment.doc.lastName}</p>
                                    <p>{appointment.department}</p>
                                    <select id={appointment._id} value={appointment.status} onChange={updateAppointmentStatus} >
                                        <option value="Pending">Pending</option>
                                        <option value="Rejected">Rejected</option>
                                        <option value="Accepted">Accepted</option>
                                    </select>
                                </div>
                            ))
                        }
                    </section> : <section className='admin-dashboard-bottom-2'
                        style={themeMode ? { backgroundColor: 'rgb(29, 29, 29)', borderTop: "1px solid rgb(48, 48, 48)" } : null}>
                        <h1>No Appointments available</h1>
                    </section>
            }
        </main>
    )
}

export default adminDashboard