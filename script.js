const TEL_WHATSAPP = "573182740604"; 

// Contactar WhatsApp directo
function contactarWhatsApp(motivo) {
    const mensaje = encodeURIComponent(`Hola Surtimangueras Chimitá, necesito información sobre: ${motivo.toUpperCase()}`);
    window.open(`https://wa.me/${TEL_WHATSAPP}?text=${mensaje}`, '_blank');
}

// Abrir/Cerrar menú desplegable del header
function toggleProductosMenu(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    const container = document.getElementById('dropdownProductos');
    if (container) {
        container.classList.toggle('is-active');
    }
}

// Abrir Modal con productos filtrados por categoría
function abrirCategoriaModal(categoria, e) {
    if (e) e.preventDefault();

    const overlay = document.getElementById('categoryProductsModal');
    const title = document.getElementById('modalCategoryTitle');

    if (overlay && title) {
        title.innerText = `PRODUCTOS: ${categoria.toUpperCase()}`;
        filtrar(categoria);
        overlay.classList.add('is-open');
    }

    // Cerrar menú desplegable superior si está abierto
    const container = document.getElementById('dropdownProductos');
    if (container) {
        container.classList.remove('is-active');
    }
}

// Cerrar Modal de productos
function cerrarCategoriaModal() {
    const overlay = document.getElementById('categoryProductsModal');
    if (overlay) {
        overlay.classList.remove('is-open');
    }
}

// Filtro flexible por clase de categoría
function filtrar(categoria) {
    const normalizar = (txt) => txt.toLowerCase().replace(/[\s\-_]/g, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const catTarget = normalizar(categoria);

    const productos = document.querySelectorAll('.modal-category-content .prod-card');
    productos.forEach(prod => {
        if (catTarget === 'todos') {
            prod.style.display = 'flex';
        } else {
            const clases = Array.from(prod.classList).map(c => normalizar(c));
            if (clases.includes(catTarget)) {
                prod.style.display = 'flex';
            } else {
                prod.style.display = 'none';
            }
        }
    });
}

// Abrir imagen amplia (Zoom Modal)
function ampliarImagen(src) {
    const imgModal = document.getElementById('imageModal');
    const expandedImg = document.getElementById('expandedImg');
    if (imgModal && expandedImg) {
        expandedImg.src = src;
        imgModal.style.display = 'flex';
    }
}

// Cerrar visor de imágenes
function closeImageModal() {
    const imgModal = document.getElementById('imageModal');
    if (imgModal) {
        imgModal.style.display = 'none';
    }
}

// Eventos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Cerrar menú desplegable al hacer clic por fuera
    document.addEventListener('click', (e) => {
        const container = document.getElementById('dropdownProductos');
        if (container && !container.contains(e.target)) {
            container.classList.remove('is-active');
        }
    });

    // Control del menú hamburguesa responsivo
    const toggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');

    if (toggle && nav) {
        function cerrarMenu() {
            nav.classList.remove('abierto');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.textContent = '☰';
        }

        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const abierto = nav.classList.toggle('abierto');
            toggle.setAttribute('aria-expanded', abierto);
            toggle.textContent = abierto ? '✕' : '☰';
        });

        nav.querySelectorAll('a').forEach(enlace => {
            enlace.addEventListener('click', (e) => {
                if (!enlace.classList.contains('dropdown-title')) {
                    cerrarMenu();
                }
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 850) cerrarMenu();
        });
    }
});