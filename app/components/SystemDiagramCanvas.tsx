"use client";

import { Zap, Activity } from "lucide-react";
import { useEffect, useState } from "react";

export default function SystemDiagramCanvas() {
  // 30초마다 스위칭: false = 방전(ESS→계통/부하), true = 충전(PCS→ESS)
  const [isCharging, setIsCharging] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsCharging((prev) => !prev);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  // 충전/방전 값 (예시 데이터)
  const chargeAmount = 102.4;
  const disChargeAmount = 82.1;

  // 애니메이션 키 (스위칭 시 SVG 애니메이션 리셋)
  const animKey = isCharging ? "charge" : "discharge";

  return (
    <div className="relative h-[600px] scale-90 top-[-60px]">
      {/* Grid (계통) */}
      <div className="absolute left-[80px] top-[80px] flex items-center gap-4">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
          <Zap className="w-8 h-8 text-white" />
        </div>
        <div>
          <p className="text-base font-medium text-[#444] mb-1">계통</p>
          <div className="flex gap-4">
            <div>
              <p className="text-[14px] text-[#70707a] mb-0.5">유효 전력</p>
              <p className="text-[14px] font-medium text-[#444]">215.5kW</p>
            </div>
            <div>
              <p className="text-[14px] text-[#70707a] mb-0.5">역률</p>
              <p className="text-[14px] font-medium text-[#444]">0.98</p>
            </div>
          </div>
        </div>
      </div>

      {/* PCS (Power Conditioning System) */}
      <div className="absolute left-[0px] top-[256px] flex items-center gap-4">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="3"
              y="4"
              width="18"
              height="16"
              rx="2"
              stroke="white"
              strokeWidth="2"
            />
            <line
              x1="7"
              y1="9"
              x2="7"
              y2="15"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="12"
              y1="7"
              x2="12"
              y2="17"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="17"
              y1="10"
              x2="17"
              y2="14"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div>
          <p className="text-base font-medium text-[#444] mb-1">PCS</p>
          <div className="flex gap-4">
            <div>
              <p className="text-[14px] text-[#70707a] mb-0.5">유효 전력</p>
              <p className="text-[14px] font-medium text-[#444]">216.5kW</p>
            </div>
          </div>
        </div>
      </div>

      {/* Load (부하) */}
      <div className="absolute right-[40px] top-[200px] flex flex-col items-end gap-2">
        <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
          <Activity className="w-7 h-7 text-white" />
        </div>
        <div className="text-right">
          <p className="text-base font-medium text-[#444] mb-1">부하</p>
          <div>
            <p className="text-[14px] text-[#70707a] mb-0.5">유효 전력</p>
            <p className="text-[14px] font-medium text-[#444]">102.4kW</p>
          </div>
        </div>
      </div>

      {/* ESS (에너지 저장 장치) */}
      <div className="absolute left-[80px] bottom-[40px] flex items-start gap-4">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="6"
              y="6"
              width="12"
              height="16"
              rx="2"
              stroke="white"
              strokeWidth="2"
            />
            <rect
              x="8"
              y="8"
              width="3"
              height="10"
              fill="white"
              opacity="0.8"
            />
            <line
              x1="10"
              y1="3"
              x2="10"
              y2="6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="14"
              y1="3"
              x2="14"
              y2="6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div>
          <p className="text-base font-medium text-[#444] mb-2">
            에너지 저장 장치
          </p>
          <div className="grid grid-cols-3 gap-x-4 gap-y-1">
            <div>
              <p className="text-[14px] text-[#70707a]">유효 전력</p>
              <p className="text-[14px] font-medium text-[#444]">64.7kW</p>
            </div>
            <div>
              <p className="text-[14px] text-[#70707a]">전력 충전량</p>
              <p className="text-[14px] font-medium text-[#444]">
                {isCharging ? `${chargeAmount}kWh` : "0kWh"}
              </p>
            </div>
            <div>
              <p className="text-[14px] text-[#70707a]">전력 방전량</p>
              <p className="text-[14px] font-medium text-[#444]">
                {isCharging ? "0kWh" : `${disChargeAmount}kWh`}
              </p>
            </div>
          </div>

          {/* Battery Indicator */}
          <div className="flex items-center gap-2 mt-2">
            <div className="relative w-7 h-4 border-2 border-black rounded-sm">
              <div className="absolute left-0.5 top-0.5 w-2 h-2 bg-[#3981f7] rounded-xs"></div>
              <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-1.5 border-2 border-black rounded-sm"></div>
            </div>
            <span className="text-[14px] font-medium text-[#444]">27.3%</span>
          </div>
        </div>
      </div>

      {/* 상태 표시 배지 */}
      <div className="absolute right-[40px] bottom-[40px] z-10">
        <div
          className={`px-3 py-1.5 rounded-full text-[13px] font-semibold transition-all duration-500 ${
            isCharging
              ? "bg-red-100 text-red-600 border border-red-300"
              : "bg-blue-100 text-blue-600 border border-blue-300"
          }`}
        >
          {isCharging ? "⚡ 충전 중" : "🔋 방전 중"}
        </div>
      </div>

      {/* Connection Lines */}
      <svg
        key={animKey}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <defs>
          {/* 메인 경로 정의 */}
          {/* 방전 모드: ESS에서 계통으로 (위쪽) */}
          <path id="mainPathDischarge" d="M 170 450 L 170 170" />
          {/* 방전 모드: ESS에서 부하로 (분기) */}
          <path
            id="branchPathDischarge"
            d="M 170 300 L 320 300 L 320 240 L 435 240"
          />
          {/* 충전 모드: PCS에서 ESS로 (아래쪽) */}
          <path id="pcsToEssPath" d="M 170 295 L 170 450" />
        </defs>

        {/* ===== 방전 모드 (ESS → 계통 / 부하) ===== */}
        {!isCharging && (
          <>
            {/* ESS to Grid - 메인 전력선 배경 */}
            <path
              d="M 170 440 L 170 170"
              stroke="#e4e4e7"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
            />
          </>
        )}

        {/* 메인 경로의 움직이는 파란 화살표들 (ESS → 계통) */}
        {!isCharging &&
          [0, 0.25, 0.5, 0.75].map((offset, index) => (
            <g key={`arrow-main-${index}`}>
              <polygon
                points="0,-6 12,0 0,6"
                fill="#3981f7"
                transform="rotate(-90)"
                visibility="hidden"
              >
                <animate
                  attributeName="visibility"
                  to="visible"
                  begin={`${offset * 5}s`}
                  dur="0.001s"
                  fill="freeze"
                />
                <animateMotion
                  dur="5s"
                  repeatCount="indefinite"
                  begin={`${offset * 5}s`}
                >
                  <mpath href="#mainPathDischarge" />
                </animateMotion>
              </polygon>
            </g>
          ))}

        {/* 중간 지점에서 부하로 분기 배경 */}
        <path
          d="M 170 300 L 320 300 L 320 240 L 440 240"
          stroke="#e4e4e7"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
        />

        {/* 분기 경로의 움직이는 파란 화살표들 (ESS → 부하) */}
        {!isCharging &&
          [0, 0.25, 0.5, 0.75].map((offset, index) => (
            <g key={`arrow-branch-${index}`}>
              <polygon
                points="0,-6 12,0 0,6"
                fill="#3981f7"
                visibility="hidden"
              >
                <animate
                  attributeName="visibility"
                  to="visible"
                  begin={`${offset * 5}s`}
                  dur="0.001s"
                  fill="freeze"
                />
                <animateMotion
                  dur="5s"
                  repeatCount="indefinite"
                  begin={`${offset * 5}s`}
                  rotate="auto"
                >
                  <mpath href="#branchPathDischarge" />
                </animateMotion>
              </polygon>
            </g>
          ))}

        {/* 분기 포인트 표시 */}
        <circle
          cx="170"
          cy="300"
          r="5"
          fill="#3981f7"
          className="animate-pulse"
        />

        {/* ===== 충전 모드 (PCS → ESS) ===== */}
        {isCharging && (
          <>
            {/* PCS to ESS - 전력선 배경 */}
            <path
              d="M 170 295 L 170 450"
              stroke="#e4e4e7"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
            />

            {/* 계통-PCS 연결선 배경 (위쪽) */}
            <path
              d="M 170 170 L 170 295"
              stroke="#e4e4e7"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
            />

            {/* PCS에서 ESS로 내려가는 빨간 화살표들 */}
            {[0, 0.25, 0.5, 0.75].map((offset, index) => (
              <g key={`arrow-pcs-ess-${index}`}>
                <polygon
                  points="0,-6 12,0 0,6"
                  fill="#ef4444"
                  transform="rotate(90)"
                  visibility="hidden"
                >
                  <animate
                    attributeName="visibility"
                    to="visible"
                    begin={`${offset * 5}s`}
                    dur="0.001s"
                    fill="freeze"
                  />
                  <animateMotion
                    dur="5s"
                    repeatCount="indefinite"
                    begin={`${offset * 5}s`}
                  >
                    <mpath href="#pcsToEssPath" />
                  </animateMotion>
                </polygon>
              </g>
            ))}

            {/* PCS 포인트 표시 */}
            <circle
              cx="170"
              cy="295"
              r="5"
              fill="#ef4444"
              className="animate-pulse"
            />
          </>
        )}
      </svg>
    </div>
  );
}
