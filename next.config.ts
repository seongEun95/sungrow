import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Electron 배포를 위한 정적 파일 export
  output: "export",
  // 이미지 최적화 비활성화 (정적 export에서는 Next.js 이미지 최적화 서버 불필요)
  images: {
    unoptimized: true,
  },
  // 정적 export에서는 trailing slash 권장
  trailingSlash: true,
};

export default nextConfig;
