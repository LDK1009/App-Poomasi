"use client";
import { styled } from "@mui/material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { KeyboardArrowRightRounded } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const HowToSection = () => {
  const router = useRouter();

  return (
    <HowToSectionWrapper>
      <SectionTitle variant="h4">이용 방법</SectionTitle>
      <StepsContainer>
        {/* 1. 회원가입 */}
        <StepItem>
          <StepNumber>1</StepNumber>
          <StepContent>
            <StepTitle variant="h6">회원가입</StepTitle>
            <StepDescription>구글 계정을 통해 회원가입을 진행합니다.</StepDescription>
            <PrimaryButton
              onClick={() => router.push("/auth/sign-in")}
              variant="contained"
              endIcon={<KeyboardArrowRightRounded />}
            >
              회원가입
            </PrimaryButton>
          </StepContent>
        </StepItem>
        {/* 2. 계정 정보 등록 */}
        <StepItem>
          <StepNumber>2</StepNumber>
          <StepContent>
            <StepTitle variant="h6">계정 정보 등록</StepTitle>
            <StepDescription>앱 이름, 링크 등 기본 정보를 등록하여 프로필을 완성하세요.</StepDescription>
            <PrimaryButton
              href="/my-page/account-information"
              variant="contained"
              color="primary"
              endIcon={<KeyboardArrowRightRounded />}
            >
              계정 정보 등록
            </PrimaryButton>
          </StepContent>
        </StepItem>
        {/* 3. 품앗이 파트너 찾기 */}
        <StepItem>
          <StepNumber>3</StepNumber>
          <StepContent>
            <StepTitle variant="h6">품앗이 파트너 찾기</StepTitle>
            <StepDescription>파트너 찾기 페이지에서 함께 비공개 테스트를 헤쳐나갈 파트너를 찾아보세요.</StepDescription>
            <PrimaryButton href="/partners" variant="contained" color="primary" endIcon={<KeyboardArrowRightRounded />}>
              파트너 찾기
            </PrimaryButton>
          </StepContent>
        </StepItem>
        {/* 4. 파트너십 관리 */}
        <StepItem>
          <StepNumber>4</StepNumber>
          <StepContent>
            <StepTitle variant="h6">내 파트너 보기</StepTitle>
            <StepDescription>승인된 파트너와 협업하고 상호 성장을 위한 활동을 시작하세요.</StepDescription>
            <PrimaryButton
              href="/my-page/partner-relationship"
              variant="contained"
              color="primary"
              endIcon={<KeyboardArrowRightRounded />}
            >
              내 파트너 보기
            </PrimaryButton>
          </StepContent>
        </StepItem>
      </StepsContainer>
      <CTAButton variant="contained" onClick={() => router.push("/partners")} endIcon={<KeyboardArrowRightRounded />}>
        지금 바로 품앗이 파트너 찾기
      </CTAButton>
    </HowToSectionWrapper>
  );
};

export default HowToSection;

// 스타일 컴포넌트
const HowToSectionWrapper = styled(Box)`
  background-color: ${({ theme }) => `${theme.palette.primary.main}05`};
  border-radius: 24px;
  margin: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled(Typography)`
  font-weight: 700;
  text-align: center;
  color: ${({ theme }) => theme.palette.primary.main};
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
  margin-top: 48px;
  color: ${({ theme }) => theme.palette.text.white};
`;

const PrimaryButton = styled(Button)`
  width: 100%;
  margin-top: 8px;
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.text.white};
`;
