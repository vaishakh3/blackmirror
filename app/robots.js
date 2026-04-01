export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://blackmirror.studio/sitemap.xml",
    host: "https://blackmirror.studio",
  };
}
