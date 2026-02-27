'use client';

// 인버터 정보 mock 데이터
const inverterData = [
  { type: 'Inverter', normal: 2, alarm: 8, faults: 4, offline: 10 },
  { type: 'PCS', normal: 3, alarm: 0, faults: 0, offline: 0 },
  { type: 'Battery Unit', normal: 0, alarm: 0, faults: 1, offline: 0 },
];

export default function InverterStatusCard() {
  return (
    <div className="border border-[#e4e4e7] rounded-2xl p-5 bg-white">
      <h2 className="text-base font-bold text-[#0a112f] mb-3">인버터 정보</h2>

      {/* 테이블 */}
      <div className="w-full">
        {/* 헤더 */}
        <div className="grid grid-cols-6 gap-1 mb-2">
          <div className="col-span-2">
            <p className="text-[12px] text-[#585c64] leading-tight">Running state</p>
            <p className="text-[12px] text-[#585c64] leading-tight">Device Type</p>
          </div>
          <div className="text-center">
            <span className="text-[14px] font-medium text-[#22c55e]">Normal</span>
          </div>
          <div className="text-center">
            <span className="text-[14px] font-medium text-[#ff7300]">Alarm</span>
          </div>
          <div className="text-center">
            <span className="text-[14px] font-medium text-[#ef4444]">Faults</span>
          </div>
          <div className="text-center">
            <span className="text-[14px] font-medium text-[#666]">Offline</span>
          </div>
        </div>

        {/* 구분선 */}
        <div className="h-px bg-[#e4e4e7] mb-2" />

        {/* 데이터 행 */}
        <div className="space-y-2.5">
          {inverterData.map((row, index) => (
            <div key={index} className="grid grid-cols-6 gap-1 items-center">
              <div className="col-span-2">
                <span className="text-sm font-medium text-[#444]">{row.type}</span>
              </div>
              <div className="text-center">
                <span className="text-sm font-bold text-[#22c55e]">{row.normal}</span>
              </div>
              <div className="text-center">
                <span className="text-sm font-bold text-[#ff7300]">{row.alarm}</span>
              </div>
              <div className="text-center">
                <span className="text-sm font-bold text-[#ef4444]">{row.faults}</span>
              </div>
              <div className="text-center">
                <span className="text-sm font-bold text-[#666]">{row.offline}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
