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
    name: "SNS 스타터 셋트",
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
    name: "SNS 성장 셋트",
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
    name: "바이럴 마스터 셋트",
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
    name: "지역 장악 셋트",
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
  { id: "zoom_consult", name: "ZOOM 상담", price: 30000, desc: "30분 1:1 화상 마케팅 전략 상담", perUnit: "1회", category: "consultation", highlight: true }
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
  { id: "edu_ai_class", name: "XIΛIX AI 입문반 1기", price: 2000000, desc: "6주 과정 · 1월 개강 · 선착순 5명", isEdu: true }
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
    name: "STEP 1 초기 셋업",
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
    name: "STEP 2 기반 확장",
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
    name: "STEP 3 성장 유지",
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

// 계약서 목록 조회
app.get('/api/contracts', async (c) => {
  try {
    const db = c.env.DB;
    if (!db) return c.json({ success: false, error: 'DB not configured' }, 500);
    
    const rows = await db.prepare(`
      SELECT id, title, contract_date, client_company, client_name, client_phone, status, created_at, signed_at
      FROM contracts 
      ORDER BY created_at DESC
    `).all();
    
    return c.json({ success: true, contracts: rows.results || [] });
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500);
  }
});

// 계약서 수정
app.put('/api/contracts/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const data = await c.req.json();
    const db = c.env.DB;
    if (!db) return c.json({ success: false, error: 'DB not configured' }, 500);
    
    await db.prepare(`
      UPDATE contracts SET
        title = ?, contract_date = ?, provider_company = ?, provider_rep = ?, provider_phone = ?, provider_email = ?,
        bank_name = ?, bank_account = ?, bank_holder = ?, services = ?, extra_service_name = ?, extra_service_price = ?,
        setup_fee = ?, monthly_fee = ?, service_start_date = ?, payment_day = ?, initial_payment = ?, monthly_payment = ?,
        agree_sms = ?, remarks = ?, client_company = ?, client_name = ?, client_phone = ?, client_email = ?, client_address = ?
      WHERE id = ?
    `).bind(
      data.title, data.contract_date, data.provider_company, data.provider_rep, data.provider_phone, data.provider_email,
      data.bank_name, data.bank_account, data.bank_holder, JSON.stringify(data.services || []),
      data.extra_service_name || '', data.extra_service_price || 0,
      data.setup_fee || 0, data.monthly_fee || 0, data.start_date,
      data.payment_day, data.initial_amount, data.monthly_amount, data.sms_agree ? 1 : 0, data.remarks || '',
      data.client_company || '', data.client_name || '', data.client_phone || '', data.client_email || '', data.client_address || '',
      id
    ).run();
    
    return c.json({ success: true });
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500);
  }
});

// 계약서 삭제
app.delete('/api/contracts/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const db = c.env.DB;
    if (!db) return c.json({ success: false, error: 'DB not configured' }, 500);
    
    await db.prepare('DELETE FROM contracts WHERE id = ?').bind(id).run();
    return c.json({ success: true });
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500);
  }
});

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
→ "이해해요! 그래서 저희가 세트 메뉴를 만들었어요. SNS 스타터 89만원이면 첫 달 세팅+관리까지 다 되고, 다음 달부터는 55만원이에요. 하루로 치면 1.8만원! 알바생 반나절 비용으로 24시간 마케팅 되는 셈이죠. 그리고 친구 초대받으시면 바로 15% 할인이에요!"

**Q2. "효과가 바로 나타나나요?"**
→ "첫 달은 기반 작업인 '세팅' 기간이에요. 플레이스 최적화하고 인스타 기반 다지고... 제대로 세팅하면 보통 2~3개월째부터 문의가 늘기 시작해요."

