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
    console.log('🎬 ENHANCED VIDEO INITIALIZATION WITH SEAMLESS LOOPING...');
    
    const video = document.querySelector('.hero-video');
    if (!video) {
        console.error('Video element not found');
        return;
    }
    
    console.log('📺 Video found - applying enhanced optimizations');
    
    // Ultra simple setup
    video.muted = true;
    video.controls = false;
    video.removeAttribute('controls');
    video.preload = 'auto';
    
    // Enhanced seamless looping
    let videoDuration = 0;
    
    video.addEventListener('loadedmetadata', () => {
        videoDuration = video.duration;
        console.log(`📹 Video duration: ${videoDuration}s`);
        
        // Set CSS custom property for animation duration
        document.documentElement.style.setProperty('--video-duration', videoDuration + 's');
        
        // For truly seamless looping, try to detect when video approaches end
        video.addEventListener('timeupdate', handleSeamlessLoop);
    });
    
    // Enhanced loop handling for smoother transitions
    function handleSeamlessLoop() {
        const currentTime = video.currentTime;
        const timeFromEnd = videoDuration - currentTime;
        
        // If we're within 0.1 seconds of the end, prepare for seamless loop
        if (timeFromEnd <= 0.1 && timeFromEnd > 0) {
            // Subtle opacity change to mask the loop point
            video.style.transition = 'opacity 0.1s ease';
            video.style.opacity = '0.95';
            
            setTimeout(() => {
                video.style.transition = 'opacity 0.2s ease';
                video.style.opacity = '1';
            }, 100);
        }
    }
    
    // Enhanced ended event handling
    video.addEventListener('ended', () => {
        console.log('🔄 Video ended - restarting for seamless loop');
        video.currentTime = 0;
        video.play().catch(e => console.log('Loop restart failed:', e));
    });
    
    // Show video immediately with background
    video.style.opacity = '1';
    video.classList.add('loaded');
    
    // Enhanced autoplay with faster retry
    const attemptPlay = (retryCount = 0) => {
        video.play()
            .then(() => {
                console.log('✅ Video autoplay successful');
                video.classList.add('playing');
                // Remove background image once video is playing smoothly
                setTimeout(() => {
                    video.style.backgroundImage = 'none';
                }, 1500);
            })
            .catch(e => {
                console.log(`⚠️ Autoplay blocked (attempt ${retryCount + 1}):`, e.message);
                if (retryCount < 5) {
                    setTimeout(() => attemptPlay(retryCount + 1), 300);
                }
            });
    };
    
    // Try to play after short delay
    setTimeout(attemptPlay, 100);
    
    // Play on any user interaction
    const playOnInteraction = () => {
        video.play().then(() => {
            video.classList.add('playing');
        }).catch(e => console.log('User play failed:', e));
        
        // Remove background image when user initiates play
        setTimeout(() => {
            video.style.backgroundImage = 'none';
        }, 500);
    };
    
    ['click', 'touchstart', 'keydown', 'scroll'].forEach(event => {
        document.addEventListener(event, playOnInteraction, { once: true });
    });
    
    console.log('🎬 Enhanced seamless video initialization complete');
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
