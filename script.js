import { profile, trajectory, skills, projects, services, uiTranslations } from './database.js';

// Em DEV: backend local. Em produção troque pela URL do Render.
// let currentLang = localStorage.getItem("portfolio-lang") || "pt";

let currentLang = localStorage.getItem("portfolio-lang") || "pt";

function initApp() {
  // Inicializa os ícones do Lucide
  lucide.createIcons();

  /* 
    ========================================
    1. GENERAL UI UPDATES & TRANSLATIONS
    ========================================
  */
  document.getElementById("current-year").textContent =
    new Date().getFullYear();

  // Social Links (Universal)
  // Social Links (Universal)
  document.getElementById("github").href = profile.social.github;
  document.getElementById("linkedin").href = profile.social.linkedin;
  document.getElementById("mail").href = profile.social.email;
  document.getElementById("instagram").href = profile.social.instagram;

  // Footer Social
  document.getElementById("footer-github").href = profile.social.github;
  document.getElementById("footer-linkedin").href = profile.social.linkedin;
  document.getElementById("footer-instagram").href = profile.social.instagram;

  // Initial Content Load
  // Initial Content Load
  renderSkills();
  updateLanguage(currentLang);

  // Language Toggle Logic
  const langToggle = document.getElementById("lang-toggle");
  if (langToggle) {
    langToggle.addEventListener("click", () => {
      currentLang = currentLang === "pt" ? "en" : "pt";
      updateLanguage(currentLang);
    });
  }

  /* 
    ========================================
    2. HERO IMAGE INTERACTION (PARALLAX)
    ========================================
  */
  const heroSection = document.getElementById("home");
  const profileImageContainer = document.querySelector(".perspective-1000"); // Container handling perspective
  const profileImage = document.getElementById("profile-image");

  if (heroSection && profileImageContainer && profileImage) {
    heroSection.addEventListener("mousemove", (e) => {
      const { offsetWidth: width, offsetHeight: height } = heroSection;
      const { clientX: x, clientY: y } = e;

      // Calculate center relative coordinates
      const xPos = (x / width - 0.5) * 20; // Max rotation deg X
      const yPos = (y / height - 0.5) * 20; // Max rotation deg Y

      // Apply transformation
      // Note: RotateX affects Y axis visually, RotateY affects X axis visually
      profileImage.style.transform = `perspective(1000px) rotateY(${xPos}deg) rotateX(${-yPos}deg) scale(1.05)`;
    });

    heroSection.addEventListener("mouseleave", () => {
      // Reset position
      profileImage.style.transform =
        "perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)";
    });
  }
}

// Execute app initialization
initApp();

/* 
  ========================================
  CORE FUNCTIONS
  ========================================
*/

function updateLanguage(lang) {
  // Save preference
  localStorage.setItem("portfolio-lang", lang);

  // Update Lang Button Label
  const langLabel = document.getElementById("lang-label");
  if (langLabel) langLabel.textContent = lang.toUpperCase();

  // 1. Update Static UI Elements (data-i18n)
  const translations = uiTranslations[lang];
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[key]) {
      el.textContent = translations[key];
    }
  });

  // 2. Update Profile Dynamic Info
  document.getElementById("profile-name").textContent = profile.name;
  document.getElementById("profile-tagline").textContent = `${
    profile[lang].role
  }. ${profile[lang].tagline}`;
  document.getElementById("profile-description").textContent =
    profile[lang].description;

  // 3. Re-render Projects (Language dependent)
  renderProjects(lang);

  // 4. Render Trajectory (Language dependent)
  renderTrajectory(lang);

  // 5. Render Skills
  // 5. Render Skills (Moved to Init)
  // renderSkills();

  // 6. Render Services
  renderServices(lang);

  // Re-init generic icons just in case
  lucide.createIcons();
}

function renderTrajectory(lang) {
  const container = document.getElementById("trajectory-container");
  if (!container) return;

  container.innerHTML = trajectory
    .map(
      (item) => `
          <div class="relative pl-8 md:pl-16 group">
              <!-- Icon Marker -->
              <div
              class="absolute -left-5 top-0 w-10 h-10 rounded-full bg-slate-900 border-2 border-slate-700 group-hover:border-blue-500 group-hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-lg group-hover:shadow-blue-500/30 z-10"
              >
                <i data-lucide="${item.icon}" class="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors"></i>
              </div>
  
              <!-- Content -->
              <div
              class="flex flex-col sm:flex-row gap-2 sm:items-center mb-2 animate-fadeIn"
              >
              <h3 class="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  ${item[lang].title}
              </h3>
              <span class="text-sm font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                  ${item.year}
              </span>
              </div>
  
              <p class="text-slate-400 leading-relaxed max-w-3xl">
              ${item[lang].desc}
              </p>
          </div>
      `,
    )
    .join("");

  // Refresh icons because we just added new ones to the DOM
  lucide.createIcons();
}

