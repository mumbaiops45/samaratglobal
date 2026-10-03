// One codebase, two hosts:
//  - Vercel (VERCEL=1 during its builds) and `npm run dev` run Node.js.
//  - Every other `npm run build` makes the static export in ./out for Hostinger
//    web hosting (static files, no Node.js).
// The forms send through EmailJS from the browser, so they work on both.
const nodeServer =
  process.env.VERCEL === "1" || process.env.NODE_ENV === "development";

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(nodeServer ? {} : { output: "export" }),
  // Emit /service/index.html instead of service.html beside a service/ folder;
  // otherwise Hostinger redirects /service to the folder and answers 403.
  trailingSlash: true,
  reactCompiler: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
