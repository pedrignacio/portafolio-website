# 🚀 Portafolio Personal - Pedro San Martín

Portafolio web personal desarrollado con HTML5, CSS3 y JavaScript vanilla. Diseño minimalista y moderno con tema oscuro, animaciones suaves y totalmente responsive.

![Portfolio Preview](./src/assets/preview.svg)

## 🌐 Demo en Vivo

[Ver Demo](https://pedrignacio.github.io/portafolio-website/)

## ✨ Características

- **Diseño Responsive**: Adaptable a todos los dispositivos (móvil, tablet, desktop)
- **Tema Oscuro Minimalista**: Interfaz elegante y profesional
- **Animaciones Suaves**: Transiciones y efectos visuales fluidos
- **Smooth Scroll**: Navegación suave entre secciones
- **Intersection Observer**: Animaciones activadas al hacer scroll
- **SEO Optimizado**: Meta tags y estructura semántica
- **Sin Frameworks**: Código ligero y rápido con JavaScript vanilla

## 🛠️ Stack Tecnológico

### Frontend
- **HTML5**: Estructura semántica y accesible
- **CSS3**: 
  - Variables CSS personalizadas
  - Flexbox y CSS Grid
  - Animaciones y transiciones
  - Media queries para responsive design
- **JavaScript ES6+**:
  - Smooth scroll
  - Intersection Observer API
  - Event listeners
  - DOM manipulation

### Herramientas de Desarrollo
- **Node.js** v18+
- **npm** - Gestión de paquetes
- **http-server** - Servidor de desarrollo local
- **Jest** - Framework de testing (configurado)
- **Git** - Control de versiones

## 📂 Estructura del Proyecto

```
portafolio-website/
├── src/
│   ├── assets/                 # Recursos multimedia (imágenes y placeholders)
│   │   ├── preview.svg         # Preview del sitio (OG/Twitter)
│   │   ├── favicon.svg         # Favicon
│   │   ├── proyecto-*.svg      # Imágenes (placeholder) de proyectos
│   │   └── docs/certificados/  # Certificados PDF
│   ├── pages/
│   │   └── index.html          # Página principal
│   ├── scripts/
│   │   └── main.js             # JavaScript principal
│   └── styles/
│       └── main.css            # Estilos CSS
├── __tests__/                  # Tests unitarios
│   └── main.test.js
├── docs/                       # Documentación e imágenes
│   └── preview.png
├── .gitignore
├── package.json
├── jest.config.js
└── README.md
```

## 🚀 Instalación y Uso

### Prerrequisitos

- Node.js (v18 o superior)
- npm o yarn
- Git

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/pedrignacio/portafolio-website.git
cd portafolio-website
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar servidor de desarrollo**
```bash
npm start
```

El sitio estará disponible en `http://127.0.0.1:8080`

### Scripts Disponibles

```bash
# Iniciar servidor de desarrollo
npm start

# Ejecutar tests
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Limpiar caché de npm
npm run clean
```

## 📱 Secciones del Portafolio

### 🏠 Inicio (Hero Section)
- Presentación principal
- Título con efecto de escritura animado
- Botones de navegación rápida
- Indicador de scroll

### 👨‍💻 Sobre Mí
- Perfil profesional
- Stack tecnológico con tags interactivos
- Foto de perfil con efecto hover

### 💼 Experiencia Profesional
- Timeline interactivo
- Experiencia laboral detallada
- 3 posiciones profesionales destacadas

### 🎯 Proyectos Destacados
- Grid responsive de proyectos
- Cards con efecto hover
- Descripción de tecnologías utilizadas
- Enlaces a repositorios y demos

### 📧 Contacto
- Información de contacto
- Enlaces a redes sociales (LinkedIn, GitHub)
- Efectos hover interactivos

## 🎨 Paleta de Colores

```css
--bg-primary: #0a0a0a      /* Fondo principal */
--bg-secondary: #1a1a1a    /* Fondo secundario */
--text-primary: #ffffff    /* Texto principal */
--text-secondary: #a0a0a0  /* Texto secundario */
--accent: #4a9eff          /* Color de acento (azul) */
```

## ⚡ Optimizaciones

- **Lazy Loading**: Carga diferida de imágenes
- **Smooth Scroll**: Navegación fluida entre secciones
- **CSS Animations**: Animaciones optimizadas con GPU
- **Responsive Images**: Imágenes adaptadas según viewport
- **Minificación**: Código optimizado para producción

## 🖼️ Imágenes (dónde van)

- Las imágenes del sitio viven en `src/assets/`.
- Por defecto dejé **placeholders en SVG** para que el sitio no muestre imágenes rotas.
- Si quieres usar JPG/PNG reales, coloca tus archivos en `src/assets/` y actualiza los `src` en `index.html` (o reemplaza los SVG manteniendo el mismo nombre).

## 📦 Despliegue

### GitHub Pages

Este repo ya incluye un workflow para desplegar con **GitHub Actions**.

1. Ve a **Settings → Pages**
2. En **Build and deployment**, selecciona **Source: GitHub Actions**
3. Haz push a `main` y el sitio se publica automáticamente

El deploy sirve también:
- `robots.txt`: https://pedrignacio.github.io/portafolio-website/robots.txt
- `sitemap.xml`: https://pedrignacio.github.io/portafolio-website/sitemap.xml

1. **Configurar GitHub Pages**
```bash
# Crear rama gh-pages
git checkout -b gh-pages

# Pushear a GitHub
git push origin gh-pages
```

2. **Configurar en GitHub**
- Ve a Settings > Pages
- Selecciona rama `gh-pages`
- Carpeta: `/src` o `root`
- Guarda los cambios

El sitio estará disponible en: `https://pedrignacio.github.io/portafolio-website/`

### Netlify/Vercel

1. Conecta tu repositorio de GitHub
2. Configura el directorio de build: `src`
3. Deploy automático en cada push

## 🧪 Testing

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests con coverage
npm run test:coverage

# Ejecutar tests en modo watch
npm run test:watch
```

## 🧭 Lighthouse (performance)

Genera un reporte local en HTML:

1. En una terminal: `npm start`
2. En otra terminal: `npm run lighthouse`

El reporte queda en `lighthouse-report.html`.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si encuentras algún bug o tienes alguna sugerencia:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👤 Autor

**Pedro San Martín**

- LinkedIn: [@pedroignaciosanmartincarrasco](https://linkedin.com/in/pedroignaciosanmartincarrasco)
- GitHub: [@pedrignacio](https://github.com/pedrignacio)
- Email: psanmartincarrasco@gmail.com
- Ubicación: Hualpén, Bío-Bío, Chile

## 🙏 Agradecimientos

- Inspiración de diseño: [Awwwards](https://www.awwwards.com/)
- Iconos: Emojis nativos
- Fuentes: Inter, System Fonts

## 📝 Notas de Versión

### v1.0.0 (Octubre 2025)
- ✅ Lanzamiento inicial
- ✅ 5 secciones completas
- ✅ Diseño responsive
- ✅ Animaciones y transiciones
- ✅ Optimización de rendimiento

---

**Desarrollado por Pedro San Martín Carrasco**
