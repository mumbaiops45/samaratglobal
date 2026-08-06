/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  distDir: 'out',  // Add this line
  basePath: '/samaratglobal',  // Add this line
  assetPrefix: '/samaratglobal/',  // Add this line
};

export default nextConfig;