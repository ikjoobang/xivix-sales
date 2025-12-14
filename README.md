# X I Λ I X - AI Marketing Revenue Solution Platform

**Total Marketing Solution Partner** - 기술(AI)과 비즈니스를 결합한 마케팅 수익화 솔루션 플랫폼입니다.

> "남들이 'V'(Vision)를 볼 때, 우리는 세상을 뒤집어 '∧'(Angle)를 봅니다."

## 🌐 Live URLs

- **Preview**: https://3000-io6ldv3e0l3jt6e1thqwf-2e77fc33.sandbox.novita.ai
- **Production**: Cloudflare Pages 배포 후 업데이트 예정
- **Admin Dashboard**: `/admin`

## ✅ 완료된 기능

### 1. Premium UI/UX Design
- **Shader Background**: studiojuai.club 스타일 Live Shader 배경 (움직이는 Orb 3개)
- **Dark Mode Only**: 검정(#000000) 배경 + 흰색 텍스트
- **Typography**: Pretendard Variable (KR) + Syncopate (EN 슬로건)
- **Glassmorphism**: blur(24px) + 반투명 유리 효과
- **Premium Animations**: cubic-bezier 기반 reveal, hover, transition 효과

### 2. 3-Step Quote Builder (견적 빌더)
- **Step 1 - 마케팅 베이스 구축**
  - TYPE A (150만원): 랜딩형 - DB수집 최적화
  - TYPE B (300만원): 스탠다드 브랜딩 - SEO + AI 챗봇 포함 ⭐추천
  - TYPE C (800만원): 하이엔드 솔루션 - 병원/프랜차이즈용

- **Step 2 - 월 매출 부스팅**
  - Grade 1 (110만원/월): 브랜딩 기초 - 채널 최적화
  - Grade 2 (250만원/월): 퍼포먼스 그로스 - 숏폼 알고리즘 공략 ⭐BEST
  - Grade 3 (450만원/월): 지역 장악 마스터 - 압도적 트래픽

- **Step 3 - 애드온 (옵션)**
  - 채널 활성화 트래픽: 10만원/패키지
  - 구매전환 상세페이지: 50만원/건
  - 도파민 숏폼 기획/편집: 15만원/건
  - 플레이스 광고 운영: 30만원/월
  - 유튜브 롱폼 편집: 30만원/건

- **Location Fee**: 서울/경기(무료) vs 지방(+30만원 출장비)

### 3. Critical Business Logic
- ✅ **첫 달 필수 패키지**: Step 1 + Step 2 세트 구매 필수
- ✅ **옵션 잠금**: Step 1, 2 선택 전까지 Step 3 비활성화
- ✅ **실시간 견적 계산**: 하단 고정 바 + 사이드바 카트

### 4. Secure Portfolio Grid
- iframe 기반 실시간 사이트 미리보기
- 투명 Overlay로 클릭/드래그/복사 방지
- 우클릭 차단 + F12/Ctrl+Shift+I/Ctrl+U 차단
- sandbox 속성 보안 강화

### 5. AI Sales Consultant (챗봇)
- **Gemini API** 연동 (데모 응답 지원)
- 수석 마케팅 컨설턴트 페르소나
- 컨설팅 프로세스: 질문 → 공감 → 교육 → 제안
- 업종별 맞춤 추천

### 6. Payment System
- **PortOne V2 API** 연동
- `requestPayment` 함수 통합
- 카트 총액 정확히 전달

### 7. SEO/AEO Optimization
- **Schema.org 마크업**
  - Organization (회사 정보)
  - Product (서비스 상품)
  - FAQPage (자주 묻는 질문)
- 메타 태그 최적화

## 🔧 API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | 메인 세일즈 페이지 |
| GET | `/admin` | 관리자 대시보드 |
| GET | `/api/portfolios` | 포트폴리오 목록 JSON |
| GET | `/api/pricing` | 가격 정책 JSON |
| POST | `/api/chat` | AI 챗봇 대화 |
| POST | `/api/payment/prepare` | 결제 준비 (주문 ID 생성) |

## 🚀 배포 가이드

### 1. 환경 변수 설정
```bash
# Gemini API Key (AI 챗봇용)
npx wrangler secret put GEMINI_API_KEY

# PortOne 결제 연동
npx wrangler secret put PORTONE_STORE_ID
npx wrangler secret put PORTONE_CHANNEL_KEY
```

### 2. Cloudflare Pages 배포
```bash
npm run build
npx wrangler pages deploy dist --project-name xilix-sales
```

## 💻 로컬 개발

```bash
# 의존성 설치
npm install

# 빌드
npm run build

# 개발 서버 (PM2)
pm2 start ecosystem.config.cjs

# 로그 확인
pm2 logs --nostream

# 직접 실행
npm run dev:sandbox
```

## 📁 프로젝트 구조

```
webapp/
├── src/
│   └── index.tsx         # Hono 앱 (API + SSR)
├── public/
│   └── static/           # 정적 파일
├── dist/                 # 빌드 출력
├── ecosystem.config.cjs  # PM2 설정
├── wrangler.jsonc        # Cloudflare 설정
├── vite.config.ts        # Vite 빌드 설정
└── package.json
```

## 🎨 Design System

| Element | Value |
|---------|-------|
| Background | #000000 (Pure Black) |
| Text | #FFFFFF (White) |
| Glass | rgba(255,255,255,0.015) + blur(24px) |
| Font (KR) | Pretendard Variable |
| Font (EN) | Syncopate |
| Animation | cubic-bezier(0.16, 1, 0.3, 1) |

## 📊 Data Model

### Cart State
```typescript
{
  setup: 'type-a' | 'type-b' | 'type-c' | null,
  monthly: 'grade-1' | 'grade-2' | 'grade-3' | null,
  addons: string[],
  location: 'loc-seoul' | 'loc-local'
}
```

## 📋 향후 개발 계획

1. **SMMKing API 연동** - 채널 트래픽 부스팅 자동화
2. **D1 Database** - 결제/계약 내역 저장
3. **Webhook 처리** - 결제 완료 알림
4. **Analytics** - 전환율 트래킹

## 🔒 Security Features

- ✅ 우클릭 방지
- ✅ 개발자 도구 차단 (F12, Ctrl+Shift+I)
- ✅ 소스보기 차단 (Ctrl+U)
- ✅ 텍스트 선택 방지
- ✅ iframe sandbox
- ✅ Portfolio 보안 Overlay

---

**© 2024 X I Λ I X. All rights reserved.**

*웹사이트 제작사가 아닙니다. Total Marketing Solution Partner.*
