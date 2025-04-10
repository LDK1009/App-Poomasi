"use client";
import InstallPWA from "@/components/common/InstallPWA";
import { styled } from "@mui/material";
import { Box } from "@mui/material";
import { mixinContainer } from "@/styles/mixins";

const MainContainer = () => {
  return (
    <Container>
      <InstallPWA />

    </Container>
  );
};

export default MainContainer;

const Container = styled(Box)`
  ${mixinContainer}
`;