function renderSkills() {
  const track = document.getElementById("skills-track");
  if (!track) return;

  const iconMap = {
    HTML: "devicon-html5-plain",
    CSS: "devicon-css3-plain",
    JavaScript: "devicon-javascript-plain",
    React: "devicon-react-original",
    TypeScript: "devicon-typescript-plain",
    Tailwind: "devicon-tailwindcss-original",
    "Node.js": "devicon-nodejs-plain",
    PHP: "devicon-php-plain",
    Python: "devicon-python-plain",
    PostgreSQL: "devicon-postgresql-plain",
    "Git/GitHub": "devicon-git-plain",
    Figma: "devicon-figma-plain",
    WordPress: "devicon-wordpress-plain",
  };

  const allSkills = skills.flatMap((s) => s.items);
  const uniqueSkills = [...new Set(allSkills)];

  const generateCards = () => {
    return uniqueSkills
      .map((skill) => {
        const iconClass = iconMap[skill] || "devicon-devicon-plain";
        return `
            <div class="skill-card">
                <i class="${iconClass}"></i>
                <span class="text-slate-300 font-medium">${skill}</span>
            </div>
        `;
      })
      .join("");
  };

  track.innerHTML = generateCards();
  addAnimation();
}

function addAnimation() {
  const scrollers = document.querySelectorAll(".scroller");
  scrollers.forEach((scroller) => {
    if (scroller.getAttribute("data-animated")) return;
    scroller.setAttribute("data-animated", "true");

    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);

    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", "true");
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}

function renderProjects(lang) {
  const container = document.getElementById("projects-container");
  if (!container) return;

  container.innerHTML = projects
    .map(
      (p) => `
        <div class="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:border-blue-400 transition group h-full flex flex-col">
          <div class="overflow-hidden h-48">
              <img src="${
                p.image
              }" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
          </div>

          <div class="p-6 flex flex-col flex-grow">
            <h3 class="text-xl font-bold text-white">${p.title}</h3>
            <p class="text-slate-400 text-sm mt-2 flex-grow">${p[lang].desc}</p>

            <div class="flex flex-wrap gap-2 mt-4 mb-6">
              ${p.techs
                .map(
                  (t) =>
                    `<span class="text-xs px-2 py-1 bg-blue-900/30 text-blue-400 rounded border border-blue-900/50">${t}</span>`,
                )
                .join("")}
            </div>

            <div class="flex gap-4 mt-auto">
              <a href="${
                p.liveLink
              }" class="flex items-center gap-1 text-slate-300 hover:text-blue-400 transition"><i data-lucide="external-link" class="w-4 h-4"></i> Demo</a>
              <a href="${
                p.repoLink
              }" class="flex items-center gap-1 text-slate-300 hover:text-blue-400 transition"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg> Código</a>
            </div>
          </div>
        </div>
      `,
    )
    .join("");
}

function renderServices(lang) {
  const container = document.getElementById("services-container");
  if (!container) return;

  container.innerHTML = services
    .map(
      (s) => `
        <div class="service-card group">
          <div class="service-icon-box">
            <i data-lucide="${s.icon}" class="w-8 h-8 text-blue-400 group-hover:text-blue-500 transition-colors"></i>
          </div>
          <h3 class="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
            ${s[lang].title}
          </h3>
          <p class="text-slate-400 text-sm leading-relaxed">
            ${s[lang].desc}
          </p>
        </div>
      `,
    )
    .join("");
}

/* 
  ========================================
  MOBILE MENU & CONTACT
  ========================================
*/
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    mobileMenuBtn.innerHTML = mobileMenu.classList.contains("hidden")
      ? '<i data-lucide="menu"></i>'
      : '<i data-lucide="x"></i>';
    lucide.createIcons();
  });
}

// Contact Actions
const emailBtn = document.getElementById("contact-email");
const whatsappBtn = document.getElementById("contact-whatsapp");

if (emailBtn && profile.social.email) {
  emailBtn.href = `mailto:${profile.social.email}`;
}

if (whatsappBtn && profile.social.phone) {
  if (profile.social.phone.startsWith("http")) {
    whatsappBtn.href = profile.social.phone;
  } else {
    const phoneClean = profile.social.phone.replace(/\D/g, "");
    whatsappBtn.href = `https://wa.me/${phoneClean}?text=Olá!%20Vi%20seu%20portfólio%20e%20gostaria%20de%20conversar.`;
  }
}
