// Main JavaScript file for the portfolio webpage

console.log('🚀 Cargando portafolio...');

document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // MENÚ MÓVIL
    // ========================================
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('main-nav');
    const menuOverlay = document.getElementById('menu-overlay');
    const navLinks = document.querySelectorAll('.nav-link');

    // Abrir/Cerrar menú con el botón hamburguesa
    if (menuToggle && nav && menuOverlay) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('🍔 Toggle menú');
            nav.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            menuToggle.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });

        // Cerrar menú al hacer clic en el overlay
        menuOverlay.addEventListener('click', () => {
            console.log('❌ Cerrar menú (overlay)');
            nav.classList.remove('active');
            menuOverlay.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Cerrar menú al hacer clic en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                console.log('❌ Cerrar menú (link)');
                nav.classList.remove('active');
                menuOverlay.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ========================================
    // TEMA CLARO/OSCURO
    // ========================================
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');

    // Detectar preferencia del sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Cargar tema guardado o usar preferencia del sistema
    const savedTheme = localStorage.getItem('theme');
    const currentTheme = savedTheme || (prefersDark.matches ? 'dark' : 'light');

    // Aplicar tema inicial
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (themeIcon) {
        themeIcon.textContent = currentTheme === 'dark' ? '🌙' : '☀️';
    }

    console.log(`🎨 Tema inicial: ${currentTheme}`);

    // Toggle tema al hacer clic
    if (themeToggle && themeIcon) {
        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const newTheme = current === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeIcon.textContent = newTheme === 'dark' ? '🌙' : '☀️';
            
            console.log(`🎨 Tema cambiado a: ${newTheme}`);
        });
    }

    // ========================================
    // BARRA DE PROGRESO DE LECTURA
    // ========================================
    const readingProgress = document.querySelector('.reading-progress');

    if (readingProgress) {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            readingProgress.style.width = scrolled + '%';
        });
    }

    // ========================================
    // SCROLL SUAVE
    // ========================================
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

    // ========================================
    // ANIMACIONES AL SCROLL
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-card, .timeline-item, .cert-item, .skill-category').forEach(el => {
        observer.observe(el);
    });

    // ========================================
    // NAVEGACIÓN ACTIVA
    // ========================================
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ========================================
    // FORMULARIO DE CONTACTO
    // ========================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Crear asunto del correo
            const subjectMap = {
                'proyecto': 'Nuevo Proyecto',
                'colaboracion': 'Colaboración',
                'consulta': 'Consulta General',
                'otro': 'Otro'
            };
            const emailSubject = subjectMap[subject] || 'Consulta desde Portfolio';
            
            // Crear cuerpo del correo
            let emailBody = `Hola Pedro,\n\n`;
            emailBody += `Mi nombre es: ${name}\n`;
            emailBody += `Email: ${email}\n`;
            if (phone) {
                emailBody += `Teléfono: ${phone}\n`;
            }
            emailBody += `\nMensaje:\n${message}`;
            
            // Crear enlace mailto
            const mailtoLink = `mailto:psanmartincarrasco@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
            
            // Abrir cliente de correo
            window.location.href = mailtoLink;
            
            // Mostrar mensaje de éxito
            setTimeout(() => {
                alert('¡Gracias por tu mensaje! Se abrirá tu cliente de correo. Si no se abre automáticamente, puedes enviar un correo a psanmartincarrasco@gmail.com');
                contactForm.reset();
            }, 100);
        });
    }

    console.log('✅ Portfolio loaded successfully!');
});

// ========================================
// CERTIFICADOS (Abrir en nueva pestaña)
// ========================================
function openCertModal(title, institution, date, pdfPath) {
    console.log(`📄 Abriendo certificado: ${title}`);
    window.open(pdfPath, '_blank');
}

function closeCertModal() {
    const modal = document.getElementById('cert-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

console.log('✅ Portafolio cargado correctamente!');

