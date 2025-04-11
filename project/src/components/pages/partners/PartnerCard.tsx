import { getCurrentUserIsSignIn, getCurrentUserUID } from "@/service/auth";
import { getIsAlreadyPartnerRelationship, postPartnerRelationship } from "@/service/partner-relationship";
import { UserInformationType } from "@/types/user";
import { Button, Grid2, Stack, styled, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";

const PartnerCard = ({ info }: { info: UserInformationType }) => {
  const router = useRouter();
  // 파트너 신청 함수
  async function handleAddPartner() {
    const { data: userId } = await getCurrentUserUID();

    const isSignIn = await getCurrentUserIsSignIn();
    if (isSignIn === false) {
      enqueueSnackbar("로그인 후 이용해주세요.", { variant: "warning" });
      router.push("/auth/sign-in");
      return;
    }

    const { data: isAlreadyPartnerRelationship, error: isAlreadyPartnerRelationshipError } =
      await getIsAlreadyPartnerRelationship(userId as string, info.id);

    if (isAlreadyPartnerRelationshipError) {
      enqueueSnackbar("파트너 신청 실패", { variant: "error" });
      return;
    }

    if (isAlreadyPartnerRelationship === true) {
      enqueueSnackbar("이미 추가된 파트너입니다.", { variant: "warning" });
      return;
    }

    const { error } = await postPartnerRelationship({
      requester_id: userId as string,
      approver_id: info.id,
      status: "requested",
    });

    if (error) {
      enqueueSnackbar("파트너 신청 실패", { variant: "error" });
      return;
    }

    enqueueSnackbar("파트너 신청 성공", { variant: "success" });
  }

  // 이메일 복사 함수
  const copyEmailToClipboard = () => {
    if (info.email) {
      navigator.clipboard
        .writeText(info.email)

        .then(() => {
          enqueueSnackbar("이메일이 복사되었습니다.", { variant: "success" });
        })

        .catch(() => {
          enqueueSnackbar("이메일 복사에 실패했습니다.", { variant: "error" });
        });
    }
  };

  return (
    <Grid2 size={6}>
      <Container>
        <InfoWrapper>
          <AppNameText variant="caption">{info.app_name}</AppNameText>
          <EmailText variant="body2">{info.email}</EmailText>
        </InfoWrapper>
        <ButtonWrapper>
          <EmailCopyButton onClick={copyEmailToClipboard} variant="outlined">
            이메일 복사
          </EmailCopyButton>
          <AddPartnerButton onClick={handleAddPartner} variant="contained">
            파트너 신청
          </AddPartnerButton>
        </ButtonWrapper>
      </Container>
    </Grid2>
  );
};

export default PartnerCard;

const Container = styled(Stack)`
  overflow: hidden;
  row-gap: 8px;
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  border-radius: 8px;
`;

const InfoWrapper = styled(Stack)`
  padding: 8px;
  row-gap: 4px;
  text-align: center;
`;

const AppNameText = styled(Typography)`
  // 한줄 이상 넘어가면 ... 표시
  display: -webkit-box;
  -webkit-line-clamp: 1; // 3줄 이상이면 ellipsis 적용
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

const EmailText = styled(AppNameText)``;

const ButtonWrapper = styled(Stack)`
  flex-direction: row;
  column-gap: 4px;
  border-top: 1px solid ${({ theme }) => theme.palette.primary.main};
`;

const EmailCopyButton = styled(Button)`
  height: 32px;
  color: ${({ theme }) => theme.palette.primary.main};
  padding: 0px;
  font-size: 12px;
  flex: 1;
  border: none;
`;
const AddPartnerButton = styled(EmailCopyButton)`
  height: 32px;
  color: ${({ theme }) => theme.palette.text.white};
  padding: 0px;
  border-radius: 0px;
`;
