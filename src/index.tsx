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
// EXACT PORTFOLIO DATA - 12개 링크 (변경 금지)
// ========================================
const PORTFOLIO_LINKS = [
  { title: "Studio JuAi Main", url: "https://www.studiojuai.com/", tag: "Branding" },
  { title: "Aura Kim", url: "https://aurakim.com", tag: "Personal" },
  { title: "Bon Life", url: "https://www.thebonlife.kr/", tag: "Commerce" },
  { title: "Amanna Hair", url: "https://www.amanna.hair/", tag: "Beauty" },
  { title: "Studio JuAi Club", url: "https://studiojuai.club/", tag: "Vibe" },
  { title: "Tax JupJup", url: "https://tax-jupjup.pages.dev/", tag: "Landing" },
  { title: "Beauty Page", url: "https://studiojuai-beauty.pages.dev/", tag: "Beauty" },
  { title: "AutoFlow AI", url: "https://autoflow-ai.pages.dev/", tag: "AI Tech" },
  { title: "Pro Dashboard", url: "https://studio-juai-pro.vercel.app/dashboard", tag: "System" },
  { title: "Super Agent", url: "https://super-agent-platform-81rs66tw1-ikjoobang-2128s-projects.vercel.app/", tag: "Platform" },
  { title: "Consultant V1", url: "https://studioju-consultant.netlify.app/", tag: "Consulting" },
  { title: "E-Book", url: "https://studiojuai-ebook.pages.dev/", tag: "Content" }
]

// ========================================
// EXACT PRICING DATA - 4개 패키지 (500만 포함!)
// ========================================
const PRICING_PACKAGES = [
  {
    id: "landing",
    name: "소상공인 실속 패키지",
    price: 1800000,
    desc: "1인 샵/이벤트용 빠른 시작",
    features: ["반응형 원페이지 랜딩", "기본 플레이스 세팅", "월 관리(기본형) 1개월 포함"]
  },
  {
    id: "standard",
    name: "스탠다드 성장 패키지",
    price: 3500000,
    desc: "지역 1등을 위한 브랜딩 필수코스",
    features: ["5페이지 브랜드 웹", "SEO 완벽 세팅", "월 매출 부스팅 1개월", "채널 연동"],
    recommended: true
  },
  {
    id: "branding",
    name: "하이엔드 브랜딩 패키지",
    price: 5000000,
    desc: "경쟁하지 않는 독보적 브랜드 가치",
    features: ["압도적 비주얼 웹사이트", "스토리텔링 기획자 투입", "초기 채널 활성화 트래픽", "브랜드 영상 편집"]
  },
  {
    id: "premium",
    name: "병원/프랜차이즈 마스터",
    price: 8000000,
    desc: "결제/예약/CRM까지 포함된 토탈 솔루션",
    features: ["결제 시스템 연동", "기획자 투입", "의료법 준수 콘텐츠", "VIP 전담 케어"]
  }
]

// ========================================
// API ROUTES
// ========================================
app.get('/api/portfolios', (c) => c.json(PORTFOLIO_LINKS))
app.get('/api/packages', (c) => c.json(PRICING_PACKAGES))

app.post('/api/chat', async (c) => {
  const { message, context } = await c.req.json()
  const apiKey = c.env?.GEMINI_API_KEY || ''
  
  if (!apiKey) {
    return c.json({ response: getDemoResponse(message), isDemo: true })
  }
  
  const systemPrompt = `당신은 X I Λ I X의 AI 디렉터입니다.

**핵심 정체성**: 
- 웹사이트 제작사가 아닙니다
- "기술(AI)과 비즈니스를 결합한 마케팅 수익화 솔루션 기업"입니다

**4가지 완성형 패키지**:
1. 소상공인 실속 패키지 (180만) - 원페이지 + 기본관리
2. 스탠다드 성장 패키지 (350만) ⭐BEST - 5페이지 + SEO + 채널연동
3. 하이엔드 브랜딩 패키지 (500만) - 압도적 비주얼 + 트래픽
4. 병원/프랜차이즈 마스터 (800만) - 결제시스템 + VIP케어

**포트폴리오 추천**:
- 미용실/헤어샵: Amanna Hair 프로젝트 확인
- 브랜딩: Studio JuAi Main 참고
- 랜딩페이지: Tax JupJup 스타일

한국어로 답변. 전문가답게 신뢰감 있게.`

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: systemPrompt }] },
          { role: 'model', parts: [{ text: '안녕하세요, X I Λ I X AI 디렉터입니다. 어떤 솔루션을 찾고 계신가요?' }] },
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

