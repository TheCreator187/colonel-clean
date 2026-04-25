// Colonel Clean — Modern Nostalgia Script

document.addEventListener("DOMContentLoaded", () => {
    // 1. Scroll-reveal animations via IntersectionObserver
    const animatedEls = document.querySelectorAll('.animate-in');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger each element slightly
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 120);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        animatedEls.forEach(el => observer.observe(el));
    } else {
        // Fallback: just show everything
        animatedEls.forEach(el => el.classList.add('visible'));
    }

    // 2. Hit Counter (nostalgic touch)
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

    // 3. Footer year
    const yearSpan = document.getElementById("current-year");
    if (yearSpan) {
        yearSpan.textContent = today.getFullYear();
    }
});
