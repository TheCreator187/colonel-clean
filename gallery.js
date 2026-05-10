/* ═══════════════════════════════════════════════
   COLONEL CLEAN — GALLERY PAGE JS
   Immersive B/A Slider + Navigation
   ═══════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {

    // ──── MOBILE NAV ────
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('open');
        });
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    // ──── FOOTER YEAR ────
    const yearSpan = document.getElementById("current-year");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // ──── FULLSCREEN B/A SLIDERS ────
    const pairs = document.querySelectorAll('.gallery-pair');

    pairs.forEach(pair => {
        const images = pair.querySelector('.gp-images');
        const beforeWrap = pair.querySelector('.gp-before-wrap');
        const sliderLine = pair.querySelector('.gp-slider-line');
        const handle = pair.querySelector('.gp-handle');

        if (!images || !beforeWrap) return;

        let isDragging = false;

        function updatePosition(x) {
            const rect = images.getBoundingClientRect();
            let pos = ((x - rect.left) / rect.width) * 100;
            pos = Math.max(3, Math.min(97, pos));

            beforeWrap.style.clipPath = `polygon(0 0, ${pos}% 0, ${pos}% 100%, 0 100%)`;
            sliderLine.style.left = pos + '%';
            handle.style.left = pos + '%';
        }

        // Mouse events
        images.addEventListener('mousedown', (e) => {
            isDragging = true;
            updatePosition(e.clientX);
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                updatePosition(e.clientX);
                e.preventDefault();
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        // Touch events
        images.addEventListener('touchstart', (e) => {
            isDragging = true;
            updatePosition(e.touches[0].clientX);
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            if (isDragging) {
                updatePosition(e.touches[0].clientX);
            }
        }, { passive: true });

        document.addEventListener('touchend', () => {
            isDragging = false;
        });
    });

    // ──── SCROLL FADE-IN ────
    const animatedEls = document.querySelectorAll('.gallery-pair');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('gp-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        animatedEls.forEach(el => observer.observe(el));
    }
});
