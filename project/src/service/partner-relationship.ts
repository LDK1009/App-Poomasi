import { supabase } from "@/lib/supabaseClient";
import { PartnerRelationshipTableType } from "@/types/partner-relationship";

export async function postPartnerRelationship(partnerRelationship: PartnerRelationshipTableType) {
  const response = await supabase.from("partner_relationship").insert(partnerRelationship);

  return response;
}
