export const metadata = {
  title: "About",
  description: "About page for Swift Designs."
};

export default function Page() {
  return (
    <main>
      {/* HERO */}
      <header className="hero">
        <div className="container">
          <span className="badge">About</span>
          <h1>Corey Shamburger & Team</h1>
          <p style={{ color: "var(--muted)", maxWidth: 680 }}>
            Full-stack developer with 5+ years building elegant, user-friendly products.
            Passion for clean design, reliability, and results.
          </p>
        </div>
      </header>

      {/* SKILLS */}
      <section className="section">
        <div className="container grid cards">
          <article className="card"><h3>HTML/CSS</h3><p>95%</p></article>
          <article className="card"><h3>JavaScript</h3><p>90%</p></article>
          <article className="card"><h3>TypeScript</h3><p>85%</p></article>
          <article className="card"><h3>React</h3><p>75%</p></article>
          <article className="card"><h3>Vue</h3><p>70%</p></article>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about-area section-padding" id="about">
        <div className="container">

          {/* Corey */}
          <div className="row developer-profile">
            <div className="col-md-6 col-xs-12 col-sm-6">
              <div className="about-text-left">
                <h2>Corey Shamburger</h2>
                <h3>Full Stack Developer</h3>
                <p>
                  I am a passionate and dedicated web developer with over 5 years of experience in
                  creating stunning and user-friendly digital experiences. I turn ideas into
                  reality through code and clean design.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-xs-12 col-sm-6">
              <div className="about-photo">
                <img
                  src="/about/IMG_0082.jpg"
                  className="img-responsive about-portrait"
                  alt="Portrait of Corey Shamburger"
                  width="300"
                  height="400"
                  decoding="async"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>

          {/* Robert */}
          <div className="row developer-profile">
            <div className="col-md-6 col-xs-12 col-sm-6">
              <div className="about-text-left">
                <h2>Robert Harvey</h2>
                <h3>Full Stack Developer</h3>
                <p>
                  I'm a passionate Full-Stack Developer focused on modern technologies and bringing
                  fresh creativity to every project, contributing to Swift Designs’ mission of
                  delivering innovative digital solutions.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-xs-12 col-sm-6">
              <div className="about-photo">
                <img
                  src="/about/Robert.jpeg"
                  className="img-responsive about-portrait"
                  alt="Portrait of Robert Harvey"
                  width="300"
                  height="400"
                  decoding="async"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
