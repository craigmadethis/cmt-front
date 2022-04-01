module.exports = {
  images: {
    domains: ["res.cloudinary.com", "localhost"],
  },
  async redirects() {
    return [
      {
      source: '/',
      destination: '/blog/1',
      permanent: true,
      },
      {
      source: '/blog',
      destination: '/blog/1',
      permanent: true,
      }
    ]
  }
};

