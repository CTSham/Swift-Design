"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
  { href: "/getEstimate", label: "Get Estimate" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="nav">
      <div className="container inner">
        <div className="brand">
          <div className="logo" aria-hidden="true" />
          <div className="name">Swift&nbsp;Designs</div>
        </div>
        <ul>
          {links.map(l => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link className={active ? "active" : ""} href={l.href}>{l.label}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}