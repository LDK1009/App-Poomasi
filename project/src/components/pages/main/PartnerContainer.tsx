import { getAllUserAccountInfo } from "@/service/auth";
import { usePartnerStore } from "@/store";
import { Grid2, styled } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import PartnerCard from "./PartnerCard";

const PartnerContainer = () => {
  const { partners, setPartners } = usePartnerStore();

  async function getPartnerInfos() {
    const { data, error } = await getAllUserAccountInfo();

    if (error) {
      enqueueSnackbar("파트너 정보 가져오기 실패", { variant: "error" });
      return;
    }
    if (data) {
      setPartners(data);
    }
  }

  useEffect(() => {
    getPartnerInfos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container container spacing={2}>
      {partners.map((partner) => (
        <PartnerCard key={partner.id} info={partner} />
      ))}
    </Container>
  );
};

export default PartnerContainer;

const Container = styled(Grid2)``;
