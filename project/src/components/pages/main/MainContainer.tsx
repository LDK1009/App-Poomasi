"use client";
import InstallPWA from "@/components/common/InstallPWA";
import { styled } from "@mui/material";
import { Box, Button, Grid2, Stack, Typography } from "@mui/material";
import { mixinContainer } from "@/styles/mixins";
import Image from "next/image";
import {
  HandshakeOutlined,
  TrendingUpOutlined,
  SecurityOutlined,
  SearchOutlined,
  KeyboardArrowRightRounded,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

const MainContainer = () => {
  const router = useRouter();

  return (
    <MainWrapper>
      <InstallPWA />

      {/* 히어로 섹션 */}
      <HeroSection>
        <HeroContent>
          <HeroTitle variant="h3" fontWeight={"bold"}>
            비공개 테스트
            <br />
            품앗이 플랫폼
          </HeroTitle>
          <HeroDescription>
            앱 품앗이는 비공개 테스트를 위한
            <br />
            <b>비공개 테스트 품앗이 플랫폼</b>입니다.
            <br />
            서로의 비공개 테스트 파트너가 되어주세요!
            <br />
          </HeroDescription>
          <ButtonGroup>
            <PrimaryButton variant="contained" onClick={() => router.push("/partners")} endIcon={<SearchOutlined />}>
              테스터 찾기
            </PrimaryButton>
          </ButtonGroup>
        </HeroContent>
        <ImageContainer>
          <Image
            src="/img/hero-image.png"
            alt="품앗이 파트너 서비스 이미지"
            width={500}
            height={400}
            style={{ objectFit: "contain" }}
            priority
          />
        </ImageContainer>
      </HeroSection>

      {/* 특징 섹션 */}
      <FeaturesSection>
        <SectionTitle variant="h4">주요 기능</SectionTitle>
        <FeaturesGrid container spacing={4}>
          <Grid2>
            <FeatureCard>
              <FeatureIconWrapper>
                <HandshakeOutlined fontSize="large" />
              </FeatureIconWrapper>
              <FeatureTitle variant="h6">손쉬운 파트너십 형성</FeatureTitle>
              <FeatureDescription>
                몇 번의 클릭만으로 파트너를 찾고 연결할 수 있습니다.
                <br /> 복잡한 절차 없이 빠르게 협업을 시작하세요.
              </FeatureDescription>
            </FeatureCard>
          </Grid2>
          <Grid2>
            <FeatureCard>
              <FeatureIconWrapper>
                <TrendingUpOutlined fontSize="large" />
              </FeatureIconWrapper>
              <FeatureTitle variant="h6">성장 가속화</FeatureTitle>
              <FeatureDescription>
                상호 홍보와 협업을 통해 앱의 성장을 가속화하고 더 많은 사용자에게 도달할 수 있습니다.
              </FeatureDescription>
            </FeatureCard>
          </Grid2>
          <Grid2>
            <FeatureCard>
              <FeatureIconWrapper>
                <SecurityOutlined fontSize="large" />
              </FeatureIconWrapper>
              <FeatureTitle variant="h6">안전한 파트너십</FeatureTitle>
              <FeatureDescription>
                검증된 파트너들과 안전하게 협업할 수 있는 환경을 제공합니다.
                <br />
                모든 파트너십은 상호 동의를 기반으로 합니다.
              </FeatureDescription>
            </FeatureCard>
          </Grid2>
        </FeaturesGrid>
      </FeaturesSection>

      {/* 사용 방법 섹션 */}
      <HowToSection>
        <SectionTitle variant="h4">이용 방법</SectionTitle>
        <StepsContainer>
          <StepItem>
            <StepNumber>1</StepNumber>
            <StepContent>
              <StepTitle variant="h6">계정 정보 등록</StepTitle>
              <StepDescription>앱 이름, 링크 등 기본 정보를 등록하여 프로필을 완성하세요.</StepDescription>
            </StepContent>
          </StepItem>
          <StepItem>
            <StepNumber>2</StepNumber>
            <StepContent>
              <StepTitle variant="h6">파트너 찾기</StepTitle>
              <StepDescription>파트너 목록에서 협업하고 싶은 앱을 찾아 파트너 요청을 보내세요.</StepDescription>
            </StepContent>
          </StepItem>
          <StepItem>
            <StepNumber>3</StepNumber>
            <StepContent>
              <StepTitle variant="h6">파트너십 관리</StepTitle>
              <StepDescription>승인된 파트너와 협업하고 상호 성장을 위한 활동을 시작하세요.</StepDescription>
            </StepContent>
          </StepItem>
        </StepsContainer>
        <CTAButton variant="contained" onClick={() => router.push("/partners")} endIcon={<KeyboardArrowRightRounded />}>
          지금 시작하기
        </CTAButton>
      </HowToSection>

      {/* 푸터 */}
      <Footer>
        <Typography variant="body2" align="center" color="textSecondary">
          © 2025 앱 품앗이. 모든 권리 보유.
        </Typography>
      </Footer>
    </MainWrapper>
  );
};

export default MainContainer;

// 스타일 컴포넌트
const MainWrapper = styled(Stack)`
  ${mixinContainer};
  row-gap: 40px;
`;

const HeroSection = styled(Stack)`
  position: relative;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const HeroContent = styled(Stack)`
  max-width: 600px;
  gap: 24px;
  margin-top: 40px;
  z-index: 1;
`;

const HeroTitle = styled(Typography)`
  font-weight: 800;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.palette.primary.main},
    ${({ theme }) => theme.palette.secondary.main}
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 16px;
`;

const HeroDescription = styled(Typography)`
  font-size: 18px;
  color: ${({ theme }) => theme.palette.text.secondary};
  line-height: 1.6;
