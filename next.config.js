/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "variables.scss";`
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.coingecko.com',
      }
    ]
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/bitcoin',
  //       permanent: true,
  //     },
  //   ];
  // },
}

module.exports = nextConfig
