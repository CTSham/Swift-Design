export const metadata = {
  title: "About",
  description: "About page for Swift Designs."
};

export default function Page() {
  return (
    <main>
      
<header className="hero">
  <div className="container">
    <span className="badge">About</span>
    <h1>Corey Shamburger &amp; Team</h1>
    <p style={{color:"var(--muted)", maxWidth:680}}>Full‑stack developer with 5+ years building elegant, user‑friendly products. Passion for clean design, reliability, and results.</p>
  </div>
</header>
<section className="section">
  <div className="container grid cards">
    <article className="card"><h3>HTML/CSS</h3><p>95%</p></article>
    <article className="card"><h3>JavaScript</h3><p>90%</p></article>
    <article className="card"><h3>TypeScript</h3><p>85%</p></article>
    <article className="card"><h3>React</h3><p>75%</p></article>
    <article className="card"><h3>Vue</h3><p>70%</p></article>
  </div>
</section>

    </main>
  );
}