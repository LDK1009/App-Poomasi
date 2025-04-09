"use client";
import InstallPWA from "@/components/common/InstallPWA";
import Header from "./Header";
import { styled } from "@mui/material";
import { Box } from "@mui/material";
import { mixinContainer } from "@/styles/mixins";
import PartnerContainer from "./PartnerContainer";
const MainContainer = () => {
  return (
    <Container>
      <InstallPWA />
      <Header />
      <PartnerContainer />
    </Container>
  );
};

export default MainContainer;

const Container = styled(Box)`
  ${mixinContainer}
`;
