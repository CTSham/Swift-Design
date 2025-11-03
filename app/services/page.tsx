export const metadata = {
  title: "Services",
  description: "Services page for Swift Designs."
};

export default function Page() {
  return (
    <main>
      
<header className="hero">
  <div className="container">
    <span className="badge">Services</span>
    <h1>What We Offer</h1>
    <p style={{color:"var(--muted)", maxWidth:680}}>From concept to launch — web design, development, optimization, and ongoing support.</p>
  </div>
</header>
<section className="section">
  <div className="container grid cards">
    <article className="card"><h3>Web Design</h3><p>Responsive, accessible, conversion‑focused.</p></article>
    <article className="card"><h3>Frontend Development</h3><p>SPA/SSR with React/Next.js, Tailwind, Radix UI.</p></article>
    <article className="card"><h3>Performance</h3><p>Speed budgets, CWV, caching, image pipelines.</p></article>
    <article className="card"><h3>App Development</h3><p>Cross‑platform with modern tooling.</p></article>
    <article className="card"><h3>Automation</h3><p>Integrate forms, email, CRM (GoHighLevel).</p></article>
    <article className="card"><h3>Consulting</h3><p>Discovery, audits, and brand/tech strategy.</p></article>
  </div>
</section>

    </main>
  );
}