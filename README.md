# X I Λ I X - ProVisual Style UI/UX

**Business x Technology** - AI 기반 통합 마케팅 솔루션 플랫폼

## Live Preview

**Sandbox**: https://3000-io6ldv3e0l3jt6e1thqwf-2e77fc33.sandbox.novita.ai

**Production**: https://xivix-sales.pages.dev (배포 시)

---

## 완료된 기능

### ProVisual Style UI/UX 리디자인 (2024-12-27)
- **넓고 시원한 레이아웃**: 충분한 여백과 호흡감 있는 디자인
- **정렬된 블록 시스템**: 2열 그리드 기반 카드 레이아웃
- **높은 가독성**: 명확한 타이포그래피 계층 구조
- **부드러운 다크 테마**: 밝은 다크 테마로 눈의 피로 감소
- **PC/모바일 반응형 최적화**: 모든 디바이스에서 최적의 경험

### 핵심 기능
1. **히어로 섹션**: 핵심 가치 제안과 CTA 버튼
2. **서비스 메뉴**: 6개 카테고리 (네이버/인스타/유튜브/틱톡/웹/AI)
3. **4대 블록**: 비즈니스 역량 (유통/글로벌/인증/빅데이터)
4. **포트폴리오**: 다양한 프로젝트 쇼케이스
5. **가격 안내**: GRADE 1/2/3 패키지
6. **AI 입문반**: 수강 신청 (카드/무통장)
7. **AI 챗봇**: 실시간 상담 (Gemini 연동)
8. **소셜 로그인**: 카카오/네이버/구글
9. **결제 시스템**: PortOne 연동
10. **계약서 시스템**: 전자서명 지원

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | 메인 페이지 (ProVisual Style) |
| GET | `/login` | 소셜 로그인 페이지 |
| GET | `/my` | 마이페이지 |
| GET | `/admin` | 관리자 대시보드 |
| GET | `/contract` | 계약서 작성 |
| GET | `/contract/:id` | 계약서 조회 |
| GET | `/api/portfolios` | 포트폴리오 목록 |
| GET | `/api/channel-services` | 채널별 서비스 목록 |
| GET | `/api/marketing-setup` | 마케팅 세트 메뉴 |
| GET | `/api/monthly-grades` | 월간 관리 등급 |
| GET | `/api/set-menus` | 세트 메뉴 |
| GET | `/api/website-packages` | 웹사이트 패키지 |
| GET | `/api/addon-services` | 부가 서비스 |
| GET | `/api/system-dev-options` | 시스템 개발 옵션 |
| GET | `/api/consulting-options` | 컨설팅 옵션 |
| POST | `/api/chat` | AI 챗봇 대화 |
| POST | `/api/booking` | 상담 예약 |
| POST | `/api/questionnaire` | 설문지 저장 |
| POST | `/api/edu-bank-transfer` | 교육 무통장 입금 신청 |

---

## 데이터 구조

### 주요 데이터 모델

1. **포트폴리오**: 카테고리별 분류 (브랜딩/뷰티/커머스/시스템/콘텐츠/랜딩/영상)
2. **채널 서비스**: 플랫폼별 마케팅 서비스 (네이버/인스타/틱톡/유튜브/블로그/구글)
3. **가격 체계**: 세팅비 + 월비용 구조
4. **사용자**: 소셜 로그인 + 추천인 시스템 + VIP 등급
5. **계약서**: 서비스 목록 + 가격 + 전자서명

### 스토리지 서비스

- **Cloudflare D1**: 사용자, 결제, 예약, 계약서 등 관계형 데이터

---

## 기술 스택

- **Frontend**: HTML5 + Tailwind CSS (CDN)
- **Backend**: Hono (TypeScript)
- **Runtime**: Cloudflare Workers
- **Database**: Cloudflare D1
- **AI**: Google Gemini API
- **Payment**: PortOne
- **Auth**: 카카오/네이버/구글 OAuth

---

## 배포

### 환경 변수 설정
```bash
# Cloudflare Secrets
npx wrangler secret put GEMINI_API_KEY
npx wrangler secret put PORTONE_STORE_ID
npx wrangler secret put PORTONE_CHANNEL_KEY
npx wrangler secret put KAKAO_CLIENT_ID
npx wrangler secret put KAKAO_CLIENT_SECRET
npx wrangler secret put NAVER_CLIENT_ID
npx wrangler secret put NAVER_CLIENT_SECRET
npx wrangler secret put GOOGLE_CLIENT_ID
npx wrangler secret put GOOGLE_CLIENT_SECRET
npx wrangler secret put ADMIN_SECRET
```

### Cloudflare Pages 배포
```bash
npm run build
npx wrangler pages deploy dist --project-name xivix-sales
```

---

## 변경 이력

### 2024-12-27
- ProVisual Style UI/UX 전면 리디자인
  - 넓고 시원한 레이아웃
  - 정렬된 블록 그리드 시스템
  - 부드러운 다크 테마
  - PC/모바일 반응형 최적화
  - 가독성 향상

### 이전 버전
- Studio Ju AI 스타일 (다크 네온 + 파티클)
- Bento Grid 레이아웃
- 기본 마케팅 플랫폼 기능

---

**© 2024 컴바인티엔비 | X I Λ I X. All rights reserved.**
