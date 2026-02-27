'use client';

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import DualAxisChart from '../components/DualAxisChart';
import UnitOverview from '../components/UnitOverview';
import RackManagement from '../components/RackManagement';
import Title from '../components/Title';

export default function DeviceMonitoring() {
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
          <div className="px-9 pt-9 pb-6 border-b border-[#e4e4e7] bg-white">
            <Title title="장비 모니터링" />
          </div>

          {/* Content Area */}
          <div className="p-8 space-y-8 max-w-[1600px]">
            {/* Chart */}
            <DualAxisChart />

            {/* Unit Lists */}
            <div className="grid grid-cols-2 gap-6">
              <UnitOverview />
              <RackManagement />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
