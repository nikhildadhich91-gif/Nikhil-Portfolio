# Next.js Development Cache Protection Rules

## Critical Rule: Preventing Blank Screens and 404 Static Chunk Errors
1. **DO NOT** run `npm run build` or `next build` while the development server (`npm run dev`) is running, or without cleaning the `.next` directory afterwards.
2. **Why**: Next.js production builds overwrite `.next` bundle outputs and corrupt webpack strategy cache files. This causes active development servers to serve outdated hash maps, resulting in `404` errors on client-side JS chunks (`main-app.js`, CSS) and rendering a blank unstyled fallback screen.
3. **Verification Guideline**: To check for compilation or TypeScript errors, rely on the console logs of the running `npm run dev` server (which compiles on-demand and prints all lint/type errors) instead of executing production builds.
