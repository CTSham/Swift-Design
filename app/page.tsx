export const metadata = {
  title: "Home",
  description: "Home page for Swift Designs."
};

export default function Page() {
  return (
    <main>
      
<header className="hero">
  <div className="container">
    <span className="badge">Full‑Stack Development • UI/UX • Automation</span>
    <h1>We craft premium digital experiences — <span style={{color:"var(--gold)"}}>Swift</span>, modern, and built to convert.</h1>
    <p style={{color:"var(--muted)", maxWidth:680}}>Keep your current black + gold aesthetic while upgrading to a clean multi‑page structure. Lightning‑fast, responsive, and SEO‑ready.</p>
    <div className="cta">
      <a className="btn" href="/contact">Get a Quote</a>
      <a className="btn secondary" href="/portfolio">See Work</a>
    </div>
  </div>
</header>
<section className="section">
  <div className="container kpis">
    <div className="kpi"><div className="num">3,015+</div><div className="label">Hours Worked</div></div>
    <div className="kpi"><div className="num">6,589+</div><div className="label">Lines of Code</div></div>
    <div className="kpi"><div className="num">723</div><div className="label">Happy Customers*</div></div>
    <div className="kpi"><div className="num">43</div><div className="label">Awards Won</div></div>
  </div>
</section>

    </main>
  );
}