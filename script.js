/* -----------------------------------------------------------------------------
   Aryaman Gurha - Personal Website JavaScript (script.js)
   Luxury Editorial Micro-interactions & Navigation State
   ----------------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initScrollObserver();
    initFadeInAnimations();
    initProjectsExpand();
    initMetricsObserver();
});

/**
 * Mobile Navigation Menu Toggle
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('js-menu-toggle');
    const navLinks = document.getElementById('js-nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');

    if (!menuToggle || !navLinks) return;

    // Toggle menu state
    menuToggle.addEventListener('click', () => {
        const isOpened = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isOpened);
        navLinks.classList.toggle('open');
    });

    // Close menu when navigation links are clicked
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.setAttribute('aria-expanded', 'false');
            navLinks.classList.remove('open');
        });
    });

    // Close menu when clicking outside navigation container
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target) && navLinks.classList.contains('open')) {
            menuToggle.setAttribute('aria-expanded', 'false');
            navLinks.classList.remove('open');
        }
    });
}

/**
 * Scroll Observer: updates header appearance and highlights active navigation link
 */
function initScrollObserver() {
    const header = document.querySelector('.site-header');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!header) return;

    // Adjust navigation background opacity on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.style.backgroundColor = 'rgba(250, 246, 240, 0.98)';
            header.style.boxShadow = '0 1px 15px rgba(0, 0, 0, 0.01)';
        } else {
            header.style.backgroundColor = 'rgba(250, 246, 240, 0.94)';
            header.style.boxShadow = 'none';
        }
    });

    // IntersectionObserver options for highlighting the active section link
    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px', // Target middle segment of the viewport
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

/**
 * Restrained Reveal Animations on Scroll
 */
function initFadeInAnimations() {
    const fadeElements = document.querySelectorAll('.section, .timeline-item, .project-card, .leadership-row, .achievement-item-row');

    if (!('IntersectionObserver' in window)) {
        fadeElements.forEach(el => el.classList.add('visible'));
        return;
    }

    const fadeObserverOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px', // Trigger just before elements scroll in
        threshold: 0.05
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, fadeObserverOptions);

    fadeElements.forEach(element => {
        element.classList.add('fade-in-up');
        fadeObserver.observe(element);
    });
}

/**
 * Click-to-Expand Case Study Details for Project Cards
 */
function initProjectsExpand() {
    const expandButtons = document.querySelectorAll('.btn-expand');

    expandButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.project-card');
            const details = card.querySelector('.project-card-details');
            const isExpanded = card.classList.contains('expanded');
            const btnText = btn.querySelector('.btn-text');

            // Close other open project cards for clean layout rhythm
            document.querySelectorAll('.project-card').forEach(otherCard => {
                if (otherCard !== card && otherCard.classList.contains('expanded')) {
                    otherCard.classList.remove('expanded');
                    const otherDetails = otherCard.querySelector('.project-card-details');
                    otherDetails.style.maxHeight = '0px';
                    const otherBtn = otherCard.querySelector('.btn-expand');
                    otherBtn.setAttribute('aria-expanded', 'false');
                    otherCard.querySelector('.btn-text').textContent = 'Read Case Study';
                }
            });

            // Toggle current card
            if (isExpanded) {
                card.classList.remove('expanded');
                details.style.maxHeight = '0px';
                btn.setAttribute('aria-expanded', 'false');
                btnText.textContent = 'Read Case Study';
            } else {
                card.classList.add('expanded');
                // Calculate actual height dynamically to handle variable text wraps
                details.style.maxHeight = details.scrollHeight + 'px';
                btn.setAttribute('aria-expanded', 'true');
                btnText.textContent = 'Close Case Study';
            }
        });
    });

    // Recalculate expanded details heights on window resize
    window.addEventListener('resize', () => {
        document.querySelectorAll('.project-card.expanded').forEach(card => {
            const details = card.querySelector('.project-card-details');
            details.style.maxHeight = details.scrollHeight + 'px';
        });
    });
}

/**
 * Trigger Metric Counters Count-up on Viewport Entry
 */
function initMetricsObserver() {
    const metricsGrid = document.querySelector('.metrics-grid');
    
    if (!metricsGrid) return;

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observerInstance.unobserve(entry.target); // Trigger count-up only once
            }
        });
    }, { threshold: 0.1 });

    observer.observe(metricsGrid);
}

/**
 * Animated count-up engine supporting both floats and integers
 */
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const duration = 1200; // Total count-up animation duration in milliseconds
    const frameRate = 1000 / 60; // 60fps update target
    const totalFrames = Math.round(duration / frameRate);

    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const isFloat = target % 1 !== 0;
        let currentFrame = 0;

        const countUp = () => {
            currentFrame++;
            const progress = currentFrame / totalFrames;
            // Ease-out quad formula for premium deceleration
            const easeProgress = progress * (2 - progress); 
            const currentValue = target * easeProgress;

            if (currentFrame < totalFrames) {
                if (isFloat) {
                    counter.innerText = currentValue.toFixed(1);
                } else {
                    counter.innerText = Math.round(currentValue);
                }
                requestAnimationFrame(countUp);
            } else {
                if (isFloat) {
                    counter.innerText = target.toFixed(1);
                } else {
                    counter.innerText = target;
                }
            }
        };

        requestAnimationFrame(countUp);
    });
}
