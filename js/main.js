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
    if (!video) {
        console.log('Video element not found');
        return;
    }

    console.log('Initializing video...');

    // FORCE REMOVE ALL CONTROLS
    video.controls = false;
    video.removeAttribute('controls');
    
    // MUTE THE VIDEO (Required for auto-play in most browsers)
    video.muted = true;
    video.volume = 0;
    
    // Additional attributes for better autoplay support
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('preload', 'auto');
    
    // Preload metadata
    video.load();

    // Add loaded event listeners FIRST
    video.addEventListener('loadeddata', () => {
        console.log('Video loadeddata event fired');
        video.classList.add('loaded');
    });

    video.addEventListener('canplay', () => {
        console.log('Video canplay event fired');
        video.classList.add('loaded');
    });

    video.addEventListener('loadedmetadata', () => {
        console.log('Video metadata loaded');
        video.classList.add('loaded');
    });

    video.addEventListener('error', (e) => {
        console.error('Video error:', e);
        video.classList.add('loaded'); // Show poster/fallback on error
    });

    // Also check if already ready
    if (video.readyState >= 3) {
        video.classList.add('loaded');
    }

    // Try to auto-play (muted videos usually work)
    const playVideo = () => {
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    console.log('Video autoplay successful');
                    video.classList.add('playing');
                })
                .catch(error => {
                    console.log('Autoplay blocked or failed:', error.message);
                    // Add a click-to-play fallback
                    video.classList.add('click-to-play');
                    
                    // On user interaction, try to play
                    document.addEventListener('click', () => {
                        video.play().catch(e => console.log('Manual play failed:', e));
                    }, { once: true });
                });
        }
    };

    // Try to play immediately
    playVideo();

    // Pause/play based on visibility
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play().catch(() => {});
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.1 });
        observer.observe(video);
    }
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
