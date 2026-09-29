// One codebase, two hosts:
//  - Vercel (VERCEL=1 during its builds) and `npm run dev` run Node.js, so the
//    forms post to the Next.js route src/app/api/contact/route.js.
//  - Every other `npm run build` makes the static export in ./out for Hostinger
//    web hosting (static files + PHP, no Node.js); the forms post to
//    public/contact-mail.php instead.
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
  env: {
    NEXT_PUBLIC_CONTACT_ENDPOINT: nodeServer ? "/api/contact/" : "/contact-mail.php",
  },
};

export default nextConfig;
