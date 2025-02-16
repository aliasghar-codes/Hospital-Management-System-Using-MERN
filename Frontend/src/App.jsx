import React, { useEffect } from 'react'
import { Route, RouterProvider, createRoutesFromElements, createBrowserRouter } from "react-router-dom"
import "./style.css"
import Layout from "./components/Layout/layout.jsx"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"
import useMainContext from "./Context.js"
import axios from "axios"
import { Home, Appointment, AboutUs, Login, Register, Policy, AdminLogin, AdminLayout, AdminDashboard, AddAdmin, AdminMsg, AddDoctor, DoctorsList } from "./index.js"

const Router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Layout />}>
                <Route path='' element={<Home />} />
                <Route path='about' element={<AboutUs />} />
                <Route path='appointment' element={<Appointment />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/policy' element={<Policy />} />
            <Route path='/admin-login' element={<AdminLogin />} />
            <Route path='/admin' element={<AdminLayout />}>
                <Route path='' element={<AdminDashboard />} />
                <Route path='doctors-list' element={<DoctorsList />} />
                <Route path='doctor-add' element={<AddDoctor />} />
                <Route path='admin-create' element={<AddAdmin />} />
                <Route path='messages' element={<AdminMsg />} />
            </Route>
        </>
    )
)

const App = () => {

    const { isAuthenticated, setIsAuthenticated, setUser, setThemeMode } = useMainContext();

    useEffect(() => {
        const cookie = document.cookie;
        const id = cookie.indexOf("=");
        const tokenName = cookie.slice(0, id);

        const abc = async () => {
            let mode;

            try {
                if (tokenName === "adminToken") {
                    const response = await axios.get("http://localhost:4000/api/v1/user/admin/me", { withCredentials: true });
                    setIsAuthenticated(true);
                    setUser(response.data.message);
                    mode = response.data.message.theme === "Dark" ? true : false;
                } else {
                    const response = await axios.get("http://localhost:4000/api/v1/user/me", { withCredentials: true });
                    setIsAuthenticated(true);
                    setUser(response.data.message);
                    mode = response.data.message.theme === "Dark" ? true : false;
                }
            } catch (err) {
                setIsAuthenticated(false);
                setUser({});
            }

            setThemeMode(mode);
            const body = document.getElementsByTagName("body")[0];
            mode ? body.classList.add("dark") : body.classList.remove("dark");
        }
        abc();
    }, [isAuthenticated])

    return (
        <>
            <RouterProvider router={Router} />
            <ToastContainer position="top-center" />
        </>
    )
}

export default App;