'use client';

import { Zap } from 'lucide-react';
import { useCountUpValue } from '@/app/hooks/useCountUp';

const energyData = [
  { label: 'ESS 일일 충전량', value: '125.0 kWh', icon: 'orange' },
  { label: 'ESS 일일 방전량', value: '24.0 kWh', icon: 'yellow' },
  { label: '총 충전량', value: '0.723 MWh', icon: 'blue' },
  { label: '총 방전량', value: '0.664 MWh', icon: 'green' },
];

function CountUpValue({ value }: { value: string }) {
  const display = useCountUpValue(value);
  return <>{display}</>;
}

export default function EnergyInfoCard() {
  return (
    <div className="border border-[#e4e4e7] rounded-2xl p-6 pb-10 bg-white">
      <h2 className="text-xl font-bold text-[#0a112f] mb-5">에너지 저장 정보</h2>
      
      <div className="flex justify-between gap-4">
        {energyData.map((item, index) => (
          <div key={index} className="flex items-start flex-1">
            {/* Icon */}
            <div className="flex items-start gap-2 w-full">
            <div className={`w-6 h-6 flex items-center justify-center shrink-0 ${
              index === 0 ? 'text-[#ff7300]' :
              index === 1 ? 'text-[#ffca28]' :
              index === 2 ? 'text-[#3981f7]' :
              'text-[#22c55e]'
            }`}>
              <Zap className="w-6 h-6" fill="currentColor" />
            </div>
           
            {/* Content */}
            <div className="flex flex-col gap-3.5 flex-1 max-w-[242px]">
              <p className="text-base font-medium text-[#70707a] tracking-tight leading-snug">
                {item.label}
              </p>
              <p className="text-[26px] font-medium text-[#0a112f] leading-none tracking-tight self-end">
                <CountUpValue value={item.value} />
              </p>
            </div>
             </div>
             

            {/* Divider */}
            {index < 3 && (
              <div className="h-16 w-px bg-[#e4e4e7] ml-4" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
