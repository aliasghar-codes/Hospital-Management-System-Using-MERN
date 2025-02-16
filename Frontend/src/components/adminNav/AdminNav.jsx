import React from 'react'
import "./adminNav.css"
import { Link, useNavigate } from 'react-router-dom'
import { SlLogout } from "react-icons/sl";
import { FaUserDoctor } from "react-icons/fa6";
import { BiMessageRoundedMinus } from "react-icons/bi";
import { MdGroupAdd } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import {
    IoHomeSharp,
    IoPersonAddSharp
} from "react-icons/io5";
import { toast } from 'react-toastify';
import axios from 'axios';
import useMainContext from '../../Context.js';

const AdminNav = () => {

    const navigateTo = useNavigate();
    const { setIsAuthenticated, themeMode } = useMainContext();

    const handleAdminLogout = async () => {
        try {
            await axios.get("http://localhost:4000/api/v1/user/admin/logout", { withCredentials: true });
            toast.success("Admin logout successfully");
            setIsAuthenticated(false);
        } catch (err) {
            toast.error(err.response.data.message || err);
            return;
        }

        navigateTo("/admin-login");
    }

    return (
        <nav className='admin-nav'>
            <div className="go-back">
                <Link to="/">
                    <IoMdArrowRoundBack
                        style={themeMode ? { color: 'white' } : null}/>
                </Link>
            </div>
            <ul>
                <li>
                    <Link to="/admin">
                        <IoHomeSharp
                            style={themeMode ? { color: 'white' } : null} />
                    </Link>
                </li>
                <li>
                    <Link to="/admin/doctors-list">
                        <FaUserDoctor
                            style={themeMode ? { color: 'white' } : null} />
                    </Link>
                </li>
                <li>
                    <Link to="/admin/doctor-add">
                        <MdGroupAdd
                            style={themeMode ? { color: 'white' } : null} />
                    </Link>
                </li>
                <li>
                    <Link to="/admin/admin-create">
                        <IoPersonAddSharp
                            style={themeMode ? { color: 'white' } : null} />
                    </Link>
                </li>
                <li>
                    <Link to="/admin/messages">
                        <BiMessageRoundedMinus
                            style={themeMode ? { color: 'white' } : null} />
                    </Link>
                </li>
                <li>
                    <button onClick={handleAdminLogout}>
                        <SlLogout
                            style={themeMode ? { color: 'white' } : null} />
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default AdminNav