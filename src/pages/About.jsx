import styled from 'styled-components';
import Video from '../videos/Video.mp4'; // Import the video from the src/videos folder

// Styled components for About page text
const AboutTitle = styled.h1`
  font-size: 2.5rem; /* Adjust title font size */
  color: #333; /* Dark text color */
  font-weight: 700; /* Bold for emphasis */
  margin-bottom: 30px; /* Add more space below the title */
  text-align: center;
  font-family: 'Merriweather', serif; /* Use a more sophisticated font */
`;

const AboutParagraph = styled.p`
  font-size: 1.1rem; /* Slightly larger text for better readability */
  color: #4a4a4a; /* A dark gray color for readability */
  line-height: 1.6;
  margin-top: 15px; /* Add margin to space out paragraphs */
  text-align: justify; /* Justify text for a clean look */
  max-width: 800px; /* Limit width to improve readability */
  margin-left: auto;
  margin-right: auto; /* Center-align the text */
  font-family: 'Merriweather', serif;
`;

const VideoContainer = styled.div`
  text-align: center; /* Center-align video */
  margin-top: 30px;
  max-width: 100%;
  width: 100%; /* Ensure it is responsive */
`;

const SectionHeader = styled.h2`
  font-size: 1.8rem; /* Slightly smaller for section headers */
  color: #6a4e9f; /* Complementary purple color */
  font-weight: bold;
  margin-top: 30px;
  text-align: center;
  font-family: 'Merriweather', serif;
`;

const HelpSection = styled.div`
  margin-top: 40px;
  text-align: center;
  background-color: #f8f8f8;
  padding: 40px;
  border-radius: 8px;
`;

const HelpParagraph = styled.p`
  font-size: 1.1rem;
  color: #333;
  line-height: 1.6;
  margin-bottom: 20px;
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

function About() {
  return (
    <AboutContainer>
      <AboutTitle>About Us</AboutTitle>
      
      <AboutParagraph>
        Here’s a video to help you learn more about our mission and the dogs we help!
      </AboutParagraph>

      {/* Embed the video */}
      <VideoContainer>
        <video width="800" controls style={{ margin: '20px 0' }}>
          <source src={Video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </VideoContainer>

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

      <p>Note: The entire web page is dedicated for education purposes, and is a part of a school project.</p>
    </AboutContainer>
    
  );
}

export default About;
