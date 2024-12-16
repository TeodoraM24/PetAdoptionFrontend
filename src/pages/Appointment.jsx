import React from "react";
import { useLocation } from "react-router"; // Import useLocation to access state
import { FormContainer, SubmitButton } from "../styles/Appointment.styles";
import Logo from "../images/Logo.png";

function Appointment() {
    const location = useLocation(); // Get the location object
    const dogData = location.state || {}; // Access the passed state (default to an empty object)

    const today = new Date().toISOString().split("T")[0];

    return (
        <>
            <h1>Appointment</h1>
            <FormContainer>
                <img src={dogData.image || Logo} alt={dogData.name || "Dog"} />
                <p><strong>Name:</strong> {dogData.name || "No data available"}</p>
                <p><strong>Age:</strong> {dogData.age || "No data available"}</p>
                <p><strong>Description:</strong> {dogData.description || "No data available"}</p>

                <label htmlFor="date">Date:</label>
                <input type="date" id="date" name="date" min={today} required />

                <SubmitButton type="submit">Submit</SubmitButton>
            </FormContainer>
        </>
    );
}

export default Appointment;