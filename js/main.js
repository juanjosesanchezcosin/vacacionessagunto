/* ============================================================
   vacacionessagunto.es — JS Principal
   ============================================================ */

// NAV SCROLL
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
}

// HAMBURGER
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        hamburger.innerHTML = navLinks.classList.contains('open')
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
    });
    navLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            navLinks.classList.remove('open');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// SCROLL REVEAL
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(e.target);
        }
    });
}, { threshold: 0.08 });

document.querySelectorAll(
    '.zona-card, .aloj-card, .paso, .porque-item, ' +
    '.zona-seo-card, .blog-card, .prop-benefit, ' +
    '.beneficio-card, .precio-card, .faq-item'
).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
    el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    revealObserver.observe(el);
});

// MÉTRICAS ANIMADAS
const metricObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.querySelectorAll('.metric-fill').forEach(bar => {
                const w = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => { bar.style.width = w; }, 100);
            });
            metricObserver.unobserve(e.target);
        }
    });
}, { threshold: 0.3 });
document.querySelectorAll('.porque-visual').forEach(el => metricObserver.observe(el));

// FAQ ACCORDION
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
    });
});

// FILTROS BLOG
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// BUSCADOR — envía a WhatsApp con los datos
function buscarAlojamiento() {
    const destino  = document.querySelector('[name="destino"]')?.value  || 'Toda la comarca';
    const entrada  = document.querySelector('[name="entrada"]')?.value  || 'Por confirmar';
    const salida   = document.querySelector('[name="salida"]')?.value   || 'Por confirmar';
    const personas = document.querySelector('[name="personas"]')?.value || '2 personas';
    const precio   = document.querySelector('[name="precio"]')?.value   || 'Cualquier precio';
    const msg = `Hola 👋 busco alojamiento vacacional en Sagunto:\n📍 Destino: ${destino}\n📅 Entrada: ${entrada}\n📅 Salida: ${salida}\n👥 Personas: ${personas}\n💶 Precio: ${precio}`;
    window.open(`https://wa.me/34603018190?text=${encodeURIComponent(msg)}`, '_blank');
}

// FECHA MÍNIMA HOY
const today = new Date().toISOString().split('T')[0];
document.querySelectorAll('input[type="date"]').forEach(d => d.setAttribute('min', today));
