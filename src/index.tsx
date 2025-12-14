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
// 4개 완성형 세트 패키지 - SET MENU STRATEGY
// ========================================
const packages = [
  {
    id: 'landing',
    name: 'THE LANDING SET',
    title: '소상공인 실속 패키지',
    price: 1800000,
    monthlyAfter: 500000,
    badge: null,
    description: '빠른 시작. 핵심만 담은 원페이지로 즉시 영업 시작.',
    includes: [
      { category: '구축', items: ['반응형 원페이지 랜딩', '기본 Place 세팅', 'DB 수집 폼 설계'] },
      { category: '관리', items: ['1개월 기본 월간 관리', '기본 성과 리포트'] },
      { category: 'SEO', items: ['네이버 서치어드바이저 등록', 'meta 태그 최적화'] }
    ],
    recommended: false,
    cta: '빠른 시작하기',
    tooltip: '예산은 적지만 온라인 존재감이 필요한 소상공인에게 최적. 이벤트/프로모션 랜딩에도 적합합니다.'
  },
  {
    id: 'standard',
    name: 'THE STANDARD SET',
    title: '스탠다드 성장 패키지',
    price: 3500000,
    monthlyAfter: 1100000,
    badge: 'BEST',
    description: '검색에서 발견되는 브랜드. SEO 완벽 세팅 + 채널 연동.',
    includes: [
      { category: '구축', items: ['5페이지 브랜드 웹사이트', '브랜드 스토리텔링', 'AI 세일즈 챗봇 (500만원 상당)'] },
      { category: '관리', items: ['1개월 매출 부스팅 관리', '릴스/숏폼 알고리즘 공략', '인스타/블로그 연동'] },
      { category: 'SEO', items: ['네이버 서치어드바이저', 'meta 태그 + Open Graph', 'sitemap 제출', '완벽 SEO 최적화'] }
    ],
    recommended: true,
    cta: '성장 시작하기',
    tooltip: '가장 많이 선택하는 패키지. 검색 상위노출 + SNS 연동으로 24시간 영업하는 본점을 만듭니다.'
  },
  {
    id: 'branding',
    name: 'THE BRANDING SET',
    title: '하이엔드 브랜딩 패키지',
    price: 5000000,
    monthlyAfter: 2500000,
    badge: 'PREMIUM',
    description: '시각적 임팩트. 브랜드 스토리텔링과 초기 트래픽 확보.',
    includes: [
      { category: '구축', items: ['하이비주얼 웹 디자인', '브랜드 스토리텔링 카피라이팅', '프리미엄 인터랙션'] },
      { category: '관리', items: ['1개월 집중 브랜딩 관리', '블로그 상위노출 타겟팅', '전환율 분석 리포트'] },
      { category: '트래픽', items: ['초기 채널 활성화 트래픽', '10,000 좋아요/조회수 지원', '바이럴 부스팅'] }
    ],
    recommended: false,
    cta: '브랜딩 시작하기',
    tooltip: '론칭과 동시에 "핫한 브랜드"로 인식시킵니다. 초기 트래픽으로 인기 있어 보이는 효과.'
  },
  {
    id: 'premium',
    name: 'THE PREMIUM SET',
    title: '병원/프랜차이즈 마스터',
    price: 8000000,
    monthlyAfter: 4500000,
    badge: 'ENTERPRISE',
    description: '복잡한 비즈니스 로직. 예약/결제 시스템과 VIP 전담 관리.',
    includes: [
      { category: '구축', items: ['결제/예약 시스템 개발', '의료법 준수 콘텐츠', 'CRM 연동', '무제한 페이지'] },
      { category: '관리', items: ['VIP 전담 매니저', '주간 전략 미팅', '광고 운영 대행'] },
      { category: '트래픽', items: ['지역 장악 마케팅', '유튜브 롱폼/숏폼 제작', '블로그 풀 커버리지'] }
    ],
    recommended: false,
    cta: 'VIP 상담하기',
    tooltip: '병원, 프랜차이즈, 고가 서비스 전용. 복잡한 예약/결제 플로우와 법적 컴플라이언스까지 해결.'
  }
]

// ========================================
// API ROUTES
// ========================================
app.get('/api/portfolios', (c) => c.json(portfolios))
app.get('/api/packages', (c) => c.json(packages))

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

**4가지 완성형 패키지**:
1. THE LANDING SET (180만) - 소상공인 실속. 원페이지 + 기본관리
2. THE STANDARD SET (350만) ⭐BEST - 5페이지 브랜드웹 + SEO완벽 + AI챗봇
3. THE BRANDING SET (500만) - 하이비주얼 + 초기 트래픽 10,000
4. THE PREMIUM SET (800만) - 병원/프랜차이즈 전용 결제시스템

