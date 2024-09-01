import React, { useState, useEffect } from 'react'
import "./css/appointment.css"
import Top from "../components/Hero/Hero.jsx"
import appointmentDoc from "../images/appointment_doctor.png"
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import useMainContext from "../Context.js"

const Appointment = () => {

    const { themeMode } = useMainContext();
    const navigateTo = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [nic, setNic] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");
    const [department, setDepartment] = useState("");
    const [doctorFirstName, setDoctorFirstName] = useState("");
    const [doctorLastName, setDoctorLastName] = useState("");
    const [doctors, setDoctors] = useState([]);
    const [address, setAddress] = useState("");
    const [dobInputType, setDobInputType] = useState("text");
    const [appInputType, setAppInputType] = useState("text");

    function handleInputFocus(e){
        e.target.placeholder === "Date of Birth" ? setDobInputType("date") : setAppInputType("date");
    }

    function handleInputBlur(e){
        const value = e.target.value;
        e.target.placeholder === "Date of Birth" ? setDobInputType("text") : setAppInputType("text");
        e.target.value = value;
    }

    const departmentsArray = [
        "Select Department",
        "Pediatrics",
        "Orthopedics",
        "Cardiology",
        "Neurology",
        "Oncology",
        "Radiology",
        "Physical Therapy",
        "Dermatology",
        "Ent",
        "Eye"
    ]

    useEffect(() => {
        const fetchDoctors = async () => {
            try{
                const { data } = await axios.get(
                    "http://localhost:4000/api/v1/user/doctors",
                    { withCredentials: true }
                )
                setDoctors(data.doctors);
            }catch(err){
                console.log(err.message)
            }
        }
        fetchDoctors();
    }, [])
    
    const handleAppointment = async e => {
        e.preventDefault();
        try{
            const { data } = await axios.post("http://localhost:4000/api/v1/appointment/post", {
                firstName,
                lastName,
                email,
                phone,
                nic,
                dob,
                gender,
                appointment_date: appointmentDate,
                department,
                doc_firstName: doctorFirstName,
                doc_lastName: doctorLastName,
                address,
            }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            })
            toast.success(data.message);
            navigateTo("/");
        }catch(error){
            toast.error(error.response.data.message);
        }
    }

    return (
        <>
        <Top
            image = { appointmentDoc }
            heading={ `Book Your Appointment` }
            para={ "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit, harum quisquam nobis ut odio blanditiis nam temporibus reiciendis cupiditate adipisci." }
            bgImage={ false }
            buttonState = { false }
        />
        <section className='container appointment-container'>
            <h2 style={themeMode ? { color: "var(--color-white)" } : null} >Appointment</h2>
            <form onSubmit={handleAppointment}>
                <div>
                    <input 
                    style={themeMode ? { backgroundColor: "var(--color-dark)", border: "1px solid var(--color-white)", color: "white" } : null} 
                    type="text" 
                    placeholder='First Name' 
                    value={ firstName } 
                    onChange={ e => setFirstName(e.target.value) } />

                    <input
                    style={themeMode ? { backgroundColor: "var(--color-dark)", border: "1px solid var(--color-white)", color: "white" } : null}
                    type="text" 
                    placeholder='last Name' 
                    value={ lastName } 
                    onChange={ e => setLastName(e.target.value) } />
                </div>
                <div>
                    <input
                    style={themeMode ? { backgroundColor: "var(--color-dark)", border: "1px solid var(--color-white)", color: "white" } : null}
                    type="text" 
                    placeholder='Email' 
                    value={ email } 
                    onChange={ e => setEmail(e.target.value) } />

                    <input
                    style={themeMode ? { backgroundColor: "var(--color-dark)", border: "1px solid var(--color-white)", color: "white" } : null}
                    type="text" 
                    placeholder='Mobile Number' 
                    value={ phone } 
                    onChange={ e => setPhone(e.target.value) } />
                </div>
                <div>
                    <input
                    style={themeMode ? { backgroundColor: "var(--color-dark)", border: "1px solid var(--color-white)", color: "white" } : null}
                    type="text" 
                    placeholder='NIC' 
                    value={ nic } 
                    onChange={ e => setNic(e.target.value) } />

                    <input 
                    style={themeMode ? { backgroundColor: "var(--color-dark)", border: "1px solid var(--color-white)", color: "white" } : null} 
                    type={ dobInputType } 
                    onFocus={ handleInputFocus } 
                    onBlur={handleInputBlur} 
                    placeholder='Date of Birth' 
                    value={dob} 
                    onChange={ e => setDob(e.target.value)} />

                </div>
                <div>
                    <select style={themeMode ? { backgroundColor: "var(--color-dark)", border: "1px solid var(--color-white)", color: "white" } : null} name="gender" value={gender} onChange={ e => setGender(e.target.value)}>

                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>

                    </select>

                    <input
                    style={themeMode ? { backgroundColor: "var(--color-dark)", border: "1px solid var(--color-white)", color: "white" } : null}  
                    type={ appInputType }
                    onFocus={ handleInputFocus } 
                    onBlur={ handleInputBlur }
                    value={ appointmentDate } 
                    onChange={ e => setAppointmentDate(e.target.value) }
                    placeholder='Appointment Date' />
                </div>
                <div>
                    <select style={themeMode ? { backgroundColor: "var(--color-dark)", border: "1px solid var(--color-white)", color: "white" } : null} value={ department } onChange={ e => setDepartment(e.target.value) }>
                        {
                            departmentsArray.map((depart, index) => {
                                return <option value={ depart } key={index}>{ depart }</option>
                            })
                        }
                    </select>

                    <select 
                        style={themeMode ? { backgroundColor: "var(--color-dark)", border: "1px solid var(--color-white)", color: "white" } : null}  
                        value={ `${doctorFirstName} ${doctorLastName}` }
                        disabled={ !department }
                        onChange={ e => {
                            const [fName, lName] = e.target.value.split(" ");
                            setDoctorFirstName(fName);
                            setDoctorLastName(lName);
                        } }>
                            <option value="Select Doctor">Select Doctor</option>
                            {
                                doctors.filter(doctor => doctor.docDepartment === department).map((doc, ind) => <option value={`${doc.firstName} ${doc.lastName}`} key={ind}>{doc.firstName} {doc.lastName}</option>)
                            }
                    </select>
                </div>
                <textarea
                style={themeMode ? { backgroundColor: "var(--color-dark)", border: "1px solid var(--color-white)", color: "white" } : null}
                placeholder='Address' 
                value={ address } 
                onChange={ e => setAddress(e.target.value)} />

                <button type='submit'>Get Appointment</button>
            </form>
        </section>
        </>
    )
}

export default Appointment