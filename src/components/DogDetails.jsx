import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import apiFacade from '../util/apiFacade';
import styled from 'styled-components';

// Styled components for the dog details
const DogDetailContainer = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  margin: 20px auto;
  display: flex;
  flex-direction: row; /* Default flex direction for larger screens */
  justify-content: flex-start;
  align-items: center;
  gap: 30px; /* Space between image and text */
  
  @media (max-width: 768px) {
    flex-direction: column; /* Stack items vertically on smaller screens */
    gap: 20px; /* Reduce gap when stacked */
  }
`;

const DogImage = styled.img`
  display: block;
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  object-fit: cover;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    max-width: 100%; /* Ensure the image takes full width on smaller screens */
  }
`;

const DogTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 500px; /* Set a max-width for the text container */
  
  @media (max-width: 768px) {
    max-width: 100%; /* Ensure text container takes full width on smaller screens */
  }
`;

const DogName = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 10px;
  font-weight: bold;
`;

const DetailText = styled.p`
  font-size: 1.1rem;
  color: #555;
  margin: 10px 0;
`;

const DetailLabel = styled.span`
  font-weight: bold;
  color: #333;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 15px;
`;

const InfoText = styled.p`
  font-size: 1rem;
  color: #333;
  margin-top: 20px;
`;

// Helper function for image path
const getDogImage = (name) => {
  const imageName = name.toLowerCase().replace(/\s+/g, '_'); // Format the name
  return `/images/${imageName}.png`; // Return the path to the dog's image
};

// DogDetail component
const DogDetail = () => {
  const { id } = useParams();
  const [dog, setDog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(apiFacade.loggedIn()); // Check logged-in status via apiFacade

  useEffect(() => {
    const fetchDogDetail = async () => {
      try {
        const dogData = await apiFacade.fetchDogDetails(id);
        if (!dogData || !dogData.id) {
          throw new Error("Invalid dog data");
        }
        setDog(dogData);
      } catch (err) {
        console.error('Error fetching dog details:', err);
        setError('Failed to fetch dog details');
      } finally {
        setLoading(false);
      }
    };

    fetchDogDetail();
  }, [id]);

  // Fallback function for image load error
  const handleImageError = (e) => {
    e.target.src = '/images/default.png'; // Set the default image if the dog image fails to load
  };

  if (loading) {
    return <div>Loading dog details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const imageUrl = getDogImage(dog.name);

  return (
    <DogDetailContainer>
      <DogTextContainer>
        <DogName>{dog.name}</DogName>
        <DetailText><DetailLabel>Breed:</DetailLabel> {dog.breed}</DetailText>
        <DetailText><DetailLabel>Age:</DetailLabel> {dog.age} years old</DetailText>
        <DetailText><DetailLabel>Status:</DetailLabel> {dog.status}</DetailText>
        <DetailText><DetailLabel>Description:</DetailLabel> {dog.description}</DetailText>
        
        {isLoggedIn && (
          <>
            <InfoText>
              If you are interested in adopting, please make an appointment!
            </InfoText>
            <ButtonContainer>
              <button>Appointment</button>
            </ButtonContainer>
          </>
        )}
      </DogTextContainer>

      <DogImage 
        src={imageUrl} 
        alt={dog.name} 
        onError={handleImageError}  // Fallback to the default image if the dog image fails to load
      />
    </DogDetailContainer>
  );
};

export default DogDetail;
