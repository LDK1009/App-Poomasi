import { PartnerRelationshipItemType } from "@/types/partner-relationship";
import {
  Stack,
  Typography,
  styled,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
  IconButton,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useAuthStore } from "@/store";
import { HandshakeRounded } from "@mui/icons-material";

// 복사 함수
const copyToClipboard = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      enqueueSnackbar("클립보드에 복사되었습니다.", { variant: "success" });
    })
    .catch(() => {
      enqueueSnackbar("복사에 실패했습니다.", { variant: "error" });
    });
};

/////////// 하위 컴포넌트 ///////////
// 복사 가능한 정보 컴포넌트
const CopyableInfo = ({ label, value }: { label: string; value: string }) => {
  return (
    <InfoItem>
      <InfoLabel>{label}</InfoLabel>
      <InfoValueWithCopy>
        <InfoValue>{value}</InfoValue>
        <Tooltip title="복사하기">
          <CopyButton onClick={() => copyToClipboard(value)}>
            <ContentCopyIcon fontSize="small" />
          </CopyButton>
        </Tooltip>
      </InfoValueWithCopy>
    </InfoItem>
  );
};

// 복사 가능한 링크 컴포넌트
const CopyableLink = ({ label, value }: { label: string; value: string }) => {
  return (
    <InfoItem>
      <InfoLabel>{label}</InfoLabel>
      <InfoValueWithCopy>
        <LinkValue href={value} target="_blank" rel="noopener noreferrer">
          {value}
        </LinkValue>
        <Tooltip title="복사하기">
          <CopyButton onClick={() => copyToClipboard(value)}>
            <ContentCopyIcon fontSize="small" />
          </CopyButton>
        </Tooltip>
      </InfoValueWithCopy>
    </InfoItem>
  );
};

/////////// 상위 컴포넌트 ///////////
// 파트너 카드 컴포넌트
const MyPartnerCard = ({ partner }: { partner: PartnerRelationshipItemType }) => {
  const { user } = useAuthStore();
  const userId = user?.uid;

  const partnerInfo = partner.requester_info.id === userId ? partner.approver_info : partner.requester_info;

  return (
    <CardContainer>
      <CardHeader>
        <HeaderText variant="body1">
          {partnerInfo.app_name}
        </HeaderText>
        <PartnerBadge>
          <HandshakeRounded fontSize="small" sx={{ color: "white" }} />
        </PartnerBadge>
      </CardHeader>

      <CardContent>
        <StyledAccordion>
          <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
            <SectionTitle>파트너 정보</SectionTitle>
          </StyledAccordionSummary>
          <AccordionDetails>
            <InfoGroupBox>
              <InfoGrid>
                <CopyableInfo label="앱 이름" value={partnerInfo.app_name} />
                <CopyableInfo label="이메일" value={partnerInfo.email} />
              </InfoGrid>
            </InfoGroupBox>
          </AccordionDetails>
        </StyledAccordion>

        <StyledAccordion>
          <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
            <SectionTitle>링크 정보</SectionTitle>
          </StyledAccordionSummary>
          <AccordionDetails>
            <InfoGroupBox>
              <InfoGrid>
                <CopyableLink label="안드로이드 앱 링크" value={partnerInfo.android_app_link} />
                <CopyableLink label="구글 폼 링크" value={partnerInfo.google_form_link} />
                <CopyableLink label="웹 참여 링크" value={partnerInfo.web_participation_link} />
              </InfoGrid>
            </InfoGroupBox>
          </AccordionDetails>
        </StyledAccordion>
      </CardContent>
    </CardContainer>
  );
};

export default MyPartnerCard;

// 스타일 컴포넌트
const CardContainer = styled(Stack)`
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const CardHeader = styled(Stack)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  column-gap: 16px;
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.palette.primary.main};
`;

const HeaderText = styled(Typography)`
  font-weight: bold;
  color: ${({ theme }) => theme.palette.text.white};
  display: -webkit-box;
  -webkit-line-clamp: 1; 
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

const PartnerBadge = styled(Stack)`
  flex-direction: row;
  align-items: center;
  column-gap: 4px;
  background-color: rgba(255, 255, 255, 0.2);
  color: ${({ theme }) => theme.palette.text.white};
  padding: 6px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardContent = styled(Stack)`
  padding: 16px;
  row-gap: 16px;
`;

const StyledAccordion = styled(Accordion)`
  box-shadow: none;
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  border-radius: 8px !important;

  &:before {
    display: none;
  }

  &.Mui-expanded {
    margin: 0;
  }
`;

const StyledAccordionSummary = styled(AccordionSummary)`
  padding: 0 16px;
  min-height: 48px;

  & .MuiSvgIcon-root {
    color: ${({ theme }) => theme.palette.primary.main};
  }

  &.Mui-expanded {
    min-height: 48px;
  }

  & .MuiAccordionSummary-content {
    margin: 12px 0;

    &.Mui-expanded {
      margin: 12px 0;
    }
  }
`;

const SectionTitle = styled(Typography)`
  font-weight: bold;
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: 16px;
`;

const InfoGrid = styled(Stack)`
  row-gap: 16px;
`;

const InfoItem = styled(Stack)`
  row-gap: 4px;
`;

const InfoLabel = styled(Typography)`
  font-weight: bold;
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: 14px;
`;

const InfoValue = styled(Typography)`
  font-size: 16px;
  word-break: break-all;
`;

const LinkValue = styled("a")`
  font-size: 16px;
  color: ${({ theme }) => theme.palette.primary.main};
  text-decoration: none;
  word-break: break-all;

  &:hover {
    text-decoration: underline;
  }
`;

const InfoGroupBox = styled(Stack)`
  padding: 8px;
  background-color: ${({ theme }) => theme.palette.background.paper};
`;

// 추가 스타일 컴포넌트
const InfoValueWithCopy = styled(Stack)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CopyButton = styled(IconButton)`
  padding: 4px;
  color: ${({ theme }) => theme.palette.text.secondary};

  &:hover {
    color: ${({ theme }) => theme.palette.primary.main};
    background-color: rgba(0, 0, 0, 0.04);
  }
`;
