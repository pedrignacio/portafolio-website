// Main JavaScript file for the portfolio webpage

document.addEventListener('DOMContentLoaded', () => {
    // Barra de progreso de lectura
    const progressBar = document.querySelector('.reading-progress');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    // Botón Scroll to Top
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Menu hamburguesa mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un enlace
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // Smooth scroll para todos los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Animaciones al hacer scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animaciones
    document.querySelectorAll('.project-card, .timeline-item, .cert-category, .skill-category').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Actualizar active state en navegación
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Toggle Tema Claro/Oscuro
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    
    // Cargar tema guardado o usar el sistema
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    const currentTheme = savedTheme || systemTheme;
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeIcon.textContent = currentTheme === 'light' ? '🌙' : '☀️';
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeIcon.textContent = newTheme === 'light' ? '🌙' : '☀️';
    });

console.log('✅ Portfolio loaded successfully!');
});

// Funciones del modal de certificados (fuera del DOMContentLoaded)
function openCertModal(title, institution, date, pdfUrl) {
    const modal = document.getElementById('cert-modal');
    const modalTitle = document.getElementById('modal-cert-title');
    const modalInstitution = document.getElementById('modal-cert-institution');
    const modalDate = document.getElementById('modal-cert-date');
    const certPreview = document.getElementById('cert-preview');
    const downloadBtn = document.getElementById('cert-download-btn');

    // Actualizar información
    modalTitle.textContent = title;
    modalInstitution.textContent = institution;
    modalDate.textContent = date;
    
    // Configurar preview y descarga
    certPreview.src = pdfUrl;
    downloadBtn.href = pdfUrl;
    downloadBtn.download = `${title.replace(/\s+/g, '-')}.pdf`;

    // Mostrar modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCertModal() {
    const modal = document.getElementById('cert-modal');
    const certPreview = document.getElementById('cert-preview');
    
    modal.classList.remove('active');
    certPreview.src = '';
    document.body.style.overflow = 'auto';
}

// Cerrar modal con ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCertModal();
    }
});

// Cerrar modal al hacer click fuera
document.getElementById('cert-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'cert-modal') {
        closeCertModal();
    }
});

