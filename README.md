# X I Λ I X - AI Marketing Revenue Solution Platform

**Total Marketing Solution Partner** - 기술(AI)과 비즈니스를 결합한 마케팅 수익화 솔루션 플랫폼입니다.

> "남들이 'V'(Vision)를 볼 때, 우리는 세상을 뒤집어 '∧'(Angle)를 봅니다."

## 🌐 Live URLs

- **Preview**: https://3000-io6ldv3e0l3jt6e1thqwf-2e77fc33.sandbox.novita.ai
- **Production**: Cloudflare Pages 배포 후 업데이트 예정
- **Admin Dashboard**: `/admin`

## ✅ 완료된 기능 (최신 업데이트)

### 1. 🌊 WebGL Fluid Background (Visual Revolution)
- **GLSL Shader 기반** 마우스 반응형 물결/연기 효과
- **Fractal Brownian Motion (FBM)** 알고리즘 적용
- **Simplex Noise** 기반 유기적 움직임
- 마우스 위치에 따라 배경이 살아 숨쉬는 효과
- WebGL 미지원 시 CSS fallback 자동 적용

### 2. 🎯 4개 완성형 세트 패키지 (Set Menu Strategy)
**"이거 하나면 끝"** - 구축 + 관리 + 트래픽 올인원

| 패키지 | 이름 | 첫 달 가격 | 2달째~ 월 관리비 |
|--------|------|-----------|----------------|
| **A** | THE LANDING SET (소상공인 실속) | ₩1,800,000 | ₩500,000 |
| **B** | THE STANDARD SET (스탠다드 성장) ⭐BEST | ₩3,500,000 | ₩1,100,000 |
| **C** | THE BRANDING SET (하이엔드 브랜딩) | ₩5,000,000 | ₩2,500,000 |
| **D** | THE PREMIUM SET (병원/프랜차이즈) | ₩8,000,000 | ₩4,500,000 |

**각 패키지 포함 내역:**
- **구축**: 웹사이트 디자인 + 개발
- **관리**: 1개월 마케팅 운영
- **SEO/트래픽**: 기본 SEO 또는 초기 트래픽 부스팅

### 3. 🔐 Secret Consultant Mode (히든 기능)
- **트리거**: 푸터 "XIΛIX" 로고 **5번 빠르게 클릭**
- **기능**: 대면 협의 금액 직접 입력 창
- **작동**: 고객명 + 협의 금액 입력 → 즉시 PortOne 결제창 생성
- **용도**: 대면 상담 후 협의된 맞춤 가격 결제

### 4. 🎬 Premium Animations (Framer Motion Style)
- **Reveal Animation**: 스크롤 시 요소들이 부드럽게 등장
- **Stagger Effect**: 자식 요소들이 순차적으로 나타남
- **Parallax Scroll**: 배경 요소 시차 효과
- **Hover Interactions**: 카드 hover 시 translateY + scale + shadow

### 5. 💎 Glassmorphism UI
- `backdrop-filter: blur(24px) saturate(1.2)`
- 반투명 유리 카드 + 미세한 보더
- 호버 시 강화된 글로우 효과
- `cubic-bezier(0.16, 1, 0.3, 1)` 프리미엄 이징

### 6. ✨ Premium Typography
- **Korean**: Pretendard Variable
- **English/Display**: Syncopate
- Letter-spacing, line-height 세밀 조정

### 7. 🤖 AI Sales Consultant (챗봇)
- **Gemini API** 연동 (데모 응답 지원)
- 4개 패키지 중심 추천 로직
- 업종별 맞춤 컨설팅 멘트

### 8. 💳 Payment System
- **PortOne V2 API** 연동
- 패키지 선택 → 확인 → 즉시 결제
- Secret Mode 맞춤 금액 결제

### 9. 🔒 Security Features
- 우클릭 방지 + 개발자 도구 차단
- Portfolio iframe 보안 overlay
- 텍스트 선택/드래그 방지

## 🔧 API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | 메인 세일즈 페이지 |
| GET | `/admin` | 관리자 대시보드 |
| GET | `/api/portfolios` | 포트폴리오 목록 JSON |
| GET | `/api/packages` | 4개 패키지 정보 JSON |
| POST | `/api/chat` | AI 챗봇 대화 |
| POST | `/api/payment/prepare` | 결제 준비 (패키지 또는 맞춤 금액) |

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
```

## 📁 프로젝트 구조

```
webapp/
├── src/
│   └── index.tsx         # Hono 앱 (API + SSR + WebGL Shader)
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
| Background | WebGL Fluid Shader (dark smoke/fluid) |
| Fallback BG | #000000 + gradient |
| Text | #FFFFFF |
| Glass | rgba(255,255,255,0.015) + blur(24px) |
| Font (KR) | Pretendard Variable |
| Font (EN) | Syncopate |
| Animation | cubic-bezier(0.16, 1, 0.3, 1) |

## 🎯 Key User Checkpoints

사용자(쮸쌤)가 확인해야 할 핵심 포인트:

1. **✅ 배경 움직임**: WebGL Fluid 배경이 마우스에 반응하는지
2. **✅ 패키지 카드 4개**: A(Landing), B(Standard), C(Branding), D(Premium)
3. **✅ 히든 결제창**: 푸터 로고 5번 클릭 시 관리자 가격 입력창 등장

## 📋 향후 개발 계획

1. **D1 Database** - 결제/계약 내역 저장
2. **Webhook 처리** - 결제 완료 알림
3. **Analytics** - 전환율 트래킹
4. **패키지 커스터마이징** - 애드온 옵션 추가

---

**© 2024 X I Λ I X. All rights reserved.**

*웹사이트 제작사가 아닙니다. Total Marketing Solution Partner.*
