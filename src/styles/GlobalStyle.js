import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 16px;
}

/* Ensure root takes full width and height */
#root {
    width: 100%;
    height: 100%;
    display: block; /* Allows full height and width */
}

/* Root Variables for Colors */
:root {
    font-size: 18px;
    --background-color: #f4e1f4; /* Pastel purple background */
    --body-background: #ffffff; /* White for the main body area */
    --text-color-light: #333333; /* Darker text color for readability */
    --pastel-purple: #d8bfd8; /* Pastel purple color */
    --hover-color: #e6d5e6; /* Lighter hover effect color */
    --small-device: 640px;
    --medium-device: 968px;
}

/* Body structure */
body {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--background-color); /* Pastel background */
    color: var(--text-color-light); /* Dark text color */
    font-family: 'Arial', sans-serif;
    width: 100%; /* Full width */
    height: 100vh; /* Full height */
    margin: 0;
}

/* Header and Main Content Area */
header, main, footer {
    width: 100%; /* Full width */
    padding: 1rem;
    box-sizing: border-box;
}

/* Ensure the header and menu have consistent background */
header {
    background-color: var(--hover-color); /* Background color for header */
    border-bottom: 1px solid var(--pastel-purple);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;  /* Adjust padding for a balanced look */
}

main {
    background-color: var(--body-background); /* White background */
    color: var(--pastel-purple); /* Pastel purple text */
    min-height: 80vh; /* Main content height */
    padding: 2rem 1rem;
    max-width: 100%; /* Full width */
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
    border-radius: 8px;
}

footer {
    background-color: var(--hover-color);
    display: flex;
    justify-content: center;
    gap: 1rem;
    border-top: 1px solid var(--pastel-purple);
}

/* Styling for Links */
a {
    color: var(--pastel-purple); /* Purple color for links */
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: all 0.3s ease; /* Smooth transition for hover */
}

a:hover {
    background-color: var(--body-background); /* White background on hover */
    color: var(--hover-color); /* Lighter color when hovered */
}

/* Buttons */
button {
    background-color: var(--pastel-purple);
    border: none;
    color: var(--text-color-light);
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: var(--hover-color); /* Change button background on hover */
}

/* Form Inputs */
input, textarea {
    border: 1px solid var(--pastel-purple);
    padding: 0.5rem;
    border-radius: 4px;
    font-size: 1rem;
    width: 100%;
    background-color: #ffffff;
    color: #333333;
}

input:focus, textarea:focus {
    outline: none;
    border-color: var(--pastel-purple); /* Purple border on focus */
    box-shadow: 0px 0px 4px rgba(186, 104, 200, 0.5); /* Purple glow */
}

/* Media Queries for Responsiveness */
@media (max-width: var(--small-device)) {
    /* Allow full width on smaller screens */
    header, main, footer {
        width: 100%;
    }
}
    
`;

export default GlobalStyle;
