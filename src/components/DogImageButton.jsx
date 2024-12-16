import { NavLink } from 'react-router';  
import styled from 'styled-components';
import logo from '../images/DogButton.png';  // Import the logo correctly

const ImageButtonWrapper = styled.div`
  display: inline-block;
  width: 150px; /* Set fixed width for square shape */
  height: 150px; /* Set fixed height for square shape */
  border: 3px solid var(--pastel-purple); /* Initial border outline */
  border-radius: 10px; /* Rounded corners for the square */
  overflow: hidden; /* Hide anything outside the square */
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */

  &:hover {
    transform: scale(1.05); /* Slightly enlarge the image */
    box-shadow: 0px 0px 20px rgba(181, 126, 220, 0.4), /* Lighter neon lavender glow */
                0px 0px 50px rgba(181, 126, 220, 0.3); /* More spread-out, subtle glow */
    border-color: rgba(181, 126, 220, 0.7); /* Lighter neon lavender border on hover */
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
