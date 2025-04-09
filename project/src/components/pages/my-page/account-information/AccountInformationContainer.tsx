"use client";

import {
  getCurrentUserAccountInfo,
  getCurrentUserEmail,
  getCurrentUserUID,
  upsertCurrentUserAccountInfo,
} from "@/service/auth";
import { useAccountInformationStore } from "@/store/AccountInfomationStore";
import { mixinContainer } from "@/styles/mixins";
import { Box, TextField, styled, Typography, Button, Stack } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import Header from "./Header";
import { UserInformationType } from "@/types/user";

const AccountInformationContainer = () => {
  /////////////////////////////// Store ///////////////////////////////
  const { userInfo, setUserInfo, setUserInfoProperty } = useAccountInformationStore();
  const { email, app_name, google_form_link, android_app_link, web_participation_link } = userInfo;

  /////////////////////////////// Functions ///////////////////////////////
  async function getUserInfo() {
    const { data, error } = await getCurrentUserAccountInfo();

    if (error) {
      enqueueSnackbar("계정 정보를 입력해주세요.", { variant: "info" });
      const { data: email } = await getCurrentUserEmail();
      if (email) {
        setUserInfoProperty("email", email);
      }
      return;
    }

    setUserInfo(data);
  }

  // 계정 정보 저장
  async function handleSubmit() {
    const { data: user_id } = await getCurrentUserUID();

    const submitData: UserInformationType = {
      id: user_id as string,
      email: email,
      app_name: app_name,
      google_form_link: google_form_link,
      android_app_link: android_app_link,
      web_participation_link: web_participation_link,
    };

    if (!email || !app_name || !google_form_link || !android_app_link || !web_participation_link) {
      enqueueSnackbar("모든 필드를 입력해주세요.", { variant: "warning" });
      return;
    }

    const { error } = await upsertCurrentUserAccountInfo(submitData);

    if (error) {
      enqueueSnackbar("계정 정보 저장 실패", { variant: "error" });
      console.log(error);
      return;
    }

    enqueueSnackbar("계정 정보 저장 성공", { variant: "success" });
  }

  /////////////////////////////// Effects ///////////////////////////////
  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /////////////////////////////// Variables ///////////////////////////////
  const inputFields = [
    {
      label: "이메일",
      name: "email" as const,
      value: email,
      editable: false,
    },
    {
      label: "앱 이름",
      name: "app_name" as const,
      value: app_name,
      editable: true,
    },
    {
      label: "구글 폼 링크",
      name: "google_form_link" as const,
      value: google_form_link,
      editable: true,
    },
    {
      label: "안드로이드 앱 링크",
      name: "android_app_link" as const,
      value: android_app_link,
      editable: true,
    },
    {
      label: "웹 참여 링크",
      name: "web_participation_link" as const,
      value: web_participation_link,
      editable: true,
    },
  ];

  /////////////////////////////// Render ///////////////////////////////
  return (
    <Container>
      <Header />
      <InputContainer>
        {inputFields.map((field) => (
          <InfoItem key={field.name}>
            <InfoLabel variant="subtitle1">{field.label}</InfoLabel>
            <TextField
              variant="standard"
              value={field.value}
              onChange={(e) => setUserInfoProperty(field.name, e.target.value)}
              fullWidth
              disabled={!field.editable}
            />
          </InfoItem>
        ))}
      </InputContainer>
      <SubmitButton onClick={handleSubmit} variant="contained" color="primary" fullWidth>
        저장
      </SubmitButton>
    </Container>
  );
};

export default AccountInformationContainer;

// 스타일 컴포넌트
const Container = styled(Box)`
  ${mixinContainer}
  padding: 16px;
`;

const InputContainer = styled(Stack)`
  row-gap: 24px;
  margin-top: 24px;
`;

const InfoItem = styled(Stack)`
  row-gap: 4px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  background-color: ${({ theme }) => theme.palette.background.paper};
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.15);
`;

const InfoLabel = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.main};
  font-weight: bold;
`;

const SubmitButton = styled(Button)`
  color: white;
  font-weight: bold;
  margin-top: 16px;
`;
