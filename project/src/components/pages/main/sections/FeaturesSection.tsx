"use client";
import { styled } from "@mui/material";
import { Box, Grid2, Typography } from "@mui/material";
import {
  HandshakeOutlined,
  TrendingUpOutlined,
  SecurityOutlined,
} from "@mui/icons-material";

const FeaturesSection = () => {
  return (
    <FeaturesSectionWrapper>
      <SectionTitle variant="h4">주요 기능</SectionTitle>
      <FeaturesGrid container spacing={4}>
        <Grid2 size={12}>
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
        <Grid2 size={12}>
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
        <Grid2 size={12}>
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
    </FeaturesSectionWrapper>
  );
};

export default FeaturesSection;

// 스타일 컴포넌트
const FeaturesSectionWrapper = styled(Box)``;

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