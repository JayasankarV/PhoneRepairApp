import withPWA from 'next-pwa'

const nextConfig = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development'
})({
  // Your existing Next.js config
});

export default nextConfig;