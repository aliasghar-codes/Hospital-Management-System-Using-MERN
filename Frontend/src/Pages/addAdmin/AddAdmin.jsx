import React, { useState } from 'react'
import "./addAdmin.css"
import { toast } from 'react-toastify'
import axios from 'axios'
import useMainContext from '../../Context.js'
import { useNavigate } from "react-router-dom"

const AddAdmin = () => {
    const [dobType, setDobType] = useState("text");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        nic: "",
        dob: "",
        gender: "",
        password: "",
        role: "Admin",
    })

    const { themeMode } = useMainContext();
    const navigateTo = useNavigate();

    const handleInputState = ({ target }) => {
        setFormData({ ...formData, [target.name]: target.value });
    }

    const handleAddAdmin = async e => {
        e.preventDefault();

        for (let i in formData) {
            if (!formData[i]) {
                toast.error("Please fill full form");
                return;
            }
        }

        try {
            await axios.post("http://localhost:4000/api/v1/user/register", {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                nic: formData.nic,
                dob: formData.dob,
                gender: formData.gender,
                password: formData.password,
                role: formData.role,
            }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            });
            toast.success("Admin registered successfully");
            navigateTo("/admin")
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <main style={themeMode ? { color: 'white', backgroundColor: "#1B1C1E", borderLeft: "1px solid gray" } : null} className='add-admin' >

            <div className="logo">
                <span>+</span>
                <h3 style={themeMode ? { color: 'white' } : null}>
                    MediBot
                </h3>
            </div>
            <h2>ADD NEW ADMIN</h2>
            <form onSubmit={handleAddAdmin}>
                <div>
                    <input type="text"
                        name='firstName'
                        placeholder='First Name'
                        value={formData.firstName}
                        onChange={handleInputState}
                    />
                    <input type="text"
                        name='lastName'
                        placeholder='last Name'
                        value={formData.lastName}
                        onChange={handleInputState}
                    />
                </div>
                <div>
                    <input type="email"
                        name='email'
                        placeholder='Email'
                        value={formData.email}
                        onChange={handleInputState}
                    />
                    <input type="number"
                        name='phone'
                        placeholder='Mobile Number'
                        value={formData.phone}
                        onChange={handleInputState}
                    />
                </div>
                <div>
                    <input type="number"
                        name='nic'
                        placeholder='NIC'
                        value={formData.nic}
                        onChange={handleInputState}
                    />
                    <input type={dobType}
                        onFocus={() => setDobType("date")}
                        onBlur={() => setDobType("text")}
                        name='dob'
                        placeholder='Date of Birth'
                        value={formData.dob}
                        onChange={handleInputState}
                    />
                </div>
                <div>
                    <select name="gender"
                        value={formData.gender}
                        onChange={handleInputState} >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    <input type="password"
                        name='password'
                        placeholder='Password'
                        value={formData.password}
                        onChange={handleInputState}
                    />
                </div>
                <button type="submit">
                    Add
                </button>
            </form>
        </main>
    )
}

export default AddAdmin