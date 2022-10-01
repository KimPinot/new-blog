function getExcludedConsole() {
  const excluded = ["error"];

  if (!production) {
    excluded.push("log");
    excluded.push("warn");
    excluded.push("dir");
    excluded.push("info");
    excluded.push("debug");
  }

  return excluded;
}

const production = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: {
      exclude: getExcludedConsole(),
    },
  },
  images: {
    loader: "custom",
  },
  env: {
    production,
  },
  experimental: {
    swcPlugins: [["next-superjson-plugin", { excluded: [] }]],
  },
  rewrites: async () => [
    {
      source: "/notes",
      destination: "/notes/index",
    },
  ],
  i18n: {
    locales: ["ko"],
    defaultLocale: "ko",
  },
};

module.exports = nextConfig;
