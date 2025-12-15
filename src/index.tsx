import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-pages'
import { setCookie, getCookie, deleteCookie } from 'hono/cookie'

type Bindings = {
  DB: D1Database
  GEMINI_API_KEY?: string
  PORTONE_STORE_ID?: string
  PORTONE_CHANNEL_KEY?: string
  ADMIN_SECRET?: string
  KAKAO_CLIENT_ID?: string
  KAKAO_CLIENT_SECRET?: string
  NAVER_CLIENT_ID?: string
  NAVER_CLIENT_SECRET?: string
  KAKAO_ALIMTALK_KEY?: string
  JWT_SECRET?: string
}

// 세션 사용자 타입
type SessionUser = {
  id: number
  email: string
  name: string
  role: string
  referral_code: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('/api/*', cors())
app.use('/static/*', serveStatic())

// ========================================
// 포트폴리오 데이터 (카테고리별 분류 + 영상 추가)
// ========================================
const PORTFOLIO_DATA = {
  categories: [
    { id: "branding", name: "브랜딩", icon: "fa-gem", color: "#a855f7" },
    { id: "beauty", name: "뷰티", icon: "fa-spa", color: "#ec4899" },
    { id: "commerce", name: "커머스", icon: "fa-shopping-bag", color: "#22d3ee" },
    { id: "system", name: "시스템/AI", icon: "fa-robot", color: "#f97316" },
    { id: "content", name: "콘텐츠", icon: "fa-pen-fancy", color: "#22c55e" },
    { id: "landing", name: "랜딩/SNS", icon: "fa-bullhorn", color: "#8b5cf6" },
    { id: "video", name: "영상", icon: "fa-video", color: "#FF0000" }
  ],
  items: [
    { title: "Studio JuAi Main", url: "https://www.studiojuai.com/", tag: "Branding", category: "branding" },
    { title: "Aura Kim", url: "https://aurakim.com", tag: "Personal", category: "branding" },
    { title: "Studio JuAi Club", url: "https://studiojuai.club/", tag: "Vibe", category: "branding" },
    { title: "Amanna Hair", url: "https://www.amanna.hair/", tag: "Beauty", category: "beauty" },
    { title: "Beauty Page", url: "https://studiojuai-beauty.pages.dev/", tag: "Beauty", category: "beauty" },
    { title: "Bon Life", url: "https://www.thebonlife.kr/", tag: "Commerce", category: "commerce" },
    { title: "Pro Dashboard", url: "https://studio-juai-pro.vercel.app/dashboard", tag: "System", category: "system" },
    { title: "Super Agent", url: "https://super-agent-platform-81rs66tw1-ikjoobang-2128s-projects.vercel.app/", tag: "Platform", category: "system" },
    { title: "AutoFlow AI", url: "https://autoflow-ai.pages.dev/", tag: "AI Tech", category: "system" },
    { title: "Review System", url: "https://studiojuai-rew.netlify.app/", tag: "System", category: "system" },
    { title: "Tarot Reading", url: "https://studioju-tarot.pages.dev/", tag: "Interactive", category: "content" },
    { title: "E-Book Platform", url: "https://studiojuai-ebook.pages.dev/", tag: "Content", category: "content" },
    { title: "Blog V2", url: "https://studioju-blog-v2.netlify.app/", tag: "Blog", category: "content" },
    { title: "Consultant V1", url: "https://studioju-consultant.netlify.app/", tag: "Consulting", category: "content" },
    { title: "Tax JupJup", url: "https://tax-jupjup.pages.dev/", tag: "Landing", category: "landing" },
    { title: "Threads Clone", url: "https://studioju-threads.netlify.app/", tag: "SNS", category: "landing" },
    { title: "Instagram V1", url: "https://studioju-instagra-v1.netlify.app/", tag: "SNS", category: "landing" },
    { title: "YouTube Channel", url: "https://www.youtube.com/@studiojuai_officia", tag: "YouTube", category: "content" },
    { title: "영상 포트폴리오 1", url: "https://www.youtube.com/embed/uGdcbTFJr-8", tag: "YouTube", category: "video", isVideo: true },
    { title: "영상 포트폴리오 2", url: "https://www.youtube.com/embed/eY8eaRRAUkw", tag: "YouTube", category: "video", isVideo: true },
    { title: "영상 포트폴리오 3", url: "https://www.youtube.com/embed/W9lKNFYLhqg", tag: "YouTube", category: "video", isVideo: true },
    { title: "영상 포트폴리오 4", url: "https://www.youtube.com/embed/lUgFqogFMKM", tag: "YouTube", category: "video", isVideo: true },
    { title: "영상 포트폴리오 5", url: "https://www.youtube.com/embed/FLGQUBIt3sw", tag: "YouTube", category: "video", isVideo: true },
    { title: "영상 포트폴리오 6", url: "https://www.youtube.com/embed/f_jyKXq7O0c", tag: "YouTube", category: "video", isVideo: true },
    { title: "영상 포트폴리오 7", url: "https://www.youtube.com/embed/T9muBq1utOU", tag: "YouTube", category: "video", isVideo: true },
    { title: "영상 포트폴리오 8", url: "https://www.youtube.com/embed/df129rlv7yM", tag: "Shorts", category: "video", isVideo: true },
    { title: "영상 포트폴리오 9", url: "https://www.youtube.com/embed/K3UyH6Opicg", tag: "YouTube", category: "video", isVideo: true },
    { title: "영상 포트폴리오 10", url: "https://www.youtube.com/embed/7FiRje1EDrI", tag: "YouTube", category: "video", isVideo: true },
    { title: "영상 포트폴리오 11", url: "https://www.youtube.com/embed/DPkdA8GBhxY", tag: "YouTube", category: "video", isVideo: true },
    { title: "영상 포트폴리오 12", url: "https://www.youtube.com/embed/2AwxXYSOn9g", tag: "YouTube", category: "video", isVideo: true },
    { title: "영상 포트폴리오 13", url: "https://www.youtube.com/embed/1iMTQ56sYUM", tag: "Shorts", category: "video", isVideo: true },
    { title: "영상 포트폴리오 14", url: "https://www.youtube.com/embed/nK7dj4Mxq_g", tag: "YouTube", category: "video", isVideo: true },
    { title: "영상 포트폴리오 15", url: "https://www.youtube.com/embed/R6Of6DrbN14", tag: "YouTube", category: "video", isVideo: true },
    { title: "영상 포트폴리오 16", url: "https://www.youtube.com/embed/okUwi9DuAxI", tag: "Shorts", category: "video", isVideo: true }
  ]
}

// ========================================
// 채널별 서비스 (SEO/AEO/C-RANK/GEO 최적화 기준)
// ========================================
const CHANNEL_SERVICES = [
  {
    category: "naver",
    name: "네이버",
    icon: "fa-solid fa-n",
    color: "#03C75A",
    services: [
      { id: "naver_place", name: "네이버플레이스", setupFee: 590000, monthlyFeeA: 800000, monthlyFeeB: 580000, desc: "지도 최적화 + 리뷰관리 + 키워드모니터링", hasAB: true },
      { id: "naver_set", name: "네이버 광고/톡톡/페이 SET", setupFee: 1000000, monthlyFee: 0, desc: "검색광고+톡톡+페이 통합 세팅 (광고비 별도)", isSet: true, smallNotice: "무리한 트래픽X, 상위노출 제외! 자연스러운 고객유입" }
    ]
  },
  {
    category: "instagram",
    name: "인스타그램",
    icon: "fa-brands fa-instagram",
    color: "#E4405F",
    services: [
      { id: "insta_full", name: "계정 최적화", setupFee: 900000, monthlyFee: 1530000, desc: "SEO/AEO/C-RANK/GEO 최적화 (릴스+피드+카드)" },
      { id: "meta_ad", name: "메타광고", setupFee: 600000, monthlyFee: 0, desc: "타겟광고 세팅 (광고비 별도)", notice: "월관리: 개별상담" },
      { id: "threads", name: "스레드", setupFee: 250000, monthlyFee: 300000, desc: "SEO/AEO/C-RANK/GEO 계정 최적화" }
    ]
  },
  {
    category: "tiktok",
    name: "틱톡",
    icon: "fa-brands fa-tiktok",
    color: "#000000",
    services: [
      { id: "tiktok_full", name: "계정 최적화", setupFee: 1100000, monthlyFee: 880000, desc: "SEO/AEO/C-RANK/GEO 최적화 + 영상제작" }
    ]
  },
  {
    category: "youtube",
    name: "유튜브",
    icon: "fa-brands fa-youtube",
    color: "#FF0000",
    services: [
      { id: "yt_setup", name: "채널 최적화", setupFee: 1300000, monthlyFee: 0, desc: "SEO/AEO/C-RANK/GEO 계정 최적화 셋팅" },
      { id: "yt_short", name: "숏폼 관리", setupFee: 0, monthlyFee: 990000, desc: "쇼츠 기획/편집 + 고퀄리티" },
      { id: "yt_long", name: "롱폼 관리", setupFee: 0, monthlyFee: 2200000, desc: "본편 기획/편집/자막/썸네일/SEO" }
    ]
  },
  {
    category: "blog",
    name: "블로그",
    icon: "fa-solid fa-blog",
    color: "#21A366",
    services: [
      { id: "naver_blog", name: "네이버블로그", setupFee: 400000, monthlyFeeA: 660000, monthlyFeeB: 300000, desc: "SEO/AEO/C-RANK/GEO 계정 최적화", hasAB: true },
      { id: "wordpress", name: "워드프레스", setupFee: 500000, monthlyFee: 450000, desc: "자체 블로그 운영 + SEO + AEO" }
    ]
  },
  {
    category: "google",
    name: "구글",
    icon: "fa-brands fa-google",
    color: "#4285F4",
    services: [
      { id: "google_mybiz", name: "구글 마이비즈니스", setupFee: 500000, monthlyFee: 400000, desc: "구글 지도 등록 + 리뷰관리 + 최적화" },
      { id: "google_ads", name: "구글 광고", setupFee: 600000, monthlyFee: 0, desc: "검색/디스플레이 광고 세팅 (광고비 별도)", notice: "월관리: 개별상담" },
      { id: "google_seo", name: "구글 SEO", setupFee: 800000, monthlyFee: 500000, desc: "웹사이트 구글 검색 최적화" }
    ]
  }
]

// ========================================
// 마케팅 셋팅 비용 (네이버묶음/구글묶음/SNS관리묶음 선택형)
// ========================================
const MARKETING_SETUP = [
  {
    id: "setup_naver",
    name: "네이버 묶음",
    price: 1590000,
    originalPrice: 2090000,
    desc: "네이버 집중 공략 셋팅",
    includes: ["플레이스 셋팅 (59만)", "광고/톡톡/페이 SET (100만)", "운영 가이드북"],
    discount: "50만원 할인",
    category: "naver"
  },
  {
    id: "setup_google",
    name: "구글 묶음",
    price: 1500000,
    originalPrice: 1900000,
    desc: "구글 검색 최적화 셋팅",
    includes: ["마이비즈니스 셋팅 (50만)", "구글 광고 셋팅 (60만)", "구글 SEO 셋팅 (80만)"],
    discount: "40만원 할인",
    category: "google"
  },
  {
    id: "setup_sns",
    name: "SNS 관리 묶음",
    price: 2200000,
    originalPrice: 2850000,
    desc: "인스타+틱톡 통합 셋팅",
    includes: ["인스타그램 계정최적화 (90만)", "틱톡 계정최적화 (110만)", "스레드 셋팅 (25만)", "통합 브랜딩"],
    discount: "65만원 할인",
    recommended: true,
    category: "sns"
  },
  {
    id: "setup_full",
    name: "올인원 풀셋팅",
    price: 4500000,
    originalPrice: 6500000,
    desc: "네이버+구글+SNS+유튜브 전체",
    includes: ["네이버 풀 셋팅", "구글 풀 셋팅", "SNS 풀 셋팅", "유튜브 채널 최적화", "1개월 집중 관리"],
    discount: "200만원 할인",
    category: "full"
  }
]

// ========================================
// 월 관리 GRADE 시스템 (채널별 서비스 기준 재조정)
// ========================================
const MONTHLY_GRADES = [
  {
    id: "basic",
    grade: "GRADE 1",
    name: "베이직",
    subtitle: "신뢰 쌓기",
    price: 880000,
    goal: "검색했을 때 우리 가게가 예쁘고 믿음직스럽게 보이게",
    targetAudience: "오픈 초기 매장, 온라인 관리 처음인 1인 원장님",
    services: [
      "블로그 B형: 기본 포스팅 관리",
      "플레이스 B형: 리뷰 답글, 정보 최적화",
      "스레드: 텍스트 콘텐츠 관리"
    ],
    notIncluded: ["영상 콘텐츠", "광고 운영", "인스타그램 풀관리"],
    color: "cyan"
  },
  {
    id: "performance",
    grade: "GRADE 2",
    name: "퍼포먼스 그로스",
    subtitle: "매출 전환 ⭐",
    price: 1800000,
    goal: "실제 문의와 예약을 늘리고, SNS 알고리즘 태우기",
    targetAudience: "지역 내 경쟁이 치열한 업종 (미용실, 에스테틱, 맛집)",
    recommended: true,
    services: [
      "인스타그램: 릴스+피드+카드 통합관리",
      "플레이스 A형: 적극적 리뷰관리 + 키워드 모니터링",
      "블로그 A형: 상위노출 타겟팅",
      "구글 마이비즈니스: 리뷰관리"
    ],
    notIncluded: ["유튜브", "광고 운영 대행"],
    color: "purple"
  },
  {
    id: "master",
    grade: "GRADE 3",
    name: "토탈 마스터",
    subtitle: "지역 장악 & 팬덤 구축",
    price: 3200000,
    goal: "지역 1등을 넘어 전국구 브랜드/팬덤 구축",
    targetAudience: "이미 지역에서 인지도 있고, 더 큰 성장을 원하는 대표님",
    services: [
      "유튜브 숏폼: 쇼츠 제작 관리",
      "인스타그램: 릴스+피드+카드 풀관리",
      "플레이스 A형 + 블로그 A형",
      "틱톡: 영상 제작 관리",
      "구글: 마이비즈니스 + SEO"
    ],
    notIncluded: ["유튜브 롱폼 (별도)"],
    color: "orange"
  }
]

// ========================================
// 셋트 메뉴 - SNS용 (현실적 가격으로 조정 - 고객 피드백 반영)
// ========================================
const SET_MENUS = [
  {
    id: "sns_starter",
    name: "🔥 SNS 스타터 셋트",
    originalPrice: 1600000,
    price: 1180000,
    monthlyPrice: 880000,
    monthlyGrade: "GRADE 1 베이직",
    includes: ["플레이스 셋팅 (59만)", "스레드 셋팅 (25만)", "GRADE 1 베이직 1개월 (88만)"],
    recommended: "처음 SNS 마케팅 시작하는 분",
    tag: "입문"
  },
  {
    id: "sns_growth",
    name: "⭐ SNS 성장 셋트",
    originalPrice: 3200000,
    price: 2380000,
    monthlyPrice: 1800000,
    monthlyGrade: "GRADE 2 퍼포먼스",
    includes: ["인스타그램 계정 최적화 셋팅 (90만)", "플레이스 셋팅 (59만)", "GRADE 2 퍼포먼스 1개월 (180만)"],
    recommended: "매출 전환이 필요한 사업자",
    tag: "BEST",
    best: true
  },
  {
    id: "sns_viral",
    name: "💎 바이럴 마스터 셋트",
    originalPrice: 5200000,
    price: 3580000,
    monthlyPrice: 1800000,
    monthlyGrade: "GRADE 2 퍼포먼스",
    includes: ["인스타+틱톡 계정 최적화 셋팅", "네이버 묶음 셋팅", "GRADE 2 퍼포먼스 2개월"],
    recommended: "본격적인 바이럴을 원하는 분",
    tag: "프리미엄"
  },
  {
    id: "sns_dominate",
    name: "👑 지역 장악 셋트",
    originalPrice: 7800000,
    price: 4980000,
    monthlyPrice: 3200000,
    monthlyGrade: "GRADE 3 토탈마스터",
    includes: ["올인원 풀셋팅", "GRADE 3 토탈마스터 2개월 (640만)", "유튜브 채널 최적화 (130만)"],
    recommended: "지역 1등을 목표로 하는 분",
    tag: "엔터프라이즈"
  }
]

// ========================================
// 웹사이트 구축 패키지 (500만원-24시간 상담봇, 800만원-영상제작 반영)
// ========================================
const WEBSITE_PACKAGES = [
  {
    id: "landing",
    type: "TYPE A",
    name: "랜딩형",
    subtitle: "전환 집중 원페이지",
    price: 1800000,
    originalPrice: 2500000,
    description: "소상공인, 1인 샵을 위한 빠른 시작",
    includes: ["반응형 원페이지", "기본 SEO 최적화", "모바일 최적화", "1개월 무료 관리"],
    color: "cyan"
  },
  {
    id: "standard",
    type: "TYPE B",
    name: "스탠다드형",
    subtitle: "기업형 브랜딩",
    price: 3000000,
    originalPrice: 4500000,
    description: "성장하는 사업장을 위한 체계적 구축",
    recommended: true,
    includes: ["5페이지 브랜드 웹사이트", "SEO/AEO/GEO 적용", "SNS 연동", "3개월 사후 관리"],
    color: "purple"
  },
  {
    id: "branding",
    type: "TYPE C",
    name: "프리미엄 브랜딩",
    subtitle: "⚡ 24시간 AI 상담봇 포함",
    price: 5000000,
    originalPrice: 8000000,
    description: "AI 상담봇이 고객 문의에 24시간 자동 응대",
    includes: ["무제한 페이지 구축", "스토리텔링 기획", "🤖 AI 상담봇 탑재 (24시간)", "6개월 VIP 관리"],
    color: "orange"
  },
  {
    id: "enterprise",
    type: "TYPE D",
    name: "병원/프랜차이즈",
    subtitle: "🎬 브랜드 영상 제작 + 풀 패키지",
    price: 8000000,
    originalPrice: 15000000,
    description: "브랜드 영상 제작 + AI 상담봇 + 결제/예약 시스템",
    includes: ["🎬 브랜드 영상 3편 제작", "🤖 AI 상담봇 (24시간)", "결제/예약 시스템 연동", "12개월 전담 케어"],
    color: "pink"
  }
]

// ========================================
// 부가 서비스 (브랜드 영상촬영/편집 A/B/C/D형)
// ========================================
const ADDON_SERVICES = [
  { id: "detail_page", name: "상세페이지 디자인", price: 1500000, desc: "스마트스토어/와디즈용 고퀄리티", perUnit: "1건" },
  { id: "commercial_analysis", name: "상권분석 맞춤의뢰", price: 500000, desc: "AI 기반 상권분석 (계약시 환급)", perUnit: "1건" },
  { id: "sns_boost", name: "SNS 부스팅", price: 300000, desc: "팔로워/조회수 부스팅 (광고비 별도)", perUnit: "월" },
  { id: "video_a", name: "브랜드영상 A형", price: 1500000, desc: "숏폼 3편 촬영/편집 (15초~30초)", perUnit: "1회", category: "video" },
  { id: "video_b", name: "브랜드영상 B형", price: 2500000, desc: "숏폼 5편 + 하이라이트 1편", perUnit: "1회", category: "video" },
  { id: "video_c", name: "브랜드영상 C형", price: 4000000, desc: "롱폼 1편 (3분 이내) + 숏폼 3편", perUnit: "1회", category: "video" },
  { id: "video_d", name: "브랜드영상 D형", price: 6000000, desc: "롱폼 2편 + 숏폼 5편 + 광고편집", perUnit: "1회", category: "video" },
  { id: "zoom_consult", name: "🎥 ZOOM 상담", price: 30000, desc: "30분 1:1 화상 마케팅 전략 상담", perUnit: "1회", category: "consultation", highlight: true }
]

// ========================================
// 웹 개발 옵션
// ========================================
const WEB_DEV_OPTIONS = [
  { id: "homepage", name: "홈페이지 (기본)", price: 1500000, desc: "5페이지 기본 웹사이트" },
  { id: "littly", name: "리틀리 제작", price: 300000, desc: "링크 모음 페이지" },
  { id: "web_basic", name: "웹 개발 (기본)", price: 3000000, desc: "기본 기능 웹앱" },
  { id: "web_standard", name: "웹 개발 (표준)", price: 5000000, desc: "회원가입/로그인/게시판" },
  { id: "web_advanced", name: "웹 개발 (고급)", price: 8000000, desc: "결제 시스템/API 연동" },
  { id: "web_premium", name: "웹 개발 (프리미엄)", price: 12000000, desc: "AI 기능/대시보드" },
  { id: "web_enterprise", name: "웹 개발 (엔터프라이즈)", price: 15000000, desc: "풀커스텀 시스템" }
]

// ========================================
// API ROUTES
// ========================================
app.get('/api/portfolios', (c) => c.json(PORTFOLIO_DATA))
app.get('/api/channel-services', (c) => c.json(CHANNEL_SERVICES))
app.get('/api/marketing-setup', (c) => c.json(MARKETING_SETUP))
app.get('/api/monthly-grades', (c) => c.json(MONTHLY_GRADES))
app.get('/api/set-menus', (c) => c.json(SET_MENUS))
app.get('/api/website-packages', (c) => c.json(WEBSITE_PACKAGES))
app.get('/api/addon-services', (c) => c.json(ADDON_SERVICES))
app.get('/api/web-dev-options', (c) => c.json(WEB_DEV_OPTIONS))

// ========================================
// 유틸 함수들
// ========================================
// 유니코드 지원 Base64 인코딩/디코딩
function encodeBase64(str: string): string {
  const encoder = new TextEncoder()
  const data = encoder.encode(str)
  let binary = ''
  for (let i = 0; i < data.length; i++) {
    binary += String.fromCharCode(data[i])
  }
  return btoa(binary)
}

function decodeBase64(base64: string): string {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  const decoder = new TextDecoder()
  return decoder.decode(bytes)
}

function generateReferralCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = 'XIV'
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

function generateSessionToken(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let token = ''
  for (let i = 0; i < 64; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return token
}

// ========================================
// 인증 API - 카카오 로그인
// ========================================
app.get('/api/auth/kakao', (c) => {
  const clientId = c.env?.KAKAO_CLIENT_ID || ''
  const redirectUri = encodeURIComponent('https://xivix.kr/api/auth/kakao/callback')
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`
  return c.redirect(kakaoAuthUrl)
})

app.get('/api/auth/kakao/callback', async (c) => {
  const code = c.req.query('code')
  const referralCode = c.req.query('state') || '' // 추천코드
  
  if (!code) {
    return c.redirect('/login?error=no_code')
  }
  
  try {
    const clientId = c.env?.KAKAO_CLIENT_ID || ''
    const clientSecret = c.env?.KAKAO_CLIENT_SECRET || ''
    const redirectUri = 'https://xivix.kr/api/auth/kakao/callback'
    
    // 1. 액세스 토큰 받기
    const tokenRes = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        code: code
      })
    })
    const tokenData = await tokenRes.json() as any
    
    if (!tokenData.access_token) {
      const errInfo = tokenData.error_description || tokenData.error || 'no_token'
      return c.redirect(`/login?error=token_failed&detail=${encodeURIComponent(errInfo)}`)
    }
    
    // 2. 사용자 정보 가져오기
    const userRes = await fetch('https://kapi.kakao.com/v2/user/me', {
      headers: { 'Authorization': `Bearer ${tokenData.access_token}` }
    })
    const userData = await userRes.json() as any
    
    const kakaoId = userData.id?.toString()
    const email = userData.kakao_account?.email || `kakao_${kakaoId}@xivix.kr`
    const name = userData.properties?.nickname || '회원'
    const profileImage = userData.properties?.profile_image || ''
    
    // 3. DB에서 사용자 조회 또는 생성
    const db = c.env?.DB
    if (!db) {
      return c.redirect('/login?error=db_error')
    }
    
    let user = await db.prepare('SELECT * FROM users WHERE provider = ? AND provider_id = ?')
      .bind('kakao', kakaoId)
      .first() as any
    
    if (!user) {
      // 신규 회원 - 추천코드 생성
      const newReferralCode = generateReferralCode()
      
      // 추천인 확인
      let referredBy = null
      if (referralCode) {
        const referrer = await db.prepare('SELECT id, referral_code FROM users WHERE referral_code = ?')
          .bind(referralCode)
          .first() as any
        if (referrer) {
          referredBy = referrer.referral_code
        }
      }
      
      await db.prepare(`
        INSERT INTO users (email, name, profile_image, provider, provider_id, referral_code, referred_by)
        VALUES (?, ?, ?, 'kakao', ?, ?, ?)
      `).bind(email, name, profileImage, kakaoId, newReferralCode, referredBy).run()
      
      user = await db.prepare('SELECT * FROM users WHERE provider = ? AND provider_id = ?')
        .bind('kakao', kakaoId)
        .first() as any
      
      // 추천인이 있으면 쿠폰 발급
      if (referredBy && user) {
        // 신규가입자에게 5% 할인 쿠폰
        const welcomeCouponCode = `WELCOME_${user.id}_${Date.now()}`
        await db.prepare(`
          INSERT INTO coupons (user_id, code, name, type, value, issued_reason, valid_until)
          VALUES (?, ?, '신규가입 5% 할인', 'percent', 5, 'welcome', datetime('now', '+30 days'))
        `).bind(user.id, welcomeCouponCode).run()
        
        // 추천인에게 10% 할인 쿠폰
        const referrer = await db.prepare('SELECT id FROM users WHERE referral_code = ?')
          .bind(referredBy).first() as any
        if (referrer) {
          const referrerCouponCode = `REFERRAL_${referrer.id}_${Date.now()}`
          await db.prepare(`
            INSERT INTO coupons (user_id, code, name, type, value, issued_reason, valid_until)
            VALUES (?, ?, '추천인 10% 할인', 'percent', 10, 'referral', datetime('now', '+90 days'))
          `).bind(referrer.id, referrerCouponCode).run()
          
          // 추천 카운트 증가
          await db.prepare('UPDATE users SET referral_count = referral_count + 1 WHERE id = ?')
            .bind(referrer.id).run()
          
          // VIP 체크 (3명 이상 추천)
          const updatedReferrer = await db.prepare('SELECT referral_count FROM users WHERE id = ?')
            .bind(referrer.id).first() as any
          if (updatedReferrer && updatedReferrer.referral_count >= 3) {
            await db.prepare('UPDATE users SET vip_status = 1 WHERE id = ?')
              .bind(referrer.id).run()
          }
          
          // referrals 테이블에 기록
          await db.prepare(`
            INSERT INTO referrals (referrer_id, referred_id) VALUES (?, ?)
          `).bind(referrer.id, user.id).run()
        }
      }
    }
    
    // 4. 세션 쿠키 설정 (간단한 방식 - 실제로는 JWT 사용 권장)
    const sessionToken = generateSessionToken()
    
    // 세션 정보를 쿠키에 저장 (Base64 인코딩)
    const sessionData = JSON.stringify({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      referral_code: user.referral_code,
      token: sessionToken
    })
    
    setCookie(c, 'xivix_session', encodeBase64(sessionData), {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'Lax',
      maxAge: 60 * 60 * 24 * 7 // 7일
    })
    
    // 5. 리다이렉트
    return c.redirect('/my')
    
  } catch (error: any) {
    console.error('카카오 로그인 오류:', error)
    const errorMsg = encodeURIComponent(error?.message || 'unknown_error')
    return c.redirect(`/login?error=auth_failed&detail=${errorMsg}`)
  }
})

// ========================================
// 인증 API - 네이버 로그인
// ========================================
app.get('/api/auth/naver', (c) => {
  const clientId = c.env?.NAVER_CLIENT_ID || ''
  const redirectUri = encodeURIComponent('https://xivix.kr/api/auth/naver/callback')
  const state = Math.random().toString(36).substring(7)
  const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&state=${state}`
  return c.redirect(naverAuthUrl)
})

app.get('/api/auth/naver/callback', async (c) => {
  const code = c.req.query('code')
  const state = c.req.query('state')
  
  if (!code) {
    return c.redirect('/login?error=no_code')
  }
  
  try {
    const clientId = c.env?.NAVER_CLIENT_ID || ''
    const clientSecret = c.env?.NAVER_CLIENT_SECRET || ''
    
    // 1. 액세스 토큰 받기
    const tokenRes = await fetch(`https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${clientId}&client_secret=${clientSecret}&code=${code}&state=${state}`)
    const tokenData = await tokenRes.json() as any
    
    if (!tokenData.access_token) {
      return c.redirect('/login?error=token_failed')
    }
    
    // 2. 사용자 정보 가져오기
    const userRes = await fetch('https://openapi.naver.com/v1/nid/me', {
      headers: { 'Authorization': `Bearer ${tokenData.access_token}` }
    })
    const userData = await userRes.json() as any
    
    const naverId = userData.response?.id
    const email = userData.response?.email || `naver_${naverId}@xivix.kr`
    const name = userData.response?.name || userData.response?.nickname || '회원'
    const profileImage = userData.response?.profile_image || ''
    const phone = userData.response?.mobile || ''
    
    // 3. DB에서 사용자 조회 또는 생성
    const db = c.env?.DB
    if (!db) {
      return c.redirect('/login?error=db_error')
    }
    
    let user = await db.prepare('SELECT * FROM users WHERE provider = ? AND provider_id = ?')
      .bind('naver', naverId)
      .first() as any
    
    if (!user) {
      const newReferralCode = generateReferralCode()
      
      await db.prepare(`
        INSERT INTO users (email, name, phone, profile_image, provider, provider_id, referral_code)
        VALUES (?, ?, ?, ?, 'naver', ?, ?)
      `).bind(email, name, phone, profileImage, naverId, newReferralCode).run()
      
      user = await db.prepare('SELECT * FROM users WHERE provider = ? AND provider_id = ?')
        .bind('naver', naverId)
        .first() as any
    }
    
    // 4. 세션 쿠키 설정
    const sessionToken = generateSessionToken()
    const sessionData = JSON.stringify({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      referral_code: user.referral_code,
      token: sessionToken
    })
    
    setCookie(c, 'xivix_session', encodeBase64(sessionData), {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'Lax',
      maxAge: 60 * 60 * 24 * 7
    })
    
    return c.redirect('/my')
    
  } catch (error) {
    console.error('네이버 로그인 오류:', error)
    return c.redirect('/login?error=auth_failed')
  }
})

// 로그아웃
app.get('/api/auth/logout', (c) => {
  deleteCookie(c, 'xivix_session', { path: '/' })
  return c.redirect('/')
})

// 현재 로그인 사용자 정보
app.get('/api/auth/me', async (c) => {
  const sessionCookie = getCookie(c, 'xivix_session')
  if (!sessionCookie) {
    return c.json({ user: null })
  }
  
  try {
    const sessionData = JSON.parse(decodeBase64(sessionCookie)) as SessionUser
    return c.json({ user: sessionData })
  } catch {
    return c.json({ user: null })
  }
})

// ========================================
// 마이페이지 API
// ========================================
app.get('/api/my/dashboard', async (c) => {
  const sessionCookie = getCookie(c, 'xivix_session')
  if (!sessionCookie) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  
  try {
    const session = JSON.parse(decodeBase64(sessionCookie)) as SessionUser
    const db = c.env?.DB
    if (!db) return c.json({ error: 'DB error' }, 500)
    
    // 사용자 정보
    const user = await db.prepare('SELECT * FROM users WHERE id = ?')
      .bind(session.id).first() as any
    
    // 결제 내역
    const payments = await db.prepare(`
      SELECT * FROM payments WHERE user_id = ? ORDER BY created_at DESC LIMIT 10
    `).bind(session.id).all()
    
    // 쿠폰
    const coupons = await db.prepare(`
      SELECT * FROM coupons WHERE user_id = ? AND status = 'active' 
      AND (valid_until IS NULL OR valid_until > datetime('now'))
    `).bind(session.id).all()
    
    // 추천 현황
    const referrals = await db.prepare(`
      SELECT r.*, u.name as referred_name, u.created_at as joined_at
      FROM referrals r
      JOIN users u ON r.referred_id = u.id
      WHERE r.referrer_id = ?
      ORDER BY r.created_at DESC
    `).bind(session.id).all()
    
    // 다음 결제 예정
    const nextPayment = await db.prepare(`
      SELECT * FROM payments 
      WHERE user_id = ? AND is_subscription = 1 AND next_payment_date IS NOT NULL
      ORDER BY next_payment_date ASC LIMIT 1
    `).bind(session.id).first()
    
    return c.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        profile_image: user.profile_image,
        referral_code: user.referral_code,
        referral_count: user.referral_count,
        vip_status: user.vip_status
      },
      payments: payments.results,
      coupons: coupons.results,
      referrals: referrals.results,
      nextPayment
    })
  } catch (error) {
    console.error('Dashboard error:', error)
    return c.json({ error: 'Server error' }, 500)
  }
})

