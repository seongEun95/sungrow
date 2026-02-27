# PMS 모니터링 대시보드 - 업데이트 내역

## 🆕 추가된 기능

### 1. Device Monitoring 페이지
- **경로**: `/device-monitoring`
- **구성 요소**:
  - 듀얼 Y축 차트 (Total active power / Online SOC)
  - Unit overview 리스트 (15개 항목, 스크롤 가능)
  - PCS / Rack management unit (탭 전환, 각각 15개/12개 항목)

### 2. 새로운 컴포넌트

#### DualAxisChart.tsx
- 좌측 Y축: Total active power (kW)
- 우측 Y축: Online SOC (%)
- 2개의 라인 (오렌지, 노란색)
- 왼쪽→오른쪽 애니메이션 (1500ms)

#### UnitOverview.tsx
- 15개의 상태 항목 (Open/Closed/Offline)
- 스크롤 가능한 리스트
- 상태별 색상 표시:
  - 🟢 Open (Green)
  - 🔴 Closed (Red)
  - ⚫ Offline (Gray)

#### RackManagement.tsx
- 탭 전환: PCS / Rack management unit
- PCS: 15개 항목
- Rack: 12개 항목
- 각 항목별 상태 표시

### 3. 라우팅 시스템
- Next.js App Router 활용
- Sidebar에 Link 컴포넌트 적용
- 현재 페이지 하이라이트
- usePathname 훅으로 활성 메뉴 표시

### 4. 스타일 개선

#### 전역 스타일
- 커스텀 스크롤바 (6px, 회색, 부드러운 디자인)
- 모든 텍스트 영문 변환
- 일관된 색상 시스템

#### 간격 조정
- Dashboard 페이지: `p-9`, `gap-9`, `space-y-7`
- Device monitoring 페이지: `p-8`, `gap-6`
- 카드 내부 여백 통일: `p-6`
- 리스트 아이템: `p-3.5`, `rounded-xl`

#### 타이포그래피
- 제목: `text-xl font-bold text-[#0a112f]`
- 본문: `text-sm text-[#0a112f]`
- 보조 텍스트: `text-[14px] text-[#70707a]`

### 5. 다국어 대응
- 모든 텍스트 영문 전환
- Navbar 언어 표시: ENGLISH
- 사용자 정보: manager / Safety manager

## 📁 새로운 파일 구조

```
app/
├── device-monitoring/
│   └── page.tsx                    # Device monitoring 페이지
├── components/
│   ├── Sidebar.tsx                 # 업데이트: 라우팅 지원
│   ├── Navbar.tsx                  # 업데이트: 동적 타이틀
│   ├── DualAxisChart.tsx           # 신규: 듀얼 Y축 차트
│   ├── UnitOverview.tsx            # 신규: Unit 리스트
│   └── RackManagement.tsx          # 신규: PCS/Rack 탭
└── ...
```

## 🎨 디자인 시스템

### 색상 팔레트 (업데이트)
```css
/* Primary Colors */
--orange: #ff7300        /* 주요 색상 */
--yellow: #ffca28        /* 보조 색상 */
--blue: #3981f7          /* 정보 */
--green: #22c55e         /* 성공 / Open */
--red: #ef4444           /* 위험 / Closed */

/* Text Colors */
--text-primary: #0a112f  /* 제목 */
--text-secondary: #70707a /* 보조 텍스트 */
--text-tertiary: #9096a2  /* 비활성 */

/* Background Colors */
--bg-primary: #ffffff    /* 카드 배경 */
--bg-secondary: #f4f4f5  /* 페이지 배경 */
--border: #e4e4e7        /* 테두리 */
```

### 상태 표시
- **Open**: 🟢 `bg-green-500` (#22c55e)
- **Closed**: 🔴 `bg-red-500` (#ef4444)
- **Offline**: ⚫ `bg-gray-400` (#9ca3af)

## 🚀 실행 방법

```bash
# 개발 서버 (이미 실행 중)
pnpm dev

# Dashboard 페이지
http://localhost:3000

# Device monitoring 페이지
http://localhost:3000/device-monitoring
```

## ✅ 완료 사항

- ✅ Device monitoring 페이지 구현
- ✅ 듀얼 Y축 차트 (Recharts 사용)
- ✅ Unit overview 리스트 (15개 항목, 스크롤)
- ✅ PCS/Rack management (탭 + 리스트)
- ✅ 라우팅 시스템 구축
- ✅ 모든 텍스트 영문 전환
- ✅ 간격 및 padding 조정
- ✅ 스크롤바 스타일링
- ✅ 상태 뱃지 컴포넌트

## 📝 다음 단계 제안

1. **API 연동**
   - 실제 장비 데이터 연동
   - WebSocket으로 실시간 업데이트

2. **추가 페이지**
   - Device maintenance
   - Device start/stop
   - Energy management
   - Power control
   - History data

3. **기능 개선**
   - 검색 및 필터링
   - 데이터 정렬
   - 페이지네이션
   - 상세 정보 모달

4. **성능 최적화**
   - 가상 스크롤링 (react-window)
   - 데이터 캐싱 (SWR/React Query)
   - 이미지 최적화
