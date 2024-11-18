import React from 'react';
import styled from 'styled-components';

const Spinner = () => {
    return (
        <SpinnerContainer>
            <div className="spinner"></div>
        </SpinnerContainer>
    );
};

const SpinnerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    .spinner {
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-top: 4px solid #fff;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
    }
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

export default Spinner;