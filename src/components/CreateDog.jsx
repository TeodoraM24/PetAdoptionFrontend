import { useState } from 'react';
import apiFacade from '../util/apiFacade';
import styled from 'styled-components';

// Wrapper for the entire CreateDog page
const CreateDogContainer = styled.div`
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

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid var(--pastel-purple);
  border-radius: 4px;
  margin-bottom: 15px;
  height: 120px;
  box-sizing: border-box;
  background-color: #ffffff;
  color: #333333;

  &:focus {
    outline: none;
    border-color: var(--pastel-purple);
    box-shadow: 0px 0px 4px rgba(186, 104, 200, 0.5);
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
    `
      color: red;
      font-weight: bold;
    `}

  ${(props) =>
    props.type === 'success' &&
    `
      color: green;
      font-weight: bold;
    `}
`;

const CreateDog = ({ setDogs }) => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [status, setStatus] = useState('AVAILABLE');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Clear previous messages
    setError('');
    setSuccess('');

    // Validate form fields
    if (!name || !breed || !age || !status || !description) {
      setError('Please fill in all fields.');
      return;
    }

    const dogData = {
      name,
      breed,
      age, // Age is expected as a string like "5 years old"
      status: status.toUpperCase(),
      description,
    };

    console.log("Creating dog with data:", dogData); // Log the data being sent

    try {
      const response = await apiFacade.createDog(dogData);
      console.log('Create dog response:', response); // Check what the backend returns

      if (response && response.id) {
        setSuccess('Dog created successfully!');
        const data = await apiFacade.fetchDogs(); // Fetch updated dogs list
        setDogs(data); // Update the dog list in the parent component
      } else {
        setError('Failed to create dog.');
      }
    } catch (error) {
      console.error('Create Dog Error:', error);
    }
  };

  return (
    <CreateDogContainer>
      <Title>Create a New Dog</Title>
      {error && <Message type="error">{error}</Message>}
      {success && <Message type="success">{success}</Message>}
      <form onSubmit={handleSubmit}>
        <div>
          <Label>Name:</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Breed:</Label>
          <Input
            type="text"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Age:</Label>
          <Input
            type="text" // Age is a string field (e.g., "5 years old")
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            placeholder="e.g., 5 years old"
          />
        </div>
        <div>
          <Label>Status:</Label>
          <Select value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="AVAILABLE">Available</option>
            <option value="ADOPTED">Adopted</option>
            <option value="NOT-AVAILABLE">Not Available</option>
          </Select>
        </div>
        <div>
          <Label>Description:</Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Describe the dog"
          />
        </div>
        <Button type="submit">Create Dog</Button>
      </form>
    </CreateDogContainer>
  );
};

export default CreateDog;
