import styled from 'styled-components';
import { NavLink } from 'react-router';

// Styled components
const DogItemWrapper = styled.li`
  display: inline-block;
  width: 300px; /* Increased width */
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

const DogImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 250px; /* Increased height */
  overflow: hidden;
`;

const DogNameOverlay = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: white;
  font-size: 20px; /* Increased font size */
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px;
  border-radius: 5px;
`;

// Helper function for images
const getDogImage = (name) => {
  // Convert the name to lowercase and replace spaces with underscores
  const imageName = name.toLowerCase().replace(/\s+/g, '_');
  // Construct the path relative to public folder
  return `/images/${imageName}.png`; // Image path in public folder
};

const DogItem = ({ dog }) => {
  const imageUrl = getDogImage(dog.name);

  // Fallback image handler in case of error
  const handleImageError = (e) => {
    e.target.src = '/images/default.png'; // Set the default image if the dog image fails to load
  };

  return (
    <NavLink to={`/dog/${dog.id}`} style={{ textDecoration: 'none' }}>
      <DogItemWrapper>
        <DogImageWrapper>
          <img
            src={imageUrl} // Dynamically set image path
            alt={dog.name}
            onError={handleImageError} // Fallback logic when image fails to load
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <DogNameOverlay>{dog.name}</DogNameOverlay>
        </DogImageWrapper>
      </DogItemWrapper>
    </NavLink>
  );
};

export default DogItem;
