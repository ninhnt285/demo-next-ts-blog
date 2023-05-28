/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/login',
        destination: '/auth/login'
      },
      {
        source: '/register',
        destination: '/auth/register'
      }
    ]
  }
}

module.exports = nextConfig
