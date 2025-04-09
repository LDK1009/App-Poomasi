import { UserInformationType } from "./user";

// 파트너 관계 아이템 타입
export type PartnerRelationshipItemType = PartnerRelationshipTableType & {
  requester_info: UserInformationType;
  approver_info: UserInformationType;
};

// 파트너 관계 테이블 타입
export type PartnerRelationshipTableType = {
  id?: string;
  requester_id: string;
  approver_id: string;
  status: "requested" | "approved" | "rejected";
  created_at?: string;
};
