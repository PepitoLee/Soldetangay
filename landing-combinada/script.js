// ══════════════════════════════════════════════════════════════
// SOL DE TANGAY - LANDING COMBINADA
// JavaScript - Animaciones y Funcionalidad
// ══════════════════════════════════════════════════════════════

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

// ========== URGENCY COUNTER ANIMATION ==========
const soldCounter = document.getElementById('sold-counter');
const progressBar = document.getElementById('progress-bar');
const targetNumber = 87;
const totalLots = 90;
let counterAnimated = false;

// Easing function for smooth animation (ease-out-quart)
const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

const animateCounterValue = () => {
    if (counterAnimated || !soldCounter) return;
    counterAnimated = true;

    const duration = 2500; // 2.5 seconds for dramatic effect
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Apply easing for smooth acceleration/deceleration
        const easedProgress = easeOutQuart(progress);
        const currentValue = Math.round(easedProgress * targetNumber);

        // Update counter display
        soldCounter.textContent = currentValue;

        // Update progress bar
        if (progressBar) {
            const percentage = (currentValue / totalLots) * 100;
            progressBar.style.width = percentage + '%';
        }

        // Continue animation if not complete
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            // Ensure final values are exact
            soldCounter.textContent = targetNumber;
            if (progressBar) {
                progressBar.style.width = (targetNumber / totalLots * 100) + '%';
            }
        }
    };

    requestAnimationFrame(updateCounter);
};

// Use Intersection Observer for reliable trigger
const urgencySection = document.querySelector('.urgency');
if (urgencySection) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counterAnimated) {
                // Small delay for dramatic effect
                setTimeout(animateCounterValue, 300);
            }
        });
    }, {
        threshold: 0.3 // Trigger when 30% visible
    });

    counterObserver.observe(urgencySection);
}

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
        mensaje += `\n_Enviado desde Landing Sol de Tangay_`;

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
        bottom: 110px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--champagne, #C9A962);
        color: var(--forest-deep, #0D1F17);
        padding: 18px 28px;
        font-family: 'DM Sans', sans-serif;
        font-size: 14px;
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 20px;
        box-shadow: 0 15px 50px rgba(0,0,0,0.25);
        animation: slideUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        max-width: 90%;
    `;

    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: 22px;
        cursor: pointer;
        color: var(--forest-deep, #0D1F17);
        line-height: 1;
        opacity: 0.7;
        transition: opacity 0.3s;
    `;

    closeBtn.addEventListener('mouseenter', () => closeBtn.style.opacity = '1');
    closeBtn.addEventListener('mouseleave', () => closeBtn.style.opacity = '0.7');

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideDown 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
        setTimeout(() => notification.remove(), 400);
    }, 5000);

    // Close on click
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideDown 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
        setTimeout(() => notification.remove(), 400);
    });
}

// Add keyframe animations for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideUp {
        from { opacity: 0; transform: translateX(-50%) translateY(30px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
    @keyframes slideDown {
        from { opacity: 1; transform: translateX(-50%) translateY(0); }
        to { opacity: 0; transform: translateX(-50%) translateY(30px); }
    }
`;
document.head.appendChild(notificationStyles);

// ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 20;

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

const handleParallax = () => {
    const scrolled = window.pageYOffset;

    if (scrolled < window.innerHeight) {
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.25}px)`;
            heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
        }

        if (heroDecoCircle) {
            heroDecoCircle.style.transform = `translate(-50%, -50%) scale(${1 + scrolled * 0.0003})`;
        }
    }
};

// Throttled scroll handler
let ticking = false;
const optimizedScroll = () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleParallax();
            ticking = false;
        });
        ticking = true;
    }
};

window.addEventListener('scroll', optimizedScroll);

// ========== CARD HOVER EFFECTS ==========
const cards = document.querySelectorAll('.benefit-card, .lot-card, .trust-item, .amenity-item');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
});

