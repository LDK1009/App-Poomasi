import ThemeProviderWrapper from "@/styles/ThemeProviderWrapper";
import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import ClientSnackbarProvider from "@/lib/ClientSnackbarProvider";
import CommonBottomNavigation from "@/components/common/CommonBottomNavigation";
import CommonHeader from "@/components/common/CommonHeader";
import GlobalStyles from "@/styles/GlobalStyles";
import { GoogleAnalytics } from '@next/third-parties/google'

// SEO 메타데이터
export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "앱 품앗이",
  description: "구글 플레이스토어 비공개 테스트 품앗이 플랫폼",
  keywords: "앱 품앗이, 구글 플레이스토어 비공개 테스트 품앗이 플랫폼",
  openGraph: {
    title: "앱 품앗이",
    description: "구글 플레이스토어 비공개 테스트 품앗이 플랫폼",
    url: "https://www.app-poomasi.site",
    images: [
      {
        url: "https://www.app-poomasi.site/img/logo-512.png",
        width: 512,
        height: 512,
        alt: "앱 품앗이-logo",
      },
    ],
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/img/logo-192.png",
    apple: "/img/logo-512.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        {/* MUI 캐시 프로바이더 (Next15 - MUI 호환)  */}
        <AppRouterCacheProvider>
          {/* MUI 테마 프로바이더 */}
          <ThemeProviderWrapper>
            {/* 커스텀 전역 스타일 적용 */}
            <GlobalStyles />
            {/* 스낵바 */}
            <ClientSnackbarProvider />
            {/* 헤더 */}
            <CommonHeader />
            {/* 페이지 컨텐츠 */}
            {children}
            {/* 바텀 내비게이션 */}
            <CommonBottomNavigation />
          </ThemeProviderWrapper>
        </AppRouterCacheProvider>
      </body>
      <GoogleAnalytics gaId="G-WLDT64VYHD" />
    </html>
  );
}
