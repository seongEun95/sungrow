'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-[#e4e4e7] rounded-xl shadow-lg px-3 py-2 text-[12px]">
        <p className="font-semibold text-[#0a112f] mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.dataKey} style={{ color: p.fill }}>
            {p.dataKey === 'charge' ? 'PV 일일 충전량' : 'PV 일일 발전량'}:{' '}
            <span className="font-bold">{p.value} kWh</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// PV 발전 현황 7일 mock 데이터
const pvBarData = [
  { date: '01/13', charge: 480, generation: 390 },
  { date: '01/14', charge: 120, generation: 100 },
  { date: '01/15', charge: 230, generation: 190 },
  { date: '01/16', charge: 30,  generation: 20  },
  { date: '01/17', charge: 140, generation: 110 },
  { date: '01/18', charge: 480, generation: 420 },
  { date: '01/19', charge: 280, generation: 370 },
  { date: '01/20', charge: 430, generation: 380 },
];

export default function PVBarChart() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="border border-[#e4e4e7] rounded-2xl p-6 bg-white">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-bold text-[#0a112f]">지난 7일간의 PV 발전 현황</h2>
        <span className="text-[14px] text-[#70707a]">kWh</span>
      </div>

      <div className="h-[255px] mt-4">
        {isMounted && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={pvBarData}
              margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
              barGap={4}
              barCategoryGap="20%"
            >
              <CartesianGrid strokeDasharray="0" stroke="#f0f0f0" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: '#000' }}
                axisLine={{ stroke: '#e4e4e7' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#000' }}
                axisLine={{ stroke: '#e4e4e7' }}
                tickLine={false}
                domain={[0, 800]}
                ticks={[0, 200, 400, 600, 800]}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: 'rgba(0,0,0,0.04)' }}
              />
              {/* PV 일일 충전량 - 주황 */}
              <Bar
                dataKey="charge"
                fill="#ff7300"
                radius={[4, 4, 0, 0]}
                animationDuration={1200}
                animationBegin={0}
                animationEasing="ease-out"
              />
              {/* PV 일일 발전량 - 노란 */}
              <Bar
                dataKey="generation"
                fill="#ffca28"
                radius={[4, 4, 0, 0]}
                animationDuration={1200}
                animationBegin={0}
                animationEasing="ease-out"
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* 범례 */}
      <div className="flex items-center justify-center gap-8 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-3 bg-[#ff7300] rounded" />
          <span className="text-[14px] text-[#70707a]">PV 일일 충전량</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-3 bg-[#ffca28] rounded" />
          <span className="text-[14px] text-[#70707a]">PV 일일 발전량</span>
        </div>
      </div>
    </div>
  );
}