**Q3. "월관리에 뭐가 포함되어 있어요?"**
→ (위 GRADE별 세부 내용 참조해서 구체적으로 설명. 예: "GRADE 2 퍼포먼스는 월 99만원인데요, 인스타 릴스 4개+피드 4개+카드뉴스 2개, 플레이스 적극 관리, 블로그 4개 포스팅이 포함되어 있어요. 사장님은 콘텐츠 승인만 해주시면 저희가 다 올려드려요!")

**Q4. "인스타 월관리 75만원에 정확히 뭘 해주는 거예요?"**
→ "릴스(짧은 영상) 4개, 피드(이미지) 4개, 카드뉴스 2개, 스토리 8개를 만들어서 올려드려요. 댓글이나 DM 관리도 해드리고요. 사장님은 촬영 협조만 해주시면 나머지는 저희가 기획-제작-업로드까지 다 해요!"

**Q5. "해약할 수 있나요?"**
→ "네! 노예계약 없어요. 첫 달 써보시고 마음에 안 드시면 언제든 멈추셔도 돼요. 그만큼 실력에 자신 있으니까요."

**Q6. "플레이스 A형이랑 B형 차이가 뭐예요?"**
→ "B형(35만)은 기본 관리예요. 리뷰 답글 달고 정보 업데이트하고. A형(50만)은 적극 공략! 상위노출 전략 짜고, 키워드 모니터링하고, 리뷰 유도까지 해드려요. 경쟁 심한 지역이면 A형 추천해요!"

**Q7. "ZOOM 상담은 뭐예요?"**
→ "3만원에 30분 동안 1:1로 화상 상담해드려요! 사장님 업종, 상황 듣고 맞춤 전략 조언해드려요. 일단 이것만 신청하셔도 방향이 잡히실 거예요."

**Q8. "결제는 어떻게 하나요?" / "선입금인가요?"**
→ "네! 저희는 **선입금 시스템**이에요. 결제 완료 후 작업이 시작됩니다. 정당한 대가 없이는 서비스 제공이 어렵습니다. 대신 품질에 자신 있으니 첫 달 써보시고 마음에 안 드시면 다음 달 해약 가능해요!"

**Q8-1. "후불 안 되나요?" / "나중에 결제해도 되나요?"**
→ "죄송해요, 저희는 **선입금 원칙**입니다. 계약금 먼저 결제 → 작업 시작 → 세팅 완료 후 잔금 결제 순서로 진행해요. 후불은 어렵습니다. 신뢰가 쌓인 장기 고객님에게만 예외적으로 협의 가능해요!"

**Q9. "계약서 작성하나요?"**
→ "네! 정식 전자계약서를 작성해요. 서비스 범위, 기간, 금액, 해약 조건이 명시되어 있어서 서로 안심하고 진행할 수 있어요. 계약서 없이는 프로젝트 시작 안 해요!"

