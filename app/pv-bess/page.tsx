'use client';

import Link from 'next/link';
import { RefreshCw } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import PVInfoCard from '../components/PVInfoCard';
import ESSInfoCard from '../components/ESSInfoCard';
import PriceCard from '../components/PriceCard';
import PVPowerChart from '../components/PVPowerChart';
import SOCChart from '../components/SOCChart';
import WeatherSensorCard from '../components/WeatherSensorCard';
import InverterStatusCard from '../components/InverterStatusCard';
import PVBarChart from '../components/PVBarChart';
import ESSWeeklyChart from '../components/ESSWeeklyChart';
import PVEnergyFlowDiagram from '../components/PVEnergyFlowDiagram';
import Title from '../components/Title';

export default function PVBESSPage() {
  return (
    <div className="flex h-screen bg-[#f9f9f9] overflow-hidden">
      {/* 사이드바 */}
      <Sidebar />

      {/* 메인 컨텐츠 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 네비게이션 바 */}
        <Navbar />

        {/* 페이지 컨텐츠 */}
        <main className="flex-1 overflow-y-auto">
          {/* 페이지 타이틀 + 전환 버튼 */}
          <div className="px-9 pt-7 pb-5 border-b border-[#e4e4e7] bg-white flex items-center gap-4">
            <Title title="대시보드" storageKey="pvbess-dashboard-title" />
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#e4e4e7] text-[#70707a] hover:bg-gray-50 hover:border-[#3981f7] hover:text-[#3981f7] transition-all duration-200 text-sm font-medium"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              PMS 모니터링 전환
            </Link>
          </div>

          {/* 컨텐츠 영역 - 2열 레이아웃 */}
          <div className="p-6 max-w-[1600px]">
            {/*
              두 묶음 간 높이 동기화:
              - 왼쪽: PV저장정보 + 에너지저장정보 + 전력량 + 충전상태 + PV발전현황 + ESS충방전현황
              - 오른쪽: 가격동향 + 기상센서 + 인버터정보 + 발전소/설비 개요
              align-items: stretch + flex-col로 높이 동기화
            */}
            <div className="flex gap-5 items-stretch">

              {/* ─── 왼쪽 묶음 ─── */}
              <div className="flex-1 flex flex-col gap-5 min-w-0 max-w-[1200px]">
                {/* 행1: PV 저장 정보 + 에너지 저장 정보 */}
                <div className="grid grid-cols-2 gap-5">
                  <PVInfoCard />
                  <ESSInfoCard />
                </div>

                {/* 행2: 전력량 + 충전 상태 */}
                <div className="grid grid-cols-2 gap-5">
                  <PVPowerChart />
                  <SOCChart />
                </div>

                {/* 행3: PV 발전 현황 + ESS 충방전 현황 */}
                <div className="grid grid-cols-2 gap-5">
                  <PVBarChart />
                  <ESSWeeklyChart />
                </div>
              </div>

              {/* ─── 오른쪽 묶음 ─── */}
              <div className="w-[500px] shrink-0 flex flex-col gap-5">
                {/* 가격동향 */}
                <PriceCard />
                {/* 기상센서 */}
                <WeatherSensorCard />
                {/* 인버터정보 */}
                <InverterStatusCard />
                {/* 발전소/설비 개요는 남은 공간을 모두 채움 */}
                <div className="flex-1 min-h-0 h-[300px]">
                  <PVEnergyFlowDiagram />
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
