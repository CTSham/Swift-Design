import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.swiftdesigns.studio";
  return [
    { url: `${base}/`, priority: 1.0 },
    { url: `${base}/about` },
    { url: `${base}/services` },
    { url: `${base}/portfolio` },
    { url: `${base}/testimonials` },
    { url: `${base}/contact` },
  ];
}