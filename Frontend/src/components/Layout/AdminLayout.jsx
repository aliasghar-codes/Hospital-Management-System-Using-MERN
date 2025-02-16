import React, {useEffect} from 'react'
import AdminNav from "../adminNav/AdminNav.jsx"
import { Outlet, useNavigate } from 'react-router-dom'
import useMainContext from '../../Context.js'

const AdminLayout = () => {
    const { isAuthenticated, user, themeMode } = useMainContext();
    const navigateTo = useNavigate();

    useEffect(() => {

        if (isAuthenticated && user.role !== "Admin") {
            navigateTo("/");
        }

        if (!isAuthenticated) {
            navigateTo("/admin-login");
        }
        
    }, [ isAuthenticated ]);

    return (
        <div className='admin-nav-layout' style={ themeMode ? 
            {backgroundColor: "var(--color-dark)"} :
            {backgroundColor: "var(--color-primary)"}} >
            <AdminNav />
            <Outlet />
        </div>
    )
}

export default AdminLayout