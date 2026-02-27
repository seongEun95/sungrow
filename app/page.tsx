'use client';

import Link from 'next/link';
import { RefreshCw } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import EnergyInfoCard from './components/EnergyInfoCard';
import PowerChart from './components/PowerChart';
import SOCChart from './components/SOCChart';
import WeeklyBarChart from './components/WeeklyBarChart';
import SystemDiagram from './components/SystemDiagram';
import Title from './components/Title';

export default function Home() {
  return (
    <div className="flex h-screen bg-[#f9f9f9] overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {/* Page Title */}
          <div className="px-9 pt-7 pb-5 border-b border-[#e4e4e7] bg-white flex items-center gap-4">
            <Title title="대시보드" storageKey="pms-dashboard-title" />
            <Link
              href="/pv-bess"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#e4e4e7] text-[#70707a] hover:bg-gray-50 hover:border-[#ff7300] hover:text-[#ff7300] transition-all duration-200 text-sm font-medium"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              PV BESS 모니터링 전환
            </Link>
          </div>

          {/* Content Area */}
          <div className="p-6 space-y-8 max-w-[1600px] flex gap-8">
            {/* Top Section */}
            <div className="flex gap-8 flex-col flex-1 m-0">
              <div>
                <EnergyInfoCard />
              </div>
              {/* <div className="w-[373px]">
                <SystemInfoCard />
              </div> */}
                {/* Left Column - Charts */}
              <div className="flex-1 space-y-6">
                {/* Power & SOC Charts */}
                <div className="grid grid-cols-2 gap-5">
                  <PowerChart />
                  <SOCChart />
                </div>

                {/* Weekly Bar Chart */}
                <WeeklyBarChart />
              </div>
            </div>

             {/* Right Column - System Diagram */}
              <div className="w-[606px]">
                <SystemDiagram />
              </div>
          </div>
        </main>
      </div>
    </div>
  );
}
