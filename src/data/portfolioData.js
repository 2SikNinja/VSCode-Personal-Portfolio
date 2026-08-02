/* ════════════════════════════════════════════════════════════════
   portfolioData.js — THE ONLY FILE YOU NEED TO EDIT

   Every piece of text, URL, stat, and content displayed on the
   portfolio lives here. The page components only handle layout.

   ICONS: All icons use string keys that map to @thesvg/react
   components via svgIcons.js. Browse https://thesvg.org to find
   new icons, then add them to svgIcons.js and reference the key here.

   IMAGES: Project screenshots, headshots, etc. go in /public/assets/images/
   ════════════════════════════════════════════════════════════════ */

// ─── Base path (must match vite.config.js `base`) ───
const assetBase = '';

export const assets = {
  base: assetBase,
  images: `${assetBase}/assets/images`,
};

// ════════════════════════════════════════════════════════════════
// PERSONAL INFO
// ════════════════════════════════════════════════════════════════

export const personalInfo = {
  firstName: 'Peter',
  lastName: 'Nguyen',
  lastNameColor: '#f472b6',
  titleBarLabel: 'peter-nguyen : portfolio',
  sidebarLabel: 'Portfolio',
  copilotName: "Peter's Copilot",
  githubUsername: '2SikNinja',
  repoName: 'peter-portfolio',
  githubUrl: 'https://github.com/2SikNinja/',
  resumeFileName: 'Peter_Nguyen_Resu...',
};

// ════════════════════════════════════════════════════════════════
// HOME PAGE
// ════════════════════════════════════════════════════════════════

export const homePageData = {
  greeting: '// hello world !! Welcome to my portfolio',
  tagline: 'Building full-stack apps and exploring cybersecurity 🚀',
  description: [
    { text: 'I live at the crossroads of ', bold: false },
    { text: 'software engineering', bold: true },
    { text: ', ', bold: false },
    { text: 'data science', bold: true },
    { text: ', and ', bold: false },
    { text: 'cybersecurity', bold: true },
    { text: '. I build systems that are genuinely ', bold: false },
    { text: 'impactful and scalable', bold: true },
    { text: '.', bold: false },
  ],
  roleBadges: [
    { label: 'Software Engineer', dot: '#7aa2f7', accent: false },
    { label: 'Data Analyst', dot: '#f7df1e', accent: false },
    { label: 'Full-Stack Dev', dot: '#10b981', accent: false },
    { label: '@ Open to Work', dot: '#f472b6', accent: true },
  ],
  stats: [
    { value: '1+', label: 'YEARS' },
    { value: '5+', label: 'PROJECTS' },
    { value: '∞', label: 'CURIOSITY' },
    { value: '↑', label: 'ALWAYS LEARNING' },
  ],
  ctaButtons: [
    { label: '📁 Projects', target: 'projects', primary: true },
    { label: '± About Me', target: 'about', primary: false },
    { label: '✉ Contact', target: 'contact', primary: false },
  ],
};

// ════════════════════════════════════════════════════════════════
// ABOUT PAGE
// ════════════════════════════════════════════════════════════════

export const aboutPageData = {
  comment: '/* about.html — get to know me */',
  subtitle: '// a developer who loves building things that matter',
  paragraphs: [
    "With a B.S. in Computer Science from Cal Poly Pomona, a minor in Data Science, and a Google Cybersecurity Certificate, I focus on software engineering and application development. My Data Science background fuels a strong interest in artificial intelligence, and I enjoy finding ways to bring AI into the tools and apps I build.",
    "I thrive in fast-paced, collaborative environments where I can solve real problems and ship working software. Whether it's designing a data pipeline, building an interactive UI, or analyzing security vulnerabilities, I bring curiosity and persistence to everything I work on. I'm currently seeking my first full-time role in software engineering, data, or cybersecurity.",
    "Beyond coding, my interests range from competitive gaming to collecting cards. I've been part of the League of Legends community for years and recently started building decks in Riftbound. Live events and discovering new music round out the rest of my time.",
  ],
  education: {
    degree: 'B.S. Computer Science, Minor in Data Science',
    school: 'Cal Poly Pomona',
    year: 'May 2024',
  },
};

// ════════════════════════════════════════════════════════════════
// PAGE HEADERS (comments & subtitles)
// ════════════════════════════════════════════════════════════════

export const contactPageData = {
  comment: "/* contact.css — let's build something */",
  subtitle: '// open to work, collabs & good conversations',
  formNote: '// Powered by Formspree (lands directly in my inbox) :p',
  submitLabel: '→ send_message()',
};

export const projectsPageData = {
  comment: "/* projects.js — things I've built */",
  subtitle: '// each project is an export default function',
};

export const skillsPageData = {
  comment: '/* skills.json — my tech stack */',
  subtitle: '// JSON.parse(peter.skills)',
};

export const experiencePageData = {
  comment: "/* experience.ts — where I've worked */",
  subtitle: '// interface WorkExperience { role, company, impact }',
};

