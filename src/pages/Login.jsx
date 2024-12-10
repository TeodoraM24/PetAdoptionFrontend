import { NavLink } from 'react-router';

function Login() {
  return (
    <div>
      <h1>Login</h1>
      {/* Login Form */}
      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      <p> Don't have an account? <NavLink to="/signup">Sign up here</NavLink></p>
    </div>
  );
}

export default Login;
