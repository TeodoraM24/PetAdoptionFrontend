import { useState, useEffect } from 'react';
import DogItem from './DogItem';
import SearchFilter from './SearchFilter';
import apiFacade from '../util/apiFacade'; // Import the facade
import styled from 'styled-components';

// Title Component
const DogListContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: var(--pastel-purple);  // Using pastel purple from global styles
  font-weight: 400;  // Lighter font weight for a softer feel
  margin-bottom: 30px; // Increased spacing from the content below
  text-align: center; // Center-align the title

  /* Soothing Typography */
  font-family: 'Arial', sans-serif;  // Using 'Arial' for consistency
  letter-spacing: 2px;  // Adds space between letters for a more elegant feel

  /* Adding a soft shadow for warmth */
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);

  /* Gradient Effect */
  background: linear-gradient(to right, #d8bfd8, #e6d5e6); /* Lighter hover effect */
  -webkit-background-clip: text;
  color: transparent;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
`;

const DogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 items per row */
  gap: 30px; /* Increased gap for larger items */
  width: 100%;
  max-width: 1200px;
  margin: 0 auto; /* Center the grid */
  box-sizing: border-box;

  /* Media queries for responsiveness */
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr); /* 2 items per row on medium screens */
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* 1 item per row on small screens */
  }
`;

const DogList = () => {
  const [dogs, setDogs] = useState([]); // State to store fetched dogs
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [searchQuery, setSearchQuery] = useState(''); // Search query for breed
  const [ageFilter, setAgeFilter] = useState(''); // Filter for age
  const [dogsToShow, setDogsToShow] = useState(9); // Dogs to show initially (9 dogs)

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchDogsData = async () => {
      try {
        const data = await apiFacade.fetchDogs(); // Use the facade here
        setDogs(data);
      } catch (error) {
        setError('Failed to fetch dogs');
      } finally {
        setLoading(false);
      }
    };

    fetchDogsData();
  }, []);

  // Filter dogs based on breed, age, and availability status
  const filteredDogs = dogs.filter((dog) => {
    const matchesBreed = dog.breed.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAge = ageFilter ? dog.age === parseInt(ageFilter, 10) : true;
    const matchesStatus = dog.status && dog.status.toLowerCase() === 'available'; // Case-insensitive status check

    return matchesBreed && matchesAge && matchesStatus;
  });

  const handleLoadMore = () => {
    setDogsToShow((prev) => prev + 9); // Load 9 more dogs
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <DogListContainer>
      <Title>Here are some available dogs</Title>

      <SearchContainer>
        <SearchFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          ageFilter={ageFilter}
          setAgeFilter={setAgeFilter}
          dogs={dogs}
        />
      </SearchContainer>

      <DogGrid>
        {filteredDogs.slice(0, dogsToShow).map((dog) => (
          <DogItem key={dog.id} dog={dog} />
        ))}
      </DogGrid>

      {filteredDogs.length > dogsToShow && (
        <button onClick={handleLoadMore}>Load More</button>
      )}
    </DogListContainer>
  );
};

export default DogList;
