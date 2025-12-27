// ========================================
// MAIN PAGE - ProVisual Style (Clean & Spacious)
// ========================================

function getMainHTML(): string {
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
    
    <!-- SEO -->
    <meta name="keywords" content="마케팅, AI마케팅, SNS마케팅, 블로그마케팅, 유튜브마케팅, 광고대행, 인스타그램, 네이버블로그, 마케팅대행사">
    <meta name="author" content="X I Λ I X">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://xivix.kr">
    
    <!-- Schema.org -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "MarketingAgency",
      "name": "X I Λ I X",
      "url": "https://xivix.kr",
      "description": "AI 기반 통합 마케팅 솔루션 전문 에이전시",
      "priceRange": "₩890,000 - ₩9,900,000",
      "aggregateRating": {"@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "127"}
    }
    </script>
    
    <!-- Fonts & Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" rel="stylesheet">
    
    <!-- PortOne & Kakao SDK -->
    <script src="https://cdn.portone.io/v2/browser-sdk.js"></script>
    <script src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>
    
    <style>
      /* ========================================
         ProVisual Style - Clean & Spacious Design
         ======================================== */
      
      :root {
        /* Colors - Soft Dark Theme */
        --bg-base: #0f0f14;
        --bg-surface: #16161d;
        --bg-elevated: #1e1e26;
        --bg-hover: #252530;
        
        /* Accent Colors - Subtle & Professional */
        --accent-primary: #6366f1;
        --accent-secondary: #8b5cf6;
        --accent-success: #10b981;
        --accent-warning: #f59e0b;
        --accent-info: #06b6d4;
        
        /* Text Colors */
        --text-primary: #f8fafc;
        --text-secondary: #94a3b8;
        --text-muted: #64748b;
        
        /* Borders */
        --border-default: rgba(255, 255, 255, 0.08);
        --border-hover: rgba(255, 255, 255, 0.15);
        --border-active: rgba(99, 102, 241, 0.5);
        
        /* Shadows */
        --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.2);
        --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.25);
        --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.3);
        --shadow-glow: 0 0 30px rgba(99, 102, 241, 0.15);
        
        /* Spacing */
        --space-xs: 8px;
        --space-sm: 16px;
        --space-md: 24px;
        --space-lg: 40px;
        --space-xl: 64px;
        --space-2xl: 96px;
        --space-3xl: 128px;
        
        /* Container */
        --container-sm: 640px;
        --container-md: 768px;
        --container-lg: 1024px;
        --container-xl: 1200px;
        
        /* Radius */
        --radius-sm: 8px;
        --radius-md: 12px;
        --radius-lg: 16px;
        --radius-xl: 24px;
        --radius-full: 9999px;
        
        /* Transitions */
        --transition-fast: 0.15s ease;
        --transition-base: 0.25s ease;
        --transition-slow: 0.4s ease;
      }
      
      /* Reset & Base */
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      
      html { 
        scroll-behavior: smooth; 
        font-size: 16px;
      }
      
      body {
        font-family: 'Pretendard Variable', 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
        background: var(--bg-base);
        color: var(--text-primary);
        line-height: 1.6;
        -webkit-font-smoothing: antialiased;
        overflow-x: hidden;
      }
      
      /* Container */
      .container {
        width: 100%;
        max-width: var(--container-xl);
        margin: 0 auto;
        padding: 0 var(--space-md);
      }
      
      /* ========================================
         Header - Fixed & Clean
         ======================================== */
      .header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        background: rgba(15, 15, 20, 0.85);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid var(--border-default);
        padding: var(--space-sm) 0;
      }
      
      .header-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: var(--container-xl);
        margin: 0 auto;
        padding: 0 var(--space-md);
      }
      
      .logo {
        font-size: 1.5rem;
        font-weight: 800;
        letter-spacing: 0.1em;
        color: var(--text-primary);
        text-decoration: none;
      }
      
      .logo span {
        color: var(--accent-primary);
      }
      
      .nav-links {
        display: flex;
        align-items: center;
        gap: var(--space-md);
      }
      
      .nav-link {
        color: var(--text-secondary);
        text-decoration: none;
        font-size: 0.9rem;
        font-weight: 500;
        padding: var(--space-xs) var(--space-sm);
        border-radius: var(--radius-sm);
        transition: var(--transition-fast);
      }
      
      .nav-link:hover {
        color: var(--text-primary);
        background: var(--bg-hover);
      }
      
      .nav-cta {
        background: var(--accent-primary);
        color: white;
        padding: var(--space-xs) var(--space-md);
        border-radius: var(--radius-full);
        font-weight: 600;
        font-size: 0.85rem;
        text-decoration: none;
        transition: var(--transition-fast);
      }
      
      .nav-cta:hover {
        background: var(--accent-secondary);
        transform: translateY(-1px);
      }
      
      /* Mobile Menu Toggle */
      .menu-toggle {
        display: none;
        background: none;
        border: none;
        color: var(--text-primary);
        font-size: 1.5rem;
        cursor: pointer;
        padding: var(--space-xs);
      }
      
      @media (max-width: 768px) {
        .nav-links { display: none; }
        .menu-toggle { display: block; }
        .nav-links.open {
          display: flex;
          flex-direction: column;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: var(--bg-surface);
          padding: var(--space-md);
          border-bottom: 1px solid var(--border-default);
          gap: var(--space-xs);
        }
      }
      
      /* ========================================
         Hero Section - Clean & Spacious
         ======================================== */
      .hero {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--space-3xl) var(--space-md);
        position: relative;
        overflow: hidden;
      }
      
      .hero::before {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 150%;
        height: 60%;
        background: radial-gradient(ellipse at center top, rgba(99, 102, 241, 0.12) 0%, transparent 60%);
        pointer-events: none;
      }
      
      .hero-content {
        text-align: center;
        max-width: 800px;
        position: relative;
        z-index: 1;
      }
      
      .hero-badge {
        display: inline-flex;
        align-items: center;
        gap: var(--space-xs);
        padding: var(--space-xs) var(--space-md);
        background: var(--bg-elevated);
        border: 1px solid var(--border-default);
        border-radius: var(--radius-full);
        font-size: 0.85rem;
        color: var(--text-secondary);
        margin-bottom: var(--space-lg);
      }
      
      .hero-badge .dot {
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
        font-size: clamp(2rem, 5vw, 3.5rem);
        font-weight: 800;
        line-height: 1.2;
        margin-bottom: var(--space-md);
        letter-spacing: -0.02em;
      }
      
      .hero-title .highlight {
        background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .hero-subtitle {
        font-size: clamp(1rem, 2vw, 1.25rem);
        color: var(--text-secondary);
        max-width: 600px;
        margin: 0 auto var(--space-lg);
        line-height: 1.7;
      }
      
      .hero-buttons {
        display: flex;
        gap: var(--space-sm);
        justify-content: center;
        flex-wrap: wrap;
        margin-bottom: var(--space-xl);
      }
      
      .btn {
        display: inline-flex;
        align-items: center;
        gap: var(--space-xs);
        padding: var(--space-sm) var(--space-lg);
        font-size: 1rem;
        font-weight: 600;
        border-radius: var(--radius-md);
        text-decoration: none;
        cursor: pointer;
        transition: var(--transition-base);
        border: none;
      }
      
      .btn-primary {
        background: var(--accent-primary);
        color: white;
        box-shadow: var(--shadow-md), var(--shadow-glow);
      }
      
      .btn-primary:hover {
        background: var(--accent-secondary);
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg), 0 0 40px rgba(99, 102, 241, 0.25);
      }
      
      .btn-secondary {
        background: var(--bg-elevated);
        color: var(--text-primary);
        border: 1px solid var(--border-default);
      }
      
      .btn-secondary:hover {
        background: var(--bg-hover);
        border-color: var(--border-hover);
      }
      
      /* Hero Stats */
      .hero-stats {
        display: flex;
        justify-content: center;
        gap: var(--space-xl);
        flex-wrap: wrap;
      }
      
      .stat-item {
        text-align: center;
      }
      
      .stat-value {
        font-size: 2rem;
        font-weight: 800;
        color: var(--accent-primary);
      }
      
      .stat-label {
        font-size: 0.85rem;
        color: var(--text-muted);
        margin-top: var(--space-xs);
      }
      
      /* ========================================
         Section - Uniform Spacing
         ======================================== */
      .section {
        padding: var(--space-2xl) var(--space-md);
      }
      
      .section-header {
        text-align: center;
        margin-bottom: var(--space-xl);
      }
      
      .section-eyebrow {
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--accent-primary);
        text-transform: uppercase;
        letter-spacing: 0.1em;
        margin-bottom: var(--space-sm);
      }
      
      .section-title {
        font-size: clamp(1.75rem, 4vw, 2.5rem);
        font-weight: 700;
        letter-spacing: -0.02em;
        margin-bottom: var(--space-sm);
      }
      
      .section-subtitle {
        font-size: 1.1rem;
        color: var(--text-secondary);
        max-width: 600px;
        margin: 0 auto;
      }
      
      /* ========================================
         Cards Grid - Clean Layout
         ======================================== */
      .cards-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: var(--space-md);
        max-width: var(--container-xl);
        margin: 0 auto;
      }
      
      .card {
        background: var(--bg-surface);
        border: 1px solid var(--border-default);
        border-radius: var(--radius-lg);
        padding: var(--space-lg);
        transition: var(--transition-base);
      }
      
      .card:hover {
        border-color: var(--border-active);
        transform: translateY(-4px);
        box-shadow: var(--shadow-lg);
      }
      
      .card-icon {
        width: 56px;
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--bg-elevated);
        border-radius: var(--radius-md);
        font-size: 1.5rem;
        color: var(--accent-primary);
        margin-bottom: var(--space-md);
      }
      
      .card-title {
        font-size: 1.25rem;
        font-weight: 700;
        margin-bottom: var(--space-sm);
      }
      
      .card-description {
        color: var(--text-secondary);
        font-size: 0.95rem;
        line-height: 1.6;
      }
      
      /* ========================================
         Service Menu - 2 Column Grid
         ======================================== */
      .service-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--space-md);
        max-width: 900px;
        margin: 0 auto;
      }
      
      @media (max-width: 768px) {
        .service-grid {
          grid-template-columns: 1fr;
        }
      }
      
      .service-card {
        background: var(--bg-surface);
        border: 1px solid var(--border-default);
        border-radius: var(--radius-lg);
        padding: var(--space-lg);
        cursor: pointer;
        transition: var(--transition-base);
        position: relative;
        overflow: hidden;
      }
      
      .service-card:hover {
        border-color: var(--accent-primary);
        transform: translateY(-4px);
        box-shadow: var(--shadow-lg), var(--shadow-glow);
      }
      
      .service-card-badge {
        position: absolute;
        top: var(--space-sm);
        right: var(--space-sm);
        background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
        color: white;
        font-size: 0.7rem;
        font-weight: 700;
        padding: 4px 10px;
        border-radius: var(--radius-full);
      }
      
      .service-card-icon {
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--bg-elevated);
        border-radius: var(--radius-md);
        font-size: 1.25rem;
        margin-bottom: var(--space-sm);
      }
      
      .service-card-title {
        font-size: 1.1rem;
        font-weight: 700;
        margin-bottom: var(--space-xs);
      }
      
      .service-card-desc {
        color: var(--text-muted);
        font-size: 0.85rem;
      }
      
      .service-card-arrow {
        position: absolute;
        bottom: var(--space-md);
        right: var(--space-md);
        color: var(--text-muted);
        font-size: 0.9rem;
        transition: var(--transition-fast);
      }
      
      .service-card:hover .service-card-arrow {
        color: var(--accent-primary);
        transform: translateX(4px);
      }
      
      /* ========================================
         Business Blocks - Clean 2x2 Grid
         ======================================== */
      .blocks-section {
        background: var(--bg-surface);
        padding: var(--space-2xl) var(--space-md);
      }
      
      .blocks-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--space-md);
        max-width: var(--container-lg);
        margin: 0 auto;
      }
      
      @media (max-width: 768px) {
        .blocks-grid {
          grid-template-columns: 1fr;
        }
      }
      
      .block-card {
        background: var(--bg-base);
        border: 1px solid var(--border-default);
        border-radius: var(--radius-lg);
        padding: var(--space-lg);
        position: relative;
      }
      
      .block-card:hover {
        border-color: var(--border-hover);
      }
      
      .block-number {
        position: absolute;
        top: var(--space-md);
        right: var(--space-md);
        font-size: 3rem;
        font-weight: 900;
        color: var(--bg-elevated);
        line-height: 1;
      }
      
      .block-icon {
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--bg-elevated);
        border-radius: var(--radius-md);
        font-size: 1.25rem;
        color: var(--accent-info);
        margin-bottom: var(--space-sm);
      }
      
      .block-title {
        font-size: 1.2rem;
        font-weight: 700;
        margin-bottom: var(--space-sm);
      }
      
      .block-description {
        color: var(--text-secondary);
        font-size: 0.9rem;
        margin-bottom: var(--space-md);
        line-height: 1.6;
      }
      
      .block-stats {
        display: flex;
        gap: var(--space-sm);
        flex-wrap: wrap;
        margin-bottom: var(--space-md);
      }
      
      .block-stat {
        background: var(--bg-elevated);
        padding: var(--space-xs) var(--space-sm);
        border-radius: var(--radius-sm);
        text-align: center;
        flex: 1;
        min-width: 70px;
      }
      
      .block-stat-value {
        font-size: 1.2rem;
        font-weight: 800;
        color: var(--accent-primary);
      }
      
      .block-stat-label {
        font-size: 0.7rem;
        color: var(--text-muted);
      }
      
      .block-badges {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-xs);
      }
      
      .block-badge {
        background: var(--bg-elevated);
        border: 1px solid var(--border-default);
        padding: 4px 10px;
        border-radius: var(--radius-full);
        font-size: 0.75rem;
        color: var(--text-secondary);
      }
      
      /* ========================================
         Pricing Cards
         ======================================== */
      .pricing-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: var(--space-md);
        max-width: var(--container-xl);
        margin: 0 auto;
      }
      
      .pricing-card {
        background: var(--bg-surface);
        border: 1px solid var(--border-default);
        border-radius: var(--radius-xl);
        padding: var(--space-lg);
        text-align: center;
        position: relative;
        transition: var(--transition-base);
      }
      
      .pricing-card.featured {
        border-color: var(--accent-primary);
        background: linear-gradient(180deg, rgba(99, 102, 241, 0.1) 0%, var(--bg-surface) 100%);
      }
      
      .pricing-card:hover {
        transform: translateY(-8px);
        box-shadow: var(--shadow-lg);
      }
      
      .pricing-badge {
        position: absolute;
        top: -12px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--accent-primary);
        color: white;
        font-size: 0.75rem;
        font-weight: 700;
        padding: 4px 16px;
        border-radius: var(--radius-full);
      }
      
      .pricing-name {
        font-size: 1.25rem;
        font-weight: 700;
        margin-bottom: var(--space-xs);
      }
      
      .pricing-desc {
        color: var(--text-muted);
        font-size: 0.9rem;
        margin-bottom: var(--space-md);
      }
      
      .pricing-price {
        font-size: 2.5rem;
        font-weight: 800;
        color: var(--accent-primary);
        margin-bottom: var(--space-xs);
      }
      
      .pricing-price span {
        font-size: 1rem;
        font-weight: 500;
        color: var(--text-muted);
      }
      
      .pricing-original {
        font-size: 0.9rem;
        color: var(--text-muted);
        text-decoration: line-through;
        margin-bottom: var(--space-md);
      }
      
      .pricing-features {
        list-style: none;
        text-align: left;
        margin-bottom: var(--space-lg);
      }
      
      .pricing-features li {
        padding: var(--space-xs) 0;
        color: var(--text-secondary);
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        gap: var(--space-sm);
      }
      
      .pricing-features li::before {
        content: "✓";
        color: var(--accent-success);
        font-weight: 700;
      }
      
      /* ========================================
         Portfolio Section
         ======================================== */
      .portfolio-tabs {
        display: flex;
        justify-content: center;
        gap: var(--space-xs);
        flex-wrap: wrap;
        margin-bottom: var(--space-lg);
      }
      
      .portfolio-tab {
        padding: var(--space-xs) var(--space-md);
        background: var(--bg-elevated);
        border: 1px solid var(--border-default);
        border-radius: var(--radius-full);
        color: var(--text-secondary);
        font-size: 0.85rem;
        font-weight: 500;
        cursor: pointer;
        transition: var(--transition-fast);
      }
      
      .portfolio-tab:hover,
      .portfolio-tab.active {
        background: var(--accent-primary);
        border-color: var(--accent-primary);
        color: white;
      }
      
      .portfolio-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: var(--space-md);
        max-width: var(--container-xl);
        margin: 0 auto;
      }
      
      .portfolio-item {
        background: var(--bg-surface);
        border: 1px solid var(--border-default);
        border-radius: var(--radius-lg);
        overflow: hidden;
        transition: var(--transition-base);
        cursor: pointer;
      }
      
      .portfolio-item:hover {
        border-color: var(--accent-primary);
        transform: translateY(-4px);
        box-shadow: var(--shadow-lg);
      }
      
      .portfolio-thumb {
        width: 100%;
        height: 180px;
        background: var(--bg-elevated);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        color: var(--text-muted);
      }
      
      .portfolio-thumb iframe {
        width: 100%;
        height: 100%;
        border: none;
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
        display: inline-block;
        background: var(--bg-elevated);
        padding: 2px 8px;
        border-radius: var(--radius-sm);
        font-size: 0.75rem;
        color: var(--text-muted);
      }
      
      /* ========================================
         Chat Bot - Clean Floating Button
         ======================================== */
      .chat-button {
        position: fixed;
        bottom: var(--space-lg);
        right: var(--space-lg);
        width: 64px;
        height: 64px;
        background: var(--accent-primary);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 100;
        box-shadow: var(--shadow-lg), var(--shadow-glow);
        transition: var(--transition-base);
      }
      
      .chat-button:hover {
        transform: scale(1.1);
        background: var(--accent-secondary);
      }
      
      .chat-modal {
        position: fixed;
        bottom: 100px;
        right: var(--space-lg);
        width: 380px;
        max-width: calc(100vw - 32px);
        height: 550px;
        max-height: calc(100vh - 150px);
        background: var(--bg-surface);
        border: 1px solid var(--border-default);
        border-radius: var(--radius-xl);
        display: none;
        flex-direction: column;
        z-index: 99;
        box-shadow: var(--shadow-lg);
        overflow: hidden;
      }
      
      .chat-modal.open {
        display: flex;
      }
      
      .chat-header {
        padding: var(--space-md);
        background: var(--bg-elevated);
        border-bottom: 1px solid var(--border-default);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .chat-header-title {
        font-weight: 700;
        font-size: 1rem;
      }
      
      .chat-close {
        background: none;
        border: none;
        color: var(--text-muted);
        font-size: 1.25rem;
        cursor: pointer;
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
        font-size: 0.9rem;
        line-height: 1.5;
      }
      
      .chat-message.bot {
        background: var(--bg-elevated);
        color: var(--text-primary);
        align-self: flex-start;
        border-bottom-left-radius: 4px;
      }
      
      .chat-message.user {
        background: var(--accent-primary);
        color: white;
        align-self: flex-end;
        border-bottom-right-radius: 4px;
      }
      
      .chat-input-area {
        padding: var(--space-md);
        border-top: 1px solid var(--border-default);
        display: flex;
        gap: var(--space-sm);
      }
      
      .chat-input {
        flex: 1;
        padding: var(--space-sm) var(--space-md);
        background: var(--bg-elevated);
        border: 1px solid var(--border-default);
        border-radius: var(--radius-md);
        color: var(--text-primary);
        font-size: 0.9rem;
        outline: none;
      }
      
      .chat-input:focus {
        border-color: var(--accent-primary);
      }
      
      .chat-send {
        padding: var(--space-sm) var(--space-md);
        background: var(--accent-primary);
        border: none;
        border-radius: var(--radius-md);
        color: white;
        font-size: 0.9rem;
        cursor: pointer;
        transition: var(--transition-fast);
      }
      
      .chat-send:hover {
        background: var(--accent-secondary);
      }
      
      /* ========================================
         Service Modal - Full Screen
         ======================================== */
      .service-modal {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.9);
        z-index: 200;
        display: none;
        overflow-y: auto;
      }
      
      .service-modal.open {
        display: block;
      }
      
      .service-modal-content {
        max-width: 900px;
        margin: 0 auto;
        padding: var(--space-md);
        min-height: 100vh;
      }
      
      .service-modal-header {
        position: sticky;
        top: 0;
        background: rgba(15, 15, 20, 0.95);
        backdrop-filter: blur(10px);
        padding: var(--space-md) 0;
        border-bottom: 1px solid var(--border-default);
        margin-bottom: var(--space-lg);
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 10;
      }
      
      .service-modal-title {
        font-size: 1.5rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: var(--space-sm);
      }
      
      .service-modal-close {
        width: 44px;
        height: 44px;
        background: var(--bg-elevated);
        border: 1px solid var(--border-default);
        border-radius: var(--radius-md);
        color: var(--text-primary);
        font-size: 1.25rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: var(--transition-fast);
      }
      
      .service-modal-close:hover {
        background: rgba(239, 68, 68, 0.2);
        border-color: #ef4444;
      }
      
      /* ========================================
         Footer
         ======================================== */
      .footer {
        background: var(--bg-surface);
        border-top: 1px solid var(--border-default);
        padding: var(--space-xl) var(--space-md);
      }
      
      .footer-content {
        max-width: var(--container-xl);
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: var(--space-md);
      }
      
      .footer-logo {
        font-size: 1.5rem;
        font-weight: 800;
        letter-spacing: 0.1em;
        color: var(--text-primary);
      }
      
      .footer-links {
        display: flex;
        gap: var(--space-md);
        flex-wrap: wrap;
        justify-content: center;
      }
      
      .footer-link {
        color: var(--text-muted);
        text-decoration: none;
        font-size: 0.9rem;
        transition: var(--transition-fast);
      }
      
      .footer-link:hover {
        color: var(--accent-primary);
      }
      
      .footer-copyright {
        color: var(--text-muted);
        font-size: 0.85rem;
      }
      
      /* ========================================
         Utility Classes
         ======================================== */
      .text-center { text-align: center; }
      .text-gradient {
        background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      
      /* Animations */
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      .fade-in {
        animation: fadeIn 0.6s ease-out forwards;
        opacity: 0;
      }
      
      .delay-1 { animation-delay: 0.1s; }
      .delay-2 { animation-delay: 0.2s; }
      .delay-3 { animation-delay: 0.3s; }
      
      /* Mobile Optimizations */
      @media (max-width: 768px) {
        .hero { padding: var(--space-2xl) var(--space-sm); }
        .section { padding: var(--space-xl) var(--space-sm); }
        .hero-stats { gap: var(--space-lg); }
        .stat-value { font-size: 1.5rem; }
        .container { padding: 0 var(--space-sm); }
      }
      
      /* Cart & Payment Styles */
      .cart-floating {
        position: fixed;
        bottom: var(--space-lg);
        left: 50%;
        transform: translateX(-50%);
        background: var(--bg-surface);
        border: 1px solid var(--border-default);
        border-radius: var(--radius-xl);
        padding: var(--space-sm) var(--space-lg);
        display: none;
        align-items: center;
        gap: var(--space-md);
        z-index: 90;
        box-shadow: var(--shadow-lg);
      }
      
      .cart-floating.visible { display: flex; }
      
      .cart-count {
        background: var(--accent-primary);
        color: white;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 0.9rem;
      }
      
      .cart-total {
        font-weight: 700;
        font-size: 1.1rem;
      }
      
      .cart-checkout {
        background: var(--accent-primary);
        color: white;
        padding: var(--space-xs) var(--space-md);
        border: none;
        border-radius: var(--radius-md);
        font-weight: 600;
        cursor: pointer;
      }
    </style>
</head>
<body>
    <!-- Header -->
    <header class="header">
      <div class="header-inner">
        <a href="/" class="logo">XI<span>Λ</span>IX</a>
        <nav class="nav-links" id="nav-links">
          <a href="#services" class="nav-link">서비스</a>
          <a href="#portfolio" class="nav-link">포트폴리오</a>
          <a href="#pricing" class="nav-link">가격</a>
          <a href="/login" class="nav-cta" id="auth-btn"><i class="fas fa-user"></i> 로그인</a>
        </nav>
        <button class="menu-toggle" onclick="toggleMenu()"><i class="fas fa-bars"></i></button>
      </div>
    </header>
    
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <div class="hero-badge fade-in">
          <span class="dot"></span>
          <span>20년 현장 데이터 기반 AI 시스템</span>
        </div>
        <h1 class="hero-title fade-in delay-1">
          사장님은 <span class="highlight">장사만 하세요</span><br>
          마케팅은 AI가 다 해드립니다
        </h1>
        <p class="hero-subtitle fade-in delay-2">
          직원 뽑지 마세요. 블로그, 인스타, 영상 편집...<br>
          <strong>XIVIX AI 시스템</strong>이 월급 없이 24시간 일합니다.
        </p>
        <div class="hero-buttons fade-in delay-3">
          <button class="btn btn-primary" onclick="openChat()">
            <i class="fas fa-comments"></i> 무료 상담받기
          </button>
          <a href="#services" class="btn btn-secondary">
            <i class="fas fa-list"></i> 서비스 보기
          </a>
        </div>
        <div class="hero-stats fade-in delay-3">
          <div class="stat-item">
            <div class="stat-value">-90%</div>
            <div class="stat-label">시간 절감</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">-70%</div>
            <div class="stat-label">비용 절감</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">+250%</div>
            <div class="stat-label">문의량 증가</div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Business Blocks -->
    <section class="blocks-section" id="about">
      <div class="container">
        <div class="section-header">
          <div class="section-eyebrow">Why XIVIX</div>
          <h2 class="section-title">20년 현장 데이터가 설계한 AI 시스템</h2>
          <p class="section-subtitle">제조, 유통, 홈쇼핑, 정부인증 지식을 AI에 이식했습니다</p>
        </div>
        
        <div class="blocks-grid">
          <div class="block-card">
            <div class="block-number">01</div>
            <div class="block-icon"><i class="fas fa-store"></i></div>
            <h3 class="block-title">커머스 유통 설계</h3>
            <p class="block-description">전국 유통망과 홈쇼핑 계약을 기반으로 자사몰·온라인 통합 운영 시스템 구축</p>
            <div class="block-stats">
              <div class="block-stat">
                <div class="block-stat-value">23</div>
                <div class="block-stat-label">전국 대리점</div>
              </div>
              <div class="block-stat">
                <div class="block-stat-value">3+</div>
                <div class="block-stat-label">홈쇼핑 계약</div>
              </div>
            </div>
            <div class="block-badges">
              <span class="block-badge">신세계TV쇼핑</span>
              <span class="block-badge">K홈쇼핑</span>
            </div>
          </div>
          
          <div class="block-card">
            <div class="block-number">02</div>
            <div class="block-icon"><i class="fas fa-globe"></i></div>
            <h3 class="block-title">글로벌 제조 및 B2B</h3>
            <p class="block-description">아모스프로페셔널, RBH, 시세이도, 웰라 등 글로벌 파트너십과 B2B/B2C 통합 판매 경험</p>
            <div class="block-stats">
              <div class="block-stat">
                <div class="block-stat-value">14,807+</div>
                <div class="block-stat-label">누적 판매대</div>
              </div>
              <div class="block-stat">
                <div class="block-stat-value">4+</div>
                <div class="block-stat-label">글로벌 파트너</div>
              </div>
            </div>
          </div>
          
          <div class="block-card">
            <div class="block-number">03</div>
            <div class="block-icon"><i class="fas fa-award"></i></div>
            <h3 class="block-title">규제 특례 및 국가 인증</h3>
            <p class="block-description">산업부 실증특례, 기술 특허, 메인비즈, ISO 9001/14001, 벤처기업 등 10종 인증 보유</p>
            <div class="block-stats">
              <div class="block-stat">
                <div class="block-stat-value">10+</div>
                <div class="block-stat-label">국가 인증</div>
              </div>
            </div>
            <div class="block-badges">
              <span class="block-badge">ISO 9001</span>
              <span class="block-badge">벤처기업</span>
              <span class="block-badge">메인비즈</span>
            </div>
          </div>
          
          <div class="block-card">
            <div class="block-number">04</div>
            <div class="block-icon"><i class="fas fa-robot"></i></div>
            <h3 class="block-title">빅데이터 알고리즘</h3>
            <p class="block-description">RGB-16 AI 알고리즘, 1,600만 컬러 추출, 실전 데이터 기반 마케팅 자동화 시스템</p>
            <div class="block-stats">
              <div class="block-stat">
                <div class="block-stat-value">1,600만</div>
                <div class="block-stat-label">컬러 추출</div>
              </div>
            </div>
            <div class="block-badges">
              <span class="block-badge">RGB-16 AI</span>
              <span class="block-badge">자동화 솔루션</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Services Section -->
    <section class="section" id="services">
      <div class="container">
        <div class="section-header">
          <div class="section-eyebrow">Services</div>
          <h2 class="section-title">필요한 서비스를 선택하세요</h2>
          <p class="section-subtitle">20년 노하우가 담긴 마케팅 솔루션</p>
        </div>
        
        <div class="service-grid">
          <div class="service-card" onclick="openServiceModal('sns')">
            <span class="service-card-badge">BEST</span>
            <div class="service-card-icon" style="color: #ec4899;"><i class="fas fa-fire"></i></div>
            <div class="service-card-title">SNS 세트 메뉴</div>
            <div class="service-card-desc">인스타+플레이스+블로그 통합 관리</div>
            <span class="service-card-arrow"><i class="fas fa-arrow-right"></i></span>
          </div>
          
          <div class="service-card" onclick="openServiceModal('channel')">
            <div class="service-card-icon" style="color: #22d3ee;"><i class="fas fa-th-large"></i></div>
            <div class="service-card-title">채널별 서비스</div>
            <div class="service-card-desc">네이버, 인스타, 유튜브, 구글 개별 선택</div>
            <span class="service-card-arrow"><i class="fas fa-arrow-right"></i></span>
          </div>
          
          <div class="service-card" onclick="openServiceModal('website')">
            <span class="service-card-badge">NEW</span>
            <div class="service-card-icon" style="color: #6366f1;"><i class="fas fa-globe"></i></div>
            <div class="service-card-title">웹사이트 구축</div>
            <div class="service-card-desc">AI 상담봇 탑재 홈페이지 제작</div>
            <span class="service-card-arrow"><i class="fas fa-arrow-right"></i></span>
          </div>
          
          <div class="service-card" onclick="openServiceModal('consulting')">
            <div class="service-card-icon" style="color: #f59e0b;"><i class="fas fa-briefcase"></i></div>
            <div class="service-card-title">브랜드 컨설팅</div>
            <div class="service-card-desc">프랜차이즈/브랜드 성장 전략</div>
            <span class="service-card-arrow"><i class="fas fa-arrow-right"></i></span>
          </div>
          
          <div class="service-card" onclick="openServiceModal('video')">
            <div class="service-card-icon" style="color: #ef4444;"><i class="fas fa-video"></i></div>
            <div class="service-card-title">영상 제작</div>
            <div class="service-card-desc">브랜딩 영상, 교육 영상, 숏폼</div>
            <span class="service-card-arrow"><i class="fas fa-arrow-right"></i></span>
          </div>
          
          <div class="service-card" onclick="openServiceModal('addon')">
            <div class="service-card-icon" style="color: #10b981;"><i class="fas fa-plus-circle"></i></div>
            <div class="service-card-title">부가 서비스</div>
            <div class="service-card-desc">상세페이지, 리틀리, 상권분석 등</div>
            <span class="service-card-arrow"><i class="fas fa-arrow-right"></i></span>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Pricing Section -->
    <section class="section" id="pricing" style="background: var(--bg-surface);">
      <div class="container">
        <div class="section-header">
          <div class="section-eyebrow">Pricing</div>
          <h2 class="section-title">월 관리 GRADE</h2>
          <p class="section-subtitle">목표에 맞는 등급을 선택하세요</p>
        </div>
        
        <div class="pricing-grid">
          <div class="pricing-card">
            <div class="pricing-name">GRADE 1</div>
            <div class="pricing-desc">베이직 - 신뢰 쌓기</div>
            <div class="pricing-price">55<span>만원/월</span></div>
            <ul class="pricing-features">
              <li>플레이스 기본 관리</li>
              <li>인스타 피드 2개 + 스토리 4개/월</li>
              <li>블로그 포스팅 2개/월</li>
              <li>월 2회 리포트</li>
            </ul>
            <button class="btn btn-secondary" onclick="addToCart('grade1', 'GRADE 1 베이직', 550000)">선택하기</button>
          </div>
          
          <div class="pricing-card featured">
            <span class="pricing-badge">BEST</span>
            <div class="pricing-name">GRADE 2</div>
            <div class="pricing-desc">퍼포먼스 - 매출 전환</div>
            <div class="pricing-price">99<span>만원/월</span></div>
            <ul class="pricing-features">
              <li>플레이스 적극 관리 (리뷰/키워드)</li>
              <li>인스타 릴스 4개 + 피드 4개 + 카드 2개</li>
              <li>블로그 상위노출 4개/월</li>
              <li>구글 마이비즈니스 관리</li>
            </ul>
            <button class="btn btn-primary" onclick="addToCart('grade2', 'GRADE 2 퍼포먼스', 990000)">선택하기</button>
          </div>
          
          <div class="pricing-card">
            <div class="pricing-name">GRADE 3</div>
            <div class="pricing-desc">마스터 - 지역 장악</div>
            <div class="pricing-price">190<span>만원/월</span></div>
            <ul class="pricing-features">
              <li>유튜브 숏폼 4개/월</li>
              <li>인스타 릴스 8개 + 피드 6개</li>
              <li>틱톡 영상 4개/월</li>
              <li>전 채널 통합 관리</li>
            </ul>
            <button class="btn btn-secondary" onclick="addToCart('grade3', 'GRADE 3 마스터', 1900000)">선택하기</button>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Portfolio Section -->
    <section class="section" id="portfolio">
      <div class="container">
        <div class="section-header">
          <div class="section-eyebrow">Portfolio</div>
          <h2 class="section-title">작업 포트폴리오</h2>
          <p class="section-subtitle">다양한 업종의 성공 사례를 확인하세요</p>
        </div>
        
        <div class="portfolio-tabs" id="portfolio-tabs">
          <button class="portfolio-tab active" data-category="all">전체</button>
          <button class="portfolio-tab" data-category="branding">브랜딩</button>
          <button class="portfolio-tab" data-category="beauty">뷰티</button>
          <button class="portfolio-tab" data-category="commerce">커머스</button>
          <button class="portfolio-tab" data-category="system">시스템/AI</button>
          <button class="portfolio-tab" data-category="video">영상</button>
        </div>
        
        <div class="portfolio-grid" id="portfolio-grid">
          <!-- Populated by JS -->
        </div>
      </div>
    </section>
    
    <!-- CTA Section -->
    <section class="section" style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.1));">
      <div class="container text-center">
        <h2 class="section-title">지금 무료 상담 받아보세요</h2>
        <p class="section-subtitle" style="margin-bottom: var(--space-lg);">
          친구 초대하면 <strong style="color: var(--accent-primary);">15% 할인</strong> | 추천인도 <strong>5% 적립</strong>
        </p>
        <button class="btn btn-primary btn-lg" onclick="openChat()" style="font-size: 1.1rem; padding: 18px 40px;">
          <i class="fas fa-comments"></i> AI 상담 시작하기
        </button>
      </div>
    </section>
    
    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-logo">XIΛIX</div>
        <div class="footer-links">
          <a href="https://xivix.kr" class="footer-link">홈</a>
          <a href="#services" class="footer-link">서비스</a>
          <a href="#portfolio" class="footer-link">포트폴리오</a>
          <a href="/login" class="footer-link">로그인</a>
          <a href="/admin" class="footer-link">관리자</a>
        </div>
        <p class="footer-copyright">© 2025 X I Λ I X. All rights reserved.</p>
      </div>
    </footer>
    
    <!-- Chat Button & Modal -->
    <button class="chat-button" id="chat-button" onclick="toggleChat()">
      <i class="fas fa-comments"></i>
    </button>
    
    <div class="chat-modal" id="chat-modal">
      <div class="chat-header">
        <span class="chat-header-title"><i class="fas fa-robot"></i> XIVIX AI 상담</span>
        <button class="chat-close" onclick="toggleChat()"><i class="fas fa-times"></i></button>
      </div>
      <div class="chat-messages" id="chat-messages">
        <div class="chat-message bot">안녕하세요! XIVIX 마케팅 상담 AI입니다. 😊<br><br>어떤 업종을 운영하고 계신가요?</div>
      </div>
      <div class="chat-input-area">
        <input type="text" class="chat-input" id="chat-input" placeholder="메시지를 입력하세요..." onkeypress="handleChatKeypress(event)">
        <button class="chat-send" onclick="sendChatMessage()">전송</button>
      </div>
    </div>
    
    <!-- Service Modal -->
    <div class="service-modal" id="service-modal">
      <div class="service-modal-content">
        <div class="service-modal-header">
          <h2 class="service-modal-title" id="modal-title"><i class="fas fa-fire"></i> SNS 세트 메뉴</h2>
          <button class="service-modal-close" onclick="closeServiceModal()"><i class="fas fa-times"></i></button>
        </div>
        <div class="service-modal-body" id="modal-body">
          <!-- Content populated by JS -->
        </div>
      </div>
    </div>
    
    <!-- Cart Floating Bar -->
    <div class="cart-floating" id="cart-floating">
      <div class="cart-count" id="cart-count">0</div>
      <div class="cart-total" id="cart-total">₩0</div>
      <button class="cart-checkout" onclick="checkout()">결제하기</button>
    </div>
    
    <script>
      // ========================================
      // XIVIX ProVisual UI - JavaScript
      // ========================================
      
      // Portfolio Data
      const portfolioData = ${JSON.stringify(PORTFOLIO_DATA)};
      
      // Cart State
      let cart = [];
      
      // Mobile Menu Toggle
      function toggleMenu() {
        document.getElementById('nav-links').classList.toggle('open');
      }
      
      // Chat Functions
      function toggleChat() {
        document.getElementById('chat-modal').classList.toggle('open');
      }
      
      function openChat() {
        document.getElementById('chat-modal').classList.add('open');
      }
      
      function handleChatKeypress(e) {
        if (e.key === 'Enter') sendChatMessage();
      }
      
      async function sendChatMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        if (!message) return;
        
        const messagesEl = document.getElementById('chat-messages');
        
        // Add user message
        messagesEl.innerHTML += '<div class="chat-message user">' + escapeHtml(message) + '</div>';
        input.value = '';
        messagesEl.scrollTop = messagesEl.scrollHeight;
        
        // Show typing indicator
        messagesEl.innerHTML += '<div class="chat-message bot" id="typing">입력 중...</div>';
        
        try {
          const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
          });
          const data = await res.json();
          
          document.getElementById('typing')?.remove();
          messagesEl.innerHTML += '<div class="chat-message bot">' + formatMessage(data.response) + '</div>';
          messagesEl.scrollTop = messagesEl.scrollHeight;
        } catch (e) {
          document.getElementById('typing')?.remove();
          messagesEl.innerHTML += '<div class="chat-message bot">죄송합니다. 잠시 후 다시 시도해주세요.</div>';
        }
      }
      
      function escapeHtml(text) {
        return text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
      }
      
      function formatMessage(text) {
        return text.replace(/\\n/g, '<br>').replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>');
      }
      
      // Portfolio Functions
      function renderPortfolio(category = 'all') {
        const grid = document.getElementById('portfolio-grid');
        const items = portfolioData.items.filter(i => category === 'all' || i.category === category);
        
        grid.innerHTML = items.slice(0, 12).map(item => {
          const thumb = item.isVideo 
            ? '<iframe src="' + item.url + '" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
            : '<i class="fas fa-external-link-alt"></i>';
          
          return '<div class="portfolio-item" onclick="openPortfolio(\\'' + item.url + '\\', ' + (item.isVideo || false) + ')">' +
            '<div class="portfolio-thumb">' + thumb + '</div>' +
            '<div class="portfolio-info">' +
              '<div class="portfolio-title">' + item.title + '</div>' +
              '<span class="portfolio-tag">' + item.tag + '</span>' +
            '</div>' +
          '</div>';
        }).join('');
      }
      
      function openPortfolio(url, isVideo) {
        if (isVideo) return;
        window.open(url, '_blank');
      }
      
      // Portfolio Tab Click
      document.getElementById('portfolio-tabs')?.addEventListener('click', (e) => {
        if (e.target.classList.contains('portfolio-tab')) {
          document.querySelectorAll('.portfolio-tab').forEach(t => t.classList.remove('active'));
          e.target.classList.add('active');
          renderPortfolio(e.target.dataset.category);
        }
      });
      
      // Service Modal Functions
      const serviceModalData = {
        sns: {
          title: '<i class="fas fa-fire" style="color:#ec4899;"></i> SNS 세트 메뉴',
          content: getSnsSetContent()
        },
        channel: {
          title: '<i class="fas fa-th-large" style="color:#22d3ee;"></i> 채널별 서비스',
          content: getChannelContent()
        },
        website: {
          title: '<i class="fas fa-globe" style="color:#6366f1;"></i> 웹사이트 구축',
          content: getWebsiteContent()
        },
        consulting: {
          title: '<i class="fas fa-briefcase" style="color:#f59e0b;"></i> 브랜드 컨설팅',
          content: getConsultingContent()
        },
        video: {
          title: '<i class="fas fa-video" style="color:#ef4444;"></i> 영상 제작',
          content: getVideoContent()
        },
        addon: {
          title: '<i class="fas fa-plus-circle" style="color:#10b981;"></i> 부가 서비스',
          content: getAddonContent()
        }
      };
      
      function openServiceModal(type) {
        const modal = document.getElementById('service-modal');
        const data = serviceModalData[type];
        if (data) {
          document.getElementById('modal-title').innerHTML = data.title;
          document.getElementById('modal-body').innerHTML = data.content;
          modal.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
      }
      
      function closeServiceModal() {
        document.getElementById('service-modal').classList.remove('open');
        document.body.style.overflow = '';
      }
      
      // Service Content Generators
      function getSnsSetContent() {
        const sets = ${JSON.stringify(SET_MENUS)};
        return '<div class="pricing-grid">' + sets.map(s => {
          const isBest = s.best;
          return '<div class="pricing-card' + (isBest ? ' featured' : '') + '">' +
            (isBest ? '<span class="pricing-badge">BEST</span>' : '') +
            '<div class="pricing-name">' + s.name + '</div>' +
            '<div class="pricing-desc">' + s.recommended + '</div>' +
            '<div class="pricing-original">정가 ' + (s.originalPrice/10000).toLocaleString() + '만원</div>' +
            '<div class="pricing-price">' + (s.price/10000).toLocaleString() + '<span>만원</span></div>' +
            '<ul class="pricing-features">' + s.includes.map(i => '<li>' + i + '</li>').join('') + '</ul>' +
            '<button class="btn ' + (isBest ? 'btn-primary' : 'btn-secondary') + '" onclick="addToCart(\\'' + s.id + '\\', \\'' + s.name + '\\', ' + s.price + ')">장바구니 담기</button>' +
          '</div>';
        }).join('') + '</div>';
      }
      
      function getChannelContent() {
        const channels = ${JSON.stringify(CHANNEL_SERVICES)};
        return channels.map(ch => {
          return '<div class="card" style="margin-bottom: var(--space-md);">' +
            '<div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">' +
              '<span style="font-size:1.5rem;color:' + ch.color + ';"><i class="' + ch.icon + '"></i></span>' +
              '<h3 style="font-size:1.2rem;font-weight:700;">' + ch.name + '</h3>' +
            '</div>' +
            '<div style="display:flex;flex-direction:column;gap:12px;">' +
              ch.services.map(s => {
                const price = s.setupFee || s.monthlyFee || s.monthlyFeeA || 0;
                return '<div style="display:flex;justify-content:space-between;align-items:center;padding:12px;background:var(--bg-elevated);border-radius:8px;">' +
                  '<div><strong>' + s.name + '</strong><br><span style="font-size:0.85rem;color:var(--text-muted);">' + s.desc + '</span></div>' +
                  '<button class="btn btn-secondary" style="padding:8px 16px;font-size:0.85rem;" onclick="addToCart(\\'' + s.id + '\\', \\'' + ch.name + ' ' + s.name + '\\', ' + price + ')">' + (price/10000) + '만원</button>' +
                '</div>';
              }).join('') +
            '</div>' +
          '</div>';
        }).join('');
      }
      
      function getWebsiteContent() {
        const packages = ${JSON.stringify(WEBSITE_PACKAGES)};
        return '<div class="pricing-grid">' + packages.map(p => {
          const isRec = p.recommended;
          return '<div class="pricing-card' + (isRec ? ' featured' : '') + '">' +
            (isRec ? '<span class="pricing-badge">추천</span>' : '') +
            '<div class="pricing-name">' + p.type + ' ' + p.name + '</div>' +
            '<div class="pricing-desc">' + p.subtitle + '</div>' +
            '<div class="pricing-original">정가 ' + (p.originalPrice/10000).toLocaleString() + '만원</div>' +
            '<div class="pricing-price">' + (p.price/10000).toLocaleString() + '<span>만원</span></div>' +
            '<ul class="pricing-features">' + p.includes.map(i => '<li>' + i + '</li>').join('') + '</ul>' +
            '<button class="btn ' + (isRec ? 'btn-primary' : 'btn-secondary') + '" onclick="addToCart(\\'' + p.id + '\\', \\'' + p.name + '\\', ' + p.price + ')">선택하기</button>' +
          '</div>';
        }).join('') + '</div>';
      }
      
      function getConsultingContent() {
        const options = ${JSON.stringify(CONSULTING_OPTIONS)};
        return '<div class="pricing-grid">' + options.map(o => {
          return '<div class="pricing-card">' +
            '<div class="pricing-name">' + o.badge + '</div>' +
            '<div class="pricing-desc">' + o.subtitle + ' (' + o.period + ')</div>' +
            '<div class="pricing-price">' + (o.monthlyFee/10000) + '<span>만원/월</span></div>' +
            '<ul class="pricing-features">' + o.tasks.map(t => '<li>' + t + '</li>').join('') + '</ul>' +
            '<button class="btn btn-secondary" onclick="addToCart(\\'' + o.id + '\\', \\'' + o.name + '\\', ' + o.totalPrice + ')">선택하기</button>' +
          '</div>';
        }).join('') + '</div>';
      }
      
      function getVideoContent() {
        const videos = ${JSON.stringify(ADDON_SERVICES.filter(s => s.category === 'video'))};
        return '<div class="cards-grid">' + videos.map(v => {
          return '<div class="card">' +
            '<div class="card-title">' + v.name + '</div>' +
            '<div class="card-description">' + v.desc + '</div>' +
            '<div style="margin-top:16px;display:flex;justify-content:space-between;align-items:center;">' +
              '<span style="font-size:1.25rem;font-weight:700;color:var(--accent-primary);">' + (v.price/10000) + '만원</span>' +
              '<button class="btn btn-secondary" style="padding:8px 16px;" onclick="addToCart(\\'' + v.id + '\\', \\'' + v.name + '\\', ' + v.price + ')">담기</button>' +
            '</div>' +
          '</div>';
        }).join('') + '</div>';
      }
      
      function getAddonContent() {
        const addons = ${JSON.stringify(ADDON_SERVICES.filter(s => !s.category || s.category !== 'video'))};
        return '<div class="cards-grid">' + addons.map(a => {
          return '<div class="card">' +
            '<div class="card-title">' + a.name + '</div>' +
            '<div class="card-description">' + a.desc + '</div>' +
            '<div style="margin-top:16px;display:flex;justify-content:space-between;align-items:center;">' +
              '<span style="font-size:1.25rem;font-weight:700;color:var(--accent-primary);">' + (a.price/10000) + '만원</span>' +
              '<button class="btn btn-secondary" style="padding:8px 16px;" onclick="addToCart(\\'' + a.id + '\\', \\'' + a.name + '\\', ' + a.price + ')">담기</button>' +
            '</div>' +
          '</div>';
        }).join('') + '</div>';
      }
      
      // Cart Functions
      function addToCart(id, name, price) {
        cart.push({ id, name, price });
        updateCartUI();
        closeServiceModal();
      }
      
      function updateCartUI() {
        const floating = document.getElementById('cart-floating');
        const countEl = document.getElementById('cart-count');
        const totalEl = document.getElementById('cart-total');
        
        if (cart.length > 0) {
          floating.classList.add('visible');
          countEl.textContent = cart.length;
          const total = cart.reduce((sum, item) => sum + item.price, 0);
          totalEl.textContent = '₩' + total.toLocaleString();
        } else {
          floating.classList.remove('visible');
        }
      }
      
      async function checkout() {
        if (cart.length === 0) return;
        
        try {
          const res = await fetch('/api/payment/prepare', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: cart })
          });
          const data = await res.json();
          
          if (data.orderId) {
            const portone = PortOne;
            const result = await portone.requestPayment({
              storeId: data.storeId,
              channelKey: data.channelKey,
              paymentId: data.orderId,
              orderName: data.orderName,
              totalAmount: data.totalAmount,
              currency: 'KRW',
              payMethod: 'CARD'
            });
            
            if (result.code === undefined) {
              await fetch('/api/payment/complete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  orderId: data.orderId,
                  orderName: data.orderName,
                  totalAmount: data.totalAmount,
                  items: cart
                })
              });
              cart = [];
              updateCartUI();
              alert('결제가 완료되었습니다! 담당자가 곧 연락드리겠습니다.');
            }
          }
        } catch (e) {
          console.error('Checkout error:', e);
          alert('결제 중 오류가 발생했습니다.');
        }
      }
      
      // Auth Check
      async function checkAuth() {
        try {
          const res = await fetch('/api/auth/me');
          const data = await res.json();
          const btn = document.getElementById('auth-btn');
          if (data.user) {
            btn.innerHTML = '<i class="fas fa-user"></i> ' + data.user.name;
            btn.href = '/my';
          }
        } catch (e) {}
      }
      
      // Initialize
      document.addEventListener('DOMContentLoaded', () => {
        renderPortfolio('all');
        checkAuth();
      });
      
      // Smooth scroll for anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });
    </script>
</body>
</html>`;
}

