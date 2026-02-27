import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PMS 모니터링 - 대시보드",
  description: "PMS 에너지 관리 시스템 모니터링 대시보드",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
