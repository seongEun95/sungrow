'use client';

import { useEffect, useState } from 'react';
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

/**
 * 채움 영역 구현 (이중 레이어 + 흰색 마스크 기법):
 *
 *  Layer 1 - yellowBand : 0 ~ 0.5 전 구간 노란색
 *  Layer 2 - whiteMask  : 0 ~ min(pv, 0.5) 흰색으로 덮어 PV 곡선 아래 노란색 제거
 *    → 결과: PV 곡선(하단) ~ 주황선(상단) 사이만 노란색 (이미지와 동일)
 *  Layer 3 - grayFill   : 0.5 ~ pv, pv > 0.5 구간 회색
 *  Layer 4 - grid 선    : 주황 수평선 (0.5)
 *  Layer 5 - pv 선      : 녹색 종 모양 곡선
 */

const GRID_VALUE = 0.5;
const BG_COLOR   = '#ffffff';   // 카드 배경색 (흰색 마스크에 사용)

const rawPvValues = [
  0.0, 0.02, 0.07, 0.15, 0.28, 0.44, 0.62, 0.80, 0.95, 1.0,
  0.95, 0.80, 0.62, 0.44, 0.28, 0.15, 0.07, 0.02, 0.0,
];

const times = [
  '10:00:00', '10:02:45', '10:05:30', '10:08:15', '10:11:00',
  '10:13:45', '10:16:30', '10:19:15', '10:22:00', '10:24:45',
  '10:27:30', '10:30:15', '10:33:00', '10:35:45', '10:38:30',
  '10:41:15', '10:44:00', '10:46:45', '10:49:26',
];

const data = times.map((time, i) => {
  const pv = rawPvValues[i];
  return {
    time,
    grid: GRID_VALUE,
    pv,
    // Layer 1: 전 구간 0~0.5 노란 밴드
    yellowBand: GRID_VALUE,
    // Layer 2: 흰색 마스크 - PV 곡선 아래를 덮어 노란색 제거
    whiteMask: Math.min(pv, GRID_VALUE),
    // Layer 3: 회색 - pv>0.5 구간에서만 0.5 초과 부분 채움
    grayFill: Math.max(pv, GRID_VALUE),
  };
});

const X_TICKS = ['10:00:00', '10:24:45', '10:49:26'];

// 왼쪽→오른쪽 reveal 애니메이션
const REVEAL_STYLE = `
@keyframes pvChartReveal {
  from { clip-path: inset(0 100% 0 0); }
  to   { clip-path: inset(0 0%   0 0); }
}
.pv-chart-animate {
  animation: pvChartReveal 2s forwards;
}
`;

export default function PowerChart() {
  const [isMounted, setIsMounted] = useState(false);
  const [animKey, setAnimKey]     = useState(0);

  useEffect(() => { setIsMounted(true); }, []);
  useEffect(() => {
    if (isMounted) setAnimKey((k) => k + 1);
  }, [isMounted]);

  return (
    <div className="border border-[#e4e4e7] rounded-2xl p-6 bg-white">
      <style>{REVEAL_STYLE}</style>

      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-bold text-[#0a112f]">전력량</h2>
        <span className="text-[13px] text-[#70707a]">kW</span>
      </div>

      <div key={animKey} className="pv-chart-animate h-[210px] mt-2">
        {isMounted && (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={data}
              margin={{ top: 8, right: 10, left: -15, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="0" stroke="#e8e8e8" vertical={false} />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 11, fill: '#333' }}
                axisLine={{ stroke: '#d0d0d0' }}
                tickLine={false}
                ticks={X_TICKS}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#333' }}
                axisLine={false}
                tickLine={false}
                domain={[0, 1]}
                ticks={[0, 0.25, 0.5, 0.75, 1]}
              />

              {/* Layer 1: 전 구간 노란 밴드 (0 ~ 0.5) */}
              <Area
                type="monotone"
                dataKey="yellowBand"
                stroke="none"
                fill="#f5c500"
                fillOpacity={1}
                baseValue={0}
                isAnimationActive={false}
              />

              {/* Layer 2: 흰색 마스크 (0 ~ min(pv,0.5)) — PV 곡선 아래 노란색 제거 */}
              <Area
                type="monotone"
                dataKey="whiteMask"
                stroke="none"
                fill={BG_COLOR}
                fillOpacity={1}
                baseValue={0}
                isAnimationActive={false}
              />

              {/* Layer 3: 회색 채움 (0.5 ~ pv, pv > 0.5 구간만) */}
              <Area
                type="monotone"
                dataKey="grayFill"
                stroke="none"
                fill="#a8a8a8"
                fillOpacity={0.45}
                baseValue={GRID_VALUE}
                isAnimationActive={false}
              />

              {/* Layer 4: 계통 전력 선 (주황 수평) */}
              <Line
                type="monotone"
                dataKey="grid"
                stroke="#ff7300"
                strokeWidth={2.5}
                dot={false}
                isAnimationActive={false}
              />

              {/* Layer 5: PV 발전 전력 선 (녹색 종 모양) */}
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#22c55e"
                strokeWidth={2.5}
                dot={false}
                isAnimationActive={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* 범례 */}
      <div className="flex items-center justify-center gap-6 mt-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-[3px] bg-[#ff7300] rounded" />
          <span className="text-[13px] text-[#70707a]">계통 전력</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-3 bg-[#f5c500] rounded-sm" />
          <span className="text-[13px] text-[#70707a]">에너지 저장 장치 전력</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-[3px] bg-[#22c55e] rounded" />
          <span className="text-[13px] text-[#70707a]">PV 발전 전력</span>
        </div>
      </div>
    </div>
  );
}
