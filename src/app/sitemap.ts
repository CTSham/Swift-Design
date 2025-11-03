export default function robots(): { rules: { userAgent: string; allow: string }[]; sitemap?: string } {
    return {
        rules: [{ userAgent: '*', allow: '/' }],
        sitemap: 'https://www.swiftdesigns.studio/sitemap.xml',
    };
}
