import { useState, useEffect } from 'react';
import apiFacade from '../util/apiFacade';
import styled from 'styled-components';

// Wrapper for the entire CreateAdoption page
const CreateAdoptionContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 50px auto;  /* Center the form */
  padding: 20px;
  background-color: var(--body-background); /* White background from global style */
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
  box-sizing: border-box;
`;

// Header styling
const Title = styled.h2`
  font-size: 2.5rem;
  color: var(--pastel-purple);  /* Using global pastel purple */
  text-align: center;
  margin-bottom: 30px;
`;

// Form label styling
const Label = styled.label`
  font-size: 1.2rem;
  margin-bottom: 5px;
  display: block;
  color: var(--text-color-light); /* Dark text for readability */
`;

// Form input and textarea styling
const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid var(--pastel-purple);
  border-radius: 4px;
  margin-bottom: 15px;
  box-sizing: border-box;
  background-color: #ffffff;
  color: #333333;

  &:focus {
    outline: none;
    border-color: var(--pastel-purple); /* Matching focus color */
    box-shadow: 0px 0px 4px rgba(186, 104, 200, 0.5); /* Purple glow */
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid var(--pastel-purple);
  border-radius: 4px;
  margin-bottom: 15px;
  box-sizing: border-box;
  background-color: #ffffff;
  color: #333333;

  &:focus {
    outline: none;
    border-color: var(--pastel-purple);
    box-shadow: 0px 0px 4px rgba(186, 104, 200, 0.5);
  }
`;

const Button = styled.button`
  background-color: var(--pastel-purple);
  color: var(--text-color-light);
  font-size: 1.2rem;
  font-weight: bold;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--hover-color); /* Using global hover color */
  }
`;

// Message display (error and success)
const Message = styled.p`
  font-size: 1rem;
  text-align: center;
  margin-top: 10px;

  ${(props) =>
    props.type === 'error' &&
    `color: red; font-weight: bold;`}

  ${(props) =>
    props.type === 'success' &&
    `color: green; font-weight: bold;`}
`;

const CreateAdoption = ({ setAdoptions }) => {
  const [dogId, setDogId] = useState('');
  const [adoptedBy, setAdoptedBy] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('PENDING');
  const [dogs, setDogs] = useState([]);  // Store the list of dogs
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch available dogs when the component mounts
  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await apiFacade.fetchDogs();  // Fetch dogs from the backend
        setDogs(response);  // Assuming the response is an array of dog objects
      } catch (error) {
        console.error("Error fetching dogs:", error);
        setError("Error fetching dogs.");
      }
    };

    fetchDogs();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Clear previous messages
    setError('');
    setSuccess('');

    // Validate form fields
    if (!dogId || !adoptedBy || !date || !status) {
      setError('Please fill in all fields.');
      return;
    }

    // Find the selected dog object by name
    const selectedDog = dogs.find((dog) => dog.name === dogId);
    if (!selectedDog) {
      setError('Dog not found.');
      return;
    }

    const adoptionData = {
      dog: selectedDog,  // Send the dog object
      username: adoptedBy,  // Map adoptedBy to username for the API
      date,  // Date in YYYY-MM-DD format
      status: status.toUpperCase(),
    };

    console.log("Creating adoption with data:", adoptionData); // Log the data being sent

    try {
      // Send data to the backend
      const response = await apiFacade.createAdoption(adoptionData);
      console.log('Create adoption response:', response); // Check what the backend returns

      if (response && response.id) {
        setSuccess('Adoption created successfully!');
        const data = await apiFacade.fetchAdoptions(); // Fetch updated adoptions list
        setAdoptions(data); // Update the adoptions list in the parent component
      } else {
        setError('Failed to create adoption. Response from backend: ' + JSON.stringify(response));
      }
    } catch (error) {
      console.error('Create Adoption Error:', error);
      setError('An error occurred while creating the adoption. Check console for details.');
    }
  };

  return (
    <CreateAdoptionContainer>
      <Title>Create a New Adoption</Title>
      {error && <Message type="error">{error}</Message>}
      {success && <Message type="success">{success}</Message>}
      <form onSubmit={handleSubmit}>
        <div>
          <Label>Dog Name:</Label>
          <Select
            value={dogId}
            onChange={(e) => setDogId(e.target.value)}
            required
          >
            <option value="">Select a Dog</option>
            {dogs
              .filter(dog => dog.status === 'AVAILABLE')  // Filter only available dogs
              .map((dog) => (
                <option key={dog.id} value={dog.name}>
                  {dog.name}
                </option>
              ))}
          </Select>
        </div>
        <div>
          <Label>Adopted By (Username):</Label>
          <Input
            type="text"
            value={adoptedBy}
            onChange={(e) => setAdoptedBy(e.target.value)}
            required
            placeholder="Enter your username"
          />
        </div>
        <div>
          <Label>Adoption Date:</Label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Status:</Label>
          <Select value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
          </Select>
        </div>
        <Button type="submit">Create Adoption</Button>
      </form>
    </CreateAdoptionContainer>
  );
};

export default CreateAdoption;
