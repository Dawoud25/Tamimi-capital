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
    
    console.log('Initializing hero video...');
    
    // Force all necessary attributes
    video.muted = true;
    video.autoplay = true;
    video.loop = true;
    video.controls = false;
    video.playsinline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.removeAttribute('controls');
    
    // Set preload and other attributes
    video.preload = 'auto';
    video.setAttribute('disablepictureinpicture', '');
    
    // Prevent right-click context menu on video
    video.addEventListener('contextmenu', (e) => e.preventDefault());
    
    // Handle load events
    const onVideoReady = () => {
        console.log('Video ready - showing and attempting autoplay');
        video.style.opacity = '1';
        video.classList.add('loaded');
        
        // Attempt autoplay with retry mechanism
        const attemptPlay = () => {
            video.play()
                .then(() => {
                    console.log('Video autoplay successful');
                })
                .catch(error => {
                    console.log('Autoplay failed:', error.message);
                    // Try again after a short delay
                    setTimeout(attemptPlay, 1000);
                });
        };
        
        attemptPlay();
    };
    
    // Listen for various ready states
    if (video.readyState >= 3) {
        onVideoReady();
    } else {
        video.addEventListener('canplay', onVideoReady, { once: true });
        video.addEventListener('loadeddata', onVideoReady, { once: true });
    }
    
    // Force load if needed
    video.load();
    
    // Additional fallback - try play on any user interaction
    const playOnInteraction = () => {
        if (video.paused) {
            video.play().catch(e => console.log('Play on interaction failed:', e.message));
        }
    };
    
    ['click', 'touchstart', 'keydown'].forEach(event => {
        document.addEventListener(event, playOnInteraction, { once: true, passive: true });
    });
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
