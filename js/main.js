/* =====================================================
   D AL TAMIMI CAPITAL - JavaScript
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initMobileNav();
    initScrollAnimations();
    initCookieBanner();
    initVideo();
});

function initHeader() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    const onScroll = () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

function initMobileNav() {
    const toggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.nav-mobile');
    
    if (!toggle || !nav) return;
    
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });
    
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    
    if (!elements.length) return;
    
    if (!('IntersectionObserver' in window)) {
        elements.forEach(el => el.classList.add('visible'));
        return;
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    elements.forEach(el => observer.observe(el));
}

function initCookieBanner() {
    const banner = document.querySelector('.cookie-banner');
    const acceptBtn = document.querySelector('.cookie-accept');
    
    if (!banner) return;
    
    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => banner.classList.add('show'), 2000);
    }
    
    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            banner.classList.remove('show');
        });
    }
}

function initVideo() {
    console.log('🎬 OPTIMIZED VIDEO INITIALIZATION...');
    
    const video = document.querySelector('.hero-video');
    if (!video) {
        console.error('Video element not found');
        return;
    }
    
    console.log('📺 Video found - applying optimizations');
    
    // Ultra simple setup
    video.muted = true;
    video.controls = false;
    video.removeAttribute('controls');
    video.preload = 'auto';
    
    // Get video duration for seamless looping animation
    video.addEventListener('loadedmetadata', () => {
        const duration = video.duration;
        console.log(`📹 Video duration: ${duration}s`);
        
        // Set CSS custom property for animation duration
        document.documentElement.style.setProperty('--video-duration', duration + 's');
    });
    
    // Show video immediately with background
    video.style.opacity = '1';
    video.classList.add('loaded');
    
    // Enhanced autoplay with faster retry
    const attemptPlay = (retryCount = 0) => {
        video.play()
            .then(() => {
                console.log('✅ Video autoplay successful');
                // Remove background image once video is playing
                setTimeout(() => {
                    video.style.backgroundImage = 'none';
                }, 1000);
            })
            .catch(e => {
                console.log(`⚠️ Autoplay blocked (attempt ${retryCount + 1}):`, e.message);
                if (retryCount < 3) {
                    setTimeout(() => attemptPlay(retryCount + 1), 500);
                }
            });
    };
    
    // Try to play after short delay
    setTimeout(attemptPlay, 100);
    
    // Play on any user interaction
    const playOnInteraction = () => {
        attemptPlay();
        // Remove background image when user initiates play
        video.style.backgroundImage = 'none';
    };
    
    ['click', 'touchstart', 'keydown'].forEach(event => {
        document.addEventListener(event, playOnInteraction, { once: true });
    });
    
    console.log('🎬 Optimized video initialization complete');
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#' || href === '#!') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
            window.scrollTo({
                top: target.offsetTop - headerHeight - 20,
                behavior: 'smooth'
            });
        }
    });
});
