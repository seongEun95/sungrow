# PMS 모니터링 대시보드

Figma 디자인을 기반으로 구현된 에너지 관리 시스템(PMS) 모니터링 대시보드입니다.

## 🚀 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Charts**: Recharts 3.7 (무료, 고퀄리티, 애니메이션 지원)
- **Icons**: Lucide React
- **Font**: Pretendard (한글 최적화)

## ✨ 주요 기능

### 1. 컴포넌트 구조
- **Sidebar**: 왼쪽 네비게이션 메뉴
- **Navbar**: 상단 헤더 (언어 선택, 사용자 정보)
- **EnergyInfoCard**: 에너지 저장 정보 카드
- **SystemInfoCard**: 시스템 정보 카드
- **PowerChart**: 전력량 선 그래프 (왼쪽→오른쪽 애니메이션)
- **SOCChart**: 충전 상태 영역 그래프 (아래→위 애니메이션)
- **WeeklyBarChart**: 지난 7일간 운영 현황 막대 그래프 (아래→위 애니메이션)
- **SystemDiagram**: 발전소/설비 개요 다이어그램

### 2. 애니메이션
- **막대 그래프**: 아래에서 위로 성장 (1200ms)
- **영역 그래프**: 아래에서 위로 채워짐 (1500ms)
- **선 그래프**: 왼쪽에서 오른쪽으로 그려짐 (1500ms)
- **부드러운 전환**: ease-in-out, ease-out 이징 함수 사용

### 3. 디자인 특징
- Figma 디자인 100% 구현
- 반응형 레이아웃
- 한글 폰트 최적화 (Pretendard)
- 깔끔한 UI/UX
- 커스텀 스크롤바

## 📦 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start
```

개발 서버: http://localhost:3000

## 📁 프로젝트 구조

```
pms-web/
├── app/
│   ├── components/
│   │   ├── Sidebar.tsx           # 왼쪽 메뉴
│   │   ├── Navbar.tsx            # 상단 네비게이션
│   │   ├── EnergyInfoCard.tsx    # 에너지 정보 카드
│   │   ├── SystemInfoCard.tsx    # 시스템 정보 카드
│   │   ├── PowerChart.tsx        # 전력량 차트
│   │   ├── SOCChart.tsx          # 충전 상태 차트
│   │   ├── WeeklyBarChart.tsx    # 주간 막대 차트
│   │   └── SystemDiagram.tsx     # 시스템 다이어그램
│   ├── types/
│   │   └── index.ts              # TypeScript 타입 정의
│   ├── globals.css               # 전역 스타일
│   ├── layout.tsx                # 루트 레이아웃
│   └── page.tsx                  # 메인 페이지
├── package.json
└── tsconfig.json
```

## 🎨 색상 팔레트

- **Primary Orange**: #ff7300
- **Yellow**: #ffca28
- **Blue**: #3981f7
- **Green**: #22c55e
- **Grey 100**: #f4f4f5
- **Grey 200**: #e4e4e7
- **Grey 400**: #9096a2
- **Grey 500**: #70707a
- **Black**: #0a112f

## 🔧 커스터마이징

### 차트 데이터 변경
각 차트 컴포넌트 내부의 `data` 상수를 수정하여 표시되는 데이터를 변경할 수 있습니다.

### 애니메이션 속도 조절
차트 컴포넌트의 `animationDuration` 속성을 조절하여 애니메이션 속도를 변경할 수 있습니다.

### 색상 변경
`globals.css` 또는 컴포넌트 내부의 색상 값을 수정하여 테마를 변경할 수 있습니다.

## 📝 라이선스

MIT License

## 👥 개발자

PMS 개발팀
