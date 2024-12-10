import { NavLink } from 'react-router';

function Signup() {
  return (
    <div>
      <h1>Sign Up</h1>
      {/* Signup Form */}
      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <NavLink to="/login">Login here</NavLink>
      </p>
    </div>
  );
}

export default Signup;
