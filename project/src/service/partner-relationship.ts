import { supabase } from "@/lib/supabaseClient";
import { PartnerRelationshipTableType } from "@/types/partner-relationship";

// 파트너 요청 생성
export async function postPartnerRelationship(partnerRelationship: PartnerRelationshipTableType) {
  const response = await supabase.from("partner_relationship").insert(partnerRelationship);

  return response;
}

// 파트너 요청 수정
export async function updatePartnerRelationship(
  status: "approved" | "rejected",
  requesterId: string,
  approverId: string
) {
  const response = await supabase
    .from("partner_relationship")
    .update({ status: status })
    .eq("requester_id", requesterId)
    .eq("approver_id", approverId);

  return response;
}

// 파트너 요청 취소(삭제)
export async function deletePartnerRelationship(requesterId: string, approverId: string) {
  const response = await supabase
    .from("partner_relationship")
    .delete()
    .eq("requester_id", requesterId)
    .eq("approver_id", approverId);

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
    .eq("requester_id", requesterId)
    .order("created_at", { ascending: false });

  return response;
}

// 받은 요청 조회
export async function getReceivedPartnerRelationship(approverId: string) {
  const response = await supabase
    .from("partner_relationship")
    .select(
      `
    *,
    requester_info:users!partner-relationship_approver_id_fkey(*),
    approver_info:users!partner-relationship_requester_id_fkey(*)
    `
    )
    .eq("approver_id", approverId)
    .eq("status", "requested")
    .order("created_at", { ascending: false });

  return response;
}

// 이미 파트너 관계가 있는지 확인 (양방향 체크)
export async function getIsAlreadyPartnerRelationship(requesterId: string, approverId: string) {
  const { data, error } = await supabase
    .from("partner_relationship")
    .select(`*`)
    .or(`and(requester_id.eq.${requesterId},approver_id.eq.${approverId}),and(requester_id.eq.${approverId},approver_id.eq.${requesterId})`);
  
  if (error) {
    return { data: null, error };
  }

  if (data.length > 0) {
    return { data: true, error: null };
  }

  return { data: false, error: null };
}

// 내 파트너 조회
export async function getMyPartners(userId: string) {
  const response = await supabase
    .from("partner_relationship")
    .select(
      `
    *,
    requester_info:users!partner-relationship_approver_id_fkey(*),
    approver_info:users!partner-relationship_requester_id_fkey(*)
    `
    )
    .or(`requester_id.eq.${userId},approver_id.eq.${userId}`)
    .eq("status", "approved");

  return response;
}
