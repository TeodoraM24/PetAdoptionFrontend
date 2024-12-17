import { useEffect, useState } from 'react';
import apiFacade from '../util/apiFacade';
import styled from 'styled-components';

// Styled components
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

const DogList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const DogItem = styled.li`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid var(--pastel-purple);
  border-radius: 5px;
  background-color: #f9f9f9;

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
  const [dogs, setDogs] = useState([]);
  const [userAdoptionStatus, setUserAdoptionStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAdoptionData = async () => {
      try {
        // Get user ID from the token (assuming the user ID is stored in the token payload)
        const userId = apiFacade.getUserRoles(); // You may need to extract the user ID from the token

        if (!userId) {
          throw new Error('User ID not found');
        }

        const adoptionStatus = await apiFacade.fetchUserAdoptionStatus(userId);
        setUserAdoptionStatus(adoptionStatus);

        // Fetch the list of all dogs for admin view
        const dogsData = await apiFacade.fetchAdoptions();

        // Filter out only approved adoptions
        const approvedDogs = dogsData.filter(dog => dog.adoptionStatus === 'Approved');
        setDogs(approvedDogs);

        setLoading(false);
      } catch (err) {
        console.error('Fetch User Adoption Status Error:', err);
        setError('Failed to load adoption data.');
        setLoading(false);
      }
    };

    fetchAdoptionData();
  }, []);

  // Check if the user is an admin
  const isAdmin = apiFacade.hasUserAccess('ADMIN', true);

  return (
    <Container>
      <Title>{isAdmin ? 'Approved Adoptions Overview' : 'Your Adoption Status'}</Title>
      {loading && <p>Loading...</p>}
      {error && <StatusMessage isError={true}>{error}</StatusMessage>}

      {/* Admin View: Display approved dogs for adoption */}
      {isAdmin && (
        <div>
          <h3>Approved Dogs for Adoption:</h3>
          <DogList>
            {dogs.length > 0 ? (
              dogs.map((dog) => (
                <DogItem key={dog.id}>
                  <h3>{dog.name}</h3>
                  <p>Status: Approved</p>
                </DogItem>
              ))
            ) : (
              <p>No approved adoptions at the moment.</p>
            )}
          </DogList>
        </div>
      )}

      {/* User View: Display the user's adoption status */}
      {!isAdmin && (
        <div>
          {userAdoptionStatus && userAdoptionStatus.status === 'Approved' ? (
            <StatusMessage isError={false}>
              Your adoption of {userAdoptionStatus.dogName} has been approved!
            </StatusMessage>
          ) : (
            <StatusMessage isError={true}>
              You have no approved adoptions at the moment.
            </StatusMessage>
          )}
        </div>
      )}
    </Container>
  );
};

export default PetAdoption;
