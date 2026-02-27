'use client';

/**
 * PV & BESS 에너지 흐름 다이어그램
 * pms.svg를 중앙 일러스트로 활용하고, 설비 카드를 오버레이 형태로 배치
 */

import PVEnergyFlowCanvas from './PVEnergyFlowCanvas';

export interface EnergyFlowData {
  pv: {
    activePower: number; // 유효전력 kW
  };
  grid: {
    activePower: number; // 유효전력 kW
    powerFactor: number; // 역률
  };
  ess: {
    activePower: number; // 유효전력 kW
    chargeAmount: number; // 전력 충전량 kW
  };
  load: {
    activePower: number; // 유효전력 kW
  };
}

interface PVEnergyFlowDiagramProps {
  data?: EnergyFlowData;
}

const defaultData: EnergyFlowData = {
  pv: { activePower: 215.5 },
  grid: { activePower: 215.5, powerFactor: 0.98 },
  ess: { activePower: 64.7, chargeAmount: 102.4 },
  load: { activePower: 102.4 },
};

export default function PVEnergyFlowDiagram({ data = defaultData }: PVEnergyFlowDiagramProps) {
  return (
    <div className="border border-[#e4e4e7] rounded-2xl bg-white h-[400px] flex flex-col">
      <h2 className="text-base font-bold text-[#0a112f] p-4 pb-0 shrink-0 ">발전소/설비 개요</h2>
      <div className="flex-1 p-4">
        <PVEnergyFlowCanvas data={data} />
      </div>
    </div>
  );
}

