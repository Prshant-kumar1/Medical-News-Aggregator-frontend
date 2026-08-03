/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.medicalnewstoday.com',
      },
      {
        protocol: 'https',
        hostname: '**.webmd.com',
      },
      {
        protocol: 'https',
        hostname: '**.healthline.com',
      },
      {
        protocol: 'https',
        hostname: '**.mayoclinic.org',
      },
      {
        protocol: 'https',
        hostname: '**.nih.gov',
      },
      {
        protocol: 'https',
        hostname: '**.health.harvard.edu',
      },
      {
        protocol: 'https',
        hostname: '**.cdc.gov',
      },
      {
        protocol: 'https',
        hostname: '**.who.int',
      },
      {
        protocol: 'https',
        hostname: '**.jamanetwork.com',
      },
      {
        protocol: 'https',
        hostname: '**.bmj.com',
      },
    ],
  },
}

module.exports = nextConfig