# Conversation Flow (대화 순서)
1. **인사+업종 파악:** "안녕하세요! X I Λ I X 마케팅 상담 AI입니다. 어떤 사업 운영하고 계신가요?"
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
      <li class="sidebar-item" data-tab="contract-create"><i class="fas fa-file-signature"></i> 계약서 작성</li>
      <li class="sidebar-item" data-tab="contract-list"><i class="fas fa-folder-open"></i> 계약서 보관</li>
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
    
    <div id="contract-create-tab" class="tab-content">
      <h1 class="page-title">계약서 작성</h1>
      <p class="page-subtitle">새 계약서를 작성합니다</p>
      <div class="card">
        <iframe id="contract-create-iframe" src="/contract" style="width:100%;height:calc(100vh - 180px);border:none;border-radius:12px;"></iframe>
      </div>
    </div>
    
    <div id="contract-list-tab" class="tab-content">
      <h1 class="page-title">계약서 보관</h1>
      <p class="page-subtitle">저장된 계약서 목록</p>
      <div class="card">
        <div class="card-header">
          <h3 class="card-title"><i class="fas fa-file-contract"></i> 계약서 목록</h3>
          <button class="action-btn primary" onclick="switchTab('contract-create')"><i class="fas fa-plus"></i> 새 계약서</button>
        </div>
        <div id="contract-list-content"><div class="loading"><i class="fas fa-spinner fa-spin"></i> 로딩 중...</div></div>
      </div>
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
    
    let isAdmin = localStorage.getItem('xivix_admin') === 'true';
    
    async function checkAuth() {
      if (isAdmin) return true;
      
      const pwd = prompt('관리자 비밀번호를 입력하세요:');
      if (pwd === 'xivix2025!') {
        isAdmin = true;
        localStorage.setItem('xivix_admin', 'true');
        return true;
      } else if (pwd) {
        alert('비밀번호가 틀렸습니다.');
      }
      window.location.href = '/';
      return false;
    }
    
    async function loadTabData(tab) {
      if (!await checkAuth()) return;
      
      switch(tab) {
        case 'dashboard': loadDashboard(); break;
        case 'payments': loadPayments(); break;
        case 'contract-list': loadContractList(); break;
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
      localStorage.removeItem('xivix_admin');
      window.location.href = '/';
    }
    
    async function loadContractList() {
      try {
        const res = await fetch('/api/contracts');
        const data = await res.json();
        
        if (!data.contracts || data.contracts.length === 0) {
          document.getElementById('contract-list-content').innerHTML = '<div class="empty">저장된 계약서가 없습니다.<br><br><button class="action-btn primary" onclick="switchTab(\\'contract-create\\')"><i class="fas fa-plus"></i> 새 계약서 작성</button></div>';
          return;
        }
        
        document.getElementById('contract-list-content').innerHTML = \`
          <table>
            <thead><tr><th>계약일</th><th>고객사</th><th>담당자</th><th>연락처</th><th>상태</th><th>액션</th></tr></thead>
            <tbody>
              \${data.contracts.map(c => \`
                <tr>
                  <td>\${c.contract_date || '-'}</td>
                  <td>\${c.client_company || '미입력'}</td>
                  <td>\${c.client_name || '미입력'}</td>
                  <td>\${c.client_phone || '-'}</td>
                  <td><span class="badge \${c.status === 'signed' ? 'badge-green' : 'badge-yellow'}">\${c.status === 'signed' ? '서명완료' : '대기중'}</span></td>
                  <td>
                    <button class="action-btn" onclick="viewContract('\${c.id}')"><i class="fas fa-eye"></i> 보기</button>
                    <button class="action-btn" onclick="editContract('\${c.id}')"><i class="fas fa-edit"></i> 수정</button>
                    <button class="action-btn" onclick="copyContractLink('\${c.id}')"><i class="fas fa-link"></i> 링크</button>
                    <button class="action-btn" onclick="deleteContract('\${c.id}')" style="color:#ef4444;"><i class="fas fa-trash"></i></button>
                  </td>
                </tr>
              \`).join('')}
            </tbody>
          </table>
        \`;
      } catch (error) {
        document.getElementById('contract-list-content').innerHTML = '<div class="empty">데이터를 불러올 수 없습니다.</div>';
      }
    }
    
    function viewContract(id) {
      window.open('/contract/' + id, '_blank');
    }
    
    function editContract(id) {
      document.getElementById('contract-create-iframe').src = '/contract?edit=' + id;
      switchTab('contract-create');
    }
    
    function copyContractLink(id) {
      const url = window.location.origin + '/contract/' + id;
      navigator.clipboard.writeText(url).then(() => {
        alert('계약서 링크가 복사되었습니다!\\n\\n' + url);
      });
    }
    
    async function deleteContract(id) {
      if (!confirm('정말 이 계약서를 삭제하시겠습니까?')) return;
      
      try {
        await fetch('/api/contracts/' + id, { method: 'DELETE' });
        loadContractList();
      } catch (e) {
        alert('삭제 중 오류가 발생했습니다.');
      }
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

