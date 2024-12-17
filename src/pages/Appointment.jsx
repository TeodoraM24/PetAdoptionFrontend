import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { FormContainer, SubmitButton } from "../styles/Appointment.styles";
import Logo from "../images/Logo.png";

function Appointment() {
    const location = useLocation(); 
    const navigate = useNavigate(); 
    const dogData = location.state || {}; 

    const [date, setDate] = useState("");
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    const today = new Date().toISOString().split("T")[0];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage("");

        try {
            const response = await fetch("http://localhost:3000/appointment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    dogName: dogData.name,
                    date,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.msg || "Failed to schedule appointment.");
                return;
            }

            const data = await response.json();
            setSuccessMessage(`Appointment for ${data.dogName || dogData.name} on ${data.date} created successfully!`);

            setTimeout(() => navigate(`/dog/${dogData.id}`), 2000); 
        } catch (err) {
            setError("Failed to schedule appointment. Please try again later.");
        }
    };

    return (
        <>
            <h1>Appointment</h1>
            <FormContainer onSubmit={handleSubmit}>
                <img src={dogData.image || Logo} alt={dogData.name || "Dog"} />
                <p><strong>Name:</strong> {dogData.name || "No data available"}</p>
                <p><strong>Age:</strong> {dogData.age || "No data available"}</p>
                <p><strong>Description:</strong> {dogData.description || "No data available"}</p>

                <label htmlFor="date">Date:</label>
                <input
            type="text"
                id="date"
                name="date"
                min={today}
                value={date}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Select a date"
                required
            />

                <SubmitButton type="submit">Submit</SubmitButton>
            </FormContainer>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        </>
    );
}

export default Appointment;
