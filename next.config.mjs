// next.config.mjs
/** @type {import('next').NextConfig} */
const config = {
    experimental: { reactCompiler: true },
    turbopack: { root: '.' } // 👈 pin the real root (this folder)
};

export default config;

