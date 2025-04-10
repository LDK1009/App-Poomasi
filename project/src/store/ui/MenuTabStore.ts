import { create } from "zustand";

// 파트너 스토어 타입 정의
interface StoreType {
  // 상태
  currentTab: number;
  // 액션
  setCurrentTab: (currentTab: number) => void;
}

// 파트너 스토어 생성
export const useMenuTabStore = create<StoreType>()((set) => ({
  // 초기 상태
  currentTab: 0,

  // 액션
  setCurrentTab: (currentTab) => set({ currentTab }),
}));
