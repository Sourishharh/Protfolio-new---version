# Sourish Harh — Personal Portfolio

A modern, fully responsive personal portfolio built with React + Vite, Tailwind CSS, and Framer Motion.

## ✅ Prerequisites

Make sure you have installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## 🚀 Getting Started

### 1. Install dependencies

Open a terminal in this folder and run:

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

Then open your browser and go to: **http://localhost:3000**

### 3. Build for production

```bash
npm run build
```

The built files will be in the `dist/` folder. You can deploy them to any static hosting (Netlify, Vercel, GitHub Pages, etc.).

### 4. Preview the production build locally

```bash
npm run preview
```

## 📁 Project Structure

```
portfolio/
├── public/
│   └── resume.pdf          ← Your resume (replace with latest)
├── src/
│   ├── components/
│   │   ├── Chatbot.tsx     ← AI portfolio chatbot
│   │   ├── Navbar.tsx      ← Sticky navigation bar
│   │   └── ParticleBackground.tsx ← Animated canvas particles
│   ├── hooks/
│   │   ├── useInView.ts    ← Scroll-triggered animation hook
│   │   └── useTypewriter.ts ← Typewriter effect hook
│   ├── sections/
│   │   ├── Hero.tsx        ← Home / hero section
│   │   ├── About.tsx       ← About me section
│   │   ├── Skills.tsx      ← Skills with progress bars
│   │   ├── Projects.tsx    ← Project cards
│   │   ├── Contact.tsx     ← Contact form + social links
│   │   └── Footer.tsx      ← Footer
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css           ← Tailwind CSS + custom styles
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## 🔧 Customization

- **Resume:** Replace `public/resume.pdf` with your updated resume
- **GitHub link:** Search for `github.com/Sourishharh` to update
- **LinkedIn:** Search for `sourish-harh-86298124b` to update
- **Email:** Update in `src/sections/Contact.tsx`
- **Projects:** Edit the `projects` array in `src/sections/Projects.tsx`
- **Skills:** Edit the `skills` array in `src/sections/Skills.tsx`
- **Typing roles:** Edit the `roles` array in `src/sections/Hero.tsx`
- **Chatbot answers:** Edit `KNOWLEDGE` array in `src/components/Chatbot.tsx`

## 🛠 Tech Stack

- **React 19** + **Vite 6**
- **Tailwind CSS v4**
- **Framer Motion** — animations
- **React Icons** — icon sets
- **TypeScript**
