import React, { useEffect, useState } from "react";
import apiFacade from "../util/apiFacade"; // Utility to fetch data with authentication

function AdminAppointment() {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);

    // Fetch appointments from the database
    useEffect(() => {
        const fetchAppointments = async () => {
            setError(null);
            try {
                const response = await fetch("http://localhost:7070/api/appointment", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${apiFacade.getToken()}`, // Add token for authentication
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("Error fetching appointments:", errorData);
                    setError(errorData.msg || "Failed to fetch appointments.");
                    return;
                }

                const data = await response.json();
                console.log("Fetched appointments:", data);
                setAppointments(data);
            } catch (err) {
                console.error("Error during fetch:", err);
                setError("Failed to fetch appointments. Please try again later.");
            }
        };

        fetchAppointments();
    }, []);

    // Render appointments
    return (
        <div>
            <h1>Admin Appointments</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {appointments.length === 0 && !error && <p>No appointments found.</p>}
            {appointments.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Dog Name</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment) => (
                            <tr key={appointment.id}>
                                <td>{appointment.id}</td>
                                <td>{appointment.username}</td>
                                <td>{appointment.dogName || "Unknown"}</td>
                                <td>{appointment.date}</td>
                                <td>{appointment.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default AdminAppointment;
