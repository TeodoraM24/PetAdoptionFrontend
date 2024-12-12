import styled from 'styled-components';
import { NavLink } from 'react-router';  // Use NavLink from react-router

// Styled wrapper for the image and name overlay
const DogItemWrapper = styled.li`
  display: inline-block;
  width: 250px;
  margin: 20px;
  border: 3px solid var(--pastel-purple);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 0px 20px rgba(181, 126, 220, 0.4),
                0px 0px 50px rgba(181, 126, 220, 0.3);
    border-color: rgba(181, 126, 220, 0.7);
  }
`;

// Styled image container with text overlay
const DogImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

// Styled text overlay for the dog's name
const DogNameOverlay = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: white;
  font-size: 18px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px;
  border-radius: 5px;
`;

// Use className as a function that applies 'active' styles when the link is active
const DogItem = ({ dog }) => {
  return (
    <NavLink
      to={`/dog/${dog.id}`}  // Navigate to dog details page
      style={{ textDecoration: 'none' }} // Ensures no underline
      className={({ isActive }) => (isActive ? 'active' : '')} // Apply 'active' class when active
    >
      <DogItemWrapper>
        <DogImageWrapper>
          <img
            src={dog.image}
            alt={dog.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <DogNameOverlay>{dog.name}</DogNameOverlay>
        </DogImageWrapper>
      </DogItemWrapper>
    </NavLink>
  );
};

export default DogItem;
