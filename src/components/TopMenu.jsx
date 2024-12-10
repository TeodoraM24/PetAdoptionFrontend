import { NavLink } from 'react-router';
import styled from 'styled-components';
import logo from '../Logo.png'; // Replace with the actual path to your logo image

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: flex-start; /* Aligns logo to the left */
  align-items: center;
  background-color: var(--hover-color); /* Matches header background */
  height: 80px; /* Adjust the height of the header */
  width: 100%; /* Full width of the page */
  padding: 0 20px; /* Adjust padding for a balanced look */
`;

const Logo = styled.img`
  width: 20%; /* Adjust to fit the header width better */
  height: auto; /* Maintain aspect ratio */
  object-fit: contain; /* Keep the aspect ratio intact */
`;

const StyledMenu = styled.ul`
  display: flex;
  list-style: none;
  gap: 15px;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none; /* Remove underline from links */
  color: var(--text-color-light); /* Set text color */
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s; /* Smooth transition for background and color change */

  &:hover {
    background-color: var(--pastel-purple); /* Background change on hover */
    color: #fff; /* Change text color on hover */
  }
`;

function TopMenu() {
  return (
    <HeaderWrapper>
      {/* Logo aligned to the left and scaled down */}
      <StyledNavLink to="/">
        <Logo src={logo} alt="AdoptTheFloof Logo" />
      </StyledNavLink>

      {/* Menu items */}
      <StyledMenu>
        <li>
          <StyledNavLink to="/" end>
            Home
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/about">About</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/adoption">Adoption</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/apointment">Appointment</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/dogs">Dogs</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/login">Login</StyledNavLink>
        </li>
      </StyledMenu>
    </HeaderWrapper>
  );
}

export default TopMenu;
