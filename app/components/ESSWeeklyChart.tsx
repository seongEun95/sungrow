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
            {p.dataKey === 'charge' ? 'ESS 일일 충전량' : 'ESS 일일 방전량'}:{' '}
            <span className="font-bold">{p.value} kWh</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// ESS 충방전 현황 7일 mock 데이터
const essBarData = [
  { date: '01/13', charge: 650, discharge: 270 },
  { date: '01/14', charge: 660, discharge: 290 },
  { date: '01/15', charge: 310, discharge: 200 },
  { date: '01/16', charge: 80,  discharge: 65  },
  { date: '01/17', charge: 460, discharge: 380 },
  { date: '01/18', charge: 490, discharge: 430 },
  { date: '01/19', charge: 510, discharge: 455 },
  { date: '01/20', charge: 640, discharge: 600 },
];

export default function ESSWeeklyChart() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="border border-[#e4e4e7] rounded-2xl p-6 bg-white">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-bold text-[#0a112f]">지난 7일간의 ESS 충방전 현황</h2>
        <span className="text-[14px] text-[#70707a]">kWh</span>
      </div>

      <div className="h-[255px] mt-4">
        {isMounted && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={essBarData}
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
              {/* ESS 일일 충전량 - 주황 */}
              <Bar
                dataKey="charge"
                fill="#ff7300"
                radius={[4, 4, 0, 0]}
                animationDuration={1200}
                animationBegin={0}
                animationEasing="ease-out"
              />
              {/* ESS 일일 방전량 - 노란 */}
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

      {/* 범례 */}
      <div className="flex items-center justify-center gap-8 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-3 bg-[#ff7300] rounded" />
          <span className="text-[14px] text-[#70707a]">ESS 일일 충전량</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-3 bg-[#ffca28] rounded" />
          <span className="text-[14px] text-[#70707a]">ESS 일일 방전량</span>
        </div>
      </div>
    </div>
  );
}
