export interface PublicProfile {
  name: string;
  englishName: string;
  brand: string;
  headline: {
    zh: string;
    en: string;
  };
  education: string;
  focus: string[];
  github: string;
  githubUrl: string;
  publicEmail: string;
  introduction: {
    zh: string;
    en: string;
  };
}

export const profile: PublicProfile = {
  name: '于越',
  englishName: 'Yue Yu',
  brand: 'KAISER',
  headline: {
    zh: '把复杂的问题，做成可见的作品。',
    en: 'Making complex ideas visible through working systems.',
  },
  education: '东北林业大学 · 工程管理 / 计算机科学辅修',
  focus: ['Software Development', 'AI & RAG', 'Engineering Data', 'Local-first Tools'],
  github: 'KaiserIIII',
  githubUrl: 'https://github.com/KaiserIIII',
  publicEmail: 'hello@kaiseriii.me',
  introduction: {
    zh: '工程管理背景，持续向软件开发、人工智能和可复现工作流深入。喜欢把学习、研究和真实项目连接起来。',
    en: 'An engineering-management student moving deeper into software, AI, and reproducible workflows—turning learning into systems that can be seen and used.',
  },
};
