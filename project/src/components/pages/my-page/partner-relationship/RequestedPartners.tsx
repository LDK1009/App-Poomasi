import { getCurrentUserUID } from "@/service/auth";
import { getSentPartnerRelationship } from "@/service/partner-relationship";
import { usePartnerRelationshipStore } from "@/store/PartnerRelationshipStore";
import { PartnerRelationshipItemType } from "@/types/partner-relationship";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";

const RequestedPartners = () => {
  const { requestedPartners, setRequestedPartners } = usePartnerRelationshipStore();

  // 보낸 요청 데이터 가져오기
  async function fetchData() {
    const { data: uid } = await getCurrentUserUID();
    const { data, error } = await getSentPartnerRelationship(uid as string);

    if (error) {
      enqueueSnackbar("보낸 요청 불러오기 실패", { variant: "error" });
      return;
    }

    setRequestedPartners(data as unknown as PartnerRelationshipItemType[]);
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>보낸 요청</h1>
      {requestedPartners.map((partner) => (
        <div key={partner.id}>
          <h6>요청자 정보</h6>
          <div>id: {partner.requester_info.id}</div>
          <div>email: {partner.requester_info.email}</div>
          <div>app_name: {partner.requester_info.app_name}</div>
          <div>google_form_link: {partner.requester_info.google_form_link}</div>
          <div>android_app_link: {partner.requester_info.android_app_link}</div>
          <div>web_participation_link: {partner.requester_info.web_participation_link}</div>
          <br />
          <h6>승인자 정보</h6>
          <div>id: {partner.approver_info.id}</div>
          <div>email: {partner.approver_info.email}</div>
          <div>app_name: {partner.approver_info.app_name}</div>
          <div>google_form_link: {partner.approver_info.google_form_link}</div>
          <div>android_app_link: {partner.approver_info.android_app_link}</div>
          <div>web_participation_link: {partner.approver_info.web_participation_link}</div>
        </div>
      ))}
    </div>
  );
};

export default RequestedPartners;
