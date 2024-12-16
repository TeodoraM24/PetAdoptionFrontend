import styled from "styled-components";

export const SignupContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem; /* Adds spacing between child elements */
    max-width: 400px;
    margin: 0 auto;
    padding: 1rem;
    background-color: var(--body-background);
    border: 1px solid var(--pastel-purple);
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const InputField = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem; /* Adds spacing between label and input */
`;

export const Button = styled.button`
    margin-top: 1rem; /* Adds spacing between the last input field and the button */
    padding: 0.5rem 1rem;
    background-color: var(--pastel-purple);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    align-self: center;
    width: 50%;
`;
