export {};

const root = document.documentElement;
document.body.classList.add('js-ready');
const themeToggle = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
const languageToggle = document.querySelector<HTMLButtonElement>('[data-language-toggle]');
const menuToggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const navigationElement = document.querySelector<HTMLElement>('#primary-nav');
const navigationLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]'));
const languageCopies = Array.from(document.querySelectorAll<HTMLElement>('[data-language-copy]'));
const projectFilters = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-project-filter]'));
const projectCards = Array.from(document.querySelectorAll<HTMLElement>('[data-project-card]'));
const copyEmailButton = document.querySelector<HTMLButtonElement>('[data-copy-email]');
const copyFeedback = document.querySelector<HTMLElement>('[data-copy-feedback]');

const savedTheme = window.localStorage.getItem('kaiser-theme');
if (savedTheme === 'light' || savedTheme === 'dark') root.dataset.theme = savedTheme;

themeToggle?.addEventListener('click', () => {
  const nextTheme = root.dataset.theme === 'light' ? 'dark' : 'light';
  root.dataset.theme = nextTheme;
  window.localStorage.setItem('kaiser-theme', nextTheme);
});

languageToggle?.addEventListener('click', () => {
  const isEnglish = root.lang === 'en';
  const language = isEnglish ? 'zh' : 'en';
  root.lang = isEnglish ? 'zh-CN' : 'en';
  for (const copy of languageCopies) copy.hidden = copy.dataset.languageCopy !== language;
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

for (const filter of projectFilters) {
  filter.addEventListener('click', () => {
    const selected = filter.dataset.projectFilter ?? 'all';
    for (const button of projectFilters) {
      const active = button === filter;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    }
    for (const card of projectCards) {
      const matches = selected === 'all' || card.dataset.projectStatus === selected;
      card.hidden = !matches;
    }
  });
}

copyEmailButton?.addEventListener('click', async () => {
  const email = copyEmailButton.dataset.copyEmail;
  if (!email || !copyFeedback) return;
  try {
    await navigator.clipboard.writeText(email);
    copyFeedback.textContent = 'Email copied to clipboard.';
  } catch {
    copyFeedback.textContent = email;
  }
});

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

  const revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    },
    { threshold: 0.12 },
  );
  for (const element of document.querySelectorAll<HTMLElement>('[data-reveal]')) revealObserver.observe(element);
}
