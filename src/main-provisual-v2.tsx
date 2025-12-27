// ProVisual Style V2 - Deep Purple + Dark Blue Gradient
// 1. 3D 영상 추가
// 2. 섹션 순서: 포트폴리오 → 20년 현장 → AI마케팅솔루션
// 3. AI 입문반 상단 카드 (6주 200만원)
// 4. ProVisual 색감 적용

export function getMainHTML_ProVisualV2(): string {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>X I Λ I X | 사장님은 장사만 하세요, 마케팅은 AI가 다 해드립니다</title>
    <meta name="description" content="직원 뽑지 마세요. 블로그, 인스타, 영상 편집... XIVIX AI 시스템이 월급 없이 24시간 일합니다. 시간 -90%, 비용 -70%, 매출 +250%">
    
    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://xivix.kr">
    <meta property="og:title" content="X I Λ I X | 사장님은 장사만 하세요">
    <meta property="og:description" content="직원 뽑지 마세요. 블로그, 인스타, 영상 편집 - XIVIX AI 시스템이 월급 없이 24시간 일합니다.">
    <meta property="og:image" content="https://xivix.kr/og-image.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:locale" content="ko_KR">
    <meta property="og:site_name" content="X I Λ I X">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="X I Λ I X | 사장님은 장사만 하세요">
    <meta name="twitter:description" content="직원 뽑지 마세요. XIVIX AI 시스템이 마케팅을 대신합니다.">
    <meta name="twitter:image" content="https://xivix.kr/og-image.png">
    
    <!-- SEO -->
    <meta name="keywords" content="마케팅, AI마케팅, SNS마케팅, 블로그마케팅, 유튜브마케팅, 광고대행">
    <meta name="author" content="X I Λ I X">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://xivix.kr">
    
    <!-- Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "MarketingAgency",
      "name": "X I Λ I X",
      "url": "https://xivix.kr",
      "description": "AI 기반 통합 마케팅 솔루션",
      "priceRange": "₩550,000 - ₩9,900,000",
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "127" }
    }
    </script>
    
    <!-- Fonts & Icons -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.portone.io/v2/browser-sdk.js"></script>
    <script src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>
    
    <style>
      /* ========================================
         ProVisual Style V2 - Deep Purple Theme
         딥 퍼플 + 다크블루 그라디언트, 네온 액센트
         ======================================== */
      :root {
        /* ProVisual 배경 - 딥 퍼플 + 다크블루 */
        --bg-primary: #0d0118;
        --bg-secondary: #130820;
        --bg-tertiary: #1a0a2e;
        --bg-card: rgba(26, 10, 46, 0.8);
        --bg-hover: #1f0d35;
        
        /* 네온 액센트 색상 */
        --neon-purple: #a855f7;
        --neon-pink: #ec4899;
        --neon-cyan: #22d3ee;
        --neon-green: #10b981;
        --neon-lime: #84cc16;
        --neon-orange: #f97316;
        
        /* 그라디언트 */
        --gradient-bg: linear-gradient(135deg, #0d0118 0%, #1a0a2e 50%, #0a1628 100%);
        --gradient-hero: linear-gradient(180deg, #0d0118 0%, #1a0a2e 30%, #0f1a30 70%, #0d0118 100%);
        --gradient-purple: linear-gradient(135deg, #a855f7, #ec4899);
        --gradient-cyan: linear-gradient(135deg, #22d3ee, #10b981);
        --gradient-card: linear-gradient(180deg, rgba(168, 85, 247, 0.08) 0%, transparent 100%);
        
        /* 텍스트 */
        --text-primary: #ffffff;
        --text-secondary: #b4a5c7;
        --text-tertiary: #7c6a94;
        
        /* 보더 */
        --border-subtle: rgba(168, 85, 247, 0.15);
        --border-default: rgba(168, 85, 247, 0.25);
        --border-hover: rgba(168, 85, 247, 0.4);
        --border-glow: rgba(168, 85, 247, 0.6);
        
        /* 그림자 */
        --shadow-purple: 0 0 40px rgba(168, 85, 247, 0.2);
        --shadow-lg: 0 20px 60px rgba(0, 0, 0, 0.5);
        --glow-purple: 0 0 60px rgba(168, 85, 247, 0.3);
        
        /* 간격 */
        --space-xs: 8px;
        --space-sm: 16px;
        --space-md: 24px;
        --space-lg: 40px;
        --space-xl: 64px;
        --space-2xl: 100px;
        --space-3xl: 140px;
        
        /* 컨테이너 */
        --container-lg: 1200px;
        --container-xl: 1400px;
        
        /* 라운드 */
        --radius-sm: 8px;
        --radius-md: 12px;
        --radius-lg: 16px;
        --radius-xl: 24px;
        --radius-full: 9999px;
      }
      
      /* Base */
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body {
        font-family: 'Pretendard Variable', -apple-system, sans-serif;
        background: var(--gradient-bg);
        color: var(--text-primary);
        line-height: 1.7;
        overflow-x: hidden;
        -webkit-font-smoothing: antialiased;
      }
      body { -webkit-user-select: none; user-select: none; }
      input, textarea, select { -webkit-user-select: text; user-select: text; }
      
      .container {
        max-width: var(--container-lg);
        margin: 0 auto;
        padding: 0 var(--space-lg);
      }
      
      /* ========================================
         AI 입문반 상단 플로팅 배너
         ======================================== */
      .edu-top-banner {
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 999;
        background: linear-gradient(135deg, rgba(168, 85, 247, 0.95), rgba(236, 72, 153, 0.95));
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: var(--radius-xl);
        padding: var(--space-sm) var(--space-lg);
        display: flex;
        align-items: center;
        gap: var(--space-md);
        box-shadow: var(--shadow-lg), var(--glow-purple);
        animation: slideDown 0.5s ease, pulse 3s ease-in-out infinite;
      }
      
      @keyframes slideDown {
        from { transform: translateX(-50%) translateY(-100px); opacity: 0; }
        to { transform: translateX(-50%) translateY(0); opacity: 1; }
      }
      
      @keyframes pulse {
        0%, 100% { box-shadow: var(--shadow-lg), 0 0 30px rgba(168, 85, 247, 0.4); }
        50% { box-shadow: var(--shadow-lg), 0 0 50px rgba(168, 85, 247, 0.6); }
      }
      
      .edu-top-banner.hidden { display: none; }
      
      .edu-banner-content {
        display: flex;
        align-items: center;
        gap: var(--space-md);
      }
      
      .edu-banner-badge {
        background: rgba(0,0,0,0.3);
        padding: 4px 12px;
        border-radius: var(--radius-full);
        font-size: 0.75rem;
        font-weight: 700;
        color: #fff;
        white-space: nowrap;
      }
      
      .edu-banner-text {
        font-weight: 600;
        font-size: 0.95rem;
        color: #fff;
      }
      
      .edu-banner-price {
        font-weight: 800;
        font-size: 1.1rem;
        color: #fff;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .edu-banner-price .original {
        text-decoration: line-through;
        opacity: 0.6;
        font-size: 0.85rem;
      }
      
      .edu-banner-btn {
        background: #fff;
        color: #a855f7;
        border: none;
        padding: 10px 20px;
        border-radius: var(--radius-full);
        font-weight: 700;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.3s;
        white-space: nowrap;
      }
      
      .edu-banner-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      }
      
      .edu-banner-close {
        background: rgba(0,0,0,0.2);
        border: none;
        color: #fff;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      @media (max-width: 768px) {
        .edu-top-banner {
          top: 70px;
          left: 10px;
          right: 10px;
          transform: none;
          flex-direction: column;
          padding: var(--space-sm);
          gap: var(--space-sm);
        }
        .edu-banner-content { flex-wrap: wrap; justify-content: center; }
      }
      
      /* ========================================
         Header
         ======================================== */
      .site-header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        background: rgba(13, 1, 24, 0.9);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid var(--border-subtle);
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
        color: #fff;
        text-decoration: none;
      }
      
      .logo-accent { color: var(--neon-purple); }
      
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
        transition: all 0.2s;
      }
      
      .nav-link:hover {
        color: #fff;
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
        transition: all 0.3s;
      }
      
      .btn-ghost {
        background: transparent;
        color: var(--text-secondary);
        border: 1px solid var(--border-default);
      }
      
      .btn-ghost:hover {
        color: #fff;
        border-color: var(--neon-purple);
        background: rgba(168, 85, 247, 0.1);
      }
      
      .btn-primary {
        background: var(--gradient-purple);
        color: #fff;
        box-shadow: var(--shadow-purple);
      }
      
      .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: var(--glow-purple);
      }
      
      .btn-large {
        padding: var(--space-md) var(--space-xl);
        font-size: 1.1rem;
        border-radius: var(--radius-xl);
      }
      
      .mobile-menu-btn {
        display: none;
        width: 44px;
        height: 44px;
        background: var(--bg-hover);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-md);
        color: #fff;
        font-size: 1.25rem;
        cursor: pointer;
      }
      
      @media (max-width: 900px) {
        .header-nav { display: none; }
        .header-cta .btn-ghost { display: none; }
        .mobile-menu-btn { display: flex; align-items: center; justify-content: center; }
      }
      
      /* ========================================
         Hero Section - 3D 영상 포함
         ======================================== */
      .hero {
        min-height: 100vh;
        display: flex;
        align-items: center;
        padding: 160px 0 var(--space-2xl);
        position: relative;
        overflow: hidden;
        background: var(--gradient-hero);
      }
      
      .hero-bg {
        position: absolute;
        inset: 0;
        pointer-events: none;
      }
      
      /* 애니메이션 그라디언트 오브 */
      .hero-orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(80px);
        opacity: 0.5;
        animation: orbFloat 20s ease-in-out infinite;
      }
      
      .orb-1 {
        width: 500px;
        height: 500px;
        background: radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%);
        top: 10%;
        left: 5%;
        animation-delay: 0s;
      }
      
      .orb-2 {
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%);
        top: 40%;
        right: 5%;
        animation-delay: -7s;
      }
      
      .orb-3 {
        width: 350px;
        height: 350px;
        background: radial-gradient(circle, rgba(34, 211, 238, 0.25) 0%, transparent 70%);
        bottom: 10%;
        left: 30%;
        animation-delay: -14s;
      }
      
      @keyframes orbFloat {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(40px, -40px) scale(1.1); }
        66% { transform: translate(-30px, 30px) scale(0.95); }
      }
      
      .hero-content {
        position: relative;
        z-index: 1;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-2xl);
        align-items: center;
        max-width: var(--container-xl);
        margin: 0 auto;
        padding: 0 var(--space-lg);
      }
      
      .hero-text {
        max-width: 600px;
      }
      
      .hero-badge {
        display: inline-flex;
        align-items: center;
        gap: var(--space-xs);
        padding: var(--space-xs) var(--space-md);
        background: rgba(168, 85, 247, 0.15);
        border: 1px solid var(--border-default);
        border-radius: var(--radius-full);
        font-size: 0.85rem;
        font-weight: 500;
        color: var(--neon-purple);
        margin-bottom: var(--space-lg);
      }
      
      .hero-badge-dot {
        width: 8px;
        height: 8px;
        background: var(--neon-green);
        border-radius: 50%;
        animation: blink 2s ease-in-out infinite;
      }
      
      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
      }
      
      .hero-title {
        font-size: clamp(2.5rem, 5vw, 3.5rem);
        font-weight: 800;
        line-height: 1.15;
        letter-spacing: -0.02em;
        margin-bottom: var(--space-md);
      }
      
      .hero-title-accent {
        background: var(--gradient-purple);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .hero-desc {
        font-size: 1.2rem;
        color: var(--text-secondary);
        line-height: 1.8;
        margin-bottom: var(--space-xl);
      }
      
      .hero-actions {
        display: flex;
        gap: var(--space-md);
        flex-wrap: wrap;
      }
      
      /* 3D 영상 영역 */
      .hero-video {
        position: relative;
        border-radius: var(--radius-xl);
        overflow: hidden;
        box-shadow: var(--shadow-lg), var(--glow-purple);
        border: 1px solid var(--border-default);
        aspect-ratio: 16/10;
        background: var(--bg-card);
      }
      
      .hero-video video,
      .hero-video iframe {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border: none;
      }
      
      .hero-video-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, transparent 60%, rgba(13, 1, 24, 0.8) 100%);
        pointer-events: none;
      }
      
      .hero-stats {
        display: flex;
        gap: var(--space-xl);
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
        line-height: 1;
        margin-bottom: var(--space-xs);
      }
      
      .hero-stat-value span { color: var(--neon-purple); }
      
      .hero-stat-label {
        font-size: 0.9rem;
        color: var(--text-tertiary);
      }
      
      @media (max-width: 1024px) {
        .hero-content { grid-template-columns: 1fr; text-align: center; }
        .hero-text { max-width: none; }
        .hero-actions { justify-content: center; }
        .hero-video { max-width: 600px; margin: 0 auto; }
        .hero-stats { justify-content: center; }
      }
      
      @media (max-width: 768px) {
        .hero { padding: 140px 0 var(--space-xl); min-height: auto; }
        .hero-stats { flex-direction: column; gap: var(--space-lg); }
        .hero-actions { flex-direction: column; align-items: center; }
        .hero-actions .btn { width: 100%; max-width: 300px; }
      }
      
      /* ========================================
         Section Layout
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
        background: rgba(168, 85, 247, 0.1);
        border: 1px solid var(--border-default);
        border-radius: var(--radius-full);
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--neon-purple);
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
         Portfolio Grid - 섹션 1
         ======================================== */
      .portfolio-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: var(--space-md);
      }
      
      .portfolio-card {
        background: var(--bg-card);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-xl);
        overflow: hidden;
        cursor: pointer;
        transition: all 0.3s;
      }
      
      .portfolio-card:hover {
        border-color: var(--neon-purple);
        transform: translateY(-8px);
        box-shadow: var(--shadow-lg), var(--shadow-purple);
      }
      
      .portfolio-thumb {
        aspect-ratio: 16/10;
        background: linear-gradient(135deg, var(--bg-tertiary), var(--bg-secondary));
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2.5rem;
        color: var(--text-tertiary);
        position: relative;
        overflow: hidden;
      }
      
      .portfolio-thumb::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1));
        opacity: 0;
        transition: opacity 0.3s;
      }
      
      .portfolio-card:hover .portfolio-thumb::before { opacity: 1; }
      
      .portfolio-info {
        padding: var(--space-md);
      }
      
      .portfolio-title {
        font-size: 1.05rem;
        font-weight: 600;
        margin-bottom: var(--space-xs);
      }
      
      .portfolio-tag {
        font-size: 0.85rem;
        color: var(--neon-purple);
      }
      
      /* 영상 포트폴리오 */
      .portfolio-video-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: var(--space-md);
        margin-top: var(--space-xl);
      }
      
      .portfolio-video-card {
        background: var(--bg-card);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-xl);
        overflow: hidden;
        transition: all 0.3s;
      }
      
      .portfolio-video-card:hover {
        border-color: var(--neon-purple);
        box-shadow: var(--shadow-purple);
      }
      
      .portfolio-video-card iframe {
        width: 100%;
        aspect-ratio: 16/9;
        border: none;
      }
      
      /* ========================================
         Business Blocks - 섹션 2 (20년 현장 데이터)
         ======================================== */
      .blocks-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--space-md);
      }
      
      .block-card {
        background: var(--bg-card);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-xl);
        padding: var(--space-xl);
        position: relative;
        transition: all 0.3s;
        overflow: hidden;
      }
      
      .block-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: var(--gradient-purple);
        opacity: 0;
        transition: opacity 0.3s;
      }
      
      .block-card:hover {
        border-color: var(--border-hover);
        box-shadow: var(--shadow-purple);
      }
      
      .block-card:hover::before { opacity: 1; }
      
      .block-number {
        position: absolute;
        top: var(--space-md);
        right: var(--space-md);
        font-size: 4rem;
        font-weight: 900;
        color: rgba(168, 85, 247, 0.1);
        line-height: 1;
      }
      
      .block-icon {
        width: 56px;
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.1));
        border: 1px solid var(--border-default);
        border-radius: var(--radius-lg);
        font-size: 1.5rem;
        color: var(--neon-purple);
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
        gap: var(--space-sm);
        margin-bottom: var(--space-md);
      }
      
      .block-stat {
        flex: 1;
        text-align: center;
        padding: var(--space-sm);
        background: rgba(168, 85, 247, 0.08);
        border-radius: var(--radius-md);
      }
      
      .block-stat-value {
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--neon-purple);
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
        background: rgba(168, 85, 247, 0.1);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-full);
        font-size: 0.75rem;
        color: var(--text-secondary);
      }
      
      @media (max-width: 900px) {
        .blocks-grid { grid-template-columns: 1fr; }
      }
      
      /* ========================================
         Service Grid - 섹션 3 (AI 마케팅 솔루션)
         ======================================== */
      .service-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--space-md);
      }
      
      .service-card {
        background: var(--bg-card);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-xl);
        padding: var(--space-lg);
        cursor: pointer;
        transition: all 0.3s;
        position: relative;
        overflow: hidden;
      }
      
      .service-card::after {
        content: '';
        position: absolute;
        inset: 0;
        background: var(--gradient-card);
        opacity: 0;
        transition: opacity 0.3s;
      }
      
      .service-card:hover {
        border-color: var(--neon-purple);
        transform: translateY(-4px);
        box-shadow: var(--shadow-lg), var(--shadow-purple);
      }
      
      .service-card:hover::after { opacity: 1; }
      
      .service-card-inner {
        position: relative;
        z-index: 1;
      }
      
      .service-card-header {
        display: flex;
        align-items: flex-start;
        gap: var(--space-md);
        margin-bottom: var(--space-sm);
      }
      
      .service-icon {
        width: 56px;
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(236, 72, 153, 0.1));
        border: 1px solid var(--border-default);
        border-radius: var(--radius-lg);
        font-size: 1.5rem;
        flex-shrink: 0;
      }
      
      .service-icon.naver { color: #03C75A; }
      .service-icon.insta { color: #E4405F; }
      .service-icon.youtube { color: #FF0000; }
      .service-icon.tiktok { color: #00f2ea; }
      .service-icon.web { color: var(--neon-purple); }
      .service-icon.system { color: var(--neon-cyan); }
      
      .service-card-info { flex: 1; }
      
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
        background: var(--gradient-purple);
        border-radius: var(--radius-full);
        font-size: 0.7rem;
        font-weight: 700;
        color: #fff;
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
        transition: all 0.3s;
        z-index: 2;
      }
      
      .service-card:hover .service-card-arrow {
        background: var(--neon-purple);
        color: #fff;
      }
      
      @media (max-width: 768px) {
        .service-grid { grid-template-columns: 1fr; }
      }
      
      /* ========================================
         Pricing Cards
         ======================================== */
      .pricing-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--space-md);
      }
      
      .pricing-card {
        background: var(--bg-card);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-xl);
        padding: var(--space-xl);
        transition: all 0.3s;
        position: relative;
      }
      
      .pricing-card.featured {
        border-color: var(--neon-purple);
        background: linear-gradient(180deg, rgba(168, 85, 247, 0.1) 0%, var(--bg-card) 100%);
      }
      
      .pricing-card:hover {
        transform: translateY(-8px);
        box-shadow: var(--shadow-lg), var(--shadow-purple);
      }
      
      .pricing-badge {
        position: absolute;
        top: -12px;
        left: 50%;
        transform: translateX(-50%);
        padding: 6px 16px;
        background: var(--gradient-purple);
        border-radius: var(--radius-full);
        font-size: 0.75rem;
        font-weight: 700;
        color: #fff;
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
        color: var(--neon-purple);
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
      
      .pricing-feature i { color: var(--neon-green); font-size: 0.9rem; }
      
      @media (max-width: 900px) {
        .pricing-grid { grid-template-columns: 1fr; max-width: 400px; margin: 0 auto; }
      }
      
      /* ========================================
         Chatbot
         ======================================== */
      .chat-bubble {
        position: fixed;
        bottom: var(--space-md);
        right: var(--space-md);
        width: 64px;
        height: 64px;
        background: var(--gradient-purple);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 999;
        box-shadow: var(--shadow-lg), var(--glow-purple);
        transition: all 0.3s;
        animation: chatPulse 2s ease-in-out infinite;
      }
      
      @keyframes chatPulse {
        0%, 100% { box-shadow: var(--shadow-lg), 0 0 20px rgba(168, 85, 247, 0.4); }
        50% { box-shadow: var(--shadow-lg), 0 0 40px rgba(168, 85, 247, 0.7); }
      }
      
      .chat-bubble:hover { transform: scale(1.1); }
      .chat-bubble i { font-size: 1.5rem; color: #fff; }
      
      .chat-window {
        position: fixed;
        bottom: 100px;
        right: var(--space-md);
        width: 400px;
        max-width: calc(100vw - 32px);
        height: 550px;
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
      
      .chat-window.open { display: flex; }
      
      .chat-header {
        padding: var(--space-md);
        background: linear-gradient(135deg, var(--bg-tertiary), var(--bg-secondary));
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
        background: var(--gradient-purple);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.1rem;
        color: #fff;
      }
      
      .chat-header-info h4 { font-size: 1rem; font-weight: 600; }
      .chat-header-info span { font-size: 0.8rem; color: var(--neon-green); }
      
      .chat-close {
        width: 36px;
        height: 36px;
        background: var(--bg-hover);
        border: none;
        border-radius: var(--radius-md);
        color: var(--text-secondary);
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.2s;
      }
      
      .chat-close:hover { background: rgba(244, 63, 94, 0.2); color: #f43f5e; }
      
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
        border: 1px solid var(--border-subtle);
        align-self: flex-start;
        border-bottom-left-radius: 4px;
      }
      
      .chat-message.user {
        background: var(--gradient-purple);
        color: #fff;
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
        color: #fff;
        font-size: 0.95rem;
        outline: none;
        transition: all 0.2s;
      }
      
      .chat-input:focus { border-color: var(--neon-purple); }
      
      .chat-send {
        width: 44px;
        height: 44px;
        background: var(--gradient-purple);
        border: none;
        border-radius: var(--radius-lg);
        color: #fff;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.2s;
      }
      
      .chat-send:hover { transform: scale(1.05); }
      
      /* ========================================
         Footer
         ======================================== */
      .site-footer {
        padding: var(--space-2xl) 0 var(--space-xl);
        background: var(--bg-primary);
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
      }
      
      .footer-links a {
        display: block;
        color: var(--text-tertiary);
        text-decoration: none;
        font-size: 0.9rem;
        padding: var(--space-xs) 0;
        transition: all 0.2s;
      }
      
      .footer-links a:hover { color: var(--neon-purple); }
      
      .footer-bottom {
        margin-top: var(--space-xl);
        padding-top: var(--space-lg);
        border-top: 1px solid var(--border-subtle);
        text-align: center;
      }
      
      .footer-copyright {
        font-size: 0.85rem;
        color: var(--text-tertiary);
      }
      
      @media (max-width: 768px) {
        .footer-content { grid-template-columns: 1fr; gap: var(--space-lg); text-align: center; }
      }
      
      /* ========================================
         Modals
         ======================================== */
      .modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(13, 1, 24, 0.9);
        backdrop-filter: blur(8px);
        z-index: 1100;
        display: none;
        overflow-y: auto;
      }
      
      .modal-overlay.open { display: block; }
      
      .modal-content {
        max-width: 900px;
        margin: var(--space-xl) auto;
        padding: var(--space-md);
      }
      
      .modal-header {
        position: sticky;
        top: 0;
        background: rgba(13, 1, 24, 0.95);
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
        color: #fff;
        font-size: 1.25rem;
        cursor: pointer;
        transition: all 0.2s;
      }
      
      .modal-close:hover {
        background: rgba(244, 63, 94, 0.2);
        border-color: #f43f5e;
        color: #f43f5e;
      }
      
      /* Education Modal */
      .edu-modal {
        position: fixed;
        inset: 0;
        background: rgba(13, 1, 24, 0.95);
        z-index: 1200;
        display: none;
        align-items: center;
        justify-content: center;
        padding: var(--space-md);
      }
      
      .edu-modal.open { display: flex; }
      
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
        background: linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.1));
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
      
      .edu-modal-body { padding: var(--space-lg); }
      
      .edu-product {
        background: linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(236, 72, 153, 0.1));
        border: 1px solid var(--border-default);
        border-radius: var(--radius-lg);
        padding: var(--space-lg);
        margin-bottom: var(--space-md);
        text-align: center;
      }
      
      .edu-badge {
        display: inline-block;
        background: linear-gradient(135deg, #ef4444, #f97316);
        color: #fff;
        padding: 6px 14px;
        border-radius: var(--radius-full);
        font-size: 0.8rem;
        font-weight: 700;
        margin-bottom: var(--space-sm);
      }
      
      .edu-price {
        font-size: 2.5rem;
        font-weight: 800;
        color: var(--neon-purple);
      }
      
      .edu-original-price {
        font-size: 1.1rem;
        color: var(--text-tertiary);
        text-decoration: line-through;
        margin-bottom: var(--space-xs);
      }
      
      .edu-course-info {
        font-size: 0.95rem;
        color: var(--text-secondary);
        margin-top: var(--space-sm);
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
        color: #fff;
        transition: all 0.2s;
      }
      
      .payment-btn:hover, .payment-btn.active {
        border-color: var(--neon-purple);
        background: rgba(168, 85, 247, 0.1);
      }
      
      .bank-info {
        display: none;
        background: rgba(16, 185, 129, 0.1);
        border: 1px solid rgba(16, 185, 129, 0.3);
        border-radius: var(--radius-lg);
        padding: var(--space-md);
        margin: var(--space-md) 0;
      }
      
      .bank-info.show { display: block; }
      
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
        color: #fff;
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
        color: #fff;
        transition: all 0.3s;
      }
      
      .edu-submit.card-btn { background: var(--gradient-purple); }
      .edu-submit.bank-btn { background: linear-gradient(135deg, #10b981, #059669); }
      .edu-submit:hover { transform: translateY(-2px); box-shadow: var(--shadow-purple); }
      
      /* iframe Modal */
      .iframe-modal {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.95);
        z-index: 1300;
        display: none;
        flex-direction: column;
      }
      
      .iframe-modal.open { display: flex; }
      
      .iframe-modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--space-sm) var(--space-md);
        background: var(--gradient-purple);
      }
      
      .iframe-modal-title { color: #fff; font-weight: 700; font-size: 1rem; }
      
      .iframe-modal-close {
        width: 40px;
        height: 40px;
        background: rgba(0, 0, 0, 0.3);
        border: none;
        border-radius: 50%;
        color: #fff;
        font-size: 1.1rem;
        cursor: pointer;
      }
      
      .iframe-modal iframe {
        flex: 1;
        border: none;
        width: 100%;
        background: #fff;
      }
      
      /* Mobile Nav */
      .mobile-nav {
        position: fixed;
        inset: 0;
        background: var(--bg-primary);
        z-index: 1050;
        display: none;
        flex-direction: column;
        padding: 100px var(--space-lg) var(--space-lg);
      }
      
      .mobile-nav.open { display: flex; }
      
      .mobile-nav-link {
        display: block;
        padding: var(--space-md);
        color: #fff;
        text-decoration: none;
        font-size: 1.25rem;
        font-weight: 600;
        border-bottom: 1px solid var(--border-subtle);
        transition: all 0.2s;
      }
      
      .mobile-nav-link:hover { color: var(--neon-purple); }
      
      /* Scrollbar */
      ::-webkit-scrollbar { width: 6px; height: 6px; }
      ::-webkit-scrollbar-track { background: var(--bg-secondary); }
      ::-webkit-scrollbar-thumb { background: var(--bg-tertiary); border-radius: 3px; }
      ::-webkit-scrollbar-thumb:hover { background: var(--neon-purple); }
      
      /* Utilities */
      .hidden { display: none !important; }
    </style>
</head>
<body>
    <!-- AI 입문반 상단 플로팅 배너 -->
    <div class="edu-top-banner" id="eduTopBanner">
      <div class="edu-banner-content">
        <span class="edu-banner-badge">선착순 마감</span>
        <span class="edu-banner-text">AI 입문반 1기</span>
        <span class="edu-banner-price">
          <span class="original">₩300만</span>
          ₩200만 / 6주
        </span>
      </div>
      <button class="edu-banner-btn" onclick="openEduModal()">
        <i class="fas fa-bolt"></i> 신청하기
      </button>
      <button class="edu-banner-close" onclick="closeEduBanner()">
        <i class="fas fa-times"></i>
      </button>
    </div>

    <!-- Header -->
    <header class="site-header">
      <div class="header-inner">
        <a href="/" class="logo">
          X I <span class="logo-accent">Λ</span> I X
        </a>
        
        <nav class="header-nav">
          <a href="#portfolio" class="nav-link">포트폴리오</a>
          <a href="#business" class="nav-link">20년 현장 데이터</a>
          <a href="#services" class="nav-link">AI 마케팅 솔루션</a>
          <a href="#pricing" class="nav-link">가격</a>
        </nav>
        
        <div class="header-cta">
          <a href="/login" class="btn btn-ghost">
            <i class="fas fa-user"></i> 로그인
          </a>
          <button class="btn btn-primary" onclick="openChat()">
            <i class="fas fa-comment-dots"></i> 무료 상담
          </button>
          <button class="mobile-menu-btn" onclick="toggleMobileMenu()">
            <i class="fas fa-bars"></i>
          </button>
        </div>
      </div>
    </header>
    
    <!-- Mobile Nav -->
    <nav class="mobile-nav" id="mobileNav">
      <a href="#portfolio" class="mobile-nav-link" onclick="closeMobileMenu()">포트폴리오</a>
      <a href="#business" class="mobile-nav-link" onclick="closeMobileMenu()">20년 현장 데이터</a>
      <a href="#services" class="mobile-nav-link" onclick="closeMobileMenu()">AI 마케팅 솔루션</a>
      <a href="#pricing" class="mobile-nav-link" onclick="closeMobileMenu()">가격</a>
      <a href="/login" class="mobile-nav-link" onclick="closeMobileMenu()">로그인</a>
    </nav>

    <!-- Hero Section with 3D Video -->
    <section class="hero">
      <div class="hero-bg">
        <div class="hero-orb orb-1"></div>
        <div class="hero-orb orb-2"></div>
        <div class="hero-orb orb-3"></div>
      </div>
      
      <div class="hero-content">
        <div class="hero-text">
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
              <i class="fas fa-magic"></i> 무료 진단 받기
            </button>
            <a href="#portfolio" class="btn btn-ghost btn-large">
              <i class="fas fa-play"></i> 포트폴리오 보기
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
        
        <!-- 3D 영상 영역 -->
        <div class="hero-video">
          <iframe 
            src="https://www.youtube.com/embed/uGdcbTFJr-8?autoplay=1&mute=1&loop=1&playlist=uGdcbTFJr-8&controls=0&showinfo=0" 
            allow="autoplay; encrypted-media" 
            allowfullscreen>
          </iframe>
          <div class="hero-video-overlay"></div>
        </div>
      </div>
    </section>

    <!-- Section 1: Portfolio (포트폴리오) -->
    <section class="section" id="portfolio">
      <div class="container">
        <div class="section-header">
          <span class="section-eyebrow">
            <i class="fas fa-images"></i> Portfolio
          </span>
          <h2 class="section-title">포트폴리오</h2>
          <p class="section-desc">
            다양한 분야의 성공적인 프로젝트를 확인하세요.
          </p>
        </div>
        
        <!-- 웹사이트 포트폴리오 -->
        <div class="portfolio-grid" id="portfolioGrid">
          <!-- Dynamic content -->
        </div>
        
        <!-- 영상 포트폴리오 -->
        <div style="margin-top: var(--space-2xl);">
          <h3 style="text-align: center; font-size: 1.5rem; margin-bottom: var(--space-lg);">
            <i class="fas fa-video" style="color: var(--neon-purple);"></i> 영상 포트폴리오
          </h3>
          <div class="portfolio-video-grid" id="videoPortfolioGrid">
            <!-- Dynamic video content -->
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: 20년 현장 데이터 기반 -->
    <section class="section section-alt" id="business">
      <div class="container">
        <div class="section-header">
          <span class="section-eyebrow">
            <i class="fas fa-building"></i> Business
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
            <p class="block-desc">전국 대리점 네트워크와 홈쇼핑 계약을 통해 검증된 유통망을 구축합니다.</p>
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
            <p class="block-desc">아모스프로페셔널, RBH, 시세이도, 웰라 등 글로벌 파트너와의 협업 경험.</p>
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
            <p class="block-desc">산업부 실증특례, 기술 특허, 메인비즈, 벤처기업 등 10종 인증 획득.</p>
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
            <p class="block-desc">RGB-16 AI로 1,600만 컬러를 추출하고 실전 데이터 기반 마케팅을 자동화합니다.</p>
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

    <!-- Section 3: AI 마케팅 솔루션 -->
    <section class="section" id="services">
      <div class="container">
        <div class="section-header">
          <span class="section-eyebrow">
            <i class="fas fa-rocket"></i> Services
          </span>
          <h2 class="section-title">AI 마케팅 솔루션</h2>
          <p class="section-desc">
            20년 현장 데이터를 기반으로 설계된 AI 마케팅 시스템.<br>
            강매 없음, 성과 보장, 무료 상담.
          </p>
        </div>
        
        <div class="service-grid" id="serviceGrid">
          <!-- Dynamic content -->
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section class="section section-alt" id="pricing">
      <div class="container">
        <div class="section-header">
          <span class="section-eyebrow">
            <i class="fas fa-tags"></i> Pricing
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
            <button class="btn btn-ghost" style="width:100%" onclick="openChat()">상담하기</button>
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
            <button class="btn btn-primary" style="width:100%" onclick="openChat()">상담하기</button>
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
            <button class="btn btn-ghost" style="width:100%" onclick="openChat()">상담하기</button>
          </div>
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
          <a href="#portfolio">포트폴리오</a>
          <a href="#business">20년 현장 데이터</a>
          <a href="#services">AI 마케팅 솔루션</a>
          <a href="#pricing">가격 안내</a>
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
          © 2024 컴바인티엔비 | XIVIX. All rights reserved.
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
        <div class="modal-body" id="serviceModalBody"></div>
      </div>
    </div>

    <!-- Education Modal - 6주 200만원 -->
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
            <div class="edu-original-price">정가 ₩3,000,000</div>
            <div class="edu-price">₩2,000,000</div>
            <div class="edu-course-info">
              <i class="fas fa-calendar-alt"></i> 6주 코스 | 매주 2시간 | 실전 AI 마케팅
            </div>
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
            <div class="bank-row"><span>금액</span><strong style="color: var(--neon-purple);">₩2,000,000</strong></div>
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
      // XIVIX ProVisual V2 JavaScript
      // ========================================
      
      let portfolioData = [];
      let channelServices = [];
      
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
          renderVideoPortfolio();
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
      
      // 웹 포트폴리오 렌더링 (영상 제외)
      function renderPortfolio() {
        const grid = document.getElementById('portfolioGrid');
        if (!grid || !portfolioData.length) return;
        
        const webItems = portfolioData.filter(item => !item.isVideo).slice(0, 9);
        grid.innerHTML = webItems.map(item => \`
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
      
      // 영상 포트폴리오 렌더링
      function renderVideoPortfolio() {
        const grid = document.getElementById('videoPortfolioGrid');
        if (!grid || !portfolioData.length) return;
        
        const videoItems = portfolioData.filter(item => item.isVideo).slice(0, 6);
        grid.innerHTML = videoItems.map(item => \`
          <div class="portfolio-video-card">
            <iframe 
              src="\${item.url}?controls=1" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen>
            </iframe>
          </div>
        \`).join('');
      }
      
      // 서비스 렌더링
      function renderServices() {
        const grid = document.getElementById('serviceGrid');
        if (!grid) return;
        
        const services = [
          { id: 'naver', name: '네이버 마케팅', desc: '블로그, 플레이스, 스마트스토어 통합 관리', icon: 'fa-solid fa-n', iconClass: 'naver' },
          { id: 'instagram', name: '인스타그램 마케팅', desc: '피드, 릴스, 스토리 콘텐츠 제작 및 운영', icon: 'fab fa-instagram', iconClass: 'insta' },
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
      
      // 챗봇
      function toggleChat() {
        document.getElementById('chatWindow').classList.toggle('open');
      }
      
      function openChat() {
        document.getElementById('chatWindow').classList.add('open');
      }
      
      async function sendChatMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        if (!message) return;
        
        const messagesDiv = document.getElementById('chatMessages');
        messagesDiv.innerHTML += \`<div class="chat-message user">\${message}</div>\`;
        input.value = '';
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        
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
      
      // 포트폴리오
      function openPortfolio(url, title) {
        window.open(url, '_blank');
      }
      
      function closeIframeModal() {
        document.getElementById('iframeModal').classList.remove('open');
        document.getElementById('iframeModalContent').src = '';
      }
      
      // 서비스 상세
      function openServiceDetail(id) {
        const modal = document.getElementById('serviceModal');
        const title = document.getElementById('serviceModalTitle');
        const body = document.getElementById('serviceModalBody');
        
        const names = {
          naver: '네이버 마케팅',
          instagram: '인스타그램 마케팅',
          youtube: '유튜브 마케팅',
          tiktok: '틱톡 마케팅',
          web: '웹사이트 제작',
          system: 'AI 시스템 구축'
        };
        
        title.innerHTML = \`<i class="fas fa-rocket"></i> \${names[id] || '서비스 상세'}\`;
        body.innerHTML = '<p style="text-align: center; padding: 40px; color: var(--text-secondary);">상세 정보를 불러오는 중...</p>';
        modal.classList.add('open');
        
        const service = channelServices.find(s => s.category === id);
        if (service) {
          body.innerHTML = \`
            <div style="padding: 20px 0;">
              <h3 style="font-size: 1.3rem; margin-bottom: 16px; color: var(--neon-purple);">\${service.name}</h3>
              \${service.services ? service.services.map(s => \`
                <div style="background: var(--bg-tertiary); padding: 16px; border-radius: 12px; margin-bottom: 12px; border: 1px solid var(--border-subtle);">
                  <div style="font-weight: 600; margin-bottom: 8px;">\${s.name}</div>
                  <div style="display: flex; justify-content: space-between; color: var(--text-secondary); font-size: 0.9rem;">
                    <span>세팅비: \${(s.setupFee || s.setup_fee || 0).toLocaleString()}원</span>
                    <span>월비용: \${(s.monthlyFee || s.monthly_fee || 0).toLocaleString()}원</span>
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
      
      // 교육 배너
      function closeEduBanner() {
        document.getElementById('eduTopBanner').classList.add('hidden');
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
              body: JSON.stringify({ name, phone, email, amount: 2000000 })
            });
            alert('신청이 완료되었습니다! 입금 확인 후 안내 문자를 보내드립니다.');
            closeEduModal();
          } catch (e) {
            alert('오류가 발생했습니다. 다시 시도해주세요.');
          }
        } else {
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
              orderName: 'AI 입문반 1기 (6주 코스)',
              totalAmount: 2000000,
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
      
      // ESC 키
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
