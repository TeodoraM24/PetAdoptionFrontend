import React, { useEffect, useState } from "react";
import { InfoContainer, RowContainer } from "../styles/Dog.styles";
import { useNavigate } from "react-router-dom";

function Dogs() {
    const [dogs, setDogs] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        async function fetchDogs() {
            try {
                const response = await fetch("http://localhost:3000/dogs"); // Local API for now
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setDogs(data);
            } catch (err) {
                setError(err.message);
            }
        }

        fetchDogs();
    }, []);

    return (
        <div>
            <h1>Available Dogs</h1>
            {error ? (
                <p>Error: {error}</p>
            ) : dogs.length === 0 ? (
                <p>Loading...</p>
            ) : (
                <RowContainer>
                    {dogs.map((dog) => (
                        <InfoContainer key={dog.id}>
                            <p><strong>Name:</strong> {dog.name}</p>
                            <p><strong>Breed:</strong> {dog.breed}</p>
                            <p><strong>Age:</strong> {dog.age}</p>
                            <p><strong>Status:</strong> {dog.status}</p>
                            <button
                                onClick={() =>
                                    navigate("/appointment", { state: dog })
                                }
                            >
                                Book an appointment
                            </button>
                        </InfoContainer>
                    ))}
                </RowContainer>
            )}
        </div>
    );
}

export default Dogs;