// ========================================
// 관리자 API
// ========================================
// 관리자 권한 체크 미들웨어
const adminAuth = async (c: any, next: any) => {
  const sessionCookie = getCookie(c, 'xivix_session')
  if (!sessionCookie) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  
  try {
    const session = JSON.parse(decodeBase64(sessionCookie)) as SessionUser
    if (session.role !== 'admin') {
      return c.json({ error: 'Forbidden' }, 403)
    }
    c.set('user', session)
    await next()
  } catch {
    return c.json({ error: 'Invalid session' }, 401)
  }
}

// 관리자 대시보드 데이터
app.get('/api/admin/dashboard', adminAuth, async (c) => {
  const db = c.env?.DB
  if (!db) return c.json({ error: 'DB error' }, 500)
  
  try {
    // 통계
    const stats = {
      totalUsers: (await db.prepare('SELECT COUNT(*) as count FROM users').first() as any)?.count || 0,
      totalPayments: (await db.prepare('SELECT COUNT(*) as count FROM payments WHERE status = "completed"').first() as any)?.count || 0,
      totalRevenue: (await db.prepare('SELECT SUM(total_amount) as sum FROM payments WHERE status = "completed"').first() as any)?.sum || 0,
      pendingQuestionnaires: (await db.prepare('SELECT COUNT(*) as count FROM questionnaires WHERE status = "pending"').first() as any)?.count || 0
    }
    
    // 최근 결제
    const recentPayments = await db.prepare(`
      SELECT p.*, u.name as user_name, u.email as user_email
      FROM payments p
      LEFT JOIN users u ON p.user_id = u.id
      ORDER BY p.created_at DESC LIMIT 20
    `).all()
    
    // 대기 중인 질문지
    const pendingQuestionnaires = await db.prepare(`
      SELECT q.*, p.order_name, p.total_amount
      FROM questionnaires q
      LEFT JOIN payments p ON q.payment_id = p.id
      WHERE q.status IN ('pending', 'contacted')
      ORDER BY q.created_at DESC
    `).all()
    
    // 다음 결제 예정 (5일 이내)
    const upcomingPayments = await db.prepare(`
      SELECT p.*, u.name as user_name, u.phone as user_phone
      FROM payments p
      LEFT JOIN users u ON p.user_id = u.id
      WHERE p.is_subscription = 1 
      AND p.next_payment_date BETWEEN date('now') AND date('now', '+5 days')
      ORDER BY p.next_payment_date ASC
    `).all()
    
    return c.json({
      stats,
      recentPayments: recentPayments.results,
      pendingQuestionnaires: pendingQuestionnaires.results,
      upcomingPayments: upcomingPayments.results
    })
  } catch (error) {
    console.error('Admin dashboard error:', error)
    return c.json({ error: 'Server error' }, 500)
  }
})

// 모든 고객 목록
app.get('/api/admin/users', adminAuth, async (c) => {
  const db = c.env?.DB
  if (!db) return c.json({ error: 'DB error' }, 500)
  
  const users = await db.prepare(`
    SELECT u.*, 
      (SELECT COUNT(*) FROM payments WHERE user_id = u.id AND status = 'completed') as payment_count,
      (SELECT SUM(total_amount) FROM payments WHERE user_id = u.id AND status = 'completed') as total_spent
    FROM users u
    ORDER BY u.created_at DESC
  `).all()
  
  return c.json({ users: users.results })
})

// 결제 내역 조회
app.get('/api/admin/payments', adminAuth, async (c) => {
  const db = c.env?.DB
  if (!db) return c.json({ error: 'DB error' }, 500)
  
  const status = c.req.query('status')
  let query = `
    SELECT p.*, u.name as user_name, u.email as user_email, u.phone as user_phone
    FROM payments p
    LEFT JOIN users u ON p.user_id = u.id
  `
  
  if (status) {
    query += ` WHERE p.status = '${status}'`
  }
  
  query += ' ORDER BY p.created_at DESC'
  
  const payments = await db.prepare(query).all()
  return c.json({ payments: payments.results })
})

// 질문지 상태 업데이트
app.patch('/api/admin/questionnaires/:id', adminAuth, async (c) => {
  const id = c.req.param('id')
  const { status, admin_memo } = await c.req.json()
  const db = c.env?.DB
  if (!db) return c.json({ error: 'DB error' }, 500)
  
  await db.prepare(`
    UPDATE questionnaires SET status = ?, admin_memo = ?, updated_at = datetime('now')
    WHERE id = ?
  `).bind(status, admin_memo, id).run()
  
  return c.json({ success: true })
})

// 할일(Task) 관리
app.get('/api/admin/tasks', adminAuth, async (c) => {
  const db = c.env?.DB
  if (!db) return c.json({ error: 'DB error' }, 500)
  
  const tasks = await db.prepare(`
    SELECT t.*, p.order_name, u.name as user_name
    FROM tasks t
    LEFT JOIN payments p ON t.payment_id = p.id
    LEFT JOIN users u ON t.user_id = u.id
    ORDER BY t.priority ASC, t.due_date ASC
  `).all()
  
  return c.json({ tasks: tasks.results })
})

