import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-pages'

type Bindings = {
  GEMINI_API_KEY?: string
  PORTONE_STORE_ID?: string
  PORTONE_CHANNEL_KEY?: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('/api/*', cors())
app.use('/static/*', serveStatic())

// ========================================
// PORTFOLIO DATA
// ========================================
const portfolios = [
  { id: 1, title: "Studio JuAi", url: "https://www.studiojuai.com/", category: "BRANDING", result: "+340%" },
  { id: 2, title: "Aura Kim", url: "https://aurakim.com/", category: "PERSONAL", result: "LAUNCH" },
  { id: 3, title: "Bon Life", url: "https://www.thebonlife.kr/", category: "COMMERCE", result: "+200%" },
  { id: 4, title: "Amanna Hair", url: "https://www.amanna.hair/", category: "PLACE #1", result: "#1" },
  { id: 5, title: "Studio JuAi Club", url: "https://studiojuai.club/", category: "PREMIUM", result: "1M+" },
]

// ========================================
// PRICING DATA - NO NUMBERS, VALUE-FOCUSED
// ========================================
const pricingData = {
  setup: [
    {
      id: 'type-a',
      name: 'TYPE A',
      title: '랜딩형',
      price: 1500000,
      description: '이벤트/DB수집 최적화',
      features: ['반응형 원페이지 구축', 'DB 수집 폼 설계', '기본 SEO 세팅', '1회 수정 지원'],
      tooltip: '단기 이벤트나 신규 고객 DB 수집에 최적화된 가벼운 랜딩입니다.'
    },
    {
      id: 'type-b',
      name: 'TYPE B',
      title: '스탠다드 브랜딩',
      price: 3000000,
      description: '기업형/검색최적화(SEO) 완벽 세팅',
      features: ['멀티 페이지 구성', '브랜드 스토리텔링', 'SEO 완벽 최적화', 'AI 세일즈 챗봇 포함', '무제한 피드백'],
      recommended: true,
      badge: 'AI 챗봇 500만원 상당 포함',
      tooltip: '24시간 잠들지 않는 영업사원을 심는 과정입니다. 검색 상위노출까지.'
    },
    {
      id: 'type-c',
      name: 'TYPE C',
      title: '하이엔드 솔루션',
      price: 8000000,
      description: '병원/프랜차이즈 전용 결제 시스템',
      features: ['무제한 페이지', '온라인 예약/결제 시스템', '전담 기획자 투입', 'CRM 연동', 'VIP 유지보수'],
      badge: 'ENTERPRISE',
      tooltip: '복잡한 고객 동선과 예약/결제 플로우가 필요한 고가 서비스 전용입니다.'
    }
  ],
  monthly: [
    {
      id: 'grade-1',
      name: 'GRADE 1',
      title: '브랜딩 기초',
      price: 1100000,
      description: '채널 최적화 + 기본 관리',
      features: ['블로그 채널 최적화', '인스타그램 브랜딩 관리', '기본 성과 리포트', 'Trust Building 전략'],
      tooltip: '온라인 존재감 구축. "검색하면 나온다" 수준의 신뢰도 형성.'
    },
    {
      id: 'grade-2',
      name: 'GRADE 2',
      title: '퍼포먼스 그로스',
      price: 2500000,
      description: '상위노출 타겟팅 + 숏폼 알고리즘 공략',
      features: ['블로그 상위노출 타겟팅', '릴스/숏폼 알고리즘 공략', '인스타그램 퍼포먼스', '네이버 플레이스 관리', '전환율 분석 리포트'],
      recommended: true,
      badge: 'BEST',
      tooltip: '실제 매출 전환. 숏폼으로 MZ세대 유입, 블로그로 검색 유입 동시 공략.'
    },
    {
      id: 'grade-3',
      name: 'GRADE 3',
      title: '지역 장악 마스터',
      price: 4500000,
      description: '압도적 트래픽 + 광고 운영',
      features: ['유튜브 롱폼/숏폼 제작', '블로그 풀 커버리지', '인스타그램 집중 공략', '광고 운영 대행', '주간 전략 미팅', 'VIP 전담 매니저'],
      tooltip: '지역 내 압도적 1위. 2등보다 2배 투자해야 1등 됩니다.'
    }
  ],
  addons: [
    { id: 'addon-traffic', name: '채널 활성화 트래픽', price: 100000, unit: '패키지', tooltip: '조회수/좋아요 부스팅. 신규 채널의 "인기 있어 보이게" 브랜딩.' },
    { id: 'addon-detail', name: '구매전환 상세페이지', price: 500000, unit: '건', tooltip: '와디즈/스마트스토어용. 구매 버튼 누르게 만드는 심리학적 설계.' },
    { id: 'addon-shorts', name: '도파민 숏폼 기획/편집', price: 150000, unit: '건', tooltip: '릴스/쇼츠/틱톡용 15-60초 콘텐츠. 알고리즘 타는 구조.' },
    { id: 'addon-place', name: '플레이스 광고 운영', price: 300000, unit: '월', tooltip: '네이버 플레이스 상위노출 입찰 관리.' },
    { id: 'addon-longform', name: '유튜브 롱폼 편집', price: 300000, unit: '건', tooltip: '10분+ 유튜브 영상 전문 편집. 썸네일, 자막, BGM 포함.' },
  ],
  location: [
    { id: 'loc-seoul', name: '서울/경기', price: 0, description: '현장 촬영 포함' },
    { id: 'loc-local', name: '지방', price: 300000, description: '촬영 출장비 +30만' },
  ]
}

// ========================================
// API ROUTES
// ========================================
app.get('/api/portfolios', (c) => c.json(portfolios))
app.get('/api/pricing', (c) => c.json(pricingData))

app.post('/api/chat', async (c) => {
  const { message, context } = await c.req.json()
  const apiKey = c.env?.GEMINI_API_KEY || ''
  
  if (!apiKey) {
    return c.json({ response: getDemoResponse(message), isDemo: true })
  }
  
  const systemPrompt = `당신은 X I Λ I X의 수석 마케팅 컨설턴트입니다.

**핵심 정체성**: 
- 웹사이트 제작사가 아닙니다
- "기술(AI)과 비즈니스를 결합한 마케팅 수익화 솔루션 기업"입니다

**대화 스타일**: 컨설팅 전문가. 무조건 팔지 않고, 질문하고 공감하고 교육한 후 제안합니다.

**프로세스**:
1. 업종 파악: "어떤 사업을 운영하시나요?"
2. 현황 진단: "현재 가장 큰 고민이 무엇인가요?"
3. 공감: "인테리어에 투자하셨는데 마케팅에는 0원이시군요"
4. 교육: "지금 안 하면 그 인테리어 아무도 못 봅니다. 초기 3개월이 골든타임입니다"
5. 제안: 상황에 맞는 TYPE + GRADE 조합 추천

**가격 (첫 달 = 구축 + 관리 세트 필수)**:
- TYPE A + GRADE 2 = 400만 (오픈 초기)
- TYPE B + GRADE 2 = 550만 ⭐추천
- TYPE C + GRADE 2 = 1,050만 (병원/프랜차이즈)

**핵심 멘트**:
- "100만원짜리는 명함, 1,000만원짜리는 24시간 영업사원"
- "건물만 짓고 방치하면 폐가. 유입을 만드는 관리가 필수"

한국어로만 답변. 전문가답게 신뢰감 있게.`

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: systemPrompt }] },
          { role: 'model', parts: [{ text: '안녕하세요, X I Λ I X 컨설턴트입니다. 어떤 사업을 운영하고 계신가요?' }] },
          ...context.map((msg: any) => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
          })),
          { role: 'user', parts: [{ text: message }] }
        ],
        generationConfig: { temperature: 0.7, maxOutputTokens: 1000 }
      })
    })
    const data = await response.json() as any
    return c.json({ response: data.candidates?.[0]?.content?.parts?.[0]?.text || '잠시 후 다시 시도해주세요.', isDemo: false })
  } catch {
    return c.json({ response: getDemoResponse(message), isDemo: true })
  }
})

