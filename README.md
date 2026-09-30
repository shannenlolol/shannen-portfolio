# Shannen Lee’s portfolio

A responsive portfolio built with React, TypeScript, and Vite, with custom CSS, persistent light/dark themes, and reduced-motion support.

[View the live portfolio](https://shannen-portfolio-sandy.vercel.app/)

## Local development

```sh
npm ci
npm run dev
```

## Checks and production build

```sh
npm run lint
npm run build
npm run preview
```

The production build is written to `dist/`.

## Pages and content

- `/` — introduction and short previews of experience, projects, skills, and education.
- `/experience` — work experience overview.
- `/experience/:slug` — individual role details.
- `/projects` — project descriptions and external demo/source links.
- `/skills` — terminal-style skills list.
- `/education` — education, AWS certification, and original education images.
- `/contact` — contact form and submission confirmation.

Experience and project content lives in `src/data/`. Components are in `src/components/`; shared styles and theme variables are in `src/index.css`. Public images, company logos, and the résumé are under `public/assets/`.

`vercel.json` rewrites the dedicated page URLs to the React entry point so direct links and refreshes work on Vercel. Other hosts need equivalent SPA routing rules.

## Contact form

The form submits through FormSubmit to the email configured in `src/components/ContactPage.tsx`. The recipient must activate the form using FormSubmit’s confirmation email after its first submission. Submissions may include a spam check, then return to `/contact?sent=1` on the same origin.

Build and lint checks do not verify email delivery; test delivery separately after deployment and recipient activation.
