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

  //   const TestData = [
  //     {
  //       id: "1",
  //       email: "test1@example.com",
  //       app_name: "테스트 앱",
  //       google_form_link: "https://forms.gle/1234567890",
  //       android_app_link: "https://play.google.com/store/apps/details?id=com.example.app",
  //       web_participation_link: "https://example.com/participation",
  //     },
  //     {
  //       id: "2",
  //       email: "test2@example.com",
  //       app_name: "테스트 앱2",
  //       google_form_link: "https://forms.gle/1234567890",
  //       android_app_link: "https://play.google.com/store/apps/details?id=com.example.app",
  //       web_participation_link: "https://example.com/participation",
  //     },
  //     {
  //       id: "3",
  //       email: "test3@example.com",
  //       app_name: "테스트 앱3",
  //       google_form_link: "https://forms.gle/1234567890",
  //       android_app_link: "https://play.google.com/store/apps/details?id=com.example.app",
  //       web_participation_link: "https://example.com/participation",
  //     },
  //   ];

  return (
    <Container container spacing={2}>
      {partners.map((partner) => (
        <PartnerCard key={partner.id} info={partner} />
        // <PartnerCard key={partner.app_name} info={partner} />
      ))}
    </Container>
  );
};

export default PartnerContainer;

const Container = styled(Grid2)``;
