"use client";

import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import Link from "next/link";

const pageTitles: Record<string, string> = {
  "/": "PMS 모니터링",
  "/device-monitoring": "PMS 모니터링",
  "/pv-bess": "PV & BESS 모니터링",
};

export default function Navbar() {
  const pathname = usePathname();
  const title = pageTitles[pathname] || "PMS 모니터링";

  return (
    <nav className=" border-b border-[#e4e4e7] bg-white px-5 py-6 flex items-center justify-between">
      <div className="flex flex-col">
        <h1 className="text-[32px] font-semibold text-[#0a112f] leading-tight tracking-tight">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-10">
        {/* Language Selector */}
        <div className="flex items-center gap-2 px-2 py-2 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors">
          <Globe className="w-5 h-5 text-[#9096a2]" />
          <span className="text-sm font-medium text-[#444]">KOREAN</span>
        </div>

        {/* User Info */}
        <div>
          <Link href="/login" className="flex items-center gap-3 mr-5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#a9b58d] to-[#8a9570] flex items-center justify-center">
              <span className="text-white text-sm font-medium">관</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-medium text-[#444]">관리자</span>
              <span className="text-[14px] text-[#70707a]">안전관리자</span>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
