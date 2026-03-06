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
            {p.dataKey === 'charge' ? 'ESS 일일 충전량' : 'ESS 일일 방전량'}: <span className="font-bold">{p.value} kWh</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const data = [
  { date: '01/20', charge: 650, discharge: 630 },
  { date: '01/21', charge: 680, discharge: 640 },
  { date: '01/22', charge: 280, discharge: 260 },
  { date: '01/23', charge: 320, discharge: 300 },
  { date: '01/24', charge: 360, discharge: 340 },
  { date: '01/25', charge: 480, discharge: 460 },
  { date: '01/26', charge: 520, discharge: 500 },
  { date: '01/27', charge: 580, discharge: 560 },
];

export default function WeeklyBarChart() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="border border-[#e4e4e7] rounded-2xl p-6 bg-white h-[384px]">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-bold text-[#0a112f]">지난 7일간의 운영 현황</h2>
        <span className="text-[14px] text-[#70707a]">kWh</span>
      </div>

      <div className="h-[220px] mt-4">
        {isMounted && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={data}
              margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
              barGap={8}
              barCategoryGap="20%"
            >
              <CartesianGrid strokeDasharray="0" stroke="#f0f0f0" vertical={false} />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12, fill: '#000' }}
                axisLine={{ stroke: '#e4e4e7' }}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#000' }}
                axisLine={{ stroke: '#e4e4e7' }}
                tickLine={false}
                domain={[0, 800]}
                ticks={[0, 200, 400, 600, 800]}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: 'rgba(0,0,0,0.04)' }}
              />
              <Bar 
                dataKey="charge" 
                fill="#ff7300" 
                radius={[4, 4, 0, 0]}
                animationDuration={1200}
                animationBegin={0}
                animationEasing="ease-out"
              />
              <Bar 
                dataKey="discharge" 
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

      {/* Legend */}
      <div className="flex items-center justify-center gap-8 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-4 bg-[#ff7300] rounded"></div>
          <span className="text-[14px] text-[#70707a]">ESS 일일 충전량</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-4 bg-[#ffca28] rounded"></div>
          <span className="text-[14px] text-[#70707a]">ESS 일일 방전량</span>
        </div>
      </div>
    </div>
  );
}
