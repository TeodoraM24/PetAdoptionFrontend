import styled from 'styled-components';
import DogImageButton from '../components/DogImageButton';
import HomePageImage from '../images/Nielsen.png';  // Import the image from the src folder
import { NavLink } from 'react-router'; // Import NavLink for routing

// Use a sophisticated font such as Merriweather
const TextOverlay = styled.div`
  position: absolute;
  top: 50%;
  right: 10%; /* Adjust to move the text to the right */
  transform: translate(0, -50%); /* Center vertically but stay aligned to the right */
  color: #fff;  /* White text color */
  font-size: 2.5rem; /* Adjust font size */
  font-weight: 700;  /* Bold */
  font-family: 'Merriweather', serif;  /* Sophisticated font */
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7); /* Optional text shadow for better readability */
  text-align: center;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;  /* Default height */
  background-image: url(${HomePageImage});
  background-size: cover;
  background-position: top center; /* Move the image upwards */
  opacity: 0.7; /* Slight transparency */
  margin-top: 0;

  @media (max-width: 768px) {
    height: 250px;  /* Adjust height on medium screens */
  }

  @media (max-width: 480px) {
    height: 200px;  /* Adjust height on smaller screens */
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Adjust this to top */
  align-items: center;
  width: 100%;
  min-height: 100vh; /* Ensures content takes full height */
  padding: 0; /* Avoid unwanted padding */
  margin: 0;
`;

const MissionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 80%;
  margin-top: 40px;
  padding: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 480px) {
    width: 90%;
  }
`;

const LeftSide = styled.div`
  width: 50%;  /* Adjust width to take up half */
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%; /* Full width on smaller screens */
    text-align: center;
    padding-right: 0;
  }
`;

const RightSide = styled.div`
  width: 50%; /* Adjust width to take up half */
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%; /* Full width on smaller screens */
    margin-top: 20px;
  }
`;

const LearnMoreLink = styled(NavLink)`
  font-size: 1.0rem;
  color: #d8bfd8; /* Purple color by default */
  text-decoration: none;
  margin-top: 20px;
  font-weight: bold;
  transition: color 0.3s ease;

  &:hover {
    color: #e6d5e6; /* Lighter shade of purple for hover */
  }
`;

const MissionTitle = styled.h2`
  font-size: 2rem;
  color: #333; /* Dark text color */
`;

const ParagraphText = styled.p`
  font-size: 1rem;
  color: #4a4a4a; /* Dark gray with a slightly warm tone */
  line-height: 1.6;
  margin-top: 10px;
`;

function Home() {
  return (
    <ContentWrapper>
      {/* Image container with text overlay */}
      <ImageContainer>
        <TextOverlay>Find Your New Best Friend</TextOverlay>
      </ImageContainer>

      {/* Mission Container with left and right sections */}
      <MissionContainer>
        {/* Left side with About Us Text */}
        <LeftSide>
          <MissionTitle>Our Mission</MissionTitle>
          <ParagraphText>We are dedicated to giving street dogs in Serbia a second chance at a loving home.</ParagraphText>
          <ParagraphText>By adopting, you’re not just bringing a pet into your life—you’re saving a life.</ParagraphText>
          <ParagraphText>Our goal is to connect people with these amazing dogs who deserve a warm, loving family.</ParagraphText>
          <ParagraphText>Join us in making a difference and finding your new best friend today!</ParagraphText>

          {/* Learn More link */}
          <LearnMoreLink to="/about">Learn More</LearnMoreLink>
        </LeftSide>

        {/* Right side with Dog Image Button */}
        <RightSide>
          <DogImageButton />
        </RightSide>
      </MissionContainer>
    </ContentWrapper>
  );
}

export default Home;