import { UserInformationType } from "@/types/user";
import { Button, Grid2, styled, Typography } from "@mui/material";

const PartnerCard = ({ info }: { info: UserInformationType }) => {
  return (
    <Container size={6}>
      <Typography variant="h6" align="center" sx={{ width: "100%" }}>
        {info.app_name}
      </Typography>
      <Button variant="contained" color="primary" fullWidth sx={{ color: "white" }}>
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
