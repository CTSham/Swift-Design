// next.config.ts
import type { NextConfig } from 'next';

const config: NextConfig = {
  turbopack: { root: '.' } // 👈 pin the real root
};

export default config;
// --- IGNORE ---