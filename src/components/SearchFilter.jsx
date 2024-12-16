import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem; /* Space between input and dropdown */
  margin-top: 2rem; /* Adjust the top margin */
  background-color: var(--body-background); /* Consistent background */
  padding: 1.5rem;
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  width: 90%; /* Ensure it looks good on all screen sizes */
  max-width: 500px; /* Prevent it from being too wide */
`;

const Input = styled.input`
  border: 1px solid var(--pastel-purple);
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  background-color: #ffffff;
  color: var(--text-color-light);
  transition: box-shadow 0.3s ease, border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--pastel-purple);
    box-shadow: 0px 0px 4px rgba(186, 104, 200, 0.5);
  }
`;

const Dropdown = styled.select`
  border: 1px solid var(--pastel-purple);
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  background-color: #ffffff;
  color: var(--text-color-light);
  transition: box-shadow 0.3s ease, border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--pastel-purple);
    box-shadow: 0px 0px 4px rgba(186, 104, 200, 0.5);
  }
`;

const SearchFilter = ({ searchQuery, setSearchQuery, ageFilter, setAgeFilter }) => {
  const ageOptions = Array.from({ length: 10 }, (_, i) => i + 1); // Generate ages 1 through 10

  return (
    <Container>
      <Input
        type="text"
        placeholder="Search by breed"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Dropdown
        value={ageFilter}
        onChange={(e) => setAgeFilter(e.target.value)}
      >
        <option value="">All Ages</option>
        {ageOptions.map((age) => (
          <option key={age} value={age}>
            {age}
          </option>
        ))}
        <option value="10+">10+</option>
      </Dropdown>
    </Container>
  );
};

export default SearchFilter;
