import React, { useEffect, useState } from 'react'
import "./doctorsList.css"
import useMainContext from '../../Context'
import { toast } from 'react-toastify';
import axios from 'axios';

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const { themeMode } = useMainContext();


  useEffect(() => {
    fetchDoctors();
  }, [])

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/user/doctors", {
        withCredentials: true
      });
      setDoctors(res.data.doctors);
    } catch (error) {
      toast.error("Error occured while fetching messages");
    }
  }

  return (
    <main style={themeMode ? { color: 'white', backgroundColor: "#1B1C1E", borderLeft: "1px solid gray" } : null} className='doctors-list' >

      {
        doctors.length > 0 && <h1>Doctors</h1>
      }
      {
        doctors.length > 0 ? <div className="doctor-container">
          {
        doctors.map(doctor => (
          <section key={doctor._id} className='doctor-card'
          style={themeMode ? { backgroundColor: 'rgb(29, 29, 29)', borderTop: "1px solid rgb(48, 48, 48)" } : null}>
            <img src={doctor.docAvatar.url} alt="" />
            <div>
              <h4>FirstName: </h4>
              <p>{doctor.firstName}</p>
            </div>
            <div>
              <h4>Last Name: </h4>
              <p>{doctor.lastName}</p>
            </div>
            <div>
              <h4>Email: </h4>
              <p>{doctor.email}</p>
            </div>
            <div>
              <h4>Phone: </h4>
              <p>{doctor.phone}</p>
            </div>
            <div>
              <h4>DOB: </h4>
              <p>{doctor.dob.slice(0, 10)}</p>
            </div>
            <div>
              <h4>Department: </h4>
              <p>{doctor.docDepartment}</p>
            </div>
            <div>
              <h4>NIC: </h4>
              <p>{doctor.nic}</p>
            </div>
            <div>
              <h4>gender: </h4>
              <p>{doctor.gender}</p>
            </div>
          </section>
        ))}
        </div> : (
          <section className='not-found'
          style={themeMode ? { backgroundColor: 'rgb(29, 29, 29)' } : null}>
            No Doctors Found
          </section>
        )
      }
    </main>
  )
}

export default DoctorsList