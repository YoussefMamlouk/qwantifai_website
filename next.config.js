/** @type {import('next').NextConfig} */
// Check if we're building (not running dev server)
const isBuilding = process.argv.includes('build') || process.env.npm_lifecycle_event === 'build';

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Only use static export and custom distDir for builds, not dev mode
  // Dev server requires default .next directory and cannot use output: 'export'
  ...(isBuilding ? {
    output: 'export',
  } : {}),
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
};

module.exports = nextConfig; 