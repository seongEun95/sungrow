'use client';

export default function SystemInfoCard() {
  return (
    <div className="border border-[#e4e4e7] rounded-2xl p-6 bg-white h-[182px]">
      <h2 className="text-xl font-bold text-[#0a112f] mb-5">시스템 정보</h2>
      
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff7300]"></div>
          <span className="text-base font-medium text-[#444] tracking-tight">
            시간대별 요금제 전력
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff7300]"></div>
          <span className="text-base font-medium text-[#444] tracking-tight">
            충전상태 균형
          </span>
        </div>
      </div>
    </div>
  );
}
