import type { Metadata } from "next";
import "./../styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Luxury Creative Studio`,
    template: "%s — Swift Designs",
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — Luxury Creative Studio`,
    description: site.description,
    type: "website",
    url: site.url,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
        {/* GoHighLevel Chat Widget placeholder: paste your script below & set data attributes as needed */}
        {/* <script dangerouslySetInnerHTML={{__html: `/* GHL widget code here */`}} /> */}
      </body>
    </html>
  );
}