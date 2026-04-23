document.addEventListener('DOMContentLoaded', () => {

    /* ══════════════════════════════════════════════
       1. TYPEWRITER — cycling role in hero
    ══════════════════════════════════════════════ */
    const roles = [
        'Front-End Developer',
        'UI Enthusiast',
        'Web Craftsman',
        'Problem Solver',
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let deleting = false;
    const typedEl = document.getElementById('typed-role');

    function typeLoop() {
        if (!typedEl) return;
        const word = roles[roleIdx];

        if (!deleting) {
            typedEl.textContent = word.slice(0, charIdx + 1);
            charIdx++;
            if (charIdx === word.length) {
                deleting = true;
                setTimeout(typeLoop, 2200);
                return;
            }
        } else {
            typedEl.textContent = word.slice(0, charIdx - 1);
            charIdx--;
            if (charIdx === 0) {
                deleting = false;
                roleIdx = (roleIdx + 1) % roles.length;
            }
        }

        setTimeout(typeLoop, deleting ? 55 : 95);
    }

    typeLoop();

    /* ══════════════════════════════════════════════
       2. BOOT LOADING BAR on hero CTA
    ══════════════════════════════════════════════ */
    const bootBar = document.getElementById('boot-bar');
    if (bootBar) {
        setTimeout(() => { bootBar.style.width = '100%'; }, 400);
    }

    /* ══════════════════════════════════════════════
       3. SIDEBAR SCROLL SPY
    ══════════════════════════════════════════════ */
    const sections     = document.querySelectorAll('section[id]');
    const sidebarItems = document.querySelectorAll('.sidebar-item');

    if (sections.length && sidebarItems.length) {
        const spyObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    sidebarItems.forEach(item =>
                        item.classList.toggle('active', item.dataset.section === id)
                    );
                }
            });
        }, { threshold: 0.35 });

        sections.forEach(s => spyObserver.observe(s));
    }

    /* ══════════════════════════════════════════════
       4. SCROLL REVEAL (generic data-reveal + cards)
    ══════════════════════════════════════════════ */
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('[data-reveal], .project-card, .git-commit').forEach(el => {
        revealObserver.observe(el);
    });

    /* ══════════════════════════════════════════════
       5. SKILL BADGES — staggered entrance
    ══════════════════════════════════════════════ */
    const skillObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const badges = entry.target.querySelectorAll('.skill-badge');
                badges.forEach((badge, i) => {
                    setTimeout(() => {
                        badge.classList.add('visible');
                        badge.style.transition =
                            `opacity 0.4s ease ${i * 0.06}s, transform 0.4s ease ${i * 0.06}s, border-color 0.3s, background 0.3s, color 0.3s, box-shadow 0.3s`;
                        badge.style.opacity   = '1';
                        badge.style.transform = 'translateY(0)';
                    }, i * 70);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    const skillsGrid = document.getElementById('skills-grid');
    if (skillsGrid) skillObserver.observe(skillsGrid);

    /* ══════════════════════════════════════════════
       6. PROJECT CARD — 3-D mouse tilt
    ══════════════════════════════════════════════ */
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x    = (e.clientX - rect.left) / rect.width  - 0.5;
            const y    = (e.clientY - rect.top)  / rect.height - 0.5;
            card.style.transform =
                `perspective(700px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });

        // Keyboard accessibility
        card.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });

    /* ══════════════════════════════════════════════
       7. MOBILE MENU TOGGLE
    ══════════════════════════════════════════════ */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu    = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const open = mobileMenu.classList.toggle('open');
            mobileMenuBtn.setAttribute('aria-expanded', String(open));
            mobileMenuBtn.querySelector('i').className = open ? 'fas fa-times' : 'fas fa-bars';
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
            });
        });
    }

    /* ══════════════════════════════════════════════
       8. SMOOTH SCROLL for anchor links
    ══════════════════════════════════════════════ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    /* ══════════════════════════════════════════════
       9. SEND BUTTON loading bar
    ══════════════════════════════════════════════ */
    const portfolioForm = document.getElementById('portfolio-form');
    const sendBar       = document.getElementById('send-bar');

    if (portfolioForm && sendBar) {
        portfolioForm.addEventListener('submit', () => {
            sendBar.style.transition = 'width 2s ease';
            sendBar.style.width = '80%';
        });
    }

});