**핵심 멘트**:
- "100만원짜리는 명함, 1,000만원짜리는 24시간 영업사원"
- "이거 하나면 끝. 복잡하게 고를 필요 없습니다"
- "첫 달은 구축+관리가 세트. 2달째부터 관리비만"

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
    return `대표님, 저희는 **4가지 완성형 패키지**로 운영됩니다.

복잡하게 이것저것 고르실 필요 없어요. **"이거 하나면 끝"**입니다.

**🎯 패키지 라인업**
• **THE LANDING** (180만) - 원페이지 + 기본관리
• **THE STANDARD** (350만) ⭐BEST - 5페이지 + SEO완벽 + AI챗봇
• **THE BRANDING** (500만) - 하이비주얼 + 초기 트래픽
• **THE PREMIUM** (800만) - 병원/프랜차이즈 전용

어떤 업종을 운영하시나요? 딱 맞는 패키지 추천드릴게요.`
  }
  if (lower.includes('미용') || lower.includes('헤어') || lower.includes('네일')) {
    return `뷰티샵이시군요!

인테리어에 3-5천만 원 쓰시고, 마케팅에 0원 쓰시는 분들 많습니다.
**그러면 그 예쁜 인테리어를 누가 봅니까?**

**추천 패키지**
🌟 **THE STANDARD** (350만)
- 5페이지 브랜드 웹사이트
- 릴스/숏폼 알고리즘 공략
- AI 세일즈 챗봇 포함 (500만원 상당)

오픈 예정이시라면 **THE BRANDING** (500만)도 추천드려요.
초기 트래픽 10,000으로 "핫플" 느낌 연출 가능합니다.`
  }
  return `안녕하세요, X I Λ I X 컨설턴트입니다.

저희는 웹사이트 제작사가 아닙니다.
**"매출을 올리는 마케팅 수익화 솔루션"**을 제공합니다.

복잡하게 고르실 필요 없어요.
**4가지 완성형 패키지** 중 하나만 선택하시면 됩니다.

1. 어떤 업종을 운영하시나요?
2. 현재 가장 큰 고민은 무엇인가요?

알려주시면 딱 맞는 패키지 추천드리겠습니다.`
}

