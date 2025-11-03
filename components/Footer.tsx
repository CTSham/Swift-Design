import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container grid">
        <div>
          <h3 style={{margin:"0 0 8px", color:"var(--gold)"}}>Swift Designs</h3>
          <p>Luxury creative studio in San Diego, CA — black & gold aesthetic. We build modern, performant websites and digital products.</p>
          <small>&copy; {new Date().getFullYear()} Swift Designs. All rights reserved.</small>
        </div>
        <div>
          <p><strong>Contact</strong><br/>
            <a href={`mailto:${site.links.email}`}>{site.links.email}</a><br/>
            {site.links.phone}<br/>
            {site.links.address}
          </p>
        </div>
      </div>
    </footer>
  );
}