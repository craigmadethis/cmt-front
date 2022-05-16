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
  },
  i18n: {
    locales: ["en-GB"],
    defaultLocale: "en-GB",
    domains: [
      {
        domain: 'craigmadethis.com',
        defaultLocale: 'en-GB',
      },
    ],
  },
};

