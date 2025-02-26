/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: process.env.SITE_URL || "https://filamuhub24.vercel.app",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: ["https://filamuhub24.vercel.app/server-sitemap.xml"],
  },
  exclude: ["/admin/*", "/private/*"],
};
