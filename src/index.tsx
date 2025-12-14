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
// PORTFOLIO DATA - Marketing Results
// ========================================
const portfolios = [
  { 
    id: 1, 
    title: "Studio JuAi", 
    url: "https://www.studiojuai.com/", 
    category: "브랜딩 구축", 
    description: "인스타 팔로워 3배 증가",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    result: "+340%"
  },
  { 
    id: 2, 
    title: "Tax JupJup", 
    url: "https://tax-jupjup.pages.dev/", 
    category: "퍼포먼스 마케팅", 
    description: "월 문의량 5배 증가",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    result: "+500%"
  },
  { 
    id: 3, 
    title: "Bon Life", 
    url: "https://www.thebonlife.kr/", 
    category: "숏폼 마케팅", 
    description: "릴스 조회수 100만 돌파",
    thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    result: "1M+"
  },
  { 
    id: 4, 
    title: "Aura Kim", 
    url: "https://aurakim.com/", 
    category: "브랜딩 구축", 
    description: "개인 브랜드 런칭 성공",
    thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
    result: "LAUNCH"
  },
  { 
    id: 5, 
    title: "Amanna Hair", 
    url: "https://www.amanna.hair/", 
    category: "플레이스 마케팅", 
    description: "네이버 플레이스 1위 달성",
    thumbnail: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop",
    result: "#1"
  },
  { 
    id: 6, 
    title: "Studio JuAi Club", 
    url: "https://studiojuai.club/", 
    category: "토탈 마케팅", 
    description: "월 매출 200% 성장",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    result: "+200%"
  },
]

