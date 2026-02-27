'use client';

import { useState } from 'react';
import clsx from 'clsx';

interface StatusItem {
  label: string;
  status: 'open' | 'closed' | 'offline';
}

// PCS - 왼쪽 컬럼
const pcsLeftItems: StatusItem[] = [
  { label: 'Bus 과전압', status: 'open' },
  { label: 'AC 저전압', status: 'closed' },
  { label: 'AC 저주파수', status: 'offline' },
  { label: '컨택터(접촉기) 결함', status: 'open' },
  { label: '아날로그 오프셋 이상', status: 'open' },
  { label: 'AC 전류 불균형', status: 'open' },
  { label: '10분간 계통 과전압보호', status: 'open' },
  { label: '-', status: 'open' },
  { label: '-', status: 'open' },
  { label: '-', status: 'open' },
];

// PCS - 오른쪽 컬럼
const pcsRightItems: StatusItem[] = [
  { label: 'Bus 저전압', status: 'open' },
  { label: 'AC 과전압', status: 'open' },
  { label: 'AC 과주파수', status: 'closed' },
  { label: 'AC SPD 결함', status: 'offline' },
  { label: '배터리 연결 이상', status: 'open' },
  { label: '주소 코드 중복 오류', status: 'open' },
  { label: '모듈 과온', status: 'open' },
  { label: '-', status: 'open' },
  { label: '-', status: 'open' },
  { label: '-', status: 'open' },
];

// Rack 관리 unit - 왼쪽 컬럼
const rackLeftItems: StatusItem[] = [
  { label: 'Rack 관리 unit #1', status: 'open' },
  { label: 'Rack 관리 unit #2', status: 'open' },
  { label: 'Rack 관리 unit #3', status: 'closed' },
  { label: 'Rack 관리 unit #4', status: 'open' },
  { label: 'Rack 관리 unit #5', status: 'offline' },
  { label: 'Rack 관리 unit #6', status: 'open' },
  { label: 'Rack 관리 unit #7', status: 'open' },
];

// Rack 관리 unit - 오른쪽 컬럼
const rackRightItems: StatusItem[] = [
  { label: 'Rack 관리 unit #8', status: 'closed' },
  { label: 'Rack 관리 unit #9', status: 'open' },
  { label: 'Rack 관리 unit #10', status: 'open' },
  { label: 'Rack 관리 unit #11', status: 'offline' },
  { label: 'Rack 관리 unit #12', status: 'open' },
  { label: 'Rack 관리 unit #13', status: 'open' },
  { label: 'Rack 관리 unit #14', status: 'open' },
];

const StatusIndicator = ({ status }: { status: StatusItem['status'] }) => {
  const config = {
    open: 'bg-[#3bbf80]', // 녹색
    closed: 'bg-[#fa4545]', // 빨간색
    offline: 'bg-[#9096a2]', // 회색
  };

  return (
    <div className={`w-[18px] h-[18px] rounded-full ${config[status]}`}></div>
  );
};

const ItemRow = ({ item }: { item: StatusItem }) => {
  // 상태에 따른 배경색 설정
  const getBgColor = () => {
    switch (item.status) {
      case 'closed': // 이상
        return 'bg-[rgba(255,0,0,0.05)]';
      case 'offline': // 오프라인
        return 'bg-[rgba(144,150,162,0.15)]';
      default: // 정상
        return '';
    }
  };

  return (
    <>
      <div className={`flex items-center justify-between py-[14px] px-[12px] ${getBgColor()}`}>
        <span className="text-sm font-medium text-[#444] tracking-[-0.28px]">
          {item.label}
        </span>
        {item.label !== '-' && <StatusIndicator status={item.status} />}
      </div>
      <div className=" flex items-center justify-center">
        <div className="w-full h-[1px] bg-[#e4e4e7]"></div>
      </div>
    </>
  );
};

export default function RackManagement() {
  const [activeTab, setActiveTab] = useState<'pcs' | 'rack'>('pcs');

  const leftItems = activeTab === 'pcs' ? pcsLeftItems : rackLeftItems;
  const rightItems = activeTab === 'pcs' ? pcsRightItems : rackRightItems;

  return (
    <div className="border border-[#e4e4e7] rounded-2xl p-6 bg-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[20px] font-bold text-[#444] tracking-[-0.4px]">
          PCS / Rack 관리 unit 결함 현황
        </h2>
        <div className="flex items-center gap-[30px]">
          <div className="flex items-center gap-2">
            <div className="w-[18px] h-[18px] rounded-full bg-[#3bbf80]"></div>
            <span className="text-base text-black tracking-[-0.32px]">정상</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[18px] h-[18px] rounded-full bg-[#fa4545]"></div>
            <span className="text-base text-black tracking-[-0.32px]">이상</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[18px] h-[18px] rounded-full bg-[#9096a2]"></div>
            <span className="text-base text-black tracking-[-0.32px]">오프라인</span>
          </div>
        </div>
      </div>

      {/* 탭 버튼 */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('pcs')}
          className={clsx(
            'h-[30px] px-4 rounded-[5px] text-sm font-medium tracking-[-0.28px] transition-colors',
            activeTab === 'pcs'
              ? 'bg-[rgba(255,115,0,0.05)] border border-[#edeef1] text-[#ff7300]'
              : 'bg-[#eee] text-[#9096a2]'
          )}
        >
          PCS
        </button>
        <button
          onClick={() => setActiveTab('rack')}
          className={clsx(
            'h-[30px] px-4 rounded-[5px] text-sm font-medium tracking-[-0.28px] transition-colors',
            activeTab === 'rack'
              ? 'bg-[rgba(255,115,0,0.05)] border border-[#edeef1] text-[#ff7300]'
              : 'bg-[#eee] text-[#9096a2]'
          )}
        >
          Rack 관리 unit
        </button>
      </div>

      {/* 2열 레이아웃 */}
      <div className="flex gap-8 overflow-y-auto h-[300px]">
        {/* 왼쪽 컬럼 */}
        <div className="flex-1">
          {leftItems.map((item, index) => (
            <ItemRow key={`left-${index}`} item={item} />
          ))}
        </div>

        {/* 오른쪽 컬럼 */}
        <div className="flex-1">
          {rightItems.map((item, index) => (
            <ItemRow key={`right-${index}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
