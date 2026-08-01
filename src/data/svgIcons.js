/* ════════════════════════════════════════════════════════════════
   svgIcons.js — Maps string keys to @thesvg/react components

   HOW TO ADD A NEW ICON:
   1. Browse https://thesvg.org to find the component name
   2. Import it below
   3. Add a camelCase key to iconMap
   4. Use that key as logoKey in portfolioData.js

   Component usage:
     const IconComponent = iconMap['react'];
     <IconComponent size={18} />
   ════════════════════════════════════════════════════════════════ */

import {
  // Social / Platform
  Github,
  Linkedin,
  Leetcode,
  Gmail,
  Medium,
  Youtube,
  Instagram,
  X,

  // Languages
  Javascript,
  Typescript,
  Python,
  Java,
  Cplusplus,
  Dart,
  Sqlite,

  // Frontend
  React as ReactIcon,
  Html5,
  Css,
  TailwindCss,
  Nextdotjs,
  Flutter,

  // Backend
  Nodedotjs,
  Express,
  Firebase,
  Postgresql,

  // Data / ML
  Tensorflow,
  Numpy,
  Pandas,
  ScikitLearn,
  Jupyter,

  // Tools
  Selenium,
  Docker,
  Linux,
  Git,
  Vercel,

  // Other
  RiotGames,
  Gemini,
  Markdown,
  Claude,
} from '@thesvg/react';

const iconMap = {
  // ─── Social ───
  github: Github,
  linkedin: Linkedin,
  leetcode: Leetcode,
  email: Gmail,
  medium: Medium,
  youtube: Youtube,
  instagram: Instagram,
  twitter: X,

  // ─── Languages ───
  javascript: Javascript,
  typescript: Typescript,
  python: Python,
  java: Java,
  cpp: Cplusplus,
  dart: Dart,
  sql: Sqlite,

  // ─── Frontend ───
  react: ReactIcon,
  html: Html5,
  css: Css,
  tailwindcss: TailwindCss,
  nextjs: Nextdotjs,
  flutter: Flutter,

  // ─── Backend ───
  nodejs: Nodedotjs,
  express: Express,
  firebase: Firebase,
  postgresql: Postgresql,

  // ─── Data / ML ───
  tensorflow: Tensorflow,
  numpy: Numpy,
  pandas: Pandas,
  scikitlearn: ScikitLearn,
  jupyter: Jupyter,
  matplotlib: null,

  // ─── Tools ───
  selenium: Selenium,
  docker: Docker,
  linux: Linux,
  git: Git,
  vercel: Vercel,

  // ─── Project-specific ───
  riotapi: RiotGames,
  googleai: Gemini,
  claude: Claude,

  // ─── File types (sidebar & tabs) ───
  tsx: ReactIcon,
  js: Javascript,
  ts: Typescript,
  json: Nodedotjs,
  md: Markdown,
  pdf: null,
};

export default iconMap;
