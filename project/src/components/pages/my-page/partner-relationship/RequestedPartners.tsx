import { getCurrentUserUID } from "@/service/auth";
import { getSentPartnerRelationship } from "@/service/partner-relationship";
import { usePartnerRelationshipStore } from "@/store/PartnerRelationshipStore";
import { PartnerRelationshipItemType } from "@/types/partner-relationship";
import { styled } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import Loading from "@/components/common/Loading";
import { Stack } from "@mui/material";
import PartnerRelationshipCard from "./PartnerRelationshipCard";

const RequestedPartners = () => {
  // 스토어
  const { requestedPartners, setRequestedPartners } = usePartnerRelationshipStore();
  // 로딩
  const [loading, setLoading] = useState(false);

  // 보낸 요청 데이터 가져오기
  async function fetchData() {
    setLoading(true);
    const { data: uid } = await getCurrentUserUID();
    const { data, error } = await getSentPartnerRelationship(uid as string);

    if (error) {
      enqueueSnackbar("보낸 요청 불러오기 실패", { variant: "error" });
      return;
    }

    setRequestedPartners(data as unknown as PartnerRelationshipItemType[]);
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

  return (
    <RequestedPartnerCardContainer>
      {requestedPartners.map((el) => (
        <PartnerRelationshipCard key={el.id} info={el} type="requested" />
      ))}
    </RequestedPartnerCardContainer>
  );
};

export default RequestedPartners;

const RequestedPartnerCardContainer = styled(Stack)`
  row-gap: 24px;
`;