**🎯 패키지 라인업**
• **소상공인 실속** (180만) - 원페이지 + 기본관리
• **스탠다드 성장** (350만) ⭐BEST - 5페이지 + SEO
• **하이엔드 브랜딩** (500만) - 압도적 비주얼 + 트래픽
• **병원/프랜차이즈** (800만) - 결제시스템 + VIP케어

SERVICE & PLANS 블록에서 자세히 확인하세요!`
  }
  if (lower.includes('미용') || lower.includes('헤어') || lower.includes('네일')) {
    return `뷰티샵이시군요!

**추천 패키지**: 스탠다드 성장 (350만) 또는 하이엔드 브랜딩 (500만)
**참고 포트폴리오**: Amanna Hair

쇼케이스에서 Amanna Hair 프로젝트를 확인해보세요.
릴스/숏폼 알고리즘 공략이 포함되어 인스타에서 바이럴 가능합니다.`
  }
  return `안녕하세요, X I Λ I X AI 디렉터입니다.

저희는 웹사이트 제작사가 아닙니다.
**"매출을 올리는 마케팅 솔루션"**을 제공합니다.

1. 어떤 업종을 운영하시나요?
2. 현재 가장 큰 고민은 무엇인가요?

알려주시면 맞춤 솔루션을 제안드리겠습니다.`
}

// Payment API
app.post('/api/payment/prepare', async (c) => {
  const { packageId, customAmount, customerName, isRegional } = await c.req.json()
  
  // Custom amount for hidden admin mode
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
  const pkg = PRICING_PACKAGES.find(p => p.id === packageId)
  if (!pkg) {
    return c.json({ error: 'Invalid package' }, 400)
  }
  
  const regionalFee = isRegional ? 300000 : 0
  const totalAmount = pkg.price + regionalFee
  
  return c.json({
    orderId: `XILIX_${pkg.id.toUpperCase()}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    orderName: `X I Λ I X ${pkg.name}${isRegional ? ' (지방 출장비 포함)' : ''}`,
    totalAmount,
    storeId: c.env?.PORTONE_STORE_ID || 'store-xxxxxxxx',
    channelKey: c.env?.PORTONE_CHANNEL_KEY || 'channel-xxxxxxxx',
    package: pkg,
    regionalFee
  })
})

// ========================================
// MAIN PAGE - BENTO GRID (Command Center Style)
// ========================================
app.get('/', (c) => c.html(getMainHTML()))
app.get('/admin', (c) => c.html(getAdminHTML()))

