import { getCurrentUserUID } from "@/service/auth";
import { getMyPartners } from "@/service/partner-relationship";
import { usePartnerRelationshipStore } from "@/store/PartnerRelationshipStore";
import { PartnerRelationshipItemType } from "@/types/partner-relationship";
import { Stack, Typography, styled } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import Loading from "@/components/common/Loading";
import MyPartnerCard from "./MyPartnerCard";

const MyPartners = () => {
  // 스토어
  const { myPartners, setMyPartners } = usePartnerRelationshipStore();
  // 로딩
  const [loading, setLoading] = useState(false);

  // 데이터 가져오기
  async function fetchData() {
    setLoading(true);
    const { data: requesterId, error: requesterIdError } = await getCurrentUserUID();
    if (requesterIdError) {
      enqueueSnackbar("현재 사용자 정보를 불러오는데 실패했습니다.", { variant: "error" });
      return;
    }

    const { data, error } = await getMyPartners(requesterId as string);
    if (error) {
      enqueueSnackbar("내 파트너 정보를 불러오는데 실패했습니다.", { variant: "error" });
      return;
    }
    
    setMyPartners(data as unknown as PartnerRelationshipItemType[]);
    setLoading(false);
  }

  // 데이터 가져오기
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 로딩
  if (loading) {
    return <Loading />;
  }

  // 데이터가 없을 경우
  if (myPartners.length === 0) {
    return (
      <Typography variant="h6" fontWeight="bold" color="primary.light" align="center">
        파트너 관계가 없습니다.
      </Typography>
    );
  }

  // 데이터 렌더링
  return (
    <PartnerCardContainer>
      {myPartners.map((partner) => (
        <MyPartnerCard key={partner.id} partner={partner} />
      ))}
    </PartnerCardContainer>
  );
};

export default MyPartners;

// 스타일 컴포넌트
const PartnerCardContainer = styled(Stack)`
  row-gap: 24px;
`;
