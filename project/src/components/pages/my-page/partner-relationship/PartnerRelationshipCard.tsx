import { Button, Stack, styled, Typography } from "@mui/material";
import Image from "next/image";
import { formatDate } from "@/utils/time";
import { ForwardToInboxRounded } from "@mui/icons-material";
import { PartnerRelationshipItemType } from "@/types/partner-relationship";
// 하위 컴포넌트

type PropsType = {
  info: PartnerRelationshipItemType;
  type: "requested" | "received";
};

const PartnerRelationshipCard = ({ info, type }: PropsType) => {
  async function handleButtonClick(type: "requested" | "received") {
    if (type === "requested") {
      alert("개발중인 기능입니다.");
    }

    if (type === "received") {
      alert("개발중인 기능입니다.");
    }
  }

  return (
    <CardContainer>
      {/* 헤더 */}
      <CardHeader status={info.status}>
        <Stack direction="row" alignItems="center" columnGap={0.5}>
          <Image src={"/img/logo-192.png"} alt="app_icon" width={24} height={24} />
          <CreatedTimeText variant="caption">{formatDate(info.created_at as string)}</CreatedTimeText>
        </Stack>
        <StatusText variant="body2" fontWeight={"600"}>
          {info.status === "requested" && "요청"}
          {info.status === "approved" && "승인"}
          {info.status === "rejected" && "거절"}
        </StatusText>
      </CardHeader>

      {/* 컨텐츠 */}
      <CardContent>
        <PersonWrapper>
          <RoleText variant="caption" align="left">
            요청 발신
          </RoleText>
          <AppNameText variant="body2" align="left">
            {info.requester_info.app_name}
          </AppNameText>
        </PersonWrapper>
        <ForwardToInboxRounded color="primary" />
        <PersonWrapper>
          <RoleText variant="caption" align="right">
            요청 수신
          </RoleText>
          <AppNameText variant="body2" align="right">
            {info.approver_info.app_name}
          </AppNameText>
        </PersonWrapper>
      </CardContent>

      {/* 푸터 */}
      <CardFooter>
        <CancelButton onClick={() => handleButtonClick(type)} variant="outlined" color="primary" fullWidth>
          {type === "requested" && "요청 취소"}
          {type === "received" && "승인"}
        </CancelButton>
      </CardFooter>
    </CardContainer>
  );
};

export default PartnerRelationshipCard;

////////// 컨테이너
const CardContainer = styled(Stack)`
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  border-radius: 8px;
`;

type CardHeaderProps = {
  status: "requested" | "approved" | "rejected";
};

const CardHeader = styled(Stack)<CardHeaderProps>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ status, theme }) =>
    (status === "requested" && theme.palette.primary.main) ||
    (status === "approved" && theme.palette.info.main) ||
    (status === "rejected" && theme.palette.error.main)};
  padding: 0px 8px;
  border-radius: 8px 8px 0 0;
`;

const CreatedTimeText = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.white};
`;

////////// 컨텐츠
const CardContent = styled(Stack)`
  flex-direction: row;
  padding: 16px;
  justify-content: space-between;
  align-items: center;
`;

const PersonWrapper = styled(Stack)``;

const StatusText = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.white};
`;

const RoleText = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.secondary};
`;

const AppNameText = styled(Typography)``;

////////// 푸터
const CardFooter = styled(Stack)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CancelButton = styled(Button)`
  border-radius: 0px 0px 8px 8px;
  border-top: 1px solid ${({ theme }) => theme.palette.primary.main};
  border-right: none;
  border-bottom: none;
  border-left: none;
`;
