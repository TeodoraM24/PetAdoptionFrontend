import { NavLink } from 'react-router'; 
import styled from 'styled-components';
import logo from '../DogButton.png';  // Import the logo correctly

const ImageButtonWrapper = styled.div`
  display: inline-block;
  width: 150px; /* Set fixed width for square shape */
  height: 150px; /* Set fixed height for square shape */
  border: 3px solid var(--pastel-purple); /* Border outline around the square */
  border-radius: 10px; /* Rounded corners for the square */
  overflow: hidden; /* Hide anything outside the square */
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Add subtle shadow for depth */
  
  &:hover {
    transform: scale(1.05); /* Slightly enlarge the image on hover */
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2); /* Increase shadow on hover */
  }

  img {
    width: 100%; /* Make image fill the container */
    height: 100%;
    object-fit: cover; /* Ensure the image covers the area without distortion */
  }
`;

function DogImageButton() {
  return (
    <NavLink to="/dogs">
      <ImageButtonWrapper>
        <img src={logo} alt="Dog" />  {/* Use 'logo' here instead of hardcoded string */}
      </ImageButtonWrapper>
    </NavLink>
  );
}

export default DogImageButton;
