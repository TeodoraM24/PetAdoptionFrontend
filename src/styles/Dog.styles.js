import styled from "styled-components";

export const RowContainer = styled.div`
    display: flex;
    flex-wrap: wrap; /* Allows containers to wrap to the next row */
    gap: 1rem; /* Space between the containers */
    justify-content: center; /* Center the containers horizontally */
    margin-top: 1rem; /* Add some space above the rows */
`;

export const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 45%; /* Adjust width to fit two containers in a row */
    max-width: 400px;
    margin: 0 auto;
    padding: 1rem;
    background-color: var(--body-background);
    border: 1px solid var(--pastel-purple);
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

    /* Ensure consistent height for uniform rows */
    box-sizing: border-box;
`;
