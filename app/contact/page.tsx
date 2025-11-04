export const metadata = {
  title: "Contact",
  description: "Contact page for Swift Designs."
};

export default function Page() {
  return (
    <main>
      
<header className="hero">
  <div className="container">
    <span className="badge">Contact</span>
    <h1>Let’s Build Something Great</h1>
    <p style={{color:"var(--muted)", maxWidth:680}}>Tell us about your project and we’ll reply within 1 business day.</p>
  </div>
</header>
<section className="section">
  <div className="container">
    <form className="card" action="https://formspree.io/f/xbllpvgv" method="POST">
      <div style={{display:"grid", gap:12, gridTemplateColumns:"repeat(2,1fr)"}}>
        <label>Full Name<br/><input required name="name" placeholder="Your name" style={{width:"100%",padding:12,borderRadius:10,border:"1px solid #2a2a2a",background:"#0f0f0f",color:"var(--text)"}} /></label>
        <label>Email<br/><input required type="email" name="email" placeholder="you@example.com" style={{width:"100%",padding:12,borderRadius:10,border:"1px solid #2a2a2a",background:"#0f0f0f",color:"var(--text)"}} /></label>
      </div>
      <label style={{display:"block",marginTop:12}}>Project Budget<br/>
        <select name="budget" style={{width:"100%",padding:12,borderRadius:10,border:"1px solid #2a2a2a",background:"#0f0f0f",color:"var(--text)"}}>
          <option value="Under $2k">Under $2k</option>
          <option value="$2k–$5k">$2k–$5k</option>
          <option value="$5k–$10k">$5k–$10k</option>
          <option value="$10k+">$10k+</option>
        </select>
      </label>
      <label style={{display:"block",marginTop:12}}>Message<br/>
        <textarea required name="message" rows={6} placeholder="What are you building?" style={{width:"100%",padding:12,borderRadius:10,border:"1px solid #2a2a2a",background:"#0f0f0f",color:"var(--text)"}} />
      </label>
      <div className="cta">
        <button className="btn" type="submit">Send Message</button>
        <a className="btn secondary" href="mailto:info@swiftdesigns.studio">Email Us</a>
      </div>
      <p style={{color:"#888",marginTop:8}}>By submitting, you agree to our privacy policy.</p>
    </form>
    <div style={{marginTop:18,color:"#aaa"}}>
      <strong>San Diego</strong> • 4227 49TH Street Unit 2, San Diego, CA 92115 • (619) 797‑0843
    </div>
  </div>
</section>

    </main>
  );
}