`;

const ButtonGroup = styled(Stack)`
  flex-direction: row;
  gap: 16px;
  margin-top: 16px;
`;

const PrimaryButton = styled(Button)`
  padding: 12px 24px;
  font-weight: bold;
  border-radius: 30px;
  text-transform: none;
  color: ${({ theme }) => theme.palette.text.white};
`;

const ImageContainer = styled(Box)`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-40%);
  z-index: 0;
  opacity: 0.9;
  display: none;

  @media (min-width: 960px) {
    display: block;
  }
`;

const FeaturesSection = styled(Box)``;

const SectionTitle = styled(Typography)`
  font-weight: 700;
  text-align: center;
  color: ${({ theme }) => theme.palette.primary.main};
`;

const FeaturesGrid = styled(Grid2)`
  margin-top: 36px;
`;

const FeatureCard = styled(Box)`
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: 16px;
  padding: 32px 24px;
  height: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureIconWrapper = styled(Box)`
  background-color: ${({ theme }) => `${theme.palette.primary.main}20`};
  color: ${({ theme }) => theme.palette.primary.main};
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
`;

const FeatureTitle = styled(Typography)`
  font-weight: 700;
  margin-bottom: 16px;
`;

const FeatureDescription = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.secondary};
  line-height: 1.6;
`;

const HowToSection = styled(Box)`
  background-color: ${({ theme }) => `${theme.palette.primary.main}05`};
  border-radius: 24px;
  margin: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StepsContainer = styled(Stack)`
  width: 100%;
  max-width: 800px;
  gap: 40px;
  margin-top: 36px;
  margin-bottom: 36px;
`;

const StepItem = styled(Stack)`
  flex-direction: row;
  gap: 24px;
  align-items: flex-start;
`;

const StepNumber = styled(Box)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 20px;
`;

const StepContent = styled(Box)`
  flex: 1;
`;

const StepTitle = styled(Typography)`
  font-weight: 700;
  margin-bottom: 8px;
`;

const StepDescription = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.secondary};
  line-height: 1.6;
`;

const CTAButton = styled(Button)`
  padding: 12px 32px;
  font-weight: bold;
  border-radius: 30px;
  text-transform: none;
  font-size: 16px;
  margin-top: 16px;
  color: ${({ theme }) => theme.palette.text.white};
`;

const Footer = styled(Box)`
  padding-top: 24px;
  border-top: 1px solid ${({ theme }) => theme.palette.divider};
`;
