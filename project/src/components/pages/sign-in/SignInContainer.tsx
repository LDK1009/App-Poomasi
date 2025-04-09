"use client";

import Image from "next/image";
import { styled, Typography, Button } from "@mui/material";
import { CottageOutlined, Google } from "@mui/icons-material";
import { enqueueSnackbar } from "notistack";

import { signIn } from "@/service/auth";
import { mixinFlex, mixinBorderRadius, mixinContainer, mixinFontColor } from "@/styles/mixins";

/**
 * 로그인 페이지 컨테이너 컴포넌트
 * 카카오 로그인 및 홈페이지 이동 기능 제공
 */
const SignInContainer = () => {
  // 카카오 로그인 처리 함수
  const handleSignIn = async () => {
    const { error } = await signIn();

    if (error) {
      enqueueSnackbar("로그인 오류가 발생했습니다", { variant: "error" });
    }
  };

  return (
    <Container>
      <TextWrap>
        <HeadingText variant="h5" fontWeight="bold">
          환영합니다!
        </HeadingText>
        <BodyText variant="body2" align="center">
          카카오 계정으로 간편하게 로그인하고
          <br />
          다양한 서비스를 이용해보세요
        </BodyText>
      </TextWrap>

      <LogoImage src="/img/logo-512.png" alt="로고 이미지" width={200} height={200} priority />

      <ButtonWrap>
        <HomeButton href="/" variant="outlined" startIcon={<CottageOutlined />}>
          홈페이지 바로가기
        </HomeButton>

        <GoogleButton
          onClick={handleSignIn}
          variant="contained"
          startIcon={<Google sx={{ color: "primary.main" }} />}
          fullWidth
        >
          Google 로그인
        </GoogleButton>
      </ButtonWrap>
    </Container>
  );
};

export default SignInContainer;

// 스타일 컴포넌트
const Container = styled("div")`
  ${mixinContainer()};
  ${mixinFlex("column")};
  justify-content: space-evenly;
  height: 100vh;
  padding: 24px;
  max-width: 480px;
`;

const TextWrap = styled("div")`
  ${mixinFlex("column")};
  gap: 16px;
  margin-bottom: 8px;
`;

const HeadingText = styled(Typography)(({ theme }) => ({
  ...mixinFontColor(theme, "black"),
}));

const BodyText = styled(Typography)(({ theme }) => ({
  ...mixinFontColor(theme, "gray"),
}));

const LogoImage = styled(Image)`
  ${mixinBorderRadius("medium")};
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
`;

const ButtonWrap = styled("div")`
  ${mixinFlex("column")};
  gap: 16px;
  width: 100%;
  margin-top: 16px;
`;

const HomeButton = styled(Button)`
  width: 100%;
  height: 48px;
  color: ${({ theme }) => theme.palette.primary.main};
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
`;

const GoogleButton = styled(Button)`
  width: 100%;
  height: 48px;
  color: white;
  box-shadow: 0 4px 4px 0 rgba(76, 175, 80, 0.1);

  & svg {
    color: white;
  }
`;
