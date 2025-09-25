// pages/sitemap.xml.js
export async function getServerSideProps({ res }) {
  // List your static pages
  const staticPages = [
    { url: "https://codebycorey.dev/", priority: 1.0, changefreq: "weekly" },
    { url: "https://codebycorey.dev/about", priority: 0.8, changefreq: "monthly" },
    { url: "https://codebycorey.dev/projects", priority: 0.9, changefreq: "weekly" },
    { url: "https://codebycorey.dev/blog", priority: 0.7, changefreq: "daily" },
    { url: "https://codebycorey.dev/contact", priority: 0.6, changefreq: "monthly" }
  ];

  // Example: If you fetch blog posts or projects dynamically, add them here
  // let posts = await fetch("https://codebycorey.dev/api/posts").then(res => res.json());
  // posts = posts.map(post => ({
  //   url: `https://codebycorey.dev/blog/${post.slug}`,
  //   priority: 0.6,
  //   changefreq: "weekly"
  // }));

  const urls = [...staticPages /*, ...posts */]
    .map(page => `
      <url>
        <loc>${page.url}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
      </url>
    `)
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls}
    </urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