function getDemoResponse(message: string): string {
  const lower = message.toLowerCase()
  if (lower.includes('가격') || lower.includes('비용') || lower.includes('얼마')) {
    return `대표님, 저희는 **"첫 달 스타터 팩"** 형태로 운영됩니다.

구축만 하고 방치하면 의미가 없기 때문에, **마케팅 베이스 구축 + 월 매출 부스팅**을 함께 시작합니다.

**🚀 첫 달 결제 예시**
• TYPE A + GRADE 2 = **400만**
• TYPE B + GRADE 2 = **550만** ⭐BEST
• TYPE C + GRADE 2 = **1,050만**

어떤 업종을 운영하시나요? 상황에 맞게 추천드리겠습니다.`
  }
  if (lower.includes('미용') || lower.includes('헤어')) {
    return `미용실/헤어샵이시군요!

인테리어에 3-5천만 원 쓰시고, 마케팅에 0원 쓰시는 분들 많습니다.
**그러면 그 예쁜 인테리어를 누가 봅니까?**

**추천 조합**
🌟 TYPE B + GRADE 2 = **550만**
릴스/숏폼 알고리즘 공략이 포함되어 인스타에서 바이럴 가능합니다.

오픈 예정이신가요, 운영 중이신가요?`
  }
  return `안녕하세요, X I Λ I X 컨설턴트입니다.

저희는 웹사이트 제작사가 아닙니다.
**"매출을 올리는 마케팅 수익화 솔루션"**을 제공합니다.

1. 어떤 업종을 운영하시나요?
2. 현재 가장 큰 고민은 무엇인가요?
3. 마케팅에 투자해보신 경험이 있으신가요?

알려주시면 맞춤 솔루션을 제안드리겠습니다.`
}

