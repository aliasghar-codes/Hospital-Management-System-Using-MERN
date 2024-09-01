import React, { useEffect } from 'react'
import { Route, RouterProvider, createRoutesFromElements, createBrowserRouter } from "react-router-dom"
import "./Pages/css/style.css"
import { Home, Appointment, AboutUs, Login, Register, Policy } from "./index.js"
import Layout from "./components/Layout/layout.jsx"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"
import useMainContext from "./Context.js"
import axios from "axios"

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
            </>
        )
    )

const App = () => {

    const { isAuthenticated, setIsAuthenticated, setUser } = useMainContext();

    useEffect(() => {
        const abc = async () => {

            try{
                const response = await axios.get("http://localhost:4000/api/v1/user/me", {withCredentials: true});
                setIsAuthenticated(true);
                setUser(response.data.user);
            }catch(err){
                setIsAuthenticated(false);
                setUser({});
            }
        }
        abc();
    }, [ isAuthenticated ])

    return (
        <>
            <RouterProvider router={Router} />
            <ToastContainer position="top-center" />
        </>
    )
}

export default App;