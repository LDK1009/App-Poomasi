"use client";

import { getAllUserAccountInfo } from "@/service/auth";
import { usePartnerStore } from "@/store";
import { Box, Button, Grid2, styled, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import PartnerCard from "./PartnerCard";
import { mixinContainer } from "@/styles/mixins";
import Loading from "@/components/common/Loading";

const PartnerContainer = () => {
  const [loading, setLoading] = useState(false);

  const { partners, setPartners } = usePartnerStore();

  async function getPartnerInfos() {
    setLoading(true);
    const { data, error } = await getAllUserAccountInfo();

    if (error) {
      enqueueSnackbar("파트너 정보 가져오기 실패", { variant: "error" });
      return;
    }
    if (data) {
      setPartners(data);
    }
    setLoading(false);
  }

  useEffect(() => {
    getPartnerInfos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 로딩 중
  if (loading) {
    return <Loading />;
  }

  // 파트너가 없는 경우
  if (partners.length === 0) {
    return (
      <Container>
        <Typography variant="h6" fontWeight="bold" color="primary.light" align="center" mb={2}>
          아직 파트너가 없습니다.
        </Typography>
        <Button
          href="/auth/sign-in"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ color: "white", fontWeight: "bold", ":hover": { color: "text.white" } }}
        >
          파트너 등록하러 가기
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <PartnerCardContainer container spacing={2}>
        {partners.map((partner) => (
          <PartnerCard key={partner.id} info={partner} />
        ))}
      </PartnerCardContainer>
    </Container>
  );
};

export default PartnerContainer;

const Container = styled(Box)`
  ${mixinContainer}
`;

const PartnerCardContainer = styled(Grid2)``;
