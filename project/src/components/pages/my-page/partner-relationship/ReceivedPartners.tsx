import { getCurrentUserUID } from "@/service/auth";
import { getReceivedPartnerRelationship } from "@/service/partner-relationship";
import { usePartnerRelationshipStore } from "@/store/PartnerRelationshipStore";
import { PartnerRelationshipItemType } from "@/types/partner-relationship";
import { styled, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import Loading from "@/components/common/Loading";
import { Stack } from "@mui/material";
import PartnerRelationshipCard from "./PartnerRelationshipCard";

const ReceivedPartners = () => {
  // 스토어
  const { receivedPartners, setReceivedPartners } = usePartnerRelationshipStore();
  // 로딩
  const [loading, setLoading] = useState(false);

  // 받은 요청 데이터 가져오기
  async function fetchData() {
    setLoading(true);
    const { data: uid } = await getCurrentUserUID();
    const { data, error } = await getReceivedPartnerRelationship(uid as string);

    if (error) {
      enqueueSnackbar("받은 요청 불러오기 실패", { variant: "error" });
      return;
    }

    setReceivedPartners(data as unknown as PartnerRelationshipItemType[]);
    setLoading(false);
  }

  // 마운트
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (receivedPartners.length === 0) {
    return <Typography variant="h6" fontWeight="bold" color="primary.light" align="center">받은 요청이 없습니다.</Typography>;
  }

  return (
    <ReceivedPartnerCardContainer>
      {receivedPartners.map((el) => (
        <PartnerRelationshipCard key={el.id} info={el} type="received" />
      ))}
    </ReceivedPartnerCardContainer>
  );
};

export default ReceivedPartners;

const ReceivedPartnerCardContainer = styled(Stack)`
  row-gap: 24px;
`;
