/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "variables.scss";`
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/bitcoin',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
