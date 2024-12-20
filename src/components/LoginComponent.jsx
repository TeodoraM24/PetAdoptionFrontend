import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router'; // Using react-router as requested
import styled from 'styled-components';
import apiFacade from '../util/apiFacade'; // Adjust path as necessary

// Styled components for the login form
const Container = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color:  #fdf9fc;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: var(--text-color-light);
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid var(--pastel-purple);
  border-radius: 5px;
  font-size: 1rem;
  width: 100%;
  background-color: #ffffff;
  &:focus {
    border-color: var(--pastel-purple);
    outline: none;
    box-shadow: 0 0 5px rgba(186, 104, 200, 0.5);
  }
`;

const Button = styled.button`
  background-color: var(--pastel-purple);
  border: none;
  color: var(--text-color-light);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: var(--hover-color);
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
`;

const InfoText = styled.p`
  margin-top: 15px;
  font-size: 0.9rem;
  color: var(--text-color-light);
`;

const StyledNavLink = styled(NavLink)`
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

const AuthLinks = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AuthLink = styled(NavLink)`
  font-size: 1.0rem;
  color: #d8bfd8; /* Purple color by default */
  text-decoration: none;
  padding: 0.5rem;
  font-weight: bold;
  transition: color 0.3s ease;
  
  &:hover {
    color: #e6d5e6; /* Lighter purple for hover */
    text-decoration: underline; /* Underline effect on hover */
  }
`;

function LoginComponent() {
  const [loginCredentials, setLoginCredentials] = useState({ username: '', password: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(apiFacade.loggedIn()); // Check login state initially
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Perform login
  const performLogin = (evt) => {
    evt.preventDefault();
    apiFacade.login(
      loginCredentials.username,
      loginCredentials.password,
      (loggedIn) => {
        if (loggedIn) {
          setIsLoggedIn(true);
          setErrorMessage('');
          navigate('/'); // Redirect on success
        } else {
          setErrorMessage('Login failed. Please check your credentials.');
        }
      }
    );
  };

  // Handle input changes
  const onChange = (evt) => {
    const { id, value } = evt.target;
    setLoginCredentials((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handle logout
  const performLogout = () => {
    apiFacade.logout(() => {
      setIsLoggedIn(false);
      navigate('/login'); // Redirect to login page
    });
  };

  return (
    <Container>
      <Title>{isLoggedIn ? 'Welcome' : 'Login'}</Title>

      {!isLoggedIn ? (
        <Form onSubmit={performLogin}>
          <Input
            type="text"
            id="username"
            placeholder="Username"
            value={loginCredentials.username}
            onChange={onChange}
          />
          <Input
            type="password"
            id="password"
            placeholder="Password"
            value={loginCredentials.password}
            onChange={onChange}
          />
          <Button type="submit">Login</Button>
        </Form>
      ) : (
        <AuthLinks>
          {/* NavLinks for Appointment and Adoption styled as "Learn More" */}
          <AuthLink to="/appointment">Appointments</AuthLink>
          <AuthLink to="/adoption">Adoption</AuthLink>
          
          {/* Logout Button */}
          <Button onClick={performLogout}>Logout</Button>
        </AuthLinks>
      )}

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

      {!isLoggedIn && (
        <InfoText>
          Don't have an account? <StyledNavLink to="/signup">Sign up here</StyledNavLink>
        </InfoText>
      )}
    </Container>
  );
}

export default LoginComponent;
