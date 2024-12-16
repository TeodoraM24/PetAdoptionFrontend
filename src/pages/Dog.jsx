import DogDetail from '../components/DogDetails';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;  // Ensures the container takes at least the full viewport height
  text-align: center;  // Centers the text horizontally
  background-color: #fdf9fc;  // Very light warm lilac almost white
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 30px;
`;

function Dog() {
  return (
    <PageContainer>
      <Heading>Is this your new bestfriend?</Heading>
      <DogDetail />
    </PageContainer>
  );
}

export default Dog;
