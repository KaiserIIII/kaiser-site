export {};

const root = document.documentElement;
const themeToggle = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
const languageToggle = document.querySelector<HTMLButtonElement>('[data-language-toggle]');
const menuToggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const navigationElement = document.querySelector<HTMLElement>('#primary-nav');
const navigationLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]'));
const heroLead = document.querySelector<HTMLElement>('.hero-lead');

const savedTheme = window.localStorage.getItem('kaiser-theme');
if (savedTheme === 'light' || savedTheme === 'dark') root.dataset.theme = savedTheme;

themeToggle?.addEventListener('click', () => {
  const nextTheme = root.dataset.theme === 'light' ? 'dark' : 'light';
  root.dataset.theme = nextTheme;
  window.localStorage.setItem('kaiser-theme', nextTheme);
});

languageToggle?.addEventListener('click', () => {
  const isEnglish = root.lang === 'en';
  root.lang = isEnglish ? 'zh-CN' : 'en';
  if (heroLead) heroLead.textContent = isEnglish ? heroLead.dataset.copyZh ?? '' : heroLead.dataset.copyEn ?? '';
  languageToggle.textContent = isEnglish ? '中 / EN' : 'EN / 中';
});

menuToggle?.addEventListener('click', () => {
  const isOpen = navigationElement?.dataset.open === 'true';
  if (navigationElement) navigationElement.dataset.open = String(!isOpen);
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
});

for (const link of navigationLinks) {
  link.addEventListener('click', () => {
    if (navigationElement) navigationElement.dataset.open = 'false';
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
}

const observedSections = navigationLinks
  .map((link) => document.querySelector<HTMLElement>(link.hash))
  .filter((section): section is HTMLElement => section !== null);

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        for (const link of navigationLinks) {
          link.toggleAttribute('aria-current', link.hash === `#${entry.target.id}`);
        }
      }
    },
    { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
  );
  for (const section of observedSections) observer.observe(section);
}
