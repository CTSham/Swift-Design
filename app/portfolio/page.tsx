export const metadata = {
  title: "Portfolio",
  description: "Portfolio page for Swift Designs."
};

export default function Page() {
  return (
    <main>
      
<header className="hero">
  <div className="container">
    <span className="badge">Portfolio</span>
    <h1>Selected Work</h1>
    <p style={{color:"var(--muted)", maxWidth:680}}>A few builds that showcase UI, performance, and polish.</p>
  </div>
</header>
<section className="section">
  <div className="container grid cards">
    <article className="card">
      <h3>Netflix Clone</h3>
      <p>Web app replicating Netflix’s UI. <a href="https://github.com/CTSham/Netflix-Clone.git" target="_blank" rel="noopener">View code</a></p>
    </article>
    <article className="card">
      <h3>Swift Design CRM</h3>
      <p>Custom CRM with React + Vite. <a href="https://github.com/CTSham/CRM-Site.git" target="_blank" rel="noopener">View code</a></p>
    </article>
    <article className="card">
      <h3>Construction</h3>
      <p>High‑converting contractor landing. <a href="https://github.com/CTSham/Construction.git" target="_blank" rel="noopener">View code</a></p>
    </article>
  </div>
</section>

    </main>
  );
}