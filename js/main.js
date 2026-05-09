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

/* ── SLIDER ── */
function initSlider(wrap) {
    const track = wrap.querySelector('.slider-track');
    const slides = wrap.querySelectorAll('.slide');
    const dots = wrap.querySelectorAll('.slider-dot');
    const thumbs = wrap.querySelectorAll('.slider-thumb');
    const counter = wrap.querySelector('.slider-counter');
    if (!track || slides.length === 0) return;
    let current = 0;
    const total = slides.length;

    function goTo(n) {
        current = (n + total) % total;
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
        thumbs.forEach((t, i) => t.classList.toggle('active', i === current));
        if (counter) counter.textContent = `${current + 1} / ${total}`;
    }

    wrap.querySelector('.slider-btn.prev')?.addEventListener('click', e => { e.preventDefault(); goTo(current - 1); });
    wrap.querySelector('.slider-btn.next')?.addEventListener('click', e => { e.preventDefault(); goTo(current + 1); });
    dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));
    thumbs.forEach((t, i) => t.addEventListener('click', () => goTo(i)));

    // Touch swipe
    let startX = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
    });

    goTo(0);
}
document.querySelectorAll('.slider-wrap').forEach(initSlider);

/* ── FAVORITOS ── */
document.querySelectorAll('.slider-fav, .aloj-fav').forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        btn.classList.toggle('active');
        const icon = btn.querySelector('i');
        if (icon) icon.className = btn.classList.contains('active') ? 'fas fa-heart' : 'far fa-heart';
    });
});

/* ── GALERÍA GRID — abrir modal ── */
document.querySelectorAll('.gallery-main, .gallery-thumb, .btn-all-photos, .gallery-more').forEach(el => {
    el.addEventListener('click', () => {
        const modal = document.getElementById('gallery-modal');
        if (modal) { modal.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
    });
});
document.getElementById('gallery-modal-close')?.addEventListener('click', () => {
    const modal = document.getElementById('gallery-modal');
    if (modal) { modal.style.display = 'none'; document.body.style.overflow = ''; }
});

/* ── FILTROS ALOJAMIENTOS ── */
document.querySelectorAll('.filtro-btn[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filtro-btn[data-filter]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        document.querySelectorAll('.aloj-card').forEach(card => {
            const zona = card.dataset.zona || '';
            const tipo = card.dataset.tipo || '';
            if (filter === 'all' || zona.includes(filter) || tipo.includes(filter)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

/* ── RESERVA — calcular precio ── */
const inputEntrada = document.getElementById('reserva-entrada');
const inputSalida = document.getElementById('reserva-salida');
if (inputEntrada && inputSalida) {
    function calcularPrecio() {
        const precioNoche = parseInt(document.getElementById('precio-noche')?.dataset.precio || 0);
        const e = new Date(inputEntrada.value);
        const s = new Date(inputSalida.value);
        if (!isNaN(e) && !isNaN(s) && s > e) {
            const noches = Math.round((s - e) / (1000 * 60 * 60 * 24));
            const subtotal = noches * precioNoche;
            const tasas = Math.round(subtotal * 0.08);
            const total = subtotal + tasas;
            document.getElementById('res-noches')?.textContent && (document.getElementById('res-noches').textContent = `${noches} noches × ${precioNoche}€`);
            document.getElementById('res-subtotal')?.textContent && (document.getElementById('res-subtotal').textContent = `${subtotal}€`);
            document.getElementById('res-tasas')?.textContent && (document.getElementById('res-tasas').textContent = `${tasas}€`);
            document.getElementById('res-total')?.textContent && (document.getElementById('res-total').textContent = `${total}€`);
        }
    }
    inputEntrada.addEventListener('change', calcularPrecio);
    inputSalida.addEventListener('change', calcularPrecio);
}

/* ── BANNER COOKIES ── */
(function() {
    if (localStorage.getItem('cookies-ok')) return;
    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.style.cssText = 'position:fixed;bottom:0;left:0;right:0;background:#0c4a6e;color:white;padding:14px 20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;z-index:200;font-family:"DM Sans",sans-serif;font-size:.82rem;box-shadow:0 -4px 20px rgba(0,0,0,.15)';
    banner.innerHTML = `
        <span style="flex:1;min-width:200px">🍪 Usamos cookies para mejorar tu experiencia. <a href="/cookies" style="color:#7dd3fc;text-decoration:underline">Más información</a></span>
        <div style="display:flex;gap:8px;flex-shrink:0">
            <button onclick="document.getElementById('cookie-banner').remove();localStorage.setItem('cookies-ok','1')" style="background:#0ea5e9;color:white;border:none;padding:8px 18px;border-radius:8px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:.82rem">Aceptar</button>
            <a href="/cookies" style="background:transparent;color:white;border:1px solid rgba(255,255,255,.3);padding:8px 14px;border-radius:8px;font-size:.82rem;text-decoration:none;display:flex;align-items:center">Gestionar</a>
        </div>`;
    document.body.appendChild(banner);
})();
