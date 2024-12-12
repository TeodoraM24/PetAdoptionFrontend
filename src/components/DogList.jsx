import { useState, useEffect } from 'react';
import DogItem from './DogItem';
import SearchFilter from './SearchFilter';
import apiFacade from '../util/apiFacade'; // Import the facade

const DogList = () => {
  const [dogs, setDogs] = useState([]); // State to store fetched dogs
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [searchQuery, setSearchQuery] = useState(''); // Search query for breed
  const [ageFilter, setAgeFilter] = useState(''); // Filter for age

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <SearchFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        ageFilter={ageFilter}
        setAgeFilter={setAgeFilter}
        dogs={dogs}
      />

      <ul>
        {filteredDogs.length > 0 ? (
          filteredDogs.map((dog) => <DogItem key={dog.id} dog={dog} />)
        ) : (
          <div>No dogs match your criteria.</div>
        )}
      </ul>
    </div>
  );
};

export default DogList;
