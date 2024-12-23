import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import styled from 'styled-components';
import apiFacade from '../util/apiFacade';

// Styled components remain unchanged
const Container = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #fdf9fc;
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

const AuthLinks = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AuthLink = styled(NavLink)`
  font-size: 1.0rem;
  color: #d8bfd8;
  text-decoration: none;
  padding: 0.5rem;
  font-weight: bold;
  transition: color 0.3s ease;

  &:hover {
    color: #e6d5e6;
    text-decoration: underline;
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
  color: #d8bfd8;
  text-decoration: none;
  margin-top: 20px;
  font-weight: bold;
  transition: color 0.3s ease;

  &:hover {
    color: #e6d5e6;
  }
`;

function LoginComponent() {
  const [loginCredentials, setLoginCredentials] = useState({ username: '', password: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(apiFacade.loggedIn());
  const [isAdmin, setIsAdmin] = useState(false); // Track admin status
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      const roles = apiFacade.getUserRoles(); // Fetch user roles from apiFacade
      setIsAdmin(roles.toLowerCase().includes('admin')); // Check if the user is an admin
    }
  }, [isLoggedIn]);

  const performLogin = (evt) => {
    evt.preventDefault();
    apiFacade.login(
      loginCredentials.username,
      loginCredentials.password,
      (loggedIn) => {
        if (loggedIn) {
          setIsLoggedIn(true);
          setErrorMessage('');
          navigate('/');
        } else {
          setErrorMessage('Login failed. Please check your credentials.');
        }
      }
    );
  };

  const onChange = (evt) => {
    const { id, value } = evt.target;
    setLoginCredentials((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const performLogout = () => {
    apiFacade.logout(() => {
      setIsLoggedIn(false);
      setIsAdmin(false); // Reset admin state
      navigate('/login');
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
          <AuthLink to="/appointment">Appointments</AuthLink>
          {isAdmin && <AuthLink to="/adoption">Adoption</AuthLink>} {/* Conditional link */}
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
