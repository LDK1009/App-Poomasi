import { getCurrentUserIsSignIn } from "@/service/auth";
import { getIsAlreadyPartnerRelationship, postPartnerRelationship } from "@/service/partner-relationship";
import { useAuthStore } from "@/store";
import { UserInformationType } from "@/types/user";
import { Button, Grid2, styled, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";

const PartnerCard = ({ info }: { info: UserInformationType }) => {
  const { user } = useAuthStore();
  const router = useRouter();
  // 파트너 신청 함수
  async function handleAddPartner() {
    const isSignIn = await getCurrentUserIsSignIn();
    if (isSignIn === false) {
      enqueueSnackbar("로그인 후 이용해주세요.", { variant: "warning" });
      router.push("/auth/sign-in");
      return;
    }

    const { data: isAlreadyPartnerRelationship, error: isAlreadyPartnerRelationshipError } =
      await getIsAlreadyPartnerRelationship(user.uid, info.id);

    if (isAlreadyPartnerRelationshipError) {
      enqueueSnackbar("파트너 신청 실패", { variant: "error" });
      return;
    }

    if (isAlreadyPartnerRelationship === true) {
      enqueueSnackbar("이미 추가된 파트너입니다.", { variant: "warning" });
      return;
    }

    const { error } = await postPartnerRelationship({
      requester_id: user.uid,
      approver_id: info.id,
      status: "requested",
    });

    if (error) {
      enqueueSnackbar("파트너 신청 실패", { variant: "error" });
      return;
    }

    enqueueSnackbar("파트너 신청 성공", { variant: "success" });
  }

  return (
    <Container size={6}>
      <Typography variant="h6" align="center" sx={{ width: "100%" }}>
        {info.app_name}
      </Typography>
      <Button onClick={handleAddPartner} variant="contained" color="primary" fullWidth sx={{ color: "white" }}>
        파트너 신청
      </Button>
    </Container>
  );
};

export default PartnerCard;

const Container = styled(Grid2)`
  align-items: center;
  display: flex;
  flex-direction: column;
  align-items: start;
  row-gap: 8px;
  border: 1px solid ${({ theme }) => theme.palette.primary.dark};
  border-radius: 8px;
  padding: 16px;
`;
