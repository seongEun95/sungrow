'use client';

import SystemDiagramCanvas from './SystemDiagramCanvas';
import SystemEnergyFlowCanvas from './SystemEnergyFlowCanvas';

export default function SystemDiagram() {
  return (
    <div className="border border-[#e4e4e7] rounded-2xl p-6 bg-white h-[100%] flex flex-col">
      <h2 className="text-xl font-bold text-[#0a112f] shrink-0">발전소/설비 개요</h2>
      <SystemDiagramCanvas />
      <div className="flex-1 min-h-0 pb-[40px] mt-[-60px]">
        <SystemEnergyFlowCanvas />
      </div>
    </div>
  );
}
