/* 
  ========================================
  STATIC DATA DATABASE
  ========================================
  This file acts as a local data source for the portfolio.
  It contains objects for Profile, Skills, Projects, and Trajectory.
*/

const profile = {
  name: "Davy Shebarro",
  social: {
    github: "https://github.com/DShebarro",
    linkedin: "https://www.linkedin.com/in/davyshebarro/",
    email: "dev.davyshebarro26@gmail.com",
    phone: "https://wa.me/5592981481789",
    instagram: "https://www.instagram.com/devshebs/",
  },
  // Multilingual Content
  pt: {
    role: "Desenvolvedor Fullstack",
    tagline: "Transformando ideias em experiências digitais.",
    description:
      "Sou desenvolvedor fullstack em constante evolução, movido pela curiosidade e pela vontade de construir soluções que gerem impacto real. Minha jornada envolve engenharia de software, desenvolvimento web, bancos de dados, automação e fundamentos de machine learning e DevOps. Aprendo colocando a mão na massa, explorando como as coisas funcionam por trás do código. Atualmente, estudo Engenharia de Software na ANHANGUERA FACULDADE.",
  },
  en: {
    role: "Fullstack Developer",
    tagline: "Transforming ideas into digital experiences.",
    description:
      "I am a full stack developer in constant evolution, driven by curiosity and the desire to build solutions that create real impact. My journey involves software engineering, web development, databases, automation, and fundamentals of machine learning and DevOps. I learn by getting hands-on and exploring how things work behind the code. Currently, I study Software Engineering at ANHANGUERA University.",
  },
};

const trajectory = [
  {
    year: "2023",
    icon: "code",
    pt: {
      title: "Primeiras Linhas de Código",
      desc: "Iniciei meus estudos com HTML, CSS e Lógica de Programação.",
    },
    en: {
      title: "First Lines of Code",
      desc: "Started my studies with HTML, CSS, and Programming Logic.",
    },
  },
  {
    year: "2024",
    icon: "book-open",
    pt: {
      title: "Faculdade de Engenharia de Software",
      desc: "Ingressei no curso superior e me apaixonei pela área.",
    },
    en: {
      title: "Software Engineering College",
      desc: "Started my degree and fell in love with the field.",
    },
  },
  {
    year: "2025",
    icon: "globe",
    pt: {
      title: "Foco em Desenvolvimento Web",
      desc: "Especialização em JavaScript, React e Node.js.",
    },
    en: {
      title: "Web Development Focus",
      desc: "Specialization in JavaScript, React, and Node.js.",
    },
  },
  {
    year: "2026",
    icon: "briefcase",
    pt: {
      title: "Fullstack Developer",
      desc: "Atuando como freelancer e desenvolvendo projetos completos.",
    },
    en: {
      title: "Fullstack Developer",
      desc: "Working as a freelancer and developing complete projects.",
    },
  },
];

const skills = [
  {
    category: "Frontend",
    icon: "code-2",
    items: ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Tailwind"],
  },
  {
    category: "Backend",
    icon: "server",
    items: ["Node.js", "PHP", "Python", "PostgreSQL"],
  },
  {
    category: "Ferramentas & Outros",
    icon: "cpu",
    items: ["Git/GitHub", "Figma", "Agile/Scrum", "WordPress"],
  },
];

const projects = [
  {
    title: "Pesquisa Inteligente com IA",
    image: "./assets/busca-inteligente-IA.png",
    techs: ["JavaScript(ES6+)", "HTML5", "CSS", "Tailwind CSS", "Gemini API"],
    liveLink: "#",
    repoLink: "#",
    pt: {
      desc: "Aplicação Single Page (SPA) - Pesquisa em tempo real com IA e Busca de Dado com API.",
    },
    en: {
      desc: "Single Page Application (SPA) - Real-time AI search and Data Fetching via API.",
    },
  },
  {
    title: "Gerenciador de Links",
    image: "./assets/gerenciador-de-link.png",
    techs: ["EXPO", "React Native", "TypeScript"],
    liveLink: "#",
    repoLink: "#",
    pt: {
      desc: "Aplicação de gerenciamento de links úteis, permitindo organizar e acessar recursos rapidamente.",
    },
    en: {
      desc: "Useful links management application allowing quick organization and access to resources.",
    },
  },
  {
    title: "Cadastro de Produtos - Automação",
    image: "./assets/cadastro-de-produtos-automacao.png",
    techs: ["Python", "Pandas", "PyAutoGui"],
    liveLink: "#",
    repoLink: "#",
    pt: {
      desc: "Script de automação para cadastro de produtos em massa, economizando tempo e reduzindo erros.",
    },
    en: {
      desc: "Automation script for bulk product registration, saving time and reducing errors.",
    },
  },
];

