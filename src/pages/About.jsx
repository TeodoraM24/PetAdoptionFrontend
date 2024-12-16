import styled from 'styled-components';
import Video from '../videos/Video.mp4'; // Import the video from the src/videos folder

// Styled components for About page text
const AboutTitle = styled.h1`
  font-size: 2.8rem;
  color: var(--text-color-light); /* Use the light text color from global styles */
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
  font-family: 'Merriweather', serif;
  letter-spacing: 2px; /* Slightly spaced for a more elegant feel */
`;

const AboutParagraph = styled.p`
  font-size: 1.2rem;
  color: var(--text-color-light); /* Lighter text for readability */
  line-height: 1.7;
  margin-top: 20px;
  text-align: justify;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  font-family: 'Merriweather', serif;
  padding: 0 15px;
  font-weight: 400; /* Softer font weight for better readability */
`;

const VideoContainer = styled.div`
  display: flex; /* Enable flexbox */
  justify-content: center; /* Center the video horizontally */
  align-items: center; /* Vertically center the video */
  margin-top: 40px;
  max-width: 100%;
  width: 100%;
  padding: 0 15px; /* Add some padding for responsiveness */

  @media (max-width: 768px) {
    padding: 0; /* Remove padding on smaller screens */
  }
`;

const SectionHeader = styled.h2`
  font-size: 2.2rem;
  color: var(--pastel-purple); /* Use pastel purple color for the header */
  font-weight: 600;
  margin-top: 50px; /* Larger margin for a cleaner break between sections */
  text-align: center;
  font-family: 'Merriweather', serif;
  cursor: pointer;
  position: relative;
  padding-bottom: 5px;
  border-bottom: 2px solid var(--pastel-purple); /* Soft underline for added emphasis */

  &:hover {
    color: var(--hover-color); /* Lighter shade for hover */
  }
`;

const HelpSection = styled.div`
  margin-top: 60px;
  text-align: center;
  background-color: var(--hover-color); /* Lighter hover color as background */
  padding: 50px;
  border-radius: 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease; /* Smooth transition for hover effect */

  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
`;

const HelpParagraph = styled.p`
  font-size: 1.2rem;
  color: var(--text-color-light); /* Dark text color for readability */
  line-height: 1.6;
  margin-bottom: 25px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  font-family: 'Merriweather', serif;
`;

const AboutContainer = styled.div`
  padding: 40px 20px;
  background-color: var(--body-background); /* White background */
  max-width: 1200px;
  margin: 0 auto; /* Centering the content */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  border-radius: 10px;
  margin-top: 40px;
`;

const NoteText = styled.p`
  font-size: 0.9rem;
  color: var(--text-color-light); /* Light text color */
  margin-top: 40px;
  text-align: center;
  font-family: 'Merriweather', serif;
  font-weight: 300; /* Lighter font for the note */
`;

function About() {
  return (
    <AboutContainer>
      <AboutTitle>About Us</AboutTitle>
      
      <AboutParagraph>
        Here’s a video to help you learn more about our mission and the dogs we help!
      </AboutParagraph>

      {/* Embed the video in a flexbox container */}
      <VideoContainer>
        <video width="100%" controls style={{ maxWidth: '800px', width: '100%', height: 'auto' }}>
          <source src={Video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </VideoContainer>

      {/* Section headers with hover effects */}
      <SectionHeader>What is our mission?</SectionHeader>
      <AboutParagraph>
        At AdoptTheFloof, we believe that every dog deserves a loving home. Our mission is to rescue street dogs and provide them with a second chance at life. By connecting these amazing animals with compassionate families, we aim to make the world a better place, one adoption at a time.
      </AboutParagraph>

      <SectionHeader>Why Adoption Matters</SectionHeader>
      <AboutParagraph>
        Adoption is not just about bringing a new pet into your home—it’s about saving a life. Every year, millions of dogs are abandoned or left to fend for themselves on the streets. By choosing to adopt, you’re not only giving a dog a forever home but also making a positive impact on your community. The bond you share with an adopted dog will be lifelong, and the love you’ll receive in return is priceless.
      </AboutParagraph>

      <SectionHeader>Here’s how the adoption process works at AdoptTheFloof</SectionHeader>
      <AboutParagraph>
        <strong>Rescue:</strong> We find and rescue street dogs in need of a safe and loving environment.<br />
        <strong>Care & Rehabilitation:</strong> Each dog is given the necessary veterinary care, including vaccinations and medical treatment.<br />
        <strong>Adoption:</strong> We carefully match each dog with a family based on their personality and needs.<br />
        <strong>Follow-up:</strong> After adoption, we stay in touch with the new families to ensure the dogs are happy and healthy in their new homes.
      </AboutParagraph>

      <SectionHeader>How can you help</SectionHeader>
      <HelpSection>
        <HelpParagraph>
          There are many ways you can help:
        </HelpParagraph>
        <HelpParagraph>
          <strong>Adopt:</strong> If you’re ready to bring a new furry friend into your home, check out our available dogs.<br />
          <strong>Donate:</strong> Your generous donations help cover the cost of veterinary care, food, shelter, and more (Note: The donations section of this website is part of a fictional project for educational purposes and is not intended for real donations).<br />
          <strong>Volunteer:</strong> We’re always in need of volunteers to help with events, fostering dogs, and spreading awareness.<br />
          <strong>Spread the Word:</strong> Share our mission with your friends and family to help us reach more people who can make a difference.
        </HelpParagraph>
      </HelpSection>

      <NoteText>Note: The entire web page is dedicated for educational purposes, and is a part of a school project.</NoteText>
    </AboutContainer>
  );
}

export default About;
