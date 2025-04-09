import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserInformationType } from "@/types/user";

// 초기 사용자 정보 상태
const initUserInfo: UserInformationType = {
  id: "",
  email: "",
  app_name: "",
  google_form_link: "",
  android_app_link: "",
  web_participation_link: "",
};

// 계정 정보 스토어 타입 정의
interface AccountInformationStore {
  userInfo: UserInformationType;
  setUserInfo: (userInfo: UserInformationType) => void;
  resetUserInfo: () => void;
  setUserInfoProperty: (property: keyof UserInformationType, value: string) => void;
}

// 계정 정보 스토어 생성
export const useAccountInformationStore = create<AccountInformationStore>()(
  persist(
    (set) => ({
      userInfo: initUserInfo,
      setUserInfo: (userInfo) => set({ userInfo }),
      setUserInfoProperty: (property, value) => set((state) => ({ userInfo: { ...state.userInfo, [property]: value } })),
      resetUserInfo: () => set({ userInfo: initUserInfo }),
    }),
    {
      name: "account-information-storage", // localStorage에 저장될 키 이름
    }
  )
);
