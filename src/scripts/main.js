// Main JavaScript file for the portfolio webpage

document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // AÑO ACTUAL EN FOOTER (si existe)
    // ========================================
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = String(new Date().getFullYear());
    }

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
            nav.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            menuToggle.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });

        // Cerrar menú al hacer clic en el overlay
        menuOverlay.addEventListener('click', () => {
            nav.classList.remove('active');
            menuOverlay.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Cerrar menú al hacer clic en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
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

    // Toggle tema al hacer clic
    if (themeToggle && themeIcon) {
        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const newTheme = current === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeIcon.textContent = newTheme === 'dark' ? '🌙' : '☀️';
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
    // NAVEGACIÓN ACTIVA (Multipágina)
    // - Si hay secciones con hash (#), se mantiene soporte.
    // - Si no, se marca activo por pathname (about.html, etc.).
    // ========================================
    const normalizePath = (path) => {
        if (!path || path === '/') return '/index.html';
        return path.endsWith('/') ? `${path}index.html` : path;
    };

    const currentPath = normalizePath(window.location.pathname);
    const currentHash = window.location.hash;

    const setActiveNavLink = () => {
        navLinks.forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        });

        // Prefer hash match (single-page sections), if any.
        if (currentHash) {
            const hashMatch = Array.from(navLinks).find((link) => link.getAttribute('href') === currentHash);
            if (hashMatch) {
                hashMatch.classList.add('active');
                hashMatch.setAttribute('aria-current', 'page');
                return;
            }
        }

        // Fallback: match pathname.
        const pageMatch = Array.from(navLinks).find((link) => {
            const href = link.getAttribute('href');
            if (!href || href.startsWith('#')) return false;
            try {
                const url = new URL(href, window.location.href);
                return normalizePath(url.pathname) === currentPath;
            } catch {
                return false;
            }
        });

        if (pageMatch) {
            pageMatch.classList.add('active');
            pageMatch.setAttribute('aria-current', 'page');
        }
    };

    setActiveNavLink();

    // Si existen secciones con id y nav con hashes, también se actualiza por scroll.
    const sections = document.querySelectorAll('section[id]');
    const hasHashNav = Array.from(navLinks).some((link) => (link.getAttribute('href') || '').startsWith('#'));

    if (sections.length > 0 && hasHashNav) {
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
                link.removeAttribute('aria-current');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                    link.setAttribute('aria-current', 'page');
                }
            });
        });
    }

    // ========================================
    // FORMULARIO DE CONTACTO
    // ========================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            const nameEl = document.getElementById('name');
            const emailEl = document.getElementById('email');
            const phoneEl = document.getElementById('phone');
            const subjectEl = document.getElementById('subject');
            const messageEl = document.getElementById('message');

            if (!nameEl || !emailEl || !subjectEl || !messageEl) return;

            const name = nameEl.value;
            const email = emailEl.value;
            const phone = phoneEl ? phoneEl.value : '';
            const subject = subjectEl.value;
            const message = messageEl.value;

            const subjectMap = {
                'proyecto': 'Nuevo Proyecto',
                'colaboracion': 'Colaboración',
                'consulta': 'Consulta General',
                'otro': 'Otro'
            };
            const emailSubject = subjectMap[subject] || 'Consulta desde Portafolio';

            const replyToEl = document.getElementById('replyto');
            if (replyToEl) replyToEl.value = email;
            const emailSubjectEl = document.getElementById('email-subject');
            if (emailSubjectEl) emailSubjectEl.value = emailSubject;

            const action = contactForm.getAttribute('action') || '';
            const isFormspree = action.includes('https://formspree.io/f/');
            const isConfigured = isFormspree && !action.includes('REEMPLAZA_ESTE_ID');

            if (isConfigured) {
                e.preventDefault();

                try {
                    const formData = new FormData(contactForm);
                    if (phone) formData.set('phone', phone);

                    const response = await fetch(action, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Form request failed');
                    }

                    alert('¡Gracias! Tu mensaje se envió correctamente. Te responderé al correo que indicaste.');
                    contactForm.reset();
                } catch {
                    alert('Ups, no se pudo enviar el mensaje ahora. Intenta de nuevo o escríbeme a psanmartincarrasco@gmail.com');
                }

                return;
            }

            // Fallback (sin backend): abrir cliente de correo.
            e.preventDefault();

            let emailBody = `Hola Pedro,\n\n`;
            emailBody += `Mi nombre es: ${name}\n`;
            emailBody += `Email: ${email}\n`;
            if (phone) {
                emailBody += `Teléfono: ${phone}\n`;
            }
            emailBody += `\nAsunto: ${emailSubject}\n`;
            emailBody += `\nMensaje:\n${message}`;

            const mailtoLink = `mailto:psanmartincarrasco@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
            window.location.href = mailtoLink;

            setTimeout(() => {
                alert('Para que el formulario envíe directo (sin abrir tu correo), configura Formspree en contact.html. Por ahora se abrirá tu cliente de correo.');
                contactForm.reset();
            }, 100);
        });
    }

    // ========================================
    // SCROLL TO TOP BUTTON
    // ========================================
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    if (scrollToTopBtn) {
        // Mostrar/ocultar botón según scroll
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        // Scroll suave al hacer clic
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========================================
    // LAZY LOADING PARA IMÁGENES
    // ========================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '50px'
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    console.log('✅ Portfolio loaded successfully!');
});

// ========================================
// CERTIFICADOS (Abrir en nueva pestaña)
// ========================================
function openCertModal(title, institution, date, pdfPath) {
    console.log(`📄 Abriendo certificado: ${title}`);

    const modal = document.getElementById('cert-modal');
    const titleEl = document.getElementById('modal-cert-title');
    const institutionEl = document.getElementById('modal-cert-institution');
    const dateEl = document.getElementById('modal-cert-date');
    const iframe = document.getElementById('cert-preview');
    const downloadBtn = document.getElementById('cert-download-btn');

    if (!modal || !iframe || !downloadBtn) {
        window.open(pdfPath, '_blank');
        return;
    }

    if (titleEl) titleEl.textContent = title;
    if (institutionEl) institutionEl.textContent = institution;
    if (dateEl) dateEl.textContent = date;

    iframe.src = pdfPath;
    downloadBtn.href = pdfPath;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (!modal.dataset.backdropBound) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeCertModal();
            }
        });
        modal.dataset.backdropBound = 'true';
    }
}

function closeCertModal() {
    const modal = document.getElementById('cert-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';

        const iframe = document.getElementById('cert-preview');
        if (iframe) {
            iframe.src = 'about:blank';
        }
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCertModal();
    }
});

console.log('✅ Portafolio cargado correctamente!');