// Payment preparation API
app.post('/api/payment/prepare', async (c) => {
  const { packageId, customAmount, customerName } = await c.req.json()
  
  // Custom amount for secret consultant mode
  if (customAmount && customerName) {
    return c.json({
      orderId: `XILIX_CUSTOM_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      orderName: `X I Λ I X 맞춤 솔루션 - ${customerName}`,
      totalAmount: customAmount,
      storeId: c.env?.PORTONE_STORE_ID || 'store-xxxxxxxx',
      channelKey: c.env?.PORTONE_CHANNEL_KEY || 'channel-xxxxxxxx',
      isCustom: true
    })
  }
  
  // Package payment
  const pkg = packages.find(p => p.id === packageId)
  if (!pkg) {
    return c.json({ error: 'Invalid package' }, 400)
  }
  
  return c.json({
    orderId: `XILIX_${pkg.id.toUpperCase()}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    orderName: `X I Λ I X ${pkg.name} - ${pkg.title}`,
    totalAmount: pkg.price,
    storeId: c.env?.PORTONE_STORE_ID || 'store-xxxxxxxx',
    channelKey: c.env?.PORTONE_CHANNEL_KEY || 'channel-xxxxxxxx',
    package: pkg
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
      "description": "기술(AI)과 비즈니스를 결합한 마케팅 수익화 솔루션 기업",
      "url": "https://xilix.pages.dev"
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "X I Λ I X 마케팅 솔루션",
      "offers": [
        { "@type": "Offer", "name": "THE LANDING SET", "price": "1800000", "priceCurrency": "KRW" },
        { "@type": "Offer", "name": "THE STANDARD SET", "price": "3500000", "priceCurrency": "KRW" },
        { "@type": "Offer", "name": "THE BRANDING SET", "price": "5000000", "priceCurrency": "KRW" },
        { "@type": "Offer", "name": "THE PREMIUM SET", "price": "8000000", "priceCurrency": "KRW" }
      ]
    }
    </script>
    
    <!-- Fonts -->
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
              sans: ['Pretendard Variable', 'Pretendard', 'sans-serif'],
              display: ['Syncopate', 'sans-serif']
            }
          }
        }
      }
    </script>
    <script src="https://cdn.portone.io/v2/browser-sdk.js"></script>
    
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body { 
        font-family: 'Pretendard Variable', 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
        background: #000; 
        color: #fff; 
        overflow-x: hidden;
        line-height: 1.6;
        -webkit-font-smoothing: antialiased;
      }
      .no-select { -webkit-user-select: none; user-select: none; }
      
      /* ========================================
         WebGL FLUID BACKGROUND - Three.js Shader
         ======================================== */
      #fluid-canvas {
        position: fixed;
        inset: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
      }
      
      /* Fallback for non-WebGL */
      .fluid-fallback {
        position: fixed;
        inset: 0;
        z-index: -2;
        background: 
          radial-gradient(ellipse 120% 80% at 50% 0%, rgba(20,20,35,0.9) 0%, transparent 60%),
          radial-gradient(ellipse 100% 60% at 100% 100%, rgba(15,15,30,0.6) 0%, transparent 50%),
          radial-gradient(ellipse 80% 50% at 0% 80%, rgba(25,20,40,0.5) 0%, transparent 40%),
          #000;
      }
      
      /* Noise overlay for texture */
      .noise-overlay {
        position: fixed;
        inset: 0;
        z-index: 0;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        opacity: 0.03;
        pointer-events: none;
        mix-blend-mode: overlay;
      }
      
      /* ========================================
         GLASSMORPHISM & PREMIUM UI
         ======================================== */
      .glass { 
        background: rgba(255,255,255,0.02); 
        backdrop-filter: blur(20px) saturate(1.3); 
        -webkit-backdrop-filter: blur(20px) saturate(1.3);
        border: 1px solid rgba(255,255,255,0.05); 
        box-shadow: 0 8px 32px rgba(0,0,0,0.4);
      }
      .glass-card {
        background: rgba(255,255,255,0.015);
        backdrop-filter: blur(24px) saturate(1.2);
        -webkit-backdrop-filter: blur(24px) saturate(1.2);
        border: 1px solid rgba(255,255,255,0.04);
        border-radius: 24px;
        transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .glass-card:hover {
        background: rgba(255,255,255,0.04);
        border-color: rgba(255,255,255,0.1);
        transform: translateY(-8px);
        box-shadow: 0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08);
      }
      
      /* ========================================
         REVEAL ANIMATIONS - Framer Motion Style
         ======================================== */
      .reveal { 
        opacity: 0; 
        transform: translateY(60px); 
        transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), 
                    transform 1s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .reveal.active { opacity: 1; transform: translateY(0); }
      .reveal-delay-1 { transition-delay: 0.1s; }
      .reveal-delay-2 { transition-delay: 0.2s; }
      .reveal-delay-3 { transition-delay: 0.3s; }
      .reveal-delay-4 { transition-delay: 0.4s; }
      .reveal-delay-5 { transition-delay: 0.5s; }
      
      /* Stagger children animation */
      .stagger-children > * {
        opacity: 0;
        transform: translateY(40px);
        transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .stagger-children.active > *:nth-child(1) { transition-delay: 0.1s; }
      .stagger-children.active > *:nth-child(2) { transition-delay: 0.2s; }
      .stagger-children.active > *:nth-child(3) { transition-delay: 0.3s; }
      .stagger-children.active > *:nth-child(4) { transition-delay: 0.4s; }
      .stagger-children.active > * { opacity: 1; transform: translateY(0); }
      
      /* Parallax effect */
      .parallax-slow { will-change: transform; }
      
      /* ========================================
         PACKAGE CARDS - Premium Set Menu
         ======================================== */
      .package-card {
        position: relative;
        border-radius: 28px;
        overflow: hidden;
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .package-card::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 100%);
        opacity: 0;
        transition: opacity 0.4s ease;
      }
      .package-card:hover::before { opacity: 1; }
      .package-card:hover {
        transform: translateY(-16px) scale(1.02);
        box-shadow: 0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.1);
      }
      .package-card.recommended {
        border: 2px solid rgba(255,255,255,0.2);
        background: rgba(255,255,255,0.03);
      }
      .package-card.recommended:hover {
        border-color: rgba(255,255,255,0.4);
      }
      
      .package-badge {
        position: absolute;
        top: -1px;
        left: 50%;
        transform: translateX(-50%);
        padding: 8px 24px;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.15em;
        border-radius: 0 0 12px 12px;
      }
      .package-badge.best { background: #fff; color: #000; }
      .package-badge.premium { background: linear-gradient(135deg, #4a4a6a 0%, #2a2a3a 100%); color: #fff; }
      .package-badge.enterprise { background: linear-gradient(135deg, #3a3a5a 0%, #1a1a2a 100%); color: #8888aa; }
      
      /* ========================================
         PORTFOLIO - Cinematic Style
         ======================================== */
      .portfolio-card { 
        position: relative; 
        overflow: hidden; 
        aspect-ratio: 16/10;
        border-radius: 16px;
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .portfolio-card::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.95) 100%);
        z-index: 1;
        transition: all 0.5s ease;
      }
      .portfolio-card:hover::before {
        background: linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.9) 100%);
      }
      .portfolio-card:hover {
        transform: scale(1.04);
        box-shadow: 0 40px 100px rgba(0,0,0,0.7);
      }
      .portfolio-card iframe { 
        width: 100%; height: 100%; border: none; pointer-events: none; 
        transform: scale(1.15);
        transition: transform 0.8s ease;
      }
      .portfolio-card:hover iframe { transform: scale(1.25); }
      .portfolio-overlay { position: absolute; inset: 0; z-index: 5; cursor: pointer; }
      
      /* ========================================
         MODAL - Cinematic
         ======================================== */
      .modal-overlay { 
        position: fixed; inset: 0; 
        background: rgba(0,0,0,0.98); 
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
      
      /* ========================================
         SECRET CONSULTANT MODE - Hidden Admin
         ======================================== */
      .secret-modal {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.95);
        z-index: 2000;
        display: none;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(20px);
      }
      .secret-modal.active { display: flex; }
      .secret-panel {
        background: linear-gradient(180deg, #0f0f12 0%, #08080a 100%);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 24px;
        padding: 40px;
        width: 90%;
        max-width: 420px;
        box-shadow: 0 40px 100px rgba(0,0,0,0.8);
      }
      
      /* ========================================
         CHATBOT - Premium Design
         ======================================== */
      .chatbot-container { position: fixed; bottom: 28px; right: 28px; z-index: 999; }
      .chatbot-btn { 
        width: 64px; height: 64px; border-radius: 50%; 
        background: linear-gradient(135deg, #1a1a1f 0%, #0a0a0d 100%); 
        border: 1px solid rgba(255,255,255,0.1); 
        cursor: pointer; display: flex; align-items: center; justify-content: center; 
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        box-shadow: 0 8px 30px rgba(0,0,0,0.5);
      }
      .chatbot-btn:hover { 
        transform: scale(1.1) translateY(-4px); 
        border-color: rgba(255,255,255,0.2);
        box-shadow: 0 15px 50px rgba(0,0,0,0.6);
      }
      .chatbot-panel { 
        position: absolute; bottom: 80px; right: 0; 
        width: 400px; height: 520px; 
        background: linear-gradient(180deg, #0d0d10 0%, #07070a 100%); 
        border-radius: 24px; 
        border: 1px solid rgba(255,255,255,0.08); 
        display: none; flex-direction: column; overflow: hidden;
        box-shadow: 0 30px 80px rgba(0,0,0,0.7);
      }
      .chatbot-panel.active { display: flex; animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
      @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
      .chat-messages { flex: 1; overflow-y: auto; padding: 24px; }
      .chat-message { margin-bottom: 18px; max-width: 85%; }
      .chat-message.user { margin-left: auto; }
      .chat-message.user .msg-content { background: rgba(255,255,255,0.1); border-radius: 20px 20px 4px 20px; }
      .chat-message.bot .msg-content { background: rgba(255,255,255,0.03); border-radius: 20px 20px 20px 4px; border: 1px solid rgba(255,255,255,0.05); }
      .msg-content { padding: 16px 20px; line-height: 1.7; font-size: 14px; }
      
      @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(255,255,255,0.2); } 50% { box-shadow: 0 0 0 20px rgba(255,255,255,0); } }
      .pulse { animation: pulse 2.5s ease-in-out infinite; }
      
      /* ========================================
         SCROLLBAR
         ======================================== */
      ::-webkit-scrollbar { width: 5px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 3px; }
      
      /* ========================================
         RESPONSIVE
         ======================================== */
      @media (max-width: 768px) {
        .chatbot-panel { width: calc(100vw - 40px); right: -14px; }
      }
    </style>
</head>
<body class="no-select">
    <!-- WebGL Fluid Background Canvas -->
    <canvas id="fluid-canvas"></canvas>
    <div class="fluid-fallback"></div>
    <div class="noise-overlay"></div>
    
    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 z-50 glass">
      <div class="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <a href="#" class="font-display text-lg tracking-[0.5em] font-bold hover:opacity-80 transition-opacity">XIΛIX</a>
        <div class="hidden md:flex items-center gap-14">
          <a href="#works" class="text-[12px] text-gray-400 hover:text-white transition-colors duration-300 tracking-[0.2em] uppercase font-medium">Works</a>
          <a href="#pricing" class="text-[12px] text-gray-400 hover:text-white transition-colors duration-300 tracking-[0.2em] uppercase font-medium">Pricing</a>
          <a href="#contact" class="px-7 py-2.5 bg-white text-black text-[12px] font-semibold tracking-[0.15em] uppercase hover:bg-gray-100 transition-all duration-300 hover:shadow-lg hover:shadow-white/10 rounded-sm">Contact</a>
        </div>
      </div>
    </nav>
    
    <!-- Hero Section -->
    <section class="min-h-screen flex items-center justify-center px-6 pt-24 pb-32 relative">
      <div class="text-center max-w-6xl">
        <div class="mb-12 reveal parallax-slow">
          <span class="text-[11px] tracking-[0.6em] text-gray-500 uppercase font-medium">AI × Business Marketing Solution</span>
        </div>
        <h1 class="font-display text-6xl md:text-8xl lg:text-[11rem] font-bold tracking-[0.3em] mb-12 reveal reveal-delay-1 leading-none">
          XIΛIX
        </h1>
        <div class="text-lg md:text-xl text-gray-400 mb-10 reveal reveal-delay-2 max-w-2xl mx-auto leading-relaxed">
          남들이 '<span class="text-white font-semibold">V</span>'(Vision)를 볼 때,<br class="hidden sm:block"/>
          우리는 세상을 뒤집어 '<span class="text-white font-semibold">∧</span>'(Angle)를 봅니다.
        </div>
        <p class="text-gray-500 mb-16 reveal reveal-delay-3 text-base md:text-lg">
          웹사이트 제작사? <span class="line-through opacity-40">아닙니다.</span>
          <span class="text-white font-medium ml-2">마케팅 수익화 솔루션</span>을 제공합니다.
        </p>
        <div class="flex flex-col sm:flex-row gap-6 justify-center reveal reveal-delay-4">
          <a href="#pricing" class="group px-12 py-5 bg-white text-black font-semibold tracking-[0.08em] hover:bg-gray-100 transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1 rounded-sm">
            패키지 선택하기
            <i class="fas fa-arrow-right ml-3 group-hover:translate-x-1 transition-transform"></i>
          </a>
          <a href="#works" class="px-12 py-5 glass glass-card font-medium tracking-[0.08em] transition-all duration-300 border-white/5 hover:border-white/15">
            성과 확인하기
          </a>
        </div>
      </div>
    </section>
    
    <!-- Works Section -->
    <section id="works" class="py-40 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-24 reveal">
          <span class="text-[11px] tracking-[0.5em] text-gray-500 uppercase mb-8 block font-medium">Selected Works</span>
          <h2 class="font-display text-5xl md:text-6xl font-bold tracking-[0.2em]">PORTFOLIO</h2>
          <p class="text-gray-500 mt-8 max-w-xl mx-auto text-sm leading-relaxed">실제 구축한 프로젝트들입니다. 클릭하면 사이트를 확인할 수 있습니다.</p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-10 stagger-children" id="portfolio-grid"></div>
      </div>
    </section>
    
    <!-- Pricing Section - 4 SET MENU PACKAGES -->
    <section id="pricing" class="py-40 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-20 reveal">
          <span class="text-[11px] tracking-[0.5em] text-gray-500 uppercase mb-8 block font-medium">All-in-One Success Packages</span>
          <h2 class="font-display text-5xl md:text-6xl font-bold tracking-[0.2em] mb-8">PRICING</h2>
          <p class="text-gray-400 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            복잡하게 이것저것 고르지 마세요.<br/>
            <strong class="text-white font-semibold">"이거 하나면 끝"</strong>입니다. 구축 + 관리 + 트래픽이 모두 포함된 완성형 패키지.
          </p>
        </div>
        
        <!-- Package Cards Grid -->
        <div class="grid md:grid-cols-2 xl:grid-cols-4 gap-8 stagger-children" id="package-grid"></div>
        
        <!-- Monthly After Notice -->
        <div class="text-center mt-16 reveal">
          <p class="text-gray-500 text-sm">
            <i class="fas fa-info-circle mr-2"></i>
            첫 달은 구축+관리 세트. <strong class="text-white">2달째부터는 월 관리비만</strong> 결제합니다.
          </p>
        </div>
      </div>
    </section>
    
    <!-- Contact Section -->
    <section id="contact" class="py-40 px-6">
      <div class="max-w-4xl mx-auto text-center reveal">
        <span class="text-[11px] tracking-[0.5em] text-gray-500 uppercase mb-8 block font-medium">Get Started</span>
        <h2 class="font-display text-5xl md:text-6xl font-bold tracking-[0.2em] mb-10">GET IN TOUCH</h2>
        <p class="text-gray-400 mb-14 text-base md:text-lg">우측 하단 AI 컨설턴트 또는 직접 연락해주세요</p>
        <div class="flex flex-col sm:flex-row gap-6 justify-center">
          <a href="tel:010-0000-0000" class="px-12 py-5 glass glass-card font-medium transition-all duration-300 tracking-wide">
            <i class="fas fa-phone mr-3"></i>전화 문의
          </a>
          <a href="mailto:hello@xilix.com" class="px-12 py-5 glass glass-card font-medium transition-all duration-300 tracking-wide">
            <i class="fas fa-envelope mr-3"></i>이메일 문의
          </a>
        </div>
      </div>
    </section>
    
    <!-- Footer with SECRET TRIGGER -->
    <footer class="py-16 px-6 border-t border-white/5">
      <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
        <span id="footer-logo" class="font-display text-xl tracking-[0.5em] font-bold cursor-pointer hover:opacity-80 transition-opacity select-none">XIΛIX</span>
        <span class="text-[11px] text-gray-500 tracking-wide">© 2024 X I Λ I X. All rights reserved.</span>
      </div>
    </footer>
    
    <!-- Portfolio Modal -->
    <div id="portfolio-modal" class="modal-overlay" onclick="closeModal(event)">
      <div class="relative w-full max-w-6xl h-[85vh] mx-4 bg-black rounded-2xl overflow-hidden" onclick="event.stopPropagation()">
        <button onclick="closeModal()" class="absolute top-5 right-5 z-20 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition">
          <i class="fas fa-times text-xl"></i>
        </button>
        <div class="security-overlay"></div>
        <iframe id="modal-iframe" class="w-full h-full" sandbox="allow-scripts allow-same-origin"></iframe>
      </div>
    </div>
    
    <!-- SECRET CONSULTANT MODE MODAL -->
    <div id="secret-modal" class="secret-modal" onclick="closeSecretModal(event)">
      <div class="secret-panel" onclick="event.stopPropagation()">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h3 class="text-xl font-bold mb-1">🔐 컨설턴트 모드</h3>
            <p class="text-sm text-gray-500">대면 협의 금액 직접 입력</p>
          </div>
          <button onclick="closeSecretModal()" class="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-2">고객명</label>
            <input type="text" id="secret-customer-name" placeholder="홍길동 / (주)테스트컴퍼니" 
                   class="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-2">협의 금액 (원)</label>
            <input type="text" id="secret-amount" placeholder="예: 4,500,000" 
                   class="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-2xl font-bold placeholder-gray-600 focus:outline-none focus:border-white/30 transition"
                   oninput="formatSecretAmount(this)">
          </div>
          <div class="pt-4">
            <button onclick="generateSecretPayment()" 
                    class="w-full py-5 bg-white text-black font-bold text-lg tracking-wide hover:bg-gray-100 transition-all duration-300 rounded-xl hover:shadow-lg hover:shadow-white/10">
              <i class="fas fa-credit-card mr-3"></i>결제 링크 생성
            </button>
          </div>
          <p class="text-xs text-gray-600 text-center">* 이 기능은 관리자 전용입니다</p>
        </div>
      </div>
    </div>
    
    <!-- Chatbot -->
    <div class="chatbot-container">
      <div id="chat-panel" class="chatbot-panel">
        <div class="p-5 border-b border-white/10 flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="w-11 h-11 bg-white/5 rounded-full flex items-center justify-center">
              <i class="fas fa-headset text-lg"></i>
            </div>
            <div>
              <div class="font-bold text-sm">AI 컨설턴트</div>
              <div class="text-xs text-gray-500">마케팅 전문가</div>
            </div>
          </div>
          <button onclick="toggleChat()" class="text-gray-400 hover:text-white p-2 transition"><i class="fas fa-minus"></i></button>
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
        <div class="p-5 border-t border-white/10">
          <div class="flex gap-3">
            <input type="text" id="chat-input" placeholder="메시지 입력..." 
                   class="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-3.5 text-sm focus:outline-none focus:border-white/20 transition" 
                   onkeypress="if(event.key==='Enter')sendChat()">
            <button onclick="sendChat()" class="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
      <button onclick="toggleChat()" class="chatbot-btn pulse" id="chat-btn">
        <i class="fas fa-comment-dots text-2xl"></i>
      </button>
    </div>
    
    <!-- ========================================
         SCRIPTS
         ======================================== -->
    <script>
      // ========================================
      // WebGL FLUID BACKGROUND - Three.js Shader
      // ========================================
      (function initFluidBackground() {
        const canvas = document.getElementById('fluid-canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (!gl) {
          console.log('WebGL not supported, using CSS fallback');
          canvas.style.display = 'none';
          return;
        }
        
        // Hide fallback when WebGL works
        document.querySelector('.fluid-fallback').style.display = 'none';
        
        // Resize handler
        function resize() {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          gl.viewport(0, 0, canvas.width, canvas.height);
        }
        resize();
        window.addEventListener('resize', resize);
        
        // Vertex shader
        const vertexShaderSource = \`
          attribute vec2 a_position;
          void main() {
            gl_Position = vec4(a_position, 0.0, 1.0);
          }
        \`;
        
        // Fragment shader - Fluid/Smoke effect
        const fragmentShaderSource = \`
          precision highp float;
          uniform float u_time;
          uniform vec2 u_resolution;
          uniform vec2 u_mouse;
          
          // Simplex noise function
          vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
          
          float snoise(vec2 v) {
            const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                               -0.577350269189626, 0.024390243902439);
            vec2 i  = floor(v + dot(v, C.yy));
            vec2 x0 = v - i + dot(i, C.xx);
            vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
            vec4 x12 = x0.xyxy + C.xxzz;
            x12.xy -= i1;
            i = mod289(i);
            vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                    + i.x + vec3(0.0, i1.x, 1.0));
            vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                        dot(x12.zw,x12.zw)), 0.0);
            m = m*m;
            m = m*m;
            vec3 x = 2.0 * fract(p * C.www) - 1.0;
            vec3 h = abs(x) - 0.5;
            vec3 ox = floor(x + 0.5);
            vec3 a0 = x - ox;
            m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
            vec3 g;
            g.x = a0.x * x0.x + h.x * x0.y;
            g.yz = a0.yz * x12.xz + h.yz * x12.yw;
            return 130.0 * dot(m, g);
          }
          
          // Fractal Brownian Motion for smoke effect
          float fbm(vec2 p) {
            float value = 0.0;
            float amplitude = 0.5;
            float frequency = 1.0;
            for (int i = 0; i < 6; i++) {
              value += amplitude * snoise(p * frequency);
              amplitude *= 0.5;
              frequency *= 2.0;
            }
            return value;
          }
          
          void main() {
            vec2 uv = gl_FragCoord.xy / u_resolution.xy;
            vec2 p = uv * 2.0 - 1.0;
            p.x *= u_resolution.x / u_resolution.y;
            
            // Time-based animation
            float t = u_time * 0.15;
            
            // Mouse influence with smooth falloff
            vec2 mouse = u_mouse * 2.0 - 1.0;
            mouse.x *= u_resolution.x / u_resolution.y;
            float mouseInfluence = smoothstep(1.5, 0.0, length(p - mouse)) * 0.4;
            
            // Layered smoke/fluid effect
            float n1 = fbm(p * 1.5 + vec2(t * 0.3, t * 0.2));
            float n2 = fbm(p * 2.0 - vec2(t * 0.2, t * 0.35) + mouseInfluence * 0.5);
            float n3 = fbm(p * 0.8 + vec2(t * 0.1, -t * 0.15) + mouse * mouseInfluence);
            
            // Combine layers
            float smoke = n1 * 0.4 + n2 * 0.35 + n3 * 0.25;
            smoke = smoke * 0.5 + 0.5; // Normalize to 0-1
            
            // Color palette - dark, moody blues and purples
            vec3 color1 = vec3(0.02, 0.02, 0.04); // Deep dark
            vec3 color2 = vec3(0.06, 0.05, 0.12); // Dark purple
            vec3 color3 = vec3(0.08, 0.08, 0.18); // Muted blue
            vec3 color4 = vec3(0.04, 0.04, 0.08); // Near black
            
            // Mix colors based on noise
            vec3 color = mix(color1, color2, smoothstep(0.3, 0.5, smoke));
            color = mix(color, color3, smoothstep(0.5, 0.7, smoke + mouseInfluence));
            color = mix(color, color4, smoothstep(0.7, 0.9, smoke));
            
            // Add subtle highlights near mouse
            color += vec3(0.03, 0.03, 0.06) * mouseInfluence;
            
            // Vignette
            float vignette = 1.0 - length(uv - 0.5) * 0.8;
            color *= vignette;
            
            gl_FragColor = vec4(color, 1.0);
          }
        \`;
        
        // Compile shader
        function compileShader(source, type) {
          const shader = gl.createShader(type);
          gl.shaderSource(shader, source);
          gl.compileShader(shader);
          if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('Shader compile error:', gl.getShaderInfoLog(shader));
            return null;
          }
          return shader;
        }
        
        const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
        const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
        
        if (!vertexShader || !fragmentShader) {
          canvas.style.display = 'none';
          document.querySelector('.fluid-fallback').style.display = 'block';
          return;
        }
        
        // Create program
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          console.error('Program link error:', gl.getProgramInfoLog(program));
          return;
        }
        
        gl.useProgram(program);
        
        // Create fullscreen quad
        const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
        
        const positionLocation = gl.getAttribLocation(program, 'a_position');
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
        
        // Get uniform locations
        const timeLocation = gl.getUniformLocation(program, 'u_time');
        const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
        const mouseLocation = gl.getUniformLocation(program, 'u_mouse');
        
        // Mouse tracking with smooth interpolation
        let mouseX = 0.5, mouseY = 0.5;
        let targetMouseX = 0.5, targetMouseY = 0.5;
        
        document.addEventListener('mousemove', (e) => {
          targetMouseX = e.clientX / window.innerWidth;
          targetMouseY = 1.0 - e.clientY / window.innerHeight;
        });
        
        // Animation loop
        function render(time) {
          // Smooth mouse interpolation
          mouseX += (targetMouseX - mouseX) * 0.05;
          mouseY += (targetMouseY - mouseY) * 0.05;
          
          gl.uniform1f(timeLocation, time * 0.001);
          gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
          gl.uniform2f(mouseLocation, mouseX, mouseY);
          
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
          requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
      })();
      
      // ========================================
      // DATA & STATE
      // ========================================
      const portfolios = ${JSON.stringify(portfolios)};
      const packages = ${JSON.stringify(packages)};
      let chatCtx = [];
      let secretClickCount = 0;
      let secretClickTimer = null;
      
      // ========================================
      // SECURITY
      // ========================================
      document.addEventListener('contextmenu', e => e.preventDefault());
      document.addEventListener('keydown', e => {
        if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.key === 'u')) e.preventDefault();
      });
      
      // ========================================
      // INITIALIZATION
      // ========================================
      document.addEventListener('DOMContentLoaded', () => {
        initReveal();
        initParallax();
        renderPortfolios();
        renderPackages();
        initSecretMode();
      });
      
      // ========================================
      // REVEAL ANIMATIONS
      // ========================================
      function initReveal() {
        const obs = new IntersectionObserver(entries => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              e.target.classList.add('active');
            }
          });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        
        document.querySelectorAll('.reveal, .stagger-children').forEach(el => obs.observe(el));
      }
      
      // ========================================
      // PARALLAX EFFECT
      // ========================================
      function initParallax() {
        const parallaxElements = document.querySelectorAll('.parallax-slow');
        window.addEventListener('scroll', () => {
          const scrollY = window.pageYOffset;
          parallaxElements.forEach(el => {
            el.style.transform = \`translateY(\${scrollY * 0.1}px)\`;
          });
        });
      }
      
      // ========================================
      // PORTFOLIO RENDERING
      // ========================================
      function renderPortfolios() {
        document.getElementById('portfolio-grid').innerHTML = portfolios.map(p => \`
          <div class="portfolio-card glass" onclick="openModal('\${p.url}')">
            <iframe src="\${p.url}" loading="lazy"></iframe>
            <div class="portfolio-overlay"></div>
            <div class="absolute top-5 right-5 z-10 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold tracking-wide">\${p.result}</div>
            <div class="absolute bottom-0 left-0 right-0 p-6 z-10">
              <span class="text-xs text-gray-400 tracking-[0.2em] uppercase">\${p.category}</span>
              <h3 class="font-bold text-xl mt-2">\${p.title}</h3>
            </div>
          </div>
        \`).join('');
      }
      
      // ========================================
      // PACKAGE CARDS RENDERING (SET MENU)
      // ========================================
      function renderPackages() {
        document.getElementById('package-grid').innerHTML = packages.map(pkg => \`
          <div class="package-card glass-card p-8 \${pkg.recommended ? 'recommended' : ''}" data-id="\${pkg.id}">
            \${pkg.badge ? \`<div class="package-badge \${pkg.badge === 'BEST' ? 'best' : pkg.badge === 'PREMIUM' ? 'premium' : 'enterprise'}">\${pkg.badge}</div>\` : ''}
            
            <div class="pt-\${pkg.badge ? '8' : '0'}">
              <span class="text-[11px] tracking-[0.3em] text-gray-500 uppercase font-medium">\${pkg.name}</span>
              <h3 class="text-2xl font-bold mt-2 mb-3">\${pkg.title}</h3>
              <p class="text-gray-400 text-sm mb-6 leading-relaxed">\${pkg.description}</p>
              
              <div class="mb-8">
                <div class="text-4xl font-bold mb-1">\${formatPrice(pkg.price)}</div>
                <div class="text-xs text-gray-500">첫 달 (구축 + 관리 포함)</div>
                <div class="text-xs text-gray-600 mt-1">2달째~ 월 \${formatPrice(pkg.monthlyAfter)}</div>
              </div>
              
              <div class="space-y-5 mb-8">
                \${pkg.includes.map(inc => \`
                  <div>
                    <div class="text-xs font-semibold text-gray-500 tracking-wide mb-2 flex items-center gap-2">
                      <i class="fas fa-\${inc.category === '구축' ? 'hammer' : inc.category === '관리' ? 'chart-line' : inc.category === 'SEO' ? 'search' : 'rocket'} text-gray-600"></i>
                      \${inc.category}
                    </div>
                    <ul class="space-y-1.5">
                      \${inc.items.map(item => \`
                        <li class="text-sm text-gray-300 flex items-start gap-2">
                          <i class="fas fa-check text-[10px] mt-1.5 text-gray-600"></i>
                          <span>\${item}</span>
                        </li>
                      \`).join('')}
                    </ul>
                  </div>
                \`).join('')}
              </div>
              
              <button onclick="selectPackage('\${pkg.id}')" 
                      class="w-full py-4 \${pkg.recommended ? 'bg-white text-black hover:bg-gray-100' : 'bg-white/5 text-white hover:bg-white/10'} font-semibold tracking-wide transition-all duration-300 rounded-xl">
                \${pkg.cta}
              </button>
            </div>
          </div>
        \`).join('');
      }
      
      // ========================================
      // PACKAGE SELECTION & PAYMENT
      // ========================================
      async function selectPackage(packageId) {
        const pkg = packages.find(p => p.id === packageId);
        if (!pkg) return;
        
        const confirmed = confirm(\`"\${pkg.title}" 패키지를 선택하셨습니다.\\n\\n금액: \${formatPrice(pkg.price)} (첫 달)\\n\\n결제를 진행하시겠습니까?\`);
        if (!confirmed) return;
        
        try {
          const res = await fetch('/api/payment/prepare', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ packageId })
          });
          const data = await res.json();
          
          if (typeof PortOne !== 'undefined') {
            const payment = await PortOne.requestPayment({
              storeId: data.storeId,
              channelKey: data.channelKey,
              paymentId: data.orderId,
              orderName: data.orderName,
              totalAmount: data.totalAmount,
              currency: 'KRW',
              payMethod: 'CARD',
              customer: {}
            });
            
            if (payment.code) {
              alert('결제 실패: ' + payment.message);
            } else {
              alert('결제가 완료되었습니다! 담당자가 곧 연락드립니다.');
            }
          } else {
            alert('결제 시스템 준비 중입니다. 전화 또는 이메일로 문의해주세요.');
          }
        } catch (e) {
          alert('결제 처리 중 오류가 발생했습니다.');
        }
      }
      
      // ========================================
      // SECRET CONSULTANT MODE
      // ========================================
      function initSecretMode() {
        const footerLogo = document.getElementById('footer-logo');
        footerLogo.addEventListener('click', () => {
          secretClickCount++;
          
          if (secretClickTimer) clearTimeout(secretClickTimer);
          secretClickTimer = setTimeout(() => {
            secretClickCount = 0;
          }, 2000);
          
          if (secretClickCount >= 5) {
            secretClickCount = 0;
            document.getElementById('secret-modal').classList.add('active');
          }
        });
      }
      
      function closeSecretModal(e) {
        if (e && e.target !== e.currentTarget) return;
        document.getElementById('secret-modal').classList.remove('active');
      }
      
      function formatSecretAmount(input) {
        let value = input.value.replace(/[^0-9]/g, '');
        if (value) {
          input.value = Number(value).toLocaleString('ko-KR');
        }
      }
      
      async function generateSecretPayment() {
        const customerName = document.getElementById('secret-customer-name').value.trim();
        const amountStr = document.getElementById('secret-amount').value.replace(/[^0-9]/g, '');
        const amount = parseInt(amountStr, 10);
        
        if (!customerName) {
          alert('고객명을 입력해주세요.');
          return;
        }
        if (!amount || amount < 10000) {
          alert('유효한 금액을 입력해주세요. (최소 10,000원)');
          return;
        }
        
        try {
          const res = await fetch('/api/payment/prepare', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ customAmount: amount, customerName })
          });
          const data = await res.json();
          
          if (typeof PortOne !== 'undefined') {
            const payment = await PortOne.requestPayment({
              storeId: data.storeId,
              channelKey: data.channelKey,
              paymentId: data.orderId,
              orderName: data.orderName,
              totalAmount: data.totalAmount,
              currency: 'KRW',
              payMethod: 'CARD',
              customer: {}
            });
            
            if (payment.code) {
              alert('결제 실패: ' + payment.message);
            } else {
              alert(\`✅ 결제 완료!\\n\\n고객: \${customerName}\\n금액: \${formatPrice(amount)}\`);
              closeSecretModal();
              document.getElementById('secret-customer-name').value = '';
              document.getElementById('secret-amount').value = '';
            }
          } else {
            alert('결제 시스템 준비 중입니다.');
          }
        } catch (e) {
          alert('결제 처리 중 오류가 발생했습니다.');
        }
      }
      
      // ========================================
      // MODAL
      // ========================================
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
      
      // ========================================
      // CHATBOT
      // ========================================
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
      
      // ========================================
      // UTILITIES
      // ========================================
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
        <div class="bg-white/5 rounded-2xl p-6"><div class="text-gray-400 text-sm mb-2">계약 건수</div><div class="text-3xl font-bold">0건</div></div>
        <div class="bg-white/5 rounded-2xl p-6"><div class="text-gray-400 text-sm mb-2">총 매출</div><div class="text-3xl font-bold">₩0</div></div>
        <div class="bg-white/5 rounded-2xl p-6"><div class="text-gray-400 text-sm mb-2">평균 금액</div><div class="text-3xl font-bold">₩0</div></div>
      </div>
      <div class="bg-white/5 rounded-2xl p-6">
        <h2 class="text-xl font-bold mb-4">최근 계약</h2>
        <div class="text-gray-500 text-center py-12"><i class="fas fa-inbox text-4xl mb-4"></i><p>계약 내역이 없습니다.</p></div>
      </div>
    </div>
</body>
</html>`
}

export default app
