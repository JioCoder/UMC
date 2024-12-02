import styled from "styled-components";
import { useSelector } from "react-redux";

const Navbar = () => {
    const { amount } = useSelector((state) => state.cart);
    return (
        <Nav>
            <div className="nav-center">
                <h3>UMC PlayList</h3>
                <div className="amount-container">
                    <CartIcon>🛒</CartIcon>  {/* 이모지 */}
                    <AmountContainer>
                        <p className="total-amount">{amount}</p>
                    </AmountContainer>
                </div>
            </div>
        </Nav>
    );
};

export default Navbar;

const Nav = styled.nav`
  background: #4caf50; 
  padding: 16px;
  color: white;
  max-width: 800px;
  margin: 0 auto;
  box-sizing: border-box;

  .nav-center {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  h3 {
    margin: 0;
    font-size: 24px;
  }

  .amount-container {
    position: relative;
    display: flex;
    align-items: center;
  }
`;

const CartIcon = styled.div`
  font-size: 30px;  
  margin-right: 10px;  
`;

const AmountContainer = styled.div`
  position: absolute;
  top: 0px;
  right: 3px;
  background-color: red;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  .total-amount {
    font-size: 12px;
    color: white;
  }
`;