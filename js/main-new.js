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
    console.log('🎬 INITIALIZING HYBRID VIDEO SYSTEM...');
    
    // Detect Safari
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || 
                     /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    console.log(`🔍 Browser detection: ${isSafari ? 'SAFARI' : 'NON-SAFARI'}`);
    
    if (isSafari) {
        initCanvasVideo();
    } else {
        initFallbackVideo();
    }
}

function initCanvasVideo() {
    console.log('🎨 INITIALIZING CANVAS VIDEO FOR SAFARI...');
    
    const canvas = document.getElementById('heroCanvas');
    const video = document.getElementById('heroVideoHidden');
    
    if (!canvas || !video) {
        console.error('Canvas or hidden video not found');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    let animationId;
    
    // Resize canvas to match container
    function resizeCanvas() {
        const hero = document.querySelector('.hero');
        if (hero) {
            canvas.width = hero.offsetWidth;
            canvas.height = hero.offsetHeight;
            console.log(`📐 Canvas resized to ${canvas.width}x${canvas.height}`);
        }
    }
    
    // Render video frames to canvas
    function renderFrame() {
        if (video.readyState >= video.HAVE_CURRENT_DATA) {
            // Calculate aspect ratio and positioning
            const videoAspect = video.videoWidth / video.videoHeight;
            const canvasAspect = canvas.width / canvas.height;
            
            let sx, sy, sw, sh;
            
            if (videoAspect > canvasAspect) {
                // Video is wider - crop sides
                sh = video.videoHeight;
                sw = sh * canvasAspect;
                sx = (video.videoWidth - sw) / 2;
                sy = 0;
            } else {
                // Video is taller - crop top/bottom
                sw = video.videoWidth;
                sh = sw / canvasAspect;
                sx = 0;
                sy = (video.videoHeight - sh) / 2;
            }
            
            ctx.drawImage(video, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
        }
        animationId = requestAnimationFrame(renderFrame);
    }
    
    // Initialize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // AGGRESSIVE video setup for Safari
    video.muted = true;
    video.volume = 0;
    video.controls = false;
    video.removeAttribute('controls');
    
    video.addEventListener('loadeddata', () => {
        console.log('✅ Safari video loaded, starting canvas rendering');
        renderFrame();
        canvas.style.opacity = '1';
    });
    
    video.addEventListener('canplay', () => {
        console.log('✅ Safari video can play');
        if (video.paused) {
            video.play().catch(console.log);
        }
    });
    
    // Force play attempts
    const forcePlay = () => {
        video.muted = true;
        video.controls = false;
        video.play()
            .then(() => console.log('✅ Safari video playing via canvas'))
            .catch(e => console.log('⚠️ Safari autoplay blocked:', e.message));
    };
    
    video.addEventListener('loadedmetadata', forcePlay);
    setTimeout(forcePlay, 100);
    setTimeout(forcePlay, 500);
    setTimeout(forcePlay, 1000);
    
    // User interaction fallback
    document.addEventListener('click', forcePlay, { once: true });
    
    console.log('🎨 Canvas video system initialized');
}

function initFallbackVideo() {
    console.log('📺 INITIALIZING FALLBACK VIDEO FOR NON-SAFARI...');
    
    const video = document.querySelector('.hero-video-fallback');
    if (!video) {
        console.error('Fallback video not found');
        return;
    }
    
    // Apply all the nuclear control hiding
    video.muted = true;
    video.autoplay = true;
    video.loop = true;
    video.controls = false;
    video.playsinline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.removeAttribute('controls');
    
    // Remove controls aggressively
    const removeControls = () => {
        video.controls = false;
        video.removeAttribute('controls');
    };
    
    removeControls();
    setInterval(removeControls, 100);
    
    // Handle ready states
    const onVideoReady = () => {
        console.log('✅ Fallback video ready');
        video.style.opacity = '1';
        video.classList.add('loaded');
        
        const attemptPlay = () => {
            video.play()
                .then(() => console.log('✅ Fallback video autoplay successful'))
                .catch(error => {
                    console.log('⚠️ Fallback autoplay failed:', error.message);
                    setTimeout(attemptPlay, 1000);
                });
        };
        
        attemptPlay();
    };
    
    if (video.readyState >= 3) {
        onVideoReady();
    } else {
        video.addEventListener('canplay', onVideoReady, { once: true });
        video.addEventListener('loadeddata', onVideoReady, { once: true });
    }
    
    video.load();
    
    // User interaction fallback
    ['click', 'touchstart', 'keydown'].forEach(event => {
        document.addEventListener(event, () => {
            if (video.paused) {
                removeControls();
                video.muted = true;
                video.play().catch(console.log);
            }
        }, { once: true, passive: true });
    });
    
    console.log('📺 Fallback video system initialized');
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