// ════════════════════════════════════════════════════════════════
// SOURCE CONTROL PANEL
// ════════════════════════════════════════════════════════════════

export const sourceControlData = {
  branch: 'main',
  commitStatus: '↑ 1 commit ahead',
  stats: [
    { value: '3', label: 'Modified', color: '#f7df1e' },
    { value: '1', label: 'Added', color: '#10b981' },
    { value: '0', label: 'Deleted', color: '#ef4444' },
  ],
};

// ════════════════════════════════════════════════════════════════
// STATUS BAR
// ════════════════════════════════════════════════════════════════

export const statusBarData = {
  branch: '⊙ main',
  errors: '↻ 0  ⚠ 0',
  language: 'TypeScript React',
  encoding: 'UTF-8',
  formatter: 'Prettier',
  theme: 'Peter Dark',
  copilotLabel: 'Copilot',
};

// ════════════════════════════════════════════════════════════════
// BREADCRUMB
// ════════════════════════════════════════════════════════════════

export const breadcrumbData = {
  root: 'peter-nguyen',
  folder: 'src',
};

// ════════════════════════════════════════════════════════════════
// FILE LIST (sidebar & tabs) — iconKey maps to svgIcons.js
// ════════════════════════════════════════════════════════════════

export const fileList = [
  { name: 'home.tsx',       iconKey: 'tsx',  id: 'home' },
  { name: 'about.html',     iconKey: 'html', id: 'about' },
  { name: 'projects.js',    iconKey: 'js',   id: 'projects' },
  { name: 'skills.json',    iconKey: 'json', id: 'skills' },
  { name: 'experience.ts',  iconKey: 'ts',   id: 'experience' },
  { name: 'contact.css',    iconKey: 'css',  id: 'contact' },
];

// ════════════════════════════════════════════════════════════════
// SOCIAL LINKS — logoKey maps to svgIcons.js
// ════════════════════════════════════════════════════════════════

export const socialLinks = [
  { label: 'GitHub',   logoKey: 'github',   url: 'https://github.com/2SikNinja' },
  { label: 'LinkedIn', logoKey: 'linkedin', url: 'https://linkedin.com/in/phupeternguyen' },
  { label: 'LeetCode', logoKey: 'leetcode', url: '#' },
  { label: 'Email',    logoKey: 'email',    url: 'mailto:peter.nguyen2121@gmail.com?subject=Hey%20Peter!&body=Hi%20Peter,%20I%20found%20your%20portfolio%20and%20wanted%20to%20reach%20out%20about...' },
];

export const contactSocials = [
  { label: 'EMAIL',     value: 'peter.nguyen2121@gmail.com',      logoKey: 'email',     url: 'mailto:peter.nguyen2121@gmail.com?subject=Hey%20Peter!&body=Hi%20Peter,%20I%20found%20your%20portfolio%20and%20wanted%20to%20reach%20out%20about...' },
  { label: 'LINKEDIN',  value: 'linkedin.com/in/phupeternguyen',  logoKey: 'linkedin',  url: 'https://linkedin.com/in/phupeternguyen' },
  { label: 'GITHUB',    value: 'github.com/2SikNinja',            logoKey: 'github',    url: 'https://github.com/2SikNinja' },
  { label: 'PORTFOLIO', value: 'peternguyen.vercel.app',           logoKey: 'portfolio', url: 'https://peternguyen.vercel.app' },
];

// ════════════════════════════════════════════════════════════════
// PROJECTS — techLogoKeys map to svgIcons.js
// ════════════════════════════════════════════════════════════════

export const projectsData = [
  {
    title: 'Hextech Insight',
    description: 'A League of Legends analytics platform providing real-time player statistics, match history, and performance insights to help players improve their gameplay.',
    tech: ['React', 'Node.js', 'Riot API', 'PostgreSQL'],
    techLogoKeys: ['react', 'nodejs', 'riotapi', 'postgresql'],
    color: '#6366f1',
    image: `${assets.images}/hextech-insight.png`,
    links: { github: 'https://github.com/2SikNinja', live: null },
  },
  {
    title: 'Conscious Cart',
    description: "AI-powered sustainable shopping app built for Google's AI Hackathon. Helps users make eco-friendly purchasing decisions through product analysis and smart recommendations.",
    tech: ['Flutter', 'Dart', 'Google AI', 'Firebase'],
    techLogoKeys: ['flutter', 'dart', 'googleai', 'firebase'],
    color: '#10b981',
    image: `${assets.images}/conscious-cart.png`,
    links: { github: 'https://github.com/2SikNinja', live: null },
  },
  {
    title: 'Chess Neural Network',
    description: 'A deep learning model trained to evaluate chess positions and suggest optimal moves. Built from scratch using neural network architecture and thousands of game records.',
    tech: ['Python', 'TensorFlow', 'NumPy', 'Chess.py'],
    techLogoKeys: ['python', 'tensorflow', 'numpy', null],
    color: '#f59e0b',
    image: `${assets.images}/chess-neural-net.png`,
    links: { github: 'https://github.com/2SikNinja', live: null },
  },
  {
    title: 'Portfolio Website',
    description: 'A modern, responsive personal portfolio built with React and TypeScript. Features modular CSS architecture, full-screen image modals, and smooth scroll animations.',
    tech: ['TypeScript', 'React', 'CSS Modules', 'Vercel'],
    techLogoKeys: ['typescript', 'react', 'css', 'vercel'],
    color: '#ec4899',
    image: `${assets.images}/portfolio-website.png`,
    links: { github: 'https://github.com/2SikNinja', live: 'https://peternguyen.vercel.app' },
  },
];

