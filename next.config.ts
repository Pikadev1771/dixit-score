import type { NextConfig } from 'next';
// @ts-expect-error - next-pwa types not available
import withPWA from 'next-pwa';

const nextConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
}) as NextConfig;

export default nextConfig;
