import { PartnerRelationshipItemType } from "@/types/partner-relationship";
import { create } from "zustand";

// 파트너 스토어 타입 정의
interface PartnerRelationshipStore {
  // 상태
  myPartners: PartnerRelationshipItemType[];  
  requestedPartners: PartnerRelationshipItemType[];
  receivedPartners: PartnerRelationshipItemType[];
  // 액션
  setMyPartners: (partners: PartnerRelationshipItemType[]) => void;
  setRequestedPartners: (partners: PartnerRelationshipItemType[]) => void;
  setReceivedPartners: (partners: PartnerRelationshipItemType[]) => void;
}

// 파트너 스토어 생성
export const usePartnerRelationshipStore = create<PartnerRelationshipStore>()((set) => ({
  // 초기 상태
  myPartners: [],
  requestedPartners: [],
  receivedPartners: [],
  // 액션
  setMyPartners: (partners) => set({ myPartners: partners }),
  setRequestedPartners: (partners) => set({ requestedPartners: partners }),
  setReceivedPartners: (partners) => set({ receivedPartners: partners }),
}));
