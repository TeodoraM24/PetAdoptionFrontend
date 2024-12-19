import { useEffect, useState } from 'react';
import apiFacade from '../util/apiFacade';
import styled from 'styled-components';
import CreateAdoption from './CreateAdoption'; // Import the CreateAdoption component

const Container = styled.div`
  width: 80%;
  max-width: 1000px;
  margin: 50px auto;
  padding: 20px;
  background-color: var(--body-background);
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: var(--pastel-purple);
  text-align: center;
  margin-bottom: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px; /* Space between the button and the adoption list */
`;

const Button = styled.button`
  display: inline-block;
  background-color: #bfa5d8; /* Softer pastel purple */
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: auto;

  &:hover {
    background-color: #d0a6e0; /* Slightly lighter purple on hover */
  }
`;

const AdoptionList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const AdoptionItem = styled.li`
  margin-bottom: 15px;
  padding: 20px;
  border: 1px solid var(--pastel-purple);
  border-radius: 8px;
  background-color: #f9f9f9;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  }

  h3 {
    font-size: 1.8rem;
    margin-bottom: 5px;
  }

  p {
    font-size: 1.2rem;
  }
`;

const StatusMessage = styled.p`
  font-size: 1.2rem;
  text-align: center;
  color: ${(props) => (props.isError ? 'red' : 'green')};
`;

const PetAdoption = () => {
  const [adoptions, setAdoptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false); // Track form visibility
  const [isAdmin, setIsAdmin] = useState(false); // Track if user is admin

  useEffect(() => {
    const fetchAdoptionData = async () => {
      try {
        if (!apiFacade.loggedIn()) {
          throw new Error('User is not logged in.');
        }

        // Check if the user is an admin
        const roles = apiFacade.getUserRoles(); // Get user roles from apiFacade
        if (roles.toLowerCase().includes('admin')) {
          setIsAdmin(true); // If the user is an admin, set isAdmin to true
        }

        const allAdoptions = await apiFacade.fetchAdoptions();
        setAdoptions(allAdoptions);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching adoption data:', err);
        setError('Failed to load adoption data.');
        setLoading(false);
      }
    };

    fetchAdoptionData();
  }, []);

  // Format the date using Intl.DateTimeFormat
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  // Toggle visibility of the CreateAdoption form
  const toggleForm = () => {
    setShowForm((prevState) => !prevState);
  };

  return (
    <Container>
      <Title>Adoption Status</Title>
      {loading && <p>Loading...</p>}
      {error && <StatusMessage isError={true}>{error}</StatusMessage>}

      {/* Only show the button and form if the user is an admin */}
      {isAdmin && (
        <>
          <ButtonContainer>
            <Button onClick={toggleForm}>
              {showForm ? 'Close Form' : 'Create a New Adoption'}
            </Button>
          </ButtonContainer>

          {/* Create Adoption Form */}
          {showForm && <CreateAdoption setAdoptions={setAdoptions} />}
        </>
      )}

      {/* Only show the adoption list if the user is an admin */}
      {isAdmin && (
        <AdoptionList>
          {adoptions.length > 0 ? (
            adoptions.map((adoption) => (
              <AdoptionItem key={adoption.id}>
                <h3>Dog: {adoption.dog?.name || 'Unknown'}</h3>
                <p>Adopted By: {adoption.username}</p>
                <p>Status: {adoption.status}</p>
                <p>Date: {formatDate(adoption.date)}</p> {/* Format the date */}
              </AdoptionItem>
            ))
          ) : (
            <p>No adoptions found.</p>
          )}
        </AdoptionList>
      )}
    </Container>
  );
};

export default PetAdoption;
