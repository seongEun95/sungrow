'use client';

export interface InfoCardItem {
  label: string;
  value: string;
  bold?: boolean;
}

export interface InfoCardProps {
  title: string;
  items: InfoCardItem[];
  twoColumn?: boolean;
}

export default function InfoCard({ title, items, twoColumn = false }: InfoCardProps) {
  return (
    <div
      className="rounded-xl bg-white shadow-md"
      style={{
        border: '2px solid #f5a623',
        minWidth: twoColumn ? '180px' : '130px',
        padding: '10px 14px',
      }}
    >
      {/* 카드 제목 */}
      <div className="font-bold text-sm mb-2" style={{ color: '#f5a623' }}>
        {title}
      </div>

      {/* 내용 */}
      {twoColumn ? (
        <div className="flex gap-4">
          {items.map((item, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-[#333] text-xs">{item.label}</span>
              <span className="font-bold text-[#0a112f] text-sm">{item.value}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col">
          {items.map((item, idx) => (
            <div key={idx}>
              <span className="text-[#333] text-xs block">{item.label}</span>
              <span className="font-bold text-[#0a112f] text-sm block">{item.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
