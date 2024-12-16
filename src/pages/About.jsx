import styled from 'styled-components';
import Video from '../videos/Video.mp4'; // Import the video from the src/videos folder

// Styled components for About page text
const AboutTitle = styled.h1`
  font-size: 2.8rem;
  color: #333; /* Dark grey for the title */
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
  font-family: 'Merriweather', serif;
`;

const AboutParagraph = styled.p`
  font-size: 1.2rem;
  color: #555; /* Lighter grey for better readability */
  line-height: 1.7;
  margin-top: 20px;
  text-align: justify;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  font-family: 'Merriweather', serif;
  padding: 0 15px;
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
  font-size: 2rem;
  color: #2c3e50; /* Darker navy blue for text */
  font-weight: bold;
  margin-top: 40px;
  text-align: center;
  font-family: 'Merriweather', serif;
  cursor: pointer;
  position: relative;

  &:hover {
    color: #34495e; /* Slightly lighter shade for hover */
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    right: 0;
    height: 3px;
    background-color: #95a5a6; /* Soft grey line */
    transform: scaleX(0);
    transform-origin: bottom right;
    transition: transform 0.3s ease-in-out;
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;

const HelpSection = styled.div`
  margin-top: 60px;
  text-align: center;
  background-color: #f8f8f8;
  padding: 50px;
  border-radius: 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
`;

const HelpParagraph = styled.p`
  font-size: 1.2rem;
  color: #333;
  line-height: 1.6;
  margin-bottom: 25px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  font-family: 'Merriweather', serif;
`;

const AboutContainer = styled.div`
  padding: 20px;
  background-color: #fff;
`;

const NoteText = styled.p`
  font-size: 0.9rem;
  color: #555;
  margin-top: 40px;
  text-align: center;
  font-family: 'Merriweather', serif;
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