// ════════════════════════════════════════════════════════════════
// SKILLS — logoKey maps to svgIcons.js
// ════════════════════════════════════════════════════════════════

export const skillsData = {
  languages: [
    { name: 'Python',     logoKey: 'python' },
    { name: 'JavaScript', logoKey: 'javascript' },
    { name: 'TypeScript', logoKey: 'typescript' },
    { name: 'SQL',        logoKey: 'sql' },
    { name: 'Dart',       logoKey: 'dart' },
    { name: 'Java',       logoKey: 'java' },
    { name: 'C++',        logoKey: 'cpp' },
  ],
  frontend: [
    { name: 'React',        logoKey: 'react' },
    { name: 'Next.js',      logoKey: 'nextjs' },
    { name: 'Flutter',      logoKey: 'flutter' },
    { name: 'HTML/CSS',     logoKey: 'html' },
    { name: 'Tailwind CSS', logoKey: 'tailwindcss' },
  ],
  backend: [
    { name: 'Node.js',    logoKey: 'nodejs' },
    { name: 'Express',    logoKey: 'express' },
    { name: 'Firebase',   logoKey: 'firebase' },
    { name: 'PostgreSQL', logoKey: 'postgresql' },
    { name: 'REST APIs',  logoKey: null },
  ],
  dataAndMl: [
    { name: 'Pandas',       logoKey: 'pandas' },
    { name: 'NumPy',        logoKey: 'numpy' },
    { name: 'Matplotlib',   logoKey: 'matplotlib' },
    { name: 'Scikit-learn', logoKey: 'scikitlearn' },
    { name: 'Jupyter',      logoKey: 'jupyter' },
  ],
  toolsAndSecurity: [
    { name: 'Git',        logoKey: 'git' },
    { name: 'Linux',      logoKey: 'linux' },
    { name: 'Selenium',   logoKey: 'selenium' },
    { name: 'Docker',     logoKey: 'docker' },
    { name: 'SIEM Tools', logoKey: null },
    { name: 'NIST CSF',   logoKey: null },
  ],
};

export const skillCategories = [
  { key: 'languages',        label: 'languages',        color: '#f7df1e' },
  { key: 'frontend',         label: 'frontend',         color: '#61dafb' },
  { key: 'backend',          label: 'backend',          color: '#68a063' },
  { key: 'dataAndMl',        label: 'data_&_ml',        color: '#ff6f61' },
  { key: 'toolsAndSecurity', label: 'tools_&_security', color: '#a78bfa' },
];

// ════════════════════════════════════════════════════════════════
// EXPERIENCE
// ════════════════════════════════════════════════════════════════

export const experienceData = [
  {
    role: 'Data Analyst Intern',
    company: 'HAPII Lab',
    period: '2023',
    type: 'Internship',
    description: [
      'Conducted data analysis and visualization using Python and Jupyter notebooks to support ongoing research initiatives.',
      'Built automated data pipelines for processing and cleaning large datasets, improving research efficiency.',
      'Collaborated with researchers to present data-driven insights and contribute to lab publications.',
    ],
  },
  {
    role: 'Coding Instructor',
    company: 'Coding Mind Academy',
    period: '2024',
    type: 'Contract',
    description: [
      'Taught programming fundamentals including Python and game development using Pygame to students of varying skill levels.',
      'Designed interactive lesson plans and hands-on coding exercises to engage students and reinforce concepts.',
      'Mentored aspiring developers through project-based learning, guiding them from idea to implementation.',
    ],
  },
];

// ════════════════════════════════════════════════════════════════
// COMMAND PALETTE FILES
// ════════════════════════════════════════════════════════════════

export const paletteFiles = [
  { name: 'home.tsx',       dir: 'src/',  iconKey: 'tsx',  id: 'home' },
  { name: 'about.html',     dir: 'src/',  iconKey: 'html', id: 'about' },
  { name: 'projects.js',    dir: 'src/',  iconKey: 'js',   id: 'projects' },
  { name: 'skills.json',    dir: 'data/', iconKey: 'json', id: 'skills' },
  { name: 'experience.ts',  dir: 'src/',  iconKey: 'ts',   id: 'experience' },
  { name: 'contact.css',    dir: 'src/',  iconKey: 'css',  id: 'contact' },
  { name: 'README.md',      dir: './',    iconKey: 'md',   id: null },
];
