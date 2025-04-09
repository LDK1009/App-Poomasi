import { create } from "zustand";
import { UserInformationType } from "@/types/user";

// 파트너 스토어 타입 정의
interface PartnerRelationshipStore {
  // 상태
  myPartners: UserInformationType[];  
  requestedPartners: UserInformationType[];
  // 액션
  setMyPartners: (partners: UserInformationType[]) => void;
  setRequestedPartners: (partners: UserInformationType[]) => void;
}

// 파트너 스토어 생성
export const usePartnerRelationshipStore = create<PartnerRelationshipStore>()((set) => ({
  // 초기 상태
  myPartners: [],
  requestedPartners: [],
  
  // 액션
  setMyPartners: (partners) => set({ myPartners: partners }),
  setRequestedPartners: (partners) => set({ requestedPartners: partners }),
}));
