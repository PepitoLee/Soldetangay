// ========== SCROLL REVEAL ANIMATIONS ==========
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '-50px'
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// ========== NAVIGATION SCROLL EFFECT ==========
const nav = document.getElementById('nav');
let lastScroll = 0;

const handleNavScroll = () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class for background
    if (currentScroll > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    // Hide/show nav on scroll direction
    if (currentScroll > lastScroll && currentScroll > 400) {
        nav.classList.add('hidden');
    } else {
        nav.classList.remove('hidden');
    }

    lastScroll = currentScroll;
};

window.addEventListener('scroll', handleNavScroll);

// ========== URGENCY COUNTER ANIMATION ==========
const soldCounter = document.getElementById('sold-counter');
const progressBar = document.getElementById('progress-bar');
const targetNumber = 87;
let counterAnimated = false;

const animateCounter = () => {
    if (counterAnimated) return;

    const urgencySection = document.querySelector('.urgency');
    if (!urgencySection) return;

    const sectionTop = urgencySection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 100) {
        counterAnimated = true;

        let currentNumber = 0;
        const duration = 2000;
        const increment = targetNumber / (duration / 16);

        const updateCounter = () => {
            currentNumber += increment;

            if (currentNumber >= targetNumber) {
                currentNumber = targetNumber;
                soldCounter.textContent = Math.round(currentNumber);
                progressBar.style.width = (currentNumber / 90 * 100) + '%';
                return;
            }

            soldCounter.textContent = Math.round(currentNumber);
            progressBar.style.width = (currentNumber / 90 * 100) + '%';
            requestAnimationFrame(updateCounter);
        };

        requestAnimationFrame(updateCounter);
    }
};

window.addEventListener('scroll', animateCounter);
window.addEventListener('load', animateCounter);

// ========== FORM SUBMISSION TO WHATSAPP ==========
const leadForm = document.getElementById('lead-form');

if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const email = document.getElementById('email').value.trim();
        const lote = document.getElementById('lote').value;

        // Build WhatsApp message
        let mensaje = `*NUEVA SOLICITUD DE COTIZACIÓN*\n\n`;
        mensaje += `*Nombre:* ${nombre}\n`;
        mensaje += `*Teléfono:* ${telefono}\n`;
        if (email) mensaje += `*Email:* ${email}\n`;
        if (lote) mensaje += `*Interés:* ${lote}\n`;
        mensaje += `\n_Enviado desde Landing Premium Sol de Tangay_`;

        // Encode message for URL
        const mensajeCodificado = encodeURIComponent(mensaje);

        // Open WhatsApp
        window.open(`https://wa.me/51973068950?text=${mensajeCodificado}`, '_blank');

        // Show confirmation
        showNotification('Gracias por su interés. Le redirigimos a WhatsApp para completar su solicitud.');

        // Reset form
        leadForm.reset();
    });
}

// ========== NOTIFICATION SYSTEM ==========
function showNotification(message) {
    // Remove existing notification if any
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <p>${message}</p>
        <button class="notification-close">&times;</button>
    `;

    // Add styles dynamically
    notification.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--gold);
        color: var(--forest);
        padding: 16px 24px;
        border-radius: 8px;
        font-family: 'DM Sans', sans-serif;
        font-size: 14px;
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 16px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        animation: slideUp 0.3s ease;
        max-width: 90%;
    `;

    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        color: var(--forest);
        line-height: 1;
    `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideDown 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 5000);

    // Close on click
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
}

// Add keyframe animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from { opacity: 0; transform: translateX(-50%) translateY(20px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
    @keyframes slideDown {
        from { opacity: 1; transform: translateX(-50%) translateY(0); }
        to { opacity: 0; transform: translateX(-50%) translateY(20px); }
    }
`;
document.head.appendChild(style);

// ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            const navHeight = nav ? nav.offsetHeight : 0;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========== PARALLAX EFFECT FOR HERO ==========
const heroContent = document.querySelector('.hero-content');
const heroDecoCircle = document.querySelector('.hero-deco-circle');
const heroDecoLine = document.querySelector('.hero-deco-line');

const handleParallax = () => {
    const scrolled = window.pageYOffset;

    if (scrolled < window.innerHeight) {
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }

        if (heroDecoCircle) {
            heroDecoCircle.style.transform = `translate(-50%, -50%) scale(${1 + scrolled * 0.0005})`;
        }

        if (heroDecoLine) {
            heroDecoLine.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    }
};

window.addEventListener('scroll', handleParallax);

// ========== STATS COUNTER ANIMATION ==========
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

const animateStats = () => {
    if (statsAnimated) return;

    const statsSection = document.querySelector('.hero-stats');
    if (!statsSection) return;

    const sectionTop = statsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 50) {
        statsAnimated = true;

        statNumbers.forEach(stat => {
            const text = stat.textContent;
            const hasPercent = text.includes('%');
            const hasPlus = text.includes('+');
            const numericValue = parseInt(text.replace(/[^0-9]/g, ''));

            let current = 0;
            const duration = 1500;
            const increment = numericValue / (duration / 16);

            const updateStat = () => {
                current += increment;

                if (current >= numericValue) {
                    current = numericValue;
                    let display = Math.round(current).toString();
                    if (hasPlus) display = '+' + display;
                    if (hasPercent) display += '%';
                    stat.textContent = display;
                    return;
                }

                let display = Math.round(current).toString();
                if (hasPlus) display = '+' + display;
                if (hasPercent) display += '%';
                stat.textContent = display;
                requestAnimationFrame(updateStat);
            };

            requestAnimationFrame(updateStat);
        });
    }
};

window.addEventListener('scroll', animateStats);
window.addEventListener('load', animateStats);

// ========== MOBILE MENU (if needed in future) ==========
const initMobileMenu = () => {
    // Placeholder for mobile menu functionality
    // Can be extended if a hamburger menu is added
};

// ========== LOADING STATE ==========
document.addEventListener('DOMContentLoaded', () => {
    // Remove loading class from body if present
    document.body.classList.remove('loading');

    // Trigger initial animations
    setTimeout(() => {
        animateCounter();
        animateStats();
    }, 500);
});

// ========== PERFORMANCE: THROTTLE SCROLL EVENTS ==========
let ticking = false;

const optimizedScroll = () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleNavScroll();
            handleParallax();
            ticking = false;
        });
        ticking = true;
    }
};

// Replace direct scroll listeners with throttled version
window.removeEventListener('scroll', handleNavScroll);
window.removeEventListener('scroll', handleParallax);
window.addEventListener('scroll', optimizedScroll);
