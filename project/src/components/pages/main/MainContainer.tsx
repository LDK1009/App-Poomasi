"use client";

import { mixinContainer, mixinFlex } from "@/styles/mixins";
import { styled, Typography, Paper, Box, Divider } from "@mui/material";
import { GitHub, Code } from "@mui/icons-material";

//////////////////////////////////////// Component ////////////////////////////////////////

/**
 * 메인 페이지 컨테이너 컴포넌트
 * 프로젝트 소개 및 README 내용을 표시
 */
const MainContainer = () => {
  //////////////////////////////////////// Render ////////////////////////////////////////

  return (
    <Container>
      <ContentWrapper>
        <Header>
          <Title variant="h4">Next.js 프로젝트 템플릿</Title>
          <Subtitle variant="subtitle1">Next.js, TypeScript, MUI를 활용한 웹 애플리케이션 템플릿</Subtitle>

          <ButtonGroup>
            <LinkButton href="https://github.com/LDK1009" target="_blank">
              <GitHub sx={{ mr: 1 }} />
              GitHub
            </LinkButton>
            <LinkButton href="hhttps://github.com/LDK1009/Next_Start_Template" target="_blank" color="secondary">
              <Code sx={{ mr: 1 }} />
              문서
            </LinkButton>
          </ButtonGroup>
        </Header>

        <Divider sx={{ my: 3 }} />

        <Section>
          <SectionTitle variant="h5">프로젝트 소개</SectionTitle>
          <Paragraph>
            이 프로젝트는 Next.js, TypeScript, Material-UI를 기반으로 한 웹 애플리케이션 템플릿입니다. 사용자 인증,
            라우팅, 상태 관리 등의 기본 기능이 구현되어 있어 빠르게 프로젝트를 시작할 수 있습니다.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle variant="h5">주요 기능</SectionTitle>
          <FeatureList>
            <Feature>
              <FeatureTitle variant="h6">🔐 사용자 인증</FeatureTitle>
              <Paragraph>
                이메일/비밀번호 로그인, 소셜 로그인, 회원가입, 비밀번호 재설정 등의 인증 기능을 제공합니다.
              </Paragraph>
            </Feature>

            <Feature>
              <FeatureTitle variant="h6">📱 반응형 디자인</FeatureTitle>
              <Paragraph>모바일, 태블릿, 데스크톱 등 다양한 디바이스에 최적화된 UI를 제공합니다.</Paragraph>
            </Feature>

            <Feature>
              <FeatureTitle variant="h6">🎨 테마 커스터마이징</FeatureTitle>
              <Paragraph>Material-UI 테마를 활용하여 손쉽게 디자인을 커스터마이징할 수 있습니다.</Paragraph>
            </Feature>

            <Feature>
              <FeatureTitle variant="h6">📊 상태 관리</FeatureTitle>
              <Paragraph>Zustand를 활용한 효율적인 상태 관리 시스템이 구현되어 있습니다.</Paragraph>
            </Feature>
          </FeatureList>
        </Section>

        <Section>
          <SectionTitle variant="h5">시작하기</SectionTitle>
          <CodeBlock>
            <pre>
              {`# 저장소 클론
git clone https://github.com/LDK1009/Next_Start_Template.git

# 디렉토리 이동
cd Next_Start_Template

# 의존성 설치
npm install

# Supabase 세팅(필수)
[Supabase 세팅 방법](https://sooncoding.tistory.com/265)

# 개발 서버 실행
npm run dev

# 브라우저 접속
http://localhost:3000

`}
            </pre>
          </CodeBlock>
        </Section>

        <Section>
          <SectionTitle variant="h5">기술 스택</SectionTitle>
          <TechList>
            <TechItem>Next.js</TechItem>
            <TechItem>TypeScript</TechItem>
            <TechItem>Material-UI</TechItem>
            <TechItem>Zustand</TechItem>
            <TechItem>Emotion</TechItem>
            <TechItem>Supabase</TechItem>
          </TechList>
        </Section>
      </ContentWrapper>
    </Container>
  );
};

export default MainContainer;

//////////////////////////////////////// Styles ////////////////////////////////////////

// 메인 컨테이너 스타일
const Container = styled(Box)`
  ${mixinContainer()};
  ${mixinFlex("column")};
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
`;

// 컨텐츠 래퍼 스타일
const ContentWrapper = styled(Paper)`
  max-width: 800px;
  width: 100%;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

// 헤더 스타일
const Header = styled("div")`
  ${mixinFlex("column")};
  align-items: center;
  text-align: center;
  margin-bottom: 24px;
`;

// 제목 스타일
const Title = styled(Typography)`
  font-weight: 700;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.palette.primary.main};
`;

// 부제목 스타일
const Subtitle = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.secondary};
  margin-bottom: 24px;
`;

// 버튼 그룹 스타일
const ButtonGroup = styled("div")`
  ${mixinFlex("row")};
  gap: 16px;
  margin-top: 16px;
`;

// 링크 버튼 스타일
const LinkButton = styled("a")`
  ${mixinFlex("row")};
  align-items: center;
  padding: 8px 16px;
  border-radius: 4px;
  background-color: ${({ theme, color }) =>
    color === "secondary" ? theme.palette.secondary.main : theme.palette.primary.main};
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme, color }) =>
      color === "secondary" ? theme.palette.secondary.dark : theme.palette.primary.dark};
    color: white;
  }
`;

// 섹션 스타일
const Section = styled("section")`
  margin-bottom: 32px;
`;

// 섹션 제목 스타일
const SectionTitle = styled(Typography)`
  font-weight: 600;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.palette.text.primary};
`;

// 문단 스타일
const Paragraph = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.secondary};
  line-height: 1.6;
  margin-bottom: 16px;
`;

// 기능 목록 스타일
const FeatureList = styled("div")`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 16px;
`;

// 기능 항목 스타일
const Feature = styled(Paper)`
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

// 기능 제목 스타일
const FeatureTitle = styled(Typography)`
  font-weight: 600;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.palette.primary.main};
`;

// 코드 블록 스타일
const CodeBlock = styled("div")`
  background-color: ${({ theme }) => (theme.palette.mode === "dark" ? "#2d2d2d" : "#f5f5f5")};
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;

  pre {
    margin: 0;
    font-family: "Consolas", "Monaco", "Andale Mono", monospace;
    font-size: 14px;
    line-height: 1.5;
    color: ${({ theme }) => (theme.palette.mode === "dark" ? "#e0e0e0" : "#333")};
  }
`;

// 기술 스택 목록 스타일
const TechList = styled("ul")`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

// 기술 스택 항목 스타일
const TechItem = styled("li")`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.contrastText};
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
`;
