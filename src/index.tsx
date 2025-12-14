import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-pages'

// Types
type Bindings = {
  GEMINI_API_KEY?: string
  PORTONE_STORE_ID?: string
  PORTONE_CHANNEL_KEY?: string
}

type Variables = {
  userIp: string
}

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>()

// Middleware
app.use('/api/*', cors())

// Static files
app.use('/static/*', serveStatic())

// ========================================
// PORTFOLIO DATA
// ========================================
const portfolios = [
  { id: 1, title: "Studio JuAi Main", url: "https://www.studiojuai.com/", category: "Branding", description: "스튜디오 주아이 메인 브랜딩 사이트" },
  { id: 2, title: "Tax JupJup", url: "https://tax-jupjup.pages.dev/", category: "Landing", description: "세무 서비스 랜딩페이지" },
  { id: 3, title: "Bon Life", url: "https://www.thebonlife.kr/", category: "Commerce", description: "라이프스타일 커머스" },
  { id: 4, title: "Aura Kim", url: "https://aurakim.com/", category: "Branding", description: "개인 브랜딩 사이트" },
  { id: 5, title: "Amanna Hair", url: "https://www.amanna.hair/", category: "Service", description: "헤어샵 브랜딩" },
  { id: 6, title: "Studio JuAi Club", url: "https://studiojuai.club/", category: "Premium", description: "프리미엄 클럽 사이트" },
]

// ========================================
// PRICING DATA
// ========================================
const pricingData = {
  setup: [
    {
      id: 'type-a',
      name: 'TYPE A',
      title: '랜딩페이지형',
      price: 1500000,
      description: '이벤트/DB수집용 원페이지',
      features: ['반응형 원페이지', 'DB 수집 폼', '기본 SEO', '1회 수정'],
      recommended: false,
      tooltip: '단기 이벤트나 신규 고객 DB 수집에 최적화된 가벼운 랜딩페이지입니다.'
    },
    {
      id: 'type-b',
      name: 'TYPE B',
      title: '스탠다드 브랜딩형',
      price: 3000000,
      description: '기업/학원/에스테틱 추천',
      features: ['5페이지 구성', '브랜드 스토리텔링', '검색 최적화(SEO)', 'AI 챗봇 포함', '3회 수정'],
      recommended: true,
      badge: 'AI 챗봇 500만원 상당 무료 포함',
      tooltip: '온라인에서 브랜드 가치를 제대로 전달하고 싶은 분께 추천합니다. 24시간 영업하는 온라인 본점입니다.'
    },
    {
      id: 'type-c',
      name: 'TYPE C',
      title: '하이엔드 프리미엄형',
      price: 8000000,
      description: '병원/프랜차이즈/고가 서비스',
      features: ['무제한 페이지', '결제/예약 기능', '기획자 투입', 'CRM 연동', 'VIP 유지보수', '무제한 수정'],
      recommended: false,
      badge: 'AI 챗봇 + 예약시스템 포함',
      tooltip: '병원, 프랜차이즈처럼 복잡한 예약/결제 플로우가 필요한 고가 서비스에 적합합니다.'
    }
  ],
  monthly: [
    {
      id: 'grade-1',
      name: 'Grade 1',
      title: '브랜딩 베이직',
      price: 1100000,
      description: '기본 관리형 - 명함만 걸어둘 분',
      features: ['블로그 포스팅 4회/월', '인스타그램 8회/월', '기본 리포트'],
      recommended: false,
      tooltip: '최소한의 온라인 존재감 유지. 당장 매출보단 브랜드 인지도 유지가 목표인 분께.'
    },
    {
      id: 'grade-2',
      name: 'Grade 2',
      title: '퍼포먼스 그로스',
      price: 2500000,
      description: '매출 부스팅 - 실제 매출 올릴 분',
      features: ['블로그 포스팅 8회/월', '숏폼 콘텐츠 4회/월', '인스타그램 8회/월', '네이버 플레이스 관리', '성과 분석 리포트'],
      recommended: true,
      badge: 'BEST 선택',
      tooltip: '실제 매출 전환을 원하시는 분께 추천. 숏폼이 포함되어 MZ세대 유입에 효과적입니다.'
    },
    {
      id: 'grade-3',
      name: 'Grade 3',
      title: '토탈 마스터',
      price: 4500000,
      description: '지역 장악형 - 지역 1등 목표',
      features: ['유튜브 롱폼/숏폼', '블로그 포스팅 12회/월', '인스타그램 12회/월', '광고 운영 대행', '주간 전략 미팅', 'VIP 전담 매니저'],
      recommended: false,
      tooltip: '지역 내 압도적 1위를 목표로 하시는 분. 모든 채널을 동시에 공략합니다.'
    }
  ],
  addons: [
    { id: 'addon-detail', name: '상세페이지 기획/제작', price: 500000, unit: '건', tooltip: '와디즈 펀딩이나 스마트스토어 입점 시 필수. 팔리는 문구로 기획해드립니다.' },
    { id: 'addon-place-setup', name: '플레이스 초기 세팅', price: 300000, unit: '1회', tooltip: '지도 등록, SEO 최적화, 메뉴판 디자인 등 기본 세팅입니다.' },
    { id: 'addon-place-ad', name: '플레이스 광고 관리', price: 300000, unit: '월', tooltip: '세팅과 다릅니다. 실제 광고비(CP)를 태워서 상위에 꽂는 광고 운영 대행입니다.' },
    { id: 'addon-youtube-long', name: '유튜브 롱폼 편집', price: 300000, unit: '건', tooltip: '10분 이상의 유튜브 영상 전문 편집' },
    { id: 'addon-shortform', name: '숏폼 기획/제작', price: 150000, unit: '건', tooltip: '릴스, 쇼츠, 틱톡용 15-60초 숏폼 콘텐츠' },
    { id: 'addon-social', name: 'Social Credibility', price: 100000, unit: '패키지', tooltip: '게시물 좋아요/조회수를 늘려 인기 있는 곳처럼 보이게 하는 브랜딩 작업입니다.' },
  ],
  location: [
    { id: 'loc-seoul', name: '서울/경기', price: 0, tooltip: '기본 지역입니다.' },
    { id: 'loc-local', name: '지방 (출장 촬영)', price: 300000, tooltip: '서울/경기 외 지역은 고퀄리티 촬영을 위해 이동/숙박비가 포함된 출장비가 발생합니다.' },
  ]
}

// ========================================
// API ROUTES
// ========================================

// Get portfolios
app.get('/api/portfolios', (c) => {
  return c.json(portfolios)
})

// Get pricing
app.get('/api/pricing', (c) => {
  return c.json(pricingData)
})

