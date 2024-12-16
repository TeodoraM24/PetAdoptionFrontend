import { useState, useEffect } from 'react';
import DogItem from './DogItem';
import SearchFilter from './SearchFilter';
import apiFacade from '../util/apiFacade'; // Import the facade
import styled from 'styled-components';

const DogListContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
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

  const filteredDogs = dogs.filter((dog) => {
    const matchesBreed = dog.breed.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAge = ageFilter ? dog.age === parseInt(ageFilter, 10) : true;
    return matchesBreed && matchesAge;
  });

  const handleLoadMore = () => {
    setDogsToShow(prev => prev + 9); // Load 9 more dogs
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <DogListContainer>
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
        <button onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </DogListContainer>
  );
};

export default DogList;
