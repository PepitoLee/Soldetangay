// ========== SCROLL REVEAL ==========
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ========== CONTADOR ANIMADO ==========
const counterEl = document.getElementById('counter');
const progressBar = document.getElementById('progress-bar');
const targetNumber = 87;
let currentNumber = 0;

const animateCounter = () => {
    const counterSection = document.querySelector('.urgency');
    const sectionTop = counterSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 100 && currentNumber < targetNumber) {
        const increment = Math.ceil(targetNumber / 50);
        const interval = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= targetNumber) {
                currentNumber = targetNumber;
                clearInterval(interval);
            }
            counterEl.textContent = currentNumber;
            progressBar.style.width = (currentNumber / 90 * 100) + '%';
        }, 30);

        // Remove listener after animation starts
        window.removeEventListener('scroll', animateCounter);
    }
};

window.addEventListener('scroll', animateCounter);

// ========== FORMULARIO - ENVIO A WHATSAPP ==========
const form = document.getElementById('lead-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
    const lote = document.getElementById('lote').value;

    // Construir mensaje para WhatsApp
    let mensaje = `🏡 *NUEVA SOLICITUD DE COTIZACIÓN*\n\n`;
    mensaje += `👤 *Nombre:* ${nombre}\n`;
    mensaje += `📱 *Teléfono:* ${telefono}\n`;
    if (email) mensaje += `📧 *Email:* ${email}\n`;
    if (lote) mensaje += `🏠 *Interés:* ${lote}\n`;
    mensaje += `\n_Enviado desde Landing Page Sol de Tangay_`;

    // Codificar mensaje para URL
    const mensajeCodificado = encodeURIComponent(mensaje);

    // Abrir WhatsApp
    window.open(`https://wa.me/51973068950?text=${mensajeCodificado}`, '_blank');

    // Opcional: Mostrar mensaje de confirmación
    alert('¡Gracias por tu interés! Te redirigimos a WhatsApp para completar tu solicitud.');
});

// ========== SMOOTH SCROLL ==========
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
