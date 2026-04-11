document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else if (!document.body.classList.contains('projects-page')) {
            // Only remove on home page top
            if (!navbar.classList.contains('always-scrolled')) {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // 2. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));

    // 3. Form Handling (Optional visual feedback)
    const contactForm = document.getElementById('portfolio-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // The form will submit to Formspree, but we can show a "Sending..." state
            const btn = this.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Sending...';
            btn.disabled = true;

            // Formspree will handle the actual redirect or AJAX
            // If using AJAX:
            /*
            e.preventDefault();
            const formData = new FormData(this);
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    btn.innerText = 'Message Sent!';
                    this.reset();
                } else {
                    btn.innerText = 'Error! Try again.';
                }
                setTimeout(() => { btn.innerText = originalText; btn.disabled = false; }, 3000);
            });
            */
        });
    }

    // 4. Smooth Scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
