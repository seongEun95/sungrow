'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, CreditCard, FileText, Power, Repeat, Shield, Edit, Settings } from 'lucide-react';
import clsx from 'clsx';
import Image from 'next/image';

const menuItems = [
  { icon: Home, label: '대시보드', href: '/' },
  { icon: CreditCard, label: '장비 모니터링', href: '/device-monitoring' },
  { icon: FileText, label: '장비 유지보수', href: '#' },
  { icon: Power, label: '장비 ON/OFF', href: '#' },
  { icon: Repeat, label: '에너지 관리', href: '#' },
  { icon: Shield, label: '전력 제어', href: '#' },
  { icon: Edit, label: '이력관리', href: '#' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-white border-r border-[#e4e4e7] w-[280px] h-full flex flex-col">
      {/* Logo */}
      <div className="px-8 pt-8 pb-6">
        <div className="">
          <Link href="/">
            <span className="text-xl font-semibold text-gray-900">
              <Image src="/Logo.png" alt="logo" width={218} height={31} />
            </span>
          </Link>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-6 space-y-4 mt-8">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          // /pv-bess도 대시보드(/) 메뉴를 활성화
          const isActive = pathname === item.href ||
            (item.href === '/' && pathname === '/pv-bess');
          
          return (
            <Link
              key={index}
              href={item.href}
              className={clsx(
                'w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200',
                isActive
                  ? 'bg-[rgba(255,115,0,0.05)] border border-[#e4e4e7] text-[#ff7300]'
                  : 'text-[#9096a2] hover:bg-gray-50'
              )}
            >
              <Icon className="w-6 h-6" />
              <span className="font-medium text-base tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="px-6 pb-8">
        <Link
          href="/settings"
          className={clsx(
            'w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200',
            pathname === '/settings'
              ? 'bg-[rgba(255,115,0,0.05)] border border-[#e4e4e7] text-[#ff7300]'
              : 'text-[#9096a2] hover:bg-gray-50'
          )}
        >
          <Settings className="w-6 h-6" />
          <span className="font-medium text-base tracking-tight">설정</span>
        </Link>
      </div>
    </aside>
  );
}