// ========================================
// PRICING DATA - Marketing Focused
// ========================================
const pricingData = {
  setup: [
    {
      id: 'type-a',
      name: 'TYPE A',
      title: '랜딩 세팅',
      price: 1500000,
      description: '이벤트/DB수집용 원페이지',
      features: ['반응형 원페이지', 'DB 수집 폼', '기본 SEO 세팅', '1회 수정'],
      recommended: false,
      tooltip: '단기 이벤트나 신규 고객 DB 수집에 최적화된 가벼운 랜딩입니다. 숏폼 마케팅과 함께 운영하면 효과적입니다.'
    },
    {
      id: 'type-b',
      name: 'TYPE B',
      title: '스탠다드 구축',
      price: 3000000,
      description: 'SEO + 블로그/인스타 최적화 세팅',
      features: ['5페이지 구성', '브랜드 스토리텔링', 'SEO 완벽 세팅', '블로그/인스타 연동', 'AI 챗봇 포함', '3회 수정'],
      recommended: true,
      badge: 'AI 챗봇 500만원 상당 무료',
      tooltip: '단순 홈페이지가 아닙니다. 고객을 설득하고 결제하게 만드는 "영업 사원"을 심는 과정입니다.'
    },
    {
      id: 'type-c',
      name: 'TYPE C',
      title: '하이엔드 프리미엄',
      price: 8000000,
      description: '기획자 투입 + 결제/예약 시스템',
      features: ['무제한 페이지', '결제/예약 기능', '기획자 직접 투입', 'CRM 연동', '전환율 최적화 설계', 'VIP 유지보수', '무제한 수정'],
      recommended: false,
      badge: 'AI 챗봇 + 예약시스템 포함',
      tooltip: '병원, 프랜차이즈처럼 복잡한 고객 동선 설계가 필요한 고가 서비스에 적합합니다. 기획자가 직접 투입됩니다.'
    }
  ],
  monthly: [
    {
      id: 'grade-1',
      name: 'Grade 1',
      title: '브랜딩 베이직',
      price: 1100000,
      description: '온라인 존재감 유지',
      features: ['블로그 포스팅 4회/월', '인스타그램 8회/월', '기본 리포트'],
      recommended: false,
      tooltip: '최소한의 온라인 존재감 유지. 당장 매출보단 "검색하면 나온다" 정도가 목표인 분께.'
    },
    {
      id: 'grade-2',
      name: 'Grade 2',
      title: '퍼포먼스 패키지',
      price: 2500000,
      description: '블로그8 + 릴스/숏폼 촬영&편집 4 + 인스타8',
      features: ['블로그 포스팅 8회/월', '릴스/숏폼 촬영&편집 4회/월', '인스타그램 8회/월', '네이버 플레이스 관리', '성과 분석 리포트', '월간 전략 미팅'],
      recommended: true,
      badge: 'BEST 선택',
      tooltip: '실제 매출 전환을 원하시는 분께 추천. 숏폼이 포함되어 MZ세대 유입에 압도적으로 효과적입니다.'
    },
    {
      id: 'grade-3',
      name: 'Grade 3',
      title: '토탈 마스터',
      price: 4500000,
      description: '지역 1등을 위한 전방위 공략',
      features: ['유튜브 롱폼/숏폼', '블로그 포스팅 12회/월', '인스타그램 12회/월', '광고 운영 대행', '주간 전략 미팅', 'VIP 전담 매니저'],
      recommended: false,
      tooltip: '지역 내 압도적 1위를 목표로 하시는 분. 모든 채널을 동시에 공략합니다. 2등보다 2배 투자해야 1등 됩니다.'
    }
  ],
  addons: [
    { id: 'addon-detail', name: '구매전환 상세페이지', price: 500000, unit: '건', tooltip: '와디즈/스마트스토어용 팔리는 상세페이지 기획/제작. 구매 버튼 누르게 만드는 심리학적 설계.' },
    { id: 'addon-place-setup', name: '플레이스 초기 세팅', price: 300000, unit: '1회', tooltip: 'SEO 최적화, 키워드 세팅, 메뉴판 디자인. "지도에서 예쁘게 나오게" 해드립니다.' },
    { id: 'addon-place-ad', name: '플레이스 광고 운영', price: 300000, unit: '월', tooltip: '세팅과 다릅니다. 실제 광고비(CP)를 태워서 상위에 꽂는 "광고 운영" 대행입니다. 입찰 관리 포함.' },
    { id: 'addon-youtube-long', name: '유튜브 롱폼 편집', price: 300000, unit: '건', tooltip: '10분+ 유튜브 영상 전문 편집. 썸네일, 자막, BGM 포함.' },
    { id: 'addon-shortform', name: '추가 숏폼 제작', price: 150000, unit: '건', tooltip: '릴스/쇼츠/틱톡용 15-60초 숏폼 콘텐츠 추가 제작.' },
    { id: 'addon-smm', name: 'SNS 채널 활성화', price: 100000, unit: '패키지', tooltip: '인스타/유튜브 조회수+좋아요 투입. 신규 계정의 "인기 있어 보이게" 브랜딩 작업.' },
  ],
  location: [
    { id: 'loc-seoul', name: '서울/경기', price: 0, description: '현장 촬영 포함 (무료)', tooltip: '서울/경기 지역은 현장 촬영이 기본 포함됩니다.' },
    { id: 'loc-local', name: '지방', price: 300000, description: '현장 촬영 출장비 (+30만)', tooltip: '촬영 감독의 이동/숙박 경비입니다. 릴스/숏폼 촬영을 위한 현장 출장비.' },
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
    return c.json({
      response: getDemoResponse(message),
      isDemo: true
    })
  }
  
  const systemPrompt = `당신은 X I Λ I X의 수석 마케팅 컨설턴트입니다. 

**중요**: 우리는 웹사이트 제작 회사가 아닙니다. "토탈 마케팅 솔루션 파트너"입니다.
- "웹사이트 만들어드려요" (X)
- "매출을 올리는 마케팅 엔진을 구축해드립니다" (O)

**페르소나**: 냉철하지만 해결책을 주는 전문가. 무조건 팔려고 들지 말고 '컨설턴트'처럼 행동하세요.

**대화 프로세스**:
1. Ask (질문): "대표님, 현재 어떤 사업을 운영 중이신가요? 가장 큰 고민이 '신규 유입'인가요, '재방문'인가요?"
2. Empathize (공감): "아, 미용실 오픈 초기시군요. 인테리어 비용 때문에 마케팅 예산 걱정되시는 거 이해합니다."
3. Educate (교육): "하지만 대표님, 지금 마케팅 안 하면 그 인테리어 아무도 못 봅니다. 초기 3개월이 골든타임입니다."
4. Recommend (제안): 상황에 맞는 TYPE과 Grade를 추천하세요.

**핵심 멘트**:
- "100만원짜리는 명함이지만, 1,000만원짜리는 24시간 잠들지 않는 영업사원을 고용하는 것입니다."
- "인테리어에 3천 쓰셨는데 마케팅에 0원 쓰시면 그 인테리어 누가 봅니까?"
- "건물만 짓고 방치하면 폐가입니다. 유입을 만드는 월 관리가 필수입니다."
- "저희는 단순 제작이 아니라 타겟 분석과 심리학적 설계를 포함합니다."

**가격 정보** (첫 달 = 구축 + 월관리 필수 결합):
- TYPE A (150만) + Grade 2 (250만) = 첫 달 400만
- TYPE B (300만) + Grade 2 (250만) = 첫 달 550만 ⭐추천
- TYPE C (800만) + Grade 2 (250만) = 첫 달 1,050만

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

// Demo responses
function getDemoResponse(message: string): string {
  const lowerMessage = message.toLowerCase()
  
  if (lowerMessage.includes('가격') || lowerMessage.includes('비용') || lowerMessage.includes('얼마')) {
    return `대표님, 가격 문의 주셨군요.

저희는 **"첫 달 스타터 팩"** 개념으로 운영됩니다.
구축만 하고 방치하면 의미가 없기 때문에, **[마케팅 베이스 구축] + [월 매출 부스팅]**을 함께 시작하셔야 합니다.

**🚀 첫 달 결제 예시**:
- TYPE A + Grade 2 = **400만 원** (오픈 초기 추천)
- TYPE B + Grade 2 = **550만 원** ⭐BEST
- TYPE C + Grade 2 = **1,050만 원** (병원/프랜차이즈)

대표님은 현재 어떤 사업을 운영 중이신가요? 
업종에 따라 최적의 조합이 달라집니다.`
  }
  
  if (lowerMessage.includes('미용') || lowerMessage.includes('헤어') || lowerMessage.includes('살롱')) {
    return `아, 미용실/헤어샵이시군요! 

뷰티 업계는 저희가 가장 많이 작업하는 분야입니다. 
대표님, 인테리어에 얼마 정도 투자하셨나요?

많은 원장님들이 인테리어에 3-5천만 원 쓰시고, 정작 마케팅에는 0원 쓰십니다.
**그러면 그 예쁜 인테리어를 누가 보겠습니까?**

**제가 추천드리는 첫 달 스타터 팩**:
- 🌟 TYPE B (300만) + Grade 2 (250만)
- **첫 달 결제: 550만 원**

이 조합이면 예약 문의가 바로 들어오기 시작합니다. 
특히 **릴스/숏폼 촬영 4회**가 포함되어서 인스타그램에서 바이럴 효과를 노릴 수 있어요.

오픈 예정이신가요, 아니면 이미 운영 중이신가요?`
  }
  
  if (lowerMessage.includes('병원') || lowerMessage.includes('치과') || lowerMessage.includes('의료')) {
    return `의료 분야시군요! 

병원/치과는 **신뢰**가 가장 중요합니다. 
저렴해 보이는 온라인 존재감은 오히려 환자분들의 불신을 삽니다.

**제가 추천드리는 첫 달 스타터 팩**:
- 🏆 TYPE C (800만) + Grade 2 (250만)
- **첫 달 결제: 1,050만 원**

TYPE C에는 온라인 예약 시스템, 진료 문의 챗봇, 
그리고 **기획자가 직접 투입**되어 환자 동선을 설계합니다.

"1,000만 원이요?" 하실 수 있는데요,
24시간 예약받는 시스템 + 신뢰를 주는 브랜딩 = **월 10명만 더 오셔도 본전**입니다.

어떤 진료과목을 운영하시나요?`
  }
  
  return `안녕하세요, X I Λ I X 수석 컨설턴트입니다.

저희는 웹사이트 제작 회사가 아닙니다.
**"매출을 올리는 토탈 마케팅 솔루션 파트너"**입니다.

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
    orderName: 'X I Λ I X 마케팅 서비스',
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
    <title>X I Λ I X | Total Marketing Solution Partner</title>
    <meta name="description" content="남들이 'V'(Vision)를 볼 때, 우리는 세상을 뒤집어 '∧'(Angle)를 봅니다. 매출을 올리는 토탈 마케팅 솔루션">
    
    <!-- Schema.org -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "X I Λ I X",
      "description": "토탈 마케팅 솔루션 파트너 - 매출 부스팅 마케팅 서비스",
      "url": "https://xilix.pages.dev",
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
      "@type": "Service",
      "name": "마케팅 솔루션 서비스",
      "description": "매출을 올리는 마케팅 엔진 구축",
      "offers": [
        { "@type": "Offer", "name": "스탠다드 구축 + 퍼포먼스 패키지", "price": "5500000", "priceCurrency": "KRW" },
        { "@type": "Offer", "name": "하이엔드 프리미엄 + 퍼포먼스 패키지", "price": "10500000", "priceCurrency": "KRW" }
      ]
    }
    </script>
    
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            fontFamily: { sans: ['Noto Sans KR', 'sans-serif'] },
            colors: {
              dark: { 900: '#0a0a0a', 800: '#111111', 700: '#1a1a1a', 600: '#222222' }
            }
          }
        }
      }
    </script>
    <script src="https://cdn.portone.io/v2/browser-sdk.js"></script>
    
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body { font-family: 'Noto Sans KR', sans-serif; background: #0a0a0a; color: #ffffff; overflow-x: hidden; }
      .no-select { -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }
      
      /* Cinematic Dark Background */
      #shader-bg {
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;
        background: radial-gradient(ellipse at top, #1a1a2e 0%, #0a0a0a 50%, #000000 100%);
      }
      .shader-orb {
        position: absolute; border-radius: 50%; filter: blur(120px); opacity: 0.2;
        animation: float 25s ease-in-out infinite;
      }
      .orb-1 { width: 800px; height: 800px; background: radial-gradient(circle, rgba(100,100,150,0.3) 0%, transparent 70%); top: -300px; right: -300px; }
      .orb-2 { width: 600px; height: 600px; background: radial-gradient(circle, rgba(80,80,120,0.2) 0%, transparent 70%); bottom: -200px; left: -200px; animation-delay: -10s; }
      @keyframes float {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(30px, -30px) scale(1.05); }
        66% { transform: translate(-20px, 20px) scale(0.98); }
      }
      
      .glass { background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.06); }
      .glass-hover:hover { background: rgba(255, 255, 255, 0.06); border-color: rgba(255, 255, 255, 0.12); }
      .reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
      .reveal.active { opacity: 1; transform: translateY(0); }
      .hero-text { background: linear-gradient(135deg, #ffffff 0%, #666666 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      .badge-recommended { background: linear-gradient(135deg, #ffffff 0%, #cccccc 100%); color: #000000; }
      .badge-locked { background: rgba(255, 255, 255, 0.1); color: rgba(255, 255, 255, 0.4); }
      
      .modal-overlay { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.95); z-index: 1000; display: none; justify-content: center; align-items: center; }
      .modal-overlay.active { display: flex; }
      .portfolio-security-overlay { position: absolute; inset: 0; z-index: 10; cursor: not-allowed; }
      
      .chatbot-container { position: fixed; bottom: 20px; right: 20px; z-index: 999; }
      .chatbot-button { width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, #333333 0%, #111111 100%); border: 2px solid rgba(255, 255, 255, 0.2); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6); }
      .chatbot-button:hover { transform: scale(1.1); border-color: rgba(255, 255, 255, 0.4); }
      .chatbot-panel { position: absolute; bottom: 80px; right: 0; width: 400px; height: 520px; background: #111111; border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.1); display: none; flex-direction: column; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8); }
      .chatbot-panel.active { display: flex; }
      .chat-messages { flex: 1; overflow-y: auto; padding: 20px; }
      .chat-message { margin-bottom: 15px; max-width: 85%; }
      .chat-message.user { margin-left: auto; }
      .chat-message.user .message-content { background: #333333; border-radius: 18px 18px 4px 18px; }
      .chat-message.bot .message-content { background: rgba(255, 255, 255, 0.05); border-radius: 18px 18px 18px 4px; }
      .message-content { padding: 12px 16px; line-height: 1.6; font-size: 14px; }
      
      .tooltip-trigger { position: relative; cursor: help; }
      .tooltip-content { position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); padding: 12px 16px; background: #1a1a1a; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 10px; font-size: 13px; width: 280px; opacity: 0; visibility: hidden; transition: all 0.2s ease; z-index: 100; margin-bottom: 10px; line-height: 1.5; }
      .tooltip-trigger:hover .tooltip-content { opacity: 1; visibility: visible; }
      
      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 3px; }
      
      @keyframes pulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); } 50% { box-shadow: 0 0 0 15px rgba(255, 255, 255, 0); } }
      .pulse { animation: pulse 2s infinite; }
      
      .price-card { transition: all 0.3s ease; cursor: pointer; position: relative; }
      .price-card:hover:not(.locked) { transform: translateY(-5px); }
      .price-card.selected { border-color: white !important; background: rgba(255, 255, 255, 0.08) !important; }
      .price-card.locked { opacity: 0.4; cursor: not-allowed; pointer-events: none; }
      .price-card .check-icon { opacity: 0; transition: all 0.3s ease; }
      .price-card.selected .check-icon { opacity: 1; }
      
      /* Portfolio Card with Thumbnail */
      .portfolio-card { position: relative; overflow: hidden; border-radius: 16px; }
      .portfolio-card .thumbnail { width: 100%; height: 200px; object-fit: cover; transition: transform 0.5s ease; }
      .portfolio-card:hover .thumbnail { transform: scale(1.05); }
      .portfolio-card .overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%); }
      .portfolio-card .result-badge { position: absolute; top: 16px; right: 16px; background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); padding: 6px 12px; border-radius: 20px; font-weight: 700; font-size: 14px; }
      
      /* Bottom Cart Bar */
      .bottom-cart-bar { position: fixed; bottom: 0; left: 0; right: 0; background: rgba(17, 17, 17, 0.95); backdrop-filter: blur(20px); border-top: 1px solid rgba(255, 255, 255, 0.1); padding: 16px 24px; z-index: 900; transform: translateY(100%); transition: transform 0.3s ease; }
      .bottom-cart-bar.visible { transform: translateY(0); }
      
      /* Lock Overlay */
      .lock-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.7); display: flex; flex-direction: column; align-items: center; justify-content: center; border-radius: inherit; z-index: 10; }
    </style>