const services = [
  {
    icon: "layout",
    pt: {
      title: "Desenvolvimento Frontend",
      desc: "Criação de interfaces modernas, responsivas e interativas utilizando React, Tailwind CSS e as melhores práticas de UX/UI.",
    },
    en: {
      title: "Frontend Development",
      desc: "Creation of modern, responsive, and interactive interfaces using React, Tailwind CSS, and UX/UI best practices.",
    },
  },
  {
    icon: "server",
    pt: {
      title: "Soluções Backend",
      desc: "Desenvolvimento de APIs robustas, arquitetura de banco de dados e lógica de servidor segura e escalável.",
    },
    en: {
      title: "Backend Solutions",
      desc: "Development of robust APIs, database architecture, and secure, scalable server-side logic.",
    },
  },
  {
    icon: "cpu",
    pt: {
      title: "Automação & Performance",
      desc: "Scripts para automatizar tarefas repetitivas e otimização de aplicações para garantir máxima velocidade.",
    },
    en: {
      title: "Automation & Performance",
      desc: "Scripts to automate repetitive tasks and application optimization to ensure maximum speed.",
    },
  },
];

// UI Translations
const uiTranslations = {
  pt: {
    "nav-about": "Sobre",
    "nav-trajectory": "Trajetória", // New
    "nav-skills": "Habilidades",
    "nav-projects": "Projetos",
    "nav-contact": "Contato",
    "hero-tag": "Disponível para novos projetos",
    "hero-title-prefix": "Olá, eu sou",
    "hero-subtitle": "", // Dynamic from profile
    "btn-contact": "Entrar em Contato",
    "btn-projects": "Ver Projetos",
    "section-about": "Sobre Mim",
    "section-trajectory": "Minha Jornada", // New
    "section-skills": "Minhas Habilidades",
    "section-projects": "Projetos em Destaque",
    "section-contact": "Vamos Conversar?",
    "contact-email-title": "Email",
    "contact-email-desc":
      "Envie uma mensagem detalhada sobre seu projeto ou oportunidade.",
    "contact-email-btn": "Enviar Email",
    "contact-wa-title": "WhatsApp",
    "contact-wa-desc":
      "Vamos bater um papo rápido e tirar suas dúvidas agora mesmo.",
    "contact-wa-btn": "Iniciar Conversa",
    "footer-rights": "Todos os direitos reservados.",
  },
  en: {
    "nav-about": "About",
    "nav-trajectory": "Trajectory", // New
    "nav-skills": "Skills",
    "nav-projects": "Projects",
    "nav-contact": "Contact",
    "hero-tag": "Available for new projects",
    "hero-title-prefix": "Hi, I am",
    "hero-subtitle": "", // Dynamic
    "btn-contact": "Get in Touch",
    "btn-projects": "View Projects",
    "section-about": "About Me",
    "section-trajectory": "My Journey", // New
    "section-skills": "My Skills",
    "section-projects": "Featured Projects",
    "section-contact": "Let's Talk?",
    "contact-email-title": "Email",
    "contact-email-desc":
      "Send a detailed message about your project or opportunity.",
    "contact-email-btn": "Send Email",
    "contact-wa-title": "WhatsApp",
    "contact-wa-desc":
      "Let's have a quick chat and answer your questions right now.",
    "contact-wa-btn": "Start Chat",
    "footer-rights": "All rights reserved.",
  },
};
