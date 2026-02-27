import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",    // ← 이 줄 추가
  basePath: "/pms",    // ← 서브경로로 서비스할 경우 추가 (없으면 생략)
  trailingSlash: true, // ← 정적 파일 경로 호환성을 위해 추가
  images: { unoptimized: true }, // ← output: 'export' 와 Image Optimization 충돌 해결
};

export default nextConfig;
