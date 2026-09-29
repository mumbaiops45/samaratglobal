/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactCompiler: true,
  // No static export: /api/contact is a server route that sends mail over SMTP,
  // so the site must run on a Node.js host (Vercel, or Node.js hosting on Hostinger/GoDaddy).
  images: {
    unoptimized: true,
  },
};

export default nextConfig;