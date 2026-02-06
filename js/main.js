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
    const video = document.querySelector('.hero-video');
    if (!video) return;
    
    console.log('🎬 NUCLEAR VIDEO INITIALIZATION STARTING...');
    
    // NUCLEAR OPTION: Remove controls in every possible way
    video.removeAttribute('controls');
    video.controls = false;
    
    // Force all necessary attributes AGGRESSIVELY
    video.muted = true;
    video.autoplay = true;
    video.loop = true;
    video.playsinline = true;
    video.preload = 'auto';
    
    // Set attributes via DOM manipulation too
    video.setAttribute('muted', '');
    video.setAttribute('autoplay', '');
    video.setAttribute('loop', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('preload', 'auto');
    video.setAttribute('disablepictureinpicture', '');
    
    // FORCE remove any controls that might appear
    const removeControls = () => {
        video.controls = false;
        video.removeAttribute('controls');
        
        // Remove any shadow DOM controls (aggressive)
        try {
            const shadowRoot = video.shadowRoot;
            if (shadowRoot) {
                const controls = shadowRoot.querySelectorAll('[role="button"], button, [role="slider"]');
                controls.forEach(control => control.remove());
            }
        } catch (e) {
            // Ignore shadow DOM access errors
        }
    };
    
    // Apply control removal immediately and repeatedly
    removeControls();
    setInterval(removeControls, 100); // Every 100ms - very aggressive
    
    // Prevent ALL possible interactions
    ['contextmenu', 'selectstart', 'dragstart'].forEach(event => {
        video.addEventListener(event, (e) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }, { passive: false });
    });
    
    // Handle video loading and autoplay with multiple fallbacks
    const handleVideoReady = () => {
        console.log('🎬 Video ready - forcing visibility and autoplay');
        removeControls(); // Remove controls again
        
        video.style.opacity = '1';
        video.classList.add('loaded');
        
        // Multiple autoplay attempts
        const playAttempts = [
            () => video.play(),
            () => {
                video.muted = true;
                return video.play();
            },
            () => {
                video.load();
                video.muted = true;
                return video.play();
            }
        ];
        
        const tryPlay = (attemptIndex = 0) => {
            if (attemptIndex >= playAttempts.length) {
                console.log('🎬 All autoplay attempts exhausted');
                return;
            }
            
            playAttempts[attemptIndex]()
                .then(() => {
                    console.log(`🎬 Autoplay successful on attempt ${attemptIndex + 1}`);
                })
                .catch(error => {
                    console.log(`🎬 Autoplay attempt ${attemptIndex + 1} failed:`, error.message);
                    setTimeout(() => tryPlay(attemptIndex + 1), 500);
                });
        };
        
        tryPlay();
    };
    
    // Multiple ready state listeners
    if (video.readyState >= 3) {
        handleVideoReady();
    } else {
        video.addEventListener('canplay', handleVideoReady, { once: true });
        video.addEventListener('loadeddata', handleVideoReady, { once: true });
        video.addEventListener('loadedmetadata', handleVideoReady, { once: true });
    }
    
    // Force load
    video.load();
    
    // User interaction fallbacks - try play on ANY user activity
    const userEvents = ['click', 'touchstart', 'keydown', 'scroll', 'mousemove'];
    const playOnInteraction = () => {
        if (video.paused) {
            removeControls();
            video.muted = true;
            video.play()
                .then(() => console.log('🎬 Play on user interaction successful'))
                .catch(e => console.log('🎬 Play on interaction failed:', e.message));
        }
    };
    
    userEvents.forEach(event => {
        document.addEventListener(event, playOnInteraction, { 
            once: true, 
            passive: event !== 'contextmenu' 
        });
    });
    
    console.log('🎬 NUCLEAR VIDEO INITIALIZATION COMPLETE');
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;
        
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
