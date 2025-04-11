import { getCurrentUserUID } from "@/service/auth";
import { getMyPartners } from "@/service/partner-relationship";
import { usePartnerRelationshipStore } from "@/store/PartnerRelationshipStore";
import { PartnerRelationshipItemType } from "@/types/partner-relationship";
import { 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Button, 
  Stack, 
  Typography, 
  styled 
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import Loading from "@/components/common/Loading";
import MyPartnerCard from "./MyPartnerCard";
import { KeyboardArrowRightRounded, ExpandMore } from "@mui/icons-material";

const MyPartners = () => {
  // 스토어
  const { myPartners, setMyPartners } = usePartnerRelationshipStore();
  // 로딩
  const [loading, setLoading] = useState(false);

  // 데이터 가져오기
  async function fetchData() {
    setLoading(true);
    const { data: requesterId, error: requesterIdError } = await getCurrentUserUID();
    if (requesterIdError) {
      enqueueSnackbar("현재 사용자 정보를 불러오는데 실패했습니다.", { variant: "error" });
      return;
    }

    const { data, error } = await getMyPartners(requesterId as string);
    if (error) {
      enqueueSnackbar("내 파트너 정보를 불러오는데 실패했습니다.", { variant: "error" });
      return;
    }

    setMyPartners(data as unknown as PartnerRelationshipItemType[]);
    setLoading(false);
  }

  // 데이터 가져오기
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 로딩
  if (loading) {
    return <Loading />;
  }

  // 데이터가 없을 경우
  if (myPartners.length === 0) {
    return (
      <Typography variant="h6" fontWeight="bold" color="primary.light" align="center">
        파트너 관계가 없습니다.
      </Typography>
    );
  }

  // 데이터 렌더링
  return (
    <PartnerCardContainer>
      <QaSection />
      <GuideSection />
      {myPartners.map((partner) => (
        <MyPartnerCard key={partner.id} partner={partner} />
      ))}
    </PartnerCardContainer>
  );
};

export default MyPartners;

/////////// 하위 컴포넌트 ///////////
const GuideSection = () => {
  return (
      <StyledAccordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography fontWeight="bold" color="info.main">사용 방법</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            <GuideItem>
              <GuideNumber>1</GuideNumber>
              <GuideContent>
                <Typography fontWeight="bold">파트너 이메일을 테스터에 등록합니다</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                  <Link href="https://play.google.com/console/u/0/developers" target="_blank">구글 플레이 콘솔 링크</Link><br />
                  구글 플레이 콘솔 &gt; 테스트 &gt; 비공개 테스트 &gt; 트랙 관리 &gt; 테스터
                </Typography>
              </GuideContent>
            </GuideItem>
            
            <GuideItem>
              <GuideNumber>2</GuideNumber>
              <GuideContent>
                <Typography fontWeight="bold">파트너 앱을 설치합니다.</Typography>
              </GuideContent>
            </GuideItem>
            
            <GuideItem>
              <GuideNumber>3</GuideNumber>
              <GuideContent>
                <Typography fontWeight="bold">앱이 설치된 화면을 캡쳐 후 인증 섹션을 열어 업로드합니다.</Typography>
              </GuideContent>
            </GuideItem>
          </Stack>
        </AccordionDetails>
      </StyledAccordion>
  );
};


const QaSection = () => {
  return (
    <Stack spacing={1}>
      <QAText variant="h6">문제가 생기셨나요?</QAText>
      <CallButton
        variant="contained"
        fullWidth
        onClick={() => {
          window.open("https://open.kakao.com/o/g4rQtxqh", "_blank");
        }}
        endIcon={<KeyboardArrowRightRounded />}
      >
        파트너에게 연락하기
      </CallButton>
    </Stack>
  );
};



/////////// 스타일 컴포넌트 ///////////
const PartnerCardContainer = styled(Stack)`
  row-gap: 24px;
`;

/////  QA 스타일 //////
const QAText = styled(Typography)`
  font-weight: bold;
  color: ${({ theme }) => theme.palette.info.main};
  text-align: center;
`;

const CallButton = styled(Button)`
  color: white;
  padding: 8px 0px;
  background-color: ${({ theme }) => theme.palette.info.main};
  font-weight: bold;
`;


///// 사용 방법 스타일 //////

const StyledAccordion = styled(Accordion)`
  border: 1px solid ${({ theme }) => theme.palette.info.light};
  box-shadow: none;
  border-radius: 8px;
  
  & svg{
    color: ${({ theme }) => theme.palette.info.main};
  }  

  &:before {
    display: none;
  }
`;

const GuideItem = styled(Stack)`
  flex-direction: row;
  align-items: flex-start;
  gap: 12px;
`;

const GuideNumber = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.info.main};
  color: white;
  font-weight: bold;
  font-size: 14px;
`;

const GuideContent = styled('div')`
  flex: 1;
`;

const Link = styled('a')`
  color: ${({ theme }) => theme.palette.info.main};
  text-decoration: underline;
  cursor: pointer;
`;
