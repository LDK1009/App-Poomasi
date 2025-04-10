"use client";

import { Box, styled } from "@mui/material";
import { mixinContainer } from "@/styles/mixins";
import MenuTab from "./MenuTab";
import { useEffect } from "react";
import { getCurrentUserIsSignIn } from "@/service/auth";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";

const PartnerRelationshipContainer = () => {
  const router = useRouter();

  async function checkSignIn() {
    const isSignIn = await getCurrentUserIsSignIn();
    if (isSignIn === false) {
      enqueueSnackbar("로그인 후 이용해주세요.", { variant: "warning" });
      router.push("/auth/sign-in");
      return;
    }
  }

  useEffect(() => {
    checkSignIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <MenuTab />
    </Container>
  );
};

export default PartnerRelationshipContainer;

const Container = styled(Box)`
  ${mixinContainer}
`;
