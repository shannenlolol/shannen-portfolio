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

- `/` - illustrated cottage homepage, interactive garden robot, time-of-day slider, skills, and contact links.
- `/experiences` - work experience overview.
- `/experiences/:slug` - individual role details.
- `/projects` - project descriptions and external demo/source links.
- `/skills` - garden-style toolkit grouped by purpose.
- `/education` - education, AWS certification, and original education images.
- `/contact` - contact form and submission confirmation.

The cottage homepage is adapted from the supplied HTML reference in `src/cottage/`: `home.html` contains the markup, `cottage.css` the styles, and `scene.js` the interactive SVG/canvas scene. `CottageHome` mounts this scene inside the shared React router, and its CSS is scoped to the garden. Scene listeners, timers, observers, and animation frames are cleaned up on departure.

Experience and project content lives in `src/data/`. Components are in `src/components/`; base layout styles are in `src/index.css`, and the shared cottage theme for inner pages is in `src/cottage/pages.css`. Public images, company logos, and the resume are under `public/assets/`.

`vercel.json` rewrites the dedicated page URLs to the React entry point so direct links and refreshes work on Vercel. Other hosts need equivalent SPA routing rules.

## Contact form

The form submits through FormSubmit to the email configured in `src/components/ContactPage.tsx`. The recipient must activate the form using FormSubmit’s confirmation email after its first submission. Submissions may include a spam check, then return to `/contact?sent=1` on the same origin.

Build and lint checks do not verify email delivery; test delivery separately after deployment and recipient activation.

## Time of day

The navbar dropdown and homepage slider share `src/cottage/timeOfDay.ts`. The exact time value is saved locally as `sl-tod` and restored on every page, refresh, and history return. Both controls update together; inner-page skies and surfaces use the same palette as the garden. If browser storage is unavailable, the controls still work for the current page. The dropdown supports its slider, Day/Sunset/Night presets, outside-click dismissal, and Escape to return focus to its button.

The footer is shared across all routes: edit `src/cottage/footer.html` for its content and `src/cottage/footer.css` for its styling. `footer.ts` fills the current year; both the homepage and the React `Footer` render that same markup.

## Horizontal world navigation

The strip order is defined in `src/cottage/worldRoutes.ts`: Resume → Education → Projects → Signpost → Experience → Skills → Contact. Links, arrow keys, mobile swipes, and browser history all use that order. Travel lasts 700 ms, with a 180 ms crossfade for reduced motion; focus moves to the incoming heading on arrival. Keyboard navigation ignores form fields, links, buttons, and the time slider. Swipes require a predominantly horizontal gesture away from interactive controls.

`/resume` is an in-world page with a PDF preview plus open/download links. Each inner page has a wooden return plank pointing toward the signpost. The shared header and footer stay outside the transition, while background layers move at different speeds. Experience details occupy the Experience position; transitions within that position crossfade.
