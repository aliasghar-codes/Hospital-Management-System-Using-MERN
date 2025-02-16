import React, { useState } from 'react'
import "./addDoctor.css"
import { toast } from 'react-toastify'
import axios from 'axios'
import useMainContext from '../../Context.js'
import { useNavigate } from "react-router-dom"
import dummyImg from "../../images/dumy doctor.jpeg"

const AddDoctor = () => {
    const [dobType, setDobType] = useState("text");
    const [docImg, setDocImg] = useState(dummyImg);
    const [docAvatar, setDocAvatar] = useState({});
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        nic: "",
        dob: "",
        gender: "",
        password: "",
        department: ""
    });

    const { themeMode } = useMainContext();
    const navigateTo = useNavigate();

    const handleInputState = ({ target }) => {
        if (target.name == "docAvatar") {

            const file = target.files[0]

            if (file) {
                setDocImg(URL.createObjectURL(file))
                setDocAvatar( file );
            }else{
                setDocImg(dummyImg)
                setDocAvatar({});
            }

            return;
        }

        setFormData({ ...formData, [target.name]: target.value });
    }

    const handleAddDoctor = async e => {
        e.preventDefault();

        for (let i in formData) {
            if (!formData[i]) {
                toast.error("Please fill full form");
                return;
            }
        }

        try {
            await axios.post("http://localhost:4000/api/v1/user/doctor/addnew", {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                nic: formData.nic,
                dob: formData.dob,
                gender: formData.gender,
                password: formData.password,
                docDepartment: formData.department,
                docAvatar: docAvatar
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            toast.success("Doctor registered successfully");
            navigateTo("/admin");

        } catch (error) {
            toast.error(error.response.data.message);
        }

    }

    return (
        <main style={themeMode ? { color: 'white', backgroundColor: "#1B1C1E", borderLeft: "1px solid gray" } : null} className='add-doctor' >

            <div className="logo">
                <span>+</span>
                <h3 style={themeMode ? { color: 'white' } : null}>
                    MediBot
                </h3>
            </div>
            <h2>Register New Doctor</h2>
            <div className='content'>
                <form onSubmit={handleAddDoctor}>
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
                    <select
                        name="department"
                        onChange={handleInputState} >
                        <option value="">Select</option>
                        <option value="Pediatrics">Pediatrics</option>
                        <option value="Orthopedics">Orthopedics</option>
                        <option value="Cardiology">Cardiology</option>
                        <option value="Neurology">Neurology</option>
                        <option value="Oncology">Oncology</option>
                        <option value="Radiology">Radiology</option>
                        <option value="Physical Therapy">Physical Therapy</option>
                        <option value="Dermatology">Dermatology</option>
                        <option value="ENT">ENT</option>
                    </select>
                    <input
                        className='img-input-mobile'
                        type="file"
                        name="docAvatar"
                        onChange={handleInputState} />

                    <button type="submit">
                        Register
                    </button>
                </form>
                <div>
                    <img src={docImg} alt="" />
                    <input
                        type="file"
                        name="docAvatar"
                        onChange={handleInputState} />
                </div>
            </div>
        </main>
    )
}

export default AddDoctor