// AI Chat endpoint (Gemini API)
app.post('/api/chat', async (c) => {
  const { message, context } = await c.req.json()
  const apiKey = c.env?.GEMINI_API_KEY || ''
  
  if (!apiKey) {
    // Demo response when no API key
    return c.json({
      response: getDemoResponse(message),
      isDemo: true
    })
  }
  
  const systemPrompt = `당신은 X I Λ I X의 수석 영업 컨설턴트입니다. 당신의 목표는 단순 방문자를 유료 고객으로 전환하는 것입니다.

**페르소나**: 냉철하지만 해결책을 주는 전문가. 무조건 팔려고 들지 말고 '컨설턴트'처럼 행동하세요.

**대화 프로세스**:
1. Ask (질문): "대표님, 현재 어떤 사업을 운영 중이신가요? 가장 큰 고민이 '신규 유입'인가요, '재방문'인가요?"
2. Empathize (공감): "아, 미용실 오픈 초기시군요. 인테리어 비용 때문에 마케팅 예산 걱정되시는 거 이해합니다."
3. Educate (교육): "하지만 대표님, 지금 마케팅 안 하면 그 인테리어 아무도 못 봅니다. 초기 3개월이 골든타임입니다."
4. Recommend (제안): 상황에 맞는 TYPE과 Grade를 추천하세요.

**핵심 세일즈 포인트**:
- "100만원짜리는 명함이지만, 1,000만원짜리는 24시간 잠들지 않는 영업사원을 고용하는 것입니다."
- "저희는 단순 제작이 아니라 타겟 분석과 심리학적 설계를 포함합니다."
- "건물만 짓고 방치하면 폐가입니다. 지속적인 유입을 만드는 운영비가 필요합니다."

**가격 정보**:
- TYPE A (150만): 랜딩페이지형
- TYPE B (300만): 스탠다드 브랜딩형 (AI 챗봇 무료 포함)
- TYPE C (800만): 하이엔드 프리미엄형

- Grade 1 (110만/월): 브랜딩 베이직
- Grade 2 (250만/월): 퍼포먼스 그로스 (BEST)
- Grade 3 (450만/월): 토탈 마스터

**어조**: "무조건 비싼 거 하세요" (X) -> "지금 단계에선 이게 효율적입니다" (O)
항상 한국어로 답변하세요.`

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: systemPrompt }] },
          { role: 'model', parts: [{ text: '안녕하세요, X I Λ I X 수석 컨설턴트입니다. 어떤 사업을 운영하고 계신가요?' }] },
          ...context.map((msg: any) => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
          })),
          { role: 'user', parts: [{ text: message }] }
        ],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 1000,
        }
      })
    })
    
    const data = await response.json() as any
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || '죄송합니다, 잠시 후 다시 시도해주세요.'
    
    return c.json({ response: aiResponse, isDemo: false })
  } catch (error) {
    return c.json({ response: getDemoResponse(message), isDemo: true })
  }
})

// Demo responses for when API key is not set
function getDemoResponse(message: string): string {
  const lowerMessage = message.toLowerCase()
  
  if (lowerMessage.includes('가격') || lowerMessage.includes('비용') || lowerMessage.includes('얼마')) {
    return `대표님, 가격 문의 주셨군요.

저희 서비스는 크게 세 가지로 나뉩니다:

**🏢 초기 구축 (온라인 본점)**
- TYPE A (150만): 이벤트/DB수집용 랜딩
- TYPE B (300만): 브랜딩 웹사이트 ⭐추천
- TYPE C (800만): 병원/프랜차이즈급 프리미엄

**📈 월 마케팅 관리**
- Grade 1 (110만/월): 기본 관리
- Grade 2 (250만/월): 매출 부스팅 ⭐BEST
- Grade 3 (450만/월): 지역 장악형

대표님은 현재 어떤 사업을 운영 중이신가요? 상황에 맞는 최적의 조합을 추천드리겠습니다.`
  }
  
  if (lowerMessage.includes('미용') || lowerMessage.includes('헤어') || lowerMessage.includes('살롱')) {
    return `아, 미용실/헤어샵이시군요! 

뷰티 업계는 저희가 가장 많이 작업하는 분야 중 하나입니다. 
대표님, 인테리어에 얼마 정도 투자하셨나요?

많은 원장님들이 인테리어에 3-5천만 원 쓰시고, 정작 마케팅에는 0원 쓰십니다.
그러면 그 예쁜 인테리어를 누가 보겠습니까?

**제가 추천드리는 조합**:
- 🌟 TYPE B (300만) + Grade 2 (250만/월)
- 첫 달 결제: 550만 원

이 조합이면 예약 문의가 바로 들어오기 시작합니다. 
특히 숏폼 콘텐츠가 포함되어서 인스타그램에서 바이럴 효과를 노릴 수 있어요.

오픈 예정이신가요, 아니면 이미 운영 중이신가요?`
  }
  
  if (lowerMessage.includes('병원') || lowerMessage.includes('치과') || lowerMessage.includes('의료')) {
    return `의료 분야시군요! 

병원/치과는 **신뢰**가 가장 중요합니다. 
저렴해 보이는 웹사이트는 오히려 환자분들의 불신을 삽니다.

**제가 추천드리는 조합**:
- 🏆 TYPE C (800만) + Grade 2 (250만/월)
- 첫 달 결제: 1,050만 원

TYPE C에는 온라인 예약 시스템, 진료 문의 챗봇, 
그리고 기획자가 직접 투입되어 환자 동선을 설계합니다.

"1,000만 원이요?" 하실 수 있는데요,
24시간 예약받는 시스템 + 신뢰를 주는 브랜딩 = 월 10명만 더 오셔도 본전입니다.

어떤 진료과목을 운영하시나요?`
  }
  
  return `안녕하세요, X I Λ I X 수석 컨설턴트입니다.

대표님의 비즈니스에 대해 더 자세히 알고 싶습니다.

1. 어떤 업종을 운영하고 계신가요? (예: 미용실, 병원, 학원, 카페 등)
2. 현재 가장 큰 고민은 무엇인가요? (신규 고객 부족 / 재방문율 저조 / 온라인 인지도)
3. 기존에 마케팅에 투자해보신 경험이 있으신가요?

이 세 가지만 알려주시면, 대표님 상황에 딱 맞는 솔루션을 제안드리겠습니다. 😊`
}