// ========== FORM INPUT ANIMATIONS ==========
const formInputs = document.querySelectorAll('.form-group input, .form-group select');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// ========== BUTTON RIPPLE EFFECT ==========
const buttons = document.querySelectorAll('.btn');

buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            width: 100px;
            height: 100px;
            transform: translate(-50%, -50%) scale(0);
            animation: ripple 0.6s ease-out;
            left: ${x}px;
            top: ${y}px;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ========== LOADING STATE ==========
document.addEventListener('DOMContentLoaded', () => {
    // Remove loading class from body if present
    document.body.classList.remove('loading');
});

// ========== LAZY BADGE UPDATE ==========
// Update availability badge based on counter (optional feature)
const updateAvailabilityBadge = () => {
    const badge = document.querySelector('.hero-badge-text');
    const available = 90 - targetNumber;
    if (badge && available <= 5) {
        badge.innerHTML = `Solo <strong>${available}</strong> lotes disponibles`;
    }
};

// Run after counter animation
setTimeout(updateAvailabilityBadge, 2500);

// ========== PAYMENT MODAL ==========
const paymentModal = document.getElementById('payment-modal');
const btnPayment = document.getElementById('btn-payment');
const modalClose = document.getElementById('modal-close');

// Open modal
if (btnPayment && paymentModal) {
    btnPayment.addEventListener('click', () => {
        paymentModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

// Close modal - button
if (modalClose && paymentModal) {
    modalClose.addEventListener('click', () => {
        paymentModal.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Close modal - click outside
if (paymentModal) {
    paymentModal.addEventListener('click', (e) => {
        if (e.target === paymentModal) {
            paymentModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Close modal - ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && paymentModal && paymentModal.classList.contains('active')) {
        paymentModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ========== COPY TO CLIPBOARD FUNCTIONALITY ==========
const copyButtons = document.querySelectorAll('.copy-btn');

copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
        const copyableParent = btn.closest('.copyable');
        if (!copyableParent) return;

        const textToCopy = copyableParent.dataset.copy;
        if (!textToCopy) return;

        try {
            await navigator.clipboard.writeText(textToCopy);
            showCopyFeedback('Copiado al portapapeles');

            // Visual feedback on button
            btn.style.color = '#25D366';
            setTimeout(() => {
                btn.style.color = '';
            }, 1000);
        } catch (err) {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = textToCopy;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            showCopyFeedback('Copiado al portapapeles');
        }
    });
});

function showCopyFeedback(message) {
    // Remove existing feedback
    const existing = document.querySelector('.copy-feedback');
    if (existing) existing.remove();

    const feedback = document.createElement('div');
    feedback.className = 'copy-feedback';
    feedback.textContent = message;
    document.body.appendChild(feedback);

    setTimeout(() => {
        feedback.style.opacity = '0';
        feedback.style.transition = 'opacity 0.3s';
        setTimeout(() => feedback.remove(), 300);
    }, 2000);
}

// ========== VIDEO PLAYER ==========
const droneVideo = document.getElementById('drone-video');
const videoOverlay = document.getElementById('video-overlay');
const videoPlayBtn = document.getElementById('video-play-btn');

if (droneVideo && videoOverlay && videoPlayBtn) {
    // Play video when clicking overlay or button
    const playVideo = () => {
        videoOverlay.classList.add('hidden');
        droneVideo.play();
    };

    videoPlayBtn.addEventListener('click', playVideo);
    videoOverlay.addEventListener('click', playVideo);

    // Show overlay when video ends or pauses
    droneVideo.addEventListener('pause', () => {
        if (droneVideo.currentTime === 0 || droneVideo.ended) {
            videoOverlay.classList.remove('hidden');
        }
    });

    droneVideo.addEventListener('ended', () => {
        videoOverlay.classList.remove('hidden');
        droneVideo.currentTime = 0;
    });
}

// ========== LIGHTBOX FUNCTIONALITY ==========
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');
const lightboxCounter = document.getElementById('lightbox-counter');

let currentGallery = [];
let currentIndex = 0;

// Open lightbox function
const openLightbox = (gallery, index) => {
    currentGallery = gallery;
    currentIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
};

// Close lightbox function
const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
};

// Update lightbox image
const updateLightboxImage = () => {
    if (currentGallery.length === 0) return;

    const item = currentGallery[currentIndex];
    const src = item.dataset.src || item.querySelector('img').src;
    const alt = item.querySelector('img')?.alt || 'Imagen Sol de Tangay';

    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightboxCounter.textContent = `${currentIndex + 1} / ${currentGallery.length}`;
};

// Navigate to previous image
const prevImage = () => {
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    updateLightboxImage();
};

// Navigate to next image
const nextImage = () => {
    currentIndex = (currentIndex + 1) % currentGallery.length;
    updateLightboxImage();
};

// Event listeners for lightbox controls
if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

if (lightboxPrev) {
    lightboxPrev.addEventListener('click', prevImage);
}

if (lightboxNext) {
    lightboxNext.addEventListener('click', nextImage);
}

// Close lightbox on overlay click
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;

    switch(e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            prevImage();
            break;
        case 'ArrowRight':
            nextImage();
            break;
    }
});

// Initialize gallery items
const photoGalleryItems = document.querySelectorAll('.photo-gallery .gallery-item');
const renderGalleryItems = document.querySelectorAll('.renders-gallery .render-item');

// Photo gallery lightbox
photoGalleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        openLightbox(Array.from(photoGalleryItems), index);
    });
});

