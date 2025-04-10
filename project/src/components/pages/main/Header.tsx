import { Stack, Typography, styled } from "@mui/material";
import HandshakeIcon from "@mui/icons-material/Handshake";

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <IconWrapper>
          <HandshakeIcon fontSize="large" />
        </IconWrapper>
        <HeaderTitle variant="h5" fontWeight="bold">
          함께 성장하는 품앗이 파트너
        </HeaderTitle>
        <HeaderSubtitle>
          서로의 성장을 돕고
          <br />
          함께 발전하는 파트너십 플랫폼
        </HeaderSubtitle>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled(Stack)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  padding: 32px 16px;
  border-radius: 8px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled(Stack)`
  align-items: center;
  text-align: center;
  row-gap: 16px;
`;

const IconWrapper = styled(Stack)`
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 64px;
  height: 64px;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const HeaderTitle = styled(Typography)`
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const HeaderSubtitle = styled(Typography)`
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  max-width: 600px;
`;
