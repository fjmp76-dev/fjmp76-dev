// Menú móvil
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Año dinámico
document.getElementById('year').textContent = new Date().getFullYear();

// Reveal al hacer scroll
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// Contador animado de stats
function animateCount(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1400;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-number').forEach(animateCount);
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

const statsSection = document.querySelector('.stats');
if (statsSection) statsObserver.observe(statsSection);

// ---- i18n ----
const translations = {
  es: {
    'nav.home': 'Inicio',
    'nav.about': 'Sobre mí',
    'nav.stack': 'Stack',
    'nav.projects': 'Proyectos',
    'nav.contact': 'Contacto',
    'hero.eyebrow': '// desarrollo &amp; arquitectura de software',
    'hero.title': 'Construyo sistemas <span class="gradient-text">robustos</span> y escalables',
    'hero.tagline': 'Ingeniería de software con foco en arquitectura limpia, rendimiento y código que perdura.',
    'hero.cta1': 'Hablemos',
    'hero.cta2': 'Ver proyectos',
    'stats.exp': 'Años de experiencia',
    'stats.projects': 'Proyectos entregados',
    'stats.tech': 'Tecnologías dominadas',
    'stats.quality': 'Compromiso con la calidad',
    'about.eyebrow': '// sobre mí',
    'about.title': 'Diseño software que resuelve problemas reales',
    'about.p1': 'Soy desarrollador y arquitecto de software enfocado en construir sistemas confiables, mantenibles y preparados para escalar. Disfruto llevar ideas desde el diseño de arquitectura hasta producción.',
    'about.p2': 'Trabajo con equipos multidisciplinarios aplicando buenas prácticas de ingeniería, patrones de diseño y una visión clara del negocio detrás de cada línea de código.',
    'about.p3': 'Siempre en constante aprendizaje, buscando el balance entre pragmatismo técnico y excelencia arquitectónica.',
    'stack.eyebrow': '// tecnologías',
    'stack.title': 'Mi stack',
    'stack.backend.title': 'Backend',
    'stack.backend.desc': 'Node.js, Python, Java, .NET, APIs REST &amp; GraphQL',
    'stack.frontend.title': 'Frontend',
    'stack.frontend.desc': 'JavaScript, TypeScript, React, HTML5/CSS3',
    'stack.cloud.title': 'Cloud &amp; DevOps',
    'stack.cloud.desc': 'AWS, Azure, Docker, Kubernetes, CI/CD',
    'stack.arch.title': 'Arquitectura',
    'stack.arch.desc': 'Microservicios, DDD, Event-Driven, Patrones de diseño',
    'projects.eyebrow': '// portafolio',
    'projects.title': 'Proyectos destacados',
    'projects.p1.title': 'Plataforma de microservicios',
    'projects.p1.desc': 'Arquitectura distribuida orientada a eventos para procesamiento en tiempo real.',
    'projects.p2.title': 'Dashboard de analítica',
    'projects.p2.desc': 'Panel interactivo de métricas en tiempo real con visualizaciones de datos.',
    'projects.p3.title': 'API de infraestructura cloud',
    'projects.p3.desc': 'Servicio de automatización de infraestructura con despliegues continuos.',
    'contact.eyebrow': '// contacto',
    'contact.title': 'Construyamos algo juntos',
    'contact.sub': '¿Tienes un proyecto en mente? Escríbeme y conversemos.',
    'footer.rights': 'Todos los derechos reservados',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.stack': 'Stack',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'hero.eyebrow': '// software development &amp; architecture',
    'hero.title': 'I build <span class="gradient-text">robust</span>, scalable systems',
    'hero.tagline': 'Software engineering focused on clean architecture, performance, and code that lasts.',
    'hero.cta1': "Let's talk",
    'hero.cta2': 'View projects',
    'stats.exp': 'Years of experience',
    'stats.projects': 'Projects delivered',
    'stats.tech': 'Technologies mastered',
    'stats.quality': 'Commitment to quality',
    'about.eyebrow': '// about me',
    'about.title': 'I design software that solves real problems',
    'about.p1': "I'm a software developer and architect focused on building reliable, maintainable systems that are ready to scale. I enjoy taking ideas from architecture design all the way to production.",
    'about.p2': 'I work with cross-functional teams applying solid engineering practices, design patterns, and a clear understanding of the business behind every line of code.',
    'about.p3': 'Always learning, always balancing technical pragmatism with architectural excellence.',
    'stack.eyebrow': '// technologies',
    'stack.title': 'My stack',
    'stack.backend.title': 'Backend',
    'stack.backend.desc': 'Node.js, Python, Java, .NET, REST &amp; GraphQL APIs',
    'stack.frontend.title': 'Frontend',
    'stack.frontend.desc': 'JavaScript, TypeScript, React, HTML5/CSS3',
    'stack.cloud.title': 'Cloud &amp; DevOps',
    'stack.cloud.desc': 'AWS, Azure, Docker, Kubernetes, CI/CD',
    'stack.arch.title': 'Architecture',
    'stack.arch.desc': 'Microservices, DDD, Event-Driven, Design Patterns',
    'projects.eyebrow': '// portfolio',
    'projects.title': 'Featured projects',
    'projects.p1.title': 'Microservices platform',
    'projects.p1.desc': 'Event-driven distributed architecture for real-time processing.',
    'projects.p2.title': 'Analytics dashboard',
    'projects.p2.desc': 'Interactive real-time metrics panel with data visualizations.',
    'projects.p3.title': 'Cloud infrastructure API',
    'projects.p3.desc': 'Infrastructure automation service with continuous deployments.',
    'contact.eyebrow': '// contact',
    'contact.title': "Let's build something together",
    'contact.sub': 'Have a project in mind? Reach out and let\'s talk.',
    'footer.rights': 'All rights reserved',
  },
};

const LANG_KEY = 'fjmp76-lang';

function applyLang(lang) {
  const dict = translations[lang];
  if (!dict) return;

  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const key = el.dataset.i18nHtml;
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  localStorage.setItem(LANG_KEY, lang);
}

document.querySelectorAll('.lang-btn').forEach((btn) => {
  btn.addEventListener('click', () => applyLang(btn.dataset.lang));
});

const savedLang = localStorage.getItem(LANG_KEY);
applyLang(savedLang || 'en');
