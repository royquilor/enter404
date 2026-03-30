// ESLint 9 flat config; Next.js 16 removed `next lint` — use `pnpm lint` → `eslint .`
// https://nextjs.org/docs/app/api-reference/config/eslint
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const config = [...nextCoreWebVitals];

export default config;
