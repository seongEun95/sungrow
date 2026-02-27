'use client';

import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  { time: '10:00', value: 5 },
  { time: '10:05', value: 7 },
  { time: '10:10', value: 9 },
  { time: '10:15', value: 12 },
  { time: '10:20', value: 15 },
  { time: '10:25', value: 18 },
  { time: '10:30', value: 19 },
  { time: '10:35', value: 18 },
  { time: '10:40', value: 16 },
  { time: '10:45', value: 14 },
  { time: '10:50', value: 11 },
  { time: '10:55', value: 8 },
  { time: '11:00', value: 6 },
];

export default function SOCChart() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="border border-[#e4e4e7] rounded-2xl p-6 bg-white">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-bold text-[#0a112f]">충전 상태</h2>
        <span className="text-[14px] text-[#70707a]">%</span>
      </div>

      <div className="h-[200px] mt-4">
        {isMounted && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart 
              data={data}
              margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorSoc" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="5%" stopColor="#ff7300" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ff7300" stopOpacity={0.6}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="0" stroke="#f0f0f0" vertical={false} />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 12, fill: '#000' }}
                axisLine={{ stroke: '#e4e4e7' }}
                tickLine={false}
                interval={3}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#000' }}
                axisLine={{ stroke: '#e4e4e7' }}
                tickLine={false}
                domain={[0, 20]}
                ticks={[0, 5, 10, 15, 20]}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#ff7300" 
                strokeWidth={2}
                fill="url(#colorSoc)"
                animationDuration={1500}
                animationBegin={0}
                animationEasing="ease-in-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-2 mt-6">
        <div className="w-6 h-4 bg-[rgba(255,115,0,0.6)] rounded"></div>
        <span className="text-[14px] text-[#70707a]">충전 상태</span>
      </div>
    </div>
  );
}
