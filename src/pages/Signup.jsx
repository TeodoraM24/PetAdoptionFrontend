import { useState } from "react";
import { useNavigate } from "react-router";
import { SignupContainer, InputField, Button } from "../styles/Signup.styles";
import Logo from "../images/Logo.png";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Password validation function
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long, include at least one uppercase letter, and two numbers."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("https://petadoption.schoolwork.dk/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.msg || "An error occurred during signup.");
        return;
      }

      const data = await response.json();
      setSuccessMessage(`User ${data.username || username} created successfully!`);

      // Redirect to login after success
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError("Failed to register. Please try again later.");
    }
  };

  return (
    <SignupContainer>
      <img src={Logo} alt="Logo" />
      <form onSubmit={handleSignup}>
        <InputField>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </InputField>
        <InputField>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </InputField>
        <InputField>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </InputField>
        <Button type="submit">Sign Up</Button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </SignupContainer>
  );
}

export default Signup;
