'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, Tooltip } from 'recharts';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const powerVal = payload.find((p: any) => p.dataKey === 'power');
    const socVal = payload.find((p: any) => p.dataKey === 'soc');
    return (
      <div className="bg-white border border-[#e4e4e7] rounded-xl shadow-lg px-3 py-2 text-[12px]">
        <p className="font-semibold text-[#0a112f] mb-1">{label}</p>
        {powerVal && (
          <p className="text-[#ff7300]">총 활성 전력: <span className="font-bold">{(powerVal.value * 100).toFixed(0)} kW</span></p>
        )}
        {socVal && (
          <p className="text-[#ffca28]">온라인 SOC: <span className="font-bold">{socVal.value}%</span></p>
        )}
      </div>
    );
  }
  return null;
};

const data = [
  { time: '10:00', power: 0, soc: 100 },
  { time: '10:05', power: 0.15, soc: 95 },
  { time: '10:10', power: 0.25, soc: 85 },
  { time: '10:15', power: 0.35, soc: 75 },
  { time: '10:20', power: 0.42, soc: 65 },
  { time: '10:25', power: 0.38, soc: 55 },
  { time: '10:30', power: 0.32, soc: 50 },
  { time: '10:35', power: 0.25, soc: 45 },
  { time: '10:40', power: 0.18, soc: 35 },
  { time: '10:45', power: 0.12, soc: 30 },
];

export default function DualAxisChart() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="border border-[#e4e4e7] rounded-2xl p-6 bg-white">
      <h2 className="text-xl font-bold text-[#0a112f] mb-1">총 유효 전력 / 온라인 충전 상태</h2>
      <p className="text-sm text-[#70707a] mb-6">총 유효 전력 (kW)</p>

      <div className="h-[240px]">
        {isMounted && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={data} 
              margin={{ top: 5, right: 50, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="0" stroke="#f0f0f0" vertical={false} />
              
              {/* Left Y-Axis for Power */}
              <YAxis 
                yAxisId="left"
                tick={{ fontSize: 12, fill: '#666' }}
                axisLine={{ stroke: '#e4e4e7' }}
                tickLine={false}
                domain={[0, 1]}
                ticks={[0, 0.2, 0.4, 0.6, 0.8, 1]}
              />
              
              {/* Right Y-Axis for SOC */}
              <YAxis 
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 12, fill: '#666' }}
                axisLine={{ stroke: '#e4e4e7' }}
                tickLine={false}
                domain={[0, 100]}
                ticks={[0, 20, 40, 60, 80, 100]}
                label={{ value: '온라인 충전 상태(%)', position: 'insideRight', angle: -90, style: { fontSize: 12, fill: '#666' } }}
              />
              
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 12, fill: '#666' }}
                axisLine={{ stroke: '#e4e4e7' }}
                tickLine={false}
              />
              
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ stroke: '#3981f7', strokeWidth: 1, strokeDasharray: '4 2' }}
              />

              {/* 가로 참조선들 */}
              <ReferenceLine 
                yAxisId="left"
                y={0.2} 
                stroke="#e5e5e5" 
                strokeDasharray="3 3"
                strokeWidth={1}
              />
              <ReferenceLine 
                yAxisId="left"
                y={0.4} 
                stroke="#e5e5e5" 
                strokeDasharray="3 3"
                strokeWidth={1}
              />
              <ReferenceLine 
                yAxisId="left"
                y={0.6} 
                stroke="#e5e5e5" 
                strokeDasharray="3 3"
                strokeWidth={1}
              />
              <ReferenceLine 
                yAxisId="left"
                y={0.8} 
                stroke="#e5e5e5" 
                strokeDasharray="3 3"
                strokeWidth={1}
              />
              
              {/* Power Line (Orange) */}
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="power" 
                stroke="#ff7300" 
                strokeWidth={4}
                dot={false}
                animationDuration={1500}
                animationBegin={0}
                animationEasing="ease-in-out"
              />
              
              {/* SOC Line (Yellow) */}
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="soc" 
                stroke="#ffca28" 
                strokeWidth={4}
                dot={false}
                animationDuration={1500}
                animationBegin={0}
                animationEasing="ease-in-out"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-6 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-3 bg-[#ff7300] rounded"></div>
          <span className="text-[14px] text-[#70707a]">총 활성 전력</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-3 bg-[#ffca28] rounded"></div>
          <span className="text-[14px] text-[#70707a]">온라인 SOC</span>
        </div>
      </div>
    </div>
  );
}
