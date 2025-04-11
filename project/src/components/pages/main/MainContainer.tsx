"use client";
import InstallPWA from "@/components/common/InstallPWA";
import { styled } from "@mui/material";
import { Stack } from "@mui/material";
import { mixinContainer } from "@/styles/mixins";

// 분리된 섹션 컴포넌트들 임포트
import HeroSection from "./sections/HeroSection";
import HowToSection from "./sections/HowToSection";
import Footer from "./sections/Footer";

const MainContainer = () => {
  return (
    <MainWrapper>
      <InstallPWA />
      <HeroSection />
      <HowToSection />
      <Footer />
    </MainWrapper>
  );
};

export default MainContainer;

// 스타일 컴포넌트
const MainWrapper = styled(Stack)`
  ${mixinContainer};
  justify-content: center;
  align-items: center;
  row-gap: 40px;
`;