app.post('/api/admin/tasks', adminAuth, async (c) => {
  const { payment_id, user_id, title, description, category, priority, due_date } = await c.req.json()
  const db = c.env?.DB
  if (!db) return c.json({ error: 'DB error' }, 500)
  
  await db.prepare(`
    INSERT INTO tasks (payment_id, user_id, title, description, category, priority, due_date)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).bind(payment_id, user_id, title, description, category, priority || 2, due_date).run()
  
  return c.json({ success: true })
})

app.patch('/api/admin/tasks/:id', adminAuth, async (c) => {
  const id = c.req.param('id')
  const { status, admin_memo } = await c.req.json()
  const db = c.env?.DB
  if (!db) return c.json({ error: 'DB error' }, 500)
  
  let query = 'UPDATE tasks SET status = ?, updated_at = datetime(\'now\')'
  const params: any[] = [status]
  
  if (status === 'completed') {
    query += ', completed_at = datetime(\'now\')'
  }
  if (admin_memo !== undefined) {
    query += ', admin_memo = ?'
    params.push(admin_memo)
  }
  
  query += ' WHERE id = ?'
  params.push(id)
  
  await db.prepare(query).bind(...params).run()
  
  return c.json({ success: true })
})

// 쿠폰 발급
app.post('/api/admin/coupons', adminAuth, async (c) => {
  const { user_id, name, type, value, valid_days, issued_reason } = await c.req.json()
  const db = c.env?.DB
  if (!db) return c.json({ error: 'DB error' }, 500)
  
  const code = `MANUAL_${user_id}_${Date.now()}`
  
  await db.prepare(`
    INSERT INTO coupons (user_id, code, name, type, value, issued_reason, valid_until)
    VALUES (?, ?, ?, ?, ?, ?, datetime('now', '+' || ? || ' days'))
  `).bind(user_id, code, name, type, value, issued_reason || 'manual', valid_days || 30).run()
  
  return c.json({ success: true, code })
})

// AI Chat API - Gemini 2.0 Flash + 20년 SNS 마케팅 영업이사
app.post('/api/chat', async (c) => {
  const { message, context } = await c.req.json()
  const apiKey = c.env?.GEMINI_API_KEY || ''
  
  if (!apiKey) {
    return c.json({ response: getDemoResponse(message), isDemo: true })
  }
  
  const systemPrompt = `# Role Definition (역할 정의)
당신은 X I Λ I X 마케팅 상담 "봇"입니다. (20년 경력 마케팅 전문가 기반) 
마케팅 용어를 전혀 모르는 사업가들에게 비즈니스 파트너로서 조언을 해줍니다.
설명 방식은 **"초등학생 조카에게 설명하듯"** 아주 쉽고 직관적인 비유를 사용합니다.

# Customer Addressing (호칭 전략)
- 병원/학원: "원장님"
- 법인/기업/스타트업: "대표님"
- 식당/카페/일반매장: "사장님"
- 업종 모를 때: "대표님" (기본값)

# Communication Style (대화 스타일)
1. **쉬운 비유 필수:**
   - SEO(검색최적화) → "손님이 길 잃지 않게 표지판을 맨 앞에 세우는 작업"
   - 트래픽(유입) → "우리 가게 문 열고 들어오는 손님 숫자"
   - 전환율 → "구경만 하던 손님이 지갑 열게 만드는 것"
   - AEO(AI검색최적화) → "AI 비서한테 '맛집 어디야?' 물었을 때 우리 가게 추천되게 하는 것"
2. **전문 용어 자제:** ROAS, 퍼널 등 어려운 용어는 쓰지 않거나 쉽게 풀어서 설명
3. **이모지 활용:** 🎒🚀💡💰🏥☕ 등 적절히 사용
4. **결론부터:** "이걸 추천해요!" 먼저 말하고 이유 설명

# Product Database (판매 상품 - 엄격 준수, 가격 지어내기 금지!)

## 🔥 SNS 세트 메뉴 (추천!)
*세트 = 첫달 세팅비 + 다음달부터 월관리비*

| 상품 | 첫달 | 월관리 | 추천멘트 |
|------|------|--------|----------|
| SNS 스타터(입문) | 118만 | 88만 | "지도에 이름 올리고 기본 간판 다는 단계" |
| SNS 성장(BEST) | 238만 | 180만 | "인스타/검색으로 손님이 찾아오게" |
| 바이럴 마스터 | 358만 | 180만 | "동영상으로 소문 확! 내고 싶은 분" |
| 지역 장악 | 498만 | 320만 | "우리 동네 1등 하고 싶은 야심찬 분" |

## 🌐 웹사이트 구축
- 랜딩형(A): 180만 (한 장짜리 전단지 같은 홈페이지)
- 스탠다드(B): 300만 (5페이지 정석 홈페이지, BEST)
- 프리미엄(C): 500만 (24시간 AI 상담원 포함)
- 병원/프랜차이즈(D): 800만 (영상+예약시스템+AI상담 풀세트)

## 🏷️ 채널별 단품
- 네이버: 플레이스(59만), 광고/톡톡/페이SET(100만)
- 인스타: 계정최적화(90만), 메타광고(60만), 스레드(25만)
- 유튜브: 채널최적화(130만), 숏폼(월99만), 롱폼(월220만)
- 블로그/구글: 네이버블로그(40만), 구글마이비즈니스(50만), 구글SEO(80만)

## ➕ 부가 서비스
- 상세페이지 디자인: 150만
- 상권분석 맞춤의뢰: 50만 (계약시 환급)
- SNS 부스팅: 월30만
- 브랜드 영상: A형(150만)~D형(600만)
- **🎥 ZOOM 상담: 3만원** (30분 1:1 화상 전략 상담) ← 가장 저렴하게 전문가 조언 받을 수 있는 방법!

# FAQ Response (자주 묻는 질문 대응)

**Q1. "너무 비싸요"**
→ "월 88만원이면 하루 3만원이에요. 24시간 잠도 안 자고 홍보해주는 직원 한 명 쓴다고 생각해보세요. 알바생 하루 일당보다 싸게 먹히는 셈이죠! 😊"

**Q2. "효과가 바로 나타나나요?"**
→ "씨앗 심자마자 열매 열리진 않잖아요? 🌱 첫 달은 밭 갈고 씨 뿌리는 '세팅' 기간이에요. 제대로 세팅하면 둘째 달부터 반응 오기 시작합니다."

**Q3. "SEO니 AEO니 뭐예요?"**
→ "'온라인 명당자리 잡기'라고 보시면 돼요. 강남대로 한복판에 간판 걸면 비싸잖아요? 인터넷 세상에서 우리 가게를 가장 잘 보이는 자리에 갖다 놓는 기술이에요."

**Q4. "해약할 수 있나요?"**
→ "네! 약정 노예계약 안 합니다. 첫 달 써보시고 마음에 안 드시면 언제든 멈추셔도 돼요. 그만큼 실력에 자신 있다는 거죠 😎"

# Conversation Flow (대화 순서)
1. **인사+업종 파악:** "안녕하세요! X I Λ I X 마케팅 상담 봇입니다. 어떤 사업 운영 중이신가요?"
2. **호칭 설정+공감:** 업종 맞는 호칭으로 부르며 노고 위로
3. **진단+추천:** 상황 맞는 상품을 쉬운 비유와 함께 추천
4. **FAQ 방어:** 가격/효과 걱정하면 위 FAQ 논리로 설득
5. **마무리:** "장바구니에 담아드릴까요?" 또는 "포트폴리오 먼저 보시겠어요?"

# 금지 사항
- 없는 상품/가격 지어내기
- 할인/무료 약속
- 효과 보장
- 경쟁사 비방`

  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + apiKey, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: [
          ...(context || []).map((msg: any) => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
          })),
          { role: 'user', parts: [{ text: message }] }
        ],
        generationConfig: { temperature: 0.9, maxOutputTokens: 500, topP: 0.95 }
      })
    })
    const data = await response.json() as any
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text
    if (!reply) {
      console.error('Gemini error:', JSON.stringify(data))
      return c.json({ response: getDemoResponse(message), isDemo: true })
    }
    return c.json({ response: reply, isDemo: false })
  } catch (err) {
    console.error('Chat error:', err)
    return c.json({ response: getDemoResponse(message), isDemo: true })
  }
})

function getDemoResponse(message: string): string {
  const lower = message.toLowerCase()
  
  if (lower.includes('포트폴리오') || lower.includes('작업물')) {
    return `네! 포트폴리오 보여드릴게요! 🎨

웹사이트 상단 **"포트폴리오"** 섹션에서 카테고리별로 확인하실 수 있어요!

**주요 카테고리:**
• 💎 브랜딩 - Studio JuAi, Aura Kim
• 💄 뷰티 - Amanna Hair, Beauty Page  
• 🤖 시스템/AI - AutoFlow AI, Super Agent
• 📝 콘텐츠 - E-Book, Tarot Reading
• 🎬 영상 - YouTube 포트폴리오 7편

클릭하시면 **내부 미리보기**로 확인 가능하고, 실제 작동은 회원제로 운영 중이에요.

어떤 업종이신가요? 비슷한 사례로 설명드릴게요!`
  }
  
  if (lower.includes('가격') || lower.includes('비용') || lower.includes('얼마')) {
    return `💰 **SNS 마케팅 셋트 메뉴** (홈페이지 별도)

🔥 **SNS 스타터** - **118만원**
→ 플레이스 셋팅 + 스레드 셋팅 + GRADE1 1개월
💡 처음 시작하는 분께 추천!

⭐ **SNS 성장** - **238만원** (BEST!)
→ 인스타 계정 최적화 + 플레이스 셋팅 + GRADE2 1개월
💡 매출 전환이 필요하신 분!

💎 **바이럴 마스터** - **358만원**
→ 인스타+틱톡 셋팅 + 네이버묶음 + GRADE2 2개월
💡 본격 바이럴을 원하시는 분!

👑 **지역 장악** - **498만원**
→ 올인원 풀셋팅 + GRADE3 2개월 + 유튜브 최적화
💡 지역 1등을 노리시는 분!

📌 **첫 달 = 셋팅비+관리비**, 다음 달부터 관리비만!

어떤 업종이신가요? 맞춤 추천 드릴게요!`
  }
  
  if (lower.includes('grade') || lower.includes('관리')) {
    return `📊 **월 관리 GRADE**

**GRADE 1 베이직** (88만원/월)
🎯 검색하면 예쁘고 믿음직스럽게
• 블로그B + 플레이스B + 스레드
💡 가성비 최고! 기본 관리 시작!

**GRADE 2 퍼포먼스** (180만원/월) ⭐BEST
🎯 실제 문의와 예약 늘리기
• 인스타(릴스+피드+카드) + 플레이스A + 블로그A + 구글
💡 영상이 매출을 만듭니다!

**GRADE 3 토탈마스터** (320만원/월)
🎯 지역 1등 → 전국구 브랜드
• 유튜브 숏폼 + 인스타풀 + 플레이스A + 블로그A + 틱톡 + 구글
💡 모든 채널 장악! 팬덤을 구축합니다!

어떤 목표를 가지고 계신가요?`
  }
  
  if (lower.includes('플레이스')) {
    return `🗺️ **네이버 플레이스 서비스**

**플레이스 단독 서비스:**
• 셋팅비: **59만원** (지도 최적화 + 키워드 세팅 + 기반 작업)
• 월관리 A형: **80만원** (적극적 리뷰관리 + 키워드모니터링)
• 월관리 B형: **58만원** (기본 리뷰관리 + 정보 최적화)

**네이버 광고/톡톡/페이 SET:** **100만원** (월관리 없음)
⚠️ 무리한 트래픽X, 상위노출 제외! 자연스러운 고객유입

💡 **20년 노하우 꿀팁:** 
플레이스만 하면 한계가 있어요.
블로그 + 플레이스 연동하면 상위노출 효과 2배!
GRADE 1으로 시작하시면 88만원에 블로그+플레이스+스레드를 😊`
  }
  
  if (lower.includes('웹사이트') || lower.includes('홈페이지') || lower.includes('웹')) {
    return `🌐 **웹사이트 구축** (SNS 마케팅 별도)

**TYPE A 랜딩형** - **180만원**
→ 반응형 원페이지, 소상공인/1인샵 추천

**TYPE B 스탠다드** - **300만원**
→ 5페이지, SEO/AEO/GEO 적용, 성장 사업장 추천

**TYPE C 프리미엄** - **500만원** ⚡
→ 무제한 페이지 + **24시간 AI 상담봇** 탑재!
💡 고객 문의에 자동 응대, 놓치는 고객 없이!

**TYPE D 병원/프랜차이즈** - **800만원** 🎬
→ **브랜드 영상 3편 제작** + AI 상담봇 + 결제/예약 시스템
💡 프리미엄 브랜딩의 끝판왕!

어떤 사업을 하고 계신가요?`
  }
  
  return `안녕하세요! X I Λ I X 마케팅 상담 봇입니다! 😊

20년간 **소상공인부터 대기업까지** 마케팅을 진행해왔어요.
미용실, 에스테틱, 맛집, 병원 등 다양한 업종의 성공 사례가 있습니다!

저희는 **"매출을 올리는 마케팅 솔루션"**을 제공합니다.

궁금하신 점을 말씀해주세요:
• 💰 "가격" - 셋트 메뉴 안내
• 🎨 "포트폴리오" - 작업 사례
• 📊 "GRADE" - 월 관리 안내
• 🗺️ "플레이스" - 지도 마케팅
• 🌐 "웹사이트" - 홈페이지 구축

**어떤 업종을 운영하고 계신가요?**
업종에 맞는 맞춤 전략 제안드릴게요!`
}

// Payment API
app.post('/api/payment/prepare', async (c) => {
  const { items, customAmount, customerName, customerEmail, customerPhone, isRegional, couponCode } = await c.req.json()
  const db = c.env?.DB
  
  // 쿠폰 할인 계산
  let discountAmount = 0
  let couponId = null
  
  if (couponCode && db) {
    const coupon = await db.prepare(`
      SELECT * FROM coupons 
      WHERE code = ? AND status = 'active' 
      AND (valid_until IS NULL OR valid_until > datetime('now'))
    `).bind(couponCode).first() as any
    
    if (coupon) {
      couponId = coupon.id
      if (coupon.type === 'percent') {
        // 원래 금액 계산 후 할인율 적용
        const originalAmount = customAmount || (items ? items.reduce((sum: number, item: any) => sum + item.price, 0) : 0)
        discountAmount = Math.floor(originalAmount * coupon.value / 100)
        if (coupon.max_discount && discountAmount > coupon.max_discount) {
          discountAmount = coupon.max_discount
        }
      } else {
        discountAmount = coupon.value
      }
    }
  }
  
  if (customAmount && customerName) {
    const orderId = `XILIX_CUSTOM_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const orderName = `X I Λ I X 맞춤 솔루션 - ${customerName}`
    const totalAmount = customAmount - discountAmount
    
    return c.json({
      orderId,
      orderName,
      originalAmount: customAmount,
      discountAmount,
      totalAmount,
      storeId: c.env?.PORTONE_STORE_ID || 'store-d08be3e0-9ed0-4393-9974-0b9cbd799252',
      channelKey: c.env?.PORTONE_CHANNEL_KEY || 'channel-key-1cb320d6-8851-4ab2-83de-b8fb88dd2613',
      isCustom: true,
      couponId,
      customer: { name: customerName, email: customerEmail, phone: customerPhone }
    })
  }
  
  if (items && items.length > 0) {
    let originalAmount = items.reduce((sum: number, item: any) => sum + item.price, 0)
    const itemNames = items.map((item: any) => item.name)
    if (isRegional) originalAmount += 300000
    const totalAmount = originalAmount - discountAmount
    
    const orderId = `XILIX_CART_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const orderName = itemNames.length > 2 ? `${itemNames[0]} 외 ${itemNames.length - 1}건` : itemNames.join(' + ')
    
    return c.json({
      orderId,
      orderName,
      originalAmount,
      discountAmount,
      totalAmount,
      storeId: c.env?.PORTONE_STORE_ID || 'store-d08be3e0-9ed0-4393-9974-0b9cbd799252',
      channelKey: c.env?.PORTONE_CHANNEL_KEY || 'channel-key-1cb320d6-8851-4ab2-83de-b8fb88dd2613',
      items,
      couponId,
      regionalFee: isRegional ? 300000 : 0
    })
  }
  
  return c.json({ error: 'Invalid request' }, 400)
})

// 결제 완료 처리 (프론트엔드에서 호출)
app.post('/api/payment/complete', async (c) => {
  const { orderId, orderName, totalAmount, originalAmount, discountAmount, couponId, items, customerEmail, customerName, customerPhone, isSubscription } = await c.req.json()
  const db = c.env?.DB
  
  if (!db) {
    console.log('DB not available, skipping payment record')
    return c.json({ success: true })
  }
  
  try {
    // 로그인된 사용자 확인
    const sessionCookie = getCookie(c, 'xivix_session')
    let userId = null
    if (sessionCookie) {
      try {
        const session = JSON.parse(decodeBase64(sessionCookie)) as SessionUser
        userId = session.id
      } catch {}
    }
    
    // 결제 기록 저장
    const nextPaymentDate = isSubscription ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : null
    
    await db.prepare(`
      INSERT INTO payments (
        user_id, order_id, order_name, items, 
        original_amount, discount_amount, coupon_id, total_amount,
        customer_name, customer_email, customer_phone,
        status, is_subscription, next_payment_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'completed', ?, ?)
    `).bind(
      userId, orderId, orderName, JSON.stringify(items || []),
      originalAmount || totalAmount, discountAmount || 0, couponId, totalAmount,
      customerName, customerEmail, customerPhone,
      isSubscription ? 1 : 0, nextPaymentDate
    ).run()
    
    // 쿠폰 사용 처리
    if (couponId) {
      const payment = await db.prepare('SELECT id FROM payments WHERE order_id = ?').bind(orderId).first() as any
      if (payment) {
        await db.prepare(`
          UPDATE coupons SET status = 'used', used_at = datetime('now'), used_payment_id = ?
          WHERE id = ?
        `).bind(payment.id, couponId).run()
      }
    }
    
    // 추천 완료 처리 (첫 결제인 경우)
    if (userId) {
      const user = await db.prepare('SELECT referred_by FROM users WHERE id = ?').bind(userId).first() as any
      if (user && user.referred_by) {
        const referral = await db.prepare(`
          SELECT id FROM referrals WHERE referred_id = ? AND status = 'pending'
        `).bind(userId).first() as any
        
        if (referral) {
          await db.prepare(`
            UPDATE referrals SET status = 'completed', first_payment_id = 
            (SELECT id FROM payments WHERE order_id = ?)
            WHERE id = ?
          `).bind(orderId, referral.id).run()
        }
      }
    }
    
    return c.json({ success: true, paymentId: orderId })
  } catch (error) {
    console.error('Payment complete error:', error)
    return c.json({ success: true }) // 에러가 나도 결제 자체는 성공으로 처리
  }
})

// Admin API
app.post('/api/admin/verify', async (c) => {
  const { secret } = await c.req.json()
  const adminSecret = c.env?.ADMIN_SECRET || 'xilix2024'
  if (secret === adminSecret) {
    return c.json({ verified: true })
  }
  return c.json({ verified: false }, 401)
})

// Questionnaire API - 결제 후 질문지 저장
app.post('/api/questionnaire', async (c) => {
  const data = await c.req.json()
  const db = c.env?.DB
  
  // 로그인된 사용자 확인
  let userId = null
  const sessionCookie = getCookie(c, 'xivix_session')
  if (sessionCookie) {
    try {
      const session = JSON.parse(decodeBase64(sessionCookie)) as SessionUser
      userId = session.id
    } catch {}
  }
  
  // DB에 저장
  if (db) {
    try {
      // payment_id 찾기
      let paymentId = null
      if (data.paymentInfo?.orderName) {
        const payment = await db.prepare(`
          SELECT id FROM payments WHERE order_name = ? ORDER BY created_at DESC LIMIT 1
        `).bind(data.paymentInfo.orderName).first() as any
        paymentId = payment?.id
      }
      
      await db.prepare(`
        INSERT INTO questionnaires (
          user_id, payment_id, industry, sns_status, goal, additional,
          contact, contact_type, contact_time
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        userId, paymentId, 
        data.industry, data.snsStatus, data.goal, data.additional,
        data.contact, data.contactType, data.contactTime
      ).run()
      
      // 상품별 기본 할일 생성
      if (paymentId && data.paymentInfo?.orderName) {
        const orderName = data.paymentInfo.orderName
        const tasks = []
        
        if (orderName.includes('스타터') || orderName.includes('성장') || orderName.includes('SNS')) {
          tasks.push({ title: '초기 상담 진행', category: 'setup', priority: 1 })
          tasks.push({ title: '계정 셋팅', category: 'setup', priority: 1 })
          tasks.push({ title: '콘텐츠 기획안 작성', category: 'content', priority: 2 })
          tasks.push({ title: '첫 주 콘텐츠 발행', category: 'content', priority: 2 })
        }
        if (orderName.includes('웹사이트') || orderName.includes('TYPE')) {
          tasks.push({ title: '요구사항 수집', category: 'setup', priority: 1 })
          tasks.push({ title: '디자인 시안 작성', category: 'setup', priority: 1 })
          tasks.push({ title: '개발 진행', category: 'setup', priority: 2 })
          tasks.push({ title: '테스트 및 수정', category: 'review', priority: 2 })
        }
        if (orderName.includes('영상') || orderName.includes('ZOOM')) {
          tasks.push({ title: '촬영 일정 조율', category: 'setup', priority: 1 })
        }
        
        for (const task of tasks) {
          await db.prepare(`
            INSERT INTO tasks (payment_id, user_id, title, category, priority)
            VALUES (?, ?, ?, ?, ?)
          `).bind(paymentId, userId, task.title, task.category, task.priority).run()
        }
      }
    } catch (error) {
      console.error('Questionnaire DB error:', error)
    }
  }
  
  console.log('📋 새로운 질문지 제출:', JSON.stringify(data, null, 2))
  
  return c.json({ 
    success: true, 
    message: '질문지가 제출되었습니다. 곧 담당자가 연락드리겠습니다.',
    data: {
      industry: data.industry,
      snsStatus: data.snsStatus,
      goal: data.goal,
      additional: data.additional,
      contact: data.contact,
      contactType: data.contactType,
      contactTime: data.contactTime,
      paymentInfo: data.paymentInfo,
      submittedAt: new Date().toISOString()
    }
  })
})

// ========================================
// PAGE ROUTES
// ========================================
app.get('/', (c) => c.html(getMainHTML()))
app.get('/login', (c) => c.html(getLoginHTML()))
app.get('/my', (c) => c.html(getMyPageHTML()))
app.get('/admin', (c) => c.html(getAdminHTML()))