// Payment preparation endpoint
app.post('/api/payment/prepare', async (c) => {
  const { items, total, customerInfo } = await c.req.json()
  
  const orderId = `XILIX_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  
  return c.json({
    orderId,
    orderName: 'X I Λ I X 서비스 결제',
    totalAmount: total,
    storeId: c.env?.PORTONE_STORE_ID || 'store-xxxxxxxx',
    channelKey: c.env?.PORTONE_CHANNEL_KEY || 'channel-xxxxxxxx',
    items,
    customerInfo
  })
})

// ========================================
// MAIN HTML PAGE
// ========================================
app.get('/', (c) => {
  return c.html(getMainHTML())
})

// Admin page (hidden)
app.get('/admin', (c) => {
  return c.html(getAdminHTML())
})

function getMainHTML(): string {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>X I Λ I X | AI Marketing Agency</title>
    <meta name="description" content="남들이 'V'(Vision)를 볼 때, 우리는 세상을 뒤집어 '∧'(Angle)를 봅니다. AI 기반 마케팅 에이전시">
    
    <!-- Schema.org Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "X I Λ I X",
      "description": "AI 기반 마케팅 에이전시 - 웹사이트 구축 및 디지털 마케팅 서비스",
      "url": "https://xilix.pages.dev",
      "logo": "https://xilix.pages.dev/static/logo.png",
      "sameAs": [],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "sales",
        "availableLanguage": "Korean"
      }
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "웹사이트 구축 서비스",
      "description": "24시간 영업하는 온라인 본점 구축",
      "offers": [
        {
          "@type": "Offer",
          "name": "TYPE A - 랜딩페이지형",
          "price": "1500000",
          "priceCurrency": "KRW"
        },
        {
          "@type": "Offer",
          "name": "TYPE B - 스탠다드 브랜딩형",
          "price": "3000000",
          "priceCurrency": "KRW"
        },
        {
          "@type": "Offer",
          "name": "TYPE C - 하이엔드 프리미엄형",
          "price": "8000000",
          "priceCurrency": "KRW"
        }
      ]
    }
    </script>
    
    <!-- Fonts & Icons -->
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap" rel="stylesheet">
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            fontFamily: {
              sans: ['Noto Sans KR', 'sans-serif'],
            },
            colors: {
              dark: {
                900: '#0a0a0a',
                800: '#111111',
                700: '#1a1a1a',
                600: '#222222',
              }
            }
          }
        }
      }
    </script>
    
    <!-- PortOne V2 SDK -->
    <script src="https://cdn.portone.io/v2/browser-sdk.js"></script>
    
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      html {
        scroll-behavior: smooth;
      }
      
      body {
        font-family: 'Noto Sans KR', sans-serif;
        background: #0a0a0a;
        color: #ffffff;
        overflow-x: hidden;
      }
      
      /* Security: Disable text selection */
      .no-select {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      
      /* Live Shader Background */
      #shader-bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        background: linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #0a0a0a 100%);
      }
      
      .shader-orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(100px);
        opacity: 0.3;
        animation: float 20s ease-in-out infinite;
      }
      
      .orb-1 {
        width: 600px;
        height: 600px;
        background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
        top: -200px;
        right: -200px;
        animation-delay: 0s;
      }
      
      .orb-2 {
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, rgba(100,100,100,0.15) 0%, transparent 70%);
        bottom: -100px;
        left: -100px;
        animation-delay: -7s;
      }
      
      .orb-3 {
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(150,150,150,0.1) 0%, transparent 70%);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation-delay: -14s;
      }
      
      @keyframes float {
        0%, 100% { transform: translate(0, 0) scale(1); }
        25% { transform: translate(50px, -50px) scale(1.1); }
        50% { transform: translate(-30px, 30px) scale(0.95); }
        75% { transform: translate(30px, 50px) scale(1.05); }
      }
      
      /* Glassmorphism */
      .glass {
        background: rgba(255, 255, 255, 0.03);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.08);
      }
      
      .glass-hover:hover {
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(255, 255, 255, 0.15);
      }
      
      /* Text reveal animation */
      .reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
      }
      
      .reveal.active {
        opacity: 1;
        transform: translateY(0);
      }
      
      /* Hero text animation */
      .hero-text {
        background: linear-gradient(135deg, #ffffff 0%, #888888 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      /* Recommended badge */
      .badge-recommended {
        background: linear-gradient(135deg, #ffffff 0%, #cccccc 100%);
        color: #000000;
      }
      
      /* Cart sticky */
      .cart-sticky {
        position: sticky;
        top: 20px;
      }
      
      /* Modal overlay */
      .modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.9);
        z-index: 1000;
        display: none;
        justify-content: center;
        align-items: center;
      }
      
      .modal-overlay.active {
        display: flex;
      }
      
      /* Portfolio security overlay */
      .portfolio-security-overlay {
        position: absolute;
        inset: 0;
        z-index: 10;
        cursor: not-allowed;
      }
      
      /* Chatbot */
      .chatbot-container {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 999;
      }
      
      .chatbot-button {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #333333 0%, #111111 100%);
        border: 2px solid rgba(255, 255, 255, 0.2);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
      }
      
      .chatbot-button:hover {
        transform: scale(1.1);
        border-color: rgba(255, 255, 255, 0.4);
      }
      
      .chatbot-panel {
        position: absolute;
        bottom: 80px;
        right: 0;
        width: 380px;
        height: 500px;
        background: #111111;
        border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        display: none;
        flex-direction: column;
        overflow: hidden;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
      }
      
      .chatbot-panel.active {
        display: flex;
      }
      
      .chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
      }
      
      .chat-message {
        margin-bottom: 15px;
        max-width: 85%;
      }
      
      .chat-message.user {
        margin-left: auto;
      }
      
      .chat-message.user .message-content {
        background: #333333;
        border-radius: 18px 18px 4px 18px;
      }
      
      .chat-message.bot .message-content {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 18px 18px 18px 4px;
      }
      
      .message-content {
        padding: 12px 16px;
        line-height: 1.5;
        font-size: 14px;
      }
      
      /* Tooltip */
      .tooltip-trigger {
        position: relative;
        cursor: help;
      }
      
      .tooltip-content {
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        padding: 10px 14px;
        background: #222222;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        font-size: 13px;
        width: 250px;
        opacity: 0;
        visibility: hidden;
        transition: all 0.2s ease;
        z-index: 100;
        margin-bottom: 8px;
      }
      
      .tooltip-trigger:hover .tooltip-content {
        opacity: 1;
        visibility: visible;
      }
      
      /* Custom scrollbar */
      ::-webkit-scrollbar {
        width: 6px;
      }
      
      ::-webkit-scrollbar-track {
        background: transparent;
      }
      
      ::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 3px;
      }
      
      /* Pulse animation for chatbot */
      @keyframes pulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); }
        50% { box-shadow: 0 0 0 15px rgba(255, 255, 255, 0); }
      }
      
      .pulse {
        animation: pulse 2s infinite;
      }
      
      /* Step indicator */
      .step-indicator {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        margin-bottom: 40px;
      }
      
      .step-item {
        display: flex;
        align-items: center;
        gap: 10px;
        opacity: 0.4;
        transition: all 0.3s ease;
      }
      
      .step-item.active {
        opacity: 1;
      }
      
      .step-number {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 14px;
      }
      
      .step-item.active .step-number {
        background: white;
        color: black;
      }
      
      .step-line {
        width: 60px;
        height: 2px;
        background: rgba(255, 255, 255, 0.2);
      }
      
      /* Price card */
      .price-card {
        transition: all 0.3s ease;
        cursor: pointer;
      }
      
      .price-card:hover {
        transform: translateY(-5px);
      }
      
      .price-card.selected {
        border-color: white !important;
        background: rgba(255, 255, 255, 0.08) !important;
      }
      
      .price-card .check-icon {
        opacity: 0;
        transition: all 0.3s ease;
      }
      
      .price-card.selected .check-icon {
        opacity: 1;
      }
    </style>
</head>
<body class="no-select">
    <!-- Live Shader Background -->
    <div id="shader-bg">
      <div class="shader-orb orb-1"></div>
      <div class="shader-orb orb-2"></div>
      <div class="shader-orb orb-3"></div>
    </div>
    
    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 z-50 glass">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" class="text-2xl font-bold tracking-[0.3em]">X I Λ I X</a>
        <div class="hidden md:flex items-center gap-8">
          <a href="#diagnosis" class="text-sm text-gray-400 hover:text-white transition">진단</a>
          <a href="#portfolio" class="text-sm text-gray-400 hover:text-white transition">포트폴리오</a>
          <a href="#pricing" class="text-sm text-gray-400 hover:text-white transition">견적</a>
          <a href="#contact" class="px-5 py-2 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-200 transition">상담하기</a>
        </div>
      </div>
    </nav>
    
    <!-- Hero Section -->
    <section class="min-h-screen flex items-center justify-center px-6 pt-20">
      <div class="text-center">
        <div class="mb-8 reveal">
          <span class="text-sm tracking-[0.5em] text-gray-500">COMBINE TECHNOLOGY & BUSINESS</span>
        </div>
        <h1 class="text-5xl md:text-8xl font-black tracking-[0.2em] mb-6 reveal hero-text" style="transition-delay: 0.1s">
          X I Λ I X
        </h1>
        <div class="text-lg md:text-xl text-gray-400 mb-8 reveal" style="transition-delay: 0.2s">
          <span class="inline-block">남들이 '<span class="text-white font-bold">V</span>'(Vision)를 볼 때,</span>
          <br class="md:hidden">
          <span class="inline-block">우리는 세상을 뒤집어 '<span class="text-white font-bold">∧</span>'(Angle)를 봅니다.</span>
        </div>
        <div class="flex flex-col md:flex-row gap-4 justify-center reveal" style="transition-delay: 0.3s">
          <a href="#diagnosis" class="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition">
            무료 진단 시작하기 <i class="fas fa-arrow-right ml-2"></i>
          </a>
          <a href="#portfolio" class="px-8 py-4 glass glass-hover rounded-full font-medium transition">
            포트폴리오 보기
          </a>
        </div>
        <div class="mt-20 reveal" style="transition-delay: 0.4s">
          <i class="fas fa-chevron-down text-2xl text-gray-600 animate-bounce"></i>
        </div>
      </div>
    </section>
    
    <!-- Diagnosis Section -->
    <section id="diagnosis" class="py-32 px-6">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16 reveal">
          <span class="text-sm tracking-[0.3em] text-gray-500 mb-4 block">STEP 01</span>
          <h2 class="text-4xl md:text-5xl font-bold mb-6">비즈니스 진단</h2>
          <p class="text-gray-400 text-lg">대표님의 상황을 정확히 파악해야 최적의 솔루션을 제안드릴 수 있습니다.</p>
        </div>
        
        <div class="glass rounded-3xl p-8 md:p-12 reveal">
          <!-- Question 1 -->
          <div id="diagnosis-q1" class="diagnosis-question">
            <h3 class="text-xl md:text-2xl font-semibold mb-8 text-center">
              대표님의 사업은 현재 어떤 단계입니까?
            </h3>
            <div class="grid md:grid-cols-3 gap-4">
              <button onclick="selectDiagnosis(1, 'stage', 'opening')" class="diagnosis-btn glass glass-hover rounded-2xl p-6 text-left transition hover:scale-105">
                <i class="fas fa-seedling text-2xl mb-4 text-gray-400"></i>
                <h4 class="font-semibold mb-2">오픈 준비중</h4>
                <p class="text-sm text-gray-500">창업 예정이거나 오픈 직전</p>
              </button>
              <button onclick="selectDiagnosis(1, 'stage', 'plateau')" class="diagnosis-btn glass glass-hover rounded-2xl p-6 text-left transition hover:scale-105">
                <i class="fas fa-chart-line text-2xl mb-4 text-gray-400"></i>
                <h4 class="font-semibold mb-2">매출 정체기</h4>
                <p class="text-sm text-gray-500">성장이 멈추고 돌파구가 필요</p>
              </button>
              <button onclick="selectDiagnosis(1, 'stage', 'expansion')" class="diagnosis-btn glass glass-hover rounded-2xl p-6 text-left transition hover:scale-105">
                <i class="fas fa-rocket text-2xl mb-4 text-gray-400"></i>
                <h4 class="font-semibold mb-2">브랜딩 확장기</h4>
                <p class="text-sm text-gray-500">더 큰 시장을 노리는 중</p>
              </button>
            </div>
          </div>
          
          <!-- Question 2 -->
          <div id="diagnosis-q2" class="diagnosis-question hidden">
            <h3 class="text-xl md:text-2xl font-semibold mb-8 text-center">
              가장 큰 고민은 무엇입니까?
            </h3>
            <div class="grid md:grid-cols-3 gap-4">
              <button onclick="selectDiagnosis(2, 'concern', 'new-customer')" class="diagnosis-btn glass glass-hover rounded-2xl p-6 text-left transition hover:scale-105">
                <i class="fas fa-user-plus text-2xl mb-4 text-gray-400"></i>
                <h4 class="font-semibold mb-2">신규 고객 부족</h4>
                <p class="text-sm text-gray-500">새로운 고객이 안 들어와요</p>
              </button>
              <button onclick="selectDiagnosis(2, 'concern', 'retention')" class="diagnosis-btn glass glass-hover rounded-2xl p-6 text-left transition hover:scale-105">
                <i class="fas fa-redo text-2xl mb-4 text-gray-400"></i>
                <h4 class="font-semibold mb-2">재방문율 저조</h4>
                <p class="text-sm text-gray-500">한 번 오고 다시 안 와요</p>
              </button>
              <button onclick="selectDiagnosis(2, 'concern', 'awareness')" class="diagnosis-btn glass glass-hover rounded-2xl p-6 text-left transition hover:scale-105">
                <i class="fas fa-eye text-2xl mb-4 text-gray-400"></i>
                <h4 class="font-semibold mb-2">온라인 인지도 바닥</h4>
                <p class="text-sm text-gray-500">검색해도 안 나와요</p>
              </button>
            </div>
          </div>
          
          <!-- Diagnosis Result -->
          <div id="diagnosis-result" class="diagnosis-question hidden">
            <div class="text-center">
              <div class="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <i class="fas fa-clipboard-check text-3xl"></i>
              </div>
              <h3 class="text-2xl font-bold mb-4">진단 완료!</h3>
              <p id="diagnosis-summary" class="text-gray-400 mb-8 text-lg"></p>
              <div id="diagnosis-recommendation" class="glass rounded-2xl p-6 mb-8 text-left">
              </div>
              <a href="#pricing" class="inline-block px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition">
                맞춤 견적 보러가기 <i class="fas fa-arrow-right ml-2"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Portfolio Section -->
    <section id="portfolio" class="py-32 px-6 bg-dark-800/50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16 reveal">
          <span class="text-sm tracking-[0.3em] text-gray-500 mb-4 block">PORTFOLIO</span>
          <h2 class="text-4xl md:text-5xl font-bold mb-6">우리의 작업물</h2>
          <p class="text-gray-400 text-lg">클릭하면 실제 사이트를 미리보실 수 있습니다</p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6" id="portfolio-grid">
          <!-- Portfolio items will be rendered by JS -->
        </div>
      </div>
    </section>
    
    <!-- Pricing Section -->
    <section id="pricing" class="py-32 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16 reveal">
          <span class="text-sm tracking-[0.3em] text-gray-500 mb-4 block">PRICING</span>
          <h2 class="text-4xl md:text-5xl font-bold mb-6">맞춤 견적 빌더</h2>
          <p class="text-gray-400 text-lg">자동차 견적처럼, 원하는 옵션을 선택하세요</p>
        </div>
        
        <!-- Step Indicator -->
        <div class="step-indicator reveal">
          <div class="step-item active" data-step="1">
            <div class="step-number">1</div>
            <span class="hidden md:inline text-sm">초기 구축</span>
          </div>
          <div class="step-line"></div>
          <div class="step-item" data-step="2">
            <div class="step-number">2</div>
            <span class="hidden md:inline text-sm">월 관리</span>
          </div>
          <div class="step-line"></div>
          <div class="step-item" data-step="3">
            <div class="step-number">3</div>
            <span class="hidden md:inline text-sm">옵션</span>
          </div>
          <div class="step-line"></div>
          <div class="step-item" data-step="4">
            <div class="step-number">4</div>
            <span class="hidden md:inline text-sm">결제</span>
          </div>
        </div>
        
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Pricing Steps -->
          <div class="lg:col-span-2 space-y-12">
            <!-- Step 1: Initial Setup -->
            <div id="pricing-step-1" class="reveal">
              <div class="flex items-center gap-4 mb-6">
                <div class="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 class="text-2xl font-bold">초기 구축비</h3>
                  <p class="text-gray-400 text-sm">24시간 영업하는 온라인 본점을 짓는 비용입니다</p>
                </div>
              </div>
              
              <div class="grid md:grid-cols-3 gap-4" id="setup-cards">
                <!-- Cards will be rendered by JS -->
              </div>
            </div>
            
            <!-- Step 2: Monthly -->
            <div id="pricing-step-2" class="reveal">
              <div class="flex items-center gap-4 mb-6">
                <div class="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 class="text-2xl font-bold">월 마케팅 관리비</h3>
                  <p class="text-gray-400 text-sm">건물만 짓고 방치하면 폐가입니다. 지속적인 유입을 만드는 운영비입니다</p>
                </div>
              </div>
              
              <div class="grid md:grid-cols-3 gap-4" id="monthly-cards">
                <!-- Cards will be rendered by JS -->
              </div>
            </div>
            
            <!-- Step 3: Add-ons -->
            <div id="pricing-step-3" class="reveal">
              <div class="flex items-center gap-4 mb-6">
                <div class="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 class="text-2xl font-bold">옵션 (Add-ons)</h3>
                  <p class="text-gray-400 text-sm">상황별 필살기를 추가하세요</p>
                </div>
              </div>
              
              <div class="grid md:grid-cols-2 gap-4" id="addon-cards">
                <!-- Cards will be rendered by JS -->
              </div>
              
              <!-- Location -->
              <div class="mt-8">
                <h4 class="font-semibold mb-4 text-gray-400">지역 선택</h4>
                <div class="flex gap-4" id="location-cards">
                  <!-- Cards will be rendered by JS -->
                </div>
              </div>
            </div>
          </div>
          
          <!-- Cart Sidebar -->
          <div class="lg:col-span-1">
            <div class="cart-sticky glass rounded-3xl p-6 reveal">
              <h3 class="text-xl font-bold mb-6 flex items-center gap-2">
                <i class="fas fa-shopping-cart"></i>
                견적 요약
              </h3>
              
              <div id="cart-items" class="space-y-4 mb-6">
                <div class="text-gray-500 text-center py-8">
                  <i class="fas fa-inbox text-3xl mb-2"></i>
                  <p>옵션을 선택해주세요</p>
                </div>
              </div>
              
              <div class="border-t border-white/10 pt-4 mb-6">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-gray-400">초기 구축비</span>
                  <span id="cart-setup-price">₩0</span>
                </div>
                <div class="flex justify-between items-center mb-2">
                  <span class="text-gray-400">월 관리비 (첫 달)</span>
                  <span id="cart-monthly-price">₩0</span>
                </div>
                <div class="flex justify-between items-center mb-4">
                  <span class="text-gray-400">옵션/출장비</span>
                  <span id="cart-addon-price">₩0</span>
                </div>
                <div class="flex justify-between items-center text-2xl font-bold">
                  <span>첫 달 총액</span>
                  <span id="cart-total">₩0</span>
                </div>
              </div>
              
              <button onclick="proceedToPayment()" id="payment-btn" class="w-full py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                결제하기 <i class="fas fa-arrow-right ml-2"></i>
              </button>
              
              <p class="text-xs text-gray-500 text-center mt-4">
                * 부가세 별도 / 세금계산서 발행 가능
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Contact Section -->
    <section id="contact" class="py-32 px-6 bg-dark-800/50">
      <div class="max-w-4xl mx-auto text-center">
        <div class="reveal">
          <span class="text-sm tracking-[0.3em] text-gray-500 mb-4 block">CONTACT</span>
          <h2 class="text-4xl md:text-5xl font-bold mb-6">더 궁금하신 점이 있으신가요?</h2>
          <p class="text-gray-400 text-lg mb-8">
            우측 하단의 AI 컨설턴트에게 물어보시거나,<br>
            직접 연락 주세요.
          </p>
          <div class="flex flex-col md:flex-row gap-4 justify-center">
            <a href="tel:010-0000-0000" class="px-8 py-4 glass glass-hover rounded-full font-medium transition">
              <i class="fas fa-phone mr-2"></i> 전화 문의
            </a>
            <a href="mailto:hello@xilix.com" class="px-8 py-4 glass glass-hover rounded-full font-medium transition">
              <i class="fas fa-envelope mr-2"></i> 이메일 문의
            </a>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Footer -->
    <footer class="py-12 px-6 border-t border-white/10">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="text-2xl font-bold tracking-[0.3em]">X I Λ I X</div>
        <div class="text-sm text-gray-500">
          © 2024 X I Λ I X. All rights reserved.
        </div>
      </div>
    </footer>
    
    <!-- Portfolio Modal -->
    <div id="portfolio-modal" class="modal-overlay" onclick="closePortfolioModal(event)">
      <div class="relative w-full max-w-6xl h-[85vh] mx-4 bg-dark-800 rounded-2xl overflow-hidden" onclick="event.stopPropagation()">
        <div class="absolute top-4 right-4 z-20">
          <button onclick="closePortfolioModal()" class="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="portfolio-security-overlay" title="보안을 위해 상호작용이 제한됩니다"></div>
        <iframe id="portfolio-iframe" class="w-full h-full" sandbox="allow-scripts allow-same-origin" loading="lazy"></iframe>
      </div>
    </div>
    
    <!-- Chatbot -->
    <div class="chatbot-container">
      <div id="chatbot-panel" class="chatbot-panel">
        <div class="p-4 border-b border-white/10 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
              <i class="fas fa-robot text-sm"></i>
            </div>
            <div>
              <div class="font-semibold text-sm">AI 컨설턴트</div>
              <div class="text-xs text-gray-500">수석 영업 이사</div>
            </div>
          </div>
          <button onclick="toggleChat()" class="text-gray-400 hover:text-white">
            <i class="fas fa-minus"></i>
          </button>
        </div>
        <div class="chat-messages" id="chat-messages">
          <div class="chat-message bot">
            <div class="message-content">
              안녕하세요, X I Λ I X 수석 컨설턴트입니다. 😊<br><br>
              대표님의 비즈니스 성장을 도와드리겠습니다. 어떤 사업을 운영하고 계신가요?
            </div>
          </div>
        </div>
        <div class="p-4 border-t border-white/10">
          <div class="flex gap-2">
            <input type="text" id="chat-input" placeholder="메시지를 입력하세요..." class="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-white/30" onkeypress="handleChatKeypress(event)">
            <button onclick="sendChatMessage()" class="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition">
              <i class="fas fa-paper-plane text-sm"></i>
            </button>
          </div>
        </div>
      </div>
      <button onclick="toggleChat()" class="chatbot-button pulse" id="chatbot-btn">
        <i class="fas fa-comment-dots text-xl"></i>
      </button>
    </div>
    
    <script>
      // ========================================
      // SECURITY MEASURES
      // ========================================
      
      // Disable right-click
      document.addEventListener('contextmenu', (e) => e.preventDefault());
      
      // Disable F12, Ctrl+Shift+I, Ctrl+U
      document.addEventListener('keydown', (e) => {
        if (e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && e.key === 'I') || 
            (e.ctrlKey && e.key === 'u')) {
          e.preventDefault();
        }
      });
      
      // ========================================
      // DATA
      // ========================================
      
      const portfolios = [
        { id: 1, title: "Studio JuAi Main", url: "https://www.studiojuai.com/", category: "Branding", description: "스튜디오 주아이 메인 브랜딩 사이트" },
        { id: 2, title: "Tax JupJup", url: "https://tax-jupjup.pages.dev/", category: "Landing", description: "세무 서비스 랜딩페이지" },
        { id: 3, title: "Bon Life", url: "https://www.thebonlife.kr/", category: "Commerce", description: "라이프스타일 커머스" },
        { id: 4, title: "Aura Kim", url: "https://aurakim.com/", category: "Branding", description: "개인 브랜딩 사이트" },
        { id: 5, title: "Amanna Hair", url: "https://www.amanna.hair/", category: "Service", description: "헤어샵 브랜딩" },
        { id: 6, title: "Studio JuAi Club", url: "https://studiojuai.club/", category: "Premium", description: "프리미엄 클럽 사이트" },
      ];
      
      const pricingData = {
        setup: [
          {
            id: 'type-a',
            name: 'TYPE A',
            title: '랜딩페이지형',
            price: 1500000,
            description: '이벤트/DB수집용 원페이지',
            features: ['반응형 원페이지', 'DB 수집 폼', '기본 SEO', '1회 수정'],
            recommended: false,
            tooltip: '단기 이벤트나 신규 고객 DB 수집에 최적화된 가벼운 랜딩페이지입니다.'
          },
          {
            id: 'type-b',
            name: 'TYPE B',
            title: '스탠다드 브랜딩형',
            price: 3000000,
            description: '기업/학원/에스테틱 추천',
            features: ['5페이지 구성', '브랜드 스토리텔링', '검색 최적화(SEO)', 'AI 챗봇 포함', '3회 수정'],
            recommended: true,
            badge: 'AI 챗봇 500만원 상당 무료',
            tooltip: '온라인에서 브랜드 가치를 제대로 전달하고 싶은 분께 추천합니다.'
          },
          {
            id: 'type-c',
            name: 'TYPE C',
            title: '하이엔드 프리미엄형',
            price: 8000000,
            description: '병원/프랜차이즈/고가 서비스',
            features: ['무제한 페이지', '결제/예약 기능', '기획자 투입', 'CRM 연동', 'VIP 유지보수', '무제한 수정'],
            recommended: false,
            badge: 'AI 챗봇 + 예약시스템 포함',
            tooltip: '병원, 프랜차이즈처럼 복잡한 예약/결제 플로우가 필요한 고가 서비스에 적합합니다.'
          }
        ],
        monthly: [
          {
            id: 'grade-1',
            name: 'Grade 1',
            title: '브랜딩 베이직',
            price: 1100000,
            description: '기본 관리형',
            features: ['블로그 포스팅 4회/월', '인스타그램 8회/월', '기본 리포트'],
            recommended: false,
            tooltip: '최소한의 온라인 존재감 유지.'
          },
          {
            id: 'grade-2',
            name: 'Grade 2',
            title: '퍼포먼스 그로스',
            price: 2500000,
            description: '매출 부스팅',
            features: ['블로그 8회/월', '숏폼 4회/월', '인스타 8회/월', '플레이스 관리', '성과 리포트'],
            recommended: true,
            badge: 'BEST',
            tooltip: '실제 매출 전환을 원하시는 분께 추천.'
          },
          {
            id: 'grade-3',
            name: 'Grade 3',
            title: '토탈 마스터',
            price: 4500000,
            description: '지역 장악형',
            features: ['유튜브 롱폼/숏폼', '블로그 12회/월', '인스타 12회/월', '광고 운영', '주간 미팅', 'VIP 매니저'],
            recommended: false,
            tooltip: '지역 내 압도적 1위를 목표로.'
          }
        ],
        addons: [
          { id: 'addon-detail', name: '상세페이지 기획/제작', price: 500000, unit: '건', tooltip: '와디즈/스마트스토어용 팔리는 상세페이지' },
          { id: 'addon-place-setup', name: '플레이스 초기 세팅', price: 300000, unit: '1회', tooltip: 'SEO 최적화, 키워드, 메뉴판 디자인' },
          { id: 'addon-place-ad', name: '플레이스 광고 관리', price: 300000, unit: '월', tooltip: 'CP 광고 캠페인 운영 대행' },
          { id: 'addon-youtube-long', name: '유튜브 롱폼 편집', price: 300000, unit: '건', tooltip: '10분+ 유튜브 영상 편집' },
          { id: 'addon-shortform', name: '숏폼 기획/제작', price: 150000, unit: '건', tooltip: '릴스/쇼츠/틱톡 15-60초' },
          { id: 'addon-social', name: 'Social Credibility', price: 100000, unit: '패키지', tooltip: '좋아요/조회수 부스팅' },
        ],
        location: [
          { id: 'loc-seoul', name: '서울/경기', price: 0, tooltip: '기본 지역' },
          { id: 'loc-local', name: '지방 (출장 촬영)', price: 300000, tooltip: '이동/숙박비 포함' },
        ]
      };
      
      // ========================================
      // STATE
      // ========================================
      
      let cart = {
        setup: null,
        monthly: null,
        addons: [],
        location: 'loc-seoul'
      };
      
      let diagnosisData = {};
      let chatContext = [];
      
      // ========================================
      // INITIALIZATION
      // ========================================
      
      document.addEventListener('DOMContentLoaded', () => {
        initRevealAnimations();
        renderPortfolios();
        renderPricing();
        updateCart();
      });
      
      // Reveal animations on scroll
      function initRevealAnimations() {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
            }
          });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
      }
      
      // ========================================
      // PORTFOLIO
      // ========================================
      
      function renderPortfolios() {
        const grid = document.getElementById('portfolio-grid');
        grid.innerHTML = portfolios.map(p => \`
          <div class="glass glass-hover rounded-2xl overflow-hidden cursor-pointer reveal" onclick="openPortfolio('\${p.url}')">
            <div class="aspect-video bg-dark-700 relative">
              <div class="absolute inset-0 flex items-center justify-center">
                <i class="fas fa-external-link-alt text-2xl text-gray-600"></i>
              </div>
              <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <span class="text-xs px-2 py-1 bg-white/10 rounded-full">\${p.category}</span>
              </div>
            </div>
            <div class="p-4">
              <h3 class="font-semibold mb-1">\${p.title}</h3>
              <p class="text-sm text-gray-500">\${p.description}</p>
            </div>
          </div>
        \`).join('');
      }
      
      function openPortfolio(url) {
        const modal = document.getElementById('portfolio-modal');
        const iframe = document.getElementById('portfolio-iframe');
        iframe.src = url;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
      
      function closePortfolioModal(e) {
        if (e && e.target !== e.currentTarget) return;
        const modal = document.getElementById('portfolio-modal');
        const iframe = document.getElementById('portfolio-iframe');
        modal.classList.remove('active');
        iframe.src = '';
        document.body.style.overflow = '';
      }
      
      // ========================================
      // DIAGNOSIS
      // ========================================
      
      function selectDiagnosis(question, key, value) {
        diagnosisData[key] = value;
        
        if (question === 1) {
          document.getElementById('diagnosis-q1').classList.add('hidden');
          document.getElementById('diagnosis-q2').classList.remove('hidden');
        } else if (question === 2) {
          document.getElementById('diagnosis-q2').classList.add('hidden');
          showDiagnosisResult();
        }
      }
      
      function showDiagnosisResult() {
        const resultDiv = document.getElementById('diagnosis-result');
        const summaryEl = document.getElementById('diagnosis-summary');
        const recEl = document.getElementById('diagnosis-recommendation');
        
        const stageText = {
          'opening': '오픈 준비 단계',
          'plateau': '매출 정체기',
          'expansion': '브랜딩 확장기'
        };
        
        const concernText = {
          'new-customer': '신규 고객 확보',
          'retention': '재방문율 향상',
          'awareness': '온라인 인지도 구축'
        };
        
        let recommendation = '';
        if (diagnosisData.stage === 'opening') {
          recommendation = \`
            <h4 class="font-bold mb-3"><i class="fas fa-lightbulb mr-2 text-yellow-400"></i>추천 조합</h4>
            <p class="text-gray-300 mb-4">오픈 초기에는 과도한 투자보다 <strong>빠른 인지도 확보</strong>가 중요합니다.</p>
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1 bg-white/10 rounded-full text-sm">TYPE A 또는 B</span>
              <span class="px-3 py-1 bg-white/10 rounded-full text-sm">Grade 2 (숏폼 필수)</span>
            </div>
            <p class="text-sm text-gray-500 mt-4">💡 Tip: 인테리어에 투자한 만큼, 초기 3개월 마케팅이 골든타임입니다.</p>
          \`;
        } else if (diagnosisData.stage === 'plateau') {
          recommendation = \`
            <h4 class="font-bold mb-3"><i class="fas fa-lightbulb mr-2 text-yellow-400"></i>추천 조합</h4>
            <p class="text-gray-300 mb-4">정체기 돌파에는 <strong>브랜드 리뉴얼</strong>과 <strong>공격적 마케팅</strong>이 필요합니다.</p>
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1 bg-white/10 rounded-full text-sm">TYPE B (브랜딩 재구축)</span>
              <span class="px-3 py-1 bg-white/10 rounded-full text-sm">Grade 2 이상</span>
            </div>
            <p class="text-sm text-gray-500 mt-4">💡 Tip: 같은 방법으로 다른 결과를 기대하는 건 정의상 미친 짓입니다.</p>
          \`;
        } else {
          recommendation = \`
            <h4 class="font-bold mb-3"><i class="fas fa-lightbulb mr-2 text-yellow-400"></i>추천 조합</h4>
            <p class="text-gray-300 mb-4">확장기에는 <strong>프리미엄 브랜딩</strong>과 <strong>전방위 채널 공략</strong>이 필요합니다.</p>
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1 bg-white/10 rounded-full text-sm">TYPE B 또는 C</span>
              <span class="px-3 py-1 bg-white/10 rounded-full text-sm">Grade 3 (토탈 마스터)</span>
            </div>
            <p class="text-sm text-gray-500 mt-4">💡 Tip: 지역 1등 되려면 2등보다 2배 이상 투자해야 합니다.</p>
          \`;
        }
        
        summaryEl.textContent = \`\${stageText[diagnosisData.stage]} 단계에서 \${concernText[diagnosisData.concern]}이(가) 필요하시군요.\`;
        recEl.innerHTML = recommendation;
        resultDiv.classList.remove('hidden');
      }
      
      // ========================================
      // PRICING
      // ========================================
      
      function renderPricing() {
        // Setup cards
        document.getElementById('setup-cards').innerHTML = pricingData.setup.map(item => createPriceCard(item, 'setup')).join('');
        
        // Monthly cards
        document.getElementById('monthly-cards').innerHTML = pricingData.monthly.map(item => createPriceCard(item, 'monthly')).join('');
        
        // Addon cards
        document.getElementById('addon-cards').innerHTML = pricingData.addons.map(item => \`
          <div class="price-card glass rounded-xl p-4 flex items-center justify-between" data-id="\${item.id}" onclick="toggleAddon('\${item.id}')">
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <span class="font-medium">\${item.name}</span>
                <span class="tooltip-trigger">
                  <i class="fas fa-question-circle text-gray-500 text-xs"></i>
                  <div class="tooltip-content">\${item.tooltip}</div>
                </span>
              </div>
              <span class="text-sm text-gray-500">\${formatPrice(item.price)}/\${item.unit}</span>
            </div>
            <div class="check-icon w-6 h-6 bg-white text-black rounded-full flex items-center justify-center">
              <i class="fas fa-check text-xs"></i>
            </div>
          </div>
        \`).join('');
        
        // Location cards
        document.getElementById('location-cards').innerHTML = pricingData.location.map(item => \`
          <div class="price-card glass rounded-xl px-4 py-3 flex items-center gap-3 \${cart.location === item.id ? 'selected' : ''}" data-id="\${item.id}" onclick="selectLocation('\${item.id}')">
            <div class="check-icon w-5 h-5 bg-white text-black rounded-full flex items-center justify-center text-xs">
              <i class="fas fa-check"></i>
            </div>
            <span>\${item.name}</span>
            <span class="text-sm text-gray-500">\${item.price > 0 ? '+' + formatPrice(item.price) : '기본'}</span>
          </div>
        \`).join('');
      }
      
      function createPriceCard(item, type) {
        return \`
          <div class="price-card glass rounded-2xl p-6 relative \${item.recommended ? 'border-white/30' : ''}" data-id="\${item.id}" onclick="selectPricing('\${type}', '\${item.id}')">
            \${item.badge ? \`<div class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 badge-recommended text-xs font-semibold rounded-full whitespace-nowrap">\${item.badge}</div>\` : ''}
            <div class="flex items-start justify-between mb-4">
              <div>
                <span class="text-xs text-gray-500">\${item.name}</span>
                <h4 class="text-lg font-bold">\${item.title}</h4>
              </div>
              <div class="check-icon w-6 h-6 bg-white text-black rounded-full flex items-center justify-center">
                <i class="fas fa-check text-xs"></i>
              </div>
            </div>
            <div class="text-2xl font-bold mb-2">\${formatPrice(item.price)}</div>
            <p class="text-sm text-gray-500 mb-4">\${item.description}</p>
            <ul class="space-y-2">
              \${item.features.map(f => \`<li class="text-sm text-gray-400 flex items-center gap-2"><i class="fas fa-check text-xs text-gray-600"></i>\${f}</li>\`).join('')}
            </ul>
            <div class="mt-4 tooltip-trigger inline-block">
              <span class="text-xs text-gray-500 cursor-help"><i class="fas fa-info-circle mr-1"></i>왜 필요한가요?</span>
              <div class="tooltip-content">\${item.tooltip}</div>
            </div>
          </div>
        \`;
      }
      
      function selectPricing(type, id) {
        cart[type] = id;
        
        // Update UI
        document.querySelectorAll(\`#\${type === 'setup' ? 'setup-cards' : 'monthly-cards'} .price-card\`).forEach(card => {
          card.classList.toggle('selected', card.dataset.id === id);
        });
        
        updateCart();
        updateStepIndicator();
      }
      
      function toggleAddon(id) {
        const index = cart.addons.indexOf(id);
        if (index > -1) {
          cart.addons.splice(index, 1);
        } else {
          cart.addons.push(id);
        }
        
        document.querySelectorAll('#addon-cards .price-card').forEach(card => {
          card.classList.toggle('selected', cart.addons.includes(card.dataset.id));
        });
        
        updateCart();
      }
      
      function selectLocation(id) {
        cart.location = id;
        
        document.querySelectorAll('#location-cards .price-card').forEach(card => {
          card.classList.toggle('selected', card.dataset.id === id);
        });
        
        updateCart();
      }
      
      // ========================================
      // CART
      // ========================================
      
      function updateCart() {
        const cartItems = document.getElementById('cart-items');
        const items = [];
        let setupPrice = 0;
        let monthlyPrice = 0;
        let addonPrice = 0;
        
        // Setup
        if (cart.setup) {
          const setup = pricingData.setup.find(s => s.id === cart.setup);
          items.push({ type: '초기 구축', name: setup.title, price: setup.price });
          setupPrice = setup.price;
        }
        
        // Monthly
        if (cart.monthly) {
          const monthly = pricingData.monthly.find(m => m.id === cart.monthly);
          items.push({ type: '월 관리', name: monthly.title, price: monthly.price });
          monthlyPrice = monthly.price;
        }
        
        // Addons
        cart.addons.forEach(addonId => {
          const addon = pricingData.addons.find(a => a.id === addonId);
          items.push({ type: '옵션', name: addon.name, price: addon.price });
          addonPrice += addon.price;
        });
        
        // Location
        const location = pricingData.location.find(l => l.id === cart.location);
        if (location.price > 0) {
          items.push({ type: '출장비', name: location.name, price: location.price });
          addonPrice += location.price;
        }
        
        const total = setupPrice + monthlyPrice + addonPrice;
        
        // Render cart items
        if (items.length > 0) {
          cartItems.innerHTML = items.map(item => \`
            <div class="flex justify-between items-center text-sm">
              <div>
                <span class="text-gray-500">\${item.type}</span>
                <div class="font-medium">\${item.name}</div>
              </div>
              <span>\${formatPrice(item.price)}</span>
            </div>
          \`).join('');
        } else {
          cartItems.innerHTML = \`
            <div class="text-gray-500 text-center py-8">
              <i class="fas fa-inbox text-3xl mb-2"></i>
              <p>옵션을 선택해주세요</p>
            </div>
          \`;
        }
        
        // Update totals
        document.getElementById('cart-setup-price').textContent = formatPrice(setupPrice);
        document.getElementById('cart-monthly-price').textContent = formatPrice(monthlyPrice);
        document.getElementById('cart-addon-price').textContent = formatPrice(addonPrice);
        document.getElementById('cart-total').textContent = formatPrice(total);
        
        // Enable/disable payment button
        document.getElementById('payment-btn').disabled = !cart.setup || !cart.monthly;
      }
      
      function updateStepIndicator() {
        const steps = document.querySelectorAll('.step-item');
        let currentStep = 1;
        
        if (cart.setup) currentStep = 2;
        if (cart.setup && cart.monthly) currentStep = 3;
        if (cart.setup && cart.monthly && cart.addons.length > 0) currentStep = 4;
        
        steps.forEach((step, i) => {
          step.classList.toggle('active', i < currentStep);
        });
      }
      
      // ========================================
      // PAYMENT
      // ========================================
      
      async function proceedToPayment() {
        if (!cart.setup || !cart.monthly) {
          alert('초기 구축비와 월 관리비를 선택해주세요.');
          return;
        }
        
        const items = [];
        let total = 0;
        
        // Collect items
        const setup = pricingData.setup.find(s => s.id === cart.setup);
        items.push({ name: setup.title, price: setup.price });
        total += setup.price;
        
        const monthly = pricingData.monthly.find(m => m.id === cart.monthly);
        items.push({ name: monthly.title + ' (첫 달)', price: monthly.price });
        total += monthly.price;
        
        cart.addons.forEach(addonId => {
          const addon = pricingData.addons.find(a => a.id === addonId);
          items.push({ name: addon.name, price: addon.price });
          total += addon.price;
        });
        
        const location = pricingData.location.find(l => l.id === cart.location);
        if (location.price > 0) {
          items.push({ name: location.name, price: location.price });
          total += location.price;
        }
        
        try {
          // Get payment info from server
          const response = await fetch('/api/payment/prepare', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items, total })
          });
          
          const paymentData = await response.json();
          
          // Initialize PortOne payment
          // Note: Replace with actual storeId and channelKey in production
          if (typeof PortOne !== 'undefined') {
            const payment = await PortOne.requestPayment({
              storeId: paymentData.storeId,
              channelKey: paymentData.channelKey,
              paymentId: paymentData.orderId,
              orderName: paymentData.orderName,
              totalAmount: total,
              currency: 'KRW',
              payMethod: 'CARD',
              customer: {
                fullName: '',
                phoneNumber: '',
                email: ''
              }
            });
            
            if (payment.code) {
              // Payment error
              alert('결제 실패: ' + payment.message);
            } else {
              // Payment success
              alert('결제가 완료되었습니다! 담당자가 곧 연락드리겠습니다.');
            }
          } else {
            alert('결제 시스템을 준비 중입니다. 잠시 후 다시 시도해주세요.');
          }
        } catch (error) {
          console.error('Payment error:', error);
          alert('결제 처리 중 오류가 발생했습니다.');
        }
      }
      
      // ========================================
      // CHATBOT
      // ========================================
      
      function toggleChat() {
        const panel = document.getElementById('chatbot-panel');
        const btn = document.getElementById('chatbot-btn');
        panel.classList.toggle('active');
        btn.classList.toggle('pulse', !panel.classList.contains('active'));
      }
      
      function handleChatKeypress(e) {
        if (e.key === 'Enter') sendChatMessage();
      }
      
      async function sendChatMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        if (!message) return;
        
        const messagesDiv = document.getElementById('chat-messages');
        
        // Add user message
        messagesDiv.innerHTML += \`
          <div class="chat-message user">
            <div class="message-content">\${escapeHtml(message)}</div>
          </div>
        \`;
        
        input.value = '';
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        
        // Add loading indicator
        const loadingId = 'loading-' + Date.now();
        messagesDiv.innerHTML += \`
          <div class="chat-message bot" id="\${loadingId}">
            <div class="message-content">
              <i class="fas fa-spinner fa-spin mr-2"></i>생각 중...
            </div>
          </div>
        \`;
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        
        // Update context
        chatContext.push({ role: 'user', content: message });
        
        try {
          const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, context: chatContext })
          });
          
          const data = await response.json();
          
          // Remove loading
          document.getElementById(loadingId).remove();
          
          // Add bot response
          messagesDiv.innerHTML += \`
            <div class="chat-message bot">
              <div class="message-content">\${formatChatResponse(data.response)}</div>
            </div>
          \`;
          
          chatContext.push({ role: 'assistant', content: data.response });
          messagesDiv.scrollTop = messagesDiv.scrollHeight;
          
        } catch (error) {
          document.getElementById(loadingId).innerHTML = \`
            <div class="message-content text-red-400">
              죄송합니다, 잠시 후 다시 시도해주세요.
            </div>
          \`;
        }
      }
      
      // ========================================
      // UTILITIES
      // ========================================
      
      function formatPrice(price) {
        return '₩' + price.toLocaleString('ko-KR');
      }
      
      function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
      }
      
      function formatChatResponse(text) {
        return text
          .replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>')
          .replace(/\\n/g, '<br>')
          .replace(/^- /gm, '• ');
      }
    </script>
</body>
</html>`
}

function getAdminHTML(): string {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard | X I Λ I X</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" rel="stylesheet">
    <style>
      body { background: #0a0a0a; color: #fff; font-family: system-ui, sans-serif; }
    </style>
</head>
<body class="min-h-screen p-8">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold mb-8">
        <i class="fas fa-shield-alt mr-3"></i>Admin Dashboard
      </h1>
      
      <div class="grid md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white/5 rounded-xl p-6">
          <div class="text-gray-400 text-sm mb-2">총 결제 건수</div>
          <div class="text-3xl font-bold">0건</div>
        </div>
        <div class="bg-white/5 rounded-xl p-6">
          <div class="text-gray-400 text-sm mb-2">총 매출</div>
          <div class="text-3xl font-bold">₩0</div>
        </div>
        <div class="bg-white/5 rounded-xl p-6">
          <div class="text-gray-400 text-sm mb-2">평균 결제 금액</div>
          <div class="text-3xl font-bold">₩0</div>
        </div>
      </div>
      
      <div class="bg-white/5 rounded-xl p-6">
        <h2 class="text-xl font-semibold mb-4">최근 결제 내역</h2>
        <div class="text-gray-500 text-center py-12">
          <i class="fas fa-inbox text-4xl mb-4"></i>
          <p>아직 결제 내역이 없습니다.</p>
          <p class="text-sm mt-2">결제가 완료되면 여기에 표시됩니다.</p>
        </div>
      </div>
      
      <div class="mt-8 text-center text-gray-500 text-sm">
        <p>⚠️ 이 페이지는 관리자 전용입니다.</p>
        <p>실제 운영 시 인증 시스템을 추가해주세요.</p>
      </div>
    </div>
</body>
</html>`
}

export default app