app.post('/api/payment/prepare', async (c) => {
  const { items, total } = await c.req.json()
  return c.json({
    orderId: `XILIX_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    orderName: 'X I Λ I X 마케팅 솔루션',
    totalAmount: total,
    storeId: c.env?.PORTONE_STORE_ID || 'store-xxxxxxxx',
    channelKey: c.env?.PORTONE_CHANNEL_KEY || 'channel-xxxxxxxx',
    items
  })
})

// ========================================
// MAIN PAGE
// ========================================
app.get('/', (c) => c.html(getMainHTML()))
app.get('/admin', (c) => c.html(getAdminHTML()))

function getMainHTML(): string {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>X I Λ I X | AI Marketing Revenue Partner</title>
    <meta name="description" content="기술(AI)과 비즈니스를 결합한 마케팅 수익화 솔루션. 웹사이트 제작사가 아닌, Total Marketing Solution Partner.">
    
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "X I Λ I X",
      "alternateName": "XILIX",
      "description": "기술(AI)과 비즈니스를 결합한 마케팅 수익화 솔루션 기업. Total Marketing Solution Partner.",
      "url": "https://xilix.pages.dev",
      "sameAs": [],
      "foundingDate": "2024"
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "X I Λ I X 마케팅 솔루션",
      "description": "온라인 본점 구축 + 월 매출 부스팅 패키지",
      "brand": { "@type": "Brand", "name": "X I Λ I X" },
      "offers": [
        { "@type": "Offer", "name": "TYPE A 랜딩형", "price": "1500000", "priceCurrency": "KRW" },
        { "@type": "Offer", "name": "TYPE B 스탠다드", "price": "3000000", "priceCurrency": "KRW" },
        { "@type": "Offer", "name": "TYPE C 하이엔드", "price": "8000000", "priceCurrency": "KRW" }
      ]
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "왜 구축과 관리를 함께 해야 하나요?",
          "acceptedAnswer": { "@type": "Answer", "text": "건물만 짓고 방치하면 폐가가 됩니다. 마케팅 베이스를 구축한 후 트래픽을 공급해야 실제 매출이 발생합니다." }
        },
        {
          "@type": "Question",
          "name": "최소 비용은 얼마인가요?",
          "acceptedAnswer": { "@type": "Answer", "text": "TYPE A(150만) + GRADE 1(110만) = 260만원부터 시작 가능합니다. 추천 조합은 TYPE B + GRADE 2 = 550만원입니다." }
        }
      ]
    }
    </script>
    
    <!-- Fonts: Pretendard + Syncopate -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            fontFamily: {
              sans: ['Pretendard', 'sans-serif'],
              display: ['Syncopate', 'sans-serif']
            }
          }
        }
      }
    </script>
    <script src="https://cdn.portone.io/v2/browser-sdk.js"></script>
    
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html { scroll-behavior: smooth; font-size: 16px; }
      body { 
        font-family: 'Pretendard Variable', 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
        font-feature-settings: 'ss01' on;
        background: #000000; 
        color: #ffffff; 
        overflow-x: hidden;
        line-height: 1.6;
        font-weight: 400;
        letter-spacing: -0.01em;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      .no-select { -webkit-user-select: none; user-select: none; }
      
      /* Heavy Shader Background - studiojuai.club inspired */
      #shader-bg {
        position: fixed; inset: 0; z-index: -1;
        background: #000000;
        overflow: hidden;
      }
      .shader-layer {
        position: absolute; inset: 0;
        background: 
          radial-gradient(ellipse 100% 60% at 50% -30%, rgba(25,25,40,0.6) 0%, transparent 60%),
          radial-gradient(ellipse 80% 50% at 100% 100%, rgba(20,20,35,0.4) 0%, transparent 50%),
          radial-gradient(ellipse 60% 40% at 0% 80%, rgba(15,15,30,0.3) 0%, transparent 40%);
      }
      .shader-orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(80px);
        opacity: 0.15;
        animation: float 20s ease-in-out infinite;
      }
      .shader-orb:nth-child(1) {
        width: 600px; height: 600px;
        background: radial-gradient(circle, rgba(60,60,100,0.8) 0%, transparent 70%);
        top: -200px; left: 30%;
        animation-delay: 0s;
      }
      .shader-orb:nth-child(2) {
        width: 400px; height: 400px;
        background: radial-gradient(circle, rgba(50,50,80,0.6) 0%, transparent 70%);
        bottom: -100px; right: 10%;
        animation-delay: -5s;
      }
      .shader-orb:nth-child(3) {
        width: 300px; height: 300px;
        background: radial-gradient(circle, rgba(40,40,70,0.5) 0%, transparent 70%);
        top: 40%; left: -100px;
        animation-delay: -10s;
      }
      @keyframes float {
        0%, 100% { transform: translate(0, 0) scale(1); }
        25% { transform: translate(30px, -20px) scale(1.05); }
        50% { transform: translate(-20px, 30px) scale(0.95); }
        75% { transform: translate(20px, 20px) scale(1.02); }
      }
      .noise-overlay {
        position: absolute; inset: 0;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        opacity: 0.025;
        pointer-events: none;
        mix-blend-mode: overlay;
      }
      
      .glass { 
        background: rgba(255,255,255,0.015); 
        backdrop-filter: blur(24px) saturate(1.2); 
        -webkit-backdrop-filter: blur(24px) saturate(1.2);
        border: 1px solid rgba(255,255,255,0.04); 
        box-shadow: 0 4px 30px rgba(0,0,0,0.3);
      }
      .glass-hover:hover { 
        background: rgba(255,255,255,0.04); 
        border-color: rgba(255,255,255,0.08); 
        transform: translateY(-2px);
        box-shadow: 0 8px 40px rgba(0,0,0,0.4);
      }
      
      .reveal { 
        opacity: 0; 
        transform: translateY(50px); 
        transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .reveal.active { opacity: 1; transform: translateY(0); }
      .reveal-delay-1 { transition-delay: 0.1s; }
      .reveal-delay-2 { transition-delay: 0.2s; }
      .reveal-delay-3 { transition-delay: 0.3s; }
      .reveal-delay-4 { transition-delay: 0.4s; }
      
      /* Price Cards - Premium Feel */
      .price-card { 
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); 
        cursor: pointer; 
        position: relative;
        border-radius: 16px;
      }
      .price-card:hover:not(.locked):not(.disabled) { 
        transform: translateY(-10px) scale(1.02); 
        border-color: rgba(255,255,255,0.15);
        box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05);
      }
      .price-card.selected { 
        border-color: #ffffff !important; 
        background: rgba(255,255,255,0.05) !important;
        box-shadow: 0 0 0 1px #ffffff, 0 20px 60px rgba(255,255,255,0.1);
      }
      .price-card.disabled { opacity: 0.25; pointer-events: none; filter: grayscale(0.5); }
      .price-card.locked { opacity: 0.2; cursor: not-allowed; filter: grayscale(0.7); }
      .price-card .check-icon { opacity: 0; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); transform: scale(0.8); }
      .price-card.selected .check-icon { opacity: 1; transform: scale(1); }
      
      .lock-overlay {
        position: absolute; inset: 0; z-index: 10;
        background: rgba(0,0,0,0.8);
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        border-radius: inherit;
      }
      
      /* Portfolio - Dark Cinematic Style */
      .portfolio-card { 
        position: relative; 
        overflow: hidden; 
        aspect-ratio: 16/10;
        border-radius: 12px;
        transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .portfolio-card::before {
        content: ''; position: absolute; inset: 0;
        background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.95) 100%);
        z-index: 1;
        transition: all 0.5s ease;
      }
      .portfolio-card:hover::before {
        background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.9) 100%);
      }
      .portfolio-card:hover {
        transform: scale(1.03);
        box-shadow: 0 30px 80px rgba(0,0,0,0.6);
      }
      .portfolio-card iframe { 
        width: 100%; height: 100%; border: none; pointer-events: none; 
        transform: scale(1.15);
        transition: transform 0.6s ease;
      }
      .portfolio-card:hover iframe { transform: scale(1.2); }
      .portfolio-overlay { position: absolute; inset: 0; z-index: 5; cursor: pointer; }
      
      /* Modal - Cinematic */
      .modal-overlay { 
        position: fixed; inset: 0; 
        background: rgba(0,0,0,0.97); 
        z-index: 1000; 
        display: none; 
        justify-content: center; 
        align-items: center;
        backdrop-filter: blur(10px);
        opacity: 0;
        transition: opacity 0.4s ease;
      }
      .modal-overlay.active { display: flex; opacity: 1; }
      .security-overlay { position: absolute; inset: 0; z-index: 10; }
      
      /* Chatbot - Premium Design */
      .chatbot-container { position: fixed; bottom: 28px; right: 28px; z-index: 999; }
      .chatbot-btn { 
        width: 60px; height: 60px; border-radius: 50%; 
        background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%); 
        border: 1px solid rgba(255,255,255,0.12); 
        cursor: pointer; display: flex; align-items: center; justify-content: center; 
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        box-shadow: 0 4px 20px rgba(0,0,0,0.4);
      }
      .chatbot-btn:hover { 
        transform: scale(1.1) translateY(-3px); 
        border-color: rgba(255,255,255,0.25);
        box-shadow: 0 8px 30px rgba(0,0,0,0.5);
      }
      .chatbot-panel { 
        position: absolute; bottom: 75px; right: 0; 
        width: 380px; height: 500px; 
        background: linear-gradient(180deg, #0d0d0d 0%, #080808 100%); 
        border-radius: 20px; 
        border: 1px solid rgba(255,255,255,0.08); 
        display: none; flex-direction: column; overflow: hidden;
        box-shadow: 0 20px 60px rgba(0,0,0,0.7);
      }
      .chatbot-panel.active { display: flex; animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
      @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      .chat-messages { flex: 1; overflow-y: auto; padding: 20px; }
      .chat-message { margin-bottom: 16px; max-width: 85%; }
      .chat-message.user { margin-left: auto; }
      .chat-message.user .msg-content { background: rgba(255,255,255,0.08); border-radius: 18px 18px 4px 18px; }
      .chat-message.bot .msg-content { background: rgba(255,255,255,0.03); border-radius: 18px 18px 18px 4px; border: 1px solid rgba(255,255,255,0.05); }
      .msg-content { padding: 14px 18px; line-height: 1.7; font-size: 14px; font-weight: 400; }
      
      .tooltip { position: relative; }
      .tooltip-text { 
        position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%) translateY(10px); 
        padding: 14px 18px; 
        background: rgba(15,15,15,0.98); 
        border: 1px solid rgba(255,255,255,0.08); 
        border-radius: 12px; 
        font-size: 13px; font-weight: 400;
        width: 280px; 
        opacity: 0; visibility: hidden; 
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); 
        z-index: 100; margin-bottom: 12px; line-height: 1.6;
        box-shadow: 0 10px 40px rgba(0,0,0,0.5);
      }
      .tooltip:hover .tooltip-text { opacity: 1; visibility: visible; transform: translateX(-50%) translateY(0); }
      
      @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(255,255,255,0.2); } 50% { box-shadow: 0 0 0 15px rgba(255,255,255,0); } }
      .pulse { animation: pulse 2.5s ease-in-out infinite; }
      
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 2px; }
      
      /* Bottom Cart Bar - Premium */
      .bottom-bar {
        position: fixed; bottom: 0; left: 0; right: 0; z-index: 800;
        background: rgba(5,5,5,0.97); 
        backdrop-filter: blur(30px) saturate(1.5);
        -webkit-backdrop-filter: blur(30px) saturate(1.5);
        border-top: 1px solid rgba(255,255,255,0.06);
        padding: 18px 28px;
        transform: translateY(100%); 
        transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        box-shadow: 0 -10px 40px rgba(0,0,0,0.5);
      }
      .bottom-bar.visible { transform: translateY(0); }
    </style>
</head>
<body class="no-select">
    <div id="shader-bg">
      <div class="shader-layer"></div>
      <div class="shader-orb"></div>
      <div class="shader-orb"></div>
      <div class="shader-orb"></div>
      <div class="noise-overlay"></div>
    </div>
    
    <!-- Nav - Premium Glass -->
    <nav class="fixed top-0 left-0 right-0 z-50 glass">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" class="font-display text-lg tracking-[0.5em] font-bold hover:opacity-80 transition-opacity" style="letter-spacing: 0.5em;">XIΛIX</a>
        <div class="hidden md:flex items-center gap-12">
          <a href="#works" class="text-[13px] text-gray-400 hover:text-white transition-colors duration-300 tracking-[0.15em] uppercase font-medium">Works</a>
          <a href="#pricing" class="text-[13px] text-gray-400 hover:text-white transition-colors duration-300 tracking-[0.15em] uppercase font-medium">Pricing</a>
          <a href="#contact" class="px-6 py-2.5 bg-white text-black text-[13px] font-semibold tracking-[0.1em] uppercase hover:bg-gray-100 transition-all duration-300 hover:shadow-lg hover:shadow-white/10">Contact</a>
        </div>
      </div>
    </nav>
    
    <!-- Hero - Cinematic Premium -->
    <section class="min-h-screen flex items-center justify-center px-6 pt-24 pb-20">
      <div class="text-center max-w-5xl">
        <div class="mb-10 reveal">
          <span class="text-[11px] tracking-[0.5em] text-gray-500 uppercase font-medium">AI × Business Marketing Solution</span>
        </div>
        <h1 class="font-display text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-[0.2em] mb-10 reveal reveal-delay-1 leading-none" style="font-weight: 700; letter-spacing: 0.25em;">
          XIΛIX
        </h1>
        <div class="text-base md:text-lg text-gray-400 mb-8 reveal reveal-delay-2 max-w-2xl mx-auto leading-relaxed">
          남들이 '<span class="text-white font-semibold">V</span>'(Vision)를 볼 때,<br class="hidden sm:block"/>
          우리는 세상을 뒤집어 '<span class="text-white font-semibold">∧</span>'(Angle)를 봅니다.
        </div>
        <p class="text-gray-500 mb-14 reveal reveal-delay-3 text-sm md:text-base">
          웹사이트 제작사? <span class="line-through opacity-40">아닙니다.</span>
          <span class="text-white font-medium ml-2">마케팅 수익화 솔루션</span>을 제공합니다.
        </p>
        <div class="flex flex-col sm:flex-row gap-5 justify-center reveal reveal-delay-4">
          <a href="#pricing" class="group px-10 py-4 bg-white text-black font-semibold tracking-[0.05em] hover:bg-gray-100 transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1">
            견적 시작하기
            <i class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
          </a>
          <a href="#works" class="px-10 py-4 glass glass-hover font-medium tracking-[0.05em] transition-all duration-300">
            성과 확인하기
          </a>
        </div>
      </div>
    </section>
    
    <!-- Works - Premium Gallery -->
    <section id="works" class="py-32 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-20 reveal">
          <span class="text-[11px] tracking-[0.4em] text-gray-500 uppercase mb-6 block font-medium">Selected Works</span>
          <h2 class="font-display text-4xl md:text-5xl font-bold tracking-[0.15em]">PORTFOLIO</h2>
          <p class="text-gray-500 mt-6 max-w-xl mx-auto text-sm leading-relaxed">실제 구축한 프로젝트들입니다. 클릭하면 사이트를 확인할 수 있습니다.</p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8" id="portfolio-grid"></div>
      </div>
    </section>
    
    <!-- Pricing - Premium Quote Builder -->
    <section id="pricing" class="py-32 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16 reveal">
          <span class="text-[11px] tracking-[0.4em] text-gray-500 uppercase mb-6 block font-medium">First Month Starter Pack</span>
          <h2 class="font-display text-4xl md:text-5xl font-bold tracking-[0.15em] mb-6">PRICING</h2>
          <p class="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            구축만 하고 방치하면 의미가 없습니다.<br/>
            <strong class="text-white font-semibold">마케팅 베이스 구축 + 월 매출 부스팅</strong>을 함께 시작하세요.
          </p>
        </div>
        
        <!-- Starter Pack Notice - Elegant -->
        <div class="glass rounded-2xl p-8 mb-20 max-w-3xl mx-auto reveal border border-white/5">
          <div class="flex items-start gap-5">
            <div class="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0">
              <i class="fas fa-link text-xl text-gray-300"></i>
            </div>
            <div>
              <h4 class="font-semibold mb-2 text-lg tracking-tight">첫 달 필수 패키지</h4>
              <p class="text-gray-400 text-sm leading-relaxed">
                Step 1(구축)과 Step 2(관리)는 <strong class="text-white font-medium">세트로만 구매 가능</strong>합니다.<br/>
                온라인 본점을 짓고 바로 운영해야 의미가 있습니다.
              </p>
            </div>
          </div>
        </div>
        
        <div class="grid lg:grid-cols-3 gap-10">
          <div class="lg:col-span-2 space-y-16">
            <!-- Step 1 - Marketing Base -->
            <div class="reveal">
              <div class="flex items-center gap-5 mb-10">
                <div class="w-16 h-16 bg-white text-black rounded-2xl flex items-center justify-center font-bold text-2xl shadow-lg shadow-white/10">1</div>
                <div>
                  <h3 class="text-2xl font-bold tracking-tight">마케팅 베이스 구축</h3>
                  <p class="text-gray-500 text-sm mt-1">24시간 잠들지 않는 온라인 본점을 짓습니다</p>
                </div>
              </div>
              <div class="grid md:grid-cols-3 gap-5" id="setup-cards"></div>
            </div>
            
            <!-- Step 2 -->
            <div class="reveal" id="step2-section">
              <div class="flex items-center gap-4 mb-8">
                <div class="w-14 h-14 bg-white text-black rounded-lg flex items-center justify-center font-bold text-xl" id="step2-icon">2</div>
                <div>
                  <h3 class="text-2xl font-bold">월 매출 부스팅</h3>
                  <p class="text-gray-500 text-sm">알고리즘 최적화와 트래픽 공급으로 실제 매출을 만듭니다</p>
                </div>
                <span id="step2-lock-badge" class="text-xs text-gray-500 ml-auto hidden">
                  <i class="fas fa-lock mr-1"></i>Step 1 선택 필요
                </span>
              </div>
              <div class="grid md:grid-cols-3 gap-4" id="monthly-cards"></div>
            </div>
            
            <!-- Step 3 -->
            <div class="reveal" id="step3-section">
              <div class="flex items-center gap-4 mb-8">
                <div class="w-14 h-14 bg-white/10 text-gray-400 rounded-lg flex items-center justify-center font-bold text-xl" id="step3-icon">3</div>
                <div>
                  <h3 class="text-2xl font-bold text-gray-400" id="step3-title">애드온 (Add-on)</h3>
                  <p class="text-gray-600 text-sm">상황별 필살기 추가 (옵션 단독 구매 불가)</p>
                </div>
                <span id="step3-lock-badge" class="text-xs text-gray-500 ml-auto">
                  <i class="fas fa-lock mr-1"></i>Step 1, 2 선택 필요
                </span>
              </div>
              <div class="grid md:grid-cols-2 gap-4" id="addon-cards"></div>
              
              <div class="mt-10" id="location-section">
                <h4 class="text-sm font-semibold mb-4 text-gray-400 tracking-wide">
                  <i class="fas fa-map-marker-alt mr-2"></i>현장 촬영 지역
                </h4>
                <div class="flex flex-wrap gap-4" id="location-cards"></div>
              </div>
            </div>
          </div>
          
          <!-- Cart - Premium Sidebar -->
          <div class="lg:col-span-1">
            <div class="sticky top-28 glass rounded-2xl p-7 reveal border border-white/5">
              <h3 class="text-xl font-semibold mb-8 flex items-center gap-3 tracking-tight">
                <i class="fas fa-receipt text-gray-400"></i>첫 달 견적
              </h3>
              
              <div id="cart-items" class="space-y-3 mb-6 min-h-[100px]">
                <div class="text-gray-600 text-center py-10">
                  <i class="fas fa-hand-pointer text-2xl mb-3"></i>
                  <p class="text-sm">Step 1을 선택해주세요</p>
                </div>
              </div>
              
              <div class="border-t border-white/10 pt-5 space-y-3">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-500">마케팅 베이스 구축</span>
                  <span id="cart-setup">₩0</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-500">월 매출 부스팅</span>
                  <span id="cart-monthly">₩0</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-500">애드온/출장비</span>
                  <span id="cart-addon">₩0</span>
                </div>
                <div class="border-t border-white/10 pt-4 flex justify-between items-center">
                  <span class="font-bold text-lg">첫 달 총액</span>
                  <span id="cart-total" class="text-2xl font-bold">₩0</span>
                </div>
              </div>
              
              <button onclick="proceedToPayment()" id="pay-btn" class="w-full mt-8 py-4 bg-white text-black font-semibold tracking-wide hover:bg-gray-100 transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-white/10" disabled>
                결제하기
              </button>
              
              <p class="text-xs text-gray-500 text-center mt-5">부가세 별도 / 세금계산서 발행 가능</p>
              
              <div id="cart-warning" class="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-300/80 text-xs">
                <i class="fas fa-exclamation-triangle mr-2"></i>
                <strong>Step 1 + Step 2</strong> 세트 선택 필수
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Contact - Premium CTA -->
    <section id="contact" class="py-32 px-6">
      <div class="max-w-4xl mx-auto text-center reveal">
        <span class="text-[11px] tracking-[0.4em] text-gray-500 uppercase mb-6 block font-medium">Get Started</span>
        <h2 class="font-display text-4xl md:text-5xl font-bold tracking-[0.15em] mb-8">GET IN TOUCH</h2>
        <p class="text-gray-400 mb-12 text-sm md:text-base">우측 하단 AI 컨설턴트 또는 직접 연락해주세요</p>
        <div class="flex flex-col sm:flex-row gap-5 justify-center">
          <a href="tel:010-0000-0000" class="px-10 py-4 glass glass-hover font-medium transition-all duration-300 tracking-wide">
            <i class="fas fa-phone mr-3"></i>전화 문의
          </a>
          <a href="mailto:hello@xilix.com" class="px-10 py-4 glass glass-hover font-medium transition-all duration-300 tracking-wide">
            <i class="fas fa-envelope mr-3"></i>이메일 문의
          </a>
        </div>
      </div>
    </section>
    
    <!-- Footer - Minimal Premium -->
    <footer class="py-12 px-6 border-t border-white/5">
      <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <span class="font-display text-lg tracking-[0.4em] font-bold">XIΛIX</span>
        <span class="text-[11px] text-gray-500 tracking-wide">© 2024 X I Λ I X. All rights reserved.</span>
      </div>
    </footer>
    
    <!-- Portfolio Modal -->
    <div id="portfolio-modal" class="modal-overlay" onclick="closeModal(event)">
      <div class="relative w-full max-w-6xl h-[85vh] mx-4 bg-black rounded-xl overflow-hidden" onclick="event.stopPropagation()">
        <button onclick="closeModal()" class="absolute top-4 right-4 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition">
          <i class="fas fa-times text-lg"></i>
        </button>
        <div class="security-overlay"></div>
        <iframe id="modal-iframe" class="w-full h-full" sandbox="allow-scripts allow-same-origin"></iframe>
      </div>
    </div>
    
    <!-- Chatbot -->
    <div class="chatbot-container">
      <div id="chat-panel" class="chatbot-panel">
        <div class="p-4 border-b border-white/10 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
              <i class="fas fa-headset"></i>
            </div>
            <div>
              <div class="font-bold text-sm">AI 컨설턴트</div>
              <div class="text-xs text-gray-500">마케팅 전문가</div>
            </div>
          </div>
          <button onclick="toggleChat()" class="text-gray-400 hover:text-white p-2"><i class="fas fa-minus"></i></button>
        </div>
        <div class="chat-messages" id="chat-messages">
          <div class="chat-message bot">
            <div class="msg-content">
              안녕하세요, X I Λ I X 컨설턴트입니다.<br><br>
              저희는 웹사이트 제작사가 아닙니다.<br>
              <strong>매출을 올리는 마케팅 솔루션</strong>을 제공합니다.<br><br>
              어떤 사업을 운영하시나요?
            </div>
          </div>
        </div>
        <div class="p-4 border-t border-white/10">
          <div class="flex gap-2">
            <input type="text" id="chat-input" placeholder="메시지 입력..." class="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-3 text-sm focus:outline-none focus:border-white/20" onkeypress="if(event.key==='Enter')sendChat()">
            <button onclick="sendChat()" class="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
      <button onclick="toggleChat()" class="chatbot-btn pulse" id="chat-btn">
        <i class="fas fa-comment-dots text-xl"></i>
      </button>
    </div>
    
    <!-- Bottom Bar -->
    <div class="bottom-bar" id="bottom-bar">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-6 text-sm">
          <span class="text-gray-500">구축 <strong class="text-white" id="bb-setup">₩0</strong></span>
          <span class="text-gray-500">+ 관리 <strong class="text-white" id="bb-monthly">₩0</strong></span>
          <span class="text-gray-500">+ 옵션 <strong class="text-white" id="bb-addon">₩0</strong></span>
        </div>
        <div class="flex items-center gap-4">
          <span class="text-xl font-bold" id="bb-total">₩0</span>
          <button onclick="proceedToPayment()" class="px-8 py-3 bg-white text-black font-bold text-sm hover:bg-gray-200 transition disabled:opacity-30" id="bb-pay-btn" disabled>
            결제하기
          </button>
        </div>
      </div>
    </div>
    
    <script>
      // Security
      document.addEventListener('contextmenu', e => e.preventDefault());
      document.addEventListener('keydown', e => {
        if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.key === 'u')) e.preventDefault();
      });
      
      // Data
      const portfolios = ${JSON.stringify(portfolios)};
      const pricing = ${JSON.stringify(pricingData)};
      
      // State
      let cart = { setup: null, monthly: null, addons: [], location: 'loc-seoul' };
      let chatCtx = [];
      
      // Init
      document.addEventListener('DOMContentLoaded', () => {
        initReveal();
        renderPortfolios();
        renderPricing();
        updateUI();
      });
      
      function initReveal() {
        const obs = new IntersectionObserver(entries => {
          entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
      }
      
      // Portfolio
      function renderPortfolios() {
        document.getElementById('portfolio-grid').innerHTML = portfolios.map(p => \`
          <div class="portfolio-card glass rounded-xl reveal" onclick="openModal('\${p.url}')">
            <iframe src="\${p.url}" loading="lazy"></iframe>
            <div class="portfolio-overlay"></div>
            <div class="absolute top-4 right-4 z-10 px-3 py-1 bg-white/10 backdrop-blur rounded-full text-xs font-bold">\${p.result}</div>
            <div class="absolute bottom-0 left-0 right-0 p-5 z-10">
              <span class="text-xs text-gray-400 tracking-wider">\${p.category}</span>
              <h3 class="font-bold text-lg mt-1">\${p.title}</h3>
            </div>
          </div>
        \`).join('');
      }
      
      function openModal(url) {
        document.getElementById('modal-iframe').src = url;
        document.getElementById('portfolio-modal').classList.add('active');
        document.body.style.overflow = 'hidden';
      }
      
      function closeModal(e) {
        if (e && e.target !== e.currentTarget) return;
        document.getElementById('modal-iframe').src = '';
        document.getElementById('portfolio-modal').classList.remove('active');
        document.body.style.overflow = '';
      }
      
      // Pricing
      function renderPricing() {
        renderSetup();
        renderMonthly();
        renderAddons();
        renderLocations();
      }
      
      function renderSetup() {
        document.getElementById('setup-cards').innerHTML = pricing.setup.map(item => \`
          <div class="price-card glass rounded-xl p-6 \${item.recommended ? 'border-white/20' : ''}" data-id="\${item.id}" onclick="selectSetup('\${item.id}')">
            \${item.badge ? \`<div class="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-black text-xs font-bold rounded-full whitespace-nowrap">\${item.badge}</div>\` : ''}
            <div class="flex justify-between items-start mb-4">
              <div>
                <span class="text-xs text-gray-500">\${item.name}</span>
                <h4 class="font-bold text-lg">\${item.title}</h4>
              </div>
              <div class="check-icon w-6 h-6 bg-white text-black rounded-full flex items-center justify-center text-xs">
                <i class="fas fa-check"></i>
              </div>
            </div>
            <div class="text-3xl font-bold mb-2">\${formatPrice(item.price)}</div>
            <p class="text-sm text-gray-500 mb-4">\${item.description}</p>
            <ul class="space-y-2 text-sm text-gray-400">
              \${item.features.map(f => \`<li class="flex items-start gap-2"><i class="fas fa-check text-xs mt-1 text-gray-600"></i><span>\${f}</span></li>\`).join('')}
            </ul>
            <div class="mt-4 tooltip">
              <span class="text-xs text-gray-600 cursor-help"><i class="fas fa-info-circle mr-1"></i>상세 정보</span>
              <div class="tooltip-text">\${item.tooltip}</div>
            </div>
          </div>
        \`).join('');
      }
      
      function renderMonthly() {
        const isLocked = !cart.setup;
        document.getElementById('monthly-cards').innerHTML = pricing.monthly.map(item => \`
          <div class="price-card glass rounded-xl p-6 \${item.recommended ? 'border-white/20' : ''} \${isLocked ? 'disabled' : ''}" data-id="\${item.id}" onclick="\${isLocked ? '' : "selectMonthly('" + item.id + "')"}">
            \${isLocked ? '<div class="lock-overlay"><i class="fas fa-lock text-xl mb-2"></i><span class="text-xs">Step 1 선택 필요</span></div>' : ''}
            \${item.badge ? \`<div class="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-black text-xs font-bold rounded-full">\${item.badge}</div>\` : ''}
            <div class="flex justify-between items-start mb-4">
              <div>
                <span class="text-xs text-gray-500">\${item.name}</span>
                <h4 class="font-bold text-lg">\${item.title}</h4>
              </div>
              <div class="check-icon w-6 h-6 bg-white text-black rounded-full flex items-center justify-center text-xs">
                <i class="fas fa-check"></i>
              </div>
            </div>
            <div class="text-3xl font-bold mb-2">\${formatPrice(item.price)}</div>
            <p class="text-sm text-gray-500 mb-4">\${item.description}</p>
            <ul class="space-y-2 text-sm text-gray-400">
              \${item.features.map(f => \`<li class="flex items-start gap-2"><i class="fas fa-check text-xs mt-1 text-gray-600"></i><span>\${f}</span></li>\`).join('')}
            </ul>
          </div>
        \`).join('');
        
        // Update lock badge
        document.getElementById('step2-lock-badge').classList.toggle('hidden', !isLocked);
        document.getElementById('step2-icon').classList.toggle('bg-white', !isLocked);
        document.getElementById('step2-icon').classList.toggle('text-black', !isLocked);
        document.getElementById('step2-icon').classList.toggle('bg-white/10', isLocked);
        document.getElementById('step2-icon').classList.toggle('text-gray-400', isLocked);
      }
      
      function renderAddons() {
        const isLocked = !cart.setup || !cart.monthly;
        document.getElementById('addon-cards').innerHTML = pricing.addons.map(item => \`
          <div class="price-card glass rounded-xl p-5 flex items-center justify-between \${isLocked ? 'locked' : ''}" data-id="\${item.id}" onclick="\${isLocked ? '' : "toggleAddon('" + item.id + "')"}">
            \${isLocked ? '<div class="lock-overlay rounded-xl"><i class="fas fa-lock"></i></div>' : ''}
            <div>
              <div class="font-semibold mb-1 flex items-center gap-2">
                \${item.name}
                <span class="tooltip"><i class="fas fa-question-circle text-gray-600 text-xs"></i><div class="tooltip-text">\${item.tooltip}</div></span>
              </div>
              <span class="text-sm text-gray-500">\${formatPrice(item.price)}/\${item.unit}</span>
            </div>
            <div class="check-icon w-6 h-6 bg-white text-black rounded-full flex items-center justify-center text-xs">
              <i class="fas fa-check"></i>
            </div>
          </div>
        \`).join('');
        
        // Update Step 3 visuals
        document.getElementById('step3-lock-badge').classList.toggle('hidden', !isLocked);
        document.getElementById('step3-icon').classList.toggle('bg-white', !isLocked);
        document.getElementById('step3-icon').classList.toggle('text-black', !isLocked);
        document.getElementById('step3-icon').classList.toggle('bg-white/10', isLocked);
        document.getElementById('step3-icon').classList.toggle('text-gray-400', isLocked);
        document.getElementById('step3-title').classList.toggle('text-gray-400', isLocked);
        document.getElementById('step3-title').classList.toggle('text-white', !isLocked);
      }
      
      function renderLocations() {
        const isLocked = !cart.setup || !cart.monthly;
        document.getElementById('location-cards').innerHTML = pricing.location.map(item => \`
          <div class="price-card glass rounded-xl px-5 py-4 flex items-center gap-4 \${cart.location === item.id ? 'selected' : ''} \${isLocked ? 'locked' : ''}" data-id="\${item.id}" onclick="\${isLocked ? '' : "selectLocation('" + item.id + "')"}">
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
      
      // Selection handlers
      function selectSetup(id) {
        cart.setup = id;
        document.querySelectorAll('#setup-cards .price-card').forEach(c => c.classList.toggle('selected', c.dataset.id === id));
        renderMonthly();
        renderAddons();
        renderLocations();
        updateUI();
      }
      
      function selectMonthly(id) {
        if (!cart.setup) return;
        cart.monthly = id;
        document.querySelectorAll('#monthly-cards .price-card').forEach(c => c.classList.toggle('selected', c.dataset.id === id));
        renderAddons();
        renderLocations();
        updateUI();
      }
      
      function toggleAddon(id) {
        if (!cart.setup || !cart.monthly) return;
        const idx = cart.addons.indexOf(id);
        if (idx > -1) cart.addons.splice(idx, 1);
        else cart.addons.push(id);
        document.querySelectorAll('#addon-cards .price-card').forEach(c => c.classList.toggle('selected', cart.addons.includes(c.dataset.id)));
        updateUI();
      }
      
      function selectLocation(id) {
        if (!cart.setup || !cart.monthly) return;
        cart.location = id;
        document.querySelectorAll('#location-cards .price-card').forEach(c => c.classList.toggle('selected', c.dataset.id === id));
        updateUI();
      }
      
      // Update UI
      function updateUI() {
        const items = [];
        let setupPrice = 0, monthlyPrice = 0, addonPrice = 0;
        
        if (cart.setup) {
          const s = pricing.setup.find(x => x.id === cart.setup);
          items.push({ type: '마케팅 베이스 구축', name: s.title, price: s.price });
          setupPrice = s.price;
        }
        if (cart.monthly) {
          const m = pricing.monthly.find(x => x.id === cart.monthly);
          items.push({ type: '월 매출 부스팅', name: m.title, price: m.price });
          monthlyPrice = m.price;
        }
        cart.addons.forEach(aid => {
          const a = pricing.addons.find(x => x.id === aid);
          items.push({ type: '애드온', name: a.name, price: a.price });
          addonPrice += a.price;
        });
        const loc = pricing.location.find(x => x.id === cart.location);
        if (loc && loc.price > 0) {
          items.push({ type: '출장비', name: loc.name, price: loc.price });
          addonPrice += loc.price;
        }
        
        const total = setupPrice + monthlyPrice + addonPrice;
        const canPay = cart.setup && cart.monthly;
        
        // Cart sidebar
        const cartEl = document.getElementById('cart-items');
        if (items.length > 0) {
          cartEl.innerHTML = items.map(i => \`
            <div class="flex justify-between text-sm py-2 border-b border-white/5">
              <div><span class="text-gray-500 text-xs">\${i.type}</span><div class="font-medium">\${i.name}</div></div>
              <span class="font-medium">\${formatPrice(i.price)}</span>
            </div>
          \`).join('');
        } else {
          cartEl.innerHTML = '<div class="text-gray-600 text-center py-10"><i class="fas fa-hand-pointer text-2xl mb-3"></i><p class="text-sm">Step 1을 선택해주세요</p></div>';
        }
        
        document.getElementById('cart-setup').textContent = formatPrice(setupPrice);
        document.getElementById('cart-monthly').textContent = formatPrice(monthlyPrice);
        document.getElementById('cart-addon').textContent = formatPrice(addonPrice);
        document.getElementById('cart-total').textContent = formatPrice(total);
        document.getElementById('pay-btn').disabled = !canPay;
        document.getElementById('cart-warning').style.display = canPay ? 'none' : 'block';
        
        // Bottom bar
        document.getElementById('bb-setup').textContent = formatPrice(setupPrice);
        document.getElementById('bb-monthly').textContent = formatPrice(monthlyPrice);
        document.getElementById('bb-addon').textContent = formatPrice(addonPrice);
        document.getElementById('bb-total').textContent = formatPrice(total);
        document.getElementById('bb-pay-btn').disabled = !canPay;
        document.getElementById('bottom-bar').classList.toggle('visible', items.length > 0);
      }
      
      // Payment
      async function proceedToPayment() {
        if (!cart.setup || !cart.monthly) return alert('Step 1과 Step 2를 모두 선택해주세요.');
        
        const items = [];
        let total = 0;
        
        const s = pricing.setup.find(x => x.id === cart.setup);
        items.push({ name: s.title, price: s.price }); total += s.price;
        
        const m = pricing.monthly.find(x => x.id === cart.monthly);
        items.push({ name: m.title, price: m.price }); total += m.price;
        
        cart.addons.forEach(aid => {
          const a = pricing.addons.find(x => x.id === aid);
          items.push({ name: a.name, price: a.price }); total += a.price;
        });
        
        const loc = pricing.location.find(x => x.id === cart.location);
        if (loc.price > 0) { items.push({ name: loc.name, price: loc.price }); total += loc.price; }
        
        try {
          const res = await fetch('/api/payment/prepare', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items, total })
          });
          const data = await res.json();
          
          if (typeof PortOne !== 'undefined') {
            const payment = await PortOne.requestPayment({
              storeId: data.storeId, channelKey: data.channelKey, paymentId: data.orderId,
              orderName: data.orderName, totalAmount: total, currency: 'KRW', payMethod: 'CARD',
              customer: {}
            });
            if (payment.code) alert('결제 실패: ' + payment.message);
            else alert('결제 완료! 담당자가 연락드립니다.');
          } else {
            alert('결제 시스템 준비 중입니다.');
          }
        } catch (e) { alert('결제 처리 중 오류 발생'); }
      }
      
      // Chat
      function toggleChat() {
        document.getElementById('chat-panel').classList.toggle('active');
        document.getElementById('chat-btn').classList.toggle('pulse');
      }
      
      async function sendChat() {
        const input = document.getElementById('chat-input');
        const msg = input.value.trim();
        if (!msg) return;
        
        const msgs = document.getElementById('chat-messages');
        msgs.innerHTML += \`<div class="chat-message user"><div class="msg-content">\${escapeHtml(msg)}</div></div>\`;
        input.value = '';
        msgs.scrollTop = msgs.scrollHeight;
        
        const loadId = 'l-' + Date.now();
        msgs.innerHTML += \`<div class="chat-message bot" id="\${loadId}"><div class="msg-content"><i class="fas fa-spinner fa-spin mr-2"></i>...</div></div>\`;
        msgs.scrollTop = msgs.scrollHeight;
        
        chatCtx.push({ role: 'user', content: msg });
        
        try {
          const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: msg, context: chatCtx })
          });
          const data = await res.json();
          document.getElementById(loadId).remove();
          msgs.innerHTML += \`<div class="chat-message bot"><div class="msg-content">\${formatChat(data.response)}</div></div>\`;
          chatCtx.push({ role: 'assistant', content: data.response });
          msgs.scrollTop = msgs.scrollHeight;
        } catch {
          document.getElementById(loadId).innerHTML = '<div class="msg-content text-red-400">오류가 발생했습니다.</div>';
        }
      }
      
      function formatPrice(p) { return '₩' + p.toLocaleString('ko-KR'); }
      function escapeHtml(t) { const d = document.createElement('div'); d.textContent = t; return d.innerHTML; }
      function formatChat(t) { return t.replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>').replace(/\\n/g, '<br>'); }
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
    <title>Admin | XIΛIX</title>
    <link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>body { font-family: 'Pretendard', sans-serif; background: #000; color: #fff; }</style>
</head>
<body class="min-h-screen p-8">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold mb-8">Dashboard</h1>
      <div class="grid md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white/5 rounded-xl p-6"><div class="text-gray-400 text-sm mb-2">계약 건수</div><div class="text-3xl font-bold">0건</div></div>
        <div class="bg-white/5 rounded-xl p-6"><div class="text-gray-400 text-sm mb-2">총 매출</div><div class="text-3xl font-bold">₩0</div></div>
        <div class="bg-white/5 rounded-xl p-6"><div class="text-gray-400 text-sm mb-2">평균 금액</div><div class="text-3xl font-bold">₩0</div></div>
      </div>
      <div class="bg-white/5 rounded-xl p-6">
        <h2 class="text-xl font-bold mb-4">최근 계약</h2>
        <div class="text-gray-500 text-center py-12"><i class="fas fa-inbox text-4xl mb-4"></i><p>계약 내역이 없습니다.</p></div>
      </div>
    </div>
</body>
</html>`
}

export default app
