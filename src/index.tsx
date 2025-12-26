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
  GOOGLE_CLIENT_ID?: string
  GOOGLE_CLIENT_SECRET?: string
  KAKAO_JS_KEY?: string
  // 카카오 알림톡 (비즈메시지)
  KAKAO_BIZ_API_KEY?: string
  KAKAO_BIZ_SENDER_KEY?: string
  KAKAO_BIZ_PFID?: string  // 플러스친구 ID
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
      { id: "naver_place", name: "네이버플레이스", setupFee: 390000, monthlyFeeA: 500000, monthlyFeeB: 350000, desc: "지도 최적화 + 리뷰관리 + 키워드모니터링", hasAB: true },
      { id: "naver_set", name: "네이버 광고/톡톡/페이 SET", setupFee: 590000, monthlyFee: 0, desc: "검색광고+톡톡+페이 통합 세팅 (광고비 별도)", isSet: true, smallNotice: "무리한 트래픽X, 상위노출 제외! 자연스러운 고객유입" }
    ]
  },
  {
    category: "instagram",
    name: "인스타그램",
    icon: "fa-brands fa-instagram",
    color: "#E4405F",
    services: [
      { id: "insta_full", name: "계정 최적화", setupFee: 490000, monthlyFee: 750000, desc: "SEO/AEO/C-RANK/GEO 최적화 (릴스+피드+카드)" },
      { id: "meta_ad", name: "메타광고", setupFee: 350000, monthlyFee: 0, desc: "타겟광고 세팅 (광고비 별도)", notice: "월관리: 개별상담" },
      { id: "threads", name: "스레드", setupFee: 150000, monthlyFee: 200000, desc: "SEO/AEO/C-RANK/GEO 계정 최적화" }
    ]
  },
  {
    category: "tiktok",
    name: "틱톡",
    icon: "fa-brands fa-tiktok",
    color: "#000000",
    services: [
      { id: "tiktok_full", name: "계정 최적화", setupFee: 490000, monthlyFee: 550000, desc: "SEO/AEO/C-RANK/GEO 최적화 + 영상제작" }
    ]
  },
  {
    category: "youtube",
    name: "유튜브",
    icon: "fa-brands fa-youtube",
    color: "#FF0000",
    services: [
      { id: "yt_setup", name: "채널 최적화", setupFee: 590000, monthlyFee: 0, desc: "SEO/AEO/C-RANK/GEO 계정 최적화 셋팅" },
      { id: "yt_short", name: "숏폼 관리", setupFee: 0, monthlyFee: 590000, desc: "쇼츠 기획/편집 월4편" },
      { id: "yt_long", name: "롱폼 관리", setupFee: 0, monthlyFee: 1500000, desc: "본편 기획/편집/자막/썸네일/SEO 월2편" }
    ]
  },
  {
    category: "blog",
    name: "블로그",
    icon: "fa-solid fa-blog",
    color: "#21A366",
    services: [
      { id: "naver_blog", name: "네이버블로그", setupFee: 290000, monthlyFeeA: 450000, monthlyFeeB: 300000, desc: "수작업 포스팅 + 상위노출 관리", hasAB: true },
      { id: "wordpress", name: "워드프레스", setupFee: 290000, monthlyFee: 200000, desc: "AI 자동화 + SEO 최적화" }
    ]
  },
  {
    category: "google",
    name: "구글",
    icon: "fa-brands fa-google",
    color: "#4285F4",
    services: [
      { id: "google_mybiz", name: "구글 마이비즈니스", setupFee: 350000, monthlyFee: 250000, desc: "구글 지도 등록 + 리뷰관리 + 최적화" },
      { id: "google_ads", name: "구글 광고", setupFee: 390000, monthlyFee: 0, desc: "검색/디스플레이 광고 세팅 (광고비 별도)", notice: "월관리: 개별상담" },
      { id: "google_seo", name: "구글 SEO", setupFee: 490000, monthlyFee: 350000, desc: "웹사이트 구글 검색 최적화" }
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
    price: 790000,
    originalPrice: 980000,
    desc: "네이버 집중 공략 셋팅",
    includes: ["플레이스 셋팅 (39만)", "광고/톡톡/페이 SET (59만)", "운영 가이드북"],
    discount: "19만원 할인",
    category: "naver"
  },
  {
    id: "setup_google",
    name: "구글 묶음",
    price: 990000,
    originalPrice: 1230000,
    desc: "구글 검색 최적화 셋팅",
    includes: ["마이비즈니스 셋팅 (35만)", "구글 광고 셋팅 (39만)", "구글 SEO 셋팅 (49만)"],
    discount: "24만원 할인",
    category: "google"
  },
  {
    id: "setup_sns",
    name: "SNS 관리 묶음",
    price: 990000,
    originalPrice: 1130000,
    desc: "인스타+틱톡 통합 셋팅",
    includes: ["인스타그램 계정최적화 (49만)", "틱톡 계정최적화 (49만)", "스레드 셋팅 (15만)", "통합 브랜딩"],
    discount: "14만원 할인",
    recommended: true,
    category: "sns"
  },
  {
    id: "setup_full",
    name: "올인원 풀셋팅",
    price: 2490000,
    originalPrice: 3340000,
    desc: "네이버+구글+SNS+유튜브 전체",
    includes: ["네이버 풀 셋팅", "구글 풀 셋팅", "SNS 풀 셋팅", "유튜브 채널 최적화 (59만)", "1개월 집중 관리"],
    discount: "85만원 할인",
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
    price: 550000,
    goal: "검색했을 때 우리 가게가 믿음직스럽게 보이게",
    targetAudience: "오픈 초기 매장, 온라인 관리 처음인 분",
    simpleDesc: "블로그 + 플레이스 기본 관리",
    color: "cyan"
  },
  {
    id: "performance",
    grade: "GRADE 2",
    name: "퍼포먼스",
    subtitle: "매출 전환 ⭐",
    price: 990000,
    goal: "실제 문의와 예약 늘리기",
    targetAudience: "경쟁이 치열한 업종 (미용실, 맛집 등)",
    recommended: true,
    simpleDesc: "인스타 + 블로그 + 플레이스 통합관리",
    color: "purple"
  },
  {
    id: "master",
    grade: "GRADE 3",
    name: "마스터",
    subtitle: "지역 장악",
    price: 1900000,
    goal: "지역 1등 브랜드로 성장",
    targetAudience: "더 큰 성장을 원하는 대표님",
    simpleDesc: "유튜브 + 인스타 + 틱톡 + 블로그 + 플레이스 올인원",
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
    originalPrice: 1090000,
    price: 890000,
    monthlyPrice: 550000,
    monthlyGrade: "GRADE 1 베이직",
    includes: ["플레이스 셋팅 (39만)", "스레드 셋팅 (15만)", "GRADE 1 베이직 1개월 (55만)"],
    recommended: "처음 SNS 마케팅 시작하는 분",
    tag: "입문"
  },
  {
    id: "sns_growth",
    name: "⭐ SNS 성장 셋트",
    originalPrice: 1870000,
    price: 1490000,
    monthlyPrice: 990000,
    monthlyGrade: "GRADE 2 퍼포먼스",
    includes: ["인스타그램 계정 최적화 셋팅 (49만)", "플레이스 셋팅 (39만)", "GRADE 2 퍼포먼스 1개월 (99만)"],
    recommended: "매출 전환이 필요한 사업자",
    tag: "BEST",
    best: true
  },
  {
    id: "sns_viral",
    name: "💎 바이럴 마스터 셋트",
    originalPrice: 3760000,
    price: 2790000,
    monthlyPrice: 990000,
    monthlyGrade: "GRADE 2 퍼포먼스",
    includes: ["인스타+틱톡 계정 최적화 셋팅 (98만)", "네이버 묶음 셋팅 (79만)", "GRADE 2 퍼포먼스 2개월 (198만)"],
    recommended: "본격적인 바이럴을 원하는 분",
    tag: "프리미엄"
  },
  {
    id: "sns_dominate",
    name: "👑 지역 장악 셋트",
    originalPrice: 6690000,
    price: 4990000,
    monthlyPrice: 1900000,
    monthlyGrade: "GRADE 3 토탈마스터",
    includes: ["올인원 풀셋팅 (249만)", "GRADE 3 토탈마스터 2개월 (380만)", "유튜브 채널 최적화 (59만)"],
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
    price: 990000,
    originalPrice: 1500000,
    description: "소상공인, 1인 샵을 위한 빠른 시작",
    includes: ["반응형 원페이지", "기본 SEO 최적화", "모바일 최적화", "1개월 무료 관리"],
    color: "cyan"
  },
  {
    id: "standard",
    type: "TYPE B",
    name: "스탠다드형",
    subtitle: "기업형 브랜딩",
    price: 1990000,
    originalPrice: 2500000,
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
    price: 4500000,
    originalPrice: 5500000,
    description: "AI 상담봇이 고객 문의에 24시간 자동 응대",
    includes: ["무제한 페이지 구축", "스토리텔링 기획", "🤖 AI 상담봇 탑재 (24시간)", "6개월 VIP 관리"],
    color: "orange"
  },
  {
    id: "enterprise",
    type: "TYPE D",
    name: "병원/프랜차이즈",
    subtitle: "🎬 브랜드 영상 제작 + 풀 패키지",
    price: 7500000,
    originalPrice: 9500000,
    description: "브랜드 영상 제작 + AI 상담봇 + 결제/예약 시스템",
    includes: ["🎬 브랜드 영상 3편 제작", "🤖 AI 상담봇 (24시간)", "결제/예약 시스템 연동", "12개월 전담 케어"],
    color: "pink"
  }
]

// ========================================
// 부가 서비스 (브랜드 영상촬영/편집 A/B/C/D형)
// ========================================
const ADDON_SERVICES = [
  { id: "littly", name: "리틀리 제작", price: 290000, desc: "링크 모음 페이지 (프로필 링크 통합)", perUnit: "1건" },
  { id: "detail_page", name: "상세페이지 디자인", price: 1500000, desc: "스마트스토어/와디즈용 수작업 고퀄리티", perUnit: "1건" },
  { id: "commercial_analysis", name: "상권분석 (방문설명)", price: 800000, desc: "현장 방문 상권분석 + 맞춤 전략 (계약시 환급)", perUnit: "1건" },
  { id: "sns_boost", name: "SNS 부스팅", price: 290000, desc: "팔로워/조회수 부스팅 (광고비 별도)", perUnit: "월" },
  { id: "video_a", name: "브랜드영상 A형", price: 990000, desc: "숏컷 2편 (15초~30초)", perUnit: "1회", category: "video" },
  { id: "video_b", name: "브랜드영상 B형", price: 1400000, desc: "숏컷 3편 + 하이라이트 1편", perUnit: "1회", category: "video" },
  { id: "video_c", name: "브랜드영상 C형", price: 2490000, desc: "묵직한 브랜딩 영상 1편 (3분 이내)", perUnit: "1회", category: "video" },
  { id: "video_d", name: "브랜드영상 D형", price: 5500000, desc: "브랜딩 영상 2편", perUnit: "1회", category: "video" },
  { id: "video_edu_small", name: "교육/매뉴얼 영상 (20P 미만)", price: 1000000, desc: "시리즈 편당 (20페이지 미만)", perUnit: "1편", category: "video" },
  { id: "video_edu_large", name: "교육/매뉴얼 영상 (50P 미만)", price: 2000000, desc: "시리즈 편당 (50페이지 미만)", perUnit: "1편", category: "video" },
  { id: "video_visit", name: "방문 촬영", price: 1500000, desc: "현장 방문 촬영 영상 1편", perUnit: "1회", category: "video" },
  { id: "zoom_consult", name: "🎥 ZOOM 상담", price: 30000, desc: "30분 1:1 화상 마케팅 전략 상담", perUnit: "1회", category: "consultation", highlight: true }
]

// ========================================
// 시스템 개발 옵션 (기능 중심 - 자동화/연동)
// ========================================
const SYSTEM_DEV_OPTIONS = [
  { id: "sys_basic", name: "시스템 개발 (기본)", price: 1900000, desc: "회원가입 / 로그인 / 게시판" },
  { id: "sys_standard", name: "시스템 개발 (표준)", price: 2900000, desc: "네이버 지도 연동 / 카카오 연동" },
  { id: "sys_advanced", name: "시스템 개발 (고급)", price: 4900000, desc: "결제 시스템 / 예약 자동화 / 알림톡 연동" },
  { id: "sys_premium", name: "시스템 개발 (프리미엄)", price: 7900000, desc: "AI 상담봇 설치 / 관리자 대시보드" },
  { id: "sys_enterprise", name: "시스템 개발 (엔터프라이즈)", price: 9900000, desc: "풀커스텀 시스템 (ERP/CRM 연동)" },
  { id: "edu_ai_class", name: "🎓 XIΛIX AI 입문반 1기", price: 2000000, desc: "6주 과정 · 1월 개강 · 선착순 5명", isEdu: true }
]

// ========================================
// 웹 서비스 옵션 - 삭제됨 (리틀리는 부가서비스로 이동, 홈페이지는 웹사이트 구축으로 통합)
// ========================================
const WEB_SERVICE_OPTIONS: any[] = []

// ========================================
// 브랜드/프랜차이즈 컨설팅 (1년 계약, 월2회 방문)
// ========================================
// 브랜드/프랜차이즈 컨설팅 - 3개월 단위 패키지
const CONSULTING_OPTIONS = [
  { 
    id: "consult_initial", 
    name: "🚀 초기 셋업",
    badge: "STEP 1",
    period: "3개월",
    monthlyFee: 3000000,
    totalPrice: 9000000,
    subtitle: "브랜드 기반 구축",
    desc: "월 2회 현장 방문",
    tasks: ["브랜드 아이덴티티 정립", "매뉴얼 초안 제작", "마케팅 전략 수립", "법인/세무/노무 자문"],
    includes: ["브랜드 매뉴얼 제작", "마케팅 전략 수립", "월2회 현장 방문"],
    advisory: ["법인 설립", "세무 자문", "노무 자문"]
  },
  { 
    id: "consult_foundation", 
    name: "📈 기반 확장",
    badge: "STEP 2",
    period: "3개월",
    monthlyFee: 2000000,
    totalPrice: 6000000,
    subtitle: "실행 및 최적화",
    desc: "월 2회 현장 방문",
    tasks: ["커리큘럼 완성", "영상 마케팅 실행", "운영 시스템 안정화", "매출 성장 모니터링"],
    includes: ["교육 커리큘럼 구성", "영상 마케팅 전략", "월2회 현장 방문"],
    advisory: ["행정 지원", "영업 전략", "마케팅 자문"],
    recommended: true
  },
  { 
    id: "consult_growth", 
    name: "🎯 성장 유지",
    badge: "STEP 3",
    period: "3개월",
    monthlyFee: 1500000,
    totalPrice: 4500000,
    subtitle: "지속 관리 및 자문",
    desc: "월 2회 현장 방문",
    tasks: ["월2회 정기 방문", "지속 자문 (세무/노무/영업)", "정부과제 연계", "성과 분석 리포트"],
    includes: ["정기 방문 자문", "성과 분석 리포트", "정부과제 연계 (과제비 별도)"],
    advisory: ["세무 자문", "노무 자문", "영업 전략", "정부과제"]
  }
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
app.get('/api/web-service-options', (c) => c.json(WEB_SERVICE_OPTIONS))
app.get('/api/system-dev-options', (c) => c.json(SYSTEM_DEV_OPTIONS))
app.get('/api/consulting-options', (c) => c.json(CONSULTING_OPTIONS))

// ========================================
// 계약서 저장 API
// ========================================
function genId() {
  const c = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  let r = '';
  for (let i = 0; i < 8; i++) r += c[Math.floor(Math.random() * c.length)];
  return r;
}

// 계약서 저장
app.post('/api/contracts', async (c) => {
  try {
    const data = await c.req.json();
    const id = genId();
    const db = c.env.DB;
    if (!db) return c.json({ success: false, error: 'DB not configured' }, 500);
    
    await db.prepare(`
      INSERT INTO contracts (id, title, contract_date, provider_company, provider_rep, provider_phone, provider_email,
        bank_name, bank_account, bank_holder, services, extra_service_name, extra_service_price, setup_fee, monthly_fee,
        service_start_date, payment_day, initial_payment, monthly_payment, agree_sms, remarks, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'draft')
    `).bind(
      id, data.title, data.contract_date, data.provider_company, data.provider_rep, data.provider_phone, data.provider_email,
      data.bank_name, data.bank_account, data.bank_holder, JSON.stringify(data.services || []), 
      data.extra_service_name || '', data.extra_service_price || 0,
      data.setup_fee || 0, data.monthly_fee || 0, data.start_date,
      data.payment_day, data.initial_amount, data.monthly_amount, data.sms_agree ? 1 : 0, data.remarks || ''
    ).run();
    
    return c.json({ success: true, id });
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500);
  }
});

// 계약서 조회
app.get('/api/contracts/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const db = c.env.DB;
    if (!db) return c.json({ success: false, error: 'DB not configured' }, 500);
    
    const row = await db.prepare('SELECT * FROM contracts WHERE id = ?').bind(id).first();
    if (!row) return c.json({ success: false, error: 'Not found' }, 404);
    
    return c.json({ success: true, contract: { ...row, services: JSON.parse(row.services as string || '[]') } });
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500);
  }
});

// 고객 서명 저장
app.post('/api/contracts/:id/sign', async (c) => {
  try {
    const id = c.req.param('id');
    const data = await c.req.json();
    const db = c.env.DB;
    if (!db) return c.json({ success: false, error: 'DB not configured' }, 500);
    
    await db.prepare(`
      UPDATE contracts SET client_company=?, client_name=?, client_phone=?, client_email=?, client_address=?,
        client_signature=?, remarks=?, status='signed', signed_at=datetime('now') WHERE id=?
    `).bind(data.client_company, data.client_name, data.client_phone, data.client_email, data.client_address, data.client_signature, data.remarks || '', id).run();
    
    return c.json({ success: true });
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500);
  }
});

// ========================================
// 카카오 알림톡 API
// ========================================

// 알림톡 메시지 타입
type AlimtalkMessage = {
  to: string  // 수신자 휴대폰번호 (01012345678 형식)
  templateCode: string  // 템플릿 코드
  variables: Record<string, string>  // 템플릿 변수
}

// 알림톡 발송 함수
async function sendAlimtalk(
  env: Bindings,
  message: AlimtalkMessage
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const apiKey = env.KAKAO_BIZ_API_KEY
  const senderKey = env.KAKAO_BIZ_SENDER_KEY
  
  if (!apiKey || !senderKey) {
    return { success: false, error: 'Kakao Alimtalk API key not configured' }
  }
  
  try {
    // 카카오 비즈메시지 API 호출 (NHN Cloud / 솔라피 / 알리고 등 사용 가능)
    // 여기서는 일반적인 구조로 작성 - 실제 API 제공업체에 맞게 수정 필요
    
    const response = await fetch('https://api.solapi.com/messages/v4/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        message: {
          to: message.to,
          from: senderKey,
          kakaoOptions: {
            pfId: env.KAKAO_BIZ_PFID,
            templateId: message.templateCode,
            variables: message.variables
          }
        }
      })
    })
    
    const result = await response.json() as any
    
    if (response.ok) {
      return { success: true, messageId: result.messageId || result.groupId }
    } else {
      return { success: false, error: result.message || 'Failed to send message' }
    }
  } catch (error: any) {
    return { success: false, error: error.message || 'Network error' }
  }
}

