"use client";
import { styled } from "@mui/material";
import { Button, Stack, Typography } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();

  return (
    <HeroSectionWrapper>
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
    </HeroSectionWrapper>
  );
};

export default HeroSection;

// 스타일 컴포넌트
const HeroSectionWrapper = styled(Stack)`
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