// OG 이미지 (카카오톡, SNS 공유용)
app.get('/og-image.png', async (c) => {
  // SVG로 이미지 생성
  const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0a0a0c"/>
          <stop offset="50%" style="stop-color:#1a1a2e"/>
          <stop offset="100%" style="stop-color:#0a0a0c"/>
        </linearGradient>
        <linearGradient id="purple" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#a855f7"/>
          <stop offset="100%" style="stop-color:#ec4899"/>
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <!-- 배경 -->
      <rect width="1200" height="630" fill="url(#bg)"/>
      
      <!-- 장식 원들 -->
      <circle cx="150" cy="150" r="200" fill="#a855f7" opacity="0.1"/>
      <circle cx="1050" cy="480" r="250" fill="#ec4899" opacity="0.08"/>
      <circle cx="600" cy="315" r="180" fill="#22d3ee" opacity="0.05"/>
      
      <!-- 로고 텍스트 -->
      <text x="600" y="250" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="100" font-weight="900" fill="url(#purple)" filter="url(#glow)">X I Λ I X</text>
      
      <!-- 서브타이틀 -->
      <text x="600" y="340" text-anchor="middle" font-family="Arial, sans-serif" font-size="36" fill="#ffffff" opacity="0.9">AI 마케팅 전문 에이전시</text>
      
      <!-- 구분선 -->
      <rect x="400" y="380" width="400" height="2" fill="url(#purple)" opacity="0.6"/>
      
      <!-- 설명 -->
      <text x="600" y="450" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" fill="#a0a0a0">SNS · 블로그 · 유튜브 · 광고</text>
      <text x="600" y="500" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" fill="#a0a0a0">통합 마케팅 솔루션</text>
      
      <!-- CTA -->
      <rect x="420" y="540" width="360" height="50" rx="25" fill="url(#purple)"/>
      <text x="600" y="575" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#ffffff">🚀 첫 달 최대 30% 할인</text>
    </svg>
  `
  
  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400'
    }
  })
})

// ========================================
// LOGIN PAGE
// ========================================
function getLoginHTML(): string {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>로그인 | X I Λ I X</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <style>
    :root { --bg-primary: #0a0a0f; --bg-secondary: #12121a; --text-primary: #ffffff; --text-secondary: #a0a0b0; --neon-purple: #a855f7; --neon-pink: #ec4899; }
    body { background: var(--bg-primary); color: var(--text-primary); font-family: 'Pretendard', -apple-system, sans-serif; min-height: 100vh; display: flex; align-items: center; justify-content: center; }
    .login-card { background: var(--bg-secondary); border-radius: 24px; padding: 48px; max-width: 420px; width: 100%; margin: 20px; }
    .logo { font-size: 2.5rem; font-weight: 800; text-align: center; margin-bottom: 8px; background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .subtitle { text-align: center; color: var(--text-secondary); margin-bottom: 40px; }
    .social-btn { width: 100%; padding: 16px; border-radius: 12px; font-size: 1rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 16px; transition: all 0.3s ease; border: none; }
    .social-btn:hover { transform: translateY(-2px); }
    .kakao-btn { background: #FEE500; color: #000; }
    .naver-btn { background: #03C75A; color: #fff; }
    .divider { display: flex; align-items: center; margin: 32px 0; color: var(--text-secondary); font-size: 0.85rem; }
    .divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.1); }
    .divider span { padding: 0 16px; }
    .referral-section { margin-top: 24px; }
    .referral-input { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 14px 18px; color: var(--text-primary); font-size: 0.95rem; }
    .referral-input::placeholder { color: var(--text-secondary); }
    .back-link { display: block; text-align: center; margin-top: 32px; color: var(--text-secondary); text-decoration: none; }
    .back-link:hover { color: var(--neon-purple); }
    .error-msg { background: rgba(239, 68, 68, 0.2); border: 1px solid rgba(239, 68, 68, 0.5); border-radius: 12px; padding: 12px 16px; margin-bottom: 24px; color: #ef4444; font-size: 0.9rem; text-align: center; }
  </style>
</head>
<body>
  <div class="login-card">
    <h1 class="logo">X I Λ I X</h1>
    <p class="subtitle">간편하게 로그인하고<br>맞춤 마케팅 혜택을 받아보세요</p>
    
    <div id="error-container"></div>
    
    <button class="social-btn kakao-btn" onclick="loginWithKakao()">
      <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3z"/></svg>
      카카오로 시작하기
    </button>
    
    <button class="social-btn naver-btn" onclick="loginWithNaver()">
      <span style="font-weight:800;font-size:1.2rem;">N</span>
      네이버로 시작하기
    </button>
    
    <div class="divider"><span>추천코드가 있다면?</span></div>
    
    <div class="referral-section">
      <input type="text" id="referral-code" class="referral-input" placeholder="추천코드 입력 (예: XIVAB123)" maxlength="10">
      <p style="font-size:0.8rem;color:var(--text-secondary);margin-top:8px;text-align:center;">
        추천코드 입력 시 <strong style="color:var(--neon-purple);">첫 결제 5% 할인</strong> 쿠폰 지급!
      </p>
    </div>
    
    <a href="/" class="back-link"><i class="fas fa-arrow-left"></i> 메인으로 돌아가기</a>
  </div>
  
  <script>
    // URL에서 에러 메시지 확인
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    if (error) {
      const errorMessages = {
        'no_code': '인증 코드를 받지 못했습니다.',
        'token_failed': '로그인 토큰 발급에 실패했습니다.',
        'auth_failed': '로그인 처리 중 오류가 발생했습니다.',
        'db_error': '서버 오류가 발생했습니다.'
      };
      document.getElementById('error-container').innerHTML = 
        '<div class="error-msg"><i class="fas fa-exclamation-circle"></i> ' + 
        (errorMessages[error] || '로그인에 실패했습니다.') + '</div>';
    }
    
    function loginWithKakao() {
      const referralCode = document.getElementById('referral-code').value.trim();
      let url = '/api/auth/kakao';
      if (referralCode) {
        url += '?state=' + encodeURIComponent(referralCode);
      }
      window.location.href = url;
    }
    
    function loginWithNaver() {
      window.location.href = '/api/auth/naver';
    }
  </script>
</body>
</html>`;
}

// ========================================
// MY PAGE (고객 마이페이지)
// ========================================
function getMyPageHTML(): string {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>마이페이지 | X I Λ I X</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <style>
    :root { --bg-primary: #0a0a0f; --bg-secondary: #12121a; --bg-tertiary: #1a1a24; --text-primary: #ffffff; --text-secondary: #a0a0b0; --neon-purple: #a855f7; --neon-pink: #ec4899; --neon-cyan: #22d3ee; --neon-green: #22c55e; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--bg-primary); color: var(--text-primary); font-family: 'Pretendard', -apple-system, sans-serif; min-height: 100vh; }
    .header { background: var(--bg-secondary); border-bottom: 1px solid rgba(255,255,255,0.1); padding: 16px 24px; position: sticky; top: 0; z-index: 100; }
    .header-content { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
    .logo { font-size: 1.5rem; font-weight: 800; background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-decoration: none; }
    .user-menu { display: flex; align-items: center; gap: 16px; }
    .user-name { font-weight: 600; }
    .logout-btn { background: transparent; border: 1px solid rgba(255,255,255,0.2); color: var(--text-secondary); padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 0.85rem; }
    .container { max-width: 1200px; margin: 0 auto; padding: 32px 24px; }
    .loading { text-align: center; padding: 100px 0; color: var(--text-secondary); }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
    .card { background: var(--bg-secondary); border-radius: 16px; padding: 24px; border: 1px solid rgba(255,255,255,0.05); }
    .card-title { font-size: 1.1rem; font-weight: 700; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
    .card-title i { color: var(--neon-purple); }
    .stat-value { font-size: 2rem; font-weight: 800; color: var(--neon-purple); }
    .stat-label { font-size: 0.85rem; color: var(--text-secondary); margin-top: 4px; }
    .referral-box { background: linear-gradient(135deg, rgba(168,85,247,0.2), rgba(236,72,153,0.2)); border-radius: 12px; padding: 20px; margin-top: 16px; text-align: center; }
    .referral-code { font-size: 1.8rem; font-weight: 800; letter-spacing: 4px; color: var(--neon-cyan); margin: 12px 0; }
    .copy-btn { background: var(--neon-purple); color: white; border: none; padding: 10px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; }
    .copy-btn:hover { opacity: 0.9; }
    .list-item { display: flex; justify-content: space-between; align-items: center; padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
    .list-item:last-child { border-bottom: none; }
    .item-name { font-weight: 600; }
    .item-date { font-size: 0.85rem; color: var(--text-secondary); }
    .item-amount { font-weight: 700; color: var(--neon-green); }
    .item-status { font-size: 0.8rem; padding: 4px 10px; border-radius: 20px; }
    .status-completed { background: rgba(34,197,94,0.2); color: var(--neon-green); }
    .status-pending { background: rgba(251,191,36,0.2); color: #fbbf24; }
    .status-active { background: rgba(34,211,238,0.2); color: var(--neon-cyan); }
    .coupon-item { background: var(--bg-tertiary); border-radius: 12px; padding: 16px; margin-bottom: 12px; border-left: 4px solid var(--neon-purple); }
    .coupon-name { font-weight: 700; margin-bottom: 4px; }
    .coupon-value { font-size: 1.5rem; font-weight: 800; color: var(--neon-pink); }
    .coupon-expire { font-size: 0.8rem; color: var(--text-secondary); margin-top: 8px; }
    .empty-state { text-align: center; padding: 40px; color: var(--text-secondary); }
    .next-payment { background: linear-gradient(135deg, rgba(251,191,36,0.2), rgba(245,158,11,0.2)); border-radius: 12px; padding: 20px; margin-bottom: 24px; }
    .next-payment-title { font-size: 0.9rem; color: #fbbf24; margin-bottom: 8px; }
    .next-payment-date { font-size: 1.5rem; font-weight: 800; }
    @media (max-width: 768px) { .grid { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <header class="header">
    <div class="header-content">
      <a href="/" class="logo">X I Λ I X</a>
      <div class="user-menu">
        <span class="user-name" id="user-name">로딩 중...</span>
        <button class="logout-btn" onclick="logout()"><i class="fas fa-sign-out-alt"></i> 로그아웃</button>
      </div>
    </div>
  </header>
  
  <div class="container">
    <div id="content">
      <div class="loading"><i class="fas fa-spinner fa-spin fa-2x"></i><p style="margin-top:16px;">로딩 중...</p></div>
    </div>
  </div>
  
  <script>
    let userData = null;
    
    async function loadDashboard() {
      try {
        // 먼저 로그인 상태 확인
        const authRes = await fetch('/api/auth/me');
        const authData = await authRes.json();
        
        if (!authData.user) {
          window.location.href = '/login';
          return;
        }
        
        document.getElementById('user-name').textContent = authData.user.name + '님';
        
        // 대시보드 데이터 로드
        const res = await fetch('/api/my/dashboard');
        if (res.status === 401) {
          window.location.href = '/login';
          return;
        }
        
        const data = await res.json();
        userData = data;
        renderDashboard(data);
      } catch (error) {
        console.error('Dashboard load error:', error);
        document.getElementById('content').innerHTML = '<div class="empty-state"><i class="fas fa-exclamation-circle fa-3x"></i><p style="margin-top:16px;">데이터를 불러오는데 실패했습니다.</p></div>';
      }
    }
    
    function renderDashboard(data) {
      const { user, payments, coupons, referrals, nextPayment } = data;
      
      let nextPaymentHTML = '';
      if (nextPayment) {
        const date = new Date(nextPayment.next_payment_date);
        nextPaymentHTML = \`
          <div class="next-payment">
            <div class="next-payment-title"><i class="fas fa-bell"></i> 다음 결제 예정</div>
            <div class="next-payment-date">\${date.getMonth()+1}월 \${date.getDate()}일</div>
            <div style="font-size:0.9rem;color:var(--text-secondary);margin-top:8px;">\${nextPayment.order_name} - \${(nextPayment.total_amount/10000).toLocaleString()}만원</div>
          </div>
        \`;
      }
      
      const html = \`
        \${nextPaymentHTML}
        
        <div class="grid">
          <!-- 내 추천 현황 -->
          <div class="card">
            <h3 class="card-title"><i class="fas fa-gift"></i> 내 추천 현황</h3>
            <div style="display:flex;justify-content:space-around;text-align:center;">
              <div>
                <div class="stat-value">\${user.referral_count || 0}</div>
                <div class="stat-label">추천한 친구</div>
              </div>
              <div>
                <div class="stat-value" style="color:var(--neon-green);">\${user.vip_status ? 'VIP' : '일반'}</div>
                <div class="stat-label">등급</div>
              </div>
            </div>
            <div class="referral-box">
              <div style="font-size:0.9rem;color:var(--text-secondary);">내 추천코드</div>
              <div class="referral-code" id="my-referral-code">\${user.referral_code}</div>
              <button class="copy-btn" onclick="copyReferralCode()"><i class="fas fa-copy"></i> 복사하기</button>
              <p style="font-size:0.8rem;color:var(--text-secondary);margin-top:12px;">
                친구가 가입하면 <strong>10% 할인쿠폰</strong> 지급!<br>
                3명 추천 시 <strong>VIP 15% 상시할인</strong>
              </p>
            </div>
          </div>
          
          <!-- 보유 쿠폰 -->
          <div class="card">
            <h3 class="card-title"><i class="fas fa-ticket-alt"></i> 보유 쿠폰 (\${coupons?.length || 0})</h3>
            \${coupons && coupons.length > 0 ? coupons.map(c => \`
              <div class="coupon-item">
                <div class="coupon-name">\${c.name}</div>
                <div class="coupon-value">\${c.type === 'percent' ? c.value + '%' : c.value.toLocaleString() + '원'} 할인</div>
                <div class="coupon-expire">유효기간: \${c.valid_until ? new Date(c.valid_until).toLocaleDateString() : '무제한'}</div>
              </div>
            \`).join('') : '<div class="empty-state"><i class="fas fa-ticket-alt"></i><p>보유한 쿠폰이 없습니다</p></div>'}
          </div>
          
          <!-- 결제 내역 -->
          <div class="card" style="grid-column: span 2;">
            <h3 class="card-title"><i class="fas fa-receipt"></i> 결제 내역</h3>
            \${payments && payments.length > 0 ? payments.map(p => \`
              <div class="list-item">
                <div>
                  <div class="item-name">\${p.order_name}</div>
                  <div class="item-date">\${new Date(p.created_at).toLocaleDateString()}</div>
                </div>
                <div style="text-align:right;">
                  <div class="item-amount">\${(p.total_amount/10000).toLocaleString()}만원</div>
                  <span class="item-status \${p.status === 'completed' ? 'status-completed' : 'status-pending'}">\${p.status === 'completed' ? '완료' : '대기'}</span>
                </div>
              </div>
            \`).join('') : '<div class="empty-state"><i class="fas fa-receipt"></i><p>결제 내역이 없습니다</p></div>'}
          </div>
          
          <!-- 추천한 친구들 -->
          <div class="card" style="grid-column: span 2;">
            <h3 class="card-title"><i class="fas fa-users"></i> 추천한 친구들</h3>
            \${referrals && referrals.length > 0 ? referrals.map(r => \`
              <div class="list-item">
                <div>
                  <div class="item-name">\${r.referred_name}</div>
                  <div class="item-date">가입일: \${new Date(r.joined_at).toLocaleDateString()}</div>
                </div>
                <span class="item-status \${r.status === 'completed' ? 'status-completed' : 'status-pending'}">\${r.status === 'completed' ? '결제완료' : '대기중'}</span>
              </div>
            \`).join('') : '<div class="empty-state"><i class="fas fa-user-friends"></i><p>아직 추천한 친구가 없습니다</p></div>'}
          </div>
        </div>
      \`;
      
      document.getElementById('content').innerHTML = html;
    }
    
    function copyReferralCode() {
      const code = document.getElementById('my-referral-code').textContent;
      navigator.clipboard.writeText(code).then(() => {
        alert('추천코드가 복사되었습니다!\\n\\n친구에게 공유해주세요 💜');
      });
    }
    
    function logout() {
      window.location.href = '/api/auth/logout';
    }
    
    // 페이지 로드 시 대시보드 로드
    loadDashboard();
  </script>
</body>
</html>`;
}

// ========================================
// ADMIN PAGE (관리자 대시보드)
// ========================================
function getAdminHTML(): string {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>관리자 대시보드 | X I Λ I X</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <style>
    :root { --bg-primary: #0a0a0f; --bg-secondary: #12121a; --bg-tertiary: #1a1a24; --text-primary: #ffffff; --text-secondary: #a0a0b0; --neon-purple: #a855f7; --neon-pink: #ec4899; --neon-cyan: #22d3ee; --neon-green: #22c55e; --neon-orange: #f97316; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--bg-primary); color: var(--text-primary); font-family: 'Pretendard', -apple-system, sans-serif; min-height: 100vh; }
    .sidebar { position: fixed; left: 0; top: 0; bottom: 0; width: 240px; background: var(--bg-secondary); border-right: 1px solid rgba(255,255,255,0.05); padding: 24px 0; overflow-y: auto; }
    .sidebar-logo { font-size: 1.5rem; font-weight: 800; text-align: center; padding: 0 24px 24px; background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .sidebar-menu { list-style: none; }
    .sidebar-item { padding: 14px 24px; cursor: pointer; display: flex; align-items: center; gap: 12px; color: var(--text-secondary); transition: all 0.2s; }
    .sidebar-item:hover, .sidebar-item.active { background: rgba(168,85,247,0.1); color: var(--neon-purple); border-right: 3px solid var(--neon-purple); }
    .sidebar-item i { width: 20px; text-align: center; }
    .main-content { margin-left: 240px; padding: 24px 32px; }
    .page-title { font-size: 1.8rem; font-weight: 800; margin-bottom: 8px; }
    .page-subtitle { color: var(--text-secondary); margin-bottom: 32px; }
    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 32px; }
    .stat-card { background: var(--bg-secondary); border-radius: 16px; padding: 24px; }
    .stat-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; margin-bottom: 16px; }
    .stat-icon.purple { background: rgba(168,85,247,0.2); color: var(--neon-purple); }
    .stat-icon.green { background: rgba(34,197,94,0.2); color: var(--neon-green); }
    .stat-icon.cyan { background: rgba(34,211,238,0.2); color: var(--neon-cyan); }
    .stat-icon.orange { background: rgba(249,115,22,0.2); color: var(--neon-orange); }
    .stat-value { font-size: 2rem; font-weight: 800; }
    .stat-label { font-size: 0.9rem; color: var(--text-secondary); margin-top: 4px; }
    .card { background: var(--bg-secondary); border-radius: 16px; padding: 24px; margin-bottom: 24px; }
    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .card-title { font-size: 1.1rem; font-weight: 700; display: flex; align-items: center; gap: 10px; }
    .card-title i { color: var(--neon-purple); }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 14px 16px; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.05); }
    th { font-size: 0.85rem; color: var(--text-secondary); font-weight: 600; }
    .badge { padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; }
    .badge-green { background: rgba(34,197,94,0.2); color: var(--neon-green); }
    .badge-yellow { background: rgba(251,191,36,0.2); color: #fbbf24; }
    .badge-red { background: rgba(239,68,68,0.2); color: #ef4444; }
    .badge-cyan { background: rgba(34,211,238,0.2); color: var(--neon-cyan); }
    .action-btn { background: transparent; border: 1px solid rgba(255,255,255,0.2); color: var(--text-secondary); padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 0.8rem; margin-right: 8px; }
    .action-btn:hover { border-color: var(--neon-purple); color: var(--neon-purple); }
    .action-btn.primary { background: var(--neon-purple); border-color: var(--neon-purple); color: white; }
    .tab-content { display: none; }
    .tab-content.active { display: block; }
    .loading { text-align: center; padding: 60px; color: var(--text-secondary); }
    .empty { text-align: center; padding: 40px; color: var(--text-secondary); }
    @media (max-width: 1024px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 768px) { .sidebar { display: none; } .main-content { margin-left: 0; } .stats-grid { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <aside class="sidebar">
    <div class="sidebar-logo">X I Λ I X<br><small style="font-size:0.7rem;font-weight:400;">Admin</small></div>
    <ul class="sidebar-menu">
      <li class="sidebar-item active" data-tab="dashboard"><i class="fas fa-chart-line"></i> 대시보드</li>
      <li class="sidebar-item" data-tab="payments"><i class="fas fa-credit-card"></i> 결제 관리</li>
      <li class="sidebar-item" data-tab="questionnaires"><i class="fas fa-clipboard-list"></i> 질문지</li>
      <li class="sidebar-item" data-tab="users"><i class="fas fa-users"></i> 고객 관리</li>
      <li class="sidebar-item" data-tab="tasks"><i class="fas fa-tasks"></i> 할일 관리</li>
      <li class="sidebar-item" data-tab="coupons"><i class="fas fa-ticket-alt"></i> 쿠폰 관리</li>
    </ul>
    <div style="position:absolute;bottom:24px;left:24px;right:24px;">
      <button onclick="logout()" style="width:100%;padding:12px;background:transparent;border:1px solid rgba(255,255,255,0.2);color:var(--text-secondary);border-radius:8px;cursor:pointer;">
        <i class="fas fa-sign-out-alt"></i> 로그아웃
      </button>
    </div>
  </aside>
  
  <main class="main-content">
    <div id="dashboard-tab" class="tab-content active">
      <h1 class="page-title">대시보드</h1>
      <p class="page-subtitle">X I Λ I X 관리자 현황</p>
      
      <div class="stats-grid" id="stats-grid">
        <div class="stat-card"><div class="loading"><i class="fas fa-spinner fa-spin"></i></div></div>
      </div>
      
      <div class="card">
        <div class="card-header">
          <h3 class="card-title"><i class="fas fa-bell"></i> 결제 예정 (5일 이내)</h3>
        </div>
        <div id="upcoming-payments"><div class="loading"><i class="fas fa-spinner fa-spin"></i> 로딩 중...</div></div>
      </div>
      
      <div class="card">
        <div class="card-header">
          <h3 class="card-title"><i class="fas fa-clipboard-list"></i> 대기 중인 질문지</h3>
        </div>
        <div id="pending-questionnaires"><div class="loading"><i class="fas fa-spinner fa-spin"></i> 로딩 중...</div></div>
      </div>
    </div>
    
    <div id="payments-tab" class="tab-content">
      <h1 class="page-title">결제 관리</h1>
      <p class="page-subtitle">전체 결제 내역</p>
      <div class="card" id="payments-list"><div class="loading"><i class="fas fa-spinner fa-spin"></i> 로딩 중...</div></div>
    </div>
    
    <div id="questionnaires-tab" class="tab-content">
      <h1 class="page-title">질문지 관리</h1>
      <p class="page-subtitle">고객 질문지 응답 관리</p>
      <div class="card" id="questionnaires-list"><div class="loading"><i class="fas fa-spinner fa-spin"></i> 로딩 중...</div></div>
    </div>
    
    <div id="users-tab" class="tab-content">
      <h1 class="page-title">고객 관리</h1>
      <p class="page-subtitle">전체 고객 목록</p>
      <div class="card" id="users-list"><div class="loading"><i class="fas fa-spinner fa-spin"></i> 로딩 중...</div></div>
    </div>
    
    <div id="tasks-tab" class="tab-content">
      <h1 class="page-title">할일 관리</h1>
      <p class="page-subtitle">상품별 진행 현황</p>
      <div class="card" id="tasks-list"><div class="loading"><i class="fas fa-spinner fa-spin"></i> 로딩 중...</div></div>
    </div>
    
    <div id="coupons-tab" class="tab-content">
      <h1 class="page-title">쿠폰 관리</h1>
      <p class="page-subtitle">쿠폰 발급 및 관리</p>
      <div class="card" id="coupons-section"><div class="loading"><i class="fas fa-spinner fa-spin"></i> 로딩 중...</div></div>
    </div>
  </main>
  
  <script>
    let currentTab = 'dashboard';
    let dashboardData = null;
    
    // 탭 전환
    document.querySelectorAll('.sidebar-item').forEach(item => {
      item.addEventListener('click', () => {
        const tab = item.dataset.tab;
        switchTab(tab);
      });
    });
    
    function switchTab(tab) {
      currentTab = tab;
      document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
      document.querySelector('[data-tab="'+tab+'"]').classList.add('active');
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      document.getElementById(tab + '-tab').classList.add('active');
      
      loadTabData(tab);
    }
    
    async function checkAuth() {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      if (!data.user || data.user.role !== 'admin') {
        alert('관리자 권한이 필요합니다.');
        window.location.href = '/';
        return false;
      }
      return true;
    }
    
    async function loadTabData(tab) {
      if (!await checkAuth()) return;
      
      switch(tab) {
        case 'dashboard': loadDashboard(); break;
        case 'payments': loadPayments(); break;
        case 'users': loadUsers(); break;
        case 'tasks': loadTasks(); break;
      }
    }
    
    async function loadDashboard() {
      try {
        const res = await fetch('/api/admin/dashboard');
        const data = await res.json();
        dashboardData = data;
        
        // 통계 카드
        document.getElementById('stats-grid').innerHTML = \`
          <div class="stat-card">
            <div class="stat-icon purple"><i class="fas fa-users"></i></div>
            <div class="stat-value">\${data.stats.totalUsers}</div>
            <div class="stat-label">전체 고객</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon green"><i class="fas fa-credit-card"></i></div>
            <div class="stat-value">\${data.stats.totalPayments}</div>
            <div class="stat-label">완료 결제</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon cyan"><i class="fas fa-won-sign"></i></div>
            <div class="stat-value">\${(data.stats.totalRevenue/10000).toLocaleString()}만</div>
            <div class="stat-label">총 매출</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon orange"><i class="fas fa-clipboard-list"></i></div>
            <div class="stat-value">\${data.stats.pendingQuestionnaires}</div>
            <div class="stat-label">대기 질문지</div>
          </div>
        \`;
        
        // 결제 예정
        if (data.upcomingPayments && data.upcomingPayments.length > 0) {
          document.getElementById('upcoming-payments').innerHTML = \`
            <table>
              <thead><tr><th>고객</th><th>상품</th><th>금액</th><th>결제 예정일</th><th>알림</th></tr></thead>
              <tbody>
                \${data.upcomingPayments.map(p => \`
                  <tr>
                    <td>\${p.user_name || p.customer_name || '-'}</td>
                    <td>\${p.order_name}</td>
                    <td>\${(p.total_amount/10000).toLocaleString()}만원</td>
                    <td>\${new Date(p.next_payment_date).toLocaleDateString()}</td>
                    <td>
                      <span class="badge \${p.notified_d5 ? 'badge-green' : 'badge-yellow'}">D-5 \${p.notified_d5 ? '✓' : '대기'}</span>
                      <span class="badge \${p.notified_d1 ? 'badge-green' : 'badge-yellow'}">D-1 \${p.notified_d1 ? '✓' : '대기'}</span>
                    </td>
                  </tr>
                \`).join('')}
              </tbody>
            </table>
          \`;
        } else {
          document.getElementById('upcoming-payments').innerHTML = '<div class="empty">5일 이내 예정된 결제가 없습니다.</div>';
        }
        
        // 대기 질문지
        if (data.pendingQuestionnaires && data.pendingQuestionnaires.length > 0) {
          document.getElementById('pending-questionnaires').innerHTML = \`
            <table>
              <thead><tr><th>상품</th><th>업종</th><th>목표</th><th>연락처</th><th>상태</th><th>액션</th></tr></thead>
              <tbody>
                \${data.pendingQuestionnaires.map(q => \`
                  <tr>
                    <td>\${q.order_name || '-'}</td>
                    <td>\${q.industry || '-'}</td>
                    <td>\${q.goal || '-'}</td>
                    <td>\${q.contact || '-'}</td>
                    <td><span class="badge badge-yellow">\${q.status}</span></td>
                    <td>
                      <button class="action-btn" onclick="updateQStatus(\${q.id}, 'contacted')">연락함</button>
                      <button class="action-btn" onclick="updateQStatus(\${q.id}, 'completed')">완료</button>
                    </td>
                  </tr>
                \`).join('')}
              </tbody>
            </table>
          \`;
        } else {
          document.getElementById('pending-questionnaires').innerHTML = '<div class="empty">대기 중인 질문지가 없습니다.</div>';
        }
        
      } catch (error) {
        console.error('Dashboard error:', error);
      }
    }
    
    async function loadPayments() {
      try {
        const res = await fetch('/api/admin/payments');
        const data = await res.json();
        
        document.getElementById('payments-list').innerHTML = \`
          <table>
            <thead><tr><th>주문번호</th><th>고객</th><th>상품</th><th>금액</th><th>상태</th><th>일시</th></tr></thead>
            <tbody>
              \${data.payments.map(p => \`
                <tr>
                  <td style="font-size:0.8rem;">\${p.order_id.substring(0,20)}...</td>
                  <td>\${p.user_name || p.customer_name || '-'}<br><small>\${p.user_email || p.customer_email || ''}</small></td>
                  <td>\${p.order_name}</td>
                  <td style="font-weight:700;">\${(p.total_amount/10000).toLocaleString()}만원</td>
                  <td><span class="badge \${p.status === 'completed' ? 'badge-green' : 'badge-yellow'}">\${p.status}</span></td>
                  <td>\${new Date(p.created_at).toLocaleString()}</td>
                </tr>
              \`).join('')}
            </tbody>
          </table>
        \`;
      } catch (error) {
        document.getElementById('payments-list').innerHTML = '<div class="empty">데이터를 불러올 수 없습니다.</div>';
      }
    }
    
    async function loadUsers() {
      try {
        const res = await fetch('/api/admin/users');
        const data = await res.json();
        
        document.getElementById('users-list').innerHTML = \`
          <table>
            <thead><tr><th>이름</th><th>이메일</th><th>연락처</th><th>결제</th><th>총 지출</th><th>추천</th><th>가입일</th></tr></thead>
            <tbody>
              \${data.users.map(u => \`
                <tr>
                  <td>\${u.name} \${u.vip_status ? '<span class="badge badge-cyan">VIP</span>' : ''}</td>
                  <td>\${u.email}</td>
                  <td>\${u.phone || '-'}</td>
                  <td>\${u.payment_count || 0}건</td>
                  <td>\${((u.total_spent || 0)/10000).toLocaleString()}만원</td>
                  <td>\${u.referral_count || 0}명</td>
                  <td>\${new Date(u.created_at).toLocaleDateString()}</td>
                </tr>
              \`).join('')}
            </tbody>
          </table>
        \`;
      } catch (error) {
        document.getElementById('users-list').innerHTML = '<div class="empty">데이터를 불러올 수 없습니다.</div>';
      }
    }
    
    async function loadTasks() {
      try {
        const res = await fetch('/api/admin/tasks');
        const data = await res.json();
        
        if (!data.tasks || data.tasks.length === 0) {
          document.getElementById('tasks-list').innerHTML = '<div class="empty">등록된 할일이 없습니다.</div>';
          return;
        }
        
        document.getElementById('tasks-list').innerHTML = \`
          <table>
            <thead><tr><th>할일</th><th>고객/상품</th><th>카테고리</th><th>기한</th><th>상태</th><th>액션</th></tr></thead>
            <tbody>
              \${data.tasks.map(t => \`
                <tr>
                  <td>\${t.title}</td>
                  <td>\${t.user_name || '-'}<br><small>\${t.order_name || ''}</small></td>
                  <td>\${t.category || '-'}</td>
                  <td>\${t.due_date ? new Date(t.due_date).toLocaleDateString() : '-'}</td>
                  <td><span class="badge \${t.status === 'completed' ? 'badge-green' : t.status === 'in_progress' ? 'badge-cyan' : 'badge-yellow'}">\${t.status}</span></td>
                  <td>
                    <button class="action-btn" onclick="updateTaskStatus(\${t.id}, 'in_progress')">진행</button>
                    <button class="action-btn" onclick="updateTaskStatus(\${t.id}, 'completed')">완료</button>
                  </td>
                </tr>
              \`).join('')}
            </tbody>
          </table>
        \`;
      } catch (error) {
        document.getElementById('tasks-list').innerHTML = '<div class="empty">데이터를 불러올 수 없습니다.</div>';
      }
    }
    
    async function updateQStatus(id, status) {
      await fetch('/api/admin/questionnaires/' + id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      loadDashboard();
    }
    
    async function updateTaskStatus(id, status) {
      await fetch('/api/admin/tasks/' + id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      loadTasks();
    }
    
    function logout() {
      window.location.href = '/api/auth/logout';
    }
    
    // 초기 로드
    loadDashboard();
  </script>
</body>
</html>`;
}

// ========================================
// MAIN PAGE - 깔끔한 메뉴 기반 레이아웃
// ========================================

function getMainHTML(): string {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>X I Λ I X | AI 마케팅 전문 에이전시</title>
    <meta name="description" content="AI 기반 통합 마케팅 솔루션 | SNS·블로그·유튜브·광고 한 번에! 첫 달 최대 30% 할인">
    
    <!-- Open Graph (카카오톡, 페이스북 등) -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://xivix.kr">
    <meta property="og:title" content="X I Λ I X | AI 마케팅 전문 에이전시">
    <meta property="og:description" content="🚀 AI 기반 통합 마케팅 솔루션 | SNS·블로그·유튜브·광고 한 번에 해결! 지금 상담받고 첫 달 최대 30% 할인받으세요 ✨">
    <meta property="og:image" content="https://xivix.kr/og-image.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:locale" content="ko_KR">
    <meta property="og:site_name" content="X I Λ I X">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="X I Λ I X | AI 마케팅 전문 에이전시">
    <meta name="twitter:description" content="🚀 AI 기반 통합 마케팅 솔루션 | SNS·블로그·유튜브·광고 한 번에 해결!">
    <meta name="twitter:image" content="https://xivix.kr/og-image.png">
    
    <!-- 추가 SEO -->
    <meta name="keywords" content="마케팅, AI마케팅, SNS마케팅, 블로그마케팅, 유튜브마케팅, 광고대행, 인스타그램, 네이버블로그, 마케팅대행사">
    <meta name="author" content="X I Λ I X">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://xivix.kr">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.portone.io/v2/browser-sdk.js"></script>
    
    <style>
      :root {
        --bg-primary: #0a0a0c;
        --bg-secondary: #111115;
        --bg-tertiary: #18181d;
        --bg-card: rgba(24, 24, 29, 0.8);
        --neon-purple: #a855f7;
        --neon-pink: #ec4899;
        --neon-cyan: #22d3ee;
        --neon-orange: #f97316;
        --neon-green: #22c55e;
        --text-primary: #ffffff;
        --text-secondary: rgba(255, 255, 255, 0.7);
        --text-tertiary: rgba(255, 255, 255, 0.4);
        --border-subtle: rgba(255, 255, 255, 0.08);
        --border-hover: rgba(255, 255, 255, 0.15);
      }
      
      /* 챗봇 Pulse 애니메이션 */
      @keyframes chatPulse {
        0%, 100% { box-shadow: 0 4px 20px rgba(168, 85, 247, 0.4); }
        50% { box-shadow: 0 4px 40px rgba(168, 85, 247, 0.8), 0 0 60px rgba(236, 72, 153, 0.6); }
      }
      .chat-bubble.pulse { animation: chatPulse 1.5s ease-in-out infinite; }
      
      /* 서비스 메뉴 버튼 스타일 */
      .service-menu-grid { display: flex; flex-direction: column; gap: 12px; max-width: 600px; margin: 0 auto; }
      .service-menu-btn {
        display: flex; align-items: center; gap: 16px;
        background: var(--bg-card); border: 1px solid var(--border-subtle);
        border-radius: 16px; padding: 20px 24px;
        cursor: pointer; transition: all 0.3s ease;
        text-align: left; position: relative; width: 100%;
      }
      .service-menu-btn:hover { transform: translateX(8px); border-color: var(--btn-color); background: rgba(168, 85, 247, 0.05); }
      .service-menu-btn i:first-child { font-size: 1.5rem; color: var(--btn-color); width: 40px; text-align: center; }
      .service-menu-btn .menu-text { flex: 1; display: flex; flex-direction: column; }
      .service-menu-btn .menu-name { font-size: 1.1rem; font-weight: 700; color: var(--text-primary); line-height: 1.3; }
      .service-menu-btn .menu-desc { font-size: 0.75rem; color: var(--text-tertiary); margin-top: 4px; font-weight: 400; }
      .service-menu-btn .menu-arrow { color: var(--text-tertiary); font-size: 1rem; }
      .service-menu-btn .menu-badge { position: absolute; top: 12px; right: 50px; padding: 3px 10px; border-radius: 12px; font-size: 0.7rem; font-weight: 700; background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink)); color: white; }
      .service-menu-btn .menu-badge.hot { background: linear-gradient(135deg, var(--neon-orange), #ef4444); }
      
      /* 서비스 상세 모달 */
      .service-modal { position: fixed; inset: 0; background: rgba(0,0,0,0.9); backdrop-filter: blur(8px); z-index: 900; display: none; overflow-y: auto; }
      .service-modal.open { display: block; }
      .service-modal-content { max-width: 900px; margin: 0 auto; padding: 20px; min-height: 100vh; }
      .service-modal-header { display: flex; justify-content: space-between; align-items: center; padding: 20px 0; position: sticky; top: 0; background: rgba(10,10,12,0.95); z-index: 10; border-bottom: 1px solid var(--border-subtle); margin-bottom: 24px; }
      .service-modal-title { font-size: 1.5rem; font-weight: 800; display: flex; align-items: center; gap: 12px; }
      .service-modal-close { background: var(--bg-tertiary); border: 1px solid var(--border-subtle); color: var(--text-primary); font-size: 1.25rem; cursor: pointer; width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
      .service-modal-close:hover { background: rgba(239, 68, 68, 0.2); border-color: #ef4444; }
      .service-modal-body { padding-bottom: 40px; }
      
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body {
        font-family: 'Inter', -apple-system, sans-serif;
        background: var(--bg-primary);
        color: var(--text-primary);
        line-height: 1.6;
        overflow-x: hidden;
        -webkit-font-smoothing: antialiased;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-touch-callout: none;
      }
      
      /* 이미지 보호 (클릭은 허용) */
      img {
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
        user-drag: none;
      }
      
      /* 입력 필드는 선택 허용 */
      input, textarea, select {
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;
      }
      
      .bg-animated { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
      .bg-gradient {
        position: absolute; inset: 0;
        background: 
          radial-gradient(ellipse 80% 50% at 20% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse 60% 40% at 80% 30%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse 50% 60% at 50% 80%, rgba(34, 211, 238, 0.08) 0%, transparent 50%);
        animation: bgPulse 20s ease-in-out infinite;
      }
      @keyframes bgPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.8; } }
      
      .main-container { position: relative; z-index: 10; }
      
      @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
      .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; opacity: 0; }
      .delay-1 { animation-delay: 0.1s; }
      .delay-2 { animation-delay: 0.2s; }
      .delay-3 { animation-delay: 0.3s; }
      
      .reveal { opacity: 0; transform: translateY(30px); transition: all 0.6s ease-out; }
      .reveal.active { opacity: 1; transform: translateY(0); }
      
      .gradient-text {
        background: linear-gradient(135deg, #a855f7, #ec4899, #22d3ee);
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: shimmer 4s linear infinite;
      }
      
      .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
      
      .hero {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 100px 20px 60px;
      }
      .hero-badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        background: rgba(168, 85, 247, 0.1);
        border: 1px solid rgba(168, 85, 247, 0.3);
        border-radius: 50px;
        font-size: 13px;
        color: var(--neon-purple);
        margin-bottom: 24px;
      }
      .status-dot { width: 8px; height: 8px; background: var(--neon-green); border-radius: 50%; animation: pulse 2s infinite; }
      @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      .hero-title { font-size: clamp(2.5rem, 8vw, 5rem); font-weight: 800; letter-spacing: -0.03em; margin-bottom: 16px; }
      .hero-tagline { font-size: clamp(0.9rem, 2vw, 1.1rem); color: var(--text-tertiary); max-width: 400px; margin-bottom: 24px; line-height: 1.7; }
      .hero-company { font-size: 0.85rem; color: var(--text-tertiary); margin-bottom: 32px; }
      .hero-company strong { color: var(--text-secondary); }
      
      .hero-buttons { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
      
      .btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 14px 28px;
        font-weight: 600;
        font-size: 14px;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.3s ease;
        border: none;
        text-decoration: none;
      }
      .btn-primary {
        background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink));
        color: white;
        box-shadow: 0 4px 20px rgba(168, 85, 247, 0.3);
      }
      .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(168, 85, 247, 0.4); }
      .btn-secondary {
        background: transparent;
        color: var(--text-secondary);
        border: 1px solid var(--border-subtle);
      }
      .btn-secondary:hover { background: rgba(255,255,255,0.05); border-color: var(--border-hover); color: white; }
      .btn-small { padding: 10px 20px; font-size: 13px; }
      
      .section { padding: 80px 20px; }
      .section-header { text-align: center; margin-bottom: 48px; }
      .section-title { font-size: clamp(1.5rem, 4vw, 2.25rem); font-weight: 800; margin-bottom: 12px; }
      .section-desc { font-size: 0.95rem; color: var(--text-tertiary); max-width: 500px; margin: 0 auto; }
      
      .grid { display: grid; gap: 16px; }
      .grid-2 { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
      .grid-3 { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
      .grid-4 { grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }
      
      .card {
        background: var(--bg-card);
        border: 1px solid var(--border-subtle);
        border-radius: 20px;
        padding: 24px;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }
      .card:hover { transform: translateY(-4px); border-color: var(--border-hover); }
      .card.recommended { border-color: rgba(168, 85, 247, 0.4); box-shadow: 0 0 30px rgba(168, 85, 247, 0.1); }
      .card-badge {
        position: absolute;
        top: 16px;
        right: 16px;
        padding: 4px 12px;
        background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink));
        border-radius: 20px;
        font-size: 11px;
        font-weight: 700;
      }
      .card-tier { font-size: 11px; font-weight: 700; letter-spacing: 1.5px; color: var(--text-tertiary); margin-bottom: 8px; text-transform: uppercase; }
      .card-name { font-size: 1.25rem; font-weight: 700; margin-bottom: 4px; }
      .card-subtitle { font-size: 0.85rem; color: var(--neon-purple); margin-bottom: 8px; }
      .card-desc { font-size: 0.85rem; color: var(--text-tertiary); margin-bottom: 16px; }
      .card-price { margin-bottom: 16px; }
      .price-value { font-size: 1.75rem; font-weight: 800; }
      .price-unit { font-size: 0.85rem; color: var(--text-secondary); }
      .price-original { font-size: 0.8rem; color: var(--text-tertiary); text-decoration: line-through; }
      .card-list { list-style: none; margin-bottom: 16px; }
      .card-list li { display: flex; align-items: flex-start; gap: 10px; padding: 6px 0; font-size: 0.85rem; color: var(--text-secondary); }
      .card-list li i { color: var(--neon-purple); margin-top: 3px; font-size: 0.75rem; }
      
      .portfolio-categories { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-bottom: 24px; }
      .portfolio-cat-btn { padding: 10px 20px; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 30px; color: var(--text-secondary); font-size: 0.85rem; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; gap: 8px; }
      .portfolio-cat-btn:hover, .portfolio-cat-btn.active { background: rgba(168, 85, 247, 0.15); border-color: var(--neon-purple); color: var(--neon-purple); }
      .portfolio-cat-btn i { font-size: 0.9rem; }
      
      .portfolio-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; }
      .portfolio-item {
        background: var(--bg-card);
        border: 1px solid var(--border-subtle);
        border-radius: 12px;
        padding: 16px;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      .portfolio-item:hover { transform: translateY(-3px); border-color: var(--border-hover); background: rgba(168, 85, 247, 0.05); }
      .portfolio-tag { font-size: 0.65rem; font-weight: 600; padding: 3px 8px; background: rgba(168, 85, 247, 0.15); border-radius: 10px; color: var(--neon-purple); display: inline-block; margin-bottom: 8px; }
      .portfolio-title { font-size: 0.85rem; font-weight: 600; color: var(--text-primary); }
      
      .portfolio-modal { position: fixed; inset: 0; background: rgba(0,0,0,0.95); z-index: 3000; display: none; flex-direction: column; }
      .portfolio-modal.open { display: flex; }
      .portfolio-modal-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; background: var(--bg-secondary); border-bottom: 1px solid var(--border-subtle); }
      .portfolio-modal-title { font-weight: 600; display: flex; align-items: center; gap: 10px; }
      .portfolio-modal-close { background: none; border: none; color: var(--text-secondary); font-size: 1.5rem; cursor: pointer; padding: 8px 16px; }
      .portfolio-modal-close:hover { color: white; }
      .portfolio-modal-body { flex: 1; position: relative; min-height: 85vh; }
      .portfolio-iframe { width: 100%; height: 100%; border: none; min-height: 85vh; }
      .portfolio-overlay { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.6); opacity: 0; pointer-events: none; transition: opacity 0.3s ease; }
      .portfolio-modal-body:hover .portfolio-overlay { opacity: 1; pointer-events: auto; }
      .portfolio-modal-body.video-mode .portfolio-overlay { display: none; }
      .portfolio-membership { background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink)); padding: 24px 48px; border-radius: 20px; text-align: center; box-shadow: 0 10px 40px rgba(168, 85, 247, 0.4); }
      .portfolio-membership i { font-size: 2.5rem; margin-bottom: 16px; display: block; }
      .portfolio-membership-text { font-weight: 700; font-size: 1.1rem; }
      
      .channel-grid { display: grid; gap: 20px; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); }
      .channel-category {
        background: linear-gradient(145deg, var(--bg-card), rgba(30, 30, 40, 0.9));
        border: 1px solid var(--border-subtle);
        border-radius: 20px;
        overflow: hidden;
        transition: all 0.3s ease;
      }
      .channel-category:hover { transform: translateY(-4px); border-color: rgba(168, 85, 247, 0.3); box-shadow: 0 10px 40px rgba(0,0,0,0.3); }
      .channel-header {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 20px 24px;
        background: rgba(255,255,255,0.03);
        border-bottom: 1px solid var(--border-subtle);
      }
      .channel-icon { font-size: 1.8rem; filter: drop-shadow(0 0 8px currentColor); }
      .channel-name { font-size: 1.2rem; font-weight: 700; letter-spacing: -0.02em; }
      .channel-services { padding: 16px; display: grid; grid-template-columns: 1fr; gap: 10px; }
      .service-item {
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.06);
        border-radius: 14px;
        padding: 16px 18px;
        transition: all 0.3s ease;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 12px;
      }
      .service-item:hover { background: rgba(168, 85, 247, 0.12); border-color: rgba(168, 85, 247, 0.4); transform: scale(1.01); }
      .service-info { flex: 1; min-width: 140px; }
      .service-name { font-weight: 600; margin-bottom: 4px; font-size: 0.95rem; }
      .service-desc { font-size: 0.8rem; color: var(--text-tertiary); }
      .service-prices { display: flex; gap: 12px; font-size: 0.85rem; }
      .service-price { display: flex; flex-direction: column; align-items: center; padding: 6px 12px; background: rgba(34, 211, 238, 0.08); border-radius: 8px; }
      .service-price-label { color: var(--text-tertiary); font-size: 0.7rem; margin-bottom: 2px; }
      .service-price-value { font-weight: 700; color: var(--neon-cyan); font-size: 0.9rem; }
      .service-price.monthly { background: rgba(168, 85, 247, 0.1); }
      .service-price.monthly .service-price-value { color: var(--neon-purple); }
      .service-price.monthly-b { background: rgba(249, 115, 22, 0.1); }
      .service-price.monthly-b .service-price-value { color: var(--neon-orange); }
      .service-add-btn { padding: 8px 16px; background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink)); border: none; border-radius: 8px; color: white; font-size: 0.75rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease; white-space: nowrap; }
      .service-add-btn:hover { transform: scale(1.05); box-shadow: 0 4px 15px rgba(168, 85, 247, 0.4); }
      .service-buttons { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
      .pricing-btn { padding: 6px 12px; font-size: 0.7rem; background: linear-gradient(135deg, var(--neon-cyan), var(--neon-purple)); }
      .pricing-btn:hover { background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink)); }
      .service-item.service-set { background: rgba(34, 211, 238, 0.08); border-color: rgba(34, 211, 238, 0.3); }
      .set-badge { background: var(--neon-cyan); color: var(--bg-primary); padding: 2px 6px; border-radius: 4px; font-size: 0.65rem; font-weight: 700; margin-left: 6px; }
      .service-notice { font-size: 0.7rem; color: var(--neon-orange); padding: 4px 8px; background: rgba(249, 115, 22, 0.1); border-radius: 6px; text-align: center; }
      .service-notice-small { font-size: 0.7rem; color: var(--neon-orange); margin-top: 6px; }
      .service-small-notice { font-size: 0.65rem; color: var(--text-tertiary); margin-top: 4px; font-style: italic; }
      .discount-badge { position: absolute; top: 40px; right: 16px; padding: 3px 10px; background: var(--neon-orange); border-radius: 12px; font-size: 0.7rem; font-weight: 700; color: white; }
      
      .cart-floating { position: fixed; bottom: 100px; right: 24px; z-index: 3000; }
      .cart-btn {
        width: 56px; height: 56px; border-radius: 50%;
        background: linear-gradient(135deg, var(--neon-cyan), var(--neon-purple));
        border: none; color: white; font-size: 1.25rem; cursor: pointer;
        box-shadow: 0 4px 20px rgba(34, 211, 238, 0.3);
        position: relative; transition: all 0.3s ease;
      }
      .cart-btn:hover { transform: scale(1.1); }
      .cart-count {
        position: absolute; top: -4px; right: -4px;
        width: 22px; height: 22px; background: var(--neon-pink);
        border-radius: 50%; font-size: 0.75rem; font-weight: 700;
        display: flex; align-items: center; justify-content: center;
      }
      .cart-panel {
        position: absolute; bottom: 70px; right: 0;
        width: 340px; max-height: 450px;
        background: var(--bg-secondary); border: 1px solid var(--border-subtle);
        border-radius: 20px; overflow: hidden;
        display: none; flex-direction: column;
        box-shadow: 0 20px 50px rgba(0,0,0,0.4);
      }
      .cart-panel.open { display: flex; }
      .cart-header { padding: 16px 20px; border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; }
      .cart-title { font-weight: 700; }
      .cart-close { background: none; border: none; color: var(--text-tertiary); cursor: pointer; }
      .cart-items { flex: 1; overflow-y: auto; padding: 12px; max-height: 200px; }
      .cart-item { display: flex; justify-content: space-between; align-items: center; padding: 10px; background: rgba(255,255,255,0.02); border-radius: 10px; margin-bottom: 8px; }
      .cart-item-name { font-size: 0.85rem; flex: 1; }
      .cart-item-price { font-size: 0.85rem; font-weight: 600; margin: 0 12px; }
      .cart-item-remove { background: none; border: none; color: var(--text-tertiary); cursor: pointer; }
      .cart-item-remove:hover { color: #ef4444; }
      .cart-empty { text-align: center; padding: 32px; color: var(--text-tertiary); font-size: 0.85rem; }
      .cart-footer { padding: 16px; border-top: 1px solid var(--border-subtle); }
      .cart-regional { display: flex; align-items: center; gap: 8px; font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 12px; }
      .cart-regional input { accent-color: var(--neon-purple); }
      .cart-total { display: flex; justify-content: space-between; font-weight: 700; font-size: 1.1rem; margin-bottom: 12px; }
      
      .chat-widget { position: fixed; bottom: 24px; right: 24px; z-index: 3000; }
      .chat-bubble {
        width: 56px; height: 56px; border-radius: 50%;
        background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink));
        border: none; color: white; font-size: 1.25rem; cursor: pointer;
        box-shadow: 0 4px 20px rgba(168, 85, 247, 0.4);
        transition: all 0.3s ease;
      }
      .chat-bubble:hover { transform: scale(1.1); }
      .chat-window {
        position: absolute; bottom: 70px; right: 0;
        width: 380px; max-height: 520px;
        background: var(--bg-secondary); border: 1px solid var(--border-subtle);
        border-radius: 20px; overflow: hidden;
        display: none; flex-direction: column;
        box-shadow: 0 20px 50px rgba(0,0,0,0.4);
      }
      .chat-window.open { display: flex; }
      .chat-header { display: flex; align-items: center; justify-content: space-between; padding: 16px; border-bottom: 1px solid var(--border-subtle); background: var(--bg-tertiary); }
      .chat-avatar { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink)); display: flex; align-items: center; justify-content: center; }
      .chat-info { margin-left: 12px; flex: 1; }
      .chat-name { font-weight: 600; font-size: 0.95rem; }
      .chat-status { font-size: 0.75rem; color: var(--text-tertiary); }
      .chat-close { background: none; border: none; color: var(--text-tertiary); cursor: pointer; }
      .chat-messages { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 12px; max-height: 320px; }
      .message { display: flex; gap: 10px; max-width: 85%; }
      .message.user { flex-direction: row-reverse; margin-left: auto; }
      .message-avatar { width: 28px; height: 28px; border-radius: 50%; background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink)); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 0.7rem; }
      .message-content { background: var(--bg-tertiary); padding: 12px 16px; border-radius: 16px; border-top-left-radius: 4px; font-size: 0.85rem; line-height: 1.5; color: var(--text-secondary); }
      .message.user .message-content { background: rgba(168, 85, 247, 0.2); border-radius: 16px; border-top-right-radius: 4px; color: var(--text-primary); }
      .chat-input-area { padding: 12px 16px; border-top: 1px solid var(--border-subtle); display: flex; gap: 8px; align-items: center; background: var(--bg-tertiary); }
      .chat-input { flex: 1; background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 12px 16px; font-size: 0.85rem; color: var(--text-primary); outline: none; }
      .chat-input:focus { border-color: rgba(168, 85, 247, 0.5); }
      .admin-key { background: none; border: none; color: var(--text-tertiary); opacity: 0.3; cursor: pointer; font-size: 0.8rem; }
      .admin-key:hover { opacity: 1; color: var(--neon-purple); }
      .chat-send { width: 40px; height: 40px; border-radius: 10px; background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink)); border: none; color: white; cursor: pointer; }
      
      .modal { position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px); z-index: 2000; display: none; align-items: center; justify-content: center; padding: 20px; }
      .modal.open { display: flex; }
      .modal-content { background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: 24px; padding: 32px; max-width: 420px; width: 100%; max-height: 90vh; overflow-y: auto; }
      .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
      .modal-title { font-size: 1.25rem; font-weight: 700; }
      .modal-close { background: none; border: none; color: var(--text-tertiary); cursor: pointer; font-size: 1.25rem; }
      .admin-input { width: 100%; background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 14px 18px; font-size: 0.95rem; color: var(--text-primary); outline: none; margin-bottom: 12px; }
      .admin-input:focus { border-color: rgba(168, 85, 247, 0.5); }
      .admin-label { display: block; font-size: 0.8rem; color: var(--text-tertiary); margin-bottom: 6px; }
      .admin-success { color: var(--neon-green); font-size: 0.85rem; margin-bottom: 16px; display: flex; align-items: center; gap: 6px; }
      
      /* 로그인 유도 모달 */
      .login-modal { position: fixed; inset: 0; background: rgba(0,0,0,0.9); backdrop-filter: blur(12px); z-index: 5000; display: none; align-items: center; justify-content: center; padding: 20px; }
      .login-modal.open { display: flex; }
      .login-modal-content { background: linear-gradient(145deg, var(--bg-secondary), var(--bg-tertiary)); border: 2px solid var(--neon-purple); border-radius: 24px; padding: 32px; max-width: 420px; width: 100%; text-align: center; animation: loginPop 0.4s ease; }
      @keyframes loginPop { from { transform: scale(0.9) translateY(20px); opacity: 0; } to { transform: scale(1) translateY(0); opacity: 1; } }
      .login-modal-icon { font-size: 3rem; margin-bottom: 16px; }
      .login-modal-title { font-size: 1.5rem; font-weight: 800; margin-bottom: 8px; }
      .login-modal-subtitle { font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 24px; }
      .login-benefits { background: var(--bg-tertiary); border-radius: 16px; padding: 20px; margin-bottom: 24px; text-align: left; }
      .login-benefit-item { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
      .login-benefit-item:last-child { border-bottom: none; }
      .login-benefit-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1rem; }
      .login-benefit-icon.purple { background: rgba(168,85,247,0.2); color: var(--neon-purple); }
      .login-benefit-icon.green { background: rgba(34,197,94,0.2); color: var(--neon-green); }
      .login-benefit-icon.cyan { background: rgba(34,211,238,0.2); color: var(--neon-cyan); }
      .login-benefit-text { flex: 1; }
      .login-benefit-title { font-weight: 700; font-size: 0.95rem; }
      .login-benefit-desc { font-size: 0.8rem; color: var(--text-secondary); }
      .social-login-btn { width: 100%; padding: 16px; border-radius: 12px; font-size: 1rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 12px; border: none; transition: all 0.3s ease; }
      .social-login-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,0,0,0.3); }
      .kakao-login-btn { background: #FEE500; color: #000; }
      .naver-login-btn { background: #03C75A; color: #fff; }
      .login-modal-referral { margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); }
      .login-modal-referral input { width: 100%; background: var(--bg-tertiary); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 12px 16px; color: var(--text-primary); font-size: 0.9rem; text-align: center; }
      .login-modal-referral input::placeholder { color: var(--text-tertiary); }
      .login-modal-skip { margin-top: 16px; background: transparent; border: 1px solid rgba(255,255,255,0.2); color: var(--text-secondary); padding: 12px; border-radius: 10px; width: 100%; cursor: pointer; font-size: 0.9rem; }
      .login-modal-skip:hover { border-color: var(--text-secondary); }
      .login-modal-close { position: absolute; top: 16px; right: 16px; background: transparent; border: none; color: var(--text-tertiary); font-size: 1.2rem; cursor: pointer; }
      
      /* 결제 완료 후 모달 */
      .success-modal { position: fixed; inset: 0; background: rgba(0,0,0,0.9); backdrop-filter: blur(12px); z-index: 5000; display: none; align-items: center; justify-content: center; padding: 20px; }
      .success-modal.open { display: flex; }
      .success-content { background: linear-gradient(145deg, var(--bg-secondary), var(--bg-tertiary)); border: 2px solid var(--neon-green); border-radius: 24px; padding: 32px; max-width: 500px; width: 100%; max-height: 90vh; overflow-y: auto; text-align: center; animation: successPop 0.5s ease; }
      @keyframes successPop { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      .success-icon { font-size: 4rem; color: var(--neon-green); margin-bottom: 16px; animation: checkBounce 0.8s ease; }
      @keyframes checkBounce { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-15px); } 60% { transform: translateY(-8px); } }
      .success-title { font-size: 1.8rem; font-weight: 800; color: var(--neon-green); margin-bottom: 8px; }
      .success-subtitle { font-size: 1rem; color: var(--text-secondary); margin-bottom: 24px; }
      .success-order-info { background: var(--bg-tertiary); border-radius: 16px; padding: 20px; margin-bottom: 24px; text-align: left; }
      .success-order-title { font-size: 0.85rem; color: var(--text-tertiary); margin-bottom: 8px; }
      .success-order-name { font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
      .success-order-amount { font-size: 1.5rem; font-weight: 800; color: var(--neon-purple); }
      
      .success-section { margin-top: 24px; text-align: left; }
      .success-section-title { font-size: 1rem; font-weight: 700; color: var(--neon-cyan); margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
      .success-questionnaire { background: var(--bg-tertiary); border-radius: 16px; padding: 20px; margin-bottom: 16px; }
      .success-question { margin-bottom: 16px; }
      .success-question:last-child { margin-bottom: 0; }
      .success-question label { display: block; font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 8px; }
      .success-question input, .success-question textarea, .success-question select { width: 100%; background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: 10px; padding: 12px 16px; font-size: 0.95rem; color: var(--text-primary); outline: none; }
      .success-question input:focus, .success-question textarea:focus, .success-question select:focus { border-color: var(--neon-purple); }
      .success-question textarea { resize: vertical; min-height: 80px; }
      
      .success-contact-option { display: flex; gap: 12px; margin-top: 20px; flex-wrap: wrap; }
      .contact-option-btn { flex: 1; min-width: 120px; padding: 14px; border-radius: 12px; font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease; border: 2px solid transparent; text-align: center; }
      .contact-option-btn.phone { background: linear-gradient(135deg, #22c55e, #16a34a); border-color: #22c55e; color: white; }
      .contact-option-btn.visit { background: linear-gradient(135deg, #3b82f6, #2563eb); border-color: #3b82f6; color: white; }
      .contact-option-btn.submit { background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink)); border-color: var(--neon-purple); color: white; }
      .contact-option-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 15px rgba(0,0,0,0.3); }
      
      .success-footer { margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--border-subtle); }
      .success-close-btn { width: 100%; padding: 16px; background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: 12px; color: var(--text-secondary); font-size: 0.95rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease; }
      .success-close-btn:hover { background: var(--bg-secondary); color: var(--text-primary); }
      
      .footer { padding: 40px 20px 100px; border-top: 1px solid var(--border-subtle); text-align: center; }
      .footer-logo { font-size: 1.5rem; font-weight: 800; margin-bottom: 8px; }
      .footer-company { font-size: 0.85rem; color: var(--text-tertiary); margin-bottom: 12px; }
      .footer-copy { font-size: 0.75rem; color: var(--text-tertiary); }
      
      /* 하단 고정 결제 바 */
      .checkout-bar {
        position: fixed; bottom: 0; left: 0; right: 0; z-index: 3001;
        background: linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary));
        border-top: 1px solid var(--border-subtle);
        padding: 12px 20px; padding-bottom: max(12px, env(safe-area-inset-bottom));
        box-shadow: 0 -4px 30px rgba(0,0,0,0.4);
      }
      .checkout-bar-content { display: flex; justify-content: space-between; align-items: center; max-width: 600px; margin: 0 auto; gap: 16px; }
      .checkout-info { display: flex; align-items: center; gap: 10px; cursor: pointer; flex: 1; }
      .checkout-info i { color: var(--neon-cyan); font-size: 1.2rem; }
      .checkout-total { font-weight: 800; font-size: 1.1rem; color: var(--neon-purple); margin-left: auto; }
      .checkout-btn {
        background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink));
        border: none; color: white; padding: 14px 28px; border-radius: 12px;
        font-weight: 700; font-size: 0.95rem; cursor: pointer;
        box-shadow: 0 4px 20px rgba(168, 85, 247, 0.4);
        transition: all 0.3s ease; white-space: nowrap;
      }
      .checkout-btn:hover { transform: scale(1.05); }
      
      @media (max-width: 1024px) {
        .grid-4 { grid-template-columns: repeat(2, 1fr); }
        .grid-3 { grid-template-columns: repeat(2, 1fr); }
        .channel-grid { grid-template-columns: repeat(2, 1fr); }
      }
      
      @media (max-width: 768px) {
        .hero { padding: 80px 16px 40px; min-height: auto; }
        .hero-title { font-size: 2.5rem; }
        .section { padding: 50px 16px; }
        .section-header { margin-bottom: 32px; }
        .section-title { font-size: 1.5rem; }
        .hero-buttons { flex-direction: column; width: 100%; max-width: 280px; }
        .hero-buttons .btn { width: 100%; justify-content: center; }
        .chat-window { position: fixed; bottom: 0; right: 0; left: 0; width: 100%; max-height: 75vh; border-radius: 20px 20px 0 0; }
        .cart-panel { position: fixed; bottom: 0; right: 0; left: 0; width: 100%; max-height: 65vh; border-radius: 20px 20px 0 0; }
        .cart-floating { bottom: 100px; right: 16px; }
        .chat-widget { bottom: 16px; right: 16px; }
        .portfolio-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
        .grid-4, .grid-3, .grid-2 { grid-template-columns: 1fr; gap: 14px; }
        .channel-grid { grid-template-columns: 1fr; gap: 16px; }
        .service-item { flex-direction: column; align-items: stretch; gap: 10px; }
        .service-prices { justify-content: center; gap: 12px; }
        .service-add-btn { width: 100%; padding: 10px; }
        .card { padding: 20px; }
        .portfolio-categories { gap: 8px; }
        .portfolio-cat-btn { padding: 8px 14px; font-size: 0.8rem; }
      }
      
      @media (max-width: 480px) {
        .hero { padding: 70px 14px 30px; }
        .hero-title { font-size: 2rem; }
        .section { padding: 40px 14px; }
        .portfolio-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
        .portfolio-item { padding: 12px; }
        .portfolio-title { font-size: 0.8rem; }
        .card { padding: 18px; border-radius: 16px; }
        .price-value { font-size: 1.4rem; }
        .card-list li { font-size: 0.8rem; }
        .cart-btn, .chat-bubble { width: 50px; height: 50px; font-size: 1.1rem; }
      }
      
      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(168, 85, 247, 0.3); border-radius: 3px; }
    </style>
