"use client";
import { styled } from "@mui/material";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <FooterWrapper>
      <Typography variant="body2" align="center" color="textSecondary">
        © 2025 앱 품앗이. 모든 권리 보유.
      </Typography>
    </FooterWrapper>
  );
};

export default Footer;

// 스타일 컴포넌트
const FooterWrapper = styled(Box)`
  padding-top: 24px;
  border-top: 1px solid ${({ theme }) => theme.palette.divider};
`; 