// Simple scroll detection for header
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    const scrollThreshold = 50;
    
    function updateHeader() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    updateHeader();
    window.addEventListener('scroll', updateHeader);
});
