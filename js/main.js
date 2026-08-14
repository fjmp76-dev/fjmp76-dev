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
    'nav.clients': 'Clientes',
    'nav.contact': 'Contacto',
    'hero.eyebrow': '// desarrollo &amp; arquitectura de software',
    'hero.title': '24+ años construyendo sistemas <span class="gradient-text">de nivel empresarial</span>',
    'hero.tagline': 'Arquitecto de software especializado en .NET, Angular y AWS — convirtiendo requerimientos de negocio complejos en plataformas escalables y listas para producción.',
    'hero.cta1': 'Hablemos',
    'hero.cta2': 'Ver proyectos',
    'stats.exp': 'Años de experiencia',
    'stats.projects': 'Sistemas empresariales entregados',
    'stats.tech': 'Tecnologías dominadas',
    'stats.quality': 'Compromiso con la calidad',
    'about.eyebrow': '// sobre mí',
    'about.title': 'Convierto requerimientos complejos en sistemas en producción',
    'about.p1': 'Soy Arquitecto de Software con más de 24 años de experiencia en el stack de Microsoft — desde .NET Framework hasta .NET Core 10 — diseñando y entregando aplicaciones empresariales full-stack con Angular, C# y SQL Server, aplicando principios SOLID, patrones de diseño y Clean Architecture.',
    'about.p2': 'He arquitectado sistemas de punta a punta, desde el levantamiento de requerimientos (BRD) hasta producción, incluyendo infraestructura cloud en AWS (SNS/SQS, Secrets Manager, Kinesis, CodeBuild), pipelines de CI/CD con Docker, y librerías internas compartidas distribuidas vía CodeArtifact.',
    'about.p3': 'Más recientemente, he integrado a Claude (Anthropic) en mi flujo de trabajo — extrayendo reglas de negocio de código existente para generar documentación BRD y aplicando prompt engineering para acelerar el diseño y la documentación técnica. Ingeniero en Desarrollo de Software y Microsoft Certified: Azure Fundamentals.',
    'stack.eyebrow': '// tecnologías',
    'stack.title': 'Mi stack',
    'stack.backend.title': 'Backend',
    'stack.backend.desc': '.NET Core 10, C#, ASP.NET Core Web API, Entity Framework, Dapper, FluentValidation',
    'stack.frontend.title': 'Frontend',
    'stack.frontend.desc': 'Angular 8/14/21, TypeScript, RxJS, React, Redux',
    'stack.cloud.title': 'Cloud &amp; DevOps',
    'stack.cloud.desc': 'AWS (SNS/SQS, Secrets Manager, Kinesis), Docker, Azure DevOps, CI/CD',
    'stack.arch.title': 'Arquitectura',
    'stack.arch.desc': 'SOLID, Patrones de diseño, Clean Architecture, Microservicios, DI/IoC',
    'stack.ai.title': 'IA &amp; Productividad',
    'stack.ai.desc': 'Claude (Anthropic), Prompt Engineering, RAG, GitHub Copilot',
    'projects.eyebrow': '// portafolio',
    'projects.title': 'Proyectos destacados',
    'projects.p1.title': 'CAPES — Case Management System',
    'projects.p1.desc': 'Plataforma empresarial de gestión de beneficios para el Estado de Nueva Jersey — frontend en Angular 21 sobre microservicios independientes en .NET Core, con integración AWS SNS/SQS para la recepción automática de solicitudes.',
    'projects.p2.title': 'Audit Online',
    'projects.p2.desc': 'Plataforma de evaluación de riesgos y análisis de auditoría para clientes de Deloitte, construida con Angular y un backend en .NET Core Web API conectado a SQL Server.',
    'projects.p3.title': 'Residence Contracts Application',
    'projects.p3.desc': 'Plataforma de selección de vivienda estudiantil para Nova Southeastern University, combinando Angular y React sobre un backend en .NET Core.',
    'clients.eyebrow': '// trayectoria profesional',
    'clients.title': 'Empresas con las que he trabajado',
    'clients.c1.title': 'SSO empresarial &amp; gestión de franquicias',
    'clients.c1.desc': 'Construí un módulo de autenticación reutilizable adoptado en las aplicaciones de Burger King, Tim Hortons y Popeyes para integrar Okta SSO — evitando una reescritura completa y ahorrando a la compañía más de $100,000. Después lideré el diseño de una plataforma unificada que consolidó cuatro aplicaciones legadas.',
    'clients.c2.title': 'Modernización de aplicaciones internas',
    'clients.c2.desc': 'Modernicé aplicaciones internas para la cervecería más grande del mundo, incluyendo la migración de un sistema legado de registro de acciones a WPF/XAML y la reconstrucción de herramientas de remediación sobre .NET con SQL Server.',
    'clients.c3.title': 'Plataforma de integración fiscal',
    'clients.c3.desc': 'Lideré proyectos de integración para facturación electrónica e intercambio de documentos fiscales, construyendo portales personalizados para clientes y traductores basados en XML/XSLT que conectaban sistemas ERP con las autoridades fiscales.',
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
    'nav.clients': 'Clients',
    'nav.contact': 'Contact',
    'hero.eyebrow': '// software architect · .net &amp; angular',
    'hero.title': '24+ years building <span class="gradient-text">enterprise-grade</span> systems',
    'hero.tagline': 'Software Architect specialized in .NET, Angular, and AWS cloud — turning complex business requirements into scalable, production-ready platforms.',
    'hero.cta1': "Let's talk",
    'hero.cta2': 'View projects',
    'stats.exp': 'Years of experience',
    'stats.projects': 'Enterprise systems delivered',
    'stats.tech': 'Technologies mastered',
    'stats.quality': 'Commitment to quality',
    'about.eyebrow': '// about me',
    'about.title': 'Turning complex requirements into production systems',
    'about.p1': "I'm a Software Architect with 24+ years of experience across the Microsoft stack — from .NET Framework to .NET Core 10 — designing and delivering full-stack enterprise applications with Angular, C#, and SQL Server, applying SOLID principles, design patterns, and Clean Architecture.",
    'about.p2': "I've architected systems end-to-end, from business requirements (BRD) to production, including cloud infrastructure on AWS (SNS/SQS, Secrets Manager, Kinesis, CodeBuild), containerized CI/CD pipelines with Docker, and internal shared libraries distributed via CodeArtifact.",
    'about.p3': "More recently, I've embedded Claude (Anthropic) into my workflow — extracting business rules from existing codebases to auto-generate BRD documentation and applying prompt engineering to speed up design and technical writing. Bachelor's in Software Engineering, and Microsoft Certified: Azure Fundamentals.",
    'stack.eyebrow': '// technologies',
    'stack.title': 'My stack',
    'stack.backend.title': 'Backend',
    'stack.backend.desc': '.NET Core 10, C#, ASP.NET Core Web API, Entity Framework, Dapper, FluentValidation',
    'stack.frontend.title': 'Frontend',
    'stack.frontend.desc': 'Angular 8/14/21, TypeScript, RxJS, React, Redux',
    'stack.cloud.title': 'Cloud &amp; DevOps',
    'stack.cloud.desc': 'AWS (SNS/SQS, Secrets Manager, Kinesis), Docker, Azure DevOps, CI/CD',
    'stack.arch.title': 'Architecture',
    'stack.arch.desc': 'SOLID, Design Patterns, Clean Architecture, Microservices, DI/IoC',
    'stack.ai.title': 'AI &amp; Productivity',
    'stack.ai.desc': 'Claude (Anthropic), Prompt Engineering, RAG, GitHub Copilot',
    'projects.eyebrow': '// portfolio',
    'projects.title': 'Featured projects',
    'projects.p1.title': 'CAPES — Case Management System',
    'projects.p1.desc': 'Enterprise benefits management platform for the State of New Jersey — Angular 21 frontend backed by independent .NET Core microservices, with AWS SNS/SQS integration for automated case intake.',
    'projects.p2.title': 'Audit Online',
    'projects.p2.desc': 'Risk assessment and audit analysis platform for Deloitte clients, built with Angular and a .NET Core Web API backend connected to SQL Server.',
    'projects.p3.title': 'Residence Contracts Application',
    'projects.p3.desc': 'Student housing selection platform for Nova Southeastern University, combining Angular and React on a .NET Core backend.',
    'clients.eyebrow': '// career highlights',
    'clients.title': "Companies I've worked with",
    'clients.c1.title': 'Enterprise SSO &amp; franchise management',
    'clients.c1.desc': 'Built a reusable authentication module adopted across Burger King, Tim Hortons, and Popeyes applications to integrate Okta SSO — avoiding a full rewrite and saving the company more than $100,000. Later led the design of a unified platform consolidating four legacy applications.',
    'clients.c2.title': 'Legacy modernization &amp; internal tools',
    'clients.c2.desc': "Modernized internal applications for the world's largest brewer, including migrating a legacy action-log system to WPF/XAML and rebuilding remediation tools on .NET with SQL Server.",
    'clients.c3.title': 'Tax compliance integration platform',
    'clients.c3.desc': 'Led integration projects for electronic invoicing and tax document exchange, building custom client portals and XML/XSLT-based translators connecting ERP systems to tax authorities.',
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
