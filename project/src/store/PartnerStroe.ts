import { create } from "zustand";
import { UserInformationType } from "@/types/user";

// 파트너 스토어 타입 정의
interface PartnerStore {
  // 상태
  partners: UserInformationType[];  
  // 액션
  setPartners: (partners: UserInformationType[]) => void;
}

// 파트너 스토어 생성
export const usePartnerStore = create<PartnerStore>()((set) => ({
  // 초기 상태
  partners: [],
  
  // 액션
  setPartners: (partners) => set({ partners }),
}));
