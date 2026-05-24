document.addEventListener("DOMContentLoaded", () => {

    // Mobile nav
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

    // Footer year
    const yearSpan = document.getElementById("current-year");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // Before / after sliders
    document.querySelectorAll('.gallery-pair').forEach(pair => {
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
            images.setAttribute('aria-valuenow', Math.round(pos));
        }

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

        images.addEventListener('touchstart', (e) => {
            isDragging = true;
            updatePosition(e.touches[0].clientX);
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            if (isDragging) updatePosition(e.touches[0].clientX);
        }, { passive: true });

        document.addEventListener('touchend', () => {
            isDragging = false;
        });
    });

    // Sticky section nav
    const subNavLinks = document.querySelectorAll('.gnf-pill');
    const sections = ['transformations', 'field-photos', 'action-clips'];

    function updateSubNav() {
        let current = sections[0];
        sections.forEach(id => {
            const section = document.getElementById(id);
            if (section && window.scrollY >= section.offsetTop - 160) {
                current = id;
            }
        });

        subNavLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    }

    window.addEventListener('scroll', updateSubNav, { passive: true });
    updateSubNav();

    // Video hover play
    document.querySelectorAll('.video-item').forEach(item => {
        const video = item.querySelector('video');
        if (!video) return;

        item.addEventListener('mouseenter', () => {
            video.play().catch(() => {});
            item.classList.add('is-playing');
        });

        item.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
            item.classList.remove('is-playing');
        });

        item.addEventListener('click', () => {
            if (video.paused) {
                video.play().catch(() => {});
                item.classList.add('is-playing');
            } else {
                video.pause();
                item.classList.remove('is-playing');
            }
        });
    });

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const photoButtons = Array.from(document.querySelectorAll('[data-lightbox]'));
    let currentPhotoIndex = 0;

    function openLightbox(index) {
        if (!lightbox || !lightboxImg || !photoButtons.length) return;
        currentPhotoIndex = index;
        const src = photoButtons[index].dataset.lightbox;
        lightboxImg.src = src;
        lightboxImg.alt = photoButtons[index].querySelector('img')?.alt || 'Work photo';
        lightbox.hidden = false;
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.hidden = true;
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function showPhoto(step) {
        const next = (currentPhotoIndex + step + photoButtons.length) % photoButtons.length;
        openLightbox(next);
    }

    photoButtons.forEach((btn, i) => {
        btn.addEventListener('click', () => openLightbox(i));
    });

    lightboxClose?.addEventListener('click', closeLightbox);
    lightboxPrev?.addEventListener('click', () => showPhoto(-1));
    lightboxNext?.addEventListener('click', () => showPhoto(1));

    lightbox?.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (lightbox?.hidden) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPhoto(-1);
        if (e.key === 'ArrowRight') showPhoto(1);
    });

    // Scroll fade-in
    const animatedEls = document.querySelectorAll('.gallery-pair, .grid-item, .video-item, .section-header.animate-in');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('gp-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

        animatedEls.forEach(el => observer.observe(el));
    } else {
        animatedEls.forEach(el => el.classList.add('gp-visible'));
    }
});