// Renders gallery lightbox
renderGalleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        openLightbox(Array.from(renderGalleryItems), index);
    });
});

// ========== CONSOLE BRANDING ==========
console.log('%c SOL DE TANGAY ', 'background: #0D1F17; color: #C9A962; font-size: 20px; font-weight: bold; padding: 10px 20px;');
console.log('%c El Refugio Perfecto ', 'color: #C9A962; font-style: italic;');

// ══════════════════════════════════════════════════════════════
// MOBILE OPTIMIZATIONS - CARRUSELES, ACORDEÓN & SCROLL
// ══════════════════════════════════════════════════════════════

// ========== SCROLL PROGRESS BAR ==========
const scrollProgressBar = document.getElementById('scroll-progress');

const updateScrollProgress = () => {
    if (!scrollProgressBar) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgressBar.style.width = scrollPercent + '%';
};

window.addEventListener('scroll', updateScrollProgress, { passive: true });

// ========== CAROUSEL DOTS SYNCHRONIZATION ==========
const initCarouselDots = (carouselSelector, dotsSelector) => {
    const carousel = document.querySelector(carouselSelector);
    const dotsContainer = document.querySelector(dotsSelector);

    if (!carousel || !dotsContainer) return;

    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    const items = carousel.children.length > 0 ?
        Array.from(carousel.children).filter(el =>
            !el.classList.contains('story-progress') &&
            !el.classList.contains('carousel-dots') &&
            !el.classList.contains('swipe-hint')
        ) : [];

    if (items.length === 0 || dots.length === 0) return;

    // Calculate item width for proper index detection
    const getActiveIndex = () => {
        const scrollLeft = carousel.scrollLeft;
        const itemWidth = items[0].offsetWidth;
        const gap = parseInt(getComputedStyle(carousel).gap) || 0;
        return Math.round(scrollLeft / (itemWidth + gap));
    };

    // Update dots on scroll
    carousel.addEventListener('scroll', () => {
        const activeIndex = getActiveIndex();
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === activeIndex);
        });
    }, { passive: true });

    // Click on dots to scroll
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const itemWidth = items[0].offsetWidth;
            const gap = parseInt(getComputedStyle(carousel).gap) || 0;
            carousel.scrollTo({
                left: index * (itemWidth + gap),
                behavior: 'smooth'
            });
        });
    });
};

