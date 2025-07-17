// Mobile menu functionality
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    
    navLinks.classList.toggle('mobile-active');
    mobileBtn.classList.toggle('active');
}

// Start chat functionality
function startChat() {
    // Check if API key is already set in localStorage
    const savedApiKey = localStorage.getItem('grokani_api_key');
    
    if (savedApiKey && savedApiKey.trim() !== '') {
        // If API key exists, go directly to chat page
        window.location.href = 'chat.html';
    } else {
        // If no API key, go to models selection page
        window.location.href = 'models.html';
    }
}

// Scroll to setup section
function scrollToSetup() {
    const setupSection = document.getElementById('setup');
    setupSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all navigation links
    const navLinks = document.querySelectorAll('.nav-link, .footer-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if it's an internal link (starts with #)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu if open
                    const navLinksContainer = document.querySelector('.nav-links');
                    const mobileBtn = document.querySelector('.mobile-menu-btn');
                    navLinksContainer.classList.remove('mobile-active');
                    mobileBtn.classList.remove('active');
                }
            }
        });
    });
    
    // Add intersection observer for navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');
    
    const observerOptions = {
        rootMargin: '-20% 0px -80% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all nav items
                navItems.forEach(item => item.classList.remove('active'));
                
                // Add active class to corresponding nav item
                const correspondingNavItem = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                if (correspondingNavItem) {
                    correspondingNavItem.classList.add('active');
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    const heroCharacter = document.querySelector('.character-image');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroCharacter) {
            heroCharacter.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Add loading animation
    document.body.classList.add('loaded');
});

// Add CSS for mobile menu and loading states
const additionalStyles = `
    .nav-links.mobile-active {
        display: flex;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(15, 15, 35, 0.95);
        backdrop-filter: blur(20px);
        flex-direction: column;
        padding: 2rem;
        gap: 1rem;
        border-top: 1px solid var(--card-border);
    }
    
    .mobile-menu-btn.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-btn.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-btn.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
    
    body:not(.loaded) {
        opacity: 0;
    }
    
    body.loaded {
        opacity: 1;
        transition: opacity 0.5s ease-in-out;
    }
    
    @media (max-width: 768px) {
        .nav-links {
            display: none;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Add error handling for API links
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('api-link') && !e.target.classList.contains('disabled')) {
        // Track API link clicks (you could add analytics here)
        console.log('API link clicked:', e.target.textContent);
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        const mobileBtn = document.querySelector('.mobile-menu-btn');
        navLinks.classList.remove('mobile-active');
        mobileBtn.classList.remove('active');
    }
    
    // Enter key on CTA buttons
    if (e.key === 'Enter' && e.target.classList.contains('cta-button')) {
        e.target.click();
    }
});

// Add focus management for accessibility
document.addEventListener('DOMContentLoaded', function() {
    // Add focus indicators
    const focusableElements = document.querySelectorAll('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--accent-purple)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
});

// Performance optimization: Lazy load images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease-in-out';
                
                img.onload = function() {
                    this.style.opacity = '1';
                };
                
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
});

// Advanced features for better user experience

// Theme detection and system preference handling
function detectSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Disable animations for users who prefer reduced motion
        document.documentElement.style.setProperty('--transition', 'none');
    }
}

// Enhanced scroll effects
function initAdvancedScrollEffects() {
    const cards = document.querySelectorAll('.feature-card, .model-card, .step');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });
}

// Copy API key functionality (for future use)
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text);
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((resolve, reject) => {
            document.execCommand('copy') ? resolve() : reject();
            textArea.remove();
        });
    }
}

// Enhanced error handling for external links
function handleExternalLinks() {
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add loading state
            this.style.opacity = '0.7';
            this.style.pointerEvents = 'none';
            
            setTimeout(() => {
                this.style.opacity = '1';
                this.style.pointerEvents = 'auto';
            }, 1000);
        });
        
        // Add security attributes
        link.setAttribute('rel', 'noopener noreferrer');
    });
}

// Handle image loading errors with fallback
function handleImageErrors() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Create a fallback SVG image
            const fallbackSvg = `data:image/svg+xml;base64,${btoa(`
                <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#6B46C1;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#A855F7;stop-opacity:1" />
                        </linearGradient>
                    </defs>
                    <circle cx="200" cy="200" r="180" fill="url(#grad)" stroke="#A855F7" stroke-width="4"/>
                    <text x="200" y="180" font-family="Arial, sans-serif" font-size="48" font-weight="bold" text-anchor="middle" fill="white">G</text>
                    <text x="200" y="230" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="white">GrokAni</text>
                </svg>
            `)}`;
            
            this.src = fallbackSvg;
            this.style.background = 'transparent';
        });
        
        // Also handle slow loading
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity for smooth loading
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
}

// Performance monitoring
function initPerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        
        // Track Core Web Vitals (simplified)
        if ('web-vital' in window) {
            // This would integrate with actual Core Web Vitals library
            console.log('Core Web Vitals tracking initialized');
        }
    });
}

// Enhanced mobile experience
function initMobileEnhancements() {
    // Add touch feedback for mobile devices
    if ('ontouchstart' in window) {
        const touchElements = document.querySelectorAll('.cta-button, .feature-card, .model-card');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
        
        // Prevent zoom on double tap for buttons
        const buttons = document.querySelectorAll('button, .cta-button');
        buttons.forEach(button => {
            button.addEventListener('touchend', function(e) {
                e.preventDefault();
            });
        });
    }
}

// Service Worker registration for PWA functionality
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
}

// Initialize all advanced features
document.addEventListener('DOMContentLoaded', function() {
    detectSystemTheme();
    initAdvancedScrollEffects();
    handleExternalLinks();
    handleImageErrors();
    initPerformanceMonitoring();
    initMobileEnhancements();
    registerServiceWorker();
});

// Add structured data for SEO
function addStructuredData() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "GrokAni",
        "description": "Advanced AI voice assistant supporting multiple AI models for natural conversations",
        "url": "https://grokani.com",
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Web Browser",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "author": {
            "@type": "Organization",
            "name": "GrokAni Team"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "150"
        }
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
}

// Initialize structured data
addStructuredData();