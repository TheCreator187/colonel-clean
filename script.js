/* ═══════════════════════════════════════════════
   COLONEL CLEAN — Modern Clean JS
   ═══════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {

    // ──── LOADER ────
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
        document.querySelector('.hero')?.classList.add('loaded');
    }, 1800);

    // ──── NAVBAR ────
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

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

    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 100) {
                current = section.getAttribute('id');
            }
        });
        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, { passive: true });

    // ──── SCROLL ANIMATIONS ────
    const animatedEls = document.querySelectorAll('.animate-in');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => entry.target.classList.add('visible'), index * 60);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
        animatedEls.forEach(el => observer.observe(el));
    } else {
        animatedEls.forEach(el => el.classList.add('visible'));
    }

    // ──── HERO VIDEO PARALLAX ────
    const heroVideo = document.getElementById('heroVideo');
    if (heroVideo && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scroll = window.scrollY;
            if (scroll < window.innerHeight) {
                heroVideo.style.transform = `scale(1.05) translateY(${scroll * 0.15}px)`;
                heroVideo.style.opacity = 1 - (scroll / window.innerHeight) * 0.35;
            }
        }, { passive: true });
    }

    // ──── ANIMATED COUNTERS ────
    const counters = document.querySelectorAll('.stat-number[data-target]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target, parseInt(entry.target.getAttribute('data-target'), 10));
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(counter => counterObserver.observe(counter));

    function animateCounter(el, target) {
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                clearInterval(timer);
                el.textContent = target >= 1000 ? target.toLocaleString() + '+' : target;
            } else {
                el.textContent = Math.floor(current);
            }
        }, 16);
    }

    // ──── BUSINESS CARD FLIP ────
    const cardFlip = document.getElementById('businessCardFlip');
    const cardFlipBtn = document.getElementById('cardFlipBtn');

    function toggleCardFlip() {
        if (!cardFlip) return;
        const flipped = cardFlip.classList.toggle('is-flipped');
        if (cardFlipBtn) cardFlipBtn.setAttribute('aria-pressed', flipped ? 'true' : 'false');
    }

    if (cardFlip) {
        cardFlip.addEventListener('click', toggleCardFlip);
        cardFlip.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleCardFlip();
            }
        });
    }
    if (cardFlipBtn) {
        cardFlipBtn.addEventListener('click', toggleCardFlip);
    }

    // ──── FOOTER YEAR ────
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // ──── CONTACT FORM ────
    const quoteForm = document.getElementById('quoteForm');
    const formSubmit = document.getElementById('formSubmit');

    if (quoteForm && formSubmit) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formSubmit.querySelector('span:first-child').textContent = '✓ Request Sent!';
            quoteForm.classList.add('submitted');
            setTimeout(() => {
                formSubmit.querySelector('span:first-child').textContent = 'Get Free Estimate';
                quoteForm.classList.remove('submitted');
                quoteForm.reset();
            }, 3000);
        });
    }

    // ──── SMOOTH SCROLL ────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});
