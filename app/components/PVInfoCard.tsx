'use client';

import { Zap } from 'lucide-react';
import { useCountUpValue } from '@/app/hooks/useCountUp';

// PV 저장 정보 카드 데이터
const pvData = [
  { label: '총 발전량', value: '0.664 MWh', color: '#22c55e' },
  { label: '총 충전량', value: '0.723 MWh', color: '#3981f7' },
  { label: 'ESS 일일 방전량', value: '24.0 kWh', color: '#ffca28' },
  { label: 'ESS 일일 충전량', value: '125.0 kWh', color: '#ff7300' },
];

function CountUpValue({ value }: { value: string }) {
  const display = useCountUpValue(value);
  return <>{display}</>;
}

export default function PVInfoCard() {
  return (
    <div className="border border-[#e4e4e7] rounded-2xl p-6 py-10 bg-white">
      <h2 className="text-xl font-bold text-[#0a112f] mb-8">PV 저장 정보</h2>

      <div className="grid grid-cols-2 gap-x-6 gap-y-10">
        {pvData.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            {/* 아이콘 */}
            <div
              className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5"
              style={{ color: item.color }}
            >
              <Zap className="w-5 h-5" fill="currentColor" />
            </div>

            {/* 내용 */}
            <div className="flex flex-col gap-3.5 flex-1 min-w-0">
              <p className="text-base font-medium text-[#70707a] tracking-tight leading-snug">
                {item.label}
              </p>
              <p className="text-[24px] font-semibold text-[#0a112f] leading-none tracking-tight self-end">
                <CountUpValue value={item.value} />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
