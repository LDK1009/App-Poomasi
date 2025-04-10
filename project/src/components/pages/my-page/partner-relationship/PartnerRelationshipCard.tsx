import { Button, Stack, styled, Typography } from "@mui/material";
import { formatDate } from "@/utils/time";
import { ForwardToInboxRounded, WorkspacesRounded } from "@mui/icons-material";
import { PartnerRelationshipItemType } from "@/types/partner-relationship";
import { deletePartnerRelationship, updatePartnerRelationship } from "@/service/partner-relationship";
import { enqueueSnackbar } from "notistack";
import { usePartnerRelationshipStore } from "@/store/PartnerRelationshipStore";
// 하위 컴포넌트

type PropsType = {
  info: PartnerRelationshipItemType;
  type: "requested" | "received";
};

const PartnerRelationshipCard = ({ info, type }: PropsType) => {
  const { deleteRequestedPartner, deleteReceivedPartner } = usePartnerRelationshipStore();

  async function handleCancelButtonClick() {
    const { error } = await deletePartnerRelationship(info.requester_id, info.approver_id);
    if (error) {
      enqueueSnackbar("요청 취소 실패", { variant: "error" });
      return;
    }

    deleteRequestedPartner(info.id as number);
    enqueueSnackbar("요청 취소 성공", { variant: "success" });
  }

  async function handleRejectButtonClick() {
    const { error } = await updatePartnerRelationship("rejected", info.requester_id, info.approver_id);
    if (error) {
      enqueueSnackbar("요청 거절 실패", { variant: "error" });
      return;
    }

    deleteReceivedPartner(info.id as number);
    enqueueSnackbar("요청 거절 성공", { variant: "success" });
  }

  async function handleApproveButtonClick() {
    const { error } = await updatePartnerRelationship("approved", info.requester_id, info.approver_id);
    if (error) {
      enqueueSnackbar("요청 수락 실패", { variant: "error" });
      return;
    }

    deleteReceivedPartner(info.id as number);
    enqueueSnackbar("요청 수락 성공", { variant: "success" });
  }

  return (
    <CardContainer>
      {/* 헤더 */}
      <CardHeader status={info.status}>
        <Stack direction="row" alignItems="center" columnGap={0.5}>
          <WorkspacesRounded sx={{ fontSize: 14, color: "white" }} />
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
            발신자
          </RoleText>
          <AppNameText variant="body2" align="left">
            {info.requester_info.app_name}
          </AppNameText>
        </PersonWrapper>
        <ForwardToInboxRounded color="primary" />
        <PersonWrapper>
          <RoleText variant="caption" align="right">
            수신자
          </RoleText>
          <AppNameText variant="body2" align="right">
            {info.approver_info.app_name}
          </AppNameText>
        </PersonWrapper>
      </CardContent>

      {/* 푸터 */}
      <CardFooter>
        {type === "requested" && (
          <CancelButton onClick={handleCancelButtonClick} variant="outlined" color="primary" fullWidth>
            요청 취소
          </CancelButton>
        )}
        {type === "received" && (
          <>
            <RejectButton onClick={handleRejectButtonClick} variant="outlined" color="primary" fullWidth>
              거절
            </RejectButton>
            <ApproveButton onClick={handleApproveButtonClick} variant="contained" color="primary" fullWidth>
              수락
            </ApproveButton>
          </>
        )}
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
  padding: 4px 8px;
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

const RejectButton = styled(CancelButton)`
  border-bottom-right-radius: 0pz;
`;

const ApproveButton = styled(RejectButton)`
  border-bottom-left-radius: 0px;
  box-shadow: none;
  color: ${({ theme }) => theme.palette.text.white};
`;
