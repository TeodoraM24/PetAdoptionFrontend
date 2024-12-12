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
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const DogImage = styled.img`
  display: block;
  margin: 0 auto;
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  object-fit: cover;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.3);
  }
`;

const DogName = styled.h2`
  font-size: 2rem;
  color: #333;
  margin: 10px 0;
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

const DogDetail = () => {
  const { id } = useParams();
  const [dog, setDog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // You can replace this with context or localStorage check

  useEffect(() => {
    // Mock login check, replace with actual login check
    const userStatus = localStorage.getItem('userLoggedIn');
    setIsLoggedIn(userStatus === 'true');

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

  if (loading) {
    return <div>Loading dog details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <DogDetailContainer>
      <DogImage src={dog.image} alt={dog.name} />
      <DogName>{dog.name}</DogName>
      <DetailText><DetailLabel>Breed:</DetailLabel> {dog.breed}</DetailText>
      <DetailText><DetailLabel>Age:</DetailLabel> {dog.age} years old</DetailText>
      <DetailText><DetailLabel>Status:</DetailLabel> {dog.status}</DetailText>
      <DetailText><DetailLabel>Description:</DetailLabel> {dog.description}</DetailText>
      
      
        <>
          <ButtonContainer>
            <button>Adoption</button>
            <button>Appointment</button>
          </ButtonContainer>
          <InfoText>
            We highly recommend meeting the dog first before considering adoption. 
            This will help us and you determine if you're a good match for each other.
          </InfoText>
        </>
      
    </DogDetailContainer>
  );
};

export default DogDetail;