function getMainHTML(): string {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>X I Λ I X | Business × Technology</title>
    <meta name="description" content="기술(AI)과 비즈니스를 결합한 마케팅 수익화 솔루션. Total Marketing Solution Partner.">
    
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "X I Λ I X",
      "description": "기술(AI)과 비즈니스를 결합한 마케팅 수익화 솔루션 기업"
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
      html, body { height: 100%; }
      body { 
        font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
        background: #000; 
        color: #fff; 
        overflow: hidden;
        -webkit-font-smoothing: antialiased;
      }
      .no-select { -webkit-user-select: none; user-select: none; }
      
      /* ========================================
         WebGL FLUID SHADER BACKGROUND
         ======================================== */
      #fluid-canvas {
        position: fixed;
        inset: 0;
        z-index: 0;
        width: 100%;
        height: 100%;
      }
      .noise-overlay {
        position: fixed;
        inset: 0;
        z-index: 1;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        opacity: 0.03;
        pointer-events: none;
      }
      
      /* ========================================
         BENTO GRID - Command Center Style
         ======================================== */
      .bento-container {
        position: relative;
        z-index: 10;
        height: 100vh;
        padding: 24px;
        display: flex;
        flex-direction: column;
      }
      .bento-grid {
        flex: 1;
        display: grid;
        grid-template-columns: 2fr 1fr 1fr;
        grid-template-rows: 1.2fr 0.8fr;
        gap: 20px;
        max-width: 1600px;
        margin: 0 auto;
        width: 100%;
      }
      @media (max-width: 1024px) {
        .bento-grid {
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto;
        }
      }
      @media (max-width: 640px) {
        .bento-grid { grid-template-columns: 1fr; }
        .bento-container { overflow-y: auto; height: auto; min-height: 100vh; }
      }
      
      /* Bento Box */
      .bento-box {
        background: rgba(10,10,12,0.6);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255,255,255,0.06);
        border-radius: 20px;
        overflow: hidden;
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        position: relative;
      }
      .bento-box:hover {
        border-color: rgba(255,255,255,0.12);
        box-shadow: 0 20px 60px rgba(0,0,0,0.4);
      }
      
      /* Hero Box */
      .bento-hero {
        grid-row: span 2;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 48px;
        text-align: center;
      }
      
      /* Square Boxes */
      .bento-square {
        padding: 28px;
        cursor: pointer;
      }
      .bento-square:hover { transform: translateY(-4px); }
      
      /* Service Box - 3D Tilt */
      .bento-service {
        perspective: 1000px;
      }
      .bento-service-inner {
        transition: transform 0.3s ease;
        transform-style: preserve-3d;
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      .bento-service:hover .bento-service-inner {
        transform: rotateX(3deg) rotateY(-3deg);
      }
      
      /* Showcase Box */
      .bento-showcase {
        grid-column: span 2;
        padding: 24px;
        overflow: hidden;
      }
      @media (max-width: 1024px) {
        .bento-showcase { grid-column: span 2; }
      }
      @media (max-width: 640px) {
        .bento-showcase { grid-column: span 1; }
      }
      
      /* ========================================
         MARQUEE
         ======================================== */
      .marquee-container { overflow: hidden; width: 100%; }
      .marquee-track {
        display: flex;
        gap: 16px;
        animation: marquee 50s linear infinite;
      }
      .marquee-track:hover { animation-play-state: paused; }
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .portfolio-item {
        flex-shrink: 0;
        width: 260px;
        height: 160px;
        background: rgba(255,255,255,0.02);
        border: 1px solid rgba(255,255,255,0.05);
        border-radius: 14px;
        overflow: hidden;
        cursor: pointer;
        position: relative;
        transition: all 0.3s ease;
      }
      .portfolio-item:hover {
        border-color: rgba(255,255,255,0.15);
        transform: scale(1.02);
      }
      .portfolio-item iframe {
        width: 100%;
        height: 100%;
        border: none;
        pointer-events: none;
        transform: scale(1.2);
      }
      .portfolio-item .overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.9) 100%);
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 14px;
      }
      .portfolio-item .tag {
        position: absolute;
        top: 10px;
        right: 10px;
        padding: 3px 8px;
        background: rgba(255,255,255,0.1);
        border-radius: 20px;
        font-size: 9px;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
      }
      
      /* ========================================
         AI DIRECTOR
         ======================================== */
      .typing-indicator {
        display: inline-flex;
        gap: 4px;
        padding: 6px 10px;
        background: rgba(255,255,255,0.05);
        border-radius: 10px;
      }
      .typing-dot {
        width: 5px;
        height: 5px;
        background: #fff;
        border-radius: 50%;
        animation: typing 1.4s ease-in-out infinite;
      }
      .typing-dot:nth-child(2) { animation-delay: 0.2s; }
      .typing-dot:nth-child(3) { animation-delay: 0.4s; }
      @keyframes typing {
        0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
        30% { transform: translateY(-5px); opacity: 1; }
      }
      
      /* ========================================
         VIEWS (Pricing, Chat)
         ======================================== */
      .view-overlay {
        position: fixed;
        inset: 0;
        z-index: 100;
        background: rgba(0,0,0,0.95);
        backdrop-filter: blur(20px);
        display: none;
        justify-content: center;
        align-items: center;
        padding: 40px;
        overflow-y: auto;
      }
      .view-overlay.active { display: flex; }
      .view-content {
        background: rgba(8,8,10,0.98);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 24px;
        width: 100%;
        max-width: 1000px;
        max-height: 90vh;
        overflow-y: auto;
        padding: 48px;
        animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        position: relative;
      }
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .view-close {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 44px;
        height: 44px;
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
      }
      .view-close:hover { background: rgba(255,255,255,0.1); transform: rotate(90deg); }
      
      /* ========================================
         PRICING CARDS - 4개
         ======================================== */
      .pricing-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
      }
      @media (max-width: 1024px) {
        .pricing-grid { grid-template-columns: repeat(2, 1fr); }
      }
      @media (max-width: 640px) {
        .pricing-grid { grid-template-columns: 1fr; }
      }
      .pricing-card {
        background: rgba(255,255,255,0.02);
        border: 1px solid rgba(255,255,255,0.05);
        border-radius: 18px;
        padding: 28px;
        transition: all 0.4s ease;
        cursor: pointer;
        display: flex;
        flex-direction: column;
      }
      .pricing-card:hover {
        background: rgba(255,255,255,0.04);
        border-color: rgba(255,255,255,0.1);
        transform: translateY(-6px);
      }
      .pricing-card.recommended {
        border: 2px solid rgba(255,255,255,0.2);
        background: rgba(255,255,255,0.03);
      }
      .pricing-card.selected {
        border-color: #fff;
        box-shadow: 0 0 0 1px #fff;
      }
      
      /* ========================================
         CHAT
         ======================================== */
      .chat-container { height: 450px; display: flex; flex-direction: column; }
      .chat-messages { flex: 1; overflow-y: auto; padding: 16px 0; }
      .chat-message { margin-bottom: 14px; max-width: 80%; }
      .chat-message.user { margin-left: auto; }
      .chat-message.user .msg-content { background: rgba(255,255,255,0.1); border-radius: 16px 16px 4px 16px; }
      .chat-message.bot .msg-content { background: rgba(255,255,255,0.03); border-radius: 16px 16px 16px 4px; border: 1px solid rgba(255,255,255,0.05); }
      .msg-content { padding: 12px 16px; line-height: 1.6; font-size: 14px; }
      
      /* ========================================
         HIDDEN ADMIN
         ======================================== */
      .hidden-admin {
        display: none;
        margin-top: 28px;
        padding: 24px;
        background: rgba(255,80,80,0.05);
        border: 1px solid rgba(255,80,80,0.2);
        border-radius: 14px;
      }
      .hidden-admin.active { display: block; animation: fadeIn 0.3s ease; }
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      
      /* Location Toggle */
      .location-toggle { display: flex; gap: 12px; margin: 20px 0; }
      .location-btn {
        flex: 1;
        padding: 14px;
        background: rgba(255,255,255,0.02);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.3s ease;
        text-align: center;
      }
      .location-btn:hover { background: rgba(255,255,255,0.04); }
      .location-btn.active { background: rgba(255,255,255,0.08); border-color: #fff; }
      
      /* Portfolio Modal */
      .portfolio-modal {
        position: fixed;
        inset: 0;
        z-index: 200;
        background: rgba(0,0,0,0.98);
        display: none;
        justify-content: center;
        align-items: center;
      }
      .portfolio-modal.active { display: flex; }
      .portfolio-modal iframe { width: 95%; height: 90%; border: none; border-radius: 14px; }
      .portfolio-modal .security-overlay { position: absolute; inset: 0; z-index: 10; }
      
      /* Footer */
      .bento-footer {
        text-align: center;
        padding: 16px 0 8px 0;
        font-size: 11px;
        color: rgba(255,255,255,0.3);
      }
      
      ::-webkit-scrollbar { width: 5px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 3px; }
    </style>
</head>
<body class="no-select">
    <!-- WebGL Fluid Background -->
    <canvas id="fluid-canvas"></canvas>
    <div class="noise-overlay"></div>
    
    <!-- ========================================
         BENTO GRID - Command Center
         ======================================== -->
    <div class="bento-container">
      <div class="bento-grid">
        
        <!-- HERO BOX (Large, spans 2 rows) -->
        <div class="bento-box bento-hero">
          <div>
            <div class="text-xs tracking-[0.4em] text-gray-500 uppercase mb-6 font-medium">Business × Technology</div>
            <h1 class="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-[0.25em] mb-8">
              XIΛIX
            </h1>
            <p class="text-gray-400 max-w-md mx-auto leading-relaxed text-sm md:text-base">
              웹사이트 제작사? <span class="line-through opacity-50">아닙니다.</span><br>
              <span class="text-white font-medium">마케팅 수익화 솔루션</span>을 제공합니다.
            </p>
          </div>
        </div>
        
        <!-- AI DIRECTOR BOX -->
        <div class="bento-box bento-square" onclick="openChatView()">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-9 h-9 bg-white/5 rounded-full flex items-center justify-center">
              <i class="fas fa-robot text-sm"></i>
            </div>
            <div>
              <h3 class="font-bold text-sm">AI Director</h3>
              <span class="text-[10px] text-gray-500">Live Status</span>
            </div>
          </div>
          <div class="typing-indicator mb-3">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
          </div>
          <div id="ai-message" class="text-sm text-gray-400 leading-relaxed transition-opacity duration-300">
            대표님, 진단이 필요하신가요?
          </div>
          <div class="mt-auto pt-4 text-[10px] text-gray-600">
            <i class="fas fa-hand-pointer mr-1"></i>Click to Chat
          </div>
        </div>
        
        <!-- SERVICE BOX -->
        <div class="bento-box bento-square bento-service" onclick="openPricingView()">
          <div class="bento-service-inner">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-9 h-9 bg-white/5 rounded-full flex items-center justify-center">
                <i class="fas fa-cube text-sm"></i>
              </div>
              <div>
                <h3 class="font-bold text-sm">SERVICE</h3>
                <span class="text-[10px] text-gray-500">& PLANS</span>
              </div>
            </div>
            <div class="space-y-2 text-xs text-gray-400 flex-1">
              <div class="flex justify-between"><span>소상공인 실속</span><span class="text-white">180만</span></div>
              <div class="flex justify-between"><span>스탠다드 성장</span><span class="text-white">350만</span></div>
              <div class="flex justify-between"><span>하이엔드 브랜딩</span><span class="text-white">500만</span></div>
              <div class="flex justify-between"><span>병원/프랜차이즈</span><span class="text-white">800만</span></div>
            </div>
            <div class="mt-auto pt-4 text-[10px] text-gray-600">
              <i class="fas fa-arrow-right mr-1"></i>VIEW PLANS
            </div>
          </div>
        </div>
        
        <!-- SHOWCASE BOX (Portfolio Marquee) -->
        <div class="bento-box bento-showcase">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-bold text-sm tracking-wide">
              <i class="fas fa-images mr-2 text-gray-500"></i>SHOWCASE
            </h3>
            <span class="text-[10px] text-gray-500">12 Projects</span>
          </div>
          <div class="marquee-container">
            <div class="marquee-track" id="marquee-track"></div>
          </div>
        </div>
        
      </div>
      
      <!-- Footer - 2026년 고정 -->
      <div class="bento-footer">
        © 2026 <span class="font-display tracking-wider">XIΛIX</span>. All rights reserved.
      </div>
    </div>
    
    <!-- ========================================
         PRICING VIEW
         ======================================== -->
    <div id="pricing-view" class="view-overlay" onclick="closePricingView(event)">
      <div class="view-content" onclick="event.stopPropagation()">
        <button class="view-close" onclick="closePricingView()">
          <i class="fas fa-times"></i>
        </button>
        
        <div class="text-center mb-6">
          <h2 id="pricing-title" class="font-display text-2xl md:text-3xl font-bold tracking-[0.2em] mb-2 cursor-pointer" onclick="handlePricingTitleClick()">
            PRICING
          </h2>
          <p class="text-gray-400 text-sm">이거 하나면 끝. 구축 + 관리 포함.</p>
        </div>
        
        <!-- Location Toggle -->
        <div class="location-toggle">
          <div class="location-btn active" data-regional="false" onclick="setLocation(false)">
            <div class="font-semibold text-sm mb-1">서울 / 경기</div>
            <div class="text-[10px] text-gray-500">출장비 무료</div>
          </div>
          <div class="location-btn" data-regional="true" onclick="setLocation(true)">
            <div class="font-semibold text-sm mb-1">지방</div>
            <div class="text-[10px] text-gray-500">+30만원</div>
          </div>
        </div>
        
        <!-- 4 Package Cards -->
        <div class="pricing-grid mb-6" id="pricing-cards"></div>
        
        <!-- Selected Package -->
        <div id="selected-package" class="hidden p-5 bg-white/5 rounded-xl border border-white/10">
          <div class="flex justify-between items-center mb-4">
            <div>
              <span class="text-xs text-gray-400">선택된 패키지</span>
              <h3 id="selected-name" class="text-lg font-bold"></h3>
            </div>
            <div class="text-right">
              <span class="text-xs text-gray-400">총 금액</span>
              <div id="selected-total" class="text-xl font-bold"></div>
            </div>
          </div>
          <button onclick="processPayment()" class="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition">
            결제하기
          </button>
        </div>
        
        <!-- Hidden Admin -->
        <div id="hidden-admin" class="hidden-admin">
          <h4 class="font-bold mb-4 text-red-400 text-sm">
            <i class="fas fa-lock mr-2"></i>관리자 모드
          </h4>
          <div class="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-xs text-gray-400 mb-2">고객명</label>
              <input type="text" id="admin-customer" placeholder="홍길동" 
                     class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30">
            </div>
            <div>
              <label class="block text-xs text-gray-400 mb-2">협의 금액 (원)</label>
              <input type="text" id="admin-amount" placeholder="4,500,000" 
                     class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30"
                     oninput="formatAdminAmount(this)">
            </div>
          </div>
          <button onclick="processCustomPayment()" class="w-full py-3 bg-red-500/20 border border-red-500/30 text-red-300 rounded-xl hover:bg-red-500/30 transition text-sm">
            <i class="fas fa-credit-card mr-2"></i>맞춤 결제 생성
          </button>
        </div>
      </div>
    </div>
    
    <!-- ========================================
         CHAT VIEW
         ======================================== -->
    <div id="chat-view" class="view-overlay" onclick="closeChatView(event)">
      <div class="view-content" onclick="event.stopPropagation()" style="max-width: 560px;">
        <button class="view-close" onclick="closeChatView()">
          <i class="fas fa-times"></i>
        </button>
        
        <div class="flex items-center gap-4 mb-5">
          <div class="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
            <i class="fas fa-robot text-lg"></i>
          </div>
          <div>
            <h2 class="text-lg font-bold">AI Director</h2>
            <p class="text-xs text-gray-400">마케팅 컨설턴트</p>
          </div>
        </div>
        
        <div class="chat-container">
          <div class="chat-messages" id="chat-messages">
            <div class="chat-message bot">
              <div class="msg-content">
                안녕하세요, X I Λ I X AI 디렉터입니다.<br><br>
                저희는 웹사이트 제작사가 아닙니다.<br>
                <strong>매출을 올리는 마케팅 솔루션</strong>을 제공합니다.<br><br>
                어떤 사업을 운영하시나요?
              </div>
            </div>
          </div>
          <div class="flex gap-3 pt-4 border-t border-white/10">
            <input type="text" id="chat-input" placeholder="메시지 입력..." 
                   class="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/20"
                   onkeypress="if(event.key==='Enter')sendChat()">
            <button onclick="sendChat()" class="px-5 bg-white text-black rounded-xl font-semibold hover:bg-gray-200 transition">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- ========================================
         PORTFOLIO MODAL
         ======================================== -->
    <div id="portfolio-modal" class="portfolio-modal" onclick="closePortfolioModal()">
      <button onclick="closePortfolioModal()" class="absolute top-5 right-5 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition">
        <i class="fas fa-times text-lg"></i>
      </button>
      <div class="security-overlay"></div>
      <iframe id="portfolio-iframe" src=""></iframe>
    </div>
    
    <!-- ========================================
         SCRIPTS
         ======================================== -->
    <script>
      // ========================================
      // EXACT DATA - 변경 금지!
      // ========================================
      const PORTFOLIO_LINKS = ${JSON.stringify(PORTFOLIO_LINKS)};
      const PRICING_PACKAGES = ${JSON.stringify(PRICING_PACKAGES)};
      
      // State
      let selectedPackage = null;
      let isRegional = false;
      let pricingTitleClicks = 0;
      let pricingTitleTimer = null;
      let chatContext = [];
      
      // ========================================
      // WebGL FLUID SHADER
      // ========================================
      (function initFluidBackground() {
        const canvas = document.getElementById('fluid-canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) { canvas.style.background = '#000'; return; }
        
        function resize() {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          gl.viewport(0, 0, canvas.width, canvas.height);
        }
        resize();
        window.addEventListener('resize', resize);
        
        const vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, 'attribute vec2 a_position;void main(){gl_Position=vec4(a_position,0.0,1.0);}');
        gl.compileShader(vertexShader);
        
        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, \`
          precision highp float;
          uniform float u_time;
          uniform vec2 u_resolution;
          uniform vec2 u_mouse;
          
          vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
          vec2 mod289(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}
          vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
          
          float snoise(vec2 v){
            const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
            vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);
            vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
            vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod289(i);
            vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
            vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
            m=m*m;m=m*m;
            vec3 x=2.0*fract(p*C.www)-1.0;vec3 h=abs(x)-0.5;
            vec3 ox=floor(x+0.5);vec3 a0=x-ox;
            m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
            vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;
            return 130.0*dot(m,g);
          }
          
          float fbm(vec2 p){
            float v=0.0,a=0.5;
            for(int i=0;i<5;i++){v+=a*snoise(p);a*=0.5;p*=2.0;}
            return v;
          }
          
          void main(){
            vec2 uv=gl_FragCoord.xy/u_resolution.xy;
            vec2 p=uv*2.0-1.0;p.x*=u_resolution.x/u_resolution.y;
            float t=u_time*0.1;
            vec2 mouse=u_mouse*2.0-1.0;mouse.x*=u_resolution.x/u_resolution.y;
            float mouseInf=smoothstep(1.5,0.0,length(p-mouse))*0.3;
            float n=fbm(p*1.2+vec2(t*0.2,t*0.15)+mouse*mouseInf)*0.5+0.5;
            vec3 c1=vec3(0.01,0.01,0.02);vec3 c2=vec3(0.04,0.03,0.08);vec3 c3=vec3(0.06,0.05,0.12);
            vec3 col=mix(c1,c2,smoothstep(0.3,0.5,n));
            col=mix(col,c3,smoothstep(0.5,0.7,n+mouseInf));
            col+=vec3(0.02,0.02,0.04)*mouseInf;
            col*=1.0-length(uv-0.5)*0.6;
            gl_FragColor=vec4(col,1.0);
          }
        \`);
        gl.compileShader(fragmentShader);
        
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.useProgram(program);
        
        const positions = new Float32Array([-1,-1,1,-1,-1,1,1,1]);
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
        
        const posLoc = gl.getAttribLocation(program, 'a_position');
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
        
        const timeLoc = gl.getUniformLocation(program, 'u_time');
        const resLoc = gl.getUniformLocation(program, 'u_resolution');
        const mouseLoc = gl.getUniformLocation(program, 'u_mouse');
        
        let mx=0.5, my=0.5, tmx=0.5, tmy=0.5;
        document.addEventListener('mousemove', e => {
          tmx = e.clientX / window.innerWidth;
          tmy = 1.0 - e.clientY / window.innerHeight;
        });
        
        function render(time) {
          mx += (tmx - mx) * 0.05;
          my += (tmy - my) * 0.05;
          gl.uniform1f(timeLoc, time * 0.001);
          gl.uniform2f(resLoc, canvas.width, canvas.height);
          gl.uniform2f(mouseLoc, mx, my);
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
          requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
      })();
      
      // Security
      document.addEventListener('contextmenu', e => e.preventDefault());
      document.addEventListener('keydown', e => {
        if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.key === 'u')) e.preventDefault();
      });
      
      // Initialize
      document.addEventListener('DOMContentLoaded', () => {
        renderMarquee();
        renderPricingCards();
        cycleAIMessages();
      });
      
      // ========================================
      // MARQUEE (12 Portfolios)
      // ========================================
      function renderMarquee() {
        const track = document.getElementById('marquee-track');
        const items = [...PORTFOLIO_LINKS, ...PORTFOLIO_LINKS]; // duplicate for loop
        track.innerHTML = items.map(p => \`
          <div class="portfolio-item" onclick="openPortfolioModal('\${p.url}')">
            <iframe src="\${p.url}" loading="lazy"></iframe>
            <div class="overlay">
              <span class="tag">\${p.tag}</span>
              <h4 class="font-bold text-xs">\${p.title}</h4>
            </div>
          </div>
        \`).join('');
      }
      
      // ========================================
      // AI Messages Cycle
      // ========================================
      const aiMessages = [
        "대표님, 진단이 필요하신가요?",
        "Amanna Hair 프로젝트 확인 중...",
        "스탠다드 패키지가 인기입니다.",
        "350만원으로 지역 1등 브랜딩을."
      ];
      let aiMsgIndex = 0;
      function cycleAIMessages() {
        setInterval(() => {
          aiMsgIndex = (aiMsgIndex + 1) % aiMessages.length;
          const el = document.getElementById('ai-message');
          el.style.opacity = 0;
          setTimeout(() => {
            el.textContent = aiMessages[aiMsgIndex];
            el.style.opacity = 1;
          }, 300);
        }, 4000);
      }
      
      // ========================================
      // PRICING VIEW
      // ========================================
      function openPricingView() {
        document.getElementById('pricing-view').classList.add('active');
        document.body.style.overflow = 'hidden';
      }
      function closePricingView(e) {
        if (e && e.target !== e.currentTarget) return;
        document.getElementById('pricing-view').classList.remove('active');
        document.body.style.overflow = '';
      }
      
      function renderPricingCards() {
        const container = document.getElementById('pricing-cards');
        container.innerHTML = PRICING_PACKAGES.map(pkg => \`
          <div class="pricing-card \${pkg.recommended ? 'recommended' : ''}" data-id="\${pkg.id}" onclick="selectPackage('\${pkg.id}')">
            \${pkg.recommended ? '<div class="text-[10px] font-bold text-white bg-white/10 px-3 py-1 rounded-full mb-3 inline-block">⭐ BEST</div>' : ''}
            <h3 class="text-base font-bold mb-1">\${pkg.name}</h3>
            <p class="text-xs text-gray-400 mb-3">\${pkg.desc}</p>
            <div class="text-2xl font-bold mb-3">₩\${pkg.price.toLocaleString()}</div>
            <ul class="space-y-1.5 text-xs text-gray-400 flex-1">
              \${pkg.features.map(f => \`<li class="flex items-start gap-2"><i class="fas fa-check text-[8px] mt-1 text-gray-600"></i>\${f}</li>\`).join('')}
            </ul>
          </div>
        \`).join('');
      }
      
      function selectPackage(id) {
        selectedPackage = PRICING_PACKAGES.find(p => p.id === id);
        document.querySelectorAll('.pricing-card').forEach(c => c.classList.remove('selected'));
        document.querySelector(\`.pricing-card[data-id="\${id}"]\`).classList.add('selected');
        updateSelectedInfo();
      }
      
      function setLocation(regional) {
        isRegional = regional;
        document.querySelectorAll('.location-btn').forEach(b => {
          b.classList.toggle('active', b.dataset.regional === String(regional));
        });
        updateSelectedInfo();
      }
      
      function updateSelectedInfo() {
        const el = document.getElementById('selected-package');
        if (!selectedPackage) { el.classList.add('hidden'); return; }
        el.classList.remove('hidden');
        document.getElementById('selected-name').textContent = selectedPackage.name;
        const total = selectedPackage.price + (isRegional ? 300000 : 0);
        document.getElementById('selected-total').textContent = '₩' + total.toLocaleString() + (isRegional ? ' (지방 +30만)' : '');
      }
      
      // Hidden Admin (5 clicks)
      function handlePricingTitleClick() {
        pricingTitleClicks++;
        if (pricingTitleTimer) clearTimeout(pricingTitleTimer);
        pricingTitleTimer = setTimeout(() => pricingTitleClicks = 0, 2000);
        if (pricingTitleClicks >= 5) {
          pricingTitleClicks = 0;
          document.getElementById('hidden-admin').classList.add('active');
        }
      }
      
      function formatAdminAmount(input) {
        let val = input.value.replace(/[^0-9]/g, '');
        if (val) input.value = Number(val).toLocaleString();
      }
      
      async function processCustomPayment() {
        const customer = document.getElementById('admin-customer').value.trim();
        const amount = parseInt(document.getElementById('admin-amount').value.replace(/[^0-9]/g, ''), 10);
        if (!customer) return alert('고객명을 입력해주세요.');
        if (!amount || amount < 10000) return alert('유효한 금액을 입력해주세요.');
        
        try {
          const res = await fetch('/api/payment/prepare', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ customAmount: amount, customerName: customer })
          });
          const data = await res.json();
          if (typeof PortOne !== 'undefined') {
            const payment = await PortOne.requestPayment({
              storeId: data.storeId, channelKey: data.channelKey, paymentId: data.orderId,
              orderName: data.orderName, totalAmount: data.totalAmount, currency: 'KRW', payMethod: 'CARD'
            });
            if (payment.code) alert('결제 실패: ' + payment.message);
            else alert('✅ 결제 완료!');
          } else { alert('결제 시스템 준비 중입니다.'); }
        } catch { alert('결제 처리 중 오류 발생'); }
      }
      
      async function processPayment() {
        if (!selectedPackage) return alert('패키지를 선택해주세요.');
        try {
          const res = await fetch('/api/payment/prepare', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ packageId: selectedPackage.id, isRegional })
          });
          const data = await res.json();
          if (typeof PortOne !== 'undefined') {
            const payment = await PortOne.requestPayment({
              storeId: data.storeId, channelKey: data.channelKey, paymentId: data.orderId,
              orderName: data.orderName, totalAmount: data.totalAmount, currency: 'KRW', payMethod: 'CARD'
            });
            if (payment.code) alert('결제 실패: ' + payment.message);
            else alert('결제 완료! 담당자가 연락드립니다.');
          } else { alert('결제 시스템 준비 중입니다.'); }
        } catch { alert('결제 처리 중 오류 발생'); }
      }
      
      // ========================================
      // CHAT VIEW
      // ========================================
      function openChatView() {
        document.getElementById('chat-view').classList.add('active');
        document.body.style.overflow = 'hidden';
      }
      function closeChatView(e) {
        if (e && e.target !== e.currentTarget) return;
        document.getElementById('chat-view').classList.remove('active');
        document.body.style.overflow = '';
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
        chatContext.push({ role: 'user', content: msg });
        
        try {
          const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: msg, context: chatContext })
          });
          const data = await res.json();
          document.getElementById(loadId).remove();
          msgs.innerHTML += \`<div class="chat-message bot"><div class="msg-content">\${formatChat(data.response)}</div></div>\`;
          chatContext.push({ role: 'assistant', content: data.response });
          msgs.scrollTop = msgs.scrollHeight;
        } catch {
          document.getElementById(loadId).innerHTML = '<div class="msg-content text-red-400">오류가 발생했습니다.</div>';
        }
      }
      
      // ========================================
      // PORTFOLIO MODAL
      // ========================================
      function openPortfolioModal(url) {
        document.getElementById('portfolio-iframe').src = url;
        document.getElementById('portfolio-modal').classList.add('active');
        document.body.style.overflow = 'hidden';
      }
      function closePortfolioModal() {
        document.getElementById('portfolio-iframe').src = '';
        document.getElementById('portfolio-modal').classList.remove('active');
        document.body.style.overflow = '';
      }
      
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
    </div>
</body>
</html>`
}

export default app
