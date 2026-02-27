'use client';

interface StatusItem {
  label: string;
  status: 'open' | 'closed' | 'offline';
}

// 왼쪽 컬럼 항목
const leftColumnItems: StatusItem[] = [
  { label: 'LC-PCS 통신 결함', status: 'open' },
  { label: '시스템 결함(Not Ready)', status: 'closed' },
  { label: '비상 정지', status: 'offline' },
  { label: '랙 순환 전류 임계치 초과 1단계 결함', status: 'open' },
  { label: '주기적인 기동/정지 이상 결함', status: 'open' },
  { label: '-', status: 'open' },
  { label: '-', status: 'open' },
  { label: '-', status: 'open' },
  { label: '-', status: 'open' },
  { label: '-', status: 'open' },
  { label: '-', status: 'open' },
  { label: '-', status: 'open' },
];

// 오른쪽 컬럼 항목
const rightColumnItems: StatusItem[] = [
  { label: '상위 제어기 통신 결함', status: 'open' },
  { label: 'LC-CMU 통신 결함', status: 'open' },
  { label: '가스 농도 및 과열 결함', status: 'closed' },
  { label: '전원 케이블 이상 결함', status: 'offline' },
  { label: '-', status: 'open' },
  { label: '-', status: 'open' },
  { label: '-', status: 'open' },
  { label: '-', status: 'open' },
  { label: '-', status: 'open' },
  { label: '-', status: 'open' },
  { label: '-', status: 'open' },
  { label: '-', status: 'open' },
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
    if (item.label === '-') return '';
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
      <div className="flex items-center justify-center">
        <div className="w-full h-[1px] bg-[#e4e4e7]"></div>
      </div>
    </>
  );
};

export default function UnitOverview() {
  return (
    <div className="border border-[#e4e4e7] rounded-2xl p-6 bg-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[20px] font-bold text-[#444] tracking-[-0.4px]">
          전체 Unit 결함 현황
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

      {/* 2열 레이아웃 */}
      <div className="flex gap-8 overflow-y-auto h-[300px]">
        {/* 왼쪽 컬럼 */}
        <div className="flex-1">
          {leftColumnItems.map((item, index) => (
            <ItemRow key={`left-${index}`} item={item} />
          ))}
        </div>

        {/* 오른쪽 컬럼 */}
        <div className="flex-1">
          {rightColumnItems.map((item, index) => (
            <ItemRow key={`right-${index}`} item={item} />
          ))}
        </div>
      </div>

    </div>
  );
}