</head>
<body>
    <div class="bg-animated"><div class="bg-gradient"></div></div>
    
    <div class="main-container">
      <section class="hero">
        <div class="hero-badge animate-fade-in-up">
          <span class="status-dot"></span>
          <span>Available for Projects</span>
        </div>
        <h1 class="hero-title animate-fade-in-up delay-1"><span class="gradient-text">X I Λ I X</span></h1>
        <p class="hero-tagline animate-fade-in-up delay-2">
          남들이 <strong>'V'</strong>(Vision)를 볼 때,<br>
          우리는 세상을 뒤집어 <strong>'∧'</strong>(Angle)를 봅니다.
        </p>
        <div class="hero-company animate-fade-in-up delay-2">
          <strong>Combine Technology & Business</strong><br>
          사장님의 Business에 최신 Technology(AI)를 결합합니다.
        </div>
        <div class="hero-buttons animate-fade-in-up delay-3">
          <button class="btn btn-primary" onclick="scrollTo('portfolio')"><i class="fas fa-images"></i>포트폴리오</button>
          <button class="btn btn-secondary" onclick="openChat()"><i class="fas fa-comments"></i>AI 상담</button>
        </div>
      </section>
      
      <section id="portfolio" class="section">
        <div class="container">
          <div class="section-header reveal">
            <h2 class="section-title"><span class="gradient-text">포트폴리오</span></h2>
            <p class="section-desc">카테고리를 클릭하면 프로젝트를 확인할 수 있어요</p>
          </div>
          <div class="service-menu-grid" id="portfolio-menu"></div>
        </div>
      </section>
      
      <!-- 서비스 메뉴 섹션 - 컴팩트한 버튼 형태 -->
      <section id="services" class="section">
        <div class="container">
          <div class="section-header reveal">
            <h2 class="section-title"><span class="gradient-text">서비스</span> 메뉴</h2>
            <p class="section-desc">클릭하면 상세 내용을 확인할 수 있어요</p>
          </div>
          <div class="service-menu-grid reveal">
            <button class="service-menu-btn hot" onclick="openServiceModal('sets')" style="--btn-color: #f97316">
              <i class="fas fa-fire"></i>
              <span class="menu-name">🔥 SNS 셋트 메뉴</span>
              <span class="menu-desc">셋팅+월관리 통합 패키지 (118만~498만)</span>
              <span class="menu-badge hot">추천</span>
              <i class="fas fa-chevron-right menu-arrow"></i>
            </button>
            <button class="service-menu-btn" onclick="openServiceModal('pricing')" style="--btn-color: #a855f7">
              <i class="fas fa-tags"></i>
              <span class="menu-name">채널별 가격표</span>
              <span class="menu-desc">셋팅비 + 월관리비 상세 안내</span>
              <i class="fas fa-chevron-right menu-arrow"></i>
            </button>
            <button class="service-menu-btn" onclick="openServiceModal('websites')" style="--btn-color: #22c55e">
              <i class="fas fa-globe"></i>
              <span class="menu-name">웹사이트 구축</span>
              <span class="menu-desc">180만~800만 (AI 상담봇 포함)</span>
              <i class="fas fa-chevron-right menu-arrow"></i>
            </button>
            <button class="service-menu-btn" onclick="openServiceModal('addons')" style="--btn-color: #8b5cf6">
              <i class="fas fa-plus-circle"></i>
              <span class="menu-name">부가 서비스</span>
              <span class="menu-desc">브랜드영상/상세페이지/부스팅</span>
              <i class="fas fa-chevron-right menu-arrow"></i>
            </button>
          </div>
        </div>
      </section>
      
      <footer class="footer">
        <div class="footer-logo gradient-text">X I Λ I X</div>
        <div class="footer-company">Combine Technology & Business | 대표: 방익주</div>
        <div class="footer-copy">© 2026 X I Λ I X. All rights reserved.</div>
      </footer>
    </div>
    
    <!-- 서비스 상세 모달 -->
    <div class="service-modal" id="service-modal">
      <div class="service-modal-content">
        <div class="service-modal-header">
          <h2 class="service-modal-title"><i class="fas fa-list" id="service-modal-icon"></i><span id="service-modal-name">서비스</span></h2>
          <button class="service-modal-close" onclick="closeServiceModal()"><i class="fas fa-times"></i></button>
        </div>
        <div class="service-modal-body" id="service-modal-body"></div>
      </div>
    </div>
    
    <div class="portfolio-modal" id="portfolio-modal">
      <div class="portfolio-modal-header">
        <div class="portfolio-modal-title">
          <i class="fas fa-globe"></i>
          <span id="portfolio-modal-name">프로젝트</span>
        </div>
        <button class="portfolio-modal-close" onclick="closePortfolioModal()"><i class="fas fa-times"></i></button>
      </div>
      <div class="portfolio-modal-body">
        <iframe id="portfolio-iframe" class="portfolio-iframe" src="about:blank"></iframe>
        <div class="portfolio-overlay">
          <div class="portfolio-membership">
            <i class="fas fa-lock"></i>
            <div class="portfolio-membership-text">회원제로 운영중</div>
            <div style="font-size:0.8rem;margin-top:8px;opacity:0.8;">미리보기만 가능합니다</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 하단 고정 결제 바 (장바구니에 아이템 있을 때만 표시) -->
    <div class="checkout-bar" id="checkout-bar" style="display:none;">
      <div class="checkout-bar-content">
        <div class="checkout-info" onclick="toggleCart()">
          <i class="fas fa-shopping-cart"></i>
          <span id="checkout-count">0</span>개 상품
          <span class="checkout-total" id="checkout-total-display">0원</span>
        </div>
        <button class="checkout-btn" onclick="checkout()"><i class="fas fa-credit-card"></i>결제하기</button>
      </div>
    </div>
    
    <div class="cart-floating">
      <button class="cart-btn" onclick="toggleCart()">
        <i class="fas fa-shopping-cart"></i>
        <span class="cart-count" id="cart-count">0</span>
      </button>
      <div class="cart-panel" id="cart-panel">
        <div class="cart-header">
          <span class="cart-title"><i class="fas fa-shopping-cart"></i> 장바구니</span>
          <button class="cart-close" onclick="toggleCart()"><i class="fas fa-times"></i></button>
        </div>
        <div class="cart-items" id="cart-items"><div class="cart-empty">항목을 추가하세요</div></div>
        <div class="cart-footer">
          <label class="cart-regional"><input type="checkbox" id="regional-fee" onchange="updateCart()">지방 출장비 (+30만원)</label>
          <div class="cart-total"><span>총 금액</span><span id="cart-total">0원</span></div>
          <button class="btn btn-primary" style="width:100%;" onclick="checkout()"><i class="fas fa-credit-card"></i>결제하기</button>
        </div>
      </div>
    </div>
    
    <div class="chat-widget">
      <div class="chat-window" id="chat-window">
        <div class="chat-header">
          <div style="display:flex;align-items:center;">
            <div class="chat-avatar"><i class="fas fa-user-tie"></i></div>
            <div class="chat-info"><div class="chat-name">X I Λ I X 봇</div><div class="chat-status">맞춤 솔루션 상담</div></div>
          </div>
          <button class="chat-close" onclick="closeChat()"><i class="fas fa-times"></i></button>
        </div>
        <div class="chat-messages" id="chat-messages">
          <div class="message"><div class="message-avatar"><i class="fas fa-robot"></i></div><div class="message-content">안녕하세요!<br>X I Λ I X 마케팅 상담 <strong>봇</strong>입니다 😊<br><br>20년 경력 마케팅 전문가 기반으로<br>맞춤 솔루션을 안내해드려요!<br><br>어떤 사업을 운영하고 계신가요?</div></div>
        </div>
        <div class="chat-input-area">
          <input type="text" class="chat-input" id="chat-input" placeholder="메시지 입력..." onkeypress="if(event.key==='Enter')sendMessage()">
          <button class="admin-key" onclick="openAdminModal()"><i class="fas fa-key"></i></button>
          <button class="chat-send" onclick="sendMessage()"><i class="fas fa-paper-plane"></i></button>
        </div>
      </div>
      <button class="chat-bubble" onclick="toggleChat()"><i class="fas fa-comments"></i></button>
    </div>
    
    <div class="modal" id="admin-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">관리자 모드</h3>
          <button class="modal-close" onclick="closeAdminModal()"><i class="fas fa-times"></i></button>
        </div>
        <div id="admin-login">
          <input type="password" class="admin-input" id="admin-password" placeholder="비밀번호" onkeypress="if(event.key==='Enter')verifyAdmin()">
          <button class="btn btn-primary" style="width:100%;" onclick="verifyAdmin()">확인</button>
        </div>
        <div id="admin-panel" style="display:none;">
          <div class="admin-success"><i class="fas fa-check-circle"></i>관리자 모드 활성화</div>
          <label class="admin-label">고객명</label>
          <input type="text" class="admin-input" id="custom-name" placeholder="고객 이름">
          <label class="admin-label">이메일</label>
          <input type="email" class="admin-input" id="custom-email" placeholder="email@example.com">
          <label class="admin-label">연락처</label>
          <input type="tel" class="admin-input" id="custom-phone" placeholder="010-0000-0000">
          <label class="admin-label">맞춤 금액 (원)</label>
          <input type="number" class="admin-input" id="custom-amount" placeholder="1000000">
          <button class="btn btn-primary" style="width:100%;" onclick="processCustomPayment()"><i class="fas fa-credit-card"></i>결제 링크 생성</button>
        </div>
      </div>
    </div>
    
    <!-- 로그인 유도 모달 -->
    <div class="login-modal" id="login-modal">
      <div class="login-modal-content" style="position:relative;">
        <button class="login-modal-close" onclick="closeLoginModal()"><i class="fas fa-times"></i></button>
        <div class="login-modal-icon">🔐</div>
        <h2 class="login-modal-title">3초 로그인으로<br>더 많은 혜택을!</h2>
        <p class="login-modal-subtitle">간편 로그인 후 결제를 진행해주세요</p>
        
        <div class="login-benefits">
          <div class="login-benefit-item">
            <div class="login-benefit-icon purple"><i class="fas fa-ticket-alt"></i></div>
            <div class="login-benefit-text">
              <div class="login-benefit-title">첫 가입 5% 할인쿠폰</div>
              <div class="login-benefit-desc">지금 바로 사용 가능!</div>
            </div>
          </div>
          <div class="login-benefit-item">
            <div class="login-benefit-icon green"><i class="fas fa-gift"></i></div>
            <div class="login-benefit-text">
              <div class="login-benefit-title">친구 추천하면 10% 할인</div>
              <div class="login-benefit-desc">추천할수록 혜택 UP!</div>
            </div>
          </div>
          <div class="login-benefit-item">
            <div class="login-benefit-icon cyan"><i class="fas fa-history"></i></div>
            <div class="login-benefit-text">
              <div class="login-benefit-title">결제 내역 & 진행상황</div>
              <div class="login-benefit-desc">마이페이지에서 한눈에</div>
            </div>
          </div>
        </div>
        
        <button class="social-login-btn kakao-login-btn" onclick="loginForCheckout('kakao')">
          <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3z"/></svg>
          카카오로 3초 로그인
        </button>
        
        <button class="social-login-btn naver-login-btn" onclick="loginForCheckout('naver')">
          <span style="font-weight:900;font-size:1.1rem;">N</span>
          네이버로 3초 로그인
        </button>
        
        <div class="login-modal-referral">
          <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:10px;">추천코드가 있다면?</p>
          <input type="text" id="checkout-referral-code" placeholder="추천코드 입력 (예: XIVAB123)" maxlength="10">
        </div>
        
        <button class="login-modal-skip" onclick="skipLoginAndCheckout()">
          로그인 없이 결제하기
        </button>
      </div>
    </div>
    
    <!-- 결제 완료 후 모달 -->
    <div class="success-modal" id="success-modal">
      <div class="success-content">
        <div class="success-icon"><i class="fas fa-check-circle"></i></div>
        <h2 class="success-title">결제 완료! 🎉</h2>
        <p class="success-subtitle">감사합니다. 곧 담당자가 연락드리겠습니다.</p>
        
        <div class="success-order-info">
          <div class="success-order-title">주문 내역</div>
          <div class="success-order-name" id="success-order-name">SNS 스타터 세트</div>
          <div class="success-order-amount" id="success-order-amount">118만원</div>
        </div>
        
        <div class="success-section">
          <div class="success-section-title"><i class="fas fa-clipboard-list"></i> 빠른 진행을 위한 질문</div>
          <div class="success-questionnaire">
            <div class="success-question">
              <label>1. 업종을 선택해주세요</label>
              <select id="q-industry">
                <option value="">선택해주세요</option>
                <option value="병원">병원/의원</option>
                <option value="학원">학원/교육</option>
                <option value="미용">미용/뷰티</option>
                <option value="카페">카페/음식점</option>
                <option value="쇼핑몰">쇼핑몰/이커머스</option>
                <option value="부동산">부동산/인테리어</option>
                <option value="IT">IT/스타트업</option>
                <option value="기타">기타</option>
              </select>
            </div>
            <div class="success-question">
              <label>2. 현재 SNS 운영 상황</label>
              <select id="q-sns-status">
                <option value="">선택해주세요</option>
                <option value="없음">아직 계정 없음</option>
                <option value="방치">계정 있지만 방치 중</option>
                <option value="운영중">직접 운영 중 (효과 미미)</option>
                <option value="대행중">현재 다른 곳에서 대행 중</option>
              </select>
            </div>
            <div class="success-question">
              <label>3. 가장 원하는 목표</label>
              <select id="q-goal">
                <option value="">선택해주세요</option>
                <option value="인지도">브랜드 인지도 향상</option>
                <option value="고객유입">온라인 고객 유입 증가</option>
                <option value="매출">직접 매출 증가</option>
                <option value="상위노출">네이버/인스타 상위노출</option>
                <option value="전체">전체적인 마케팅 개선</option>
              </select>
            </div>
            <div class="success-question">
              <label>4. 추가 요청사항 (선택)</label>
              <textarea id="q-additional" placeholder="특별히 원하시는 것이나 참고사항이 있으시면 적어주세요"></textarea>
            </div>
          </div>
        </div>
        
        <div class="success-section">
          <div class="success-section-title"><i class="fas fa-headset"></i> 상담 진행 방식</div>
          <p style="font-size:0.9rem;color:var(--text-secondary);margin-bottom:16px;">바쁘시면 연락처만 남겨주셔도 됩니다!</p>
          <div class="success-contact-option">
            <button class="contact-option-btn phone" onclick="selectContactOption('phone')">
              <i class="fas fa-phone-alt"></i><br>전화 상담
            </button>
            <button class="contact-option-btn visit" onclick="selectContactOption('visit')">
              <i class="fas fa-building"></i><br>방문 상담
            </button>
          </div>
          <div id="contact-input-area" style="margin-top:16px;display:none;">
            <div class="success-question">
              <label id="contact-input-label">연락처를 입력해주세요</label>
              <input type="tel" id="q-contact" placeholder="010-0000-0000">
            </div>
            <div class="success-question">
              <label>희망 연락 시간</label>
              <select id="q-contact-time">
                <option value="언제든">언제든 괜찮아요</option>
                <option value="오전">오전 (9시~12시)</option>
                <option value="오후">오후 (12시~6시)</option>
                <option value="저녁">저녁 (6시~9시)</option>
              </select>
            </div>
          </div>
        </div>
        
        <div class="success-contact-option" style="margin-top:20px;">
          <button class="contact-option-btn submit" onclick="submitQuestionnaire()" style="flex:2;">
            <i class="fas fa-paper-plane"></i> 질문지 제출하기
          </button>
        </div>
        
        <div class="success-footer">
          <button class="success-close-btn" onclick="closeSuccessModal()">
            <i class="fas fa-times"></i> 나중에 제출할게요
          </button>
        </div>
      </div>
    </div>
    
    <script>
      const portfolioData = ${JSON.stringify(PORTFOLIO_DATA)};
      const channelServices = ${JSON.stringify(CHANNEL_SERVICES)};
      const marketingSetup = ${JSON.stringify(MARKETING_SETUP)};
      const monthlyGrades = ${JSON.stringify(MONTHLY_GRADES)};
      const setMenus = ${JSON.stringify(SET_MENUS)};
      const websitePackages = ${JSON.stringify(WEBSITE_PACKAGES)};
      const addonServices = ${JSON.stringify(ADDON_SERVICES)};
      const webDevOptions = ${JSON.stringify(WEB_DEV_OPTIONS)};
      
      let cart = [];
      let chatHistory = [];
      let currentCategory = 'all';
      let lastPaymentInfo = { orderName: '', amount: 0, customerInfo: {} };
      
      const colorMap = { cyan: '#22d3ee', purple: '#a855f7', orange: '#f97316', pink: '#ec4899' };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
      }, { threshold: 0.1 });
      
      function renderPortfolioMenu() {
        const container = document.getElementById('portfolio-menu');
        container.innerHTML = portfolioData.categories.map(cat => {
          const count = portfolioData.items.filter(i => i.category === cat.id).length;
          return '<button class="service-menu-btn portfolio-cat-btn" data-category="' + cat.id + '" style="--btn-color:' + cat.color + '"><i class="fas ' + cat.icon + '"></i><div class="menu-text"><span class="menu-name">' + cat.name + '</span><span class="menu-desc">' + count + '개 프로젝트</span></div><i class="fas fa-chevron-right menu-arrow"></i></button>';
        }).join('');
        // 이벤트 리스너 추가
        container.querySelectorAll('.portfolio-cat-btn').forEach(btn => {
          btn.addEventListener('click', () => openPortfolioCategoryModal(btn.dataset.category));
        });
      }
      
      function openPortfolioCategoryModal(category) {
        const cat = portfolioData.categories.find(c => c.id === category);
        const items = portfolioData.items.filter(p => p.category === category);
        document.getElementById('service-modal-icon').className = 'fas ' + cat.icon;
        document.getElementById('service-modal-icon').style.color = cat.color;
        document.getElementById('service-modal-name').textContent = cat.name + ' 포트폴리오';
        const body = document.getElementById('service-modal-body');
        body.innerHTML = '<div class="portfolio-grid" id="portfolio-items-grid"></div>';
        const grid = document.getElementById('portfolio-items-grid');
        items.forEach(p => {
          const div = document.createElement('div');
          div.className = 'portfolio-item' + (p.isVideo ? ' video-item' : '');
          div.innerHTML = '<span class="portfolio-tag">' + (p.isVideo ? '<i class="fas fa-play-circle"></i> ' : '') + p.tag + '</span><div class="portfolio-title">' + p.title + '</div>';
          div.addEventListener('click', () => openPortfolioModal(p.url, p.title, p.isVideo || false));
          grid.appendChild(div);
        });
        document.getElementById('service-modal').classList.add('open');
        document.body.style.overflow = 'hidden';
        // 뒤로가기 시 모달 닫기 위해 히스토리 추가
        history.pushState({ modal: 'service' }, '', '');
      }
      
      function openPortfolioModal(url, title, isVideo) {
        document.getElementById('portfolio-modal-name').textContent = title;
        const modalBody = document.querySelector('.portfolio-modal-body');
        const iframe = document.getElementById('portfolio-iframe');
        
        if (isVideo) {
          modalBody.classList.add('video-mode');
          iframe.src = url + '?autoplay=1&rel=0';
          iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        } else {
          modalBody.classList.remove('video-mode');
          iframe.src = url;
          iframe.removeAttribute('allow');
        }
        document.getElementById('portfolio-modal').classList.add('open');
        // 뒤로가기 시 모달 닫기 위해 히스토리 추가
        history.pushState({ modal: 'portfolio' }, '', '');
      }
      
      function closePortfolioModal(skipHistory) {
        document.getElementById('portfolio-modal').classList.remove('open');
        document.getElementById('portfolio-iframe').src = 'about:blank';
        document.querySelector('.portfolio-modal-body').classList.remove('video-mode');
        document.body.style.overflow = '';
        // 뒤로가기로 닫힌 경우가 아니면 히스토리에서 제거
        if (!skipHistory && history.state && history.state.modal === 'portfolio') {
          history.back();
        }
      }
      
      // 서비스 모달 열기/닫기
      const serviceConfig = {
        sets: { icon: 'fa-fire', name: '🔥 SNS 셋트 메뉴 (셋팅+월관리)', color: '#f97316' },
        pricing: { icon: 'fa-tags', name: '채널별 가격표', color: '#a855f7' },
        websites: { icon: 'fa-globe', name: '웹사이트 구축', color: '#22c55e' },
        addons: { icon: 'fa-plus-circle', name: '부가 서비스', color: '#8b5cf6' }
      };
      
      function openServiceModal(type) {
        const config = serviceConfig[type];
        document.getElementById('service-modal-icon').className = 'fas ' + config.icon;
        document.getElementById('service-modal-icon').style.color = config.color;
        document.getElementById('service-modal-name').textContent = config.name;
        const body = document.getElementById('service-modal-body');
        
        if (type === 'sets') body.innerHTML = renderSetsHTML();
        else if (type === 'pricing') body.innerHTML = renderPricingHTML();
        else if (type === 'websites') body.innerHTML = '<div class="grid grid-2">' + renderWebsitesHTML() + '</div>';
        else if (type === 'addons') body.innerHTML = '<div class="grid grid-2">' + renderAddonsHTML() + '</div>';
        
        document.getElementById('service-modal').classList.add('open');
        document.body.style.overflow = 'hidden';
        // 뒤로가기 시 모달 닫기 위해 히스토리 추가
        history.pushState({ modal: 'service' }, '', '');
      }
      
      function closeServiceModal(skipHistory) {
        document.getElementById('service-modal').classList.remove('open');
        document.body.style.overflow = '';
        // 뒤로가기로 닫힌 경우가 아니면 히스토리에서 제거
        if (!skipHistory && history.state && history.state.modal === 'service') {
          history.back();
        }
      }
      
      function renderChannelsHTML() {
        return '<div class="channel-grid">' + channelServices.map(cat => '<div class="channel-category"><div class="channel-header"><i class="' + cat.icon + ' channel-icon" style="color:' + cat.color + '"></i><span class="channel-name">' + cat.name + '</span></div><div class="channel-services">' + cat.services.map(svc => {
          let priceHtml = '';
          if (svc.setupFee > 0) {
            priceHtml += '<div class="service-price"><span class="service-price-label">셋팅</span><span class="service-price-value">' + (svc.setupFee/10000) + '만</span></div>';
          }
          if (svc.hasAB) {
            priceHtml += '<div class="service-price monthly"><span class="service-price-label">월A형</span><span class="service-price-value">' + (svc.monthlyFeeA/10000) + '만</span></div>';
            priceHtml += '<div class="service-price monthly-b"><span class="service-price-label">월B형</span><span class="service-price-value">' + (svc.monthlyFeeB/10000) + '만</span></div>';
          } else if (svc.monthlyFee > 0) {
            priceHtml += '<div class="service-price monthly"><span class="service-price-label">월관리</span><span class="service-price-value">' + (svc.monthlyFee/10000) + '만</span></div>';
          } else if (svc.notice) {
            priceHtml += '<div class="service-notice">' + svc.notice + '</div>';
          }
          const cartPrice = svc.setupFee || svc.monthlyFee || svc.monthlyFeeA || 0;
          return '<div class="service-item' + (svc.isSet ? ' service-set' : '') + '"><div class="service-info"><div class="service-name">' + svc.name + (svc.isSet ? ' <span class="set-badge">SET</span>' : '') + '</div><div class="service-desc">' + svc.desc + '</div>' + (svc.notice && !svc.hasAB && svc.monthlyFee !== 0 ? '<div class="service-notice-small">' + svc.notice + '</div>' : '') + (svc.smallNotice ? '<div class="service-small-notice">⚠️ ' + svc.smallNotice + '</div>' : '') + '</div><div class="service-prices">' + priceHtml + '</div>' + (cartPrice > 0 ? '<button class="service-add-btn" onclick="addToCart(\\'channel\\', \\'' + svc.id + '\\', \\'[' + cat.name + '] ' + svc.name + '\\', ' + cartPrice + ', event)"><i class="fas fa-cart-plus"></i> 담기</button>' : '') + '</div>';
        }).join('') + '</div></div>').join('') + '</div>';
      }
      
      function renderSetupHTML() {
        return marketingSetup.map(item => '<div class="card ' + (item.recommended ? 'recommended' : '') + '">' + (item.recommended ? '<div class="card-badge">추천</div>' : '') + (item.discount ? '<div class="discount-badge">' + item.discount + '</div>' : '') + '<h3 class="card-name">' + item.name + '</h3><p class="card-desc">' + item.desc + '</p><div class="card-price"><span class="price-value">' + (item.price/10000) + '</span><span class="price-unit">만원</span>' + (item.originalPrice ? '<div class="price-original">' + (item.originalPrice/10000) + '만원</div>' : '') + '</div><ul class="card-list">' + item.includes.map(inc => '<li><i class="fas fa-check"></i>' + inc + '</li>').join('') + '</ul><button class="btn btn-primary btn-small" style="width:100%;" onclick="addToCart(\\'setup\\', \\'' + item.id + '\\', \\'' + item.name + '\\', ' + item.price + ', event)"><i class="fas fa-cart-plus"></i>담기</button></div>').join('');
      }
      
      function renderGradesHTML() {
        return monthlyGrades.map(g => '<div class="card ' + (g.recommended ? 'recommended' : '') + '" style="border-top: 3px solid ' + colorMap[g.color] + '">' + (g.recommended ? '<div class="card-badge">BEST</div>' : '') + '<div class="card-tier">' + g.grade + '</div><h3 class="card-name">' + g.name + '</h3><p class="card-subtitle">' + g.subtitle + '</p><p class="card-desc">🎯 ' + g.goal + '</p><div class="card-price"><span class="price-value">' + (g.price/10000) + '</span><span class="price-unit">만원/월</span></div><ul class="card-list">' + g.services.map(s => '<li><i class="fas fa-check"></i>' + s + '</li>').join('') + '</ul><p style="font-size:0.75rem;color:var(--text-tertiary);margin-bottom:12px;">추천: ' + g.targetAudience + '</p><button class="btn btn-primary btn-small" style="width:100%;" onclick="addToCart(\\'grade\\', \\'' + g.id + '\\', \\'' + g.grade + ' ' + g.name + ' (월)\\', ' + g.price + ', event)"><i class="fas fa-cart-plus"></i>담기</button></div>').join('');
      }
      
      function renderSetsHTML() {
        return '<div style="margin-bottom:20px;padding:16px;background:rgba(249,115,22,0.1);border-radius:12px;border:1px solid rgba(249,115,22,0.3);"><p style="font-size:0.9rem;color:var(--text-secondary);margin:0;"><strong style="color:#f97316;">💡 SNS 셋트 = 초기 셋팅 + 첫 달 관리 포함!</strong><br>• <strong>첫 달</strong>: 아래 금액 결제 (셋팅 + 1~2개월 관리)<br>• <strong>다음 달부터</strong>: 월관리비만 결제 (자동결제 또는 수동)</p></div><div class="grid grid-2">' + setMenus.map(s => '<div class="card ' + (s.best ? 'recommended' : '') + '"><div class="card-badge">' + s.tag + '</div><h3 class="card-name">' + s.name + '</h3><p class="card-desc">' + s.recommended + '</p><div class="card-price"><span class="price-value">' + (s.price/10000) + '</span><span class="price-unit">만원</span><div class="price-original">' + (s.originalPrice/10000) + '만원</div></div><div style="background:rgba(168,85,247,0.15);border:1px solid rgba(168,85,247,0.3);border-radius:8px;padding:10px;margin-bottom:12px;"><div style="font-size:0.8rem;color:var(--text-tertiary);margin-bottom:4px;">📅 다음 달부터 월관리비</div><div style="font-size:1.1rem;font-weight:700;color:#a855f7;">' + (s.monthlyPrice/10000) + '만원<span style="font-size:0.75rem;color:var(--text-tertiary);font-weight:400;">/월 (' + s.monthlyGrade + ')</span></div></div><ul class="card-list">' + s.includes.map(inc => '<li><i class="fas fa-gift"></i>' + inc + '</li>').join('') + '</ul><button class="btn btn-primary btn-small" style="width:100%;" onclick="addToCart(\\'set\\', \\'' + s.id + '\\', \\'' + s.name + '\\', ' + s.price + ', event)"><i class="fas fa-cart-plus"></i>첫 달 결제하기</button></div>').join('') + '</div>';
      }
      
      function renderPricingHTML() {
        return '<div style="margin-bottom:20px;padding:16px;background:rgba(168,85,247,0.1);border-radius:12px;border:1px solid rgba(168,85,247,0.3);"><p style="font-size:0.9rem;color:var(--text-secondary);margin:0;"><strong style="color:#a855f7;">📋 가격 구성 안내</strong><br>• <strong>셋팅비</strong>: 처음 1회 (계정 최적화, 기반 작업)<br>• <strong>월관리비</strong>: 매월 (콘텐츠 제작, 관리)<br>• 원하는 서비스를 장바구니에 담아주세요!</p></div>' + 
        '<div class="channel-grid">' + channelServices.map(cat => '<div class="channel-category"><div class="channel-header"><i class="' + cat.icon + ' channel-icon" style="color:' + cat.color + '"></i><span class="channel-name">' + cat.name + '</span></div><div class="channel-services">' + cat.services.map(svc => {
          let priceHtml = '';
          let buttonHtml = '';
          if (svc.setupFee > 0) {
            priceHtml += '<div class="service-price"><span class="service-price-label">셋팅</span><span class="service-price-value">' + (svc.setupFee/10000) + '만</span></div>';
            buttonHtml += '<button class="service-add-btn pricing-btn" data-type="channel" data-id="' + svc.id + '-setup" data-name="[' + cat.name + '] ' + svc.name + ' 셋팅" data-price="' + svc.setupFee + '"><i class="fas fa-cart-plus"></i> 셋팅</button>';
          }
          if (svc.hasAB) {
            priceHtml += '<div class="service-price monthly"><span class="service-price-label">월A</span><span class="service-price-value">' + (svc.monthlyFeeA/10000) + '만</span></div>';
            priceHtml += '<div class="service-price monthly-b"><span class="service-price-label">월B</span><span class="service-price-value">' + (svc.monthlyFeeB/10000) + '만</span></div>';
            buttonHtml += '<button class="service-add-btn pricing-btn" data-type="channel" data-id="' + svc.id + '-monthlyA" data-name="[' + cat.name + '] ' + svc.name + ' 월A형" data-price="' + svc.monthlyFeeA + '"><i class="fas fa-cart-plus"></i> 월A</button>';
            buttonHtml += '<button class="service-add-btn pricing-btn" data-type="channel" data-id="' + svc.id + '-monthlyB" data-name="[' + cat.name + '] ' + svc.name + ' 월B형" data-price="' + svc.monthlyFeeB + '"><i class="fas fa-cart-plus"></i> 월B</button>';
          } else if (svc.monthlyFee > 0) {
            priceHtml += '<div class="service-price monthly"><span class="service-price-label">월</span><span class="service-price-value">' + (svc.monthlyFee/10000) + '만</span></div>';
            buttonHtml += '<button class="service-add-btn pricing-btn" data-type="channel" data-id="' + svc.id + '-monthly" data-name="[' + cat.name + '] ' + svc.name + ' 월관리" data-price="' + svc.monthlyFee + '"><i class="fas fa-cart-plus"></i> 월관리</button>';
          } else if (svc.notice) {
            priceHtml += '<div class="service-notice">' + svc.notice + '</div>';
          }
          return '<div class="service-item' + (svc.isSet ? ' service-set' : '') + '"><div class="service-info"><div class="service-name">' + svc.name + (svc.isSet ? ' <span class="set-badge">SET</span>' : '') + '</div><div class="service-desc">' + svc.desc + '</div>' + (svc.smallNotice ? '<div class="service-small-notice">⚠️ ' + svc.smallNotice + '</div>' : '') + '</div><div class="service-prices">' + priceHtml + '</div>' + (buttonHtml ? '<div class="service-buttons">' + buttonHtml + '</div>' : '') + '</div>';
        }).join('') + '</div></div>').join('') + '</div>';
      }
      
      function renderWebsitesHTML() {
        return websitePackages.map(w => '<div class="card ' + (w.recommended ? 'recommended' : '') + '" style="border-top: 3px solid ' + colorMap[w.color] + '">' + (w.recommended ? '<div class="card-badge">BEST</div>' : '') + '<div class="card-tier">' + w.type + '</div><h3 class="card-name">' + w.name + '</h3><p class="card-subtitle">' + w.subtitle + '</p><p class="card-desc">' + w.description + '</p><div class="card-price"><span class="price-value">' + (w.price/10000) + '</span><span class="price-unit">만원</span><div class="price-original">' + (w.originalPrice/10000) + '만원</div></div><ul class="card-list">' + w.includes.map(inc => '<li><i class="fas fa-check"></i>' + inc + '</li>').join('') + '</ul><button class="btn btn-primary btn-small" style="width:100%;" onclick="addToCart(\\'website\\', \\'' + w.id + '\\', \\'' + w.type + ' ' + w.name + '\\', ' + w.price + ', event)"><i class="fas fa-cart-plus"></i>담기</button></div>').join('');
      }
      
      function renderAddonsHTML() {
        return addonServices.map(a => {
          const isHighlight = a.highlight;
          const highlightStyle = isHighlight ? 'border: 2px solid #22c55e; background: linear-gradient(145deg, rgba(34,197,94,0.1), transparent);' : '';
          const badgeHtml = isHighlight ? '<div class="card-badge" style="background: linear-gradient(135deg, #22c55e, #16a34a);">NEW</div>' : '';
          const priceDisplay = a.price < 100000 ? (a.price/10000).toFixed(1) : (a.price/10000);
          return '<div class="card" style="' + highlightStyle + '">' + badgeHtml + '<h3 class="card-name">' + a.name + '</h3><p class="card-desc">' + a.desc + '</p><div class="card-price"><span class="price-value">' + priceDisplay + '</span><span class="price-unit">만원/' + a.perUnit + '</span></div><button class="btn btn-primary btn-small" style="width:100%;' + (isHighlight ? 'background: linear-gradient(135deg, #22c55e, #16a34a);' : '') + '" onclick="addToCart(\\'addon\\', \\'' + a.id + '\\', \\'' + a.name + '\\', ' + a.price + ', event)"><i class="fas fa-cart-plus"></i>담기</button></div>';
        }).join('');
      }
      
      function renderWebDevHTML() {
        return webDevOptions.map(w => '<div class="card"><h3 class="card-name">' + w.name + '</h3><p class="card-desc">' + w.desc + '</p><div class="card-price"><span class="price-value">' + (w.price/10000) + '</span><span class="price-unit">만원</span></div><button class="btn btn-primary btn-small" style="width:100%;" onclick="addToCart(\\'webdev\\', \\'' + w.id + '\\', \\'' + w.name + '\\', ' + w.price + ', event)"><i class="fas fa-cart-plus"></i>담기</button></div>').join('');
      }
      
      function addToCart(type, id, name, price, event) { 
        // 이벤트 버블링 방지 (모달 닫힘 방지)
        if (event) event.stopPropagation();
        cart.push({ type, id, name, price }); 
        updateCart(); 
        // 서비스 모달이 열려있으면 장바구니 패널은 열지 않고 토스트만 표시
        if (document.getElementById('service-modal').classList.contains('open')) {
          showToast('✅ ' + name + ' 담기 완료! (총 ' + cart.length + '개)');
        } else {
          document.getElementById('cart-panel').classList.add('open'); 
        }
      }
      
      function showToast(message) {
        let toast = document.getElementById('toast');
        if (!toast) {
          toast = document.createElement('div');
          toast.id = 'toast';
          toast.style.cssText = 'position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#a855f7,#ec4899);color:white;padding:12px 24px;border-radius:30px;font-size:0.9rem;font-weight:600;z-index:9999;opacity:0;transition:opacity 0.3s;box-shadow:0 4px 20px rgba(168,85,247,0.4);';
          document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.style.opacity = '1';
        setTimeout(() => { toast.style.opacity = '0'; }, 2000);
      }
      function removeFromCart(index) { cart.splice(index, 1); updateCart(); }
      function updateCart() {
        const container = document.getElementById('cart-items');
        const count = document.getElementById('cart-count');
        const total = document.getElementById('cart-total');
        const checkoutBar = document.getElementById('checkout-bar');
        const checkoutCount = document.getElementById('checkout-count');
        const checkoutTotal = document.getElementById('checkout-total-display');
        
        count.textContent = cart.length;
        if (cart.length === 0) { 
          container.innerHTML = '<div class="cart-empty">항목을 추가하세요</div>'; 
          total.textContent = '0원'; 
          checkoutBar.style.display = 'none';
          return; 
        }
        container.innerHTML = cart.map((item, i) => '<div class="cart-item"><span class="cart-item-name">' + item.name + '</span><span class="cart-item-price">' + (item.price/10000) + '만</span><button class="cart-item-remove" onclick="removeFromCart(' + i + ')"><i class="fas fa-times"></i></button></div>').join('');
        let sum = cart.reduce((acc, item) => acc + item.price, 0);
        if (document.getElementById('regional-fee').checked) sum += 300000;
        const totalText = (sum/10000).toLocaleString() + '만원';
        total.textContent = totalText;
        
        // 하단 결제 바 업데이트 및 표시
        checkoutBar.style.display = 'block';
        checkoutCount.textContent = cart.length;
        checkoutTotal.textContent = totalText;
      }
      function toggleCart() { document.getElementById('cart-panel').classList.toggle('open'); }
      
      // 현재 로그인 상태
      let currentUser = null;
      
      // 페이지 로드 시 로그인 상태 확인
      async function checkLoginStatus() {
        try {
          const res = await fetch('/api/auth/me');
          const data = await res.json();
          currentUser = data.user;
          updateLoginUI();
        } catch (e) {
          currentUser = null;
        }
      }
      
      function updateLoginUI() {
        // 헤더에 로그인 상태 표시 (옵션)
        const headerRight = document.querySelector('.header-right');
        if (headerRight && currentUser) {
          // 로그인 되어있으면 마이페이지 버튼 표시
        }
      }
      
      // 결제 버튼 클릭
      async function checkout() {
        if (cart.length === 0) { alert('장바구니가 비어있습니다.'); return; }
        
        // 로그인 상태 확인
        if (!currentUser) {
          // 로그인 안 됨 → 로그인 모달 표시
          openLoginModal();
          return;
        }
        
        // 로그인 됨 → 바로 결제 진행
        await processPayment();
      }
      
      // 로그인 모달 열기/닫기
      function openLoginModal() {
        document.getElementById('login-modal').classList.add('open');
      }
      
      function closeLoginModal() {
        document.getElementById('login-modal').classList.remove('open');
      }
      
      // 카카오/네이버 로그인 후 결제 계속
      function loginForCheckout(provider) {
        const referralCode = document.getElementById('checkout-referral-code').value.trim();
        
        // 현재 장바구니 상태를 localStorage에 저장
        localStorage.setItem('xivix_pending_cart', JSON.stringify(cart));
        localStorage.setItem('xivix_pending_checkout', 'true');
        
        let url = '/api/auth/' + provider;
        if (referralCode && provider === 'kakao') {
          url += '?state=' + encodeURIComponent(referralCode);
        }
        window.location.href = url;
      }
      
      // 로그인 없이 결제 (비회원)
      async function skipLoginAndCheckout() {
        closeLoginModal();
        await processPaymentAsGuest();
      }
      
      // 회원 결제 처리
      async function processPayment() {
        const customerEmail = currentUser.email;
        const customerName = currentUser.name;
        let customerPhone = currentUser.phone || '';
        
        // 전화번호가 없으면 입력받기 (이니시스 V2 필수)
        if (!customerPhone || customerPhone.trim() === '') {
          customerPhone = prompt('결제를 위해 휴대폰 번호를 입력해주세요:\\n(예: 010-1234-5678)', '');
          if (!customerPhone || customerPhone.trim() === '') {
            alert('휴대폰 번호는 필수입니다.');
            return;
          }
        }
        
        await executePayment(customerEmail, customerName, customerPhone);
      }
      
      // 비회원 결제 처리
      async function processPaymentAsGuest() {
        const customerEmail = prompt('결제를 위해 이메일을 입력해주세요:', '');
        if (!customerEmail || !customerEmail.includes('@')) {
          alert('유효한 이메일을 입력해주세요.');
          return;
        }
        const customerName = prompt('성함을 입력해주세요:', '') || '고객';
        const customerPhone = prompt('휴대폰 번호를 입력해주세요 (필수):\\n(예: 010-1234-5678)', '');
        if (!customerPhone || customerPhone.trim() === '') {
          alert('휴대폰 번호는 필수입니다.');
          return;
        }
        
        await executePayment(customerEmail, customerName, customerPhone);
      }
      
      // 실제 결제 실행
      async function executePayment(customerEmail, customerName, customerPhone) {
        
        const isRegional = document.getElementById('regional-fee').checked;
        try {
          const res = await fetch('/api/payment/prepare', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items: cart, isRegional }) });
          const data = await res.json();
          if (typeof PortOne !== 'undefined') {
            const response = await PortOne.requestPayment({ 
              storeId: data.storeId, 
              channelKey: data.channelKey, 
              paymentId: data.orderId, 
              orderName: data.orderName, 
              totalAmount: data.totalAmount, 
              currency: 'KRW', 
              payMethod: 'CARD',
              customer: {
                email: customerEmail,
                fullName: customerName,
                phoneNumber: customerPhone.replace(/-/g, '')
              }
            });
            if (response.code) alert('결제 실패: ' + response.message);
            else { 
              // 결제 성공 - DB에 저장
              await fetch('/api/payment/complete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  orderId: data.orderId,
                  orderName: data.orderName,
                  totalAmount: data.totalAmount,
                  originalAmount: data.originalAmount,
                  discountAmount: data.discountAmount,
                  couponId: data.couponId,
                  items: cart,
                  customerEmail,
                  customerName,
                  customerPhone,
                  isSubscription: cart.some(item => item.name.includes('관리') || item.name.includes('GRADE'))
                })
              });
              
              // 정보 저장 후 성공 모달 표시
              lastPaymentInfo = {
                orderName: data.orderName,
                amount: data.totalAmount,
                customerInfo: { email: customerEmail, name: customerName, phone: customerPhone }
              };
              document.getElementById('success-order-name').textContent = data.orderName;
              document.getElementById('success-order-amount').textContent = (data.totalAmount/10000).toLocaleString() + '만원';
              document.getElementById('success-modal').classList.add('open');
              cart = []; 
              updateCart();
              document.getElementById('cart-panel').classList.remove('open');
            }
          } else { alert('결제 준비 완료\\n' + data.orderName + '\\n' + (data.totalAmount/10000) + '만원'); }
        } catch (err) { alert('오류: ' + err.message); }
      }
      
      // 결제 완료 후 모달 관련 함수
      function closeSuccessModal() {
        document.getElementById('success-modal').classList.remove('open');
        resetQuestionnaire();
      }
      
      function selectContactOption(type) {
        const inputArea = document.getElementById('contact-input-area');
        const label = document.getElementById('contact-input-label');
        inputArea.style.display = 'block';
        if (type === 'phone') {
          label.textContent = '📞 전화 상담을 위한 연락처';
        } else {
          label.textContent = '🏢 방문 상담을 위한 연락처';
        }
        document.getElementById('q-contact').dataset.contactType = type;
      }
      
      async function submitQuestionnaire() {
        const data = {
          industry: document.getElementById('q-industry').value,
          snsStatus: document.getElementById('q-sns-status').value,
          goal: document.getElementById('q-goal').value,
          additional: document.getElementById('q-additional').value,
          contact: document.getElementById('q-contact').value,
          contactType: document.getElementById('q-contact').dataset.contactType || '',
          contactTime: document.getElementById('q-contact-time').value,
          paymentInfo: lastPaymentInfo
        };
        
        // 최소 연락처 또는 질문지 중 하나는 필수
        if (!data.contact && !data.industry && !data.snsStatus && !data.goal) {
          alert('질문지를 작성하시거나 연락처를 남겨주세요!');
          return;
        }
        
        try {
          // 질문지 데이터를 서버로 전송
          const res = await fetch('/api/questionnaire', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
          
          if (res.ok) {
            showToast('✅ 제출 완료! 곧 연락드리겠습니다.');
            closeSuccessModal();
          } else {
            // API가 없어도 로컬에서 처리
            console.log('질문지 데이터:', data);
            showToast('✅ 제출 완료! 곧 연락드리겠습니다.');
            closeSuccessModal();
          }
        } catch (err) {
          // 오류 발생해도 일단 성공 처리 (데이터는 로컬 로그)
          console.log('질문지 데이터:', data);
          showToast('✅ 제출 완료! 곧 연락드리겠습니다.');
          closeSuccessModal();
        }
      }
      
      function resetQuestionnaire() {
        document.getElementById('q-industry').value = '';
        document.getElementById('q-sns-status').value = '';
        document.getElementById('q-goal').value = '';
        document.getElementById('q-additional').value = '';
        document.getElementById('q-contact').value = '';
        document.getElementById('q-contact-time').value = '언제든';
        document.getElementById('contact-input-area').style.display = 'none';
      }
      
      function toggleChat() { document.getElementById('chat-window').classList.toggle('open'); }
      function openChat() { document.getElementById('chat-window').classList.add('open'); }
      function closeChat() { document.getElementById('chat-window').classList.remove('open'); }
      
      async function sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        if (!message) return;
        input.value = '';
        appendMessage('user', message);
        chatHistory.push({ role: 'user', content: message });
        const loadingId = 'loading-' + Date.now();
        appendMessage('bot', '<i class="fas fa-circle-notch fa-spin"></i>', loadingId);
        try {
          const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message, context: chatHistory.slice(-10) }) });
          const data = await res.json();
          document.getElementById(loadingId)?.remove();
          appendMessage('bot', data.response.replace(/\\n/g, '<br>').replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>'));
          chatHistory.push({ role: 'assistant', content: data.response });
        } catch (err) { document.getElementById(loadingId)?.remove(); appendMessage('bot', '오류가 발생했습니다.'); }
      }
      
      function appendMessage(role, content, id) {
        const container = document.getElementById('chat-messages');
        const div = document.createElement('div');
        if (id) div.id = id;
        div.className = 'message ' + (role === 'user' ? 'user' : '');
        div.innerHTML = role === 'user' ? '<div class="message-content">' + content + '</div>' : '<div class="message-avatar"><i class="fas fa-user-tie"></i></div><div class="message-content">' + content + '</div>';
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
      }
      
      function openAdminModal() { document.getElementById('admin-modal').classList.add('open'); }
      function closeAdminModal() { document.getElementById('admin-modal').classList.remove('open'); }
      async function verifyAdmin() {
        try {
          const res = await fetch('/api/admin/verify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ secret: document.getElementById('admin-password').value }) });
          const data = await res.json();
          if (data.verified) { document.getElementById('admin-login').style.display = 'none'; document.getElementById('admin-panel').style.display = 'block'; }
          else alert('비밀번호 틀림');
        } catch (err) { alert('오류'); }
      }
      async function processCustomPayment() {
        const name = document.getElementById('custom-name').value;
        const amount = parseInt(document.getElementById('custom-amount').value);
        if (!name || !amount) { alert('고객명과 금액 입력'); return; }
        try {
          const res = await fetch('/api/payment/prepare', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ customAmount: amount, customerName: name, customerEmail: document.getElementById('custom-email').value, customerPhone: document.getElementById('custom-phone').value }) });
          const data = await res.json();
          if (typeof PortOne !== 'undefined') {
            const response = await PortOne.requestPayment({ storeId: data.storeId, channelKey: data.channelKey, paymentId: data.orderId, orderName: data.orderName, totalAmount: data.totalAmount, currency: 'KRW', payMethod: 'CARD', customer: { fullName: name } });
            if (response.code) alert('결제 실패'); else { alert('결제 완료!'); closeAdminModal(); }
          } else alert(data.orderName + '\\n' + data.totalAmount.toLocaleString() + '원');
        } catch (err) { alert('오류'); }
      }
      
      function scrollTo(id) { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }
      
      // ========================================
      // 보안 기능 (해킹방지, 복사방지, 스크랩방지, 개발자도구 방지)
      // ========================================
      
      // 1. 우클릭 방지 (컨텍스트 메뉴)
      document.addEventListener('contextmenu', e => {
        e.preventDefault();
        return false;
      });
      
      // 2. 키보드 단축키 방지 (개발자도구, 소스보기, 복사 등)
      document.addEventListener('keydown', e => {
        // F12 - 개발자도구
        if (e.key === 'F12') {
          e.preventDefault();
          return false;
        }
        // Ctrl+Shift+I/J/C - 개발자도구
        if (e.ctrlKey && e.shiftKey && ['I', 'i', 'J', 'j', 'C', 'c'].includes(e.key)) {
          e.preventDefault();
          return false;
        }
        // Ctrl+U - 소스보기
        if (e.ctrlKey && ['u', 'U'].includes(e.key)) {
          e.preventDefault();
          return false;
        }
        // Ctrl+S - 저장 방지
        if (e.ctrlKey && ['s', 'S'].includes(e.key)) {
          e.preventDefault();
          return false;
        }
        // Ctrl+A - 전체 선택 방지 (선택적)
        // if (e.ctrlKey && ['a', 'A'].includes(e.key)) {
        //   e.preventDefault();
        //   return false;
        // }
      });
      
      // 3. 텍스트 선택 방지 (CSS로도 적용됨)
      document.addEventListener('selectstart', e => {
        // 입력 필드는 선택 허용
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
          return true;
        }
        e.preventDefault();
        return false;
      });
      
      // 4. 드래그 방지
      document.addEventListener('dragstart', e => {
        e.preventDefault();
        return false;
      });
      
      // 5. 복사 방지
      document.addEventListener('copy', e => {
        // 입력 필드는 복사 허용
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
          return true;
        }
        e.preventDefault();
        return false;
      });
      
      // 6. 개발자도구 감지 (콘솔 열림 감지)
      (function detectDevTools() {
        const threshold = 160;
        const check = () => {
          const widthThreshold = window.outerWidth - window.innerWidth > threshold;
          const heightThreshold = window.outerHeight - window.innerHeight > threshold;
          if (widthThreshold || heightThreshold) {
            document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;font-size:24px;color:#666;">접근이 제한되었습니다.</div>';
          }
        };
        setInterval(check, 1000);
      })();
      
      // 7. 콘솔 로그 비활성화 (프로덕션)
      if (location.hostname !== 'localhost') {
        console.log = () => {};
        console.warn = () => {};
        console.error = () => {};
        console.info = () => {};
        console.debug = () => {};
      }
      
      document.getElementById('admin-modal').addEventListener('click', e => { if (e.target.id === 'admin-modal') closeAdminModal(); });
      document.getElementById('portfolio-modal').addEventListener('click', e => { if (e.target.id === 'portfolio-modal') closePortfolioModal(); });
      document.getElementById('service-modal').addEventListener('click', e => { if (e.target.id === 'service-modal') closeServiceModal(); });
      
      // 브라우저 뒤로가기 시 모달만 닫히도록 처리
      window.addEventListener('popstate', (e) => {
        const portfolioModal = document.getElementById('portfolio-modal');
        const serviceModal = document.getElementById('service-modal');
        
        // 포트폴리오 모달이 열려있으면 닫기
        if (portfolioModal.classList.contains('open')) {
          closePortfolioModal(true); // skipHistory = true
          return;
        }
        // 서비스 모달이 열려있으면 닫기
        if (serviceModal.classList.contains('open')) {
          closeServiceModal(true); // skipHistory = true
          return;
        }
      });
      
      document.addEventListener('DOMContentLoaded', async () => {
        renderPortfolioMenu();
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        
        // 로그인 상태 확인
        await checkLoginStatus();
        
        // 로그인 후 리다이렉트된 경우 - 장바구니 복원 및 결제 재개
        if (localStorage.getItem('xivix_pending_checkout') === 'true') {
          const pendingCart = localStorage.getItem('xivix_pending_cart');
          if (pendingCart) {
            try {
              cart = JSON.parse(pendingCart);
              updateCart();
              
              // 장바구니 데이터 정리
              localStorage.removeItem('xivix_pending_cart');
              localStorage.removeItem('xivix_pending_checkout');
              
              // 로그인 되어있으면 바로 결제 진행
              if (currentUser) {
                setTimeout(() => {
                  showToast('✅ 로그인 완료! 결제를 진행합니다.');
                  setTimeout(() => processPayment(), 1000);
                }, 500);
              }
            } catch (e) {
              localStorage.removeItem('xivix_pending_cart');
              localStorage.removeItem('xivix_pending_checkout');
            }
          }
        }
        
        // 챗봇 버튼 깜빡깜빡 애니메이션만 (자동 열림 X)
        setTimeout(() => {
          const chatBubble = document.querySelector('.chat-bubble');
          chatBubble.classList.add('pulse');
        }, 2000);
        
        // 채널별 가격표 장바구니 담기 버튼 이벤트 위임
        document.getElementById('service-modal').addEventListener('click', (e) => {
          const btn = e.target.closest('.pricing-btn');
          if (btn) {
            e.stopPropagation();
            const type = btn.dataset.type;
            const id = btn.dataset.id;
            const name = btn.dataset.name;
            const price = parseInt(btn.dataset.price);
            addToCart(type, id, name, price, e);
          }
        });
      });
    </script>
</body>
</html>`
}

export default app
