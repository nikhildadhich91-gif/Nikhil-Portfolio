/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizeFonts: false,
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/#about",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/#contact",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/#services",
        permanent: true,
      },
      {
        source: "/services/:slug",
        destination: "/#services",
        permanent: true,
      },
      {
        source: "/work",
        destination: "/#work",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
