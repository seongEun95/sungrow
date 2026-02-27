'use client';

import { EnergyFlowData } from './PVEnergyFlowDiagram';
import InfoCard from './InfoCard';
import Image from 'next/image';

/**
 * PVEnergyFlowDiagram 전용 에너지 흐름 캔버스
 * - PV & BESS 모니터링 패널에 맞게 크기 조절
 */

const defaultData: EnergyFlowData = {
  pv: { activePower: 215.5 },
  grid: { activePower: 215.5, powerFactor: 0.98 },
  ess: { activePower: 64.7, chargeAmount: 102.4 },
  load: { activePower: 102.4 },
};

interface PVEnergyFlowCanvasProps {
  data?: EnergyFlowData;
}

export default function PVEnergyFlowCanvas({ data = defaultData }: PVEnergyFlowCanvasProps) {
  return (
    <div className="relative w-full h-full min-h-[100px]">
      {/* 중앙 SVG 일러스트 */}
      <div className="absolute inset-0 flex h-[260px] pt-18 justify-center items-center">
        <img
          src="/pms/pms.svg"
          alt="발전소 설비 개요 다이어그램"
          className="w-auto h-full max-h-full object-contain"
        />
      </div>

      {/* ===== 오버레이 카드들 ===== */}

      {/* 발전소 카드 - 좌상단 */}
      <div className="absolute top-[14%] left-[3%] z-[100]">
        <InfoCard
          title="발전소"
          items={[
            { label: '유효전력', value: `${data.pv.activePower} kW`, bold: true },
          ]}
        />
      </div>

      {/* 계통 카드 - 우상단 */}
      <div className="absolute top-[2%] right-[2%] z-[10]">
        <InfoCard
          title="계통"
          items={[
            { label: '유효전력', value: `${data.grid.activePower} kW`, bold: true },
            { label: '역률', value: `${data.grid.powerFactor} kW`, bold: true },
          ]}
          twoColumn
        />
      </div>

      {/* 에너지 저장 장치 카드 - 좌하단 */}
      <div className="absolute bottom-[2%] left-[3%] z-[10]">
        <InfoCard
          title="에너지 저장 장치"
          items={[
            { label: '유효전력', value: `${data.ess.activePower} kW`, bold: true },
            { label: '전력 충전량', value: `${data.ess.chargeAmount} kW`, bold: true },
          ]}
          twoColumn
        />
      </div>

      {/* 부하 카드 - 우하단 */}
      <div className="absolute bottom-[2%] right-[2%] z-[10]">
        <InfoCard
          title="부하"
          items={[
            { label: '유효전력', value: `${data.load.activePower} kW`, bold: true },
          ]}
        />
      </div>
    </div>
  );
}
