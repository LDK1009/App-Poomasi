import { supabase } from "@/lib/supabaseClient";
import { PartnerRelationshipTableType } from "@/types/partner-relationship";

// 파트너 관계 생성
export async function postPartnerRelationship(partnerRelationship: PartnerRelationshipTableType) {
  const response = await supabase.from("partner_relationship").insert(partnerRelationship);

  return response;
}

// 보낸 요청 조회
export async function getSentPartnerRelationship(requesterId: string) {
  const response = await supabase
    .from("partner_relationship")
    .select(
      `
      *,
      requester_info:users!partner-relationship_approver_id_fkey(*),
      approver_info:users!partner-relationship_requester_id_fkey(*)
      `
    )
    .eq("requester_id", requesterId);

  return response;
}

// 받은 요청 조회
export async function getReceivedPartnerRelationship(approverId: string) {
  const response = await supabase.from("partner_relationship").select(`*`).eq("approver_id", approverId);

  return response;
}
