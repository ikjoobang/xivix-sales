# X I Λ I X - High-End Bento Grid Platform

**Business × Technology** - 기술(AI)과 비즈니스를 결합한 마케팅 수익화 솔루션

## 🌐 Live Preview

**https://3000-io6ldv3e0l3jt6e1thqwf-2e77fc33.sandbox.novita.ai**

---

## ✅ 구현 완료 (쮸쌤 체크포인트)

### 1️⃣ Bento Grid 레이아웃
- **Hero Box (2x2)**: "XIΛIX" + "Business × Technology"
- **AI Director Box (1x1)**: 실시간 타이핑 인디케이터 + 메시지 순환 → 클릭 시 Chat Interface
- **Service & Plans Box (1x1)**: 3가지 패키지 미리보기 + 3D Tilt Effect → 클릭 시 Pricing View
- **Showcase Box (2x1)**: 12개 포트폴리오 자동 스크롤 마퀴 캐러셀
- **Contact Box (2x1)**: Call + Email 버튼

### 2️⃣ 포트폴리오 12개 (정확히 주입됨)
| # | Title | URL | Tag |
|---|-------|-----|-----|
| 1 | Studio JuAi Main | https://www.studiojuai.com/ | Branding |
| 2 | Aura Kim | https://aurakim.com | Personal |
| 3 | Bon Life | https://www.thebonlife.kr/ | Commerce |
| 4 | Amanna Hair | https://www.amanna.hair/ | Beauty |
| 5 | Studio JuAi Club | https://studiojuai.club/ | Vibe |
| 6 | Tax JupJup | https://tax-jupjup.pages.dev/ | Landing |
| 7 | Beauty Page | https://studiojuai-beauty.pages.dev/ | Beauty |
| 8 | AutoFlow AI | https://autoflow-ai.pages.dev/ | AI Tech |
| 9 | Pro Dashboard | https://studio-juai-pro.vercel.app/dashboard | System |
| 10 | Super Agent | https://super-agent-platform-81rs66tw1-ikjoobang-2128s-projects.vercel.app/ | Platform |
| 11 | Consultant V1 | https://studioju-consultant.netlify.app/ | Consulting |
| 12 | E-Book | https://studiojuai-ebook.pages.dev/ | Content |

### 3️⃣ 가격 정책 (3개 세트 패키지)
| ID | 패키지명 | 가격 | 설명 |
|----|----------|------|------|
| landing | 소상공인 실속 패키지 | ₩1,800,000 | 1인 샵/이벤트용 빠른 시작 |
| standard | 스탠다드 성장 패키지 ⭐BEST | ₩3,500,000 | 지역 1등을 위한 브랜딩 필수코스 |
| premium | 하이엔드/병원 마스터 | ₩8,000,000 | 결제/예약/CRM까지 포함된 토탈 솔루션 |

### 4️⃣ 지역별 출장비
- **서울/경기**: 무료
- **지방**: +300,000원

### 5️⃣ Hidden Admin 모드
- **트리거**: Pricing View에서 "PRICING" 타이틀 5회 클릭
- **기능**: 맞춤 가격 입력 (고객명 + 금액) → 즉시 PortOne 결제

### 6️⃣ WebGL Fluid Shader 배경
- GLSL 기반 연기/물결 효과
- 마우스 움직임에 반응
- Simplex Noise + FBM 알고리즘

---

## 🔧 API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Bento Grid 메인 페이지 |
| GET | `/admin` | 관리자 대시보드 |
| GET | `/api/portfolios` | 12개 포트폴리오 JSON |
| GET | `/api/packages` | 3개 패키지 JSON |
| POST | `/api/chat` | AI Director 대화 |
| POST | `/api/payment/prepare` | 결제 준비 (패키지/맞춤) |

---

## 🚀 배포

### 환경변수 설정
```bash
npx wrangler secret put GEMINI_API_KEY
npx wrangler secret put PORTONE_STORE_ID
npx wrangler secret put PORTONE_CHANNEL_KEY
```

### Cloudflare Pages 배포
```bash
npm run build
npx wrangler pages deploy dist --project-name xilix-sales
```

---

## 🎯 쮸쌤 확인 사항

1. ✅ **배경 움직임**: 마우스 이동 시 배경 반응
2. ✅ **포트폴리오 캐러셀**: 12개 링크 무한 스크롤
3. ✅ **패키지 카드 3개**: 180만/350만/800만
4. ✅ **지역 토글**: 서울/경기 vs 지방(+30만)
5. ✅ **히든 가격 입력**: PRICING 5회 클릭

---

**© 2024 X I Λ I X. All rights reserved.**