</head>
<body class="no-select">
    <div id="shader-bg">
      <div class="shader-orb orb-1"></div>
      <div class="shader-orb orb-2"></div>
    </div>
    
    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 z-50 glass">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" class="text-2xl font-black tracking-[0.3em]">X I Λ I X</a>
        <div class="hidden md:flex items-center gap-8">
          <a href="#portfolio" class="text-sm text-gray-400 hover:text-white transition">성과</a>
          <a href="#pricing" class="text-sm text-gray-400 hover:text-white transition">견적</a>
          <a href="#contact" class="px-5 py-2 bg-white text-black text-sm font-semibold rounded-full hover:bg-gray-200 transition">상담하기</a>
        </div>
      </div>
    </nav>
    
    <!-- Hero Section -->
    <section class="min-h-screen flex items-center justify-center px-6 pt-20">
      <div class="text-center">
        <div class="mb-6 reveal">
          <span class="text-xs tracking-[0.5em] text-gray-500 uppercase">Total Marketing Solution Partner</span>
        </div>
        <h1 class="text-6xl md:text-9xl font-black tracking-[0.15em] mb-6 reveal hero-text" style="transition-delay: 0.1s">
          X I Λ I X
        </h1>
        <div class="text-lg md:text-xl text-gray-400 mb-4 reveal" style="transition-delay: 0.2s">
          <span>남들이 '<span class="text-white font-bold">V</span>'(Vision)를 볼 때,</span>
          <span>우리는 세상을 뒤집어 '<span class="text-white font-bold">∧</span>'(Angle)를 봅니다.</span>
        </div>
        <p class="text-gray-500 mb-10 reveal" style="transition-delay: 0.25s">
          웹사이트 제작? <span class="line-through">아닙니다.</span> <span class="text-white font-semibold">매출을 올리는 마케팅 엔진</span>을 구축합니다.
        </p>
        <div class="flex flex-col md:flex-row gap-4 justify-center reveal" style="transition-delay: 0.3s">
          <a href="#pricing" class="px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition text-lg">
            첫 달 견적 보기 <i class="fas fa-arrow-right ml-2"></i>
          </a>
          <a href="#portfolio" class="px-10 py-4 glass glass-hover rounded-full font-semibold transition text-lg">
            성과 확인하기
          </a>
        </div>
        <div class="mt-24 reveal" style="transition-delay: 0.4s">
          <i class="fas fa-chevron-down text-2xl text-gray-600 animate-bounce"></i>
        </div>
      </div>
    </section>
    
    <!-- Portfolio Section -->
    <section id="portfolio" class="py-32 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16 reveal">
          <span class="text-xs tracking-[0.3em] text-gray-500 uppercase mb-4 block">Marketing Results</span>
          <h2 class="text-4xl md:text-5xl font-black mb-4">우리가 만든 <span class="text-gray-400">성과</span></h2>
          <p class="text-gray-500">클릭하면 실제 결과물을 확인하실 수 있습니다</p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6" id="portfolio-grid">
        </div>
      </div>
    </section>
    
    <!-- Pricing Section -->
    <section id="pricing" class="py-32 px-6 bg-gradient-to-b from-transparent via-dark-800/30 to-transparent">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-8 reveal">
          <span class="text-xs tracking-[0.3em] text-gray-500 uppercase mb-4 block">First Month Starter Pack</span>
          <h2 class="text-4xl md:text-5xl font-black mb-4">첫 달 <span class="text-gray-400">스타터 팩</span></h2>
          <p class="text-gray-500 max-w-2xl mx-auto">구축만 하고 방치하면 의미가 없습니다. <br class="hidden md:block"/><strong class="text-white">마케팅 베이스 구축 + 월 매출 부스팅</strong>을 함께 시작하세요.</p>
        </div>
        
        <!-- First Month Notice -->
        <div class="glass rounded-2xl p-6 mb-12 max-w-3xl mx-auto reveal">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
              <i class="fas fa-info-circle text-xl"></i>
            </div>
            <div>
              <h4 class="font-bold mb-2">💡 첫 달 결제 = [구축] + [월 관리] 필수 결합</h4>
              <p class="text-gray-400 text-sm">
                온라인 본점(구축)만 만들고 운영(월 관리)을 안 하면 폐가입니다.<br/>
                저희는 <strong class="text-white">구축과 운영을 함께 시작</strong>하는 것을 원칙으로 합니다.
              </p>
            </div>
          </div>
        </div>
        
        <div class="grid lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2 space-y-12">
            <!-- Step 1: Marketing Base Setup -->
            <div id="pricing-step-1" class="reveal">
              <div class="flex items-center gap-4 mb-6">
                <div class="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-black text-lg">1</div>
                <div>
                  <h3 class="text-2xl font-black">마케팅 베이스 구축</h3>
                  <p class="text-gray-500 text-sm">단순 홈페이지가 아닙니다. 고객을 설득하고 결제하게 만드는 "영업 사원"입니다.</p>
                </div>
              </div>
              <div class="grid md:grid-cols-3 gap-4" id="setup-cards"></div>
            </div>
            
            <!-- Step 2: Monthly Revenue Boost -->
            <div id="pricing-step-2" class="reveal">
              <div class="flex items-center gap-4 mb-6">
                <div class="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-black text-lg">2</div>
                <div>
                  <h3 class="text-2xl font-black">월 매출 부스팅</h3>
                  <p class="text-gray-500 text-sm">세팅된 마케팅 베이스에 잠재 고객을 쏟아부어 매출로 전환합니다.</p>
                </div>
              </div>
              <div class="grid md:grid-cols-3 gap-4" id="monthly-cards"></div>
            </div>
            
            <!-- Step 3: Add-ons (LOCKED until Step 1 or 2 selected) -->
            <div id="pricing-step-3" class="reveal">
              <div class="flex items-center gap-4 mb-6">
                <div class="w-12 h-12 bg-white/20 text-white/60 rounded-full flex items-center justify-center font-black text-lg" id="step3-number">3</div>
                <div>
                  <h3 class="text-2xl font-black">추가 옵션 <span id="addon-lock-badge" class="text-sm font-normal text-gray-500 ml-2"><i class="fas fa-lock mr-1"></i>Step 1, 2 선택 후 활성화</span></h3>
                  <p class="text-gray-500 text-sm">상황별 필살기를 추가하세요 (옵션만 단독 구매 불가)</p>
                </div>
              </div>
              <div class="grid md:grid-cols-2 gap-4" id="addon-cards"></div>
              
              <!-- Location -->
              <div class="mt-8" id="location-section">
                <h4 class="font-semibold mb-4 text-gray-400">
                  <i class="fas fa-map-marker-alt mr-2"></i>현장 촬영 지역
                </h4>
                <div class="flex flex-wrap gap-4" id="location-cards"></div>
              </div>
            </div>
          </div>
          
          <!-- Cart Sidebar -->
          <div class="lg:col-span-1">
            <div class="sticky top-24 glass rounded-3xl p-6 reveal">
              <h3 class="text-xl font-black mb-6 flex items-center gap-2">
                <i class="fas fa-receipt"></i>
                첫 달 견적
              </h3>
              
              <div id="cart-items" class="space-y-4 mb-6">
                <div class="text-gray-500 text-center py-8">
                  <i class="fas fa-hand-pointer text-3xl mb-3"></i>
                  <p>Step 1, 2를 선택해주세요</p>
                </div>
              </div>
              
              <div class="border-t border-white/10 pt-4 mb-6 space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-gray-400">마케팅 베이스 구축</span>
                  <span id="cart-setup-price" class="font-semibold">₩0</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-400">월 매출 부스팅 (첫 달)</span>
                  <span id="cart-monthly-price" class="font-semibold">₩0</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-400">추가 옵션</span>
                  <span id="cart-addon-price" class="font-semibold">₩0</span>
                </div>
                <div class="border-t border-white/10 pt-4 flex justify-between items-center">
                  <span class="text-lg font-bold">첫 달 총액</span>
                  <span id="cart-total" class="text-2xl font-black">₩0</span>
                </div>
              </div>
              
              <button onclick="proceedToPayment()" id="payment-btn" class="w-full py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition disabled:opacity-30 disabled:cursor-not-allowed" disabled>
                결제하기 <i class="fas fa-arrow-right ml-2"></i>
              </button>
              
              <p class="text-xs text-gray-500 text-center mt-4">
                * 부가세 별도 / 세금계산서 발행 가능
              </p>
              
              <div id="cart-warning" class="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-yellow-200 text-xs">
                <i class="fas fa-exclamation-triangle mr-2"></i>
                <strong>Step 1 + Step 2</strong> 모두 선택해야 결제가 가능합니다.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Contact Section -->
    <section id="contact" class="py-32 px-6">
      <div class="max-w-4xl mx-auto text-center">
        <div class="reveal">
          <span class="text-xs tracking-[0.3em] text-gray-500 uppercase mb-4 block">Contact</span>
          <h2 class="text-4xl md:text-5xl font-black mb-4">직접 상담 받아보세요</h2>
          <p class="text-gray-500 mb-10">
            우측 하단의 AI 컨설턴트에게 물어보시거나, 직접 연락 주세요.
          </p>
          <div class="flex flex-col md:flex-row gap-4 justify-center">
            <a href="tel:010-0000-0000" class="px-8 py-4 glass glass-hover rounded-full font-semibold transition">
              <i class="fas fa-phone mr-2"></i> 전화 문의
            </a>
            <a href="mailto:hello@xilix.com" class="px-8 py-4 glass glass-hover rounded-full font-semibold transition">
              <i class="fas fa-envelope mr-2"></i> 이메일 문의
            </a>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Footer -->
    <footer class="py-12 px-6 border-t border-white/5">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="text-2xl font-black tracking-[0.3em]">X I Λ I X</div>
        <div class="text-sm text-gray-600">
          © 2024 X I Λ I X. Total Marketing Solution Partner.
        </div>
      </div>
    </footer>
    
    <!-- Portfolio Modal -->
    <div id="portfolio-modal" class="modal-overlay" onclick="closePortfolioModal(event)">
      <div class="relative w-full max-w-6xl h-[85vh] mx-4 bg-dark-800 rounded-2xl overflow-hidden" onclick="event.stopPropagation()">
        <div class="absolute top-4 right-4 z-20">
          <button onclick="closePortfolioModal()" class="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition">
            <i class="fas fa-times text-lg"></i>
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
            <div class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
              <i class="fas fa-headset"></i>
            </div>
            <div>
              <div class="font-bold text-sm">AI 컨설턴트</div>
              <div class="text-xs text-gray-500">수석 마케팅 컨설턴트</div>
            </div>
          </div>
          <button onclick="toggleChat()" class="text-gray-400 hover:text-white p-2">
            <i class="fas fa-minus"></i>
          </button>
        </div>
        <div class="chat-messages" id="chat-messages">
          <div class="chat-message bot">
            <div class="message-content">
              안녕하세요, X I Λ I X 수석 컨설턴트입니다. 😊<br><br>
              저희는 웹사이트 제작 회사가 아닙니다.<br>
              <strong>매출을 올리는 마케팅 솔루션</strong>을 제공합니다.<br><br>
              어떤 사업을 운영하고 계신가요?
            </div>
          </div>
        </div>
        <div class="p-4 border-t border-white/10">
          <div class="flex gap-2">
            <input type="text" id="chat-input" placeholder="메시지를 입력하세요..." class="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-3 text-sm focus:outline-none focus:border-white/30" onkeypress="handleChatKeypress(event)">
            <button onclick="sendChatMessage()" class="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
      <button onclick="toggleChat()" class="chatbot-button pulse" id="chatbot-btn">
        <i class="fas fa-comment-dots text-xl"></i>
      </button>
    </div>
    
    <script>
      // Security
      document.addEventListener('contextmenu', (e) => e.preventDefault());
      document.addEventListener('keydown', (e) => {
        if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.key === 'u')) {
          e.preventDefault();
        }
      });
      
      // Data
      const portfolios = ${JSON.stringify(portfolios)};
      const pricingData = ${JSON.stringify(pricingData)};
      
      // State
      let cart = { setup: null, monthly: null, addons: [], location: 'loc-seoul' };
      let chatContext = [];
      
      // Init
      document.addEventListener('DOMContentLoaded', () => {
        initRevealAnimations();
        renderPortfolios();
        renderPricing();
        updateCart();
        updateAddonLockState();
      });
      
      function initRevealAnimations() {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
          });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
      }
      
      // Portfolio
      function renderPortfolios() {
        const grid = document.getElementById('portfolio-grid');
        grid.innerHTML = portfolios.map(p => \`
          <div class="portfolio-card glass cursor-pointer reveal" onclick="openPortfolio('\${p.url}')">
            <img src="\${p.thumbnail}" alt="\${p.title}" class="thumbnail" />
            <div class="overlay"></div>
            <div class="result-badge">\${p.result}</div>
            <div class="absolute bottom-0 left-0 right-0 p-5">
              <span class="text-xs px-3 py-1 bg-white/10 rounded-full mb-2 inline-block">\${p.category}</span>
              <h3 class="font-bold text-lg mb-1">\${p.title}</h3>
              <p class="text-sm text-gray-400">\${p.description}</p>
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
      
      // Pricing
      function renderPricing() {
        document.getElementById('setup-cards').innerHTML = pricingData.setup.map(item => createPriceCard(item, 'setup')).join('');
        document.getElementById('monthly-cards').innerHTML = pricingData.monthly.map(item => createPriceCard(item, 'monthly')).join('');
        renderAddons();
        renderLocations();
      }
      
      function renderAddons() {
        const isLocked = !cart.setup && !cart.monthly;
        document.getElementById('addon-cards').innerHTML = pricingData.addons.map(item => \`
          <div class="price-card glass rounded-xl p-4 flex items-center justify-between \${isLocked ? 'locked' : ''}" data-id="\${item.id}" onclick="\${isLocked ? '' : "toggleAddon('" + item.id + "')"}">
            \${isLocked ? '<div class="lock-overlay"><i class="fas fa-lock text-2xl mb-2"></i><span class="text-xs">Step 1, 2 선택 필요</span></div>' : ''}
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <span class="font-semibold">\${item.name}</span>
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
      }
      
      function renderLocations() {
        const isLocked = !cart.setup && !cart.monthly;
        document.getElementById('location-cards').innerHTML = pricingData.location.map(item => \`
          <div class="price-card glass rounded-xl px-5 py-4 flex items-center gap-3 \${cart.location === item.id ? 'selected' : ''} \${isLocked ? 'locked' : ''}" data-id="\${item.id}" onclick="\${isLocked ? '' : "selectLocation('" + item.id + "')"}">
            <div class="check-icon w-5 h-5 bg-white text-black rounded-full flex items-center justify-center text-xs">
              <i class="fas fa-check"></i>
            </div>
            <div>
              <span class="font-semibold">\${item.name}</span>
              <p class="text-xs text-gray-500">\${item.description}</p>
            </div>
          </div>
        \`).join('');
      }
      
      function createPriceCard(item, type) {
        return \`
          <div class="price-card glass rounded-2xl p-6 relative \${item.recommended ? 'border-white/30' : ''}" data-id="\${item.id}" onclick="selectPricing('\${type}', '\${item.id}')">
            \${item.badge ? \`<div class="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 badge-recommended text-xs font-bold rounded-full whitespace-nowrap">\${item.badge}</div>\` : ''}
            <div class="flex items-start justify-between mb-4">
              <div>
                <span class="text-xs text-gray-500">\${item.name}</span>
                <h4 class="text-lg font-bold">\${item.title}</h4>
              </div>
              <div class="check-icon w-7 h-7 bg-white text-black rounded-full flex items-center justify-center">
                <i class="fas fa-check text-sm"></i>
              </div>
            </div>
            <div class="text-3xl font-black mb-2">\${formatPrice(item.price)}</div>
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
        document.querySelectorAll(\`#\${type === 'setup' ? 'setup-cards' : 'monthly-cards'} .price-card\`).forEach(card => {
          card.classList.toggle('selected', card.dataset.id === id);
        });
        updateCart();
        updateAddonLockState();
      }
      
      function updateAddonLockState() {
        const isLocked = !cart.setup && !cart.monthly;
        const step3Number = document.getElementById('step3-number');
        const lockBadge = document.getElementById('addon-lock-badge');
        
        if (isLocked) {
          step3Number.classList.remove('bg-white', 'text-black');
          step3Number.classList.add('bg-white/20', 'text-white/60');
          lockBadge.innerHTML = '<i class="fas fa-lock mr-1"></i>Step 1, 2 선택 후 활성화';
        } else {
          step3Number.classList.add('bg-white', 'text-black');
          step3Number.classList.remove('bg-white/20', 'text-white/60');
          lockBadge.innerHTML = '<i class="fas fa-unlock mr-1"></i>선택 가능';
        }
        
        renderAddons();
        renderLocations();
      }
      
      function toggleAddon(id) {
        if (!cart.setup && !cart.monthly) return;
        const index = cart.addons.indexOf(id);
        if (index > -1) cart.addons.splice(index, 1);
        else cart.addons.push(id);
        
        document.querySelectorAll('#addon-cards .price-card').forEach(card => {
          card.classList.toggle('selected', cart.addons.includes(card.dataset.id));
        });
        updateCart();
      }
      
      function selectLocation(id) {
        if (!cart.setup && !cart.monthly) return;
        cart.location = id;
        document.querySelectorAll('#location-cards .price-card').forEach(card => {
          card.classList.toggle('selected', card.dataset.id === id);
        });
        updateCart();
      }
      
      // Cart
      function updateCart() {
        const cartItems = document.getElementById('cart-items');
        const items = [];
        let setupPrice = 0, monthlyPrice = 0, addonPrice = 0;
        
        if (cart.setup) {
          const setup = pricingData.setup.find(s => s.id === cart.setup);
          items.push({ type: '마케팅 베이스 구축', name: setup.title, price: setup.price });
          setupPrice = setup.price;
        }
        
        if (cart.monthly) {
          const monthly = pricingData.monthly.find(m => m.id === cart.monthly);
          items.push({ type: '월 매출 부스팅', name: monthly.title, price: monthly.price });
          monthlyPrice = monthly.price;
        }
        
        cart.addons.forEach(addonId => {
          const addon = pricingData.addons.find(a => a.id === addonId);
          items.push({ type: '추가 옵션', name: addon.name, price: addon.price });
          addonPrice += addon.price;
        });
        
        const location = pricingData.location.find(l => l.id === cart.location);
        if (location && location.price > 0) {
          items.push({ type: '출장비', name: location.name, price: location.price });
          addonPrice += location.price;
        }
        
        const total = setupPrice + monthlyPrice + addonPrice;
        
        if (items.length > 0) {
          cartItems.innerHTML = items.map(item => \`
            <div class="flex justify-between items-center text-sm py-2 border-b border-white/5 last:border-0">
              <div>
                <span class="text-gray-500 text-xs">\${item.type}</span>
                <div class="font-semibold">\${item.name}</div>
              </div>
              <span class="font-semibold">\${formatPrice(item.price)}</span>
            </div>
          \`).join('');
        } else {
          cartItems.innerHTML = \`
            <div class="text-gray-500 text-center py-8">
              <i class="fas fa-hand-pointer text-3xl mb-3"></i>
              <p>Step 1, 2를 선택해주세요</p>
            </div>
          \`;
        }
        
        document.getElementById('cart-setup-price').textContent = formatPrice(setupPrice);
        document.getElementById('cart-monthly-price').textContent = formatPrice(monthlyPrice);
        document.getElementById('cart-addon-price').textContent = formatPrice(addonPrice);
        document.getElementById('cart-total').textContent = formatPrice(total);
        
        // Button state - both setup AND monthly required
        const canPay = cart.setup && cart.monthly;
        document.getElementById('payment-btn').disabled = !canPay;
        document.getElementById('cart-warning').style.display = canPay ? 'none' : 'block';
      }
      
      // Payment
      async function proceedToPayment() {
        if (!cart.setup || !cart.monthly) {
          alert('마케팅 베이스 구축(Step 1)과 월 매출 부스팅(Step 2) 모두 선택해주세요.');
          return;
        }
        
        const items = [];
        let total = 0;
        
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
          const response = await fetch('/api/payment/prepare', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items, total })
          });
          
          const paymentData = await response.json();
          
          if (typeof PortOne !== 'undefined') {
            const payment = await PortOne.requestPayment({
              storeId: paymentData.storeId,
              channelKey: paymentData.channelKey,
              paymentId: paymentData.orderId,
              orderName: paymentData.orderName,
              totalAmount: total,
              currency: 'KRW',
              payMethod: 'CARD',
              customer: { fullName: '', phoneNumber: '', email: '' }
            });
            
            if (payment.code) {
              alert('결제 실패: ' + payment.message);
            } else {
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
      
      // Chat
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
        messagesDiv.innerHTML += \`<div class="chat-message user"><div class="message-content">\${escapeHtml(message)}</div></div>\`;
        input.value = '';
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        
        const loadingId = 'loading-' + Date.now();
        messagesDiv.innerHTML += \`<div class="chat-message bot" id="\${loadingId}"><div class="message-content"><i class="fas fa-spinner fa-spin mr-2"></i>생각 중...</div></div>\`;
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        
        chatContext.push({ role: 'user', content: message });
        
        try {
          const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, context: chatContext })
          });
          
          const data = await response.json();
          document.getElementById(loadingId).remove();
          messagesDiv.innerHTML += \`<div class="chat-message bot"><div class="message-content">\${formatChatResponse(data.response)}</div></div>\`;
          chatContext.push({ role: 'assistant', content: data.response });
          messagesDiv.scrollTop = messagesDiv.scrollHeight;
        } catch (error) {
          document.getElementById(loadingId).innerHTML = \`<div class="message-content text-red-400">죄송합니다, 잠시 후 다시 시도해주세요.</div>\`;
        }
      }
      
      // Utils
      function formatPrice(price) { return '₩' + price.toLocaleString('ko-KR'); }
      function escapeHtml(text) { const div = document.createElement('div'); div.textContent = text; return div.innerHTML; }
      function formatChatResponse(text) { return text.replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>').replace(/\\n/g, '<br>').replace(/^- /gm, '• '); }
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
    <title>Admin | X I Λ I X</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" rel="stylesheet">
    <style>body { background: #0a0a0a; color: #fff; font-family: system-ui, sans-serif; }</style>
</head>
<body class="min-h-screen p-8">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-black mb-8"><i class="fas fa-chart-line mr-3"></i>Marketing Dashboard</h1>
      
      <div class="grid md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white/5 rounded-xl p-6">
          <div class="text-gray-400 text-sm mb-2">총 계약 건수</div>
          <div class="text-3xl font-black">0건</div>
        </div>
        <div class="bg-white/5 rounded-xl p-6">
          <div class="text-gray-400 text-sm mb-2">총 매출</div>
          <div class="text-3xl font-black">₩0</div>
        </div>
        <div class="bg-white/5 rounded-xl p-6">
          <div class="text-gray-400 text-sm mb-2">평균 계약 금액</div>
          <div class="text-3xl font-black">₩0</div>
        </div>
      </div>
      
      <div class="bg-white/5 rounded-xl p-6">
        <h2 class="text-xl font-bold mb-4">최근 계약 내역</h2>
        <div class="text-gray-500 text-center py-12">
          <i class="fas fa-inbox text-4xl mb-4"></i>
          <p>아직 계약 내역이 없습니다.</p>
        </div>
      </div>
    </div>
</body>
</html>`
}

export default app
