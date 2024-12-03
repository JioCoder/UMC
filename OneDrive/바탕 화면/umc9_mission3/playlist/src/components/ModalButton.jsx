import styled from "styled-components";
import useStore from "../store/store"; // Zustand

const ModalButton = () => {
    const { clearCart, closeModal } = useStore();

    return (
        <ButtonContainer>
            <YesButton onClick={() => {
                clearCart();
                closeModal();
            }}>
                네
            </YesButton>
            <NoButton onClick={() => closeModal()}>
                아니요
            </NoButton>
        </ButtonContainer>
    );
};

export default ModalButton;


const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const YesButton = styled.button` 
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4caf50;
  }
`;

const NoButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4caf50; 
  }
`;