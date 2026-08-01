# Peter Nguyen — VS Code Portfolio

A personal developer portfolio built with React + Vite, styled to look and feel like Visual Studio Code. Features a file explorer sidebar, tabbed navigation, command palette, and a code-editor aesthetic throughout.

## Tech Stack

- React 18
- Vite 5
- Vanilla CSS with CSS Variables
- Google Fonts (Outfit, JetBrains Mono, DM Sans)
- GitHub Pages for hosting

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deploying to GitHub Pages

This project includes a GitHub Actions workflow that auto-deploys on every push to `main`.

### First-time setup

1. Create a new repository on GitHub called `peter-portfolio`

2. Initialize and push your code:
```bash
cd peter-portfolio
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/peter-portfolio.git
git push -u origin main
```

3. Enable GitHub Pages in your repo settings:
   - Go to Settings > Pages
   - Under "Source", select "GitHub Actions"
   - The workflow will run automatically on your next push

4. Your site will be live at: `https://YOUR_USERNAME.github.io/peter-portfolio/`

### Important: Update the base path

In `vite.config.js`, the `base` property must match your repository name:

```js
base: '/peter-portfolio/',
```

If you rename the repo, update this value to match.

## Customizing

All personal data lives in `src/data/portfolioData.js`. Edit that single file to update your name, projects, skills, experience, and social links. No need to touch any component files unless you want to change the layout or styling.

## Project Structure

```
src/
├── components/       # VS Code shell (sidebar, tabs, status bar, etc.)
├── pages/            # Content for each "file" tab
├── data/             # All personal info in one place
├── styles/           # Global CSS variables and resets
├── App.jsx           # Main app with state management
└── main.jsx          # React entry point
```

## License

MIT
