// ProVisual 스타일 getMainHTML - 넓고 시원한 레이아웃, 정렬된 블록, 반응형 최적화
// 기존 기능 100% 유지, UI/UX만 ProVisual.app 스타일로 전면 교체

export function getMainHTML_ProVisual(): string {
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
    <meta property="og:description" content="직원 뽑지 마세요. 블로그, 인스타, 영상 편집 - XIVIX AI 시스템이 월급 없이 24시간 일합니다. 내 가게 무료 진단받기">
    <meta property="og:image" content="https://xivix.kr/og-image.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:locale" content="ko_KR">
    <meta property="og:site_name" content="X I Λ I X">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="X I Λ I X | 사장님은 장사만 하세요">
    <meta name="twitter:description" content="직원 뽑지 마세요. XIVIX AI 시스템이 마케팅을 대신합니다. 시간 -90%, 비용 -70%">
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
    <link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.portone.io/v2/browser-sdk.js"></script>
    <script src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>
    
    <style>
      /* ========================================
         ProVisual Style Design System
         넓고 시원한 레이아웃, 정렬된 블록, 가독성
         ======================================== */
      :root {
        /* ProVisual 색상 팔레트 - 밝고 모던한 다크 테마 */
        --bg-primary: #0f0f12;
        --bg-secondary: #17171c;
        --bg-tertiary: #1e1e25;
        --bg-card: #1a1a21;
        --bg-hover: #222229;
        --bg-elevated: #252530;
        
        /* 액센트 색상 - 부드럽고 프로페셔널한 */
        --accent-primary: #6366f1;
        --accent-secondary: #8b5cf6;
        --accent-success: #10b981;
        --accent-warning: #f59e0b;
        --accent-info: #06b6d4;
        --accent-rose: #f43f5e;
        
        /* 텍스트 색상 - 높은 가독성 */
        --text-primary: #f8fafc;
        --text-secondary: #94a3b8;
        --text-tertiary: #64748b;
        --text-muted: #475569;
        
        /* 보더 */
        --border-subtle: rgba(255, 255, 255, 0.06);
        --border-default: rgba(255, 255, 255, 0.1);
        --border-hover: rgba(255, 255, 255, 0.15);
        --border-accent: rgba(99, 102, 241, 0.4);
        
        /* 그라디언트 */
        --gradient-primary: linear-gradient(135deg, #6366f1, #8b5cf6);
        --gradient-secondary: linear-gradient(135deg, #06b6d4, #10b981);
        --gradient-warm: linear-gradient(135deg, #f59e0b, #f43f5e);
        --gradient-card: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%);
        
        /* 간격 - 넓고 시원한 */
        --space-xs: 8px;
        --space-sm: 16px;
        --space-md: 24px;
        --space-lg: 40px;
        --space-xl: 64px;
        --space-2xl: 100px;
        --space-3xl: 140px;
        
        /* 컨테이너 */
        --container-sm: 640px;
        --container-md: 960px;
        --container-lg: 1200px;
        --container-xl: 1400px;
        
        /* 라운드 */
        --radius-sm: 8px;
        --radius-md: 12px;
        --radius-lg: 16px;
        --radius-xl: 24px;
        --radius-2xl: 32px;
        --radius-full: 9999px;
        
        /* 그림자 */
        --shadow-sm: 0 1px 2px rgba(0,0,0,0.2);
        --shadow-md: 0 4px 12px rgba(0,0,0,0.25);
        --shadow-lg: 0 12px 40px rgba(0,0,0,0.35);
        --shadow-glow: 0 0 40px rgba(99, 102, 241, 0.15);
        
        /* 트랜지션 */
        --transition-fast: 0.15s ease;
        --transition-normal: 0.25s ease;
        --transition-slow: 0.4s ease;
      }
      
      /* ========================================
         Base Reset & Typography
         ======================================== */
      * { margin: 0; padding: 0; box-sizing: border-box; }
      
      html { 
        scroll-behavior: smooth;
        font-size: 16px;
      }
      
      body {
        font-family: 'Pretendard Variable', 'Pretendard', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        background: var(--bg-primary);
        color: var(--text-primary);
        line-height: 1.7;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        overflow-x: hidden;
      }
      
      /* 선택 방지 (입력 필드 제외) */
      body { -webkit-user-select: none; user-select: none; }
      input, textarea, select { -webkit-user-select: text; user-select: text; }
      img { -webkit-user-drag: none; user-drag: none; }
      
      /* ========================================
         Layout Containers - 넓은 여백
         ======================================== */
      .container {
        width: 100%;
        max-width: var(--container-lg);
        margin: 0 auto;
        padding: 0 var(--space-lg);
      }
      
      .container-narrow {
        max-width: var(--container-md);
      }
      
      .container-wide {
        max-width: var(--container-xl);
      }
      
      /* ========================================
         Header - 심플하고 깔끔한
         ======================================== */
      .site-header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        background: rgba(15, 15, 18, 0.85);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid var(--border-subtle);
        transition: var(--transition-normal);
      }
      
      .header-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 72px;
        padding: 0 var(--space-lg);
        max-width: var(--container-xl);
        margin: 0 auto;
      }
      
      .logo {
        font-size: 1.5rem;
        font-weight: 800;
        letter-spacing: 0.1em;
        color: var(--text-primary);
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: var(--space-xs);
      }
      
      .logo-accent {
        color: var(--accent-primary);
      }
      
      .header-nav {
        display: flex;
        align-items: center;
        gap: var(--space-md);
      }
      
      .nav-link {
        color: var(--text-secondary);
        text-decoration: none;
        font-weight: 500;
        font-size: 0.95rem;
        padding: var(--space-xs) var(--space-sm);
        border-radius: var(--radius-md);
        transition: var(--transition-fast);
      }
      
      .nav-link:hover {
        color: var(--text-primary);
        background: var(--bg-hover);
      }
      
      .header-cta {
        display: flex;
        align-items: center;
        gap: var(--space-sm);
      }
      
      .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-xs);
        padding: var(--space-sm) var(--space-md);
        font-size: 0.95rem;
        font-weight: 600;
        border-radius: var(--radius-lg);
        text-decoration: none;
        cursor: pointer;
        border: none;
        transition: var(--transition-normal);
      }
      
      .btn-ghost {
        background: transparent;
        color: var(--text-secondary);
        border: 1px solid var(--border-default);
      }
      
      .btn-ghost:hover {
        color: var(--text-primary);
        border-color: var(--border-hover);
        background: var(--bg-hover);
      }
      
      .btn-primary {
        background: var(--gradient-primary);
        color: white;
        box-shadow: var(--shadow-md);
      }
      
      .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg), var(--shadow-glow);
      }
      
      .btn-large {
        padding: var(--space-md) var(--space-xl);
        font-size: 1.1rem;
        border-radius: var(--radius-xl);
      }
      
      /* 모바일 메뉴 버튼 */
      .mobile-menu-btn {
        display: none;
        width: 44px;
        height: 44px;
        background: var(--bg-hover);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-md);
        color: var(--text-primary);
        font-size: 1.25rem;
        cursor: pointer;
      }
      
      @media (max-width: 900px) {
        .header-nav { display: none; }
        .header-cta .btn-ghost { display: none; }
        .mobile-menu-btn { display: flex; align-items: center; justify-content: center; }
      }
      
      /* ========================================
         Hero Section - 넓고 시원한 레이아웃
         ======================================== */
      .hero {
        min-height: 100vh;
        display: flex;
        align-items: center;
        padding: var(--space-3xl) 0;
        position: relative;
        overflow: hidden;
      }
      
      .hero-bg {
        position: absolute;
        inset: 0;
        pointer-events: none;
      }
      
      .hero-gradient {
        position: absolute;
        inset: 0;
        background: 
          radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99, 102, 241, 0.12) 0%, transparent 60%),
          radial-gradient(ellipse 60% 40% at 100% 50%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
          radial-gradient(ellipse 50% 50% at 0% 80%, rgba(6, 182, 212, 0.06) 0%, transparent 50%);
      }
      
      .hero-content {
        position: relative;
        z-index: 1;
        text-align: center;
        max-width: 900px;
        margin: 0 auto;
        padding: 0 var(--space-lg);
      }
      
      .hero-badge {
        display: inline-flex;
        align-items: center;
        gap: var(--space-xs);
        padding: var(--space-xs) var(--space-md);
        background: var(--bg-secondary);
        border: 1px solid var(--border-default);
        border-radius: var(--radius-full);
        font-size: 0.85rem;
        font-weight: 500;
        color: var(--text-secondary);
        margin-bottom: var(--space-lg);
      }
      
      .hero-badge-dot {
        width: 8px;
        height: 8px;
        background: var(--accent-success);
        border-radius: 50%;
        animation: pulse 2s ease-in-out infinite;
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      
      .hero-title {
        font-size: clamp(2.5rem, 6vw, 4rem);
        font-weight: 800;
        line-height: 1.15;
        letter-spacing: -0.03em;
        margin-bottom: var(--space-md);
      }
      
      .hero-title-accent {
        background: var(--gradient-primary);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .hero-desc {
        font-size: clamp(1.1rem, 2vw, 1.35rem);
        color: var(--text-secondary);
        line-height: 1.8;
        margin-bottom: var(--space-xl);
        max-width: 700px;
        margin-left: auto;
        margin-right: auto;
      }
      
      .hero-actions {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-md);
        flex-wrap: wrap;
      }
      
      .hero-stats {
        display: flex;
        justify-content: center;
        gap: var(--space-2xl);
        margin-top: var(--space-2xl);
        padding-top: var(--space-xl);
        border-top: 1px solid var(--border-subtle);
      }
      
      .hero-stat {
        text-align: center;
      }
      
      .hero-stat-value {
        font-size: 2.5rem;
        font-weight: 800;
        color: var(--text-primary);
        line-height: 1;
        margin-bottom: var(--space-xs);
      }
      
      .hero-stat-value span {
        color: var(--accent-primary);
      }
      
      .hero-stat-label {
        font-size: 0.9rem;
        color: var(--text-tertiary);
      }
      
      @media (max-width: 768px) {
        .hero { padding: 120px 0 var(--space-2xl); min-height: auto; }
        .hero-stats { flex-direction: column; gap: var(--space-lg); }
        .hero-actions { flex-direction: column; }
        .hero-actions .btn { width: 100%; max-width: 320px; }
      }
      
      /* ========================================
         Section Layout - 정렬된 블록
         ======================================== */
      .section {
        padding: var(--space-3xl) 0;
        position: relative;
      }
      
      .section-alt {
        background: var(--bg-secondary);
      }
      
      .section-header {
        text-align: center;
        max-width: 800px;
        margin: 0 auto var(--space-2xl);
      }
      
      .section-eyebrow {
        display: inline-flex;
        align-items: center;
        gap: var(--space-xs);
        padding: var(--space-xs) var(--space-sm);
        background: rgba(99, 102, 241, 0.1);
        border: 1px solid rgba(99, 102, 241, 0.2);
        border-radius: var(--radius-full);
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--accent-primary);
        text-transform: uppercase;
        letter-spacing: 0.1em;
        margin-bottom: var(--space-md);
      }
      
      .section-title {
        font-size: clamp(2rem, 4vw, 3rem);
        font-weight: 800;
        line-height: 1.2;
        letter-spacing: -0.02em;
        margin-bottom: var(--space-md);
      }
      
      .section-desc {
        font-size: 1.15rem;
        color: var(--text-secondary);
        line-height: 1.8;
      }
      
      /* ========================================
         Service Menu Grid - 정렬된 카드
         ======================================== */
      .service-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--space-md);
        max-width: var(--container-lg);
        margin: 0 auto;
      }
      
      .service-card {
        background: var(--bg-card);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-xl);
        padding: var(--space-lg);
        cursor: pointer;
        transition: var(--transition-normal);
        position: relative;
        overflow: hidden;
      }
      
      .service-card::before {
        content: '';
        position: absolute;
        inset: 0;
        background: var(--gradient-card);
        opacity: 0;
        transition: var(--transition-normal);
      }
      
      .service-card:hover {
        border-color: var(--border-accent);
        transform: translateY(-4px);
        box-shadow: var(--shadow-lg);
      }
      
      .service-card:hover::before {
        opacity: 1;
      }
      
      .service-card-inner {
        position: relative;
        z-index: 1;
      }
      
      .service-card-header {
        display: flex;
        align-items: flex-start;
        gap: var(--space-md);
        margin-bottom: var(--space-md);
      }
      
      .service-icon {
        width: 56px;
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.1));
        border: 1px solid rgba(99, 102, 241, 0.2);
        border-radius: var(--radius-lg);
        font-size: 1.5rem;
        flex-shrink: 0;
      }
      
      .service-icon.naver { color: #03C75A; background: rgba(3, 199, 90, 0.1); border-color: rgba(3, 199, 90, 0.2); }
      .service-icon.insta { color: #E4405F; background: rgba(228, 64, 95, 0.1); border-color: rgba(228, 64, 95, 0.2); }
      .service-icon.youtube { color: #FF0000; background: rgba(255, 0, 0, 0.1); border-color: rgba(255, 0, 0, 0.2); }
      .service-icon.tiktok { color: #00f2ea; background: rgba(0, 242, 234, 0.1); border-color: rgba(0, 242, 234, 0.2); }
      .service-icon.web { color: var(--accent-primary); }
      .service-icon.system { color: var(--accent-info); background: rgba(6, 182, 212, 0.1); border-color: rgba(6, 182, 212, 0.2); }
      
      .service-card-info {
        flex: 1;
      }
      
      .service-card-title {
        font-size: 1.2rem;
        font-weight: 700;
        margin-bottom: var(--space-xs);
        display: flex;
        align-items: center;
        gap: var(--space-xs);
      }
      
      .service-card-badge {
        padding: 3px 10px;
        background: var(--gradient-warm);
        border-radius: var(--radius-full);
        font-size: 0.7rem;
        font-weight: 700;
        color: white;
      }
      
      .service-card-desc {
        font-size: 0.95rem;
        color: var(--text-tertiary);
        line-height: 1.6;
      }
      
      .service-card-arrow {
        position: absolute;
        top: var(--space-lg);
        right: var(--space-lg);
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--bg-hover);
        border-radius: var(--radius-md);
        color: var(--text-tertiary);
        transition: var(--transition-fast);
      }
      
      .service-card:hover .service-card-arrow {
        background: var(--accent-primary);
        color: white;
      }
      
      @media (max-width: 768px) {
        .service-grid { grid-template-columns: 1fr; gap: var(--space-sm); }
        .service-card { padding: var(--space-md); }
        .service-icon { width: 48px; height: 48px; font-size: 1.25rem; }
      }
      
      /* ========================================
         Feature Blocks - 4대 블록
         ======================================== */
      .blocks-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--space-md);
        max-width: var(--container-lg);
        margin: 0 auto;
      }
      
      .block-card {
        background: var(--bg-card);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-xl);
        padding: var(--space-xl);
        position: relative;
        transition: var(--transition-normal);
      }
      
      .block-card:hover {
        border-color: var(--border-hover);
        box-shadow: var(--shadow-md);
      }
      
      .block-number {
        position: absolute;
        top: var(--space-md);
        right: var(--space-md);
        font-size: 4rem;
        font-weight: 900;
        color: var(--bg-tertiary);
        line-height: 1;
      }
      
      .block-icon {
        width: 56px;
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--bg-elevated);
        border-radius: var(--radius-lg);
        font-size: 1.5rem;
        color: var(--accent-primary);
        margin-bottom: var(--space-md);
      }
      
      .block-title {
        font-size: 1.35rem;
        font-weight: 700;
        margin-bottom: var(--space-sm);
      }
      
      .block-desc {
        font-size: 0.95rem;
        color: var(--text-secondary);
        line-height: 1.7;
        margin-bottom: var(--space-md);
      }
      
      .block-stats {
        display: flex;
        gap: var(--space-md);
        margin-bottom: var(--space-md);
      }
      
      .block-stat {
        flex: 1;
        text-align: center;
        padding: var(--space-sm);
        background: var(--bg-secondary);
        border-radius: var(--radius-md);
      }
      
      .block-stat-value {
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--accent-primary);
      }
      
      .block-stat-label {
        font-size: 0.75rem;
        color: var(--text-tertiary);
        margin-top: 4px;
      }
      
      .block-tags {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-xs);
      }
      
      .block-tag {
        padding: 4px 12px;
        background: var(--bg-secondary);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-full);
        font-size: 0.75rem;
        color: var(--text-tertiary);
      }
      
      @media (max-width: 900px) {
        .blocks-grid { grid-template-columns: 1fr; }
        .block-card { padding: var(--space-lg); }
      }
      
      /* ========================================
         Pricing Cards
         ======================================== */
      .pricing-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--space-md);
        max-width: var(--container-lg);
        margin: 0 auto;
      }
      
      .pricing-card {
        background: var(--bg-card);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-xl);
        padding: var(--space-xl);
        transition: var(--transition-normal);
        position: relative;
      }
      
      .pricing-card.featured {
        border-color: var(--accent-primary);
        background: linear-gradient(180deg, rgba(99, 102, 241, 0.05) 0%, var(--bg-card) 100%);
      }
      
      .pricing-card:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-lg);
      }
      
      .pricing-badge {
        position: absolute;
        top: -12px;
        left: 50%;
        transform: translateX(-50%);
        padding: 6px 16px;
        background: var(--gradient-primary);
        border-radius: var(--radius-full);
        font-size: 0.75rem;
        font-weight: 700;
        color: white;
      }
      
      .pricing-header {
        text-align: center;
        padding-bottom: var(--space-md);
        border-bottom: 1px solid var(--border-subtle);
        margin-bottom: var(--space-md);
      }
      
      .pricing-name {
        font-size: 1.25rem;
        font-weight: 700;
        margin-bottom: var(--space-xs);
      }
      
      .pricing-price {
        font-size: 2.5rem;
        font-weight: 800;
      }
      
      .pricing-period {
        font-size: 0.9rem;
        color: var(--text-tertiary);
      }
      
      .pricing-features {
        list-style: none;
        margin-bottom: var(--space-lg);
      }
      
      .pricing-feature {
        display: flex;
        align-items: center;
        gap: var(--space-sm);
        padding: var(--space-sm) 0;
        font-size: 0.95rem;
        color: var(--text-secondary);
      }
      
      .pricing-feature i {
        color: var(--accent-success);
        font-size: 0.9rem;
      }
      
      @media (max-width: 900px) {
        .pricing-grid { grid-template-columns: 1fr; max-width: 400px; }
      }
      
      /* ========================================
         Portfolio Grid
         ======================================== */
      .portfolio-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: var(--space-md);
      }
      
      .portfolio-card {
        background: var(--bg-card);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-xl);
        overflow: hidden;
        transition: var(--transition-normal);
        cursor: pointer;
      }
      
      .portfolio-card:hover {
        border-color: var(--border-accent);
        transform: translateY(-4px);
        box-shadow: var(--shadow-lg);
      }
      
      .portfolio-thumb {
        aspect-ratio: 16/10;
        background: var(--bg-elevated);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        color: var(--text-muted);
      }
      
      .portfolio-info {
        padding: var(--space-md);
      }
      
      .portfolio-title {
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: var(--space-xs);
      }
      
      .portfolio-tag {
        font-size: 0.8rem;
        color: var(--accent-primary);
      }
      
      /* ========================================
         Chatbot - 깔끔한 모던 디자인
         ======================================== */
      .chat-bubble {
        position: fixed;
        bottom: var(--space-md);
        right: var(--space-md);
        width: 64px;
        height: 64px;
        background: var(--gradient-primary);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 999;
        box-shadow: var(--shadow-lg), var(--shadow-glow);
        transition: var(--transition-normal);
      }
      
      .chat-bubble:hover {
        transform: scale(1.08);
      }
      
      .chat-bubble i {
        font-size: 1.5rem;
        color: white;
      }
      
      .chat-window {
        position: fixed;
        bottom: 100px;
        right: var(--space-md);
        width: 400px;
        max-width: calc(100vw - 32px);
        height: 600px;
        max-height: calc(100vh - 140px);
        background: var(--bg-secondary);
        border: 1px solid var(--border-default);
        border-radius: var(--radius-xl);
        display: none;
        flex-direction: column;
        z-index: 998;
        box-shadow: var(--shadow-lg);
        overflow: hidden;
      }
      
      .chat-window.open {
        display: flex;
      }
      
      .chat-header {
        padding: var(--space-md);
        background: var(--bg-tertiary);
        border-bottom: 1px solid var(--border-subtle);
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      
      .chat-header-title {
        display: flex;
        align-items: center;
        gap: var(--space-sm);
      }
      
      .chat-avatar {
        width: 40px;
        height: 40px;
        background: var(--gradient-primary);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.1rem;
        color: white;
      }
      
      .chat-header-info h4 {
        font-size: 1rem;
        font-weight: 600;
      }
      
      .chat-header-info span {
        font-size: 0.8rem;
        color: var(--accent-success);
      }
      
      .chat-close {
        width: 36px;
        height: 36px;
        background: var(--bg-hover);
        border: none;
        border-radius: var(--radius-md);
        color: var(--text-secondary);
        font-size: 1rem;
        cursor: pointer;
        transition: var(--transition-fast);
      }
      
      .chat-close:hover {
        background: rgba(244, 63, 94, 0.2);
        color: var(--accent-rose);
      }
      
      .chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: var(--space-md);
        display: flex;
        flex-direction: column;
        gap: var(--space-sm);
      }
      
      .chat-message {
        max-width: 85%;
        padding: var(--space-sm) var(--space-md);
        border-radius: var(--radius-lg);
        font-size: 0.95rem;
        line-height: 1.6;
      }
      
      .chat-message.bot {
        background: var(--bg-tertiary);
        color: var(--text-primary);
        align-self: flex-start;
        border-bottom-left-radius: 4px;
      }
      
      .chat-message.user {
        background: var(--gradient-primary);
        color: white;
        align-self: flex-end;
        border-bottom-right-radius: 4px;
      }
      
      .chat-input-area {
        padding: var(--space-md);
        border-top: 1px solid var(--border-subtle);
        display: flex;
        gap: var(--space-sm);
      }
      
      .chat-input {
        flex: 1;
        padding: var(--space-sm) var(--space-md);
        background: var(--bg-tertiary);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-lg);
        color: var(--text-primary);
        font-size: 0.95rem;
        outline: none;
        transition: var(--transition-fast);
      }
      
      .chat-input:focus {
        border-color: var(--accent-primary);
      }
      
      .chat-send {
        width: 44px;
        height: 44px;
        background: var(--gradient-primary);
        border: none;
        border-radius: var(--radius-lg);
        color: white;
        font-size: 1rem;
        cursor: pointer;
        transition: var(--transition-fast);
      }
      
      .chat-send:hover {
        transform: scale(1.05);
      }
      
      /* ========================================
         Modal System
         ======================================== */
      .modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.85);
        backdrop-filter: blur(8px);
        z-index: 1100;
        display: none;
        overflow-y: auto;
      }
      
      .modal-overlay.open {
        display: block;
      }
      
      .modal-content {
        max-width: 900px;
        margin: var(--space-xl) auto;
        padding: var(--space-md);
      }
      
      .modal-header {
        position: sticky;
        top: 0;
        background: rgba(15, 15, 18, 0.95);
        backdrop-filter: blur(12px);
        padding: var(--space-md) 0;
        border-bottom: 1px solid var(--border-subtle);
        margin-bottom: var(--space-lg);
        display: flex;
        align-items: center;
        justify-content: space-between;
        z-index: 10;
      }
      
      .modal-title {
        font-size: 1.5rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: var(--space-sm);
      }
      
      .modal-close {
        width: 48px;
        height: 48px;
        background: var(--bg-hover);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-lg);
        color: var(--text-primary);
        font-size: 1.25rem;
        cursor: pointer;
        transition: var(--transition-fast);
      }
      
      .modal-close:hover {
        background: rgba(244, 63, 94, 0.2);
        border-color: var(--accent-rose);
        color: var(--accent-rose);
      }
      
      /* ========================================
         Footer
         ======================================== */
      .site-footer {
        padding: var(--space-2xl) 0 var(--space-xl);
        background: var(--bg-secondary);
        border-top: 1px solid var(--border-subtle);
      }
      
      .footer-content {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr;
        gap: var(--space-2xl);
        max-width: var(--container-lg);
        margin: 0 auto;
        padding: 0 var(--space-lg);
      }
      
      .footer-brand {
        max-width: 300px;
      }
      
      .footer-logo {
        font-size: 1.5rem;
        font-weight: 800;
        letter-spacing: 0.1em;
        margin-bottom: var(--space-md);
      }
      
      .footer-desc {
        font-size: 0.95rem;
        color: var(--text-tertiary);
        line-height: 1.7;
      }
      
      .footer-links h4 {
        font-size: 0.9rem;
        font-weight: 600;
        margin-bottom: var(--space-md);
        color: var(--text-primary);
      }
      
      .footer-links a {
        display: block;
        color: var(--text-tertiary);
        text-decoration: none;
        font-size: 0.9rem;
        padding: var(--space-xs) 0;
        transition: var(--transition-fast);
      }
      
      .footer-links a:hover {
        color: var(--text-primary);
      }
      
      .footer-bottom {
        margin-top: var(--space-xl);
        padding-top: var(--space-lg);
        border-top: 1px solid var(--border-subtle);
        text-align: center;
      }
      
      .footer-copyright {
        font-size: 0.85rem;
        color: var(--text-muted);
      }
      
      @media (max-width: 768px) {
        .footer-content { grid-template-columns: 1fr; gap: var(--space-lg); text-align: center; }
        .footer-brand { max-width: none; margin: 0 auto; }
      }
      
      /* ========================================
         Education Modal - 수강 신청
         ======================================== */
      .edu-modal {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.9);
        z-index: 1200;
        display: none;
        align-items: center;
        justify-content: center;
        padding: var(--space-md);
      }
      
      .edu-modal.open {
        display: flex;
      }
      
      .edu-modal-content {
        width: 100%;
        max-width: 480px;
        max-height: 90vh;
        overflow-y: auto;
        background: var(--bg-secondary);
        border: 1px solid var(--border-default);
        border-radius: var(--radius-xl);
      }
      
      .edu-modal-header {
        padding: var(--space-lg);
        background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.08));
        border-bottom: 1px solid var(--border-subtle);
        text-align: center;
        position: relative;
      }
      
      .edu-modal-close {
        position: absolute;
        top: var(--space-sm);
        right: var(--space-sm);
        width: 36px;
        height: 36px;
        background: var(--bg-hover);
        border: none;
        border-radius: 50%;
        color: var(--text-secondary);
        cursor: pointer;
      }
      
      .edu-modal-body {
        padding: var(--space-lg);
      }
      
      .edu-product {
        background: linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(139, 92, 246, 0.05));
        border: 1px solid var(--border-accent);
        border-radius: var(--radius-lg);
        padding: var(--space-lg);
        margin-bottom: var(--space-md);
        text-align: center;
      }
      
      .edu-badge {
        display: inline-block;
        background: var(--gradient-warm);
        color: white;
        padding: 6px 14px;
        border-radius: var(--radius-full);
        font-size: 0.8rem;
        font-weight: 700;
        margin-bottom: var(--space-sm);
      }
      
      .edu-price {
        font-size: 2rem;
        font-weight: 800;
        color: var(--accent-primary);
      }
      
      .edu-note {
        font-size: 0.85rem;
        color: var(--accent-warning);
        margin-top: var(--space-xs);
      }
      
      .payment-btns {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-sm);
        margin: var(--space-md) 0;
      }
      
      .payment-btn {
        padding: var(--space-md);
        border-radius: var(--radius-lg);
        border: 2px solid var(--border-default);
        background: transparent;
        cursor: pointer;
        text-align: center;
        color: var(--text-primary);
        transition: var(--transition-fast);
      }
      
      .payment-btn:hover,
      .payment-btn.active {
        border-color: var(--accent-primary);
        background: rgba(99, 102, 241, 0.1);
      }
      
      .bank-info {
        display: none;
        background: rgba(16, 185, 129, 0.1);
        border: 1px solid rgba(16, 185, 129, 0.3);
        border-radius: var(--radius-lg);
        padding: var(--space-md);
        margin: var(--space-md) 0;
      }
      
      .bank-info.show {
        display: block;
      }
      
      .bank-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: var(--space-xs);
        font-size: 0.9rem;
      }
      
      .bank-form input {
        width: 100%;
        padding: var(--space-sm);
        border-radius: var(--radius-md);
        border: 1px solid var(--border-subtle);
        background: var(--bg-tertiary);
        color: var(--text-primary);
        margin-bottom: var(--space-sm);
        font-size: 0.95rem;
      }
      
      .edu-submit {
        width: 100%;
        padding: var(--space-md);
        border-radius: var(--radius-lg);
        border: none;
        font-size: 1rem;
        font-weight: 700;
        cursor: pointer;
        color: white;
        transition: var(--transition-fast);
      }
      
      .edu-submit.card-btn {
        background: var(--gradient-primary);
      }
      
      .edu-submit.bank-btn {
        background: var(--gradient-secondary);
      }
      
      .edu-submit:hover {
        transform: translateY(-2px);
      }
      
      /* ========================================
         iframe Modal
         ======================================== */
      .iframe-modal {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.95);
        z-index: 1300;
        display: none;
        flex-direction: column;
      }
      
      .iframe-modal.open {
        display: flex;
      }
      
      .iframe-modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--space-sm) var(--space-md);
        background: var(--gradient-primary);
      }
      
      .iframe-modal-title {
        color: white;
        font-weight: 700;
        font-size: 1rem;
      }
      
      .iframe-modal-close {
        width: 40px;
        height: 40px;
        background: rgba(0, 0, 0, 0.3);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 1.1rem;
        cursor: pointer;
      }
      
      .iframe-modal iframe {
        flex: 1;
        border: none;
        width: 100%;
        background: white;
      }
      
      /* ========================================
         Mobile Menu
         ======================================== */
      .mobile-nav {
        position: fixed;
        inset: 0;
        background: var(--bg-primary);
        z-index: 1050;
        display: none;
        flex-direction: column;
        padding: 80px var(--space-lg) var(--space-lg);
      }
      
      .mobile-nav.open {
        display: flex;
      }
      
      .mobile-nav-link {
        display: block;
        padding: var(--space-md);
        color: var(--text-primary);
        text-decoration: none;
        font-size: 1.25rem;
        font-weight: 600;
        border-bottom: 1px solid var(--border-subtle);
        transition: var(--transition-fast);
      }
      
      .mobile-nav-link:hover {
        color: var(--accent-primary);
      }
      
      /* ========================================
         Utility Classes
         ======================================== */
      .text-center { text-align: center; }
      .text-left { text-align: left; }
      .text-right { text-align: right; }
      
      .flex { display: flex; }
      .flex-col { flex-direction: column; }
      .items-center { align-items: center; }
      .justify-center { justify-content: center; }
      .justify-between { justify-content: space-between; }
      .gap-sm { gap: var(--space-sm); }
      .gap-md { gap: var(--space-md); }
      .gap-lg { gap: var(--space-lg); }
      
      .mt-sm { margin-top: var(--space-sm); }
      .mt-md { margin-top: var(--space-md); }
      .mt-lg { margin-top: var(--space-lg); }
      .mt-xl { margin-top: var(--space-xl); }
      .mb-sm { margin-bottom: var(--space-sm); }
      .mb-md { margin-bottom: var(--space-md); }
      .mb-lg { margin-bottom: var(--space-lg); }
      .mb-xl { margin-bottom: var(--space-xl); }
      
      .hidden { display: none !important; }
      .visible { display: block !important; }
      
      /* Scrollbar */
      ::-webkit-scrollbar { width: 6px; height: 6px; }
      ::-webkit-scrollbar-track { background: var(--bg-secondary); }
      ::-webkit-scrollbar-thumb { background: var(--bg-tertiary); border-radius: 3px; }
      ::-webkit-scrollbar-thumb:hover { background: var(--bg-hover); }
      
      /* Animation */
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      .animate-in {
        animation: fadeIn 0.6s ease forwards;
      }
    </style>
