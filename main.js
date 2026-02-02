/* =====================================================
   TAMIMI CAPITAL - Minimal JavaScript
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initMobileNav();
    initScrollAnimations();
    initCookieBanner();
});

/* Header scroll behavior */
function initHeader() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    const onScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

/* Mobile navigation */
function initMobileNav() {
    const toggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.nav-mobile');
    
    if (!toggle || !nav) return;
    
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close on link click
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/* Scroll-triggered animations */
function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    
    if (!elements.length || !('IntersectionObserver' in window)) {
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
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => observer.observe(el));
}

/* Cookie banner */
function initCookieBanner() {
    const banner = document.querySelector('.cookie-banner');
    const acceptBtn = document.querySelector('.cookie-accept');
    
    if (!banner) return;
    
    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => banner.classList.add('show'), 1500);
    }
    
    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            banner.classList.remove('show');
        });
    }
}

/* Smooth scroll for anchor links */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
            const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});
