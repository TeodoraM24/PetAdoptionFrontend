import styled from "styled-components";

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 400px;
    margin: 0 auto;
    padding: 1rem;
    background-color: var(--body-background);
    border: 1px solid var(--pastel-purple);
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const SubmitButton = styled.button`
    align-self: center;
    width: 50%;
`;

export const LogoImage = styled.img`
    width: 100px;
    margin: 0 auto;
    display: block; /* Centers the image */
`;
