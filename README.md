# X I Λ I X - AI Sales Platform

AI 기반 마케팅 에이전시 **'Combine Technology & Business (X I Λ I X)'**의 자동화된 세일즈 플랫폼입니다.

## 🌐 Live URLs

- **Preview**: https://3000-io6ldv3e0l3jt6e1thqwf-2e77fc33.sandbox.novita.ai
- **Production**: 배포 후 업데이트 예정
- **Admin Dashboard**: `/admin`

## ✅ 완료된 기능

### 1. Hero & Branding
- Live Shader 배경 (움직이는 Orb 효과)
- 검정 배경 + 흰색 텍스트의 하이엔드 UI
- Glassmorphism 디자인 시스템
- 스크롤 Reveal 애니메이션

### 2. 진단(Diagnosis) 플로우
- Step 1: 사업 단계 선택 (오픈 준비/매출 정체/브랜딩 확장)
- Step 2: 주요 고민 선택 (신규 고객/재방문/온라인 인지도)
- 맞춤 추천 조합 제시

### 3. 포트폴리오 (보안 강화)
- iframe 기반 실시간 미리보기
- 투명 Overlay로 클릭/드래그 방지
- 우클릭 차단
- F12/Ctrl+Shift+I 개발자 도구 차단
- sandbox 속성으로 보안 강화

### 4. 견적 빌더 (Step-by-Step)
- **Step 1 - 초기 구축비**
  - TYPE A (150만원): 랜딩페이지형
  - TYPE B (300만원): 스탠다드 브랜딩형 ⭐추천
  - TYPE C (800만원): 하이엔드 프리미엄형

- **Step 2 - 월 마케팅 관리비**
  - Grade 1 (110만원/월): 브랜딩 베이직
  - Grade 2 (250만원/월): 퍼포먼스 그로스 ⭐BEST
  - Grade 3 (450만원/월): 토탈 마스터

- **Step 3 - 옵션**
  - 상세페이지 기획/제작: 50만원/건
  - 플레이스 초기 세팅: 30만원/1회
  - 플레이스 광고 관리: 30만원/월
  - 유튜브 롱폼 편집: 30만원/건
  - 숏폼 기획/제작: 15만원/건
  - Social Credibility: 10만원/패키지
  - 지방 출장비: +30만원

### 5. AI Sales Consultant (챗봇)
- Gemini API 연동
- 수석 영업 이사 페르소나
- 컨설팅 스타일 대화 (질문→공감→교육→제안)
- 데모 응답 지원 (API 키 없을 때)

### 6. 결제 시스템
- PortOne V2 API 연동
- 실시간 견적 계산
- 첫 달 결제 금액 = 초기 구축비 + 월 관리비 + 옵션

### 7. SEO/Schema.org
- Organization 스키마
- Product/Offer 스키마
- 메타 태그 최적화

### 8. Admin Dashboard
- `/admin` 경로로 접근
- 결제 내역 조회 UI (데이터 연동 필요)

## 🔧 API 엔드포인트

| Method | Path | 설명 |
|--------|------|------|
| GET | `/` | 메인 페이지 |
| GET | `/admin` | 관리자 대시보드 |
| GET | `/api/portfolios` | 포트폴리오 목록 |
| GET | `/api/pricing` | 가격 정책 데이터 |
| POST | `/api/chat` | AI 챗봇 대화 |
| POST | `/api/payment/prepare` | 결제 준비 |

## 🚀 배포 전 필요 설정

### 1. Gemini API Key
```bash
npx wrangler secret put GEMINI_API_KEY
# Google AI Studio에서 발급받은 API 키 입력
```

### 2. PortOne (KG이니시스) 설정
```bash
npx wrangler secret put PORTONE_STORE_ID
npx wrangler secret put PORTONE_CHANNEL_KEY
```

PortOne 콘솔에서:
1. 가맹점 등록
2. Store ID 확인
3. 결제 채널(KG이니시스) 추가 후 Channel Key 확인

### 3. Cloudflare 배포
```bash
# API 키 설정 후
npx wrangler pages deploy dist --project-name xilix-sales
```

## 💻 로컬 개발

```bash
# 설치
npm install

# 빌드
npm run build

# 개발 서버
npm run dev:sandbox

# PM2 사용
pm2 start ecosystem.config.cjs
```

## 📁 프로젝트 구조

```
webapp/
├── src/
│   └── index.tsx         # Hono 앱 (API + HTML 렌더링)
├── public/
│   └── static/
│       ├── app.js        # 클라이언트 JS (보안, 애니메이션)
│       └── styles.css    # 추가 CSS
├── dist/                 # 빌드 출력
├── ecosystem.config.cjs  # PM2 설정
├── wrangler.jsonc        # Cloudflare 설정
├── package.json
└── README.md
```

## 🔒 보안 기능

- ✅ 우클릭 방지
- ✅ F12 개발자 도구 차단
- ✅ Ctrl+Shift+I 차단
- ✅ Ctrl+U (소스보기) 차단
- ✅ 텍스트 선택 방지 (no-select 클래스)
- ✅ 드래그 방지
- ✅ iframe sandbox 속성
- ✅ 포트폴리오 투명 Overlay

## 📊 데이터 모델

### Cart State
```javascript
{
  setup: 'type-a' | 'type-b' | 'type-c' | null,
  monthly: 'grade-1' | 'grade-2' | 'grade-3' | null,
  addons: string[],  // 선택된 옵션 ID 배열
  location: 'loc-seoul' | 'loc-local'
}
```

### Chat Context
```javascript
[
  { role: 'user', content: '...' },
  { role: 'assistant', content: '...' }
]
```

## 🎨 디자인 시스템

- **Primary Color**: White (#FFFFFF)
- **Background**: Dark (#0A0A0A, #111111)
- **Accent**: Glassmorphism (rgba(255,255,255,0.03))
- **Font**: Noto Sans KR
- **Animation**: CSS transitions + Intersection Observer

## 📋 미구현 / 향후 작업

1. **결제 완료 후 처리**
   - 결제 완료 Webhook 수신
   - D1 Database 연동 (결제 내역 저장)
   - Admin Dashboard 실제 데이터 연동

2. **회원 시스템**
   - 고객 로그인/회원가입
   - 견적 저장 기능

3. **알림 시스템**
   - 결제 완료 시 이메일/카카오톡 알림
   - 관리자 알림

4. **분석 도구**
   - Google Analytics 연동
   - 전환율 트래킹

## 📞 연락처

- **Brand**: X I Λ I X (XIΛIX)
- **Slogan**: "남들이 'V'(Vision)를 볼 때, 우리는 세상을 뒤집어 '∧'(Angle)를 봅니다."

---

© 2024 X I Λ I X. All rights reserved.
