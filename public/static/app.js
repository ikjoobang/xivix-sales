// X I Λ I X - Enhanced Client-Side JavaScript

// ========================================
// ENHANCED SECURITY MEASURES
// ========================================

(function() {
  'use strict';
  
  // Disable developer tools detection
  const devtools = {
    isOpen: false,
    orientation: undefined
  };
  
  const threshold = 160;
  
  const emitEvent = (isOpen, orientation) => {
    globalThis.dispatchEvent(new CustomEvent('devtoolschange', {
      detail: { isOpen, orientation }
    }));
  };

  setInterval(() => {
    const widthThreshold = globalThis.outerWidth - globalThis.innerWidth > threshold;
    const heightThreshold = globalThis.outerHeight - globalThis.innerHeight > threshold;
    const orientation = widthThreshold ? 'vertical' : 'horizontal';

    if (
      !(heightThreshold && widthThreshold) &&
      ((globalThis.Firebug && globalThis.Firebug.chrome && globalThis.Firebug.chrome.isInitialized) || widthThreshold || heightThreshold)
    ) {
      if (!devtools.isOpen || devtools.orientation !== orientation) {
        emitEvent(true, orientation);
      }
      devtools.isOpen = true;
      devtools.orientation = orientation;
    } else {
      if (devtools.isOpen) {
        emitEvent(false, undefined);
      }
      devtools.isOpen = false;
      devtools.orientation = undefined;
    }
  }, 500);

  // Block common shortcuts
  document.addEventListener('keydown', function(e) {
    // F12
    if (e.keyCode === 123) {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+I (DevTools)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
      e.preventDefault();
      return false;
    }
    // Ctrl+U (View Source)
    if (e.ctrlKey && e.keyCode === 85) {
      e.preventDefault();
      return false;
    }
    // Ctrl+S (Save)
    if (e.ctrlKey && e.keyCode === 83) {
      e.preventDefault();
      return false;
    }
  });

  // Disable right-click context menu
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
  });

  // Disable text selection on sensitive elements
  document.addEventListener('selectstart', function(e) {
    if (e.target.closest('.no-select')) {
      e.preventDefault();
      return false;
    }
  });

  // Disable drag
  document.addEventListener('dragstart', function(e) {
    e.preventDefault();
    return false;
  });

  // Disable copy
  document.addEventListener('copy', function(e) {
    if (e.target.closest('.no-select')) {
      e.preventDefault();
      return false;
    }
  });

})();

// ========================================
// SMOOTH SCROLL ENHANCEMENT
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      // Optional: Stop observing after animation
      // animationObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
  animationObserver.observe(el);
});

// ========================================
// PARALLAX EFFECT FOR ORB BACKGROUNDS
// ========================================

let ticking = false;

document.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      const orbs = document.querySelectorAll('.shader-orb');
      
      orbs.forEach((orb, index) => {
        const speed = 0.1 + (index * 0.05);
        const yPos = scrollY * speed;
        orb.style.transform = `translateY(${yPos}px)`;
      });
      
      ticking = false;
    });
    ticking = true;
  }
});

// ========================================
// FORM VALIDATION HELPERS
// ========================================

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePhone = (phone) => {
  const re = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/;
  return re.test(phone.replace(/-/g, ''));
};

// ========================================
// LOCAL STORAGE HELPERS
// ========================================

const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(`xilix_${key}`, JSON.stringify(value));
    } catch (e) {
      console.warn('LocalStorage not available');
    }
  },
  get: (key) => {
    try {
      const item = localStorage.getItem(`xilix_${key}`);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      return null;
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(`xilix_${key}`);
    } catch (e) {
      console.warn('LocalStorage not available');
    }
  }
};

// Save cart state
const saveCartState = () => {
  if (typeof cart !== 'undefined') {
    storage.set('cart', cart);
  }
};

// Load cart state on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedCart = storage.get('cart');
  if (savedCart && typeof cart !== 'undefined') {
    Object.assign(cart, savedCart);
    updateCart();
    updateStepIndicator();
  }
});

// ========================================
// ANALYTICS HELPERS (PLACEHOLDER)
// ========================================

const analytics = {
  track: (event, properties = {}) => {
    console.log('[Analytics]', event, properties);
    // Add your analytics integration here
    // Example: gtag('event', event, properties);
  },
  pageView: (page) => {
    console.log('[Analytics] Page View:', page);
    // Add your analytics integration here
  }
};

// Track page view
analytics.pageView(window.location.pathname);

// ========================================
// ERROR HANDLING
// ========================================

window.addEventListener('error', (e) => {
  console.error('Global Error:', e.message);
  // Add error reporting service here
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled Promise Rejection:', e.reason);
  // Add error reporting service here
});

// ========================================
// PERFORMANCE MONITORING
// ========================================

window.addEventListener('load', () => {
  if ('performance' in window) {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`[Performance] Page Load Time: ${pageLoadTime}ms`);
  }
});

console.log('%c X I Λ I X ', 'background: #000; color: #fff; font-size: 20px; font-weight: bold; padding: 10px 20px;');
console.log('%c AI Marketing Agency ', 'color: #888; font-size: 12px;');
