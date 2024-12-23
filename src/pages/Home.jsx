import styled from 'styled-components';
import { useState } from 'react';
import DogImageButton from '../components/DogImageButton';
import HomePageImage from '../images/Nielsen.png';  // Import the image from the src folder
import { NavLink } from 'react-router'; // Import NavLink for routing

// Styled components for the page
const TextOverlay = styled.div`
  position: absolute;
  top: 50%;
  right: 10%; 
  transform: translate(0, -50%);
  color: #fff;
  font-size: 2.5rem;
  font-weight: 700;
  font-family: 'Merriweather', serif;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);
  text-align: center;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  background-image: url(${HomePageImage});
  background-size: cover;
  background-position: top center;
  opacity: 0.7;
  margin-top: 0;

  @media (max-width: 768px) {
    height: 250px;
  }

  @media (max-width: 480px) {
    height: 200px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding: 0;
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
  width: 50%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    padding-right: 0;
  }
`;

const RightSide = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 20px;
  }
`;

const LearnMoreLink = styled(NavLink)`
  font-size: 1.0rem;
  color: #d8bfd8;
  text-decoration: none;
  margin-top: 20px;
  font-weight: bold;
  transition: color 0.3s ease;

  &:hover {
    color: #e6d5e6;
  }
`;

const MissionTitle = styled.h2`
  font-size: 2rem;
  color: #333;
`;

const ParagraphText = styled.p`
  font-size: 1rem;
  color: #4a4a4a;
  line-height: 1.6;
  margin-top: 10px;
`;

// Role Assignment Section Styling
const AdminRoleAssignmentContainer = styled.div`
  margin-top: 40px;
  padding: 20px;
  width: 80%;
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const RoleAssignmentButton = styled.button`
  font-size: 1.2rem;
  padding: 15px 30px;
  background-color: #d8bfd8;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #e6d5e6;
    transform: scale(1.05);
  }

  &:disabled {
    background-color: #c6c6c6;
    cursor: not-allowed;
  }
`;

function Home() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get the JWT token from localStorage
  const token = localStorage.getItem('jwt_token');
  
  const handleAddRole = async () => {
    if (!token) {
      alert('User is not logged in!');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Assuming the token contains user information or we can extract user info via backend
      const response = await fetch('/auth/user/addrole', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: 'user', // Here you can set the username dynamically
          role: 'ADMIN',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to assign role');
      }

      alert('Role updated to ADMIN!');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContentWrapper>
      <ImageContainer>
        <TextOverlay>Find Your New Best Friend</TextOverlay>
      </ImageContainer>

      <MissionContainer>
        <LeftSide>
          <MissionTitle>Our Mission</MissionTitle>
          <ParagraphText>We are dedicated to giving street dogs in Serbia a second chance at a loving home.</ParagraphText>
          <ParagraphText>By adopting, you’re not just bringing a pet into your life—you’re saving a life.</ParagraphText>
          <ParagraphText>Our goal is to connect people with these amazing dogs who deserve a warm, loving family.</ParagraphText>
          <ParagraphText>Join us in making a difference and finding your new best friend today!</ParagraphText>

          <LearnMoreLink to="/about">Learn More</LearnMoreLink>
        </LeftSide>

        <RightSide>
          <DogImageButton />
        </RightSide>
      </MissionContainer>

      {/* Admin Role Assignment Section */}
      {token && (
        <AdminRoleAssignmentContainer>
          <h3>Click to Promote User to Admin</h3>
          <RoleAssignmentButton onClick={handleAddRole} disabled={loading}>
            {loading ? 'Updating Role...' : 'Assign Admin Role'}
          </RoleAssignmentButton>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </AdminRoleAssignmentContainer>
      )}
    </ContentWrapper>
  );
}

export default Home;