</head>
<body>
    <!-- Header -->
    <header class="site-header">
      <div class="header-inner">
        <a href="/" class="logo">
          X I <span class="logo-accent">Λ</span> I X
        </a>
        
        <nav class="header-nav">
          <a href="#services" class="nav-link">서비스</a>
          <a href="#portfolio" class="nav-link">포트폴리오</a>
          <a href="#pricing" class="nav-link">가격</a>
          <a href="#education" class="nav-link">AI 입문반</a>
        </nav>
        
        <div class="header-cta">
          <a href="/login" class="btn btn-ghost">
            <i class="fas fa-user"></i>
            로그인
          </a>
          <button class="btn btn-primary" onclick="openChat()">
            <i class="fas fa-comment-dots"></i>
            무료 상담
          </button>
          <button class="mobile-menu-btn" onclick="toggleMobileMenu()">
            <i class="fas fa-bars"></i>
          </button>
        </div>
      </div>
    </header>
    
    <!-- Mobile Nav -->
    <nav class="mobile-nav" id="mobileNav">
      <a href="#services" class="mobile-nav-link" onclick="closeMobileMenu()">서비스</a>
      <a href="#portfolio" class="mobile-nav-link" onclick="closeMobileMenu()">포트폴리오</a>
      <a href="#pricing" class="mobile-nav-link" onclick="closeMobileMenu()">가격</a>
      <a href="#education" class="mobile-nav-link" onclick="closeMobileMenu()">AI 입문반</a>
      <a href="/login" class="mobile-nav-link" onclick="closeMobileMenu()">로그인</a>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-bg">
        <div class="hero-gradient"></div>
      </div>
      
      <div class="hero-content">
        <div class="hero-badge">
          <span class="hero-badge-dot"></span>
          XIVIX Business Engineering
        </div>
        
        <h1 class="hero-title">
          사장님은 장사만 하세요<br>
          <span class="hero-title-accent">마케팅은 AI가 다 해드립니다</span>
        </h1>
        
        <p class="hero-desc">
          직원 뽑지 마세요. 블로그, 인스타, 영상 편집...<br>
          XIVIX AI 시스템이 월급 없이 24시간 일합니다.
        </p>
        
        <div class="hero-actions">
          <button class="btn btn-primary btn-large" onclick="openChat()">
            <i class="fas fa-magic"></i>
            무료 진단 받기
          </button>
          <a href="#services" class="btn btn-ghost btn-large">
            <i class="fas fa-arrow-down"></i>
            서비스 보기
          </a>
        </div>
        
        <div class="hero-stats">
          <div class="hero-stat">
            <div class="hero-stat-value"><span>-90</span>%</div>
            <div class="hero-stat-label">시간 절감</div>
          </div>
          <div class="hero-stat">
            <div class="hero-stat-value"><span>-70</span>%</div>
            <div class="hero-stat-label">비용 절감</div>
          </div>
          <div class="hero-stat">
            <div class="hero-stat-value"><span>+250</span>%</div>
            <div class="hero-stat-label">문의량 증가</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="section" id="services">
      <div class="container">
        <div class="section-header">
          <span class="section-eyebrow">
            <i class="fas fa-rocket"></i>
            Services
          </span>
          <h2 class="section-title">AI 마케팅 솔루션</h2>
          <p class="section-desc">
            20년 현장 데이터를 기반으로 설계된 AI 마케팅 시스템.<br>
            강매 없음, 성과 보장, 무료 상담.
          </p>
        </div>
        
        <div class="service-grid" id="serviceGrid">
          <!-- Services will be loaded dynamically -->
        </div>
      </div>
    </section>

    <!-- 4대 블록 비즈니스 섹션 -->
    <section class="section section-alt" id="blocks">
      <div class="container">
        <div class="section-header">
          <span class="section-eyebrow">
            <i class="fas fa-building"></i>
            Business
          </span>
          <h2 class="section-title">20년 현장 데이터 기반</h2>
          <p class="section-desc">
            유통, 글로벌 제조, 정부 인증, 빅데이터 알고리즘<br>
            이 모든 지식을 AI에 이식했습니다.
          </p>
        </div>
        
        <div class="blocks-grid">
          <div class="block-card">
            <span class="block-number">01</span>
            <div class="block-icon"><i class="fas fa-store"></i></div>
            <h3 class="block-title">커머스 유통 설계</h3>
            <p class="block-desc">
              전국 대리점 네트워크와 홈쇼핑 계약을 통해 검증된 유통망을 구축합니다.
            </p>
            <div class="block-stats">
              <div class="block-stat">
                <div class="block-stat-value">23</div>
                <div class="block-stat-label">유통망</div>
              </div>
              <div class="block-stat">
                <div class="block-stat-value">1.4만</div>
                <div class="block-stat-label">판매대</div>
              </div>
              <div class="block-stat">
                <div class="block-stat-value">13</div>
                <div class="block-stat-label">전시회</div>
              </div>
            </div>
            <div class="block-tags">
              <span class="block-tag">신세계TV쇼핑</span>
              <span class="block-tag">K홈쇼핑</span>
              <span class="block-tag">자사몰</span>
            </div>
          </div>
          
          <div class="block-card">
            <span class="block-number">02</span>
            <div class="block-icon"><i class="fas fa-globe"></i></div>
            <h3 class="block-title">글로벌 제조 & B2B</h3>
            <p class="block-desc">
              아모스프로페셔널, RBH, 시세이도, 웰라 등 글로벌 파트너와의 협업 경험.
            </p>
            <div class="block-stats">
              <div class="block-stat">
                <div class="block-stat-value">4+</div>
                <div class="block-stat-label">글로벌 파트너</div>
              </div>
              <div class="block-stat">
                <div class="block-stat-value">14,807</div>
                <div class="block-stat-label">누적 판매대</div>
              </div>
            </div>
            <div class="block-tags">
              <span class="block-tag">아모스</span>
              <span class="block-tag">시세이도</span>
              <span class="block-tag">웰라</span>
            </div>
          </div>
          
          <div class="block-card">
            <span class="block-number">03</span>
            <div class="block-icon"><i class="fas fa-award"></i></div>
            <h3 class="block-title">규제 특례 & 국가 인증</h3>
            <p class="block-desc">
              산업부 실증특례, 기술 특허, 메인비즈, 벤처기업 등 10종 인증 획득.
            </p>
            <div class="block-stats">
              <div class="block-stat">
                <div class="block-stat-value">10+</div>
                <div class="block-stat-label">인증</div>
              </div>
              <div class="block-stat">
                <div class="block-stat-value">ISO</div>
                <div class="block-stat-label">9001/14001</div>
              </div>
            </div>
            <div class="block-tags">
              <span class="block-tag">실증특례</span>
              <span class="block-tag">벤처기업</span>
              <span class="block-tag">메인비즈</span>
            </div>
          </div>
          
          <div class="block-card">
            <span class="block-number">04</span>
            <div class="block-icon"><i class="fas fa-chart-line"></i></div>
            <h3 class="block-title">빅데이터 알고리즘</h3>
            <p class="block-desc">
              RGB-16 AI로 1,600만 컬러를 추출하고 실전 데이터 기반 마케팅을 자동화합니다.
            </p>
            <div class="block-stats">
              <div class="block-stat">
                <div class="block-stat-value">1,600만</div>
                <div class="block-stat-label">컬러 추출</div>
              </div>
              <div class="block-stat">
                <div class="block-stat-value">RGB-16</div>
                <div class="block-stat-label">AI 엔진</div>
              </div>
            </div>
            <div class="block-tags">
              <span class="block-tag">빅데이터</span>
              <span class="block-tag">자동화</span>
              <span class="block-tag">AI</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Portfolio Section -->
    <section class="section" id="portfolio">
      <div class="container">
        <div class="section-header">
          <span class="section-eyebrow">
            <i class="fas fa-images"></i>
            Portfolio
          </span>
          <h2 class="section-title">포트폴리오</h2>
          <p class="section-desc">
            다양한 분야의 성공적인 프로젝트를 확인하세요.
          </p>
        </div>
        
        <div class="portfolio-grid" id="portfolioGrid">
          <!-- Portfolio items will be loaded dynamically -->
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section class="section section-alt" id="pricing">
      <div class="container">
        <div class="section-header">
          <span class="section-eyebrow">
            <i class="fas fa-tags"></i>
            Pricing
          </span>
          <h2 class="section-title">가격 안내</h2>
          <p class="section-desc">
            투명한 가격, 숨겨진 비용 없음.<br>
            필요한 서비스만 선택하세요.
          </p>
        </div>
        
        <div class="pricing-grid">
          <div class="pricing-card">
            <div class="pricing-header">
              <h3 class="pricing-name">GRADE 1</h3>
              <div class="pricing-price">₩550,000</div>
              <div class="pricing-period">/월</div>
            </div>
            <ul class="pricing-features">
              <li class="pricing-feature"><i class="fas fa-check"></i> 베이직 관리</li>
              <li class="pricing-feature"><i class="fas fa-check"></i> SNS 기본 세팅</li>
              <li class="pricing-feature"><i class="fas fa-check"></i> 월간 리포트</li>
              <li class="pricing-feature"><i class="fas fa-check"></i> 1:1 카톡 상담</li>
            </ul>
            <button class="btn btn-ghost" style="width:100%" onclick="openChat()">
              상담하기
            </button>
          </div>
          
          <div class="pricing-card featured">
            <span class="pricing-badge">인기</span>
            <div class="pricing-header">
              <h3 class="pricing-name">GRADE 2</h3>
              <div class="pricing-price">₩990,000</div>
              <div class="pricing-period">/월</div>
            </div>
            <ul class="pricing-features">
              <li class="pricing-feature"><i class="fas fa-check"></i> 스탠다드 관리</li>
              <li class="pricing-feature"><i class="fas fa-check"></i> AI 콘텐츠 생성</li>
              <li class="pricing-feature"><i class="fas fa-check"></i> 주간 리포트</li>
              <li class="pricing-feature"><i class="fas fa-check"></i> 광고 집행</li>
              <li class="pricing-feature"><i class="fas fa-check"></i> 줌 미팅 월 2회</li>
            </ul>
            <button class="btn btn-primary" style="width:100%" onclick="openChat()">
              상담하기
            </button>
          </div>
          
          <div class="pricing-card">
            <div class="pricing-header">
              <h3 class="pricing-name">GRADE 3</h3>
              <div class="pricing-price">₩1,900,000</div>
              <div class="pricing-period">/월</div>
            </div>
            <ul class="pricing-features">
              <li class="pricing-feature"><i class="fas fa-check"></i> 토탈 마스터</li>
              <li class="pricing-feature"><i class="fas fa-check"></i> AI 영상 제작</li>
              <li class="pricing-feature"><i class="fas fa-check"></i> 전담 매니저</li>
              <li class="pricing-feature"><i class="fas fa-check"></i> 바이럴 마케팅</li>
              <li class="pricing-feature"><i class="fas fa-check"></i> 방문 컨설팅</li>
            </ul>
            <button class="btn btn-ghost" style="width:100%" onclick="openChat()">
              상담하기
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Education Section -->
    <section class="section" id="education">
      <div class="container">
        <div class="section-header">
          <span class="section-eyebrow">
            <i class="fas fa-graduation-cap"></i>
            Education
          </span>
          <h2 class="section-title">AI 입문반 1기</h2>
          <p class="section-desc">
            사장님도 AI를 직접 활용할 수 있습니다.<br>
            실전 중심의 AI 마케팅 교육 프로그램.
          </p>
        </div>
        
        <div style="max-width: 600px; margin: 0 auto; text-align: center;">
          <div class="edu-product">
            <span class="edu-badge">선착순 마감</span>
            <div class="edu-price">₩50,000</div>
            <div class="edu-note">정가 ₩150,000 → 한정 특가</div>
          </div>
          
          <button class="btn btn-primary btn-large" onclick="openEduModal()">
            <i class="fas fa-bolt"></i>
            지금 신청하기
          </button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="site-footer">
      <div class="footer-content">
        <div class="footer-brand">
          <div class="footer-logo">X I Λ I X</div>
          <p class="footer-desc">
            20년 현장 데이터를 바탕으로<br>
            AI로 사장님의 노동을 줄여드립니다.
          </p>
        </div>
        
        <div class="footer-links">
          <h4>서비스</h4>
          <a href="#services">마케팅 서비스</a>
          <a href="#portfolio">포트폴리오</a>
          <a href="#pricing">가격 안내</a>
          <a href="#education">AI 입문반</a>
        </div>
        
        <div class="footer-links">
          <h4>고객지원</h4>
          <a href="javascript:openChat()">무료 상담</a>
          <a href="/login">마이페이지</a>
          <a href="https://www.youtube.com/@studiojuai_officia" target="_blank">유튜브</a>
        </div>
      </div>
      
      <div class="footer-bottom container">
        <p class="footer-copyright">
          &copy; 2024 컴바인티엔비 | XIVIX. All rights reserved.
        </p>
      </div>
    </footer>

    <!-- Chatbot -->
    <div class="chat-bubble" onclick="toggleChat()">
      <i class="fas fa-comment-dots"></i>
    </div>
    
    <div class="chat-window" id="chatWindow">
      <div class="chat-header">
        <div class="chat-header-title">
          <div class="chat-avatar"><i class="fas fa-robot"></i></div>
          <div class="chat-header-info">
            <h4>XIVIX AI</h4>
            <span>온라인</span>
          </div>
        </div>
        <button class="chat-close" onclick="toggleChat()">
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <div class="chat-messages" id="chatMessages">
        <div class="chat-message bot">
          안녕하세요! XIVIX AI 상담사입니다.<br><br>
          어떤 도움이 필요하신가요?<br>
          마케팅, 웹사이트, AI 시스템 등 무엇이든 물어보세요!
        </div>
      </div>
      
      <div class="chat-input-area">
        <input type="text" class="chat-input" id="chatInput" placeholder="메시지를 입력하세요..." onkeypress="handleChatKeypress(event)">
        <button class="chat-send" onclick="sendChatMessage()">
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>

    <!-- Service Modal -->
    <div class="modal-overlay" id="serviceModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title" id="serviceModalTitle">서비스 상세</h2>
          <button class="modal-close" onclick="closeServiceModal()">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body" id="serviceModalBody">
          <!-- Content loaded dynamically -->
        </div>
      </div>
    </div>

    <!-- Education Modal -->
    <div class="edu-modal" id="eduModal">
      <div class="edu-modal-content">
        <div class="edu-modal-header">
          <button class="edu-modal-close" onclick="closeEduModal()">
            <i class="fas fa-times"></i>
          </button>
          <h3 style="font-size: 1.3rem; font-weight: 700;">AI 입문반 1기 수강 신청</h3>
        </div>
        <div class="edu-modal-body">
          <div class="edu-product">
            <span class="edu-badge">선착순 마감</span>
            <div class="edu-price">₩50,000</div>
            <div class="edu-note">정가 ₩150,000 → 한정 특가</div>
          </div>
          
          <div class="payment-btns">
            <button class="payment-btn active" onclick="selectPayment('card')">
              <i class="fas fa-credit-card" style="font-size: 1.5rem; margin-bottom: 8px;"></i>
              <div style="font-weight: 600;">카드 결제</div>
            </button>
            <button class="payment-btn" onclick="selectPayment('bank')">
              <i class="fas fa-university" style="font-size: 1.5rem; margin-bottom: 8px;"></i>
              <div style="font-weight: 600;">무통장 입금</div>
            </button>
          </div>
          
          <div class="bank-info" id="bankInfo">
            <div class="bank-row"><span>은행</span><strong>케이뱅크</strong></div>
            <div class="bank-row"><span>계좌번호</span><strong>3333-24-8458909</strong></div>
            <div class="bank-row"><span>예금주</span><strong>방익주</strong></div>
            <div class="bank-row"><span>금액</span><strong style="color: var(--accent-primary);">₩50,000</strong></div>
            <div class="bank-form" style="margin-top: 16px;">
              <input type="text" id="bankName" placeholder="입금자명">
              <input type="tel" id="bankPhone" placeholder="연락처">
              <input type="email" id="bankEmail" placeholder="이메일">
            </div>
          </div>
          
          <button class="edu-submit card-btn" id="eduSubmitBtn" onclick="submitEduPayment()">
            <i class="fas fa-credit-card"></i> 카드로 결제하기
          </button>
        </div>
      </div>
    </div>

    <!-- iframe Modal -->
    <div class="iframe-modal" id="iframeModal">
      <div class="iframe-modal-header">
        <span class="iframe-modal-title" id="iframeModalTitle">포트폴리오</span>
        <button class="iframe-modal-close" onclick="closeIframeModal()">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <iframe id="iframeModalContent" src=""></iframe>
    </div>

    <script>
      // ========================================
      // XIVIX ProVisual Main JavaScript
      // ========================================
      
      // 데이터는 API에서 동적으로 로드
      let portfolioData = [];
      let channelServices = [];
      
      // 초기화
      document.addEventListener('DOMContentLoaded', function() {
        loadPortfolio();
        loadServices();
      });
      
      // 포트폴리오 로드
      async function loadPortfolio() {
        try {
          const res = await fetch('/api/portfolios');
          const data = await res.json();
          portfolioData = data.items || [];
          renderPortfolio();
        } catch (e) {
          console.log('Portfolio load error:', e);
        }
      }
      
      // 서비스 로드
      async function loadServices() {
        try {
          const res = await fetch('/api/channel-services');
          channelServices = await res.json();
          renderServices();
        } catch (e) {
          console.log('Services load error:', e);
        }
      }
      
      // 포트폴리오 렌더링
      function renderPortfolio() {
        const grid = document.getElementById('portfolioGrid');
        if (!grid || !portfolioData.length) return;
        
        grid.innerHTML = portfolioData.slice(0, 12).map(item => \`
          <div class="portfolio-card" onclick="openPortfolio('\${item.url}', '\${item.title}')">
            <div class="portfolio-thumb">
              <i class="fas fa-external-link-alt"></i>
            </div>
            <div class="portfolio-info">
              <h4 class="portfolio-title">\${item.title}</h4>
              <span class="portfolio-tag">\${item.tag}</span>
            </div>
          </div>
        \`).join('');
      }
      
      // 서비스 렌더링
      function renderServices() {
        const grid = document.getElementById('serviceGrid');
        if (!grid) return;
        
        const services = [
          { id: 'naver', name: '네이버 마케팅', desc: '블로그, 플레이스, 스마트스토어 통합 관리', icon: 'fa-solid fa-n', iconClass: 'naver' },
          { id: 'insta', name: '인스타그램 마케팅', desc: '피드, 릴스, 스토리 콘텐츠 제작 및 운영', icon: 'fab fa-instagram', iconClass: 'insta' },
          { id: 'youtube', name: '유튜브 마케팅', desc: '영상 기획, 편집, 채널 성장 전략', icon: 'fab fa-youtube', iconClass: 'youtube', badge: 'HOT' },
          { id: 'tiktok', name: '틱톡 마케팅', desc: '숏폼 콘텐츠 기획 및 바이럴 마케팅', icon: 'fab fa-tiktok', iconClass: 'tiktok' },
          { id: 'web', name: '웹사이트 제작', desc: '랜딩페이지, 쇼핑몰, 기업 홈페이지', icon: 'fas fa-globe', iconClass: 'web' },
          { id: 'system', name: 'AI 시스템 구축', desc: '업무 자동화, AI 챗봇, 데이터 분석', icon: 'fas fa-robot', iconClass: 'system', badge: 'NEW' }
        ];
        
        grid.innerHTML = services.map(s => \`
          <div class="service-card" onclick="openServiceDetail('\${s.id}')">
            <div class="service-card-inner">
              <div class="service-card-header">
                <div class="service-icon \${s.iconClass}">
                  <i class="\${s.icon}"></i>
                </div>
                <div class="service-card-info">
                  <h3 class="service-card-title">
                    \${s.name}
                    \${s.badge ? \`<span class="service-card-badge">\${s.badge}</span>\` : ''}
                  </h3>
                  <p class="service-card-desc">\${s.desc}</p>
                </div>
              </div>
            </div>
            <span class="service-card-arrow">
              <i class="fas fa-arrow-right"></i>
            </span>
          </div>
        \`).join('');
      }
      
      // 채팅 토글
      function toggleChat() {
        const chatWindow = document.getElementById('chatWindow');
        chatWindow.classList.toggle('open');
      }
      
      function openChat() {
        const chatWindow = document.getElementById('chatWindow');
        chatWindow.classList.add('open');
      }
      
      // 채팅 메시지 전송
      async function sendChatMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        if (!message) return;
        
        const messagesDiv = document.getElementById('chatMessages');
        
        // 사용자 메시지 추가
        messagesDiv.innerHTML += \`<div class="chat-message user">\${message}</div>\`;
        input.value = '';
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        
        // 로딩 표시
        const loadingId = 'loading_' + Date.now();
        messagesDiv.innerHTML += \`<div class="chat-message bot" id="\${loadingId}">
          <i class="fas fa-spinner fa-spin"></i> 생각 중...
        </div>\`;
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        
        try {
          const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
          });
          const data = await res.json();
          
          document.getElementById(loadingId).innerHTML = data.response || data.reply || '죄송합니다. 다시 시도해주세요.';
        } catch (e) {
          document.getElementById(loadingId).innerHTML = '네트워크 오류가 발생했습니다.';
        }
        
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
      }
      
      function handleChatKeypress(e) {
        if (e.key === 'Enter') sendChatMessage();
      }
      
      // 모바일 메뉴
      function toggleMobileMenu() {
        const nav = document.getElementById('mobileNav');
        const btn = document.querySelector('.mobile-menu-btn i');
        nav.classList.toggle('open');
        btn.className = nav.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
      }
      
      function closeMobileMenu() {
        document.getElementById('mobileNav').classList.remove('open');
        document.querySelector('.mobile-menu-btn i').className = 'fas fa-bars';
      }
      
      // 포트폴리오 열기
      function openPortfolio(url, title) {
        if (url.includes('youtube.com/embed')) {
          // 유튜브 영상
          document.getElementById('iframeModalTitle').textContent = title;
          document.getElementById('iframeModalContent').src = url;
          document.getElementById('iframeModal').classList.add('open');
        } else {
          // 외부 링크
          window.open(url, '_blank');
        }
      }
      
      function closeIframeModal() {
        document.getElementById('iframeModal').classList.remove('open');
        document.getElementById('iframeModalContent').src = '';
      }
      
      // 서비스 상세
      function openServiceDetail(id) {
        // API에서 서비스 상세 정보 로드
        const modal = document.getElementById('serviceModal');
        const title = document.getElementById('serviceModalTitle');
        const body = document.getElementById('serviceModalBody');
        
        const names = {
          naver: '네이버 마케팅',
          insta: '인스타그램 마케팅',
          youtube: '유튜브 마케팅',
          tiktok: '틱톡 마케팅',
          web: '웹사이트 제작',
          system: 'AI 시스템 구축'
        };
        
        title.innerHTML = \`<i class="fas fa-rocket"></i> \${names[id] || '서비스 상세'}\`;
        body.innerHTML = '<p style="text-align: center; padding: 40px; color: var(--text-secondary);">상세 정보를 불러오는 중...</p>';
        modal.classList.add('open');
        
        // 채널 서비스 데이터로 렌더링
        const service = channelServices.find(s => s.category === id);
        if (service) {
          body.innerHTML = \`
            <div style="padding: 20px 0;">
              <h3 style="font-size: 1.3rem; margin-bottom: 16px;">\${service.name}</h3>
              \${service.services ? service.services.map(s => \`
                <div style="background: var(--bg-tertiary); padding: 16px; border-radius: 12px; margin-bottom: 12px; border: 1px solid var(--border-subtle);">
                  <div style="font-weight: 600; margin-bottom: 8px;">\${s.name}</div>
                  <div style="display: flex; justify-content: space-between; color: var(--text-secondary); font-size: 0.9rem;">
                    <span>세팅비: \${(s.setup_fee || 0).toLocaleString()}원</span>
                    <span>월비용: \${(s.monthly_fee || 0).toLocaleString()}원</span>
                  </div>
                </div>
              \`).join('') : ''}
            </div>
            <button class="btn btn-primary btn-large" style="width: 100%;" onclick="openChat(); closeServiceModal();">
              <i class="fas fa-comment-dots"></i> 상담하기
            </button>
          \`;
        }
      }
      
      function closeServiceModal() {
        document.getElementById('serviceModal').classList.remove('open');
      }
      
      // 교육 모달
      function openEduModal() {
        document.getElementById('eduModal').classList.add('open');
      }
      
      function closeEduModal() {
        document.getElementById('eduModal').classList.remove('open');
      }
      
      let selectedPayment = 'card';
      
      function selectPayment(type) {
        selectedPayment = type;
        const btns = document.querySelectorAll('.payment-btn');
        btns.forEach(b => b.classList.remove('active'));
        event.target.closest('.payment-btn').classList.add('active');
        
        const bankInfo = document.getElementById('bankInfo');
        const submitBtn = document.getElementById('eduSubmitBtn');
        
        if (type === 'bank') {
          bankInfo.classList.add('show');
          submitBtn.className = 'edu-submit bank-btn';
          submitBtn.innerHTML = '<i class="fas fa-university"></i> 무통장 입금 신청';
        } else {
          bankInfo.classList.remove('show');
          submitBtn.className = 'edu-submit card-btn';
          submitBtn.innerHTML = '<i class="fas fa-credit-card"></i> 카드로 결제하기';
        }
      }
      
      async function submitEduPayment() {
        if (selectedPayment === 'bank') {
          const name = document.getElementById('bankName').value.trim();
          const phone = document.getElementById('bankPhone').value.trim();
          const email = document.getElementById('bankEmail').value.trim();
          
          if (!name || !phone || !email) {
            alert('모든 정보를 입력해주세요.');
            return;
          }
          
          try {
            await fetch('/api/edu-bank-transfer', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name, phone, email, amount: 50000 })
            });
            alert('신청이 완료되었습니다! 입금 확인 후 안내 문자를 보내드립니다.');
            closeEduModal();
          } catch (e) {
            alert('오류가 발생했습니다. 다시 시도해주세요.');
          }
        } else {
          // PortOne 결제
          if (typeof PortOne === 'undefined') {
            alert('결제 시스템을 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
            return;
          }
          
          const orderId = 'EDU_' + Date.now();
          try {
            const res = await PortOne.requestPayment({
              storeId: 'store-xivix',
              channelKey: 'channel-key-xivix',
              paymentId: orderId,
              orderName: 'AI 입문반 1기 수강료',
              totalAmount: 50000,
              currency: 'KRW',
              payMethod: 'CARD'
            });
            
            if (res.code) {
              alert('결제가 취소되었습니다.');
            } else {
              alert('결제가 완료되었습니다! 수강 안내 문자를 보내드리겠습니다.');
              closeEduModal();
            }
          } catch (e) {
            alert('결제 중 오류가 발생했습니다.');
          }
        }
      }
      
      // 스크롤 시 헤더 스타일 변경
      window.addEventListener('scroll', function() {
        const header = document.querySelector('.site-header');
        if (window.scrollY > 50) {
          header.style.borderBottomColor = 'rgba(255,255,255,0.1)';
        } else {
          header.style.borderBottomColor = 'var(--border-subtle)';
        }
      });
      
      // ESC 키로 모달 닫기
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          closeServiceModal();
          closeEduModal();
          closeIframeModal();
          document.getElementById('chatWindow').classList.remove('open');
        }
      });
    </script>
</body>
</html>`;
}