// 계약서 링크 발송 API
app.post('/api/alimtalk/send-contract', async (c) => {
  try {
    const body = await c.req.json()
    const { phone, clientName, contractUrl, companyName } = body
    
    if (!phone || !clientName || !contractUrl) {
      return c.json({ success: false, error: 'Missing required fields' }, 400)
    }
    
    // 전화번호 정규화 (하이픈 제거)
    const normalizedPhone = phone.replace(/-/g, '')
    
    // 알림톡 발송
    const result = await sendAlimtalk(c.env, {
      to: normalizedPhone,
      templateCode: 'CONTRACT_LINK',  // 카카오 비즈니스에서 등록한 템플릿 코드
      variables: {
        '#{고객명}': clientName,
        '#{회사명}': companyName || '컴바인티엔비',
        '#{계약서링크}': contractUrl
      }
    })
    
    // DB에 발송 기록 저장 (선택사항)
    if (c.env.DB && result.success) {
      try {
        await c.env.DB.prepare(`
          INSERT INTO alimtalk_logs (phone, template_code, message_id, sent_at, status)
          VALUES (?, ?, ?, datetime('now'), 'sent')
        `).bind(normalizedPhone, 'CONTRACT_LINK', result.messageId || '').run()
      } catch (dbError) {
        console.error('DB logging error:', dbError)
      }
    }
    
    return c.json(result)
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// 결제 알림 발송 API
app.post('/api/alimtalk/send-payment-reminder', async (c) => {
  try {
    const body = await c.req.json()
    const { phone, clientName, paymentDate, amount, companyName } = body
    
    if (!phone || !clientName || !paymentDate || !amount) {
      return c.json({ success: false, error: 'Missing required fields' }, 400)
    }
    
    const normalizedPhone = phone.replace(/-/g, '')
    
    const result = await sendAlimtalk(c.env, {
      to: normalizedPhone,
      templateCode: 'PAYMENT_REMINDER',  // 카카오 비즈니스에서 등록한 템플릿 코드
      variables: {
        '#{고객명}': clientName,
        '#{회사명}': companyName || '컴바인티엔비',
        '#{결제일}': paymentDate,
        '#{결제금액}': amount
      }
    })
    
    return c.json(result)
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// 알림톡 설정 상태 확인 API
app.get('/api/alimtalk/status', (c) => {
  const isConfigured = !!(c.env.KAKAO_BIZ_API_KEY && c.env.KAKAO_BIZ_SENDER_KEY)
  return c.json({ 
    configured: isConfigured,
    message: isConfigured ? 'Alimtalk is configured' : 'Alimtalk API keys not set'
  })
})

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

// ========================================
// Google Calendar 연동 API
// ========================================
app.get('/api/auth/google', (c) => {
  const clientId = c.env?.GOOGLE_CLIENT_ID || ''
  const redirectUri = encodeURIComponent('https://xivix.kr/api/auth/google/callback')
  const scope = encodeURIComponent('https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/userinfo.email')
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`
  return c.redirect(googleAuthUrl)
})

app.get('/api/auth/google/callback', async (c) => {
  const code = c.req.query('code')
  
  if (!code) {
    return c.redirect('/?error=google_auth_failed')
  }
  
  try {
    const clientId = c.env?.GOOGLE_CLIENT_ID || ''
    const clientSecret = c.env?.GOOGLE_CLIENT_SECRET || ''
    const redirectUri = 'https://xivix.kr/api/auth/google/callback'
    
    // 액세스 토큰 받기
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
      })
    })
    
    const tokenData = await tokenRes.json() as any
    
    if (tokenData.access_token) {
      // 토큰을 세션에 저장 (실제로는 DB에 저장하는 것이 좋음)
      setCookie(c, 'google_access_token', tokenData.access_token, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'Lax',
        maxAge: tokenData.expires_in || 3600
      })
      
      if (tokenData.refresh_token) {
        setCookie(c, 'google_refresh_token', tokenData.refresh_token, {
          path: '/',
          httpOnly: true,
          secure: true,
          sameSite: 'Lax',
          maxAge: 60 * 60 * 24 * 30 // 30일
        })
      }
      
      return c.redirect('/?google_connected=true')
    }
    
    return c.redirect('/?error=google_token_failed')
  } catch (error) {
    console.error('Google OAuth error:', error)
    return c.redirect('/?error=google_auth_error')
  }
})

// Google Calendar 이벤트 생성 (예약 시 자동 등록)
app.post('/api/calendar/create-event', async (c) => {
  const accessToken = getCookie(c, 'google_access_token')
  
  if (!accessToken) {
    return c.json({ success: false, error: 'Google 연동이 필요합니다.' }, 401)
  }
  
  const { summary, description, startDateTime, endDateTime, attendeeEmail } = await c.req.json()
  
  try {
    const event = {
      summary: summary || 'XIVIX 상담 예약',
      description: description || '',
      start: {
        dateTime: startDateTime,
        timeZone: 'Asia/Seoul'
      },
      end: {
        dateTime: endDateTime,
        timeZone: 'Asia/Seoul'
      },
      attendees: attendeeEmail ? [{ email: attendeeEmail }] : [],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 60 },
          { method: 'popup', minutes: 30 }
        ]
      }
    }
    
    const res = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event)
    })
    
    const result = await res.json() as any
    
    if (result.id) {
      return c.json({ success: true, eventId: result.id, eventLink: result.htmlLink })
    }
    
    return c.json({ success: false, error: 'Failed to create event' }, 400)
  } catch (error) {
    console.error('Calendar event error:', error)
    return c.json({ success: false, error: 'Calendar API error' }, 500)
  }
})

// 카카오 공유용 앱 키 제공
app.get('/api/kakao/app-key', (c) => {
  const jsKey = c.env?.KAKAO_JS_KEY || 'ab4e6e4c5d28f94c4af56f85519bf1a9'
  return c.json({ appKey: jsKey })
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
당신은 X I Λ I X 마케팅 전문 상담 AI입니다. (20년 경력 마케팅 전문가 기반)
마케팅 용어를 전혀 모르는 사업가들에게 비즈니스 파트너로서 친절하게 조언합니다.
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
   - 릴스 → "15~90초짜리 짧은 동영상, 요즘 인스타에서 제일 잘 퍼지는 콘텐츠"
   - 피드 → "인스타 계정 들어가면 바둑판처럼 보이는 사진/이미지들"
   - 카드뉴스 → "슬라이드처럼 넘겨보는 정보 이미지 (보통 5~10장)"
2. **전문 용어 자제:** ROAS, 퍼널 등 어려운 용어는 쓰지 않거나 쉽게 풀어서 설명
3. **이모지 활용:** 🎒🚀💡💰🏥☕📍📸🎬 등 적절히 사용
4. **결론부터:** "이걸 추천해요!" 먼저 말하고 이유 설명
5. **친구 초대 할인 안내:** 가격 문의 시 "친구 초대하시면 바로 15% 할인 쿠폰 받으실 수 있어요! 추천해주신 분도 결제금액의 5% 적립금을 받으시고요!" 언급

# Product Database (판매 상품 - 엄격 준수, 가격 지어내기 금지!)

## 🔥 SNS 세트 메뉴 (가장 추천! 할인 적용)
*세트 = 첫달(셋팅+월관리) + 다음달부터 월관리비만*

| 상품명 | 첫달 총액 | 월관리 | 포함 서비스 | 추천 대상 |
|--------|----------|--------|-------------|-----------|
| 🔥 SNS 스타터 | 89만 | 55만 | 플레이스 셋팅 + 베이직 관리 | "처음 시작하는 분, 지도에 먼저 이름 올리고 싶은 분" |
| ⭐ SNS 성장 (BEST) | 149만 | 99만 | 플레이스+인스타 셋팅 + 퍼포먼스 관리 | "인스타도 하고 검색도 잡고 싶은 분 - 가장 인기!" |
| 💎 바이럴 마스터 | 279만 | 99만 | 플레이스+인스타+유튜브 + 퍼포먼스 관리 | "영상으로 입소문 확 내고 싶은 분" |
| 👑 지역 장악 | 499만 | 190만 | 전 채널 셋팅 + 토탈마스터 관리 | "우리 동네 1등, 압도적 존재감 원하는 분" |

## 📊 월관리 등급 (GRADE) - 세부 서비스 내용

### GRADE 1: 베이직 (월 55만원)
"기본기 다지기 - 꾸준히 관리받고 싶은 분"
포함 서비스:
- 📍 네이버 플레이스: 기본 정보 관리 + 리뷰 응대 (월 2회 점검)
- 📸 인스타그램: 피드 2개 + 스토리 4개/월
- 📝 블로그: 포스팅 2개/월

### GRADE 2: 퍼포먼스 그로스 (월 99만원) ⭐ 가장 인기
"적극적으로 손님 늘리기 - 문의/예약 늘리고 싶은 분"
포함 서비스:
- 📍 네이버 플레이스 A형: 적극적 리뷰 관리 + 키워드 모니터링 + 상위노출 전략
- 📸 인스타그램 풀관리: 릴스 4개 + 피드 4개 + 카드뉴스 2개 + 스토리 8개/월
- 📝 블로그 A형: 상위노출 타겟 포스팅 4개/월
- 🌍 구글 마이비즈니스: 리뷰 관리 + 정보 최적화

### GRADE 3: 토탈 마스터 (월 190만원) 👑
"지역 1등 - 압도적 존재감으로 동네 장악"
포함 서비스:
- 🎬 유튜브 숏폼: 숏츠 제작 4개/월 (촬영+편집+업로드)
- 📸 인스타그램 풀관리: 릴스 8개 + 피드 6개 + 카드뉴스 4개/월
- 📍 네이버 플레이스 A형 + 블로그 A형
- 🎵 틱톡: 영상 제작 4개/월
- 🌍 구글 마이비즈니스 + SEO 기본

## 🏷️ 채널별 단품 서비스 (개별 선택 가능)

### 📍 네이버 (지도+검색)
| 서비스 | 셋팅비 | 월관리 | 세부 내용 |
|--------|--------|--------|-----------|
| 플레이스 셋팅 | 39만 | - | 기본정보 최적화, 사진 보정 20장, 메뉴/가격표, 키워드 세팅 |
| 플레이스 월관리 A형 | - | 50만 | 리뷰 적극 관리(답글+유도), 키워드 모니터링, 상위노출 전략, 주 1회 리포트 |
| 플레이스 월관리 B형 | - | 35만 | 기본 리뷰 응대, 정보 업데이트, 월 2회 점검 |
| 광고/톡톡/페이 SET | 59만 | 별도상담 | 네이버 광고 세팅 + 톡톡 자동응답 + 페이 연동 (광고비 별도) |

### 📸 인스타그램
| 서비스 | 셋팅비 | 월관리 | 세부 내용 |
|--------|--------|--------|-----------|
| 계정 셋팅 | 49만 | - | 프로필 최적화, 하이라이트 구성, 피드 그리드 기획, 해시태그 전략 |
| 월관리 | - | 75만 | 릴스 4개 + 피드 4개 + 카드뉴스 2개 + 스토리 8개/월, 댓글/DM 관리 |
| 메타광고 셋팅 | 35만 | 별도상담 | 타겟 광고 세팅 (인스타+페이스북), 광고비 별도 |
| 스레드 셋팅 | 15만 | - | 계정 생성 + 초기 콘텐츠 10개 |
| 스레드 월관리 | - | 20만 | 포스팅 15개/월 + 소통 관리 |

### 🎬 유튜브/숏폼
| 서비스 | 셋팅비 | 월관리 | 세부 내용 |
|--------|--------|--------|-----------|
| 채널 셋팅 | 59만 | - | 채널아트, 섬네일 템플릿, 재생목록 구성, SEO 최적화 |
| 숏폼 월관리 | - | 59만 | 숏츠/릴스 4개/월 (기획+촬영가이드+편집+업로드+해시태그) |
| 롱폼 월관리 | - | 150만 | 5~15분 영상 2개/월 (기획+촬영+편집+썸네일+SEO) |

### 🎵 틱톡
| 서비스 | 셋팅비 | 월관리 | 세부 내용 |
|--------|--------|--------|-----------|
| 계정 셋팅 | 49만 | - | 프로필 최적화, 트렌드 분석, 초기 콘텐츠 5개 |
| 월관리 | - | 55만 | 영상 8개/월 (트렌드 반영), 해시태그 전략, 소통 관리 |

### 📝 블로그
| 서비스 | 셋팅비 | 월관리 | 세부 내용 |
|--------|--------|--------|-----------|
| 네이버블로그 셋팅 | 29만 | - | 블로그 개설/디자인, 카테고리 구성, 초기 포스팅 3개 |
| 네이버 월관리 A형 | - | 45만 | 상위노출 타겟 포스팅 4개/월 (키워드 분석+SEO 최적화) |
| 네이버 월관리 B형 | - | 20만 | 일반 포스팅 2개/월 |
| 워드프레스 셋팅 | 35만 | - | 설치+테마+플러그인+초기 세팅 |
| 워드프레스 월관리 | - | 30만 | 포스팅 4개/월 + 기술 유지보수 |

### 🌍 구글
| 서비스 | 셋팅비 | 월관리 | 세부 내용 |
|--------|--------|--------|-----------|
| 마이비즈니스 셋팅 | 35만 | - | 구글맵 등록, 정보 최적화, 사진 업로드 |
| 마이비즈니스 월관리 | - | 25만 | 리뷰 관리, 게시물 업로드, 정보 업데이트 |
| 구글 SEO | 59만 | 별도상담 | 웹사이트 검색최적화 (기술 SEO + 콘텐츠) |
| 구글 광고 | 39만 | 별도상담 | 검색/디스플레이 광고 세팅 (광고비 별도) |

## 🌐 웹사이트 구축
| 패키지 | 가격 | 포함 내용 | 추천 대상 |
|--------|------|-----------|-----------|
| 랜딩형 | 99만 | 1페이지 원페이지, 반응형, 기본 SEO | "일단 홈페이지 있으면 되는 분" |
| 스탠다드 (BEST) | 199만 | 5페이지, 반응형, SEO, 3개월 관리 | "제대로 된 회사 홈페이지 원하는 분" |
| 프리미엄 | 450만 | 무제한 페이지, AI 상담봇 탑재, 6개월 VIP 관리 | "24시간 자동 상담 원하는 분" |
| 병원/프랜차이즈 | 750만 | 브랜드 영상 3편 + AI 상담봇 + 예약시스템 + 12개월 케어 | "전문 브랜딩 필요한 분" |

## 🎨 웹 서비스 (디자인 중심)
| 패키지 | 가격 | 포함 내용 |
|--------|------|-----------|
| 리틀리 제작 | 29만 | 링크 모음 페이지 |
| 홈페이지 (기본) | 99만 | 5페이지 반응형 웹사이트 |
| 홈페이지 (프로) | 199만 | SEO 최적화 + 3개월 관리 |

## ⚙️ 시스템 개발 (기능 중심)
| 패키지 | 가격 | 포함 내용 |
|--------|------|-----------|
| 시스템 개발 (기본) | 190만 | 회원가입 / 로그인 / 게시판 |
| 시스템 개발 (표준) | 290만 | 네이버 지도 연동 / 카카오 연동 |
| 시스템 개발 (고급) | 490만 | 결제 시스템 / 예약 자동화 / 알림톡 연동 |
| 시스템 개발 (프리미엄) | 790만 | AI 상담봇 설치 / 관리자 대시보드 |
| 시스템 개발 (엔터프라이즈) | 990만 | 풀커스텀 시스템 (ERP/CRM 연동) |

## ➕ 부가 서비스
- 📊 상세페이지 디자인: 150만 (쿠팡/스마트스토어용, 수작업 고퀄리티)
- 📈 상권분석 (방문설명): 80만 (현장 방문 + 맞춤 전략, 계약시 전액 환급!)
- 🚀 SNS 부스팅: 월 29만 (팔로워/좋아요 증가)
- 🎬 브랜드 영상 A형: 99만 (숏컷 2편)
- 🎬 브랜드 영상 B형: 140만 (숏컷 3편 + 하이라이트 1편)
- 🎬 브랜드 영상 C형: 249만 (묵직한 브랜딩 영상 1편)
- 🎬 브랜드 영상 D형: 550만 (브랜딩 영상 2편)
- 🎬 교육/매뉴얼 영상 (20P 미만): 100만/편
- 🎬 교육/매뉴얼 영상 (50P 미만): 200만/편
- 🎬 방문 촬영: 150만 (현장 방문 촬영 1편)
- **🎥 ZOOM 상담: 3만원** (30분 1:1 화상 전략 상담) ← 가장 저렴하게 전문가 조언!

## 🏢 브랜드/프랜차이즈 컨설팅 (1년 계약, 월 2회 방문)
| 기간 | 월 금액 | 설명 |
|------|---------|------|
| 1~2개월차 | **월 300만** | 초기 세팅 기간 |
| 3~5개월차 | **월 200만** | 안정화 기간 |
| 6~12개월차 | **월 150만** | 유지 기간 |

**포함 서비스:**
- 매뉴얼 제작 / 커리큘럼 구성 / 영상 마케팅 전략

**자문 분야:**
- 법인 설립 / 세무 자문 / 노무 자문 / 행정 지원 / 영업 전략
- 정부과제 연계 (과제비 별도)

💡 "브랜드 만들어서 프랜차이즈 하고 싶어요" → 브랜드 컨설팅 추천!
💡 "이미 가맹점 여러 개인데 체계화하고 싶어요" → 프랜차이즈 컨설팅 추천!

## 🎁 다단계 친구 초대 혜택 (추천인 보상 시스템)
**🔥 친구 초대하면 바로 15% 할인!**

### 레벨 1: 직접 초대 (1차)
- 초대한 친구: **15% 할인 쿠폰** 증정
- 나(추천인): **친구 결제금액의 5% 적립금** 획득

### 레벨 2: 친구의 친구 (2차)
- 내가 초대한 친구가 또 친구를 초대하면
- 나(원래 추천인): **2차 친구 결제금액의 2% 적립금** 추가 획득

### 레벨 3: VIP 마스터 (누적 500만원 이상)
- 모든 추천에서 **7% 적립금** 획득
- 초대받는 친구는 **20% 할인** 혜택

💰 **예시)**
- SNS 성장 149만원 → 15% 할인 시 **126.6만원** (22.4만원 절약!)
- 친구가 결제하면 나는 **7.4만원 적립금** 획득 (5%)
- 친구의 친구가 결제하면 **추가 2.9만원 적립금** (2%)

# FAQ Response (자주 묻는 질문 대응)

**Q1. "너무 비싸요" / "예산이 부족해요"**
→ "이해해요! 그래서 저희가 세트 메뉴를 만들었어요. SNS 스타터 89만원이면 첫 달 세팅+관리까지 다 되고, 다음 달부터는 55만원이에요. 하루로 치면 1.8만원! 알바생 반나절 비용으로 24시간 마케팅 되는 셈이죠 😊 그리고 친구 초대받으시면 바로 15% 할인이에요! 아니면 분할결제도 가능해요!"

**Q1-1. "분할결제 가능한가요?"**
→ "네! 셋팅비를 2~3회로 나눠 결제하실 수 있어요. 예를 들어 SNS 성장(149만원)을 계약하시면: 계약금 50만원 → 1주후 49만원 → 세팅완료후 50만원 이렇게요. 월관리비는 매월 따로니까 겹치지 않아요! 😊"

**Q2. "효과가 바로 나타나나요?"**
→ "씨앗 심자마자 열매 열리진 않잖아요? 🌱 첫 달은 밭 갈고 씨 뿌리는 '세팅' 기간이에요. 플레이스 최적화하고 인스타 기반 다지고... 제대로 세팅하면 보통 2~3개월째부터 문의가 늘기 시작해요."

**Q3. "월관리에 뭐가 포함되어 있어요?"**
→ (위 GRADE별 세부 내용 참조해서 구체적으로 설명. 예: "GRADE 2 퍼포먼스는 월 99만원인데요, 인스타 릴스 4개+피드 4개+카드뉴스 2개, 플레이스 적극 관리, 블로그 4개 포스팅이 포함되어 있어요. 사장님은 콘텐츠 승인만 해주시면 저희가 다 올려드려요!")

**Q4. "인스타 월관리 75만원에 정확히 뭘 해주는 거예요?"**
→ "릴스(짧은 영상) 4개, 피드(이미지) 4개, 카드뉴스 2개, 스토리 8개를 만들어서 올려드려요. 댓글이나 DM 관리도 해드리고요. 사장님은 촬영 협조만 해주시면 나머지는 저희가 기획-제작-업로드까지 다 해요! 📸"

**Q5. "해약할 수 있나요?"**
→ "네! 노예계약 없어요 😎 첫 달 써보시고 마음에 안 드시면 언제든 멈추셔도 돼요. 그만큼 실력에 자신 있으니까요."

**Q6. "플레이스 A형이랑 B형 차이가 뭐예요?"**
→ "B형(35만)은 기본 관리예요. 리뷰 답글 달고 정보 업데이트하고. A형(50만)은 적극 공략! 상위노출 전략 짜고, 키워드 모니터링하고, 리뷰 유도까지 해드려요. 경쟁 심한 지역이면 A형 추천해요!"

**Q7. "ZOOM 상담은 뭐예요?"**
→ "3만원에 30분 동안 1:1로 화상 상담해드려요! 사장님 업종, 상황 듣고 맞춤 전략 조언해드려요. 일단 이것만 신청하셔도 방향이 잡히실 거예요 🎥"

**Q8. "결제는 어떻게 하나요?" / "선입금인가요?"**
→ "네! 저희는 **선입금 시스템**이에요. 결제 완료 후 작업이 시작됩니다. 정당한 대가 없이는 서비스 제공이 어렵습니다. 대신 품질에 자신 있으니 첫 달 써보시고 마음에 안 드시면 다음 달 해약 가능해요! 😊"

**Q8-1. "후불 안 되나요?" / "나중에 결제해도 되나요?"**
→ "죄송해요, 저희는 **선입금 원칙**입니다. 계약금 먼저 결제 → 작업 시작 → 세팅 완료 후 잔금 결제 순서로 진행해요. 분할결제는 가능하지만 후불은 어렵습니다. 신뢰가 쌓인 장기 고객님에게만 예외적으로 협의 가능해요!"

**Q9. "계약서 작성하나요?"**
→ "네! 정식 전자계약서를 작성해요. 서비스 범위, 기간, 금액, 해약 조건이 명시되어 있어서 서로 안심하고 진행할 수 있어요. 계약서 없이는 프로젝트 시작 안 해요! ✍️"

# Conversation Flow (대화 순서)
1. **인사+업종 파악:** "안녕하세요! X I Λ I X 마케팅 상담 AI입니다 😊 어떤 사업 운영하고 계신가요?"
2. **호칭 설정+공감:** 업종 맞는 호칭으로 부르며 노고 위로
3. **니즈 파악:** "지금 가장 고민되시는 게 뭐예요? 손님이 안 오는 건지, 인스타 운영이 어려운 건지..."
4. **맞춤 추천:** 상황에 맞는 상품을 쉬운 비유와 함께 추천 (세트 메뉴 우선 추천)
5. **세부 설명:** 궁금해하면 포함 서비스 구체적으로 설명
6. **FAQ 방어:** 가격/효과 걱정하면 위 FAQ 논리로 설득
7. **마무리:** "장바구니에 담아드릴까요?" 또는 "ZOOM 상담 먼저 받아보시겠어요?"

# 금지 사항
- 없는 상품/가격 지어내기 (위 데이터베이스에 없는 건 "확인 후 안내드릴게요" 라고 답변)
- 임의 할인/무료 약속 (친구초대 15%, VIP 20% 외 할인 불가)
- 효과 100% 보장 발언
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
  
  // 인스타그램 관련
  if (lower.includes('인스타') || lower.includes('instagram') || lower.includes('릴스') || lower.includes('피드')) {
    return getInstagramResponse()
  }
  
  // 유튜브 관련
  if (lower.includes('유튜브') || lower.includes('youtube') || lower.includes('숏폼') || lower.includes('영상')) {
    return getYoutubeResponse()
  }
  
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

🔥 **SNS 스타터** - **첫달 89만원** → 다음달부터 월 55만원
→ 플레이스 셋팅 + 베이직 관리
💡 처음 시작하는 분께 추천!

⭐ **SNS 성장** - **첫달 149만원** → 다음달부터 월 99만원 (BEST!)
→ 플레이스+인스타 셋팅 + 퍼포먼스 관리
💡 매출 전환이 필요하신 분!

💎 **바이럴 마스터** - **첫달 279만원** → 다음달부터 월 99만원
→ 플레이스+인스타+유튜브 셋팅 + 퍼포먼스 관리
💡 영상으로 입소문 내고 싶은 분!

👑 **지역 장악** - **첫달 499만원** → 다음달부터 월 190만원
→ 전채널 풀셋팅 + 토탈마스터 관리
💡 지역 1등을 노리시는 분!

🎁 **친구 초대하면 바로 15% 할인! 추천인도 5% 적립금!**

어떤 업종이신가요? 맞춤 추천 드릴게요!`
  }
  
  if (lower.includes('grade') || lower.includes('관리')) {
    return `📊 **월 관리 GRADE**

**GRADE 1 베이직** (월 55만원)
🎯 기본기 다지기 - 꾸준히 관리받고 싶은 분
• 플레이스 기본관리 + 인스타(피드2+스토리4) + 블로그 2개/월
💡 하루 1.8만원으로 기본 관리!

**GRADE 2 퍼포먼스** (월 99만원) ⭐BEST
🎯 적극적으로 손님 늘리기
• 인스타 풀관리(릴스4+피드4+카드2+스토리8)
• 플레이스A(리뷰적극관리+키워드모니터링)
• 블로그A(상위노출 타겟 4개/월) + 구글
💡 문의/예약이 늘기 시작해요!

**GRADE 3 토탈마스터** (월 190만원) 👑
🎯 지역 1등, 압도적 존재감
• 유튜브 숏폼 4개/월 + 인스타(릴스8+피드6+카드4)
• 플레이스A + 블로그A + 틱톡 4개/월 + 구글SEO
💡 모든 채널 장악! 동네 1등 가능!

어떤 목표를 가지고 계신가요?`
  }
  
  if (lower.includes('플레이스')) {
    return `🗺️ **네이버 플레이스 서비스**

**플레이스 단독 서비스:**
• 셋팅비: **39만원** (기본정보 최적화 + 사진보정 20장 + 키워드 세팅)
• 월관리 A형: **50만원** (리뷰 적극관리 + 키워드모니터링 + 상위노출전략 + 주1회 리포트)
• 월관리 B형: **35만원** (기본 리뷰응대 + 정보 업데이트 + 월2회 점검)

**네이버 광고/톡톡/페이 SET:** **59만원** (광고비 별도)
→ 네이버 광고 세팅 + 톡톡 자동응답 + 페이 연동

💡 **20년 노하우 꿀팁:** 
플레이스만 하면 한계가 있어요!
블로그 + 플레이스 연동하면 상위노출 효과 2배!
GRADE 1(월55만원)으로 시작하시면 블로그+플레이스+인스타 다 됩니다 😊`
  }
  
  if (lower.includes('웹사이트') || lower.includes('홈페이지') || lower.includes('웹')) {
    return `🌐 **웹사이트 구축** (SNS 마케팅 별도)

**TYPE A 랜딩형** - **99만원**
→ 1페이지 원페이지, 반응형, 기본 SEO
💡 일단 홈페이지 있으면 되는 분!

**TYPE B 스탠다드** - **199만원** (BEST!)
→ 5페이지, 반응형, SEO 적용, 3개월 관리 포함
💡 제대로 된 회사 홈페이지 원하는 분!

**TYPE C 프리미엄** - **450만원** ⚡
→ 무제한 페이지 + **24시간 AI 상담봇** 탑재 + 6개월 VIP관리
💡 고객 문의에 24시간 자동 응대!

**TYPE D 병원/프랜차이즈** - **750만원** 🎬
→ **브랜드 영상 3편** + AI 상담봇 + 예약시스템 + 12개월 케어
💡 프리미엄 브랜딩의 끝판왕!

💻 **웹 시스템 개발도 있어요!**
회원시스템/결제/AI 기능 등 (190만~990만)

어떤 사업을 하고 계신가요?`
  }
  
  return `안녕하세요! X I Λ I X 마케팅 상담 AI입니다! 😊

20년간 **소상공인부터 대기업까지** 마케팅을 진행해왔어요.
미용실, 에스테틱, 맛집, 병원 등 다양한 업종의 성공 사례가 있습니다!

저희는 **"매출을 올리는 마케팅 솔루션"**을 제공합니다.

궁금하신 점을 편하게 물어보세요:
• 💰 "가격" - 셋트 메뉴/개별 서비스 안내
• 🎨 "포트폴리오" - 작업 사례
• 📊 "GRADE" - 월관리에 뭐가 포함되어 있는지
• 🗺️ "플레이스" - 네이버 지도 마케팅
• 🌐 "웹사이트" - 홈페이지 구축
• 📸 "인스타" - 인스타그램 관리
• 🎬 "유튜브" - 영상 마케팅

**어떤 업종을 운영하고 계신가요?**
업종에 맞는 맞춤 전략 제안드릴게요!`
}

// 인스타그램 관련 응답 추가
function getInstagramResponse(): string {
  return `📸 **인스타그램 서비스**

**계정 셋팅:** **49만원**
→ 프로필 최적화 + 하이라이트 구성 + 피드 그리드 기획 + 해시태그 전략

**월관리:** **75만원**
포함 내용:
• 릴스(짧은영상) 4개/월
• 피드(이미지) 4개/월
• 카드뉴스 2개/월
• 스토리 8개/월
• 댓글/DM 관리

**메타광고 셋팅:** **35만원** (광고비 별도)
→ 인스타+페이스북 타겟 광고 세팅

**스레드:** 셋팅 15만 / 월관리 20만

💡 인스타만 따로 하시는 것보다 **SNS 성장 세트(149만원)**가 훨씬 이득이에요!
플레이스+인스타 셋팅 + 퍼포먼스 월관리까지 다 포함!`
}

// 유튜브 관련 응답
function getYoutubeResponse(): string {
  return `🎬 **유튜브/영상 서비스**

**채널 셋팅:** **59만원**
→ 채널아트 + 섬네일 템플릿 + 재생목록 구성 + SEO 최적화

**숏폼 월관리:** **59만원**
포함 내용:
• 숏츠/릴스 4개/월
• 기획 + 촬영가이드 + 편집 + 업로드
• 해시태그 전략

**롱폼 월관리:** **150만원**
포함 내용:
• 5~15분 영상 2개/월
• 기획 + 촬영 + 편집 + 썸네일 + SEO

**틱톡:** 셋팅 49만 / 월관리 55만 (영상 8개/월)

💡 영상 마케팅 원하시면 **바이럴 마스터 세트(279만원)** 추천!
플레이스+인스타+유튜브 셋팅 + 퍼포먼스 월관리 다 포함!

영상으로 입소문 확 내고 싶으시면 상담해보세요! 🎥`
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
// 상담 예약 API
// ========================================
app.post('/api/booking', async (c) => {
  const data = await c.req.json()
  const db = c.env?.DB
  
  // 필수 필드 검증
  const { name, phone, date, time, consultType, industry, message } = data
  
  if (!name || !phone || !date || !time) {
    return c.json({ success: false, error: '필수 정보를 입력해주세요.' }, 400)
  }
  
  // DB에 예약 저장
  if (db) {
    try {
      // bookings 테이블이 없으면 생성
      await db.prepare(`
        CREATE TABLE IF NOT EXISTS bookings (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          phone TEXT NOT NULL,
          email TEXT,
          date TEXT NOT NULL,
          time TEXT NOT NULL,
          consult_type TEXT,
          industry TEXT,
          message TEXT,
          status TEXT DEFAULT 'pending',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `).run()
      
      await db.prepare(`
        INSERT INTO bookings (name, phone, email, date, time, consult_type, industry, message)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(name, phone, data.email || '', date, time, consultType || '', industry || '', message || '').run()
    } catch (error) {
      console.error('Booking DB error:', error)
    }
  }
  
  console.log('📅 새로운 상담 예약:', JSON.stringify(data, null, 2))
  
  return c.json({
    success: true,
    message: '상담 예약이 완료되었습니다! 담당자가 확인 후 연락드리겠습니다.',
    data: {
      name,
      date,
      time,
      consultType: consultType || '일반 상담',
      submittedAt: new Date().toISOString()
    }
  })
})

// 예약 가능 시간 조회
app.get('/api/booking/available-times', async (c) => {
  const { date } = c.req.query()
  const db = c.env?.DB
  
  // 기본 가능 시간 (10:00 ~ 18:00, 1시간 단위)
  const allTimes = ['10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00']
  
  // DB에서 해당 날짜의 예약된 시간 조회
  let bookedTimes: string[] = []
  if (db && date) {
    try {
      const results = await db.prepare(`
        SELECT time FROM bookings WHERE date = ? AND status != 'cancelled'
      `).bind(date).all()
      bookedTimes = (results.results || []).map((r: any) => r.time)
    } catch (error) {
      console.error('Error fetching booked times:', error)
    }
  }
  
  const availableTimes = allTimes.filter(t => !bookedTimes.includes(t))
  
  return c.json({
    date,
    availableTimes,
    bookedTimes
  })
})

// ========================================
// 수강 신청 API
// ========================================
app.post('/api/edu-bank-transfer', async (c) => {
  const { name, phone, email, product, amount } = await c.req.json()
  console.log('📧 계좌이체 신청:', { name, phone, email, product, amount })
  // TODO: DB 저장 및 이메일 알림 (ikjoobang@gmail.com)
  return c.json({ success: true, message: '신청 완료' })
})

// ========================================
// PAGE ROUTES
// ========================================
app.get('/', (c) => c.html(getMainHTML()))
app.get('/login', (c) => c.html(getLoginHTML()))
app.get('/my', (c) => c.html(getMyPageHTML()))
app.get('/admin', (c) => c.html(getAdminHTML()))
app.get('/contract', (c) => c.html(getContractHTML()))
app.get('/contract/:id', (c) => c.html(getContractViewHTML(c.req.param('id'))))

// OG 이미지 (카카오톡, SNS 공유용) - PNG로 리다이렉트
app.get('/og-image.png', async (c) => {
  // dummyimage.com 사용 - 카카오 호환 PNG
  return c.redirect('https://dummyimage.com/1200x630/1a1a1f/ffffff.png&text=XIVIX')
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
    <title>X I Λ I X | 사장님은 장사만 하세요, 마케팅은 AI가 다 해드립니다</title>
    <meta name="description" content="직원 뽑지 마세요. 블로그, 인스타, 영상 편집... XIVIX AI 시스템이 월급 없이 24시간 일합니다. 시간 -90%, 비용 -70%, 매출 +250%">
    
    <!-- Open Graph (카카오톡, 페이스북 등) -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://xivix.kr">
    <meta property="og:title" content="X I Λ I X | 사장님은 장사만 하세요">
    <meta property="og:description" content="🚀 직원 뽑지 마세요! 블로그, 인스타, 영상 편집... XIVIX AI 시스템이 월급 없이 24시간 일합니다. 내 가게 무료 진단받기 →">
    <meta property="og:image" content="https://xivix.kr/og-image.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:locale" content="ko_KR">
    <meta property="og:site_name" content="X I Λ I X">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="X I Λ I X | 사장님은 장사만 하세요">
    <meta name="twitter:description" content="🚀 직원 뽑지 마세요! XIVIX AI 시스템이 마케팅을 대신합니다. 시간 -90%, 비용 -70%">
    <meta name="twitter:image" content="https://xivix.kr/og-image.png">
    
    <!-- 추가 SEO / AEO / C-RANK / GEO 최적화 -->
    <meta name="keywords" content="마케팅, AI마케팅, SNS마케팅, 블로그마케팅, 유튜브마케팅, 광고대행, 인스타그램, 네이버블로그, 마케팅대행사, 네이버플레이스, 지역마케팅, 소상공인마케팅, 프랜차이즈마케팅, 브랜드컨설팅">
    <meta name="author" content="X I Λ I X">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta name="googlebot" content="index, follow">
    <meta name="NaverBot" content="index, follow">
    <link rel="canonical" href="https://xivix.kr">
    
    <!-- AEO (AI Engine Optimization) - 구조화 데이터 -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "MarketingAgency",
      "name": "X I Λ I X",
      "alternateName": "XIVIX",
      "url": "https://xivix.kr",
      "logo": "https://xivix.kr/og-image.png",
      "description": "AI 기반 통합 마케팅 솔루션 전문 에이전시. SNS, 블로그, 유튜브, 네이버 플레이스 마케팅 대행",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "KR"
      },
      "priceRange": "₩890,000 - ₩9,900,000",
      "areaServed": "KR",
      "serviceType": ["SNS 마케팅", "블로그 마케팅", "유튜브 마케팅", "네이버 플레이스 최적화", "브랜드 컨설팅", "웹사이트 제작"],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "마케팅 서비스",
        "itemListElement": [
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "SNS 스타터"}, "price": "890000", "priceCurrency": "KRW"},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "SNS 성장"}, "price": "1490000", "priceCurrency": "KRW"},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "바이럴 마스터"}, "price": "2790000", "priceCurrency": "KRW"}
        ]
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "127"
      }
    }
    </script>
    
    <!-- GEO (Generative Engine Optimization) / FAQ 구조화 -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "SNS 마케팅 비용은 얼마인가요?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "X I Λ I X의 SNS 마케팅은 월 55만원(베이직)부터 시작합니다. SNS 스타터 세트는 첫달 89만원, 다음달부터 월 55만원입니다. 인스타그램, 네이버 플레이스, 블로그 통합 관리가 포함됩니다."
          }
        },
        {
          "@type": "Question",
          "name": "마케팅 효과는 언제부터 나타나나요?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "첫 달은 계정 최적화와 기반 작업(세팅) 기간입니다. 제대로 세팅하면 보통 2~3개월째부터 문의와 예약이 늘기 시작합니다."
          }
        },
        {
          "@type": "Question",
          "name": "브랜드 컨설팅 비용은 얼마인가요?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "브랜드/프랜차이즈 컨설팅은 1년 계약 기준 월 2회 방문으로 진행됩니다. 1~2개월차 월 300만원, 3~5개월차 월 200만원, 6~12개월차 월 150만원입니다. 매뉴얼 제작, 커리큘럼, 영상 마케팅, 법인/세무/노무 자문이 포함됩니다."
          }
        }
      ]
    }
    </script>
    
    <!-- C-RANK (네이버 검색 최적화) -->
    <meta name="naver-site-verification" content="xivix2024">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" rel="stylesheet">
    <!-- PortOne v2 결제 SDK -->
    <script src="https://cdn.portone.io/v2/browser-sdk.js"></script>
    <!-- 카카오 SDK -->
    <script src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>
    
    <style>
      :root {
        /* 🎯 Deep Black 배경 (사용자 요청) */
        --bg-primary: #000000;
        --bg-secondary: #0a0a0a;
        --bg-tertiary: #121212;
        --bg-card: rgba(18, 18, 18, 0.9);
        --neon-purple: #a855f7;
        --neon-pink: #ec4899;
        --neon-cyan: #22d3ee;
        --neon-orange: #f97316;
        --neon-green: #22c55e;
        --neon-lime: #84cc16;
        --text-primary: #ffffff;
        --text-secondary: rgba(255, 255, 255, 0.75);
        --text-tertiary: rgba(255, 255, 255, 0.45);
        --border-subtle: rgba(255, 255, 255, 0.08);
        --border-hover: rgba(255, 255, 255, 0.18);
        
        /* 🎯 Design System - 간격 2배 확대 */
        --space-xs: 16px;
        --space-sm: 24px;
        --space-md: 32px;
        --space-lg: 48px;
        --space-xl: 64px;
        --space-2xl: 96px;
        --space-3xl: 128px;
        
        /* 🎯 Full-Width Container 너비 */
        --container-sm: 600px;
        --container-md: 800px;
        --container-lg: 1100px;
        --container-xl: 1400px;
        --container-full: 100%;
        
        /* 🎯 Border radius */
        --radius-sm: 12px;
        --radius-md: 16px;
        --radius-lg: 20px;
        --radius-xl: 28px;
        --radius-2xl: 36px;
      }
      
      /* 띠 배너 */
      .top-banner {
        position: fixed; top: 0; left: 0; right: 0; z-index: 9999;
        background: linear-gradient(90deg, #a855f7, #ec4899, #f97316);
        color: white; padding: 12px 20px;
        display: flex; align-items: center; justify-content: center; gap: 12px;
        font-size: 0.95rem; font-weight: 600; cursor: pointer;
        box-shadow: 0 4px 20px rgba(168, 85, 247, 0.4);
      }
      .top-banner:hover { background: linear-gradient(90deg, #9333ea, #db2777, #ea580c); }
      .top-banner .banner-text { flex: 1; text-align: center; }
      .top-banner .banner-close {
        background: rgba(0,0,0,0.2); border: none; color: white;
        width: 28px; height: 28px; border-radius: 50%; cursor: pointer;
        display: flex; align-items: center; justify-content: center;
      }
      .top-banner .banner-close:hover { background: rgba(0,0,0,0.4); }
      .top-banner.hidden { display: none; }
      .main-container.with-banner { padding-top: 48px; }
      
      /* iframe 모달 (외부 페이지 내부 표시) */
      .iframe-modal { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.95); z-index: 10000; display: none; flex-direction: column; }
      .iframe-modal.open { display: flex; }
      .iframe-modal-header { display: flex; align-items: center; justify-content: space-between; padding: 12px 20px; background: linear-gradient(90deg, #a855f7, #ec4899); }
      .iframe-modal-title { color: white; font-weight: 700; font-size: 1rem; }
      .iframe-modal-close { background: rgba(0,0,0,0.3); border: none; color: white; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; font-size: 1.1rem; }
      .iframe-modal-close:hover { background: rgba(0,0,0,0.5); }
      .iframe-modal iframe { flex: 1; border: none; width: 100%; background: white; }
      
      /* 수강 신청 모달 */
      .edu-modal { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.9); z-index: 10001; display: none; align-items: center; justify-content: center; }
      .edu-modal.open { display: flex; }
      .edu-modal-content { width: 95%; max-width: 480px; max-height: 90vh; overflow-y: auto; background: var(--bg-secondary); border-radius: 20px; border: 1px solid rgba(168, 85, 247, 0.3); }
      .edu-modal-header { padding: 20px; background: linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(34, 197, 94, 0.1)); border-bottom: 1px solid var(--border-subtle); text-align: center; position: relative; }
      .edu-modal-close { position: absolute; top: 12px; right: 12px; background: rgba(255,255,255,0.1); border: none; color: var(--text-secondary); width: 32px; height: 32px; border-radius: 50%; cursor: pointer; }
      .edu-modal-body { padding: 20px; }
      .edu-product { background: linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.08)); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 16px; padding: 20px; margin-bottom: 20px; text-align: center; }
      .edu-badge { display: inline-block; background: linear-gradient(135deg, #ef4444, #f97316); color: white; padding: 6px 14px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; margin-bottom: 12px; }
      .edu-price { font-size: 1.8rem; font-weight: 900; color: var(--neon-purple); }
      .edu-note { font-size: 0.8rem; color: var(--neon-orange); margin-top: 4px; }
      .payment-btns { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 16px 0; }
      .payment-btn { padding: 16px; border-radius: 12px; border: 2px solid var(--border-subtle); background: transparent; cursor: pointer; text-align: center; color: var(--text-primary); }
      .payment-btn:hover, .payment-btn.active { border-color: var(--neon-purple); background: rgba(168, 85, 247, 0.1); }
      .bank-info { display: none; background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.3); border-radius: 12px; padding: 16px; margin: 16px 0; }
      .bank-info.show { display: block; }
      .bank-row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.9rem; }
      .bank-form input { width: 100%; padding: 12px; border-radius: 10px; border: 1px solid var(--border-subtle); background: rgba(255,255,255,0.05); color: var(--text-primary); margin-bottom: 10px; font-size: 0.95rem; }
      .edu-submit { width: 100%; padding: 16px; border-radius: 12px; border: none; font-size: 1rem; font-weight: 700; cursor: pointer; color: white; }
      .edu-submit.card-btn { background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink)); }
      .edu-submit.bank-btn { background: linear-gradient(135deg, var(--neon-green), #16a34a); }
      
      /* 챗봇 Pulse 애니메이션 */
      @keyframes chatPulse {
        0%, 100% { box-shadow: 0 4px 20px rgba(168, 85, 247, 0.4); }
        50% { box-shadow: 0 4px 40px rgba(168, 85, 247, 0.8), 0 0 60px rgba(236, 72, 153, 0.6); }
      }
      .chat-bubble.pulse { animation: chatPulse 1.5s ease-in-out infinite; }
      
      /* ========================================
         🎯 서비스 메뉴 그리드 - 균일한 버튼 레이아웃
         ======================================== */
      .service-menu-grid { 
        display: grid !important; 
        grid-template-columns: repeat(2, 1fr) !important; 
        gap: 16px !important; 
        max-width: 900px; 
        margin: 0 auto; 
        width: 100%;
      }
      .service-menu-btn {
        display: flex; 
        flex-direction: column;
        align-items: flex-start;
        gap: var(--space-sm);
        background: var(--bg-card); 
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-lg); 
        padding: var(--space-lg);
        cursor: pointer; 
        transition: all 0.3s ease;
        text-align: left; 
        position: relative; 
        width: 100%;
        min-height: 120px;
      }
      .service-menu-btn:hover { 
        transform: translateY(-4px); 
        border-color: var(--btn-color); 
        background: rgba(168, 85, 247, 0.08);
        box-shadow: 0 8px 30px rgba(0,0,0,0.3);
      }
      .service-menu-btn .menu-icon { 
        font-size: 1.5rem; 
        color: var(--btn-color); 
        width: 44px; height: 44px;
        display: flex; align-items: center; justify-content: center;
        background: rgba(255,255,255,0.05);
        border-radius: var(--radius-md);
      }
      .service-menu-btn .menu-text { 
        flex: 1; 
        display: flex; 
        flex-direction: column; 
        gap: 4px;
        width: 100%;
      }
      .service-menu-btn .menu-name { 
        font-size: 1rem; 
        font-weight: 700; 
        color: var(--text-primary); 
        line-height: 1.4; 
      }
      .service-menu-btn .menu-desc { 
        font-size: 0.8rem; 
        color: var(--text-tertiary); 
        font-weight: 400; 
        line-height: 1.5; 
      }
      .service-menu-btn .menu-arrow { 
        position: absolute;
        top: var(--space-lg);
        right: var(--space-lg);
        color: var(--text-tertiary); 
        font-size: 0.9rem; 
      }
      .service-menu-btn .menu-badge { 
        position: absolute; 
        top: var(--space-sm); 
        right: var(--space-sm); 
        padding: 4px 10px; 
        border-radius: var(--radius-xl); 
        font-size: 0.65rem; 
        font-weight: 700; 
        background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink)); 
        color: white; 
      }
      .service-menu-btn .menu-badge.hot { 
        background: linear-gradient(135deg, var(--neon-orange), #ef4444); 
      }
      
      /* 태블릿 서비스 메뉴 (768px 이하에서만 1열) */
      @media (max-width: 768px) {
        .service-menu-grid { 
          grid-template-columns: 1fr !important; 
          gap: 12px !important;
          max-width: 100%;
        }
        .service-menu-btn {
          flex-direction: row;
          align-items: center;
          min-height: auto;
          padding: 16px 20px;
        }
        .service-menu-btn .menu-icon {
          width: 40px; height: 40px;
          font-size: 1.3rem;
        }
        .service-menu-btn .menu-arrow {
          position: static;
          margin-left: auto;
        }
      }
      
      /* 모바일 서비스 메뉴 */
      @media (max-width: 480px) {
        .service-menu-grid { gap: 8px !important; }
        .service-menu-btn { 
          padding: 14px 16px; 
          gap: 12px; 
        }
        .service-menu-btn .menu-icon { 
          font-size: 1.2rem; 
          width: 36px; height: 36px;
        }
        .service-menu-btn .menu-name { font-size: 0.9rem; }
        .service-menu-btn .menu-desc { font-size: 0.75rem; }
        .service-menu-btn .menu-badge { 
          font-size: 0.6rem; 
          padding: 3px 8px; 
        }
      }
      
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
      
      /* ========================================
         🎯 Container & Section 시스템 (Full-Width)
         ======================================== */
      .container { 
        max-width: var(--container-xl); 
        margin: 0 auto; 
        padding: 0 var(--space-lg); 
      }
      .container-sm { max-width: var(--container-sm); }
      .container-md { max-width: var(--container-md); }
      .container-lg { max-width: var(--container-lg); }
      .container-full { max-width: 100%; padding: 0; }
      
      /* 🎯 Hero Section - Full Width with Video Background */
      .hero {
        min-height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: var(--space-3xl) var(--space-lg);
        position: relative;
        overflow: hidden;
      }
      
      /* AI Video Background */
      .hero-video-bg {
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        z-index: 0;
        overflow: hidden;
      }
      .hero-video-bg video {
        width: 100%; height: 100%;
        object-fit: cover;
        opacity: 0.3;
      }
      .hero-video-overlay {
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background: linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.8) 100%);
      }
      
      .hero-content {
        position: relative;
        z-index: 10;
        max-width: 900px;
        padding: 0 var(--space-md);
      }
      
      .hero-badge {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        padding: 12px 24px;
        background: rgba(132, 204, 22, 0.15);
        border: 2px solid var(--neon-lime);
        border-radius: 50px;
        font-size: 0.95rem;
        font-weight: 600;
        color: var(--neon-lime);
        margin-bottom: var(--space-lg);
        animation: badgePulse 2s ease-in-out infinite;
      }
      @keyframes badgePulse { 0%, 100% { box-shadow: 0 0 20px rgba(132, 204, 22, 0.3); } 50% { box-shadow: 0 0 40px rgba(132, 204, 22, 0.6); } }
      
      .status-dot { width: 10px; height: 10px; background: var(--neon-lime); border-radius: 50%; animation: pulse 2s infinite; }
      @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.2); } }
      
      /* 🎯 메인 카피 */
      .hero-title { 
        font-size: clamp(1.3rem, 4vw, 2rem); 
        font-weight: 700; 
        letter-spacing: -0.02em; 
        margin-bottom: var(--space-xs);
        line-height: 1.3;
        color: var(--text-primary);
      }
      .hero-title .highlight {
        background: linear-gradient(135deg, var(--neon-lime), var(--neon-green));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      /* 🎯 서브 카피 */
      .hero-tagline { 
        font-size: clamp(0.85rem, 2.5vw, 1rem); 
        color: var(--text-secondary); 
        max-width: 400px; 
        margin: 0 auto var(--space-md);
        line-height: 1.5; 
        font-weight: 400;
      }
      .hero-tagline strong { color: var(--neon-orange); font-weight: 700; }
      
      .hero-company { font-size: 1rem; color: var(--text-tertiary); margin-bottom: var(--space-xl); }
      .hero-company strong { color: var(--text-secondary); }
      
      /* 🎯 CTA 버튼 - 라임색 */
      .hero-buttons { display: flex; gap: var(--space-md); flex-wrap: wrap; justify-content: center; }
      
      .btn-lime {
        background: linear-gradient(135deg, var(--neon-lime), #65a30d);
        color: #000;
        font-weight: 700;
        font-size: 0.95rem;
        padding: 14px 28px;
        border-radius: var(--radius-md);
        box-shadow: 0 6px 24px rgba(132, 204, 22, 0.4);
        transition: all 0.3s ease;
      }
      .btn-lime:hover {
        transform: translateY(-4px) scale(1.02);
        box-shadow: 0 12px 40px rgba(132, 204, 22, 0.6);
      }
      
      /* 🎯 Hero 신뢰 지표 */
      .hero-trust {
        display: flex;
        gap: var(--space-lg);
        justify-content: center;
        margin-top: var(--space-xl);
        flex-wrap: wrap;
      }
      .trust-item {
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--text-secondary);
        font-size: 0.95rem;
      }
      .trust-item i { color: var(--neon-lime); }
      
      /* 🎯 Hero 이미지 배경 */
      .hero-image-bg {
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        z-index: 0;
      }
      .hero-image-bg img {
        width: 100%; height: 100%;
        object-fit: cover;
        object-position: center 20%;
      }
      .hero-image-overlay {
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background: linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.75) 100%);
      }
      
      /* 🎯 Section Eyebrow */
      .section-eyebrow {
        font-size: 0.9rem;
        font-weight: 700;
        color: var(--neon-lime);
        text-transform: uppercase;
        letter-spacing: 2px;
        margin-bottom: 12px;
      }
      
      /* ========================================
         🎯 버튼 시스템 - 표준화된 사이즈
         ======================================== */
      .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-xs);
        padding: 14px 24px;
        font-weight: 600;
        font-size: 0.9rem;
        border-radius: var(--radius-md);
        cursor: pointer;
        transition: all 0.3s ease;
        border: none;
        text-decoration: none;
        white-space: nowrap;
      }
      .btn-primary {
        background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink));
        color: white;
        box-shadow: 0 4px 20px rgba(168, 85, 247, 0.3);
      }
      .btn-primary:hover { 
        transform: translateY(-2px); 
        box-shadow: 0 8px 30px rgba(168, 85, 247, 0.4); 
      }
      .btn-secondary {
        background: transparent;
        color: var(--text-secondary);
        border: 1px solid var(--border-subtle);
      }
      .btn-secondary:hover { 
        background: rgba(255,255,255,0.05); 
        border-color: var(--border-hover); 
        color: white; 
      }
      .btn-small { 
        padding: 10px 18px; 
        font-size: 0.85rem; 
      }
      .btn-full { 
        width: 100%; 
      }
      
      /* ========================================
         🎯 Section 시스템 - Full-Width + 2배 여백
         ======================================== */
      .section { 
        padding: var(--space-3xl) var(--space-lg);
        width: 100%;
      }
      .section-full {
        padding: var(--space-3xl) 0;
        width: 100%;
      }
      .section-header { 
        text-align: center; 
        margin-bottom: var(--space-2xl);
        padding: 0 var(--space-lg);
      }
      .section-title { 
        font-size: clamp(1.8rem, 5vw, 2.8rem); 
        font-weight: 800; 
        margin-bottom: var(--space-md);
        line-height: 1.3;
      }
      .section-desc { 
        font-size: 1.1rem; 
        color: var(--text-secondary); 
        max-width: 700px; 
        margin: 0 auto; 
        line-height: 1.8;
      }
      
      /* 🎯 Problem Section - 2컬럼 레이아웃 (이미지 + 리스트) */
      .problem-section {
        background: linear-gradient(180deg, rgba(239,68,68,0.03) 0%, transparent 100%);
        padding: var(--space-3xl) var(--space-lg);
      }
      .problem-layout {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-2xl);
        max-width: 1200px;
        margin: 0 auto;
        align-items: center;
      }
      .problem-image {
        border-radius: var(--radius-2xl);
        overflow: hidden;
        box-shadow: 0 25px 60px rgba(0,0,0,0.4);
      }
      .problem-image img {
        width: 100%;
        height: auto;
        display: block;
      }
      .problem-content {
        padding: var(--space-lg) 0;
      }
      .problem-list {
        display: flex;
        flex-direction: column;
        gap: var(--space-md);
        margin-top: var(--space-xl);
      }
      .problem-item {
        display: flex;
        align-items: flex-start;
        gap: var(--space-md);
        padding: var(--space-md);
        background: rgba(239, 68, 68, 0.06);
        border-left: 4px solid #ef4444;
        border-radius: 0 var(--radius-md) var(--radius-md) 0;
      }
      .problem-check {
        width: 32px; height: 32px;
        background: rgba(239, 68, 68, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ef4444;
        flex-shrink: 0;
      }
      .problem-text strong {
        display: block;
        font-size: 1.05rem;
        color: var(--text-primary);
        margin-bottom: 4px;
      }
      .problem-text span {
        font-size: 0.9rem;
        color: var(--text-tertiary);
      }
      
      /* 🎯 Solution Section - 2컬럼 레이아웃 (수치 + 이미지) */
      .solution-section {
        background: linear-gradient(180deg, rgba(132,204,22,0.03) 0%, transparent 100%);
        padding: var(--space-3xl) var(--space-lg);
      }
      .solution-layout {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-2xl);
        max-width: 1200px;
        margin: 0 auto;
        align-items: center;
      }
      .solution-content {
        padding: var(--space-lg) 0;
      }
      .solution-stats {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--space-md);
        margin-top: var(--space-xl);
      }
      .stat-item {
        text-align: center;
        padding: var(--space-lg);
        background: rgba(132, 204, 22, 0.08);
        border: 1px solid rgba(132, 204, 22, 0.2);
        border-radius: var(--radius-lg);
      }
      .stat-value {
        font-size: 2rem;
        font-weight: 900;
        color: var(--neon-lime);
        line-height: 1;
      }
      .stat-label {
        font-size: 0.9rem;
        font-weight: 700;
        color: var(--text-primary);
        margin: 8px 0 4px;
      }
      .stat-desc {
        font-size: 0.8rem;
        color: var(--text-tertiary);
      }
      .solution-image {
        border-radius: var(--radius-2xl);
        overflow: hidden;
        box-shadow: 0 25px 60px rgba(132, 204, 22, 0.15);
      }
      .solution-image img {
        width: 100%;
        height: auto;
        display: block;
      }
      
      /* 🎯 Proof Section - 성과 증명 */
      .proof-section {
        padding: var(--space-3xl) var(--space-lg);
        text-align: center;
      }
      .proof-image {
        max-width: 900px;
        margin: 0 auto var(--space-2xl);
        border-radius: var(--radius-2xl);
        overflow: hidden;
        box-shadow: 0 25px 60px rgba(0,0,0,0.3);
      }
      .proof-image img {
        width: 100%;
        height: auto;
        display: block;
      }
      .proof-stats {
        display: flex;
        justify-content: center;
        gap: var(--space-2xl);
        flex-wrap: wrap;
      }
      .proof-stat {
        text-align: center;
        min-width: 120px;
      }
      .proof-number {
        font-size: 3rem;
        font-weight: 900;
        background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .proof-label {
        font-size: 1rem;
        color: var(--text-secondary);
        margin-top: 8px;
      }
      
      /* 반응형 */
      @media (max-width: 968px) {
        .problem-layout { grid-template-columns: 1fr; }
        .problem-image { order: -1; }
        .solution-layout { grid-template-columns: 1fr; }
        .solution-image { order: -1; }
        .solution-stats { grid-template-columns: repeat(3, 1fr); }
      }
      @media (max-width: 600px) {
        .solution-stats { grid-template-columns: 1fr; }
        .stat-item { padding: var(--space-md); }
        .stat-value { font-size: 1.8rem; }
        .proof-stats { gap: var(--space-lg); }
        .proof-number { font-size: 2.2rem; }
      }
      
      /* ========================================
         🎯 Grid 시스템 - 균일한 카드 레이아웃
         ======================================== */
      .grid { 
        display: grid; 
        gap: var(--space-md); 
      }
      .grid-2 { 
        grid-template-columns: repeat(2, 1fr); 
      }
      .grid-3 { 
        grid-template-columns: repeat(3, 1fr); 
      }
      .grid-4 { 
        grid-template-columns: repeat(4, 1fr); 
      }
      
      /* ========================================
         🎯 카드 컴포넌트 - 균일한 높이/스타일
         ======================================== */
      .card {
        background: var(--bg-card);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-xl);
        padding: var(--space-lg);
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }
      .card:hover { 
        transform: translateY(-4px); 
        border-color: var(--border-hover);
        box-shadow: 0 12px 40px rgba(0,0,0,0.3);
      }
      .card.recommended { 
        border-color: rgba(168, 85, 247, 0.5); 
        box-shadow: 0 0 40px rgba(168, 85, 247, 0.15); 
      }
      .card-badge {
        position: absolute;
        top: var(--space-md);
        right: var(--space-md);
        padding: 5px 12px;
        background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink));
        border-radius: var(--radius-xl);
        font-size: 0.7rem;
        font-weight: 700;
      }
      .card-tier { 
        font-size: 0.7rem; 
        font-weight: 700; 
        letter-spacing: 1.5px; 
        color: var(--text-tertiary); 
        margin-bottom: var(--space-xs); 
        text-transform: uppercase; 
      }
      .card-name { 
        font-size: 1.2rem; 
        font-weight: 700; 
        margin-bottom: 4px; 
        line-height: 1.3;
      }
      .card-subtitle { 
        font-size: 0.85rem; 
        color: var(--neon-purple); 
        margin-bottom: var(--space-xs); 
      }
      .card-desc { 
        font-size: 0.85rem; 
        color: var(--text-tertiary); 
        margin-bottom: var(--space-md); 
        line-height: 1.5;
      }
      .card-price { 
        margin-bottom: var(--space-md); 
      }
      .price-value { 
        font-size: 1.75rem; 
        font-weight: 800; 
      }
      .price-unit { 
        font-size: 0.85rem; 
        color: var(--text-secondary); 
      }
      .price-original { 
        font-size: 0.8rem; 
        color: var(--text-tertiary); 
        text-decoration: line-through; 
      }
      .card-list { 
        list-style: none; 
        margin-bottom: var(--space-md);
        flex: 1;
      }
      .card-list li { 
        display: flex; 
        align-items: flex-start; 
        gap: var(--space-sm); 
        padding: 6px 0; 
        font-size: 0.85rem; 
        color: var(--text-secondary); 
      }
      .card-list li i { 
        color: var(--neon-purple); 
        margin-top: 3px; 
        font-size: 0.75rem; 
      }
      
      /* ========================================
         🎯 포트폴리오 그리드 - 균일한 레이아웃
         ======================================== */
      .portfolio-categories { 
        display: flex; 
        gap: var(--space-sm); 
        flex-wrap: wrap; 
        justify-content: center; 
        margin-bottom: var(--space-lg); 
      }
      .portfolio-cat-btn { 
        padding: 10px 18px; 
        background: var(--bg-card); 
        border: 1px solid var(--border-subtle); 
        border-radius: 30px; 
        color: var(--text-secondary); 
        font-size: 0.85rem; 
        cursor: pointer; 
        transition: all 0.3s ease; 
        display: flex; 
        align-items: center; 
        gap: var(--space-xs); 
      }
      .portfolio-cat-btn:hover, .portfolio-cat-btn.active { 
        background: rgba(168, 85, 247, 0.15); 
        border-color: var(--neon-purple); 
        color: var(--neon-purple); 
      }
      .portfolio-cat-btn i { font-size: 0.9rem; }
      
      .portfolio-grid { 
        display: grid; 
        grid-template-columns: repeat(4, 1fr); 
        gap: var(--space-md); 
      }
      .portfolio-item {
        background: var(--bg-card);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-md);
        padding: var(--space-md);
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        flex-direction: column;
        min-height: 80px;
      }
      .portfolio-item:hover { 
        transform: translateY(-3px); 
        border-color: var(--border-hover); 
        background: rgba(168, 85, 247, 0.08);
        box-shadow: 0 8px 25px rgba(0,0,0,0.2);
      }
      .portfolio-tag { 
        font-size: 0.65rem; 
        font-weight: 600; 
        padding: 3px 8px; 
        background: rgba(168, 85, 247, 0.15); 
        border-radius: 10px; 
        color: var(--neon-purple); 
        display: inline-block; 
        margin-bottom: var(--space-xs);
        align-self: flex-start;
      }
      .portfolio-title { 
        font-size: 0.85rem; 
        font-weight: 600; 
        color: var(--text-primary);
        line-height: 1.4;
      }
      
      @media (max-width: 1024px) {
        .portfolio-grid { grid-template-columns: repeat(3, 1fr); }
      }
      @media (max-width: 768px) {
        .portfolio-grid { grid-template-columns: repeat(2, 1fr); }
      }
      
      .portfolio-modal { position: fixed; inset: 0; background: rgba(0,0,0,0.95); z-index: 3000; display: none; flex-direction: column; }
      .portfolio-modal.open { display: flex; }
      .portfolio-modal-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; background: var(--bg-secondary); border-bottom: 1px solid var(--border-subtle); }
      .portfolio-modal-title { font-weight: 600; display: flex; align-items: center; gap: 10px; }
      .portfolio-modal-close { background: none; border: none; color: var(--text-secondary); font-size: 1.5rem; cursor: pointer; padding: 8px 16px; }
      .portfolio-modal-close:hover { color: white; }
      .portfolio-modal-body { flex: 1; position: relative; min-height: 85vh; }
      .portfolio-iframe { width: 100%; height: 100%; border: none; min-height: 85vh; }
      .portfolio-block-layer { position: absolute; inset: 0; z-index: 5; background: transparent; cursor: default; }
      .portfolio-modal-body.video-mode .portfolio-block-layer { display: none; }
      .portfolio-overlay { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.75); opacity: 0; pointer-events: none; z-index: 10; transition: opacity 0.25s ease; }
      .portfolio-overlay.show { opacity: 1; pointer-events: auto; }
      .portfolio-modal-body.video-mode .portfolio-overlay { display: none; }
      .portfolio-membership { background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink)); padding: 16px 32px; border-radius: 16px; text-align: center; box-shadow: 0 10px 40px rgba(168, 85, 247, 0.4); }
      .portfolio-membership i { font-size: 1.8rem; margin-bottom: 10px; display: block; }
      .portfolio-membership-text { font-weight: 700; font-size: 0.95rem; }
      
      /* ========================================
         🎯 채널 그리드 - 균일한 카드 레이아웃
         ======================================== */
      .channel-grid { 
        display: grid; 
        gap: var(--space-lg); 
        grid-template-columns: repeat(2, 1fr); 
      }
      .channel-category {
        background: linear-gradient(145deg, var(--bg-card), rgba(30, 30, 40, 0.9));
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-xl);
        overflow: hidden;
        transition: all 0.3s ease;
      }
      .channel-category:hover { 
        transform: translateY(-4px); 
        border-color: rgba(168, 85, 247, 0.3); 
        box-shadow: 0 12px 40px rgba(0,0,0,0.3); 
      }
      .channel-header {
        display: flex;
        align-items: center;
        gap: var(--space-md);
        padding: var(--space-lg);
        background: rgba(255,255,255,0.03);
        border-bottom: 1px solid var(--border-subtle);
      }
      .channel-icon { 
        font-size: 1.6rem; 
        filter: drop-shadow(0 0 8px currentColor);
        width: 44px;
        text-align: center;
      }
      .channel-name { 
        font-size: 1.1rem; 
        font-weight: 700; 
        letter-spacing: -0.02em; 
      }
      .channel-services { 
        padding: var(--space-md); 
        display: grid; 
        grid-template-columns: 1fr; 
        gap: var(--space-sm); 
      }
      .service-item {
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.06);
        border-radius: var(--radius-md);
        padding: var(--space-md);
        transition: all 0.3s ease;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: var(--space-sm);
      }
      .service-item:hover { 
        background: rgba(168, 85, 247, 0.1); 
        border-color: rgba(168, 85, 247, 0.4); 
      }
      .service-info { flex: 1; min-width: 140px; }
      .service-name { 
        font-weight: 600; 
        margin-bottom: 4px; 
        font-size: 0.9rem; 
      }
      .service-desc { 
        font-size: 0.8rem; 
        color: var(--text-tertiary);
        line-height: 1.4;
      }
      .service-prices { 
        display: flex; 
        gap: var(--space-sm); 
        font-size: 0.85rem; 
      }
      .service-price { 
        display: flex; 
        flex-direction: column; 
        align-items: center; 
        padding: 6px 12px; 
        background: rgba(34, 211, 238, 0.08); 
        border-radius: var(--radius-sm); 
      }
      .service-price-label { 
        color: var(--text-tertiary); 
        font-size: 0.7rem; 
        margin-bottom: 2px; 
      }
      .service-price-value { 
        font-weight: 700; 
        color: var(--neon-cyan); 
        font-size: 0.9rem; 
      }
      .service-price.monthly { background: rgba(168, 85, 247, 0.1); }
      .service-price.monthly .service-price-value { color: var(--neon-purple); }
      .service-price.monthly-b { background: rgba(249, 115, 22, 0.1); }
      .service-price.monthly-b .service-price-value { color: var(--neon-orange); }
      .service-add-btn { 
        padding: 8px 16px; 
        background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink)); 
        border: none; 
        border-radius: var(--radius-sm); 
        color: white; 
        font-size: 0.75rem; 
        font-weight: 600; 
        cursor: pointer; 
        transition: all 0.3s ease; 
        white-space: nowrap; 
      }
      .service-add-btn:hover { 
        transform: scale(1.05); 
        box-shadow: 0 4px 15px rgba(168, 85, 247, 0.4); 
      }
      .service-buttons { 
        display: flex; 
        flex-wrap: wrap; 
        gap: 6px; 
        margin-top: var(--space-xs); 
      }
      .pricing-btn { 
        padding: 6px 12px; 
        font-size: 0.7rem; 
        background: linear-gradient(135deg, var(--neon-cyan), var(--neon-purple)); 
      }
      .pricing-btn:hover { 
        background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink)); 
      }
      
      @media (max-width: 1024px) {
        .channel-grid { grid-template-columns: repeat(2, 1fr); }
      }
      @media (max-width: 768px) {
        .channel-grid { grid-template-columns: 1fr; }
      }
      .service-item.service-set { background: rgba(34, 211, 238, 0.08); border-color: rgba(34, 211, 238, 0.3); }
      .set-badge { background: var(--neon-cyan); color: var(--bg-primary); padding: 2px 6px; border-radius: 4px; font-size: 0.65rem; font-weight: 700; margin-left: 6px; }
      .service-notice { font-size: 0.7rem; color: var(--neon-orange); padding: 4px 8px; background: rgba(249, 115, 22, 0.1); border-radius: 6px; text-align: center; }
      .service-notice-small { font-size: 0.7rem; color: var(--neon-orange); margin-top: 6px; }
      .service-small-notice { font-size: 0.65rem; color: var(--text-tertiary); margin-top: 4px; font-style: italic; }
      .discount-badge { position: absolute; top: 40px; right: 16px; padding: 3px 10px; background: var(--neon-orange); border-radius: 12px; font-size: 0.7rem; font-weight: 700; color: white; }
      
      .cart-floating { position: fixed; bottom: 160px; right: 24px; z-index: 3001; }
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
      
      .chat-widget { position: fixed; bottom: 90px; right: 24px; z-index: 3002; }
      /* 챗봇이 장바구니보다 위에 표시되도록 z-index 조정 */
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
      
      /* ========================================
         🎯 Problem/Solution/Proof 섹션 스타일
         ======================================== */
      .problem-section {
        padding: var(--space-3xl) var(--space-lg);
        position: relative;
        overflow: hidden;
      }
      .problem-section::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background: url('/images/problem.jpg') center/cover no-repeat;
        opacity: 0.15;
        z-index: 0;
      }
      .problem-section > .container { position: relative; z-index: 1; }
      .problem-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: var(--space-md);
        margin-top: var(--space-xl);
      }
      .problem-card {
        background: var(--bg-card);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-lg);
        padding: var(--space-lg);
        text-align: center;
        transition: all 0.3s ease;
      }
      .problem-card:hover {
        transform: translateY(-4px);
        border-color: #ef4444;
        box-shadow: 0 8px 30px rgba(239, 68, 68, 0.2);
      }
      .problem-icon {
        width: 56px; height: 56px;
        background: rgba(239, 68, 68, 0.15);
        border-radius: var(--radius-md);
        display: flex; align-items: center; justify-content: center;
        margin: 0 auto var(--space-sm);
        font-size: 1.5rem; color: #ef4444;
      }
      .problem-title {
        font-size: 1rem; font-weight: 700;
        margin-bottom: 4px; color: var(--text-primary);
      }
      .problem-desc {
        font-size: 0.85rem; color: var(--text-secondary);
      }
      @media (max-width: 1024px) {
        .problem-grid { grid-template-columns: repeat(2, 1fr); }
      }
      @media (max-width: 768px) {
        .problem-grid { grid-template-columns: 1fr; }
        .problem-section { padding: var(--space-2xl) var(--space-md); }
      }

      .solution-section {
        padding: var(--space-3xl) var(--space-lg);
        background: linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
        position: relative;
        overflow: hidden;
      }
      .solution-section::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background: url('/images/solution.jpg') center/cover no-repeat;
        opacity: 0.1;
        z-index: 0;
      }
      .solution-section > .container { position: relative; z-index: 1; }
      .solution-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--space-lg);
        margin-top: var(--space-xl);
      }
      .solution-card {
        background: linear-gradient(145deg, var(--bg-card), var(--bg-tertiary));
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-xl);
        padding: var(--space-xl);
        text-align: center;
        transition: all 0.3s ease;
      }
      .solution-card:hover {
        transform: translateY(-6px);
        border-color: var(--neon-lime);
        box-shadow: 0 12px 40px rgba(132, 204, 22, 0.2);
      }
      .solution-icon {
        width: 64px; height: 64px;
        background: linear-gradient(135deg, rgba(132, 204, 22, 0.2), rgba(34, 197, 94, 0.2));
        border-radius: var(--radius-lg);
        display: flex; align-items: center; justify-content: center;
        margin: 0 auto var(--space-md);
        font-size: 1.8rem; color: var(--neon-lime);
      }
      .solution-value {
        font-size: 2.5rem; font-weight: 900;
        background: linear-gradient(135deg, var(--neon-lime), var(--neon-green));
        -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        margin-bottom: 8px;
      }
      .solution-title {
        font-size: 1.1rem; font-weight: 700; color: var(--text-primary);
        margin-bottom: 8px;
      }
      .solution-desc {
        font-size: 0.9rem; color: var(--text-secondary);
      }
      .solution-desc strong { color: var(--neon-lime); }
      @media (max-width: 768px) {
        .solution-grid { grid-template-columns: 1fr; }
        .solution-section { padding: var(--space-2xl) var(--space-md); }
        .solution-value { font-size: 2rem; }
      }

      .proof-section {
        padding: var(--space-3xl) var(--space-lg);
        position: relative;
        overflow: hidden;
      }
      .proof-section::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background: url('/images/proof.jpg') center/cover no-repeat;
        opacity: 0.12;
        z-index: 0;
      }
      .proof-section > .container { position: relative; z-index: 1; }
      .proof-stats {
        display: flex;
        justify-content: center;
        gap: var(--space-2xl);
        margin-top: var(--space-xl);
        flex-wrap: wrap;
      }
      .proof-stat {
        text-align: center;
        padding: var(--space-lg);
      }
      .proof-number {
        font-size: 3.5rem; font-weight: 900;
        background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink));
        -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      }
      .proof-label {
        font-size: 1rem; color: var(--text-secondary); margin-top: 8px;
      }

      /* ========================================
         🎯 아코디언 스타일 - 포인트 강조 (확대)
         ======================================== */
      .accordion {
        background: linear-gradient(145deg, var(--bg-card), var(--bg-tertiary));
        border: 3px solid rgba(168, 85, 247, 0.4);
        border-radius: var(--radius-2xl);
        margin-bottom: var(--space-lg);
        overflow: hidden;
        box-shadow: 0 8px 40px rgba(168, 85, 247, 0.15), 0 4px 20px rgba(0,0,0,0.3);
        position: relative;
      }
      .accordion::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 4px;
        background: linear-gradient(90deg, var(--neon-purple), var(--neon-pink), var(--neon-cyan));
      }
      .accordion:hover {
        border-color: rgba(168, 85, 247, 0.7);
        box-shadow: 0 12px 50px rgba(168, 85, 247, 0.25), 0 6px 30px rgba(0,0,0,0.4);
        transform: translateY(-2px);
      }
      .accordion-header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 28px 32px;
        background: transparent;
        border: none;
        cursor: pointer;
        color: var(--text-primary);
        transition: all 0.3s ease;
      }
      .accordion-header:hover {
        background: rgba(168, 85, 247, 0.1);
      }
      .accordion-title {
        display: flex;
        align-items: center;
        gap: 18px;
        font-size: 1.5rem;
        font-weight: 800;
        letter-spacing: -0.02em;
      }
      .accordion-title i {
        width: 56px; height: 56px;
        background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink));
        color: white;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.4rem;
        box-shadow: 0 4px 15px rgba(168, 85, 247, 0.4);
      }
      .accordion-arrow {
        color: var(--text-tertiary);
        font-size: 1.3rem;
        transition: transform 0.3s ease;
        width: 44px; height: 44px;
        background: rgba(255,255,255,0.08);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .accordion.open .accordion-arrow {
        transform: rotate(180deg);
        background: rgba(168, 85, 247, 0.25);
        color: var(--neon-purple);
      }
      .accordion-content {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.4s ease;
      }
      .accordion.open .accordion-content {
        max-height: 1200px;
      }
      .accordion-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
        padding: 0 28px 28px;
      }
      .accordion-item {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 20px 22px;
        background: linear-gradient(145deg, var(--bg-secondary), rgba(168, 85, 247, 0.05));
        border: 2px solid rgba(168, 85, 247, 0.2);
        border-radius: var(--radius-xl);
        cursor: pointer;
        transition: all 0.3s ease;
        text-align: left;
        color: var(--text-primary);
        position: relative;
      }
      .accordion-item:hover {
        border-color: var(--neon-purple);
        background: linear-gradient(145deg, rgba(168, 85, 247, 0.15), rgba(236, 72, 153, 0.08));
        transform: translateY(-4px) scale(1.02);
        box-shadow: 0 10px 30px rgba(168, 85, 247, 0.3);
      }
      .item-icon {
        width: 50px; height: 50px;
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        flex-shrink: 0;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      }
      .item-text {
        font-size: 1.1rem;
        font-weight: 700;
        flex: 1;
        line-height: 1.3;
      }
      .item-badge {
        position: absolute;
        top: -8px;
        right: -8px;
        padding: 4px 10px;
        border-radius: 10px;
        font-size: 0.7rem;
        font-weight: 800;
        color: white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        animation: badgePulse 2s ease-in-out infinite;
      }
      .item-badge.hot {
        background: linear-gradient(135deg, #f97316, #ef4444);
      }
      .item-badge.premium {
        background: linear-gradient(135deg, #eab308, #ca8a04);
      }
      @media (max-width: 768px) {
        .accordion {
          border-width: 2px;
          margin-bottom: var(--space-md);
        }
        .accordion-header {
          padding: 22px 24px;
        }
        .accordion-title {
          font-size: 1.25rem;
          gap: 14px;
        }
        .accordion-title i {
          width: 48px; height: 48px;
          font-size: 1.2rem;
        }
      }
      @media (max-width: 480px) {
        .accordion-grid {
          grid-template-columns: 1fr;
          padding: 0 20px 20px;
          gap: 12px;
        }
        .accordion-header {
          padding: 18px 20px;
        }
        .accordion-title {
          font-size: 1.1rem;
          gap: 12px;
        }
        .accordion-title i {
          width: 42px; height: 42px;
          font-size: 1rem;
          border-radius: 12px;
        }
        .accordion-item {
          padding: 16px 18px;
          gap: 12px;
        }
        .item-icon {
          width: 42px; height: 42px;
          font-size: 1rem;
        }
        .item-text {
          font-size: 0.95rem;
        }
      }
      @media (max-width: 768px) {
        .proof-stats { gap: var(--space-lg); }
        .proof-number { font-size: 2.5rem; }
        .proof-section { padding: var(--space-2xl) var(--space-md); }
      }

      /* ========================================
         🎯 반응형 레이아웃 시스템
         ======================================== */
      
      /* 태블릿 (1024px 이하) */
      @media (max-width: 1024px) {
        :root {
          --space-lg: 20px;
          --space-xl: 28px;
          --space-2xl: 40px;
          --space-3xl: 56px;
        }
        .grid-4 { grid-template-columns: repeat(2, 1fr); }
        .grid-3 { grid-template-columns: repeat(2, 1fr); }
        .channel-grid { grid-template-columns: repeat(2, 1fr); }
      }
      
      /* 모바일 (768px 이하) - 카드형 레이아웃 */
      @media (max-width: 768px) {
        :root {
          --space-xs: 12px;
          --space-sm: 16px;
          --space-md: 24px;
          --space-lg: 32px;
          --space-xl: 48px;
          --space-2xl: 64px;
          --space-3xl: 80px;
        }
        
        .hero { 
          padding: var(--space-2xl) var(--space-md); 
          min-height: 90vh; 
        }
        .hero-title { font-size: 1.8rem; line-height: 1.3; }
        .hero-tagline { font-size: 1rem; }
        .btn-lime { padding: 16px 28px; font-size: 1rem; }
        
        .section { padding: var(--space-2xl) var(--space-md); }
        .section-header { margin-bottom: var(--space-lg); }
        .section-title { font-size: 1.5rem; }
        .section-desc { font-size: 1rem; }
        
        .hero-buttons { 
          flex-direction: column; 
          width: 100%; 
          max-width: 320px;
          gap: var(--space-sm);
        }
        .hero-buttons .btn { 
          width: 100%; 
          justify-content: center;
          padding: 16px 24px;
        }
        
        .chat-window { 
          position: fixed; 
          bottom: 0; right: 0; left: 0; 
          width: 100%; 
          max-height: 75vh; 
          border-radius: var(--radius-xl) var(--radius-xl) 0 0; 
        }
        .cart-panel { 
          position: fixed; 
          bottom: 0; right: 0; left: 0; 
          width: 100%; 
          max-height: 65vh; 
          border-radius: var(--radius-xl) var(--radius-xl) 0 0; 
        }
        /* 모바일: 챗봇과 장바구니 버튼 위치 분리 (겹침 방지) */
        .cart-floating { bottom: 150px; right: var(--space-md); }
        .chat-widget { bottom: 80px; right: var(--space-md); }
        
        .portfolio-grid { 
          grid-template-columns: repeat(2, 1fr); 
          gap: var(--space-sm); 
        }
        .grid-4, .grid-3, .grid-2 { 
          grid-template-columns: 1fr; 
          gap: var(--space-md); 
        }
        .channel-grid { 
          grid-template-columns: 1fr; 
          gap: var(--space-md); 
        }
        
        .service-item { 
          flex-direction: column; 
          align-items: stretch; 
          gap: var(--space-sm); 
        }
        .service-prices { justify-content: center; gap: var(--space-sm); }
        .service-add-btn { width: 100%; padding: var(--space-sm); }
        
        .card { padding: var(--space-lg); }
        .portfolio-categories { gap: var(--space-xs); }
        .portfolio-cat-btn { padding: 8px 14px; font-size: 0.8rem; }
      }
      
      /* 소형 모바일 (480px 이하) */
      @media (max-width: 480px) {
        :root {
          --space-md: 12px;
          --space-lg: 14px;
          --space-xl: 20px;
          --space-2xl: 28px;
          --space-3xl: 40px;
        }
        
        .hero { padding: 70px var(--space-md) 30px; }
        .hero-title { font-size: 2rem; }
        .section { padding: var(--space-2xl) var(--space-md); }
        
        .portfolio-grid { 
          grid-template-columns: repeat(2, 1fr); 
          gap: var(--space-xs); 
        }
        .portfolio-item { padding: var(--space-sm); }
        .portfolio-title { font-size: 0.8rem; }
        
        .card { 
          padding: var(--space-md); 
          border-radius: var(--radius-lg); 
        }
        .card-name { font-size: 1.1rem; }
        .price-value { font-size: 1.4rem; }
        .card-list li { font-size: 0.8rem; }
        
        .cart-btn, .chat-bubble { 
          width: 50px; 
          height: 50px; 
          font-size: 1.1rem; 
        }
        
        .btn { padding: 12px 20px; font-size: 0.9rem; }
        .btn-small { padding: 10px 16px; font-size: 0.85rem; }
      }
      
      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(168, 85, 247, 0.3); border-radius: 3px; }
    </style>
</head>
<body>
    <!-- 띠 배너 -->
    <div class="top-banner" id="top-banner" onclick="openIframeModal()">
      <span class="banner-text">🎓 XIΛIX AI 입문반 1기 모집중! <strong>선착순 5명</strong> · 1월 개강 →</span>
      <button class="banner-close" onclick="event.stopPropagation(); closeBanner()"><i class="fas fa-times"></i></button>
    </div>
    
    <div class="bg-animated"><div class="bg-gradient"></div></div>
    
    <div class="main-container" id="main-container">
      <!-- ========================================
           🎯 Section 1: Hero - 한국인 CEO 이미지 배경
           ======================================== -->
      <section class="hero">
        <!-- Hero 이미지 배경 -->
        <div class="hero-image-bg">
          <img src="/images/hero.jpg" alt="성공한 한국인 사업자" loading="eager">
          <div class="hero-image-overlay"></div>
        </div>
        <div class="hero-content">
          <div class="hero-badge animate-fade-in-up">
            <span class="status-dot"></span>
            <span>소상공인 AI 마케팅 파트너</span>
          </div>
          
          <!-- 메인 카피 -->
          <h1 class="hero-title animate-fade-in-up delay-1">
            사장님은 <span class="highlight">장사만</span><br>
            마케팅은 <span class="highlight">AI</span>가
          </h1>
          
          <!-- 서브 카피 -->
          <p class="hero-tagline animate-fade-in-up delay-2">
            XIVIX가 <strong>24시간</strong> 대신 일합니다
          </p>
          
          <!-- CTA 버튼 -->
          <div class="hero-buttons animate-fade-in-up delay-3">
            <button class="btn btn-lime" onclick="openChat()">
              <i class="fas fa-search-dollar"></i> 내 가게 무료 진단받기
            </button>
            <button class="btn btn-secondary" onclick="scrollTo('services')">
              <i class="fas fa-list-ul"></i> 서비스 보기
            </button>
          </div>
          
          <!-- 신뢰 지표 -->
          <div class="hero-trust animate-fade-in-up delay-3">
            <div class="trust-item"><i class="fas fa-check-circle"></i> 무료 상담</div>
            <div class="trust-item"><i class="fas fa-check-circle"></i> 강매 없음</div>
            <div class="trust-item"><i class="fas fa-check-circle"></i> 성과 보장</div>
          </div>
        </div>
      </section>
      
      <!-- ========================================
           🎯 Section 2: Problem - 아이콘 기반 깔끔한 디자인
           ======================================== -->
      <section class="problem-section">
        <div class="container">
          <div class="section-header reveal">
            <p class="section-eyebrow">이런 고민 있으시죠?</p>
            <h2 class="section-title">아직도 <span style="color:#ef4444;">혼자</span> 하시나요?</h2>
          </div>
          <div class="problem-grid reveal">
            <div class="problem-card">
              <div class="problem-icon"><i class="fas fa-pen-fancy"></i></div>
              <div class="problem-title">하루 2시간 블로그 작성</div>
              <div class="problem-desc">본업에 집중할 시간이 없어요</div>
            </div>
            <div class="problem-card">
              <div class="problem-icon"><i class="fas fa-wallet"></i></div>
              <div class="problem-title">마케팅 직원 월급 300만원</div>
              <div class="problem-desc">인건비 부담, 성과는 불확실</div>
            </div>
            <div class="problem-card">
              <div class="problem-icon"><i class="fas fa-chart-line"></i></div>
              <div class="problem-title">광고비만 나가고 문의는 제자리</div>
              <div class="problem-desc">뭘 해야 할지 모르겠어요</div>
            </div>
            <div class="problem-card">
              <div class="problem-icon"><i class="fas fa-question-circle"></i></div>
              <div class="problem-title">인스타? 블로그? 유튜브?</div>
              <div class="problem-desc">뭐부터 시작해야 할지...</div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- ========================================
           🎯 Section 3: Solution - 핵심 수치 + 깔끔한 카드
           ======================================== -->
      <section class="solution-section">
        <div class="container">
          <div class="section-header reveal">
            <p class="section-eyebrow">XIVIX 솔루션</p>
            <h2 class="section-title">AI가 <span class="gradient-text">대신</span> 일합니다</h2>
            <p class="section-desc">마케팅 걱정 없이 매출에만 집중하세요</p>
          </div>
          <div class="solution-grid reveal">
            <div class="solution-card">
              <div class="solution-icon"><i class="fas fa-clock"></i></div>
              <div class="solution-value">-90%</div>
              <div class="solution-title">시간 절감</div>
              <div class="solution-desc">하루 2시간 → <strong>15분</strong></div>
            </div>
            <div class="solution-card">
              <div class="solution-icon"><i class="fas fa-won-sign"></i></div>
              <div class="solution-value">-70%</div>
              <div class="solution-title">비용 절감</div>
              <div class="solution-desc">월 300만원 → <strong>55만원</strong></div>
            </div>
            <div class="solution-card">
              <div class="solution-icon"><i class="fas fa-rocket"></i></div>
              <div class="solution-value">+250%</div>
              <div class="solution-title">문의량 증가</div>
              <div class="solution-desc">3개월 평균 <strong>2.5배</strong></div>
            </div>
          </div>
          <div style="text-align:center;margin-top:var(--space-2xl);" class="reveal">
            <button class="btn btn-lime" onclick="openChat()">
              <i class="fas fa-search-dollar"></i> 내 가게 무료 진단받기
            </button>
          </div>
        </div>
      </section>
      
      <!-- ========================================
           🎯 Section 4: Social Proof - 실적 수치
           ======================================== -->
      <section class="proof-section">
        <div class="container">
          <div class="section-header reveal">
            <p class="section-eyebrow">실제 고객 성과</p>
            <h2 class="section-title">이미 <span class="gradient-text">결과</span>를 보고 있습니다</h2>
          </div>
          <div class="proof-stats reveal">
            <div class="proof-stat">
              <div class="proof-number">127<span style="font-size:0.5em;">+</span></div>
              <div class="proof-label">누적 고객사</div>
            </div>
            <div class="proof-stat">
              <div class="proof-number">4.9</div>
              <div class="proof-label">고객 만족도</div>
            </div>
            <div class="proof-stat">
              <div class="proof-number">89<span style="font-size:0.5em;">%</span></div>
              <div class="proof-label">재계약률</div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- 친구 초대 혜택 배너 -->
      <section id="referral-benefits" class="section" style="padding: var(--space-xl) var(--space-lg);">
        <div class="container" style="max-width: 700px;">
          <div class="reveal" style="background: linear-gradient(135deg, rgba(132,204,22,0.1), rgba(34,197,94,0.1)); border: 2px solid rgba(132,204,22,0.3); border-radius: var(--radius-xl); padding: var(--space-lg); display: flex; align-items: center; gap: var(--space-lg); flex-wrap: wrap; justify-content: center;">
            <div style="font-size: 2.5rem;">🎁</div>
            <div style="flex: 1; min-width: 220px;">
              <div style="font-size: 1.2rem; font-weight: 800; color: var(--neon-lime);">친구 초대 = 15% 할인!</div>
              <div style="font-size: 0.9rem; color: var(--text-secondary);">추천인 5% 적립 · 2차 추천 2% 추가</div>
            </div>
            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
              <button class="btn btn-small" onclick="shareKakao()" style="background: #FEE500; color: #191919; white-space: nowrap; padding: 14px 20px;">
                <i class="fas fa-comment"></i> 카카오 공유
              </button>
              <button class="btn btn-primary btn-small" onclick="openChat()" style="white-space: nowrap; padding: 14px 20px;">
                <i class="fas fa-comments"></i> 코드 받기
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <!-- 아코디언 섹션 - 포트폴리오 & 서비스 (강조) -->
      <section id="menu-section" class="section" style="padding-top: var(--space-2xl); padding-bottom: var(--space-2xl);">
        <div class="container" style="max-width: 800px;">
          <div class="section-header reveal" style="margin-bottom: var(--space-xl);">
            <p class="section-eyebrow">나에게 딱 맞는 서비스 찾기</p>
            <h2 class="section-title" style="font-size: clamp(1.5rem, 4vw, 2.2rem);">클릭해서 <span class="gradient-text">상세 정보</span> 확인</h2>
          </div>
          
          <!-- 포트폴리오 아코디언 -->
          <div class="accordion reveal" id="accordion-portfolio">
            <button class="accordion-header" onclick="toggleAccordion('portfolio')">
              <div class="accordion-title">
                <i class="fas fa-briefcase"></i>
                <span>포트폴리오</span>
              </div>
              <i class="fas fa-chevron-down accordion-arrow" id="arrow-portfolio"></i>
            </button>
            <div class="accordion-content" id="content-portfolio">
              <div class="accordion-grid" id="portfolio-menu"></div>
            </div>
          </div>
          
          <!-- 서비스 메뉴 아코디언 -->
          <div class="accordion reveal" id="accordion-services">
            <button class="accordion-header" onclick="toggleAccordion('services')">
              <div class="accordion-title">
                <i class="fas fa-concierge-bell"></i>
                <span>서비스 메뉴</span>
              </div>
              <i class="fas fa-chevron-down accordion-arrow" id="arrow-services"></i>
            </button>
            <div class="accordion-content" id="content-services">
              <div class="accordion-grid">
                <button class="accordion-item" onclick="openServiceModal('sets')">
                  <span class="item-icon" style="background: rgba(249,115,22,0.15); color: #f97316;"><i class="fas fa-fire"></i></span>
                  <span class="item-text">SNS 셋트 메뉴</span>
                  <span class="item-badge hot">추천</span>
                </button>
                <button class="accordion-item" onclick="openServiceModal('pricing')">
                  <span class="item-icon" style="background: rgba(168,85,247,0.15); color: #a855f7;"><i class="fas fa-tags"></i></span>
                  <span class="item-text">채널별 가격표</span>
                </button>
                <button class="accordion-item" onclick="openServiceModal('websites')">
                  <span class="item-icon" style="background: rgba(34,197,94,0.15); color: #22c55e;"><i class="fas fa-globe"></i></span>
                  <span class="item-text">웹사이트 구축</span>
                </button>
                <button class="accordion-item" onclick="openServiceModal('sysdev')">
                  <span class="item-icon" style="background: rgba(6,182,212,0.15); color: #06b6d4;"><i class="fas fa-cogs"></i></span>
                  <span class="item-text">시스템 개발</span>
                </button>
                <button class="accordion-item" onclick="openServiceModal('addons')">
                  <span class="item-icon" style="background: rgba(139,92,246,0.15); color: #8b5cf6;"><i class="fas fa-plus-circle"></i></span>
                  <span class="item-text">부가 서비스</span>
                </button>
                <button class="accordion-item" onclick="openServiceModal('consulting')">
                  <span class="item-icon" style="background: rgba(234,179,8,0.15); color: #eab308;"><i class="fas fa-handshake"></i></span>
                  <span class="item-text">브랜드 컨설팅</span>
                  <span class="item-badge premium">프리미엄</span>
                </button>
              </div>
            </div>
          </div>
          
        </div>
      </section>
      
      <footer class="footer">
        <div class="footer-logo gradient-text">X I Λ I X</div>
        <div class="footer-company">AI 마케팅 자동화 시스템 | 대표: 방익주</div>
        <div style="font-size: 0.85rem; color: var(--text-tertiary); margin-bottom: 12px;">
          📞 010-4845-3065 | 📧 contact@xivix.kr
        </div>
        <div class="footer-copy">© 2025 X I Λ I X. All rights reserved.</div>
      </footer>
    </div>
    
    <!-- iframe 모달 (xivix-class 페이지) -->
    <div class="iframe-modal" id="iframe-modal">
      <div class="iframe-modal-header">
        <span class="iframe-modal-title">🎓 XIΛIX AI 입문반 1기</span>
        <button class="iframe-modal-close" onclick="closeIframeModal()"><i class="fas fa-times"></i></button>
      </div>
      <iframe id="iframe-content" src="about:blank"></iframe>
    </div>
    
    <!-- 수강 신청 모달 -->
    <div class="edu-modal" id="edu-modal">
      <div class="edu-modal-content">
        <div class="edu-modal-header">
          <button class="edu-modal-close" onclick="closeEduModal()"><i class="fas fa-times"></i></button>
          <h2 style="font-size:1.3rem;font-weight:800;color:var(--text-primary);">🎓 수강 신청</h2>
          <p style="font-size:0.85rem;color:var(--text-secondary);margin-top:4px;">XIΛIX AI 입문반 1기</p>
        </div>
        <div class="edu-modal-body">
          <div class="edu-product">
            <div class="edu-badge">🔥 선착순 5명 중 잔여 2석!</div>
            <div style="font-size:1.2rem;font-weight:700;margin-bottom:8px;">XIΛIX AI 입문반 1기</div>
            <div class="edu-price">2,000,000원</div>
            <div class="edu-note">(카드결제 시 VAT 별도 → 2,200,000원)</div>
            <div style="font-size:0.85rem;color:var(--text-secondary);margin-top:8px;">6주 과정 · 1월 개강</div>
          </div>
          
          <div style="font-weight:600;margin-bottom:12px;text-align:center;">결제 방법 선택</div>
          <div class="payment-btns">
            <button class="payment-btn" id="pay-card" onclick="selectPay('card')">💳<br>카드결제</button>
            <button class="payment-btn" id="pay-bank" onclick="selectPay('bank')">🏦<br>계좌이체</button>
          </div>
          
          <div class="bank-info" id="bank-info">
            <div style="text-align:center;font-weight:700;color:var(--neon-green);margin-bottom:12px;">🏦 계좌이체 안내</div>
            <div class="bank-row"><span>입금 은행</span><span>케이뱅크 (K-Bank)</span></div>
            <div class="bank-row"><span>계좌번호</span><span id="bank-num">100124491987</span></div>
            <div class="bank-row"><span>예금주</span><span>방익주</span></div>
            <button onclick="copyBank()" style="width:100%;padding:10px;background:var(--neon-green);color:white;border:none;border-radius:8px;cursor:pointer;margin:10px 0;"><i class="fas fa-copy"></i> 계좌번호 복사</button>
            <div style="font-size:0.8rem;color:var(--text-secondary);line-height:1.6;">
              ✔️ 입금자명은 신청자 성함과 동일하게<br>
              ✔️ 입금 후 아래 정보 입력 시 등록 완료<br>
              ✔️ 계좌이체 금액: 2,000,000원
            </div>
            <div class="bank-form" style="margin-top:16px;">
              <input type="text" id="edu-name" placeholder="성함 *">
              <input type="tel" id="edu-phone" placeholder="연락처 *">
              <input type="email" id="edu-email" placeholder="이메일 *">
            </div>
          </div>
          
          <button class="edu-submit card-btn" id="submit-card" onclick="submitCard()" style="display:none;">💳 카드결제 진행 (2,200,000원)</button>
          <button class="edu-submit bank-btn" id="submit-bank" onclick="submitBank()" style="display:none;">📝 계좌이체 신청하기</button>
          
          <div style="text-align:center;margin-top:16px;font-size:0.85rem;color:var(--text-secondary);">
            문의: <a href="tel:010-4845-3065" style="color:var(--neon-cyan);">📞 010-4845-3065</a> (방익주 대표)
          </div>
        </div>
      </div>
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
        <div class="portfolio-block-layer" id="portfolio-block-layer"></div>
        <div class="portfolio-overlay" id="portfolio-overlay">
          <div class="portfolio-membership">
            <i class="fas fa-lock"></i>
            <div class="portfolio-membership-text">회원제로 운영중</div>
            <div style="font-size:0.75rem;margin-top:6px;opacity:0.8;">미리보기만 가능합니다</div>
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
          
          <!-- 분할결제 옵션 -->
          <div class="installment-option" style="background:rgba(168,85,247,0.1);border:1px solid rgba(168,85,247,0.3);border-radius:12px;padding:12px;margin:12px 0;">
            <label style="display:flex;align-items:center;gap:8px;font-size:0.85rem;color:var(--text-secondary);cursor:pointer;">
              <input type="checkbox" id="installment-check" onchange="toggleInstallmentInfo()" style="accent-color:var(--neon-purple);">
              <span><i class="fas fa-calendar-alt"></i> 분할결제 (셋팅비 2~3회 분납)</span>
            </label>
            <div id="installment-info" style="display:none;margin-top:10px;font-size:0.8rem;color:var(--text-tertiary);background:rgba(0,0,0,0.2);border-radius:8px;padding:10px;">
              <div style="margin-bottom:6px;color:var(--neon-cyan);">💡 분할결제 안내</div>
              <div>• 계약금: 총액의 약 35%</div>
              <div>• 1주 후: 약 35%</div>
              <div>• 세팅완료 후: 잔금 30%</div>
              <div style="margin-top:6px;color:var(--neon-orange);font-size:0.75rem;">※ 월관리비는 매월 별도 결제 (겹치지 않음)</div>
            </div>
          </div>
          
          <!-- 친구초대 혜택 배너 -->
          <div class="referral-banner" style="background:linear-gradient(135deg,rgba(34,197,94,0.15),rgba(168,85,247,0.15));border:1px solid rgba(34,197,94,0.3);border-radius:12px;padding:12px;margin-bottom:12px;text-align:center;">
            <div style="font-size:0.9rem;font-weight:700;color:var(--neon-green);margin-bottom:4px;">
              <i class="fas fa-gift"></i> 친구 초대하면 바로 15% 할인!
            </div>
            <div style="font-size:0.75rem;color:var(--text-secondary);">
              추천인도 결제금액의 5% 적립금 획득 🎁
            </div>
          </div>
          
          <div style="display:flex;gap:8px;">
            <button class="btn" style="flex:1;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);" onclick="downloadQuote()"><i class="fas fa-file-pdf"></i> 견적서</button>
            <button class="btn btn-primary" style="flex:2;" onclick="checkout()"><i class="fas fa-credit-card"></i> 결제하기</button>
          </div>
          <button class="btn" style="width:100%;margin-top:8px;background:transparent;border:1px solid rgba(239,68,68,0.5);color:#ef4444;font-size:0.85rem;" onclick="clearCart()"><i class="fas fa-trash"></i> 장바구니 비우기</button>
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
    
    <!-- 상담 예약 모달 -->
    <div class="booking-modal" id="booking-modal" style="position:fixed;inset:0;background:rgba(0,0,0,0.9);backdrop-filter:blur(12px);z-index:5000;display:none;align-items:center;justify-content:center;padding:20px;">
      <div style="background:linear-gradient(145deg,var(--bg-secondary),var(--bg-tertiary));border:2px solid #eab308;border-radius:24px;padding:32px;max-width:480px;width:100%;max-height:90vh;overflow-y:auto;position:relative;animation:loginPop 0.4s ease;">
        <button onclick="closeBookingModal()" style="position:absolute;top:16px;right:16px;background:transparent;border:none;color:var(--text-tertiary);font-size:1.2rem;cursor:pointer;"><i class="fas fa-times"></i></button>
        
        <div style="text-align:center;margin-bottom:24px;">
          <div style="font-size:3rem;margin-bottom:8px;">📅</div>
          <h2 style="font-size:1.5rem;font-weight:800;margin-bottom:8px;">상담 예약</h2>
          <p style="font-size:0.9rem;color:var(--text-secondary);">원하시는 시간에 전문 상담을 받으세요!</p>
        </div>
        
        <div style="display:flex;flex-direction:column;gap:16px;">
          <div>
            <label style="display:block;font-size:0.85rem;color:var(--text-secondary);margin-bottom:6px;">이름 *</label>
            <input type="text" id="booking-name" placeholder="홍길동" style="width:100%;background:var(--bg-tertiary);border:1px solid var(--border-subtle);border-radius:10px;padding:12px 16px;font-size:0.95rem;color:var(--text-primary);outline:none;">
          </div>
          
          <div>
            <label style="display:block;font-size:0.85rem;color:var(--text-secondary);margin-bottom:6px;">연락처 *</label>
            <input type="tel" id="booking-phone" placeholder="010-1234-5678" style="width:100%;background:var(--bg-tertiary);border:1px solid var(--border-subtle);border-radius:10px;padding:12px 16px;font-size:0.95rem;color:var(--text-primary);outline:none;">
          </div>
          
          <div>
            <label style="display:block;font-size:0.85rem;color:var(--text-secondary);margin-bottom:6px;">이메일 (선택)</label>
            <input type="email" id="booking-email" placeholder="example@email.com" style="width:100%;background:var(--bg-tertiary);border:1px solid var(--border-subtle);border-radius:10px;padding:12px 16px;font-size:0.95rem;color:var(--text-primary);outline:none;">
          </div>
          
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div>
              <label style="display:block;font-size:0.85rem;color:var(--text-secondary);margin-bottom:6px;">희망 날짜 *</label>
              <input type="date" id="booking-date" style="width:100%;background:var(--bg-tertiary);border:1px solid var(--border-subtle);border-radius:10px;padding:12px 16px;font-size:0.95rem;color:var(--text-primary);outline:none;" onchange="loadAvailableTimes()">
            </div>
            <div>
              <label style="display:block;font-size:0.85rem;color:var(--text-secondary);margin-bottom:6px;">희망 시간 *</label>
              <select id="booking-time" style="width:100%;background:var(--bg-tertiary);border:1px solid var(--border-subtle);border-radius:10px;padding:12px 16px;font-size:0.95rem;color:var(--text-primary);outline:none;">
                <option value="">날짜를 먼저 선택</option>
              </select>
            </div>
          </div>
          
          <div>
            <label style="display:block;font-size:0.85rem;color:var(--text-secondary);margin-bottom:6px;">상담 유형</label>
            <select id="booking-type" style="width:100%;background:var(--bg-tertiary);border:1px solid var(--border-subtle);border-radius:10px;padding:12px 16px;font-size:0.95rem;color:var(--text-primary);outline:none;">
              <option value="general">일반 마케팅 상담</option>
              <option value="sns">SNS 마케팅 상담</option>
              <option value="website">웹사이트/시스템 상담</option>
              <option value="branding">브랜드 컨설팅</option>
              <option value="franchise">프랜차이즈 컨설팅</option>
              <option value="video">영상 제작 상담</option>
            </select>
          </div>
          
          <div>
            <label style="display:block;font-size:0.85rem;color:var(--text-secondary);margin-bottom:6px;">업종</label>
            <select id="booking-industry" style="width:100%;background:var(--bg-tertiary);border:1px solid var(--border-subtle);border-radius:10px;padding:12px 16px;font-size:0.95rem;color:var(--text-primary);outline:none;">
              <option value="">선택해주세요</option>
              <option value="병원">병원/의원</option>
              <option value="뷰티">뷰티/미용</option>
              <option value="식음료">식음료/카페</option>
              <option value="교육">교육/학원</option>
              <option value="쇼핑몰">쇼핑몰/커머스</option>
              <option value="서비스">서비스업</option>
              <option value="기타">기타</option>
            </select>
          </div>
          
          <div>
            <label style="display:block;font-size:0.85rem;color:var(--text-secondary);margin-bottom:6px;">문의 내용 (선택)</label>
            <textarea id="booking-message" rows="3" placeholder="상담받고 싶은 내용을 간단히 적어주세요" style="width:100%;background:var(--bg-tertiary);border:1px solid var(--border-subtle);border-radius:10px;padding:12px 16px;font-size:0.95rem;color:var(--text-primary);outline:none;resize:vertical;"></textarea>
          </div>
        </div>
        
        <button onclick="submitBooking()" style="width:100%;margin-top:24px;padding:16px;background:linear-gradient(135deg,#eab308,#ca8a04);border:none;border-radius:12px;color:white;font-size:1rem;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;">
          <i class="fas fa-calendar-check"></i> 예약 신청하기
        </button>
        
        <p style="text-align:center;margin-top:16px;font-size:0.8rem;color:var(--text-tertiary);">
          예약 확정 후 담당자가 연락드립니다 📞
        </p>
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
              <div class="login-benefit-title">첫 가입 15% 할인쿠폰</div>
              <div class="login-benefit-desc">친구 추천코드 입력시!</div>
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
      const webServiceOptions = ${JSON.stringify(WEB_SERVICE_OPTIONS)};
      const sysDevOptions = ${JSON.stringify(SYSTEM_DEV_OPTIONS)};
      const consultingOptions = ${JSON.stringify(CONSULTING_OPTIONS)};
      
      // ========================================
      // LocalStorage로 장바구니/페이지 기억
      // ========================================
      let cart = JSON.parse(localStorage.getItem('xivix_cart') || '[]');
      let chatHistory = JSON.parse(localStorage.getItem('xivix_chat') || '[]');
      let currentCategory = 'all';
      let lastPaymentInfo = { orderName: '', amount: 0, customerInfo: {} };
      
      // 장바구니 변경시 자동 저장
      function saveCart() {
        localStorage.setItem('xivix_cart', JSON.stringify(cart));
      }
      
      // 채팅 기록 저장
      function saveChat() {
        localStorage.setItem('xivix_chat', JSON.stringify(chatHistory.slice(-20))); // 최근 20개만
      }
      
      // 마지막 본 섹션 저장
      function saveLastSection(sectionId) {
        localStorage.setItem('xivix_last_section', sectionId);
      }
      
      // 마지막 본 섹션으로 이동
      function goToLastSection() {
        const lastSection = localStorage.getItem('xivix_last_section');
        if (lastSection) {
          setTimeout(() => {
            const el = document.getElementById(lastSection);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 500);
        }
      }
      
      const colorMap = { cyan: '#22d3ee', purple: '#a855f7', orange: '#f97316', pink: '#ec4899' };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { 
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // 현재 보고있는 섹션 저장
            if (entry.target.id) saveLastSection(entry.target.id);
          }
        });
      }, { threshold: 0.1 });
      
      // 아코디언 토글 함수
      function toggleAccordion(id) {
        const accordion = document.getElementById('accordion-' + id);
        accordion.classList.toggle('open');
      }
      
      function renderPortfolioMenu() {
        const container = document.getElementById('portfolio-menu');
        container.innerHTML = portfolioData.categories.map(cat => {
          const count = portfolioData.items.filter(i => i.category === cat.id).length;
          return '<button class="accordion-item portfolio-cat-btn" data-category="' + cat.id + '"><span class="item-icon" style="background:' + cat.color + '22;color:' + cat.color + ';"><i class="fas ' + cat.icon + '"></i></span><span class="item-text">' + cat.name + ' (' + count + ')</span></button>';
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
          // 동영상: 오버레이 숨기고 영상 재생 (외부 이동 없이 웹 안에서)
          modalBody.classList.add('video-mode');
          iframe.src = url + '?autoplay=1&rel=0&modestbranding=1';
          iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        } else {
          // 이미지/웹페이지: "회원제로 운영중" 오버레이와 함께 배경에 살짝 보이게
          modalBody.classList.remove('video-mode');
          iframe.src = url;
          iframe.removeAttribute('allow');
        }
        
        document.getElementById('portfolio-modal').classList.add('open');
        document.body.style.overflow = 'hidden';
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
        webservice: { icon: 'fa-palette', name: '🎨 웹 서비스', color: '#14b8a6' },
        sysdev: { icon: 'fa-cogs', name: '⚙️ 시스템 개발', color: '#06b6d4' },
        addons: { icon: 'fa-plus-circle', name: '부가 서비스', color: '#8b5cf6' },
        consulting: { icon: 'fa-handshake', name: '🏢 브랜드/프랜차이즈 컨설팅', color: '#eab308' }
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
        else if (type === 'webservice') body.innerHTML = '<div class="grid grid-2">' + renderWebServiceHTML() + '</div>';
        else if (type === 'sysdev') body.innerHTML = '<div class="grid grid-2">' + renderSysDevHTML() + '</div>';
        else if (type === 'addons') body.innerHTML = '<div class="grid grid-2">' + renderAddonsHTML() + '</div>';
        else if (type === 'consulting') body.innerHTML = renderConsultingHTML();
        
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
      
      function renderWebServiceHTML() {
        return webServiceOptions.map(w => '<div class="card"><h3 class="card-name">' + w.name + '</h3><p class="card-desc">' + w.desc + '</p><div class="card-price"><span class="price-value">' + (w.price/10000) + '</span><span class="price-unit">만원</span></div><button class="btn btn-primary btn-small" style="width:100%;" onclick="addToCart(\\'webservice\\', \\'' + w.id + '\\', \\'' + w.name + '\\', ' + w.price + ', event)"><i class="fas fa-cart-plus"></i>담기</button></div>').join('');
      }
      
      function renderSysDevHTML() {
        return sysDevOptions.map(s => {
          if (s.isEdu) {
            // 수강 신청 카드 - 특별 디자인 + 바로 결제
            return '<div class="card" data-edu-card style="border:2px solid var(--neon-green);background:linear-gradient(135deg,rgba(34,197,94,0.1),rgba(168,85,247,0.1));">' +
              '<div style="position:absolute;top:-10px;right:10px;background:linear-gradient(135deg,#ef4444,#f97316);color:white;padding:4px 12px;border-radius:12px;font-size:0.75rem;font-weight:700;">🔥 선착순 5명</div>' +
              '<h3 class="card-name" style="color:var(--neon-green);">' + s.name + '</h3>' +
              '<p class="card-desc">' + s.desc + '</p>' +
              '<div class="card-price"><span class="price-value">' + (s.price/10000) + '</span><span class="price-unit">만원</span></div>' +
              '<p style="font-size:0.75rem;color:var(--neon-orange);margin-bottom:12px;">(카드결제 시 VAT 별도 → 220만원)</p>' +
              '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">' +
                '<button class="btn btn-small" style="background:linear-gradient(135deg,var(--neon-purple),var(--neon-pink));" onclick="eduCardPay()"><i class="fas fa-credit-card"></i> 카드</button>' +
                '<button class="btn btn-small" style="background:linear-gradient(135deg,var(--neon-green),#16a34a);" onclick="openEduModal()"><i class="fas fa-university"></i> 계좌</button>' +
              '</div>' +
              '<p style="font-size:0.7rem;color:#888;margin-top:10px;text-align:center;">💻 카드결제는 PC에서 가능합니다</p>' +
            '</div>';
          }
          return '<div class="card"><h3 class="card-name">' + s.name + '</h3><p class="card-desc">' + s.desc + '</p><div class="card-price"><span class="price-value">' + (s.price/10000) + '</span><span class="price-unit">만원</span></div><button class="btn btn-primary btn-small" style="width:100%;" onclick="addToCart(\\'sysdev\\', \\'' + s.id + '\\', \\'' + s.name + '\\', ' + s.price + ', event)"><i class="fas fa-cart-plus"></i>담기</button></div>';
        }).join('');
      }
      
      function renderConsultingHTML() {
        const stepColors = ['#ef4444', '#f59e0b', '#22c55e'];
        return '<div class="consulting-packages">' +
          '<div class="consulting-intro">' +
            '<h3>🏢 브랜드/프랜차이즈 컨설팅</h3>' +
            '<p style="color: var(--neon-orange);">📋 1년 계약 · 월2회 방문 · 단계별 차등요금</p>' +
          '</div>' +
          '<div class="consulting-grid">' +
            consultingOptions.map((c, idx) => {
              const stepColor = stepColors[idx];
              const isRecommended = c.recommended;
              return '<div class="consulting-card' + (isRecommended ? ' recommended' : '') + '" style="--step-color: ' + stepColor + '">' +
                '<div class="step-badge" style="background: ' + stepColor + '">' + c.badge + '</div>' +
                (isRecommended ? '<div class="best-badge">BEST</div>' : '') +
                '<h4 class="step-name">' + c.name + '</h4>' +
                '<p class="step-subtitle">' + c.subtitle + '</p>' +
                '<div class="step-pricing">' +
                  '<div class="monthly-fee"><span class="fee-label">월</span><span class="fee-value">' + (c.monthlyFee/10000) + '</span><span class="fee-unit">만원</span></div>' +
                  '<div class="total-fee">' + c.period + ' 총 ' + (c.totalPrice/10000) + '만원</div>' +
                  '<div class="visit-note">' + c.desc + '</div>' +
                '</div>' +
                '<ul class="step-tasks">' + c.tasks.map(t => '<li><i class="fas fa-check"></i>' + t + '</li>').join('') + '</ul>' +
                '<div class="step-includes">' +
                  '<div class="includes-title"><i class="fas fa-box"></i> 포함</div>' +
                  '<div class="includes-list">' + c.includes.map(i => '<span>' + i + '</span>').join('') + '</div>' +
                '</div>' +
                '<div class="step-advisory">' +
                  '<div class="advisory-title"><i class="fas fa-user-tie"></i> 자문</div>' +
                  '<div class="advisory-tags">' + c.advisory.map(a => '<span>' + a + '</span>').join('') + '</div>' +
                '</div>' +
                '<button class="btn btn-primary step-cta" style="background: ' + stepColor + '" onclick="addToCart(\\'consulting\\', \\'' + c.id + '\\', \\'' + c.name + ' (' + c.period + ')\\', ' + c.totalPrice + ', event)">' +
                  '<i class="fas fa-handshake"></i> 상담신청' +
                '</button>' +
              '</div>';
            }).join('') +
          '</div>' +
        '</div>' +
        '<style>' +
          '.consulting-packages { max-width: 100%; }' +
          '.consulting-intro { text-align: center; margin-bottom: 20px; }' +
          '.consulting-intro h3 { font-size: 1.1rem; margin: 0 0 6px; white-space: nowrap; }' +
          '.consulting-intro p { color: var(--text-secondary); font-size: 0.9rem; margin: 0; }' +
          '.consulting-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; }' +
          '.consulting-card { background: rgba(255,255,255,0.05); border-radius: 16px; padding: 20px; position: relative; border: 1px solid rgba(255,255,255,0.1); }' +
          '.consulting-card.recommended { border: 2px solid var(--step-color); background: rgba(245,158,11,0.05); }' +
          '.step-badge { position: absolute; top: -10px; left: 20px; padding: 4px 12px; border-radius: 12px; font-size: 0.75rem; font-weight: 700; color: white; }' +
          '.best-badge { position: absolute; top: -10px; right: 20px; background: linear-gradient(135deg, #a855f7, #ec4899); padding: 4px 10px; border-radius: 12px; font-size: 0.7rem; font-weight: 700; color: white; }' +
          '.step-name { font-size: 1.2rem; margin: 10px 0 4px; }' +
          '.step-subtitle { color: var(--text-secondary); font-size: 0.85rem; margin: 0 0 12px; }' +
          '.step-pricing { text-align: center; background: rgba(0,0,0,0.2); border-radius: 12px; padding: 12px; margin-bottom: 14px; }' +
          '.monthly-fee { display: flex; align-items: baseline; justify-content: center; gap: 4px; }' +
          '.fee-label { font-size: 0.8rem; color: var(--text-secondary); }' +
          '.fee-value { font-size: 2rem; font-weight: 700; color: var(--step-color); }' +
          '.fee-unit { font-size: 0.9rem; color: var(--text-secondary); }' +
          '.total-fee { font-size: 0.8rem; color: var(--text-tertiary); margin-top: 4px; }' +
          '.visit-note { font-size: 0.75rem; color: var(--step-color); margin-top: 4px; }' +
          '.step-tasks { list-style: none; padding: 0; margin: 0 0 12px; }' +
          '.step-tasks li { font-size: 0.85rem; padding: 4px 0; display: flex; align-items: center; gap: 8px; }' +
          '.step-tasks li i { color: var(--step-color); font-size: 0.7rem; }' +
          '.step-includes, .step-advisory { margin-bottom: 10px; }' +
          '.includes-title, .advisory-title { font-size: 0.75rem; color: var(--text-tertiary); margin-bottom: 6px; display: flex; align-items: center; gap: 4px; }' +
          '.includes-list span, .advisory-tags span { display: inline-block; background: rgba(255,255,255,0.1); padding: 3px 8px; border-radius: 6px; font-size: 0.75rem; margin: 2px; }' +
          '.advisory-tags span { background: rgba(234,179,8,0.15); color: #eab308; }' +
          '.step-cta { width: 100%; padding: 12px; font-size: 0.95rem; border: none; border-radius: 10px; margin-top: 8px; }' +
        '</style>';
      }
      
      function addToCart(type, id, name, price, event) { 
        // 이벤트 버블링 방지 (모달 닫힘 방지)
        if (event) event.stopPropagation();
        cart.push({ type, id, name, price }); 
        saveCart(); // LocalStorage 저장
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
      function removeFromCart(index) { cart.splice(index, 1); saveCart(); updateCart(); }
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
      
      function toggleInstallmentInfo() {
        const info = document.getElementById('installment-info');
        const check = document.getElementById('installment-check');
        info.style.display = check.checked ? 'block' : 'none';
      }
      
      function clearCart() {
        if (confirm('장바구니를 비우시겠습니까?')) {
          cart = [];
          saveCart();
          updateCart();
          showToast('🗑️ 장바구니가 비워졌습니다');
        }
      }
      
      function downloadQuote() {
        if (cart.length === 0) {
          showToast('⚠️ 장바구니에 상품을 담아주세요');
          return;
        }
        
        const today = new Date();
        const dateStr = today.getFullYear() + '년 ' + (today.getMonth()+1) + '월 ' + today.getDate() + '일';
        const validUntil = new Date(today.getTime() + 7*24*60*60*1000);
        const validStr = validUntil.getFullYear() + '년 ' + (validUntil.getMonth()+1) + '월 ' + validUntil.getDate() + '일';
        
        let sum = cart.reduce((acc, item) => acc + item.price, 0);
        const isRegional = document.getElementById('regional-fee').checked;
        if (isRegional) sum += 300000;
        
        const quoteHtml = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>X I Λ I X 견적서</title><style>' +
          'body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:800px;margin:0 auto;padding:40px;color:#333;}' +
          '.header{text-align:center;border-bottom:3px solid #a855f7;padding-bottom:20px;margin-bottom:30px;}' +
          '.logo{font-size:2rem;font-weight:800;background:linear-gradient(135deg,#a855f7,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}' +
          'h1{font-size:1.5rem;margin:10px 0 0;color:#333;}' +
          '.info{display:flex;justify-content:space-between;margin-bottom:30px;font-size:0.9rem;color:#666;}' +
          'table{width:100%;border-collapse:collapse;margin-bottom:30px;}' +
          'th,td{border:1px solid #ddd;padding:12px;text-align:left;}' +
          'th{background:#f5f5f5;font-weight:600;}' +
          '.price{text-align:right;}' +
          '.total-row{background:linear-gradient(135deg,rgba(168,85,247,0.1),rgba(236,72,153,0.1));font-weight:700;}' +
          '.total-row td{font-size:1.1rem;color:#a855f7;}' +
          '.footer{margin-top:40px;padding-top:20px;border-top:1px solid #ddd;font-size:0.85rem;color:#666;text-align:center;}' +
          '.notice{background:#fffbeb;border:1px solid #fbbf24;border-radius:8px;padding:16px;margin-top:20px;font-size:0.9rem;}' +
          '.stamp{text-align:right;margin-top:30px;color:#a855f7;font-weight:600;}' +
          '@media print{body{padding:20px;}}' +
        '</style></head><body>' +
          '<div class="header"><div class="logo">X I Λ I X</div><h1>견 적 서</h1></div>' +
          '<div class="info"><div><strong>발행일:</strong> ' + dateStr + '<br><strong>유효기간:</strong> ' + validStr + '까지</div><div style="text-align:right;"><strong>X I Λ I X</strong><br>Combine Technology & Business<br>대표: 방익주</div></div>' +
          '<table><thead><tr><th>No.</th><th>서비스명</th><th class="price">금액</th></tr></thead><tbody>' +
          cart.map((item, i) => '<tr><td>' + (i+1) + '</td><td>' + item.name + '</td><td class="price">' + (item.price).toLocaleString() + '원</td></tr>').join('') +
          (isRegional ? '<tr><td>' + (cart.length+1) + '</td><td>지방 출장비</td><td class="price">300,000원</td></tr>' : '') +
          '<tr class="total-row"><td colspan="2" style="text-align:center;">합 계</td><td class="price">' + sum.toLocaleString() + '원</td></tr>' +
          '</tbody></table>' +
          '<div class="notice"><strong>📋 안내사항</strong><ul style="margin:10px 0 0;padding-left:20px;"><li>본 견적서는 발행일로부터 7일간 유효합니다.</li><li>부가세(VAT) 별도입니다.</li><li>결제 완료 후 작업이 시작됩니다.</li><li>상세 문의: X I Λ I X 챗봇 또는 카카오톡 상담</li></ul></div>' +
          '<div class="stamp">X I Λ I X</div>' +
          '<div class="footer">© 2026 X I Λ I X. All rights reserved.<br>본 견적서는 전자문서로 별도의 서명 없이 유효합니다.</div>' +
        '</body></html>';
        
        const blob = new Blob([quoteHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'XIVIX_견적서_' + today.getFullYear() + (today.getMonth()+1).toString().padStart(2,'0') + today.getDate().toString().padStart(2,'0') + '.html';
        a.click();
        URL.revokeObjectURL(url);
        showToast('📄 견적서가 다운로드되었습니다');
      }
      
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
      
      // 예약 모달
      function openBookingModal() {
        document.getElementById('booking-modal').style.display = 'flex';
        // 최소 날짜 설정 (내일부터)
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        document.getElementById('booking-date').min = tomorrow.toISOString().split('T')[0];
      }
      
      function closeBookingModal() {
        document.getElementById('booking-modal').style.display = 'none';
      }
      
      async function loadAvailableTimes() {
        const date = document.getElementById('booking-date').value;
        const timeSelect = document.getElementById('booking-time');
        
        if (!date) {
          timeSelect.innerHTML = '<option value="">날짜를 먼저 선택</option>';
          return;
        }
        
        try {
          const res = await fetch('/api/booking/available-times?date=' + date);
          const data = await res.json();
          
          if (data.availableTimes.length === 0) {
            timeSelect.innerHTML = '<option value="">예약 가능한 시간이 없습니다</option>';
          } else {
            timeSelect.innerHTML = '<option value="">시간 선택</option>' + 
              data.availableTimes.map(t => '<option value="' + t + '">' + t + '</option>').join('');
          }
        } catch (e) {
          // 기본 시간 표시
          timeSelect.innerHTML = '<option value="">시간 선택</option><option value="10:00">10:00</option><option value="11:00">11:00</option><option value="13:00">13:00</option><option value="14:00">14:00</option><option value="15:00">15:00</option><option value="16:00">16:00</option><option value="17:00">17:00</option>';
        }
      }
      
      async function submitBooking() {
        const name = document.getElementById('booking-name').value.trim();
        const phone = document.getElementById('booking-phone').value.trim();
        const email = document.getElementById('booking-email').value.trim();
        const date = document.getElementById('booking-date').value;
        const time = document.getElementById('booking-time').value;
        const consultType = document.getElementById('booking-type').value;
        const industry = document.getElementById('booking-industry').value;
        const message = document.getElementById('booking-message').value.trim();
        
        if (!name || !phone || !date || !time) {
          showToast('⚠️ 필수 정보를 입력해주세요');
          return;
        }
        
        try {
          const res = await fetch('/api/booking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, phone, email, date, time, consultType, industry, message })
          });
          
          const data = await res.json();
          
          if (data.success) {
            closeBookingModal();
            showToast('✅ 예약이 완료되었습니다! 담당자가 연락드릴게요 📞');
            
            // 입력값 초기화
            document.getElementById('booking-name').value = '';
            document.getElementById('booking-phone').value = '';
            document.getElementById('booking-email').value = '';
            document.getElementById('booking-date').value = '';
            document.getElementById('booking-time').innerHTML = '<option value="">날짜를 먼저 선택</option>';
            document.getElementById('booking-message').value = '';
          } else {
            showToast('❌ ' + (data.error || '예약 실패. 다시 시도해주세요.'));
          }
        } catch (e) {
          showToast('❌ 네트워크 오류. 다시 시도해주세요.');
        }
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
        // 모바일 체크 - 현재 모바일 카드결제 미지원
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
          alert('📱 모바일 카드결제 안내\\n\\n현재 모바일 카드결제는 준비 중입니다.\\n(약 1개월 소요 예정)\\n\\n✅ PC에서 카드결제 가능합니다.');
          return;
        }
        
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
              windowType: {
                pc: 'IFRAME',
                mobile: 'REDIRECTION'
              },
              redirectUrl: 'https://xivix.kr/?cart_payment=success&orderId=' + data.orderId,
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
      
      // 띠 배너 + 수강 신청
      function closeBanner() {
        document.getElementById('top-banner').classList.add('hidden');
        document.getElementById('main-container').classList.remove('with-banner');
        sessionStorage.setItem('banner_closed', 'true');
      }
      
      // iframe 모달 (외부 페이지를 내부에서 열기)
      function openIframeModal() {
        document.getElementById('iframe-modal').classList.add('open');
        document.getElementById('iframe-content').src = 'https://xivix-class.pages.dev/';
      }
      function closeIframeModal() {
        document.getElementById('iframe-modal').classList.remove('open');
        document.getElementById('iframe-content').src = 'about:blank';
      }
      
      function openEduModal() { document.getElementById('edu-modal').classList.add('open'); }
      function closeEduModal() { document.getElementById('edu-modal').classList.remove('open'); }
      
      let payType = '';
      function selectPay(type) {
        payType = type;
        document.getElementById('pay-card').classList.toggle('active', type === 'card');
        document.getElementById('pay-bank').classList.toggle('active', type === 'bank');
        document.getElementById('bank-info').classList.toggle('show', type === 'bank');
        document.getElementById('submit-card').style.display = type === 'card' ? 'block' : 'none';
        document.getElementById('submit-bank').style.display = type === 'bank' ? 'block' : 'none';
      }
      
      function copyBank() {
        navigator.clipboard.writeText('100124491987').then(() => showToast('✅ 계좌번호 복사됨!'));
      }
      
      // 수강 신청 카드결제 (PortOne v2 - 기존 결제와 동일한 자격증명 사용)
      async function eduCardPay() {
        // 모바일 체크 - 현재 모바일 카드결제 미지원
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
          alert('📱 모바일 카드결제 안내\\n\\n현재 모바일 카드결제는 준비 중입니다.\\n(약 1개월 소요 예정)\\n\\n✅ PC에서 카드결제 가능합니다.\\n✅ 계좌이체는 모바일에서도 가능합니다.');
          return;
        }
        
        if (typeof PortOne === 'undefined') {
          showToast('⚠️ 결제 모듈 로딩 중... 잠시 후 다시 시도해주세요.');
          return;
        }
        
        const orderId = 'EDU_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        
        try {
          const response = await PortOne.requestPayment({
            storeId: 'store-d08be3e0-9ed0-4393-9974-0b9cbd799252',
            channelKey: 'channel-key-1cb320d6-8851-4ab2-83de-b8fb88dd2613',
            paymentId: orderId,
            orderName: 'XIΛIX AI 입문반 1기',
            totalAmount: 2200000,
            currency: 'KRW',
            payMethod: 'CARD',
            windowType: {
              pc: 'IFRAME',
              mobile: 'REDIRECTION'
            },
            redirectUrl: 'https://xivix.kr/?edu_payment=success',
            customer: {
              email: 'customer@xivix.kr',
              fullName: '방익주',
              phoneNumber: '01048453065'
            }
          });
          
          // PC (IFRAME)에서만 여기 도달, 모바일은 리디렉션됨
          if (!response) return;
          
          if (response.code) {
            showToast('❌ 결제 실패: ' + response.message);
          } else if (response.paymentId) {
            showToast('🎉 결제가 완료되었습니다! 감사합니다.');
            closeEduModal();
          }
        } catch (e) {
          showToast('❌ 결제 오류: ' + e.message);
        }
      }
      
      async function submitCard() {
        // 모달에서 호출되는 카드결제도 동일하게
        await eduCardPay();
        closeEduModal();
      }
      
      function submitBank() {
        const name = document.getElementById('edu-name').value.trim();
        const phone = document.getElementById('edu-phone').value.trim();
        const email = document.getElementById('edu-email').value.trim();
        if (!name || !phone || !email) { showToast('⚠️ 모든 정보를 입력해주세요.'); return; }
        
        fetch('/api/edu-bank-transfer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, phone, email, product: 'XIΛIX AI 입문반 1기', amount: 2000000 })
        }).then(() => {
          showToast('🎉 신청 완료! 입금 확인 후 연락드리겠습니다.');
          closeEduModal();
        }).catch(() => {
          showToast('🎉 신청 정보가 저장되었습니다!');
          closeEduModal();
        });
      }
      
      // 카카오톡 공유
      function shareKakao() {
        // SDK 로딩 확인 및 초기화
        if (!window.Kakao) {
          showToast('⚠️ 카카오 SDK 로딩 중... 잠시 후 다시 클릭해주세요.');
          return;
        }
        
        // 초기화 안 됐으면 초기화
        if (!Kakao.isInitialized()) {
          try {
            Kakao.init('ab4e6e4c5d28f94c4af56f85519bf1a9');
            console.log('✅ 카카오 SDK 초기화 완료');
          } catch (e) {
            console.error('카카오 초기화 실패:', e);
            showToast('⚠️ 카카오 연동 오류. 새로고침 후 다시 시도해주세요.');
            return;
          }
        }
        
        // 현재 로그인한 사용자의 추천인 코드가 있으면 포함
        const referralCode = currentUser?.referral_code || '';
        const shareUrl = referralCode ? 'https://xivix.kr?ref=' + referralCode : 'https://xivix.kr';
        
        Kakao.Share.sendDefault({
          objectType: 'feed',
          content: {
            title: '🎁 친구 초대하면 15% 할인!',
            description: 'AI 마케팅 전문 에이전시 XIVIX에서 SNS 마케팅, 웹사이트 제작, 브랜드 컨설팅을 받아보세요!',
            imageUrl: 'https://dummyimage.com/1200x630/1a1a1f/ffffff.png&text=XIVIX',
            link: {
              mobileWebUrl: shareUrl,
              webUrl: shareUrl
            }
          },
          social: {
            likeCount: 127,
            commentCount: 45
          },
          buttons: [
            {
              title: '15% 할인받기',
              link: {
                mobileWebUrl: shareUrl,
                webUrl: shareUrl
              }
            },
            {
              title: '서비스 둘러보기',
              link: {
                mobileWebUrl: 'https://xivix.kr#services',
                webUrl: 'https://xivix.kr#services'
              }
            }
          ]
        });
      }
      
      // URL 복사 공유
      function copyShareLink() {
        const referralCode = currentUser?.referral_code || '';
        const shareUrl = referralCode ? 'https://xivix.kr?ref=' + referralCode : 'https://xivix.kr';
        
        navigator.clipboard.writeText(shareUrl).then(() => {
          showToast('✅ 링크가 복사되었습니다!');
        }).catch(() => {
          showToast('❌ 복사 실패. 다시 시도해주세요.');
        });
      }
      
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
      
      // 6. 개발자도구 감지 - 비활성화 (페이지 렌더링 문제 방지)
      // 7. 콘솔 로그 - 유지 (디버깅용)
      
      document.getElementById('admin-modal').addEventListener('click', e => { if (e.target.id === 'admin-modal') closeAdminModal(); });
      document.getElementById('portfolio-modal').addEventListener('click', e => { if (e.target.id === 'portfolio-modal') closePortfolioModal(); });
      document.getElementById('service-modal').addEventListener('click', e => { if (e.target.id === 'service-modal') closeServiceModal(); });
      
      // 포트폴리오 미리보기 보안: 클릭/드래그/스크롤 시 블럭 표시
      (function() {
        const blockLayer = document.getElementById('portfolio-block-layer');
        const overlay = document.getElementById('portfolio-overlay');
        let hideTimeout;
        
        function showBlock(e) {
          e.preventDefault();
          e.stopPropagation();
          if (overlay && !document.querySelector('.portfolio-modal-body').classList.contains('video-mode')) {
            overlay.classList.add('show');
            clearTimeout(hideTimeout);
            hideTimeout = setTimeout(() => overlay.classList.remove('show'), 2500);
          }
        }
        
        if (blockLayer) {
          blockLayer.addEventListener('click', showBlock);
          blockLayer.addEventListener('mousedown', showBlock);
          blockLayer.addEventListener('touchstart', showBlock, { passive: false });
          blockLayer.addEventListener('wheel', showBlock, { passive: false });
          blockLayer.addEventListener('contextmenu', showBlock);
          blockLayer.addEventListener('selectstart', e => e.preventDefault());
          blockLayer.addEventListener('dragstart', e => e.preventDefault());
        }
      })();
      
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
        
        // 띠 배너 상태
        if (sessionStorage.getItem('banner_closed') !== 'true') {
          document.getElementById('main-container').classList.add('with-banner');
        } else {
          document.getElementById('top-banner').classList.add('hidden');
        }
        
        // URL 해시로 바로가기 처리
        if (window.location.hash === '#edu' || window.location.hash === '#sysdev') {
          setTimeout(() => {
            openServiceModal('sysdev');
            // 입문반 카드로 스크롤
            setTimeout(() => {
              const eduCard = document.querySelector('[data-edu-card]');
              if (eduCard) eduCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
          }, 500);
        }
        
        // 모바일 수강신청 결제 완료 처리 (리디렉션 방식)
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('edu_payment') === 'success') {
          const code = urlParams.get('code');
          const paymentId = urlParams.get('paymentId');
          const message = urlParams.get('message');
          
          if (code) {
            // code가 있으면 결제 실패
            showToast('❌ 결제 실패: ' + decodeURIComponent(message || '알 수 없는 오류'));
          } else if (paymentId) {
            // code 없고 paymentId 있으면 결제 성공
            showToast('🎉 결제가 완료되었습니다! 감사합니다.');
          }
          // URL 정리
          window.history.replaceState({}, '', window.location.pathname);
        }
        
        // 모바일 장바구니 결제 완료 처리 (리디렉션 방식)
        if (urlParams.get('cart_payment') === 'success') {
          const code = urlParams.get('code');
          const paymentId = urlParams.get('paymentId');
          const message = urlParams.get('message');
          
          if (code) {
            showToast('❌ 결제 실패: ' + decodeURIComponent(message || '알 수 없는 오류'));
          } else if (paymentId) {
            showToast('🎉 결제가 완료되었습니다! 감사합니다.');
            // 장바구니 비우기
            cart = [];
            updateCart();
          }
          // URL 정리
          window.history.replaceState({}, '', window.location.pathname);
        }
        
        // 카카오 SDK 초기화
        if (window.Kakao && !Kakao.isInitialized()) {
          Kakao.init('ab4e6e4c5d28f94c4af56f85519bf1a9');
          console.log('✅ 카카오 SDK 초기화 완료');
        }
        
        // LocalStorage에서 장바구니 복원
        if (cart.length > 0) {
          updateCart();
          console.log('🛒 장바구니 복원됨:', cart.length + '개 상품');
        }
        
        // 마지막 본 섹션으로 이동 (2초 후)
        setTimeout(() => goToLastSection(), 1500);
        
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

// ========================================
// CONTRACT PAGE - 온라인 계약서 (전자서명)
// ========================================
function getContractHTML(): string {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>마케팅 서비스 계약서 - 컴바인티엔비</title>
    <meta name="robots" content="noindex, nofollow">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      
      @media print {
        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .no-print { display: none !important; }
        .contract-page { box-shadow: none; }
      }
      
      body {
        font-family: 'Noto Sans KR', -apple-system, sans-serif;
        background: #f0f0f0;
        color: #000;
        line-height: 1.8;
        font-size: 14px;
      }
      
      .contract-wrapper {
        max-width: 210mm;
        margin: 20px auto;
        padding: 0 15px 100px;
      }
      
      .contract-page {
        background: #fff;
        padding: 50px 55px;
        box-shadow: 0 2px 15px rgba(0,0,0,0.1);
      }
      
      .contract-header {
        text-align: center;
        border-bottom: 3px double #000;
        padding-bottom: 25px;
        margin-bottom: 35px;
      }
      
      .contract-title {
        font-size: 26px;
        font-weight: 700;
        letter-spacing: 6px;
        margin-bottom: 8px;
      }
      
      .contract-subtitle { font-size: 13px; color: #666; }
      
      .contract-date-row {
        text-align: right;
        margin-bottom: 30px;
        font-size: 14px;
      }
      
      .section { margin-bottom: 28px; }
      
      .section-title {
        font-size: 15px;
        font-weight: 700;
        background: #f5f5f5;
        padding: 10px 15px;
        border-left: 4px solid #333;
        margin-bottom: 15px;
      }
      
      table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 15px;
      }
      
      th, td {
        border: 1px solid #333;
        padding: 10px 12px;
        text-align: left;
        vertical-align: middle;
      }
      
      th {
        background: #f9f9f9;
        font-weight: 600;
        width: 100px;
        text-align: center;
      }
      
      .party-header {
        background: #eee;
        text-align: center;
        font-weight: 700;
        font-size: 14px;
      }
      
      .input-field {
        width: 100%;
        border: none;
        background: transparent;
        font-family: inherit;
        font-size: 14px;
        outline: none;
        padding: 2px 0;
      }
      
      .input-field::placeholder { color: #999; }
      
      .input-field-border {
        border: 1px solid #ccc;
        padding: 8px 10px;
        border-radius: 4px;
      }
      
      .service-row {
        display: flex;
        gap: 10px;
        margin-bottom: 10px;
        align-items: center;
      }
      
      .service-name-input {
        flex: 2;
        border: 1px solid #ccc;
        padding: 10px;
        border-radius: 4px;
        font-size: 14px;
      }
      
      .service-price-input {
        flex: 1;
        border: 1px solid #ccc;
        padding: 10px;
        border-radius: 4px;
        font-size: 14px;
        text-align: right;
      }
      
      .add-service-btn, .remove-service-btn {
        padding: 8px 12px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
      }
      
      .add-service-btn {
        background: #10b981;
        color: #fff;
        margin-top: 5px;
      }
      
      .add-service-btn:hover { background: #059669; }
      
      .remove-service-btn {
        background: #ef4444;
        color: #fff;
        padding: 8px 10px;
      }
      
      .remove-service-btn:hover { background: #dc2626; }
      
      .payment-row {
        display: flex;
        gap: 30px;
        padding: 10px 0;
      }
      
      .payment-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 20px;
        border: 2px solid #ddd;
        cursor: pointer;
        transition: all 0.2s;
      }
      
      .payment-item:has(input:checked) {
        border-color: #333;
        background: #f9f9f9;
      }
      
      .payment-item input[type="radio"] {
        width: 18px;
        height: 18px;
        accent-color: #333;
      }
      
      .payment-item span { font-weight: 600; }
      
      .bank-info-box {
        background: #f9f9f9;
        border: 1px solid #ddd;
        padding: 12px 15px;
        margin-top: 12px;
        font-size: 13px;
        display: none;
      }
      
      .bank-info-box.show { display: block; }
      
      .total-row { background: #f5f5f5; }
      .total-row td { font-size: 17px; font-weight: 700; }
      
      .terms-content {
        font-size: 13px;
        line-height: 1.9;
      }
      
      .terms-content h4 {
        font-size: 13px;
        font-weight: 700;
        margin: 15px 0 6px;
      }
      
      .terms-content ol { padding-left: 22px; }
      .terms-content li { margin-bottom: 4px; }
      
      .agree-box {
        margin: 20px 0;
        padding: 15px;
        background: #f9f9f9;
        border: 1px solid #ddd;
      }
      
      .agree-box label {
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        font-weight: 600;
      }
      
      .agree-box input[type="checkbox"] {
        width: 18px;
        height: 18px;
        accent-color: #333;
      }
      
      .signature-section { margin-top: 35px; }
      .signature-table td { height: auto; }
      
      .sig-input {
        width: 100%;
        padding: 6px 8px;
        font-size: 13px;
        border: 1px solid #ddd;
        border-radius: 4px;
        background: #fafafa;
        box-sizing: border-box;
      }
      .sig-input:focus {
        outline: none;
        border-color: #333;
        background: #fff;
      }
      
      .signature-canvas-box {
        background: #fff;
        border: 1px dashed #999;
        height: 70px;
        margin-top: 8px;
        cursor: crosshair;
      }
      
      .signature-canvas {
        width: 100%;
        height: 100%;
        display: block;
      }
      
      .clear-sig-btn {
        font-size: 11px;
        color: #666;
        background: #f5f5f5;
        border: 1px solid #ccc;
        padding: 3px 8px;
        cursor: pointer;
        margin-top: 5px;
      }
      
      .clear-sig-btn:hover { background: #eee; }
      
      .contract-footer {
        text-align: center;
        margin-top: 35px;
        font-size: 16px;
        font-weight: 700;
      }
      
      .action-buttons {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: #fff;
        border-top: 1px solid #ddd;
        padding: 15px;
        display: flex;
        justify-content: center;
        gap: 15px;
        z-index: 100;
        flex-wrap: wrap;
      }
      
      .action-btn {
        padding: 12px 28px;
        font-size: 14px;
        font-weight: 600;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      
      .action-btn.primary { background: #333; color: #fff; }
      .action-btn.primary:hover { background: #000; }
      
      .action-btn.secondary {
        background: #fff;
        color: #333;
        border: 1px solid #333;
      }
      
      .action-btn.share { background: #2563eb; color: #fff; }
      .action-btn.share:hover { background: #1d4ed8; }
      
      .action-btn:disabled { opacity: 0.5; cursor: not-allowed; }
      
      .modal-bg {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.5);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      }
      
      .modal-bg.show { display: flex; }
      
      .modal-box {
        background: #fff;
        padding: 35px;
        max-width: 420px;
        text-align: center;
        border-radius: 4px;
      }
      
      .modal-icon {
        width: 55px;
        height: 55px;
        background: #4CAF50;
        color: #fff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        margin: 0 auto 18px;
      }
      
      .modal-title { font-size: 18px; font-weight: 700; margin-bottom: 10px; }
      .modal-desc { color: #666; margin-bottom: 22px; line-height: 1.7; font-size: 14px; }
      .modal-btns { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
      
      .share-link-box {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 12px;
        border-radius: 6px;
        margin: 15px 0;
        word-break: break-all;
        font-size: 12px;
        text-align: left;
      }
      
      .copy-btn {
        width: 100%;
        padding: 10px;
        background: #333;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        margin-top: 10px;
      }
      
      .copy-btn:hover { background: #000; }
      
      /* 편집 모드 */
      .edit-mode-banner {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: #fff;
        padding: 12px 16px;
        text-align: center;
        font-weight: 600;
        position: sticky;
        top: 0;
        z-index: 200;
        display: none;
      }
      
      .edit-mode-banner.show { display: block; }
      
      .editable-field {
        background: #fffbeb !important;
        border: 2px dashed #f59e0b !important;
      }
      
      .edit-controls {
        position: fixed;
        bottom: 80px;
        right: 20px;
        display: none;
        flex-direction: column;
        gap: 10px;
        z-index: 150;
      }
      
      .edit-controls.show { display: flex; }
      
      .edit-control-btn {
        padding: 12px 16px;
        background: #333;
        color: #fff;
        border: none;
        border-radius: 8px;
        font-size: 13px;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      }
      
      .edit-control-btn:hover { background: #000; }
      .edit-control-btn.save { background: #10b981; }
      .edit-control-btn.save:hover { background: #059669; }
      
      /* 반응형 - 모바일 */
      @media (max-width: 768px) {
        body { font-size: 13px; }
        .contract-wrapper { padding: 8px 8px 150px; margin: 0; }
        .contract-page { padding: 24px 16px; }
        .contract-title { font-size: 18px; letter-spacing: 3px; }
        .section-title { font-size: 13px; padding: 8px 12px; }
        
        table { display: block; }
        thead { display: none; }
        tbody, tr, td, th { display: block; width: 100%; }
        tr { margin-bottom: 12px; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; }
        th { width: 100%; text-align: left; padding: 10px 14px; border: none; font-size: 12px; }
        td { padding: 12px 14px; border: none; border-bottom: 1px solid #f0f0f0; }
        td:last-child { border-bottom: none; }
        
        .party-header { padding: 12px 14px !important; }
        .payment-row { flex-direction: column; gap: 12px; }
        .payment-item { padding: 14px 18px; border-radius: 8px; }
        
        .service-row { flex-direction: column; gap: 8px; }
        .service-name-input, .service-price-input { width: 100%; flex: none; }
        
        .action-buttons { flex-direction: column; padding: 12px 16px; gap: 10px; }
        .action-btn { width: 100%; justify-content: center; padding: 14px 20px; border-radius: 8px; }
        
        .modal-box { margin: 20px; padding: 24px 20px; }
        .modal-btns { flex-direction: column; }
        .modal-btns .action-btn { width: 100%; }
        
        .edit-controls { bottom: 170px; right: 16px; }
      }
      
      @media (max-width: 480px) {
        .contract-page { padding: 20px 14px; }
        .contract-title { font-size: 16px; letter-spacing: 2px; }
      }
    </style>
</head>
<body>
    <div class="contract-wrapper" id="contract-content">
      <div class="contract-page">
        
        <header class="contract-header">
          <input type="text" class="contract-title editable-field" id="contract-title" value="마 케 팅 서 비 스 계 약 서" style="border:none; background:transparent; text-align:center; width:100%; font-size:inherit; font-weight:inherit; letter-spacing:inherit;" readonly>
          <p class="contract-subtitle">Marketing Service Agreement</p>
        </header>
        
        <div class="contract-date-row">
          계약일자: <input type="date" class="editable-field" id="contract-date-input" style="border:none; background:transparent; font-size:inherit;" readonly>
        </div>
        
        <!-- 제1조 당사자 -->
        <div class="section">
          <h2 class="section-title">제1조 당사자</h2>
          
          <table>
            <tr><td colspan="4" class="party-header">서비스 제공자 (이하 "제공자")</td></tr>
            <tr>
              <th>상 호</th>
              <td><input type="text" class="input-field" id="company-name" value="컴바인티엔비 (COMBINE T&B)"></td>
              <th>대 표</th>
              <td><input type="text" class="input-field" id="company-rep" value="방익주"></td>
            </tr>
            <tr>
              <th>연락처</th>
              <td><input type="text" class="input-field" id="company-phone" value="010-4845-3065"></td>
              <th>이메일</th>
              <td><input type="text" class="input-field" id="company-email" value="comtnb@gmail.com"></td>
            </tr>
          </table>
          
          <table>
            <tr><td colspan="4" class="party-header">고객사 (이하 "고객사")</td></tr>
            <tr>
              <th>상 호</th>
              <td><input type="text" class="input-field" id="client-company" placeholder="상호/업체명"></td>
              <th>대 표</th>
              <td><input type="text" class="input-field" id="client-name" placeholder="대표자명"></td>
            </tr>
            <tr>
              <th>연락처</th>
              <td><input type="tel" class="input-field" id="client-phone" placeholder="010-0000-0000"></td>
              <th>이메일</th>
              <td><input type="email" class="input-field" id="client-email" placeholder="이메일 (선택)"></td>
            </tr>
            <tr>
              <th>주 소</th>
              <td colspan="3"><input type="text" class="input-field" id="client-address" placeholder="사업장 주소 (선택)"></td>
            </tr>
          </table>
        </div>
        
        <!-- 제2조 계약 서비스 -->
        <div class="section">
          <h2 class="section-title">제2조 계약 서비스</h2>
          <p style="font-size:12px; color:#666; margin-bottom:12px;">※ 서비스 항목과 금액을 직접 입력해 주세요</p>
          
          <div id="service-list">
            <div class="service-row" data-row="1">
              <input type="text" class="service-name-input" placeholder="서비스 항목명" data-name>
              <input type="number" class="service-price-input" placeholder="금액" data-price>
              <button type="button" class="remove-service-btn" onclick="removeServiceRow(this)">✕</button>
            </div>
            <div class="service-row" data-row="2">
              <input type="text" class="service-name-input" placeholder="서비스 항목명" data-name>
              <input type="number" class="service-price-input" placeholder="금액" data-price>
              <button type="button" class="remove-service-btn" onclick="removeServiceRow(this)">✕</button>
            </div>
          </div>
          <button type="button" class="add-service-btn" onclick="addServiceRow()">+ 서비스 항목 추가</button>
          
          <div style="margin-top:15px; padding-top:15px; border-top:1px solid #eee;">
            <div style="font-size:12px; color:#666; margin-bottom:5px;">기타/추가 서비스 (직접 입력):</div>
            <input type="text" class="input-field input-field-border" id="etc-service" placeholder="추가 요청사항 직접 입력">
          </div>
        </div>
        
        <!-- 제3조 계약 금액 -->
        <div class="section">
          <h2 class="section-title">제3조 계약 금액</h2>
          <table>
            <tr>
              <th>셋팅비</th>
              <td><input type="number" class="input-field" id="setup-fee" placeholder="0" style="text-align:right;" oninput="calcTotal()"> 원</td>
            </tr>
            <tr>
              <th>월관리비</th>
              <td><input type="number" class="input-field" id="monthly-fee" placeholder="0" style="text-align:right;" oninput="calcTotal()"> 원/월</td>
            </tr>
            <tr class="total-row">
              <th>총 계약금액</th>
              <td id="total-display" style="text-align:right;">￦ 0</td>
            </tr>
            <tr>
              <th>부가세</th>
              <td style="font-size:13px;">
                <label style="display:inline-flex; align-items:center; gap:6px; margin-right:15px; cursor:pointer;">
                  <input type="checkbox" id="vat-card" style="width:16px; height:16px;"> 카드 발행 시 (+10%)
                </label>
                <label style="display:inline-flex; align-items:center; gap:6px; cursor:pointer;">
                  <input type="checkbox" id="vat-cash" style="width:16px; height:16px;"> 현금영수증 발행 시 (+10%)
                </label>
              </td>
            </tr>
            <tr class="total-row">
              <th>최종 금액</th>
              <td id="final-display" style="text-align:right; color:#e11d48;">￦ 0</td>
            </tr>
          </table>
          <p style="font-size:12px; color:#888; margin-top:5px;">* 서비스 항목 합계 + 셋팅비 + 월관리비 = 총 계약금액<br>* 카드 발행 또는 현금영수증 발행 시 부가세(10%) 별도</p>
        </div>
        
        <!-- 제4조 결제 방식 -->
        <div class="section">
          <h2 class="section-title">제4조 결제 방식</h2>
          
          <div class="payment-row">
            <label class="payment-item">
              <input type="radio" name="pay-method" value="card">
              <span>☐ 카드결제</span>
            </label>
            <label class="payment-item">
              <input type="radio" name="pay-method" value="cash">
              <span>☐ 현금/계좌이체</span>
            </label>
          </div>
          
          <div class="bank-info-box" id="bank-box">
            <strong>입금 계좌</strong>
            <div style="margin-top:8px;">
              <input type="text" class="input-field" id="bank-name" value="케이뱅크 (K-Bank)" style="border:1px solid #ccc; padding:6px; border-radius:4px; margin-bottom:5px;" placeholder="은행명">
              <input type="text" class="input-field" id="bank-account" value="100-124-491987" style="border:1px solid #ccc; padding:6px; border-radius:4px; margin-bottom:5px;" placeholder="계좌번호">
              <input type="text" class="input-field" id="bank-holder" value="방익주" style="border:1px solid #ccc; padding:6px; border-radius:4px;" placeholder="예금주">
            </div>
          </div>
          
          <table style="margin-top:20px;">
            <tr>
              <th>서비스 시작일</th>
              <td><input type="date" class="input-field input-field-border" id="start-date"></td>
            </tr>
            <tr>
              <th>계약시 입금액</th>
              <td><input type="text" class="input-field" id="initial-pay-amount" placeholder="0" style="text-align:right; border:1px solid #ccc; padding:8px; border-radius:4px;" oninput="formatNumber(this)"> 원</td>
            </tr>
            <tr>
              <th>정기 결제일</th>
              <td>
                매월 <input type="number" class="input-field" id="pay-day" placeholder="1" style="width:50px; text-align:center; border:1px solid #ccc; padding:5px; border-radius:4px;" min="1" max="31">일
              </td>
            </tr>
            <tr>
              <th>매월 결제금액</th>
              <td><input type="text" class="input-field" id="monthly-pay-amount" placeholder="0" style="text-align:right; border:1px solid #ccc; padding:8px; border-radius:4px;" oninput="formatNumber(this)"> 원</td>
            </tr>
          </table>
          
          <div style="margin-top:15px; padding:15px; background:#f9f9f9; border:1px solid #ddd; border-radius:6px;">
            <label style="display:flex; align-items:flex-start; gap:10px; cursor:pointer;">
              <input type="checkbox" id="sms-agree" style="width:20px; height:20px; margin-top:2px; accent-color:#333;">
              <span style="font-size:13px; line-height:1.6;">
                <strong>결제 알림 수신 동의</strong><br>
                <span style="color:#666;">매월 정기 결제일 2일 전, 문자/카카오톡으로 결제 안내 메시지가 발송됩니다.</span>
              </span>
            </label>
          </div>
        </div>
        
        <!-- 제5조 계약 조건 -->
        <div class="section">
          <h2 class="section-title">제5조 계약 조건</h2>
          <div class="terms-content">
            <h4>1. 서비스 범위</h4>
            <ol>
              <li>제공자는 본 계약서에 명시된 서비스를 성실히 수행한다.</li>
              <li>서비스 범위는 본 계약서에 명시된 내용에 한하며, 추가 서비스는 별도 협의한다.</li>
            </ol>
            
            <h4>2. 계약 기간</h4>
            <ol>
              <li>셋팅 서비스: 계약일로부터 30일 이내 완료</li>
              <li>월 관리 서비스: 계약일로부터 명시된 기간 동안 유효</li>
              <li>계약 만료 7일 전까지 별도 통보가 없으면 동일 조건으로 자동 연장</li>
            </ol>
            
            <h4>3. 비용 및 결제</h4>
            <ol>
              <li>계약 금액은 본 계약서에 명시된 금액(VAT 포함)으로 한다.</li>
              <li>광고비는 본 계약 금액에 포함되지 않으며 별도 정산한다.</li>
              <li>고객사은 정해진 결제일에 월 결제 금액을 납부한다.</li>
            </ol>
            
            <h4>4. 환불 규정</h4>
            <ol>
              <li>서비스 시작 전: 100% 환불</li>
              <li>서비스 시작 후 7일 이내: 50% 환불</li>
              <li>서비스 시작 후 7일 경과: 환불 불가</li>
            </ol>
            
            <h4>5. 비밀유지 및 분쟁해결</h4>
            <p>제공자와 고객사은 본 계약 관련 취득한 영업비밀 및 개인정보를 제3자에게 누설하지 않으며, 분쟁 발생 시 제공자의 소재지 관할 법원에서 해결한다.</p>
          </div>
          
          <div class="agree-box">
            <label>
              <input type="checkbox" id="agree-check">
              위 계약 내용을 모두 확인하였으며, 이에 동의합니다.
            </label>
          </div>
        </div>
        
        <!-- 비고 (요청사항/특이사항) -->
        <div class="section">
          <h2 class="section-title">비고 (요청사항 / 특이사항)</h2>
          <textarea id="remarks" class="input-field" style="width:100%; min-height:100px; padding:12px; border:1px solid #ccc; border-radius:6px; font-size:14px; line-height:1.6; resize:vertical;" placeholder="요청사항이나 특이사항을 입력해 주세요."></textarea>
        </div>
        
        <!-- 제6조 서명 -->
        <div class="section signature-section">
          <h2 class="section-title">제6조 서명 날인</h2>
          <p style="font-size:12px; color:#666; margin-bottom:12px;">본 계약의 성립을 증명하기 위하여 제공자와 고객사가 서명 날인 후 각 1통씩 보관한다.</p>
          
          <table class="signature-table">
            <tr>
              <td colspan="2" class="party-header">서비스 제공자</td>
              <td colspan="2" class="party-header">고객사</td>
            </tr>
            <tr>
              <th>상호</th>
              <td><input type="text" class="sig-input" id="sig-provider-company" value="컴바인티엔비" placeholder="상호"></td>
              <th>상호</th>
              <td id="sig-company">-</td>
            </tr>
            <tr>
              <th>대표</th>
              <td><input type="text" class="sig-input" id="sig-provider-rep" value="방익주" placeholder="대표자명"></td>
              <th>대표</th>
              <td id="sig-name">-</td>
            </tr>
            <tr>
              <th>연락처</th>
              <td><input type="tel" class="sig-input" id="sig-provider-phone" value="010-4845-3065" placeholder="연락처"></td>
              <th>연락처</th>
              <td id="sig-phone">-</td>
            </tr>
            <tr>
              <th>이메일</th>
              <td><input type="email" class="sig-input" id="sig-provider-email" value="comtnb@gmail.com" placeholder="이메일"></td>
              <th>이메일</th>
              <td id="sig-email">-</td>
            </tr>
            <tr>
              <th>서명</th>
              <td>
                <div class="signature-canvas-box" style="background:#fff; display:flex; align-items:center; justify-content:center;">
                  <img src="data:image/png;base64,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" alt="방익주 서명" style="max-width:180px; max-height:75px; object-fit:contain;" />
                </div>
              </td>
              <th>서명</th>
              <td>
                <div class="signature-canvas-box">
                  <canvas id="canvas-client" class="signature-canvas"></canvas>
                </div>
                <button type="button" class="clear-sig-btn no-print" onclick="clearCanvas('client')">지우기</button>
              </td>
            </tr>
          </table>
          
          <div class="contract-footer">
            <input type="number" id="footer-year" class="editable-field" style="width:50px; border:none; background:transparent; text-align:right; font-size:inherit;" readonly>년 
            <input type="number" id="footer-month" class="editable-field" style="width:30px; border:none; background:transparent; text-align:right; font-size:inherit;" min="1" max="12" readonly>월 
            <input type="number" id="footer-day" class="editable-field" style="width:30px; border:none; background:transparent; text-align:right; font-size:inherit;" min="1" max="31" readonly>일
          </div>
        </div>
        
      </div>
    </div>
    
    <!-- 편집 모드 배너 -->
    <div id="edit-banner" style="display:none; position:fixed; top:0; left:0; right:0; background:#333; color:#fff; padding:10px; text-align:center; z-index:1000; font-size:14px;">
      ✏️ 편집 모드 | 모든 내용을 수정할 수 있습니다
    </div>
    
    <!-- 버튼 -->
    <div class="action-buttons no-print">
      <button type="button" class="action-btn secondary" onclick="window.print()">🖨️ 인쇄</button>
      <button type="button" class="action-btn secondary" onclick="toggleEditMode()" id="edit-btn">✏️ 편집</button>
      <button type="button" class="action-btn primary" onclick="saveContract()" id="save-btn" style="display:none;">💾 저장</button>
      <button type="button" class="action-btn share" onclick="shareContract()" id="share-btn" style="display:none;">🔗 링크 공유</button>
      <button type="button" class="action-btn kakao" onclick="openKakaoSendModal()" style="background:#FEE500; color:#191919;">💬 카카오톡 발송</button>
      <button type="button" class="action-btn primary" id="submit-btn" onclick="submitForm()" disabled>✍️ 계약 완료</button>
    </div>
    
    <!-- 저장 완료 모달 -->
    <div class="modal-bg" id="save-modal">
      <div class="modal-box">
        <div class="modal-icon">✓</div>
        <h3 class="modal-title">저장 완료</h3>
        <p class="modal-desc">계약서가 저장되었습니다.<br>아래 링크를 고객에게 전달하세요.</p>
        <div class="share-link-box" id="saved-link"></div>
        <button class="copy-btn" onclick="copySavedLink()" style="margin-top:10px; padding:10px 20px; cursor:pointer;">📋 링크 복사</button>
        <div style="margin-top:15px;">
          <button class="action-btn secondary" onclick="closeSaveModal()" style="width:100%;">확인</button>
        </div>
      </div>
    </div>
    
    <!-- 완료 모달 -->
    <div class="modal-bg" id="done-modal">
      <div class="modal-box">
        <div class="modal-icon">✓</div>
        <h3 class="modal-title">계약서 작성 완료</h3>
        <p class="modal-desc">계약서가 성공적으로 작성되었습니다.</p>
        <div class="modal-btns">
          <button class="action-btn secondary" onclick="closeModal()">닫기</button>
          <button class="action-btn primary" id="pdf-btn" onclick="downloadPDF()">📄 PDF 다운로드</button>
        </div>
      </div>
    </div>
    
    <!-- 공유 모달 -->
    <div class="modal-bg" id="share-modal">
      <div class="modal-box">
        <h3 class="modal-title">🔗 계약서 공유</h3>
        <p class="modal-desc">아래 링크를 고객에게 전달하세요.<br>고객이 링크를 열면 계약서를 작성할 수 있습니다.</p>
        <div class="share-link-box" id="share-link-text"></div>
        <button class="copy-btn" onclick="copyShareLink()">📋 링크 복사</button>
        <div style="margin-top:15px;">
          <button class="action-btn secondary" onclick="closeShareModal()" style="width:100%;">닫기</button>
        </div>
      </div>
    </div>
    
    <!-- 카카오톡 발송 모달 -->
    <div class="modal-bg" id="kakao-modal">
      <div class="modal-box" style="max-width:400px;">
        <h3 class="modal-title">💬 카카오톡으로 계약서 발송</h3>
        <p class="modal-desc">고객에게 카카오 알림톡으로 계약서 링크를 발송합니다.</p>
        
        <div style="text-align:left; margin-bottom:15px;">
          <label style="display:block; font-size:13px; font-weight:600; margin-bottom:5px;">고객 이름</label>
          <input type="text" id="kakao-client-name" class="input-field input-field-border" placeholder="홍길동" style="width:100%;">
        </div>
        
        <div style="text-align:left; margin-bottom:15px;">
          <label style="display:block; font-size:13px; font-weight:600; margin-bottom:5px;">휴대폰 번호</label>
          <input type="tel" id="kakao-client-phone" class="input-field input-field-border" placeholder="010-1234-5678" style="width:100%;">
        </div>
        
        <div style="background:#f5f5f5; padding:12px; border-radius:6px; margin-bottom:15px; text-align:left;">
          <div style="font-size:12px; color:#666; margin-bottom:5px;">발송될 메시지 미리보기</div>
          <div style="font-size:13px; line-height:1.6;">
            [컴바인티엔비]<br>
            <span id="kakao-preview-name">고객</span>님, 안녕하세요.<br>
            마케팅 서비스 계약서가 도착했습니다.<br>
            아래 링크에서 확인해 주세요.<br>
            <span style="color:#2563eb;" id="kakao-preview-link">https://xivix.kr/contract</span>
          </div>
        </div>
        
        <button class="action-btn kakao" onclick="sendKakaoAlimtalk()" id="kakao-send-btn" style="width:100%; background:#FEE500; color:#191919; justify-content:center;">
          💬 카카오톡 발송
        </button>
        
        <div style="margin-top:10px;">
          <button class="action-btn secondary" onclick="closeKakaoModal()" style="width:100%;">취소</button>
        </div>
        
        <p style="font-size:11px; color:#999; margin-top:12px;">
          * 카카오 알림톡으로 발송됩니다.<br>
          * 수신자가 카카오톡 미사용 시 문자로 대체 발송됩니다.
        </p>
      </div>
    </div>
    
    <script>
      // ========================================
      // 편집 모드
      // ========================================
      let isEditMode = false;
      let savedContractId = null;
      
      function toggleEditMode() {
        isEditMode = !isEditMode;
        const editBtn = document.getElementById('edit-btn');
        const saveBtn = document.getElementById('save-btn');
        const shareBtn = document.getElementById('share-btn');
        const banner = document.getElementById('edit-banner');
        
        if (isEditMode) {
          // 편집 모드 ON
          editBtn.textContent = '✖ 편집 취소';
          saveBtn.style.display = 'inline-flex';
          banner.style.display = 'block';
          document.body.style.paddingTop = '45px';
          
          // 모든 editable-field를 편집 가능하게
          document.querySelectorAll('.editable-field').forEach(el => {
            el.removeAttribute('readonly');
            el.style.background = '#fffbe6';
            el.style.border = '1px solid #f0c000';
          });
          
          // 모든 input-field도 하이라이트
          document.querySelectorAll('.input-field').forEach(el => {
            el.style.background = '#fffbe6';
          });
        } else {
          // 편집 모드 OFF
          editBtn.textContent = '✏️ 편집';
          saveBtn.style.display = 'none';
          if (!savedContractId) shareBtn.style.display = 'none';
          banner.style.display = 'none';
          document.body.style.paddingTop = '0';
          
          document.querySelectorAll('.editable-field').forEach(el => {
            el.setAttribute('readonly', 'readonly');
            el.style.background = 'transparent';
            el.style.border = 'none';
          });
          
          document.querySelectorAll('.input-field').forEach(el => {
            el.style.background = '';
          });
        }
      }
      
      // ========================================
      // 계약서 저장
      // ========================================
      async function saveContract() {
        const saveBtn = document.getElementById('save-btn');
        saveBtn.disabled = true;
        saveBtn.textContent = '⏳ 저장 중...';
        
        // 서비스 항목 수집
        const services = [];
        document.querySelectorAll('.service-row').forEach(row => {
          const name = row.querySelector('.service-name-input')?.value?.trim();
          const price = parseInt(row.querySelector('.service-price-input')?.value) || 0;
          if (name || price) services.push({ name, price });
        });
        
        const data = {
          title: document.getElementById('contract-title').value,
          contract_date: document.getElementById('contract-date-input').value,
          provider_company: document.getElementById('company-name').value,
          provider_rep: document.getElementById('company-rep').value,
          provider_phone: document.getElementById('company-phone').value,
          provider_email: document.getElementById('company-email').value,
          bank_name: document.getElementById('bank-name').value,
          bank_account: document.getElementById('bank-account').value,
          bank_holder: document.getElementById('bank-holder').value,
          services: services,
          extra_service_name: document.getElementById('extra-service-name')?.value || '',
          extra_service_price: parseInt(document.getElementById('extra-service-price')?.value?.replace(/,/g, '')) || 0,
          setup_fee: parseInt(document.getElementById('setup-fee').value) || 0,
          monthly_fee: parseInt(document.getElementById('monthly-fee').value) || 0,
          vat_type: document.getElementById('vat-card')?.checked ? 'card' : (document.getElementById('vat-cash')?.checked ? 'cash' : ''),
          payment_method: document.querySelector('input[name="pay-method"]:checked')?.value || '',
          start_date: document.getElementById('start-date').value,
          payment_day: parseInt(document.getElementById('pay-day').value) || 0,
          initial_amount: parseInt(document.getElementById('initial-pay-amount').value.replace(/,/g, '')) || 0,
          monthly_amount: parseInt(document.getElementById('monthly-pay-amount').value.replace(/,/g, '')) || 0,
          sms_agree: document.getElementById('sms-agree').checked,
          remarks: document.getElementById('remarks').value
        };
        
        try {
          const res = await fetch('/api/contracts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
          const result = await res.json();
          
          if (result.success) {
            savedContractId = result.id;
            const link = window.location.origin + '/contract/' + result.id;
            document.getElementById('saved-link').textContent = link;
            document.getElementById('save-modal').classList.add('show');
            document.getElementById('share-btn').style.display = 'inline-flex';
            
            // 편집 모드 종료
            toggleEditMode();
          } else {
            alert('❌ 저장 실패: ' + result.error);
          }
        } catch (e) {
          alert('❌ 오류: ' + e.message);
        } finally {
          saveBtn.disabled = false;
          saveBtn.textContent = '💾 저장';
        }
      }
      
      function copySavedLink() {
        const link = document.getElementById('saved-link').textContent;
        navigator.clipboard.writeText(link).then(() => {
          alert('✅ 링크가 복사되었습니다!');
        });
      }
      
      function closeSaveModal() {
        document.getElementById('save-modal').classList.remove('show');
      }
      
      // ========================================
      // 저장된 데이터 로드 (localStorage)
      // ========================================
      function loadSavedData() {
        const saved = localStorage.getItem('xivix_contract_company');
        if (saved) {
          const data = JSON.parse(saved);
          if (data.companyName) document.getElementById('company-name').value = data.companyName;
          if (data.companyRep) document.getElementById('company-rep').value = data.companyRep;
          if (data.companyPhone) document.getElementById('company-phone').value = data.companyPhone;
          if (data.companyEmail) document.getElementById('company-email').value = data.companyEmail;
          if (data.bankName) document.getElementById('bank-name').value = data.bankName;
          if (data.bankAccount) document.getElementById('bank-account').value = data.bankAccount;
          if (data.bankHolder) document.getElementById('bank-holder').value = data.bankHolder;
        }
      }
      
      loadSavedData();
      
      // ========================================
      // 서비스 항목 관리
      // ========================================
      let serviceRowCount = 2;
      
      function addServiceRow() {
        serviceRowCount++;
        const container = document.getElementById('service-list');
        const row = document.createElement('div');
        row.className = 'service-row';
        row.setAttribute('data-row', serviceRowCount);
        row.innerHTML = \`
          <input type="text" class="service-name-input" placeholder="서비스 항목명" data-name>
          <input type="number" class="service-price-input" placeholder="금액" data-price oninput="calcTotal()">
          <button type="button" class="remove-service-btn" onclick="removeServiceRow(this)">✕</button>
        \`;
        container.appendChild(row);
        
        row.querySelector('[data-price]').addEventListener('input', calcTotal);
      }
      
      function removeServiceRow(btn) {
        const rows = document.querySelectorAll('.service-row');
        if (rows.length > 1) {
          btn.closest('.service-row').remove();
          calcTotal();
        }
      }
      
      // ========================================
      // 금액 계산
      // ========================================
      function calcTotal() {
        let serviceTotal = 0;
        document.querySelectorAll('.service-price-input').forEach(input => {
          serviceTotal += parseInt(input.value) || 0;
        });
        
        const setupFee = parseInt(document.getElementById('setup-fee').value) || 0;
        const monthlyFee = parseInt(document.getElementById('monthly-fee').value) || 0;
        
        const total = serviceTotal + setupFee + monthlyFee;
        document.getElementById('total-display').textContent = '￦ ' + total.toLocaleString();
        
        // 부가세 계산 (카드 또는 현금영수증 발행 시)
        const vatCard = document.getElementById('vat-card').checked;
        const vatCash = document.getElementById('vat-cash').checked;
        
        let finalTotal = total;
        if (vatCard || vatCash) {
          finalTotal = Math.round(total * 1.1);
        }
        document.getElementById('final-display').textContent = '￦ ' + finalTotal.toLocaleString();
        
        checkValid();
      }
      
      document.querySelectorAll('.service-price-input').forEach(input => {
        input.addEventListener('input', calcTotal);
      });
      
      // 부가세 체크박스 이벤트
      document.getElementById('vat-card').addEventListener('change', calcTotal);
      document.getElementById('vat-cash').addEventListener('change', calcTotal);
      
      // ========================================
      // 결제 방식
      // ========================================
      document.querySelectorAll('input[name="pay-method"]').forEach(r => {
        r.addEventListener('change', function() {
          document.getElementById('bank-box').classList.toggle('show', this.value === 'cash');
          checkValid();
        });
      });
      
      // ========================================
      // 고객 정보 연동 (고객사)
      // ========================================
      document.getElementById('client-company').addEventListener('input', e => {
        document.getElementById('sig-company').textContent = e.target.value || '-';
      });
      document.getElementById('client-name').addEventListener('input', e => {
        document.getElementById('sig-name').textContent = e.target.value || '-';
      });
      document.getElementById('client-phone').addEventListener('input', e => {
        document.getElementById('sig-phone').textContent = e.target.value || '-';
      });
      document.getElementById('client-email').addEventListener('input', e => {
        document.getElementById('sig-email').textContent = e.target.value || '-';
      });
      
      // ========================================
      // 제공자 정보 연동 (서명란 ↔ 제1조)
      // ========================================
      // 서명란 → 제1조 연동
      document.getElementById('sig-provider-company').addEventListener('input', e => {
        document.getElementById('company-name').value = e.target.value;
      });
      document.getElementById('sig-provider-rep').addEventListener('input', e => {
        document.getElementById('company-rep').value = e.target.value;
      });
      document.getElementById('sig-provider-phone').addEventListener('input', e => {
        document.getElementById('company-phone').value = e.target.value;
      });
      document.getElementById('sig-provider-email').addEventListener('input', e => {
        document.getElementById('company-email').value = e.target.value;
      });
      
      // 제1조 → 서명란 연동
      document.getElementById('company-name').addEventListener('input', e => {
        document.getElementById('sig-provider-company').value = e.target.value;
      });
      document.getElementById('company-rep').addEventListener('input', e => {
        document.getElementById('sig-provider-rep').value = e.target.value;
      });
      document.getElementById('company-phone').addEventListener('input', e => {
        document.getElementById('sig-provider-phone').value = e.target.value;
      });
      document.getElementById('company-email').addEventListener('input', e => {
        document.getElementById('sig-provider-email').value = e.target.value;
      });
      
      // ========================================
      // 서명 캔버스
      // ========================================
      function initCanvas(id) {
        const box = document.getElementById('canvas-' + id).parentElement;
        const canvas = document.getElementById('canvas-' + id);
        const ctx = canvas.getContext('2d');
        let drawing = false, lx = 0, ly = 0;
        
        function resize() {
          const r = box.getBoundingClientRect();
          canvas.width = r.width * 2;
          canvas.height = r.height * 2;
          ctx.scale(2, 2);
          ctx.strokeStyle = '#000';
          ctx.lineWidth = 2;
          ctx.lineCap = 'round';
        }
        resize();
        window.addEventListener('resize', resize);
        
        function getPos(e) {
          const r = canvas.getBoundingClientRect();
          const t = e.touches ? e.touches[0] : e;
          return { x: t.clientX - r.left, y: t.clientY - r.top };
        }
        
        function start(e) { e.preventDefault(); drawing = true; const p = getPos(e); lx = p.x; ly = p.y; }
        function draw(e) {
          if (!drawing) return;
          e.preventDefault();
          const p = getPos(e);
          ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(p.x, p.y); ctx.stroke();
          lx = p.x; ly = p.y;
          checkValid();
        }
        function stop() { drawing = false; }
        
        canvas.addEventListener('mousedown', start);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stop);
        canvas.addEventListener('mouseout', stop);
        canvas.addEventListener('touchstart', start);
        canvas.addEventListener('touchmove', draw);
        canvas.addEventListener('touchend', stop);
        
        return {
          canvas, ctx,
          hasData: () => {
            const d = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
            for (let i = 3; i < d.length; i += 4) if (d[i] > 0) return true;
            return false;
          },
          clear: () => ctx.clearRect(0, 0, canvas.width, canvas.height)
        };
      }
      
      // 고객사 서명 캔버스만 초기화 (제공자는 이미지로 고정)
      const canvasClient = initCanvas('client');
      
      function clearCanvas(type) {
        if (type === 'client') canvasClient.clear();
        checkValid();
      }
      
      // ========================================
      // 금액 포맷 (천 단위 콤마)
      // ========================================
      function formatNumber(input) {
        // 숫자만 추출
        let value = input.value.replace(/[^0-9]/g, '');
        // 천 단위 콤마 추가
        if (value) {
          value = parseInt(value).toLocaleString();
        }
        input.value = value;
      }
      
      // ========================================
      // 유효성 검사
      // ========================================
      document.getElementById('agree-check').addEventListener('change', checkValid);
      
      function checkValid() {
        const company = document.getElementById('client-company').value.trim();
        const name = document.getElementById('client-name').value.trim();
        const phone = document.getElementById('client-phone').value.trim();
        const agreed = document.getElementById('agree-check').checked;
        const payment = document.querySelector('input[name="pay-method"]:checked');
        
        let hasService = false;
        document.querySelectorAll('.service-name-input').forEach(input => {
          if (input.value.trim()) hasService = true;
        });
        
        const hasSig = canvasClient.hasData();
        
        document.getElementById('submit-btn').disabled = !(company && name && phone && agreed && payment && hasService && hasSig);
      }
      
      ['client-company', 'client-name', 'client-phone'].forEach(id => {
        document.getElementById(id).addEventListener('input', checkValid);
      });
      
      // ========================================
      // 링크 공유
      // ========================================
      function shareContract() {
        const url = window.location.href.split('?')[0];
        document.getElementById('share-link-text').textContent = url;
        document.getElementById('share-modal').classList.add('show');
      }
      
      function copyShareLink() {
        const link = document.getElementById('share-link-text').textContent;
        navigator.clipboard.writeText(link).then(() => {
          alert('✅ 링크가 복사되었습니다!');
        });
      }
      
      function closeShareModal() {
        document.getElementById('share-modal').classList.remove('show');
      }
      
      // ========================================
      // 카카오톡 발송
      // ========================================
      function openKakaoSendModal() {
        const url = window.location.href.split('?')[0];
        document.getElementById('kakao-preview-link').textContent = url;
        document.getElementById('kakao-modal').classList.add('show');
        
        // 이름 입력시 미리보기 업데이트
        document.getElementById('kakao-client-name').addEventListener('input', function() {
          document.getElementById('kakao-preview-name').textContent = this.value || '고객';
        });
      }
      
      function closeKakaoModal() {
        document.getElementById('kakao-modal').classList.remove('show');
      }
      
      async function sendKakaoAlimtalk() {
        const clientName = document.getElementById('kakao-client-name').value.trim();
        const clientPhone = document.getElementById('kakao-client-phone').value.trim();
        const contractUrl = window.location.href.split('?')[0];
        const companyName = document.getElementById('company-name').value.split('(')[0].trim();
        
        if (!clientName) {
          alert('고객 이름을 입력해 주세요.');
          return;
        }
        
        if (!clientPhone) {
          alert('휴대폰 번호를 입력해 주세요.');
          return;
        }
        
        // 전화번호 유효성 검사
        const phoneRegex = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/;
        if (!phoneRegex.test(clientPhone.replace(/-/g, ''))) {
          alert('올바른 휴대폰 번호를 입력해 주세요.');
          return;
        }
        
        const btn = document.getElementById('kakao-send-btn');
        btn.disabled = true;
        btn.textContent = '발송 중...';
        
        try {
          const response = await fetch('/api/alimtalk/send-contract', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              phone: clientPhone,
              clientName: clientName,
              contractUrl: contractUrl,
              companyName: companyName
            })
          });
          
          const result = await response.json();
          
          if (result.success) {
            alert('✅ 카카오톡 발송 완료!\\n\\n' + clientName + '님에게 계약서 링크가 발송되었습니다.');
            closeKakaoModal();
            
            // 입력 필드 초기화
            document.getElementById('kakao-client-name').value = '';
            document.getElementById('kakao-client-phone').value = '';
          } else {
            // API 키가 설정되지 않은 경우 대체 방법 안내
            if (result.error && result.error.includes('not configured')) {
              if (confirm('카카오 알림톡이 아직 설정되지 않았습니다.\\n\\n카카오톡 공유하기로 대체 발송하시겠습니까?')) {
                shareViaKakaoLink(clientName, contractUrl);
              }
            } else {
              alert('발송 실패: ' + (result.error || '알 수 없는 오류'));
            }
          }
        } catch (error) {
          // 네트워크 오류 시 카카오 공유하기로 대체
          if (confirm('서버 연결에 실패했습니다.\\n\\n카카오톡 공유하기로 대체 발송하시겠습니까?')) {
            shareViaKakaoLink(clientName, contractUrl);
          }
        } finally {
          btn.disabled = false;
          btn.textContent = '💬 카카오톡 발송';
        }
      }
      
      // 카카오톡 공유하기 (대체 방법)
      function shareViaKakaoLink(clientName, contractUrl) {
        const message = '[컴바인티엔비] ' + clientName + '님, 마케팅 서비스 계약서가 도착했습니다. ' + contractUrl;
        
        // 카카오톡 공유 URL 스킴 (모바일)
        if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          window.location.href = 'kakaotalk://msg/text/' + encodeURIComponent(message);
        } else {
          // PC에서는 링크 복사
          navigator.clipboard.writeText(message).then(() => {
            alert('✅ 메시지가 복사되었습니다!\\n\\n카카오톡에서 붙여넣기 해주세요.');
          });
        }
        closeKakaoModal();
      }
      
      // ========================================
      // 제출 및 PDF
      // ========================================
      function submitForm() {
        const btn = document.getElementById('submit-btn');
        btn.disabled = true;
        btn.textContent = '처리 중...';
        
        setTimeout(() => {
          document.getElementById('done-modal').classList.add('show');
          btn.textContent = '✓ 완료';
        }, 1000);
      }
      
      function closeModal() {
        document.getElementById('done-modal').classList.remove('show');
        document.getElementById('submit-btn').textContent = '✍️ 계약 완료';
        document.getElementById('submit-btn').disabled = false;
      }
      
      async function downloadPDF() {
        const btn = document.getElementById('pdf-btn');
        btn.disabled = true;
        btn.textContent = '생성 중...';
        
        try {
          const el = document.getElementById('contract-content');
          const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: '#fff' });
          
          const { jsPDF } = window.jspdf;
          const pdf = new jsPDF('p', 'mm', 'a4');
          
          const pW = pdf.internal.pageSize.getWidth();
          const pH = pdf.internal.pageSize.getHeight();
          const ratio = pW / canvas.width;
          const scaledH = canvas.height * ratio;
          
          let y = 0;
          while (y < scaledH) {
            if (y > 0) pdf.addPage();
            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, -y, pW, scaledH);
            y += pH;
          }
          
          const clientName = document.getElementById('client-name').value || 'customer';
          const d = new Date();
          const fname = '마케팅서비스계약서_' + clientName + '_' + d.getFullYear() + String(d.getMonth()+1).padStart(2,'0') + String(d.getDate()).padStart(2,'0') + '.pdf';
          
          pdf.save(fname);
          btn.textContent = '✓ 완료';
          setTimeout(() => { btn.textContent = '📄 PDF 다운로드'; btn.disabled = false; }, 2000);
        } catch (err) {
          alert('PDF 생성 오류: ' + err.message);
          btn.textContent = '📄 PDF 다운로드';
          btn.disabled = false;
        }
      }
      
      // ========================================
      // 초기화
      // ========================================
      const now = new Date();
      const dateStr = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0') + '-' + String(now.getDate()).padStart(2,'0');
      document.getElementById('contract-date-input').value = dateStr;
      document.getElementById('footer-year').value = now.getFullYear();
      document.getElementById('footer-month').value = now.getMonth()+1;
      document.getElementById('footer-day').value = now.getDate();
      document.getElementById('start-date').valueAsDate = now;
      document.getElementById('pay-day').value = now.getDate();
      

    </script>
</body>
</html>`;
}

// ========================================
// 고객용 계약서 뷰 (저장된 계약서 조회/서명)
// ========================================
function getContractViewHTML(id: string): string {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>마케팅 서비스 계약서 - 컴바인티엔비</title>
  <meta name="robots" content="noindex, nofollow">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap" rel="stylesheet">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { 
      font-family:'Noto Sans KR',-apple-system,sans-serif; 
      background:#f0f2f5; 
      color:#1a1a1a; 
      line-height:1.6; 
      font-size:15px;
      -webkit-font-smoothing: antialiased;
    }
    
    /* 로딩/에러 상태 */
    .loading { text-align:center; padding:100px 20px; font-size:18px; color:#666; }
    .loading::before { content:''; display:block; width:40px; height:40px; border:3px solid #ddd; border-top-color:#333; border-radius:50%; animation:spin 1s linear infinite; margin:0 auto 20px; }
    @keyframes spin { to { transform:rotate(360deg); } }
    .error { color:#c00; text-align:center; padding:100px 20px; font-size:16px; }
    
    /* 메인 래퍼 - 중앙 정렬 */
    .contract-wrapper { 
      max-width:720px; 
      margin:0 auto; 
      padding:20px 16px 160px;
    }
    
    /* 계약서 카드 */
    .contract-page { 
      background:#fff; 
      padding:32px 24px; 
      box-shadow:0 4px 20px rgba(0,0,0,0.08); 
      border-radius:16px;
    }
    
    /* 헤더 */
    .contract-header { 
      text-align:center; 
      border-bottom:3px double #222; 
      padding-bottom:24px; 
      margin-bottom:28px; 
    }
    .contract-title { 
      font-size:24px; 
      font-weight:700; 
      color:#111;
      margin-bottom:6px; 
    }
    .contract-subtitle { font-size:13px; color:#888; letter-spacing:1px; }
    .contract-date-row { 
      text-align:right; 
      font-size:14px; 
      color:#555; 
      margin-bottom:24px;
      padding:12px 16px;
      background:#f8f9fa;
      border-radius:8px;
    }
    
    /* 섹션 */
    .section { margin-bottom:28px; }
    .section-title { 
      font-size:16px; 
      font-weight:700; 
      color:#333;
      background:linear-gradient(135deg, #f8f9fa 0%, #fff 100%); 
      padding:14px 18px; 
      border-left:4px solid #333; 
      border-radius:0 8px 8px 0;
      margin-bottom:16px; 
    }
    .section-label { 
      font-weight:600; 
      font-size:13px;
      color:#666; 
      margin:16px 0 10px;
      display:flex;
      align-items:center;
      gap:6px;
    }
    .section-label::before { content:'▸'; color:#333; }
    
    /* 정보 행 - 깔끔한 한 줄 레이아웃 */
    .info-grid { 
      display:flex; 
      flex-direction:column; 
      gap:8px;
    }
    .info-row { 
      display:flex; 
      align-items:stretch;
      background:#fff;
      border:1px solid #e5e7eb; 
      border-radius:10px; 
      overflow:hidden;
    }
    .info-label { 
      background:#f8f9fa; 
      padding:14px 16px; 
      font-weight:600; 
      font-size:14px;
      color:#444;
      min-width:90px;
      max-width:90px;
      border-right:1px solid #e5e7eb; 
      display:flex; 
      align-items:center;
    }
    .info-value { 
      flex:1; 
      padding:14px 16px; 
      font-size:15px; 
      color:#222;
      word-break:break-all;
      display:flex;
      align-items:center;
    }
    .info-value.empty { color:#aaa; font-style:italic; }
    .info-value.highlight { 
      color:#c00; 
      font-weight:700; 
      font-size:17px; 
    }
    
    /* 서비스 테이블 */
    .service-table { 
      width:100%; 
      border-collapse:collapse; 
      margin-bottom:12px;
      border-radius:10px;
      overflow:hidden;
      border:1px solid #e5e7eb;
    }
    .service-table th, .service-table td { 
      padding:14px 16px; 
      text-align:left;
    }
    .service-table th { 
      background:#f8f9fa; 
      font-weight:600; 
      font-size:14px;
      color:#555;
      border-bottom:1px solid #e5e7eb;
    }
    .service-table td { 
      border-bottom:1px solid #f0f0f0;
      font-size:15px;
    }
    .service-table tr:last-child td { border-bottom:none; }
    .service-table .price { text-align:right; white-space:nowrap; font-weight:500; }
    .service-table .total-row { background:#fafafa; }
    .service-table .total-row td { font-weight:700; border-top:2px solid #e5e7eb; }
    .service-table .total-amount { color:#c00; font-size:18px; }
    
    /* 결제 방식 선택 */
    .payment-section { 
      margin-top:20px; 
      padding:20px; 
      background:#f8f9fa; 
      border-radius:12px;
      border:1px solid #e5e7eb;
    }
    .payment-title { 
      font-weight:700; 
      font-size:15px;
      color:#333;
      margin-bottom:14px;
      display:flex;
      align-items:center;
      gap:8px;
    }
    .payment-options { display:flex; flex-direction:column; gap:10px; }
    .payment-option { 
      display:flex; 
      align-items:center; 
      gap:12px; 
      padding:16px 18px; 
      background:#fff;
      border:2px solid #e5e7eb; 
      border-radius:10px; 
      cursor:pointer;
      transition:all 0.2s ease;
    }
    .payment-option:hover { border-color:#999; }
    .payment-option.selected { border-color:#333; background:#fff; box-shadow:0 2px 8px rgba(0,0,0,0.06); }
    .payment-option input[type="radio"] { 
      width:22px; height:22px; 
      accent-color:#333;
      cursor:pointer;
    }
    .payment-option-text { flex:1; }
    .payment-option-text .main { font-weight:600; font-size:15px; color:#222; }
    .payment-option-text .sub { font-size:12px; color:#888; margin-top:2px; }
    
    /* 입금계좌 정보 (현금 선택시만 표시) */
    .bank-info { 
      display:none; 
      margin-top:16px; 
      padding:18px 20px; 
      background:linear-gradient(135deg, #fff8e1 0%, #fffde7 100%); 
      border:1px solid #ffc107; 
      border-radius:10px;
    }
    .bank-info.show { display:block; animation:fadeIn 0.3s ease; }
    @keyframes fadeIn { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }
    .bank-info-title { font-weight:700; font-size:14px; color:#f57c00; margin-bottom:10px; display:flex; align-items:center; gap:6px; }
    .bank-info-account { font-size:17px; font-weight:700; color:#333; margin-bottom:4px; }
    .bank-info-holder { font-size:14px; color:#666; }
    
    /* 계약 조건 박스 */
    .terms-box { 
      background:#fafbfc; 
      padding:24px; 
      border:1px solid #e5e7eb; 
      border-radius:12px;
    }
    .terms-box ol { 
      padding-left:22px; 
      counter-reset:item;
      list-style:none;
    }
    .terms-box > ol > li { 
      margin-bottom:16px; 
      line-height:1.8; 
      font-size:14px;
      color:#444;
      position:relative;
      padding-left:8px;
    }
    .terms-box > ol > li::before {
      content: counter(item) ".";
      counter-increment: item;
      position:absolute;
      left:-22px;
      font-weight:700;
      color:#666;
    }
    .terms-box li strong { color:#222; font-weight:600; }
    .terms-box ul { 
      margin-top:8px; 
      padding-left:20px; 
      list-style:disc;
    }
    .terms-box ul li { 
      margin-bottom:6px; 
      font-size:13px;
      color:#555;
    }
    
    /* 비고란 - 크게 표시 */
    .remarks-section { margin-bottom:28px; }
    .remarks-box { 
      background:#fff; 
      border:2px solid #e0e0e0; 
      border-radius:12px; 
      padding:24px; 
      min-height:140px; 
      font-size:15px; 
      line-height:1.9; 
      white-space:pre-wrap;
      color:#333;
    }
    .remarks-box.empty { 
      color:#aaa; 
      font-style:italic;
      display:flex;
      align-items:center;
      justify-content:center;
      min-height:100px;
    }
    
    /* 서명 섹션 - 중앙 정렬 */
    .sig-section { margin-top:32px; }
    .sig-description { 
      font-size:13px; 
      color:#666; 
      text-align:center;
      margin-bottom:20px;
      padding:12px;
      background:#f8f9fa;
      border-radius:8px;
    }
    
    /* 서명 그리드 - 균등 배치 */
    .sig-grid { 
      display:grid; 
      grid-template-columns:1fr 1fr; 
      gap:16px; 
      margin-bottom:24px; 
    }
    .sig-box { 
      border:1px solid #e5e7eb; 
      border-radius:12px; 
      overflow:hidden;
      background:#fff;
    }
    .sig-box-header { 
      background:#f8f9fa; 
      padding:14px 16px; 
      font-weight:700; 
      font-size:14px;
      text-align:center; 
      border-bottom:1px solid #e5e7eb;
      color:#333;
    }
    .sig-box-content { padding:16px; }
    .sig-info { margin-bottom:12px; }
    .sig-info .label { 
      font-size:11px; 
      color:#888; 
      margin-bottom:3px; 
      text-transform:uppercase;
      letter-spacing:0.5px;
    }
    .sig-info .value { 
      font-size:14px; 
      font-weight:600; 
      color:#222;
    }
    .sig-area { 
      border:2px dashed #ccc; 
      border-radius:8px; 
      height:90px; 
      display:flex; 
      align-items:center; 
      justify-content:center; 
      background:#fafafa; 
      margin-top:12px;
      overflow:hidden;
    }
    .sig-area img { max-width:90%; max-height:70px; object-fit:contain; }
    .sig-canvas-wrap { width:100%; height:100%; position:relative; }
    .sig-canvas-wrap canvas { 
      width:100%; 
      height:100%; 
      display:block; 
      cursor:crosshair; 
      background:#fff;
      touch-action:none;
    }
    .clear-sig-btn { 
      display:block; 
      width:100%;
      margin-top:10px; 
      padding:10px 16px; 
      font-size:13px; 
      font-weight:500;
      cursor:pointer; 
      background:#fff; 
      border:1px solid #ddd; 
      border-radius:6px;
      color:#666;
      transition:all 0.2s;
    }
    .clear-sig-btn:hover { background:#f5f5f5; border-color:#bbb; }
    
    /* 계약일 표시 */
    .contract-footer-date { 
      text-align:center; 
      font-size:16px; 
      font-weight:600; 
      color:#333;
      padding:18px; 
      background:linear-gradient(135deg, #f8f9fa 0%, #fff 100%); 
      border-radius:10px;
      border:1px solid #e5e7eb;
    }
    
    /* 동의 체크박스 */
    .agree-section { 
      margin:24px 0; 
      padding:20px; 
      background:linear-gradient(135deg, #fffde7 0%, #fff8e1 100%); 
      border:2px solid #ffc107; 
      border-radius:12px;
    }
    .agree-section label { 
      display:flex; 
      align-items:flex-start; 
      gap:14px; 
      cursor:pointer; 
      font-size:15px; 
      font-weight:500;
      color:#333;
      line-height:1.5;
    }
    .agree-section input[type="checkbox"] { 
      width:24px; 
      height:24px; 
      min-width:24px;
      accent-color:#333;
      margin-top:2px;
    }
    
    /* 서명 완료 표시 */
    .signed-notice { 
      text-align:center; 
      padding:28px; 
      background:linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%); 
      border-radius:12px; 
      color:#2e7d32; 
      font-weight:700; 
      font-size:17px; 
      margin:24px 0;
      display:flex;
      align-items:center;
      justify-content:center;
      gap:10px;
    }
    
    /* 하단 액션 바 */
    .action-bar { 
      position:fixed; 
      bottom:0; 
      left:0; 
      right:0; 
      background:#fff; 
      padding:16px 20px; 
      padding-bottom:max(16px, env(safe-area-inset-bottom));
      box-shadow:0 -4px 20px rgba(0,0,0,0.1); 
      z-index:100;
    }
    .action-bar .btn-wrap { 
      max-width:720px; 
      margin:0 auto; 
      display:flex; 
      gap:12px; 
    }
    .btn { 
      flex:1; 
      padding:18px 24px; 
      border:none; 
      border-radius:12px; 
      cursor:pointer; 
      font-size:16px; 
      font-weight:700; 
      text-align:center;
      display:flex;
      align-items:center;
      justify-content:center;
      gap:8px;
      transition:all 0.2s;
    }
    .btn-primary { 
      background:#222; 
      color:#fff;
      box-shadow:0 4px 12px rgba(0,0,0,0.15);
    }
    .btn-primary:hover { background:#000; }
    .btn-primary:disabled { background:#bbb; cursor:not-allowed; box-shadow:none; }
    .btn-secondary { 
      background:#fff; 
      color:#333; 
      border:2px solid #333;
    }
    .btn-secondary:hover { background:#f5f5f5; }
    
    /* PC 반응형 */
    @media (min-width:768px) {
      .contract-wrapper { padding:40px 24px 140px; }
      .contract-page { padding:48px 56px; }
      .contract-title { font-size:28px; }
      .info-label { min-width:110px; max-width:110px; }
      .sig-area { height:100px; }
    }
    
    /* 모바일 반응형 */
    @media (max-width:480px) {
      .contract-wrapper { padding:12px 12px 160px; }
      .contract-page { padding:24px 18px; border-radius:12px; }
      .contract-title { font-size:20px; }
      .section-title { font-size:15px; padding:12px 14px; }
      .info-label { min-width:75px; max-width:75px; padding:12px; font-size:13px; }
      .info-value { padding:12px; font-size:14px; }
      .service-table th, .service-table td { padding:12px; font-size:14px; }
      .sig-grid { gap:12px; }
      .sig-box-header { padding:12px; font-size:13px; }
      .sig-box-content { padding:14px; }
      .sig-info .value { font-size:13px; }
      .btn { padding:16px 20px; font-size:15px; }
    }
    
    /* 인쇄 */
    @media print {
      body { background:#fff; }
      .contract-wrapper { padding:0; margin:0; max-width:100%; }
      .contract-page { box-shadow:none; border-radius:0; }
      .action-bar { display:none !important; }
      .payment-section { display:none !important; }
      .agree-section { display:none !important; }
    }
  </style>
</head>
<body>
  <div id="loading" class="loading">계약서를 불러오는 중...</div>
  <div id="content" style="display:none;">
    <div class="contract-wrapper">
      <div class="contract-page" id="contract-page"></div>
    </div>
    <div class="action-bar" id="action-bar"></div>
  </div>
  <div id="error" class="error" style="display:none;"></div>
  
  <script>
    const CONTRACT_ID = '${id}';
    let contractData = null;
    let clientCtx = null;
    let drawing = false, lx = 0, ly = 0;
    
    async function loadContract() {
      try {
        const res = await fetch('/api/contracts/' + CONTRACT_ID);
        const result = await res.json();
        if (!result.success) {
          showError('계약서를 찾을 수 없습니다.');
          return;
        }
        contractData = result.contract;
        renderContract();
        document.getElementById('loading').style.display = 'none';
        document.getElementById('content').style.display = 'block';
      } catch (e) {
        showError('오류: ' + e.message);
      }
    }
    
    function showError(msg) {
      document.getElementById('loading').style.display = 'none';
      document.getElementById('error').style.display = 'block';
      document.getElementById('error').innerHTML = '❌ ' + msg;
    }
    
    function formatDate(dateStr) {
      if (!dateStr) return '-';
      const d = new Date(dateStr);
      return d.getFullYear() + '년 ' + (d.getMonth()+1) + '월 ' + d.getDate() + '일';
    }
    
    function formatMoney(val) {
      const num = parseInt(val) || 0;
      return '₩' + num.toLocaleString();
    }
    
    function renderContract() {
      const d = contractData;
      const services = d.services || [];
      const isSigned = d.status === 'signed';
      
      // 서비스 목록 렌더링
      let serviceRows = '';
      let serviceTotal = 0;
      services.forEach(s => {
        if (s.name) {
          const price = parseInt(s.price) || 0;
          serviceTotal += price;
          serviceRows += '<tr><td>' + s.name + '</td><td class="price">' + formatMoney(price) + '</td></tr>';
        }
      });
      if (!serviceRows) {
        serviceRows = '<tr><td colspan="2" style="text-align:center;color:#aaa;padding:20px;">등록된 서비스 항목이 없습니다</td></tr>';
      }
      
      // 금액 계산
      const setupFee = parseInt(d.setup_fee) || 0;
      const monthlyFee = parseInt(d.monthly_fee) || 0;
      const total = serviceTotal + setupFee;
      
      // 고객정보 (관리자가 사전에 입력한 정보 - 읽기 전용)
      const clientCompany = d.client_company || '';
      const clientName = d.client_name || '';
      const clientPhone = d.client_phone || '';
      const clientEmail = d.client_email || '';
      const clientAddress = d.client_address || '';
      
      const html = \`
        <!-- 헤더 -->
        <header class="contract-header">
          <h1 class="contract-title">마케팅 서비스 계약서</h1>
          <p class="contract-subtitle">MARKETING SERVICE AGREEMENT</p>
        </header>
        
        <div class="contract-date-row">📅 계약일자: \${formatDate(d.contract_date)}</div>
        
        <!-- 제1조 당사자 -->
        <div class="section">
          <h2 class="section-title">제1조 당사자</h2>
          
          <div class="section-label">서비스 제공자</div>
          <div class="info-grid">
            <div class="info-row">
              <div class="info-label">상호</div>
              <div class="info-value">\${d.provider_company || '컴바인티엔비 (COMBINE T&B)'}</div>
            </div>
            <div class="info-row">
              <div class="info-label">대표</div>
              <div class="info-value">\${d.provider_rep || '방익주'}</div>
            </div>
            <div class="info-row">
              <div class="info-label">연락처</div>
              <div class="info-value">\${d.provider_phone || '010-4845-3065'}</div>
            </div>
            <div class="info-row">
              <div class="info-label">이메일</div>
              <div class="info-value">\${d.provider_email || 'comtnb@gmail.com'}</div>
            </div>
          </div>
          
          <div class="section-label">고객사 (계약자)</div>
          <div class="info-grid">
            <div class="info-row">
              <div class="info-label">상호</div>
              <div class="info-value \${!clientCompany ? 'empty' : ''}">\${clientCompany || '미입력'}</div>
            </div>
            <div class="info-row">
              <div class="info-label">대표</div>
              <div class="info-value \${!clientName ? 'empty' : ''}">\${clientName || '미입력'}</div>
            </div>
            <div class="info-row">
              <div class="info-label">연락처</div>
              <div class="info-value \${!clientPhone ? 'empty' : ''}">\${clientPhone || '미입력'}</div>
            </div>
            <div class="info-row">
              <div class="info-label">이메일</div>
              <div class="info-value \${!clientEmail ? 'empty' : ''}">\${clientEmail || '미입력'}</div>
            </div>
            <div class="info-row">
              <div class="info-label">주소</div>
              <div class="info-value \${!clientAddress ? 'empty' : ''}">\${clientAddress || '미입력'}</div>
            </div>
          </div>
        </div>
        
        <!-- 제2조 계약 서비스 -->
        <div class="section">
          <h2 class="section-title">제2조 계약 서비스</h2>
          <table class="service-table">
            <thead>
              <tr>
                <th style="width:60%">서비스 항목</th>
                <th style="width:40%">금액</th>
              </tr>
            </thead>
            <tbody>
              \${serviceRows}
              <tr>
                <td>셋팅비 (1회)</td>
                <td class="price">\${formatMoney(setupFee)}</td>
              </tr>
              <tr>
                <td>월 관리비</td>
                <td class="price">\${formatMoney(monthlyFee)} /월</td>
              </tr>
              <tr class="total-row">
                <td><strong>총 계약금액 (셋팅비 기준)</strong></td>
                <td class="price total-amount">\${formatMoney(total)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- 제3조 결제 정보 -->
        <div class="section">
          <h2 class="section-title">제3조 결제 정보</h2>
          <div class="info-grid">
            <div class="info-row">
              <div class="info-label">서비스 시작일</div>
              <div class="info-value">\${d.service_start_date || '-'}</div>
            </div>
            <div class="info-row">
              <div class="info-label">정기 결제일</div>
              <div class="info-value">매월 \${d.payment_day || '-'}일</div>
            </div>
            <div class="info-row">
              <div class="info-label">계약시 입금액</div>
              <div class="info-value highlight">\${formatMoney(d.initial_payment)}</div>
            </div>
            <div class="info-row">
              <div class="info-label">월 결제액</div>
              <div class="info-value highlight">\${formatMoney(d.monthly_payment)}</div>
            </div>
          </div>
          
          \${!isSigned ? \`
          <div class="payment-section">
            <div class="payment-title">💳 결제 방식 선택</div>
            <div class="payment-options">
              <label class="payment-option" onclick="selectPayment('card')">
                <input type="radio" name="pay-method" value="card">
                <div class="payment-option-text">
                  <div class="main">카드결제</div>
                  <div class="sub">PC 웹에서 카드 결제가 가능합니다</div>
                </div>
              </label>
              <label class="payment-option" onclick="selectPayment('cash')">
                <input type="radio" name="pay-method" value="cash">
                <div class="payment-option-text">
                  <div class="main">현금 (계좌이체)</div>
                  <div class="sub">아래 계좌로 입금해 주세요</div>
                </div>
              </label>
            </div>
            <div class="bank-info" id="bank-info">
              <div class="bank-info-title">📌 입금 계좌 안내</div>
              <div class="bank-info-account">\${d.bank_name || '케이뱅크'} \${d.bank_account || '100-124-491987'}</div>
              <div class="bank-info-holder">예금주: \${d.bank_holder || '방익주'}</div>
            </div>
          </div>
          \` : ''}
        </div>
        
        <!-- 제4조 계약 조건 -->
        <div class="section">
          <h2 class="section-title">제4조 계약 조건</h2>
          <div class="terms-box">
            <ol>
              <li><strong>서비스 범위:</strong> 본 계약에 명시된 서비스 항목에 한하며, 추가 서비스는 별도 협의 후 진행한다.</li>
              <li><strong>계약 기간:</strong> 셋팅 서비스는 계약일로부터 30일 이내 완료를 목표로 하며, 월 관리 서비스는 명시된 기간 동안 유효하다. 별도의 해지 요청이 없을 경우 동일 조건으로 자동 연장된다.</li>
              <li><strong>비용 및 결제:</strong> 계약 금액은 부가세 별도이며, 광고비(매체비)는 별도이다. 고객은 매월 정해진 결제일에 결제를 이행하여야 한다.</li>
              <li><strong>환불 규정:</strong>
                <ul>
                  <li>서비스 착수 전 취소 시: 전액 환불 (100%)</li>
                  <li>서비스 착수 후 7일 이내 취소 시: 50% 환불</li>
                  <li>서비스 착수 후 7일 경과: 환불 불가</li>
                </ul>
              </li>
              <li><strong>비밀유지:</strong> 양 당사자는 계약 과정에서 알게 된 상대방의 영업 비밀 및 개인정보를 제3자에게 공개하거나 유출하지 않는다.</li>
              <li><strong>분쟁해결:</strong> 본 계약과 관련하여 분쟁이 발생한 경우, 양 당사자는 원만한 협의를 통해 해결하며, 협의가 이루어지지 않을 경우 제공자 소재지 관할 법원을 전속관할로 한다.</li>
            </ol>
          </div>
        </div>
        
        <!-- 비고 (요청사항/특이사항) -->
        <div class="section remarks-section">
          <h2 class="section-title">비고 (요청사항 / 특이사항)</h2>
          <div class="remarks-box \${!d.remarks ? 'empty' : ''}">\${d.remarks || '작성된 내용이 없습니다'}</div>
        </div>
        
        <!-- 제5조 서명 날인 -->
        <div class="section sig-section">
          <h2 class="section-title">제5조 서명 날인</h2>
          <p class="sig-description">본 계약의 성립을 증명하기 위하여 제공자와 고객이 서명 날인 후 각 1통씩 보관한다.</p>
          
          <div class="sig-grid">
            <!-- 서비스 제공자 -->
            <div class="sig-box">
              <div class="sig-box-header">서비스 제공자</div>
              <div class="sig-box-content">
                <div class="sig-info">
                  <div class="label">상호</div>
                  <div class="value">\${d.provider_company || '컴바인티엔비'}</div>
                </div>
                <div class="sig-info">
                  <div class="label">대표</div>
                  <div class="value">\${d.provider_rep || '방익주'}</div>
                </div>
                <div class="sig-area">
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAAAXNSR0IArs4c6QAABGJJREFUeF7t1AEJAAAMAsC/f+kHLJgFPOS0HQIECBQIzBcJKUGAwBEwWF4BAQKZgMHKMpUiQMBgeQMECGQCBivLVIoAAYPlDRAgkAkYrCxTKQIEDJY3QIBAJmCwskylCBAwWN4AAQKZgMHKMpUiQMBgeQMECGQCBivLVIoAAYPlDRAgkAkYrCxTKQIEDJY3QIBAJmCwskylCBAwWN4AAQKZgMHKMpUiQMBgeQMECGQCBivLVIoAAYPlDRAgkAkYrCxTKQIEDJY3QIBAJmCwskylCBAwWN4AAQKZgMHKMpUiQMBgeQMECGQCBivLVIoAAYPlDRAgkAkYrCxTKQIEDJY3QIBAJmCwskylCBAwWN4AAQKZgMHKMpUiQMBgeQMECGQCBivLVIoAAYPlDRAgkAkYrCxTKQIEDJY3QIBAJmCwskylCBAwWN4AAQKZgMHKMpUiQMBgeQMECGQCBivLVIoAAYPlDRAgkAkYrCxTKQIEDJY3QIBAJmCwskylCBAwWN4AAQKZgMHKMpUiQMBgeQMECGQCBivLVIoAAYPlDRAgkAkYrCxTKQIEDJY3QIBAJmCwskylCBAwWN4AAQKZgMHKMpUiQMBgeQMECGQCBivLVIoAAYPlDRAgkAkYrCxTKQIEDJY3QIBAJmCwskylCBAwWN4AAQKZgMHKMpUiQMBgeQMECGQCBivLVIoAAYPlDRAgkAkYrCxTKQIEDJY3QIBAJmCwskylCBAwWN4AAQKZgMHKMpUiQMBgeQMECGQCBivLVIoAAYPlDRAgkAkYrCxTKQIEDJY3QIBAJmCwskylCBAwWN4AAQKZgMHKMpUiQMBgeQMECGQCBivLVIoAAYPlDRAgkAkYrCxTKQIEDJY3QIBAJmCwskylCBAwWN4AAQKZgMHKMpUiQMBgeQMECGQCBivLVIoAAYPlDRAgkAkYrCxTKQIEDJY3QIBAJmCwskylCBAwWN4AAQKZgMHKMpUiQMBgeQMECGQCBivLVIoAgQefagaXkuDPkQAAAABJRU5ErkJggg==" alt="제공자 서명">
                </div>
              </div>
            </div>
            
            <!-- 고객사 -->
            <div class="sig-box">
              <div class="sig-box-header">고객사</div>
              <div class="sig-box-content">
                <div class="sig-info">
                  <div class="label">상호</div>
                  <div class="value">\${clientCompany || '-'}</div>
                </div>
                <div class="sig-info">
                  <div class="label">대표</div>
                  <div class="value">\${clientName || '-'}</div>
                </div>
                <div class="sig-area">
                  \${isSigned && d.client_signature ? 
                    '<img src="' + d.client_signature + '" alt="고객 서명">' :
                    (isSigned ? '<span style="color:#aaa;font-size:13px;">서명 없음</span>' : '<div class="sig-canvas-wrap"><canvas id="sig-canvas"></canvas></div>')
                  }
                </div>
                \${!isSigned ? '<button type="button" class="clear-sig-btn" onclick="clearSig()">🔄 서명 지우기</button>' : ''}
              </div>
            </div>
          </div>
          
          <div class="contract-footer-date">\${formatDate(d.contract_date)}</div>
        </div>
        
        \${isSigned ? 
          '<div class="signed-notice">✅ 이 계약서는 서명 완료되었습니다</div>' : 
          '<div class="agree-section"><label><input type="checkbox" id="agree">위 계약 내용을 모두 확인하였으며, 본 계약에 동의합니다.</label></div>'
        }
      \`;
      
      document.getElementById('contract-page').innerHTML = html;
      
      // 하단 액션 바 렌더링
      const actionBar = document.getElementById('action-bar');
      if (isSigned) {
        actionBar.innerHTML = '<div class="btn-wrap"><button class="btn btn-primary" onclick="downloadPDF()">📄 PDF 다운로드</button></div>';
      } else {
        actionBar.innerHTML = '<div class="btn-wrap"><button class="btn btn-primary" id="submit-btn" onclick="submitSign()" disabled>✍️ 계약 서명하기</button><button class="btn btn-secondary" onclick="downloadPDF()">📄 PDF</button></div>';
        initCanvas();
        initValidation();
      }
    }
    
    function selectPayment(method) {
      document.querySelectorAll('.payment-option').forEach(el => el.classList.remove('selected'));
      const radio = document.querySelector('input[name="pay-method"][value="' + method + '"]');
      if (radio) {
        radio.checked = true;
        radio.closest('.payment-option').classList.add('selected');
      }
      const bankInfo = document.getElementById('bank-info');
      if (bankInfo) {
        if (method === 'cash') {
          bankInfo.classList.add('show');
        } else {
          bankInfo.classList.remove('show');
        }
      }
      checkValid();
    }
    
    function initCanvas() {
      const canvas = document.getElementById('sig-canvas');
      if (!canvas) return;
      
      const box = canvas.parentElement;
      clientCtx = canvas.getContext('2d');
      
      // 캔버스 크기 설정
      const rect = box.getBoundingClientRect();
      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
      clientCtx.scale(2, 2);
      clientCtx.strokeStyle = '#000';
      clientCtx.lineWidth = 2.5;
      clientCtx.lineCap = 'round';
      clientCtx.lineJoin = 'round';
      
      // 마우스 이벤트
      canvas.addEventListener('mousedown', e => { 
        drawing = true; 
        lx = e.offsetX; 
        ly = e.offsetY; 
      });
      canvas.addEventListener('mousemove', e => { 
        if (!drawing) return; 
        clientCtx.beginPath(); 
        clientCtx.moveTo(lx, ly); 
        clientCtx.lineTo(e.offsetX, e.offsetY); 
        clientCtx.stroke(); 
        lx = e.offsetX; 
        ly = e.offsetY; 
        checkValid(); 
      });
      canvas.addEventListener('mouseup', () => drawing = false);
      canvas.addEventListener('mouseout', () => drawing = false);
      
      // 터치 이벤트 (모바일)
      canvas.addEventListener('touchstart', e => { 
        e.preventDefault(); 
        drawing = true; 
        const t = e.touches[0]; 
        const r = canvas.getBoundingClientRect(); 
        lx = t.clientX - r.left; 
        ly = t.clientY - r.top; 
      }, {passive: false});
      
      canvas.addEventListener('touchmove', e => { 
        e.preventDefault(); 
        if (!drawing) return; 
        const t = e.touches[0]; 
        const r = canvas.getBoundingClientRect(); 
        const x = t.clientX - r.left;
        const y = t.clientY - r.top; 
        clientCtx.beginPath(); 
        clientCtx.moveTo(lx, ly); 
        clientCtx.lineTo(x, y); 
        clientCtx.stroke(); 
        lx = x; 
        ly = y; 
        checkValid(); 
      }, {passive: false});
      
      canvas.addEventListener('touchend', () => drawing = false);
    }
    
    function clearSig() {
      if (clientCtx) {
        const canvas = document.getElementById('sig-canvas');
        clientCtx.clearRect(0, 0, canvas.width, canvas.height);
      }
      checkValid();
    }
    
    function hasSig() {
      const canvas = document.getElementById('sig-canvas');
      if (!canvas || !clientCtx) return false;
      const data = clientCtx.getImageData(0, 0, canvas.width, canvas.height).data;
      for (let i = 3; i < data.length; i += 4) {
        if (data[i] > 0) return true;
      }
      return false;
    }
    
    function initValidation() {
      const agreeBox = document.getElementById('agree');
      if (agreeBox) {
        agreeBox.addEventListener('change', checkValid);
      }
    }
    
    function checkValid() {
      const agreed = document.getElementById('agree')?.checked;
      const payMethod = document.querySelector('input[name="pay-method"]:checked');
      const btn = document.getElementById('submit-btn');
      if (btn) {
        btn.disabled = !(agreed && hasSig() && payMethod);
      }
    }
    
    async function submitSign() {
      const btn = document.getElementById('submit-btn');
      btn.disabled = true;
      btn.innerHTML = '⏳ 저장 중...';
      
      try {
        const canvas = document.getElementById('sig-canvas');
        const payMethod = document.querySelector('input[name="pay-method"]:checked')?.value || '';
        
        const res = await fetch('/api/contracts/' + CONTRACT_ID + '/sign', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            client_company: contractData.client_company || '',
            client_name: contractData.client_name || '',
            client_phone: contractData.client_phone || '',
            client_email: contractData.client_email || '',
            client_address: contractData.client_address || '',
            client_signature: canvas.toDataURL('image/png'),
            remarks: contractData.remarks || '',
            payment_method: payMethod
          })
        });
        
        const result = await res.json();
        
        if (result.success) {
          alert('✅ 계약이 완료되었습니다!\\n\\n계약서 PDF를 다운로드하실 수 있습니다.');
          location.reload();
        } else {
          alert('❌ 오류: ' + result.error);
          btn.disabled = false;
          btn.innerHTML = '✍️ 계약 서명하기';
        }
      } catch (e) {
        alert('❌ 오류: ' + e.message);
        btn.disabled = false;
        btn.innerHTML = '✍️ 계약 서명하기';
      }
    }
    
    async function downloadPDF() {
      const btn = event.target;
      const originalText = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '⏳ PDF 생성 중...';
      
      try {
        // 액션바 숨기기
        document.getElementById('action-bar').style.display = 'none';
        
        const element = document.getElementById('contract-page');
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          logging: false
        });
        
        // 액션바 다시 표시
        document.getElementById('action-bar').style.display = 'block';
        
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        let heightLeft = imgHeight;
        let position = 0;
        const pageHeight = 297;
        
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        
        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        
        const clientName = contractData.client_company || contractData.client_name || '계약서';
        pdf.save(clientName + '_마케팅서비스계약서.pdf');
        
        btn.disabled = false;
        btn.innerHTML = originalText;
      } catch (e) {
        document.getElementById('action-bar').style.display = 'block';
        alert('PDF 생성 오류: ' + e.message);
        btn.disabled = false;
        btn.innerHTML = originalText;
      }
    }
    
    // 페이지 로드 시 계약서 불러오기
    loadContract();
  </script>
</body>
</html>`;
}

export default app
