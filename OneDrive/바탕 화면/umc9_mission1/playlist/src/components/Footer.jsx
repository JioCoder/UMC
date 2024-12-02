import styled from "styled-components";

const Footer = () => {
    return (
        <FooterContainer>
            <h3>University MakeUs Challenge</h3>
        </FooterContainer>
    );
};

export default Footer;

const FooterContainer = styled.footer`
  background-color: #4caf50;
  padding: 16px;
  text-align: center;
  color: white;
  max-width: 800px;  
  margin: 0 auto;
  box-sizing: border-box;

  h3 {
    margin: 0;
    font-size: 24px;
  }
`;