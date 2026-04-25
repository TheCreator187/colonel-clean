/* ═══════════════════════════════════════════════
   COLONEL CLEAN — NYC Dark Editorial JS
   Interactive Features & Animations
   ═══════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {

    // ──── LOADER ────
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
        document.querySelector('.hero').classList.add('loaded');
    }, 2200);

    // ──── CURSOR GLOW (desktop only) ────
    const cursorGlow = document.getElementById('cursorGlow');
    if (window.innerWidth > 768) {
        let glowVisible = false;
        document.addEventListener('mousemove', (e) => {
            if (!glowVisible) {
                cursorGlow.style.opacity = '1';
                glowVisible = true;
            }
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
    }

    // ──── NAVBAR ────
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    // Scroll style
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ──── SCROLL ANIMATIONS ────
    const animatedEls = document.querySelectorAll('.animate-in');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 80);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        animatedEls.forEach(el => observer.observe(el));
    } else {
        animatedEls.forEach(el => el.classList.add('visible'));
    }

    // ──── HERO PARALLAX ────
    const heroBg = document.querySelector('.hero-bg-img');
    if (heroBg && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scroll = window.scrollY;
            if (scroll < window.innerHeight) {
                heroBg.style.transform = `scale(1.1) translateY(${scroll * 0.3}px)`;
            }
        });
    }

    // ──── HERO PARTICLES ────
    const particleContainer = document.getElementById('heroParticles');
    if (particleContainer) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            const size = Math.random() * 4 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
            // Random colors: yellow, red, blue
            const colors = ['#ffe600', '#ff2d2d', '#2d5af0', '#ffe600'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particleContainer.appendChild(particle);
        }
    }

    // ──── ANIMATED COUNTERS ────
    const counters = document.querySelectorAll('.stat-number[data-target]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                animateCounter(el, target);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    function animateCounter(el, target) {
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
                // Add + sign for large numbers
                if (target >= 1000) {
                    el.textContent = target.toLocaleString() + '+';
                } else {
                    el.textContent = Math.floor(current);
                }
            } else {
                el.textContent = Math.floor(current);
            }
        }, 16);
    }

    // ──── BEFORE/AFTER SLIDER ────
    const baContainer = document.getElementById('baContainer');
    const baSlider = document.getElementById('baSlider');
    const baOverlay = document.getElementById('baOverlay');

    if (baContainer && baSlider && baOverlay) {
        let isDragging = false;

        function updateSlider(x) {
            const rect = baContainer.getBoundingClientRect();
            let pos = ((x - rect.left) / rect.width) * 100;
            pos = Math.max(5, Math.min(95, pos));
            baSlider.style.left = pos + '%';
            baOverlay.style.width = (100 - pos) + '%';
        }

        baContainer.addEventListener('mousedown', (e) => {
            isDragging = true;
            updateSlider(e.clientX);
        });
        document.addEventListener('mousemove', (e) => {
            if (isDragging) updateSlider(e.clientX);
        });
        document.addEventListener('mouseup', () => isDragging = false);

        // Touch support
        baContainer.addEventListener('touchstart', (e) => {
            isDragging = true;
            updateSlider(e.touches[0].clientX);
        });
        document.addEventListener('touchmove', (e) => {
            if (isDragging) updateSlider(e.touches[0].clientX);
        });
        document.addEventListener('touchend', () => isDragging = false);
    }

    // ──── HIT COUNTER ────
    let baseHits = 42069;
    const today = new Date();
    const dynamicHits = baseHits + (today.getMonth() * 1000) + (today.getDate() * 100) + today.getHours() * 5;
    const counterElement = document.getElementById("counter-value");
    const formatCounter = (num) => num.toString().padStart(7, '0');

    if (counterElement) {
        counterElement.textContent = formatCounter(dynamicHits);
        setInterval(() => {
            if (Math.random() > 0.7) {
                let current = parseInt(counterElement.textContent, 10);
                counterElement.textContent = formatCounter(current + 1);
            }
        }, 3000);
    }

    // ──── FOOTER YEAR ────
    const yearSpan = document.getElementById("current-year");
    if (yearSpan) {
        yearSpan.textContent = today.getFullYear();
    }

    // ──── CONTACT FORM ────
    const quoteForm = document.getElementById('quoteForm');
    const formSubmit = document.getElementById('formSubmit');

    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('formName').value;
            const phone = document.getElementById('formPhone').value;
            const service = document.getElementById('formService').value;
            const message = document.getElementById('formMessage').value;

            // Visual feedback
            formSubmit.querySelector('span:first-child').textContent = '✓ Request Sent!';
            quoteForm.classList.add('submitted');

            // Reset after 3 seconds
            setTimeout(() => {
                formSubmit.querySelector('span:first-child').textContent = 'Get Free Estimate';
                quoteForm.classList.remove('submitted');
                quoteForm.reset();
            }, 3000);
        });
    }

    // ──── SERVICE CARD TILT EFFECT ────
    if (window.innerWidth > 768) {
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 15;
                const rotateY = (centerX - x) / 15;
                card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }

    // ──── SMOOTH SCROLL for all internal links ────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ──── TYPEWRITER on hero tagline ────
    const tagline = document.querySelector('.tagline-quote');
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        tagline.style.borderRight = '2px solid var(--cc-yellow)';
        let i = 0;
        function typeWrite() {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWrite, 60);
            } else {
                // Remove cursor after done
                setTimeout(() => {
                    tagline.style.borderRight = 'none';
                }, 1000);
            }
        }
        // Start after loader
        setTimeout(typeWrite, 2500);
    }

});
