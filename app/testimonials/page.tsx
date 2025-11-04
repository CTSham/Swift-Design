export const metadata = {
  title: "Testimonials",
  description: "Testimonials page for Swift Designs."
};

export default function Page() {
  return (
    <main>
      
<header className="hero">
  <div className="container">
    <span className="badge">Testimonials</span>
    <h1>What Clients Say</h1>
  </div>
</header>
<section className="section">
  <div className="container grid cards">
    <article className="card">
      <p>“Working with Corey was a game‑changer. Clean, responsive code and delivered ahead of schedule.”</p>
      <strong>Angela Martinez</strong><br/><small>Project Manager, Construction Builders</small>
    </article>
    <article className="card">
      <p>“The Netflix Clone UI runs flawlessly on every device.”</p>
      <strong>Corey Shamburger</strong><br/><small>Owner, Netflix Clone</small>
    </article>
    <article className="card">
      <p>“Swift Design CRM transformed our operations — intuitive and powerful.”</p>
      <strong>John Smith</strong><br/><small>Lead Designer</small>
    </article>
  </div>
</section>

    </main>
  );
}