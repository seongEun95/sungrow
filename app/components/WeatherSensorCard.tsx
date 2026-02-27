'use client';

// 기상 센서 정보 mock 데이터
const weatherData = [
  { label: '경사일사량', value: '452', unit: 'W/m²' },
  { label: '수평일사량', value: '330', unit: 'W/m²' },
  { label: '모듈온도', value: '25.2', unit: '°C' },
  { label: '외기온도', value: '16.0', unit: '°C' },
];

export default function WeatherSensorCard() {
  return (
    <div className="border border-[#e4e4e7] rounded-2xl p-5 bg-white">
      <h2 className="text-base font-bold text-[#0a112f] mb-3">기상 센서 정보</h2>

      <div className="grid grid-cols-2 gap-2">
        {weatherData.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-4 py-3 bg-[#fff4eb] rounded-2xl"
          >
            <span className="text-[14px] font-medium text-[#333] ">{item.label}</span>
            <span className="text-[14px] font-bold text-[#0a112f] ">
              {item.value}
              <span className="text-[14px] font-medium text-[#333] ml-1">{item.unit}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
