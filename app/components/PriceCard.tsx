'use client';

import { useState } from 'react';

// 가격동향 mock 데이터
const priceData = {
  land: {
    date: '2026.02.05.(목)',
    smp: 124.8,
    rec: 71540,
    tradeDate: '2026.02.05.',
    tradeVolume: '173,033',
  },
  jeju: {
    date: '2026.02.05.(목)',
    smp: 98.5,
    rec: 68200,
    tradeDate: '2026.02.05.',
    tradeVolume: '173,033',
  },
};

export default function PriceCard() {
  // 육지/제주 탭 상태
  const [activeTab, setActiveTab] = useState<'land' | 'jeju'>('land');
  const data = priceData[activeTab];

  return (
    <div className="border border-[#e4e4e7] rounded-2xl p-5 bg-white">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-base font-bold text-[#0a112f]">가격동향</h2>
          <p className="text-[14px] text-[#585c64] mt-0.5">{data.date}</p>
        </div>
        {/* 육지/제주 탭 */}
        <div className="flex rounded-lg border border-[#e4e4e7] overflow-hidden">
          <button
            onClick={() => setActiveTab('land')}
            className={`px-3 py-1.5 text-[14px] font-medium transition-colors ${
              activeTab === 'land'
                ? 'bg-[#ff7300] text-white'
                : 'bg-white text-[#70707a] hover:bg-gray-50'
            }`}
          >
            육지
          </button>
          <button
            onClick={() => setActiveTab('jeju')}
            className={`px-3 py-1.5 text-[14px] font-medium transition-colors border-l border-[#e4e4e7] ${
              activeTab === 'jeju'
                ? 'bg-[#ff7300] text-white'
                : 'bg-white text-[#70707a] hover:bg-gray-50'
            }`}
          >
            제주
          </button>
        </div>
      </div>

      {/* SMP / REC */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <p className="text-[14px] text-[#585c64]">SMP</p>
          <div className="flex items-baseline gap-1">
            <span className="text-[22px] font-medium text-[#0a112f]">{data.smp}</span>
            <span className="text-[14px] text-[#585c64]">원/kWh</span>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1 mb-1">
            <p className="text-[14px] text-[#585c64]">REC</p>
            <span className="text-[12px] text-[#585c64]">가중치 X 1.0</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-[22px] font-medium text-[#0a112f]">{data.rec.toLocaleString()}</span>
            <span className="text-[14px] text-[#585c64]">원/REC</span>
          </div>
        </div>
      </div>

      {/* 거래일 / 거래량 */}
      <div className="flex gap-2">
        <div className="flex items-center justify-between flex-1 bg-[#fff4eb] rounded-lg px-3 py-3">
          <p className="text-[14px] text-[#333333] font-medium">거래일</p>
          <p className="text-[14px] font-semibold text-[#0a112f]">{data.tradeDate}</p>
        </div>
        <div className="flex items-center justify-between flex-1 bg-[#fff4eb] rounded-lg px-3 py-3">
          <p className="text-[14px] text-[#333333] font-medium">거래량</p>
          <p className="text-[14px] font-semibold text-[#0a112f]">{data.tradeVolume}</p>
        </div>
      </div>
    </div>
  );
}
