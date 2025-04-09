import { postPartnerRelationship } from "@/service/partner-relationship";
import { useAuthStore } from "@/store";
import { UserInformationType } from "@/types/user";
import { Button, Grid2, styled, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";

const PartnerCard = ({ info }: { info: UserInformationType }) => {
  const { user } = useAuthStore();

  // 파트너 추가 함수
  async function handleAddPartner() {
    const { error } = await postPartnerRelationship({
      requester_id: user.uid,
      approver_id: info.id,
      status: "requested",
    });

    if (error) {
      enqueueSnackbar("파트너 추가 실패", { variant: "error" });
      return;
    }

    enqueueSnackbar("파트너 추가 성공", { variant: "success" });
  }

  return (
    <Container size={6}>
      <Typography variant="h6" align="center" sx={{ width: "100%" }}>
        {info.app_name}
      </Typography>
      <Button onClick={handleAddPartner} variant="contained" color="primary" fullWidth sx={{ color: "white" }}>
        파트너 추가
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
