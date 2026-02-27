# 개발 가이드

## 프로젝트 구조

### 컴포넌트 설명

#### 레이아웃 컴포넌트
- **Sidebar**: 왼쪽 네비게이션 메뉴 (280px 고정 너비)
- **Navbar**: 상단 헤더 (언어 선택, 사용자 정보 표시)

#### 카드 컴포넌트
- **EnergyInfoCard**: 에너지 저장 정보 (4개 항목 그리드)
- **SystemInfoCard**: 시스템 정보 (bullet 리스트)

#### 차트 컴포넌트
- **PowerChart**: 전력량 선 그래프
  - 2개의 선 (계통 전력, ESS 전력)
  - 애니메이션: 왼쪽→오른쪽 (1500ms)
  
- **SOCChart**: 충전 상태 영역 그래프
  - 영역 그래프 (area chart)
  - 애니메이션: 아래→위 (1500ms)
  - 그라디언트 채우기
  
- **WeeklyBarChart**: 주간 운영 현황 막대 그래프
  - 2개의 막대 (충전량, 방전량)
  - 애니메이션: 아래→위 (1200ms)
  
- **SystemDiagram**: 시스템 다이어그램
  - SVG로 연결선 표시
  - 3개의 주요 노드 (계통, 부하, ESS)

## 데이터 구조

### 차트 데이터 형식

```typescript
// PowerChart
interface PowerData {
  time: string;    // "10:00:00"
  grid: number;    // 0-1
  ess: number;     // 0-1
}

// SOCChart
interface SOCData {
  time: string;    // "10:00"
  value: number;   // 0-20
}

// WeeklyBarChart
interface WeeklyData {
  date: string;    // "01/13"
  charge: number;  // kWh
  discharge: number; // kWh
}
```

## 스타일링 가이드

### 색상 팔레트
```css
--orange-primary: #ff7300
--yellow-primary: #ffca28
--blue-primary: #3981f7
--green-primary: #22c55e
--grey-100: #f4f4f5
--grey-200: #e4e4e7
--grey-400: #9096a2
--grey-500: #70707a
--black: #0a112f
```

### 간격 시스템
- 작은 간격: 8px (gap-2)
- 중간 간격: 16px (gap-4)
- 큰 간격: 24px (gap-6)
- 매우 큰 간격: 32px (gap-8)

### 테두리
- 카드 테두리: 1px solid #e4e4e7
- 둥근 모서리: 16px (rounded-2xl)

## 애니메이션 설정

### Recharts 애니메이션
```tsx
// 선 그래프 (왼쪽→오른쪽)
<Line 
  animationDuration={1500}
  animationBegin={0}
  animationEasing="ease-in-out"
/>

// 막대 그래프 (아래→위)
<Bar 
  animationDuration={1200}
  animationBegin={0}
  animationEasing="ease-out"
/>

// 영역 그래프 (아래→위)
<Area 
  animationDuration={1500}
  animationBegin={0}
  animationEasing="ease-in-out"
/>
```

## 반응형 디자인

### 브레이크포인트
- Desktop: 1920px 이상 (기본)
- Tablet: 768px - 1919px
- Mobile: 768px 미만

### 고려사항
- Sidebar는 모바일에서 숨김
- 차트는 자동으로 반응형 (ResponsiveContainer)
- 그리드는 모바일에서 1열로 변경

## 성능 최적화

### 차트 렌더링
- `isMounted` 패턴으로 SSR 방지
- `useMemo`로 데이터 캐싱 (필요시)
- 차트 데이터 업데이트는 최소화

### 이미지 최적화
- Next.js Image 컴포넌트 사용
- 적절한 사이즈로 로드

## API 연동 가이드

차트 데이터를 API로 받아오려면:

```tsx
// 예시: PowerChart.tsx
const [data, setData] = useState([]);

useEffect(() => {
  async function fetchData() {
    const response = await fetch('/api/power-data');
    const json = await response.json();
    setData(json);
  }
  fetchData();
}, []);
```

## 배포

```bash
# 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start
```

빌드된 파일은 `.next` 폴더에 생성됩니다.
