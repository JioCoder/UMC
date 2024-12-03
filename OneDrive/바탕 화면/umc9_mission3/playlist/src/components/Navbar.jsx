import styled from "styled-components";
import useStore from "../store/store"; // Zustand

const Navbar = () => {
    const { amount } = useStore();

    return (
        <StyledNav>
            <div className="nav-content">
                <h3 className="nav-title">UMC PlayList</h3>
                <div className="cart-container">
                    <StyledCartIcon>🛒</StyledCartIcon> 
                    <StyledAmountBadge>
                        <p className="cart-amount">{amount}</p>
                    </StyledAmountBadge>
                </div>
            </div>
        </StyledNav>
    );
};

export default Navbar;

const StyledNav = styled.nav`
  background-color: #357a38;
  padding: 16px;
  color: white;
  max-width: 800px;
  margin: 0 auto;
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .nav-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .nav-title {
    margin: 0;
    font-size: 24px;
    font-weight: bold;
    letter-spacing: 1px;
  }

  .cart-container {
    position: relative;
    display: flex;
    align-items: center;
  }
`;

const StyledCartIcon = styled.div`
  font-size: 28px;
  margin-right: 12px;
  color: white;
  cursor: pointer;

  &:hover {
    color: #ffeb3b;
  }
`;

const StyledAmountBadge = styled.div`
  position: absolute;
  top: -4px;
  right: 0;
  background-color: #e53935;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  .cart-amount {
    font-size: 12px;
    color: white;
    font-weight: bold;
  }
`;