// Initialize all carousel dots
const initAllCarousels = () => {
    // Only initialize on mobile
    if (window.innerWidth > 768) return;

    initCarouselDots('.benefits-grid', '#benefits-dots');
    initCarouselDots('.lots-grid', '#lots-dots');
    initCarouselDots('.photo-gallery', '#gallery-dots');
    initCarouselDots('.project-timeline', '#timeline-dots');
};

// Run on load and resize
initAllCarousels();
window.addEventListener('resize', () => {
    // Debounce resize
    clearTimeout(window.carouselResizeTimer);
    window.carouselResizeTimer = setTimeout(initAllCarousels, 250);
});

// ========== STORY PROGRESS FOR RENDERS GALLERY ==========
const initStoryProgress = () => {
    const rendersGallery = document.querySelector('.renders-gallery');
    const progressItems = document.querySelectorAll('#renders-progress .story-progress-item');

    if (!rendersGallery || progressItems.length === 0) return;
    if (window.innerWidth > 768) return;

    const renderItems = rendersGallery.querySelectorAll('.render-item');

    const updateProgress = () => {
        const scrollLeft = rendersGallery.scrollLeft;
        const itemWidth = renderItems[0]?.offsetWidth || 1;
        const activeIndex = Math.round(scrollLeft / itemWidth);

        progressItems.forEach((item, i) => {
            item.classList.remove('active', 'viewed');
            if (i < activeIndex) {
                item.classList.add('viewed');
            } else if (i === activeIndex) {
                item.classList.add('active');
            }
        });
    };

    rendersGallery.addEventListener('scroll', updateProgress, { passive: true });
};

initStoryProgress();

// ========== ACCORDION FUNCTIONALITY ==========
const initAccordion = () => {
    // Only activate on mobile
    if (window.innerWidth > 768) return;

    const accordionHeaders = document.querySelectorAll('.trust-item .accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const parentItem = header.parentElement;
            const wasOpen = parentItem.classList.contains('open');

            // Close all items
            document.querySelectorAll('.trust-item').forEach(item => {
                item.classList.remove('open');
            });

            // Open clicked item if it wasn't open
            if (!wasOpen) {
                parentItem.classList.add('open');
            }
        });
    });
};

initAccordion();

// ========== SWIPE HINT AUTO-HIDE ==========
const initSwipeHints = () => {
    const swipeHints = document.querySelectorAll('.swipe-hint');

    swipeHints.forEach(hint => {
        const parent = hint.previousElementSibling?.previousElementSibling || hint.parentElement;
        const carousel = parent?.classList?.contains('carousel-dots') ?
            parent.previousElementSibling : parent;

        if (!carousel) return;

        // Hide hint after first scroll
        const hideOnScroll = () => {
            hint.style.opacity = '0';
            hint.style.transition = 'opacity 0.5s';
            setTimeout(() => {
                hint.style.display = 'none';
            }, 500);
            carousel.removeEventListener('scroll', hideOnScroll);
        };

        // Also hide after 5 seconds if no scroll
        setTimeout(() => {
            if (hint.style.display !== 'none') {
                hint.style.opacity = '0';
                hint.style.transition = 'opacity 0.5s';
                setTimeout(() => {
                    hint.style.display = 'none';
                }, 500);
            }
        }, 5000);

        carousel.addEventListener('scroll', hideOnScroll, { passive: true, once: true });
    });
};

// Initialize swipe hints only on mobile
if (window.innerWidth <= 768) {
    initSwipeHints();
}

// ========== TOUCH FEEDBACK FOR CARDS ==========
const initTouchFeedback = () => {
    if (window.innerWidth > 768) return;

    const touchableCards = document.querySelectorAll('.benefit-card, .lot-card, .amenity-item, .timeline-content');

    touchableCards.forEach(card => {
        card.addEventListener('touchstart', () => {
            card.style.transform = 'scale(0.98)';
        }, { passive: true });

        card.addEventListener('touchend', () => {
            card.style.transform = '';
        }, { passive: true });
    });
};

initTouchFeedback();
