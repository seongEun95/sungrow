'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * 숫자 값에 카운트업 애니메이션을 적용하는 훅
 * value 형식: '125.0 kWh', '0.664 MWh' 등 숫자+단위 문자열
 */
export function useCountUpValue(value: string, duration = 2000): string {
  const [display, setDisplay] = useState('0');
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // 숫자 부분과 단위 부분 분리 (예: '125.0 kWh' -> ['125.0', 'kWh'])
    const match = value.match(/^([\d.]+)\s*(.*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }

    const target = parseFloat(match[1]);
    const unit = match[2];
    const decimals = (match[1].split('.')[1] || '').length;

    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = eased * target;

      setDisplay(`${current.toFixed(decimals)}${unit ? ' ' + unit : ''}`);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [value, duration]);

  return display;
}
