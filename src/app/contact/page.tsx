import "./contact.css";

export default function ContactPage() {
  return (
    <main className="contact-page page-container">
      <div className="contact-layout">
        {/* LEFT TITLE */}
        <div className="contact-left">
          <h1 className="contact-title">Contact Us</h1>
        </div>

        {/* RIGHT FORM */}
        <div className="contact-right">
          <p className="contact-intro contact-intro-bold">Have a question or enquiry?</p>
          <p className="contact-intro contact-intro-bottom">Get in touch and we’ll get back to you soon.</p>

          <form className="contact-form">
            <div className="contact-row">
              <input type="text" placeholder="NAME" />
              <input type="text" placeholder="PHONE" />
            </div>

            <input type="email" placeholder="EMAIL" />

            <textarea placeholder="MESSAGE" rows={10} />

            <button type="submit" className="contact-submit">
              SEND
            </button>
          </form>

          <div className="contact-footer">
            <a href="mailto:create@mashistore.com" className="footer-item">
              <span className="contact-bold footer-label">EMAIL:</span>
              <span className="footer-value"> create@mashistore.com</span>
            </a>

            <a href="tel:+917034885119" className="footer-item">
              <span className="contact-bold footer-label">PHONE:</span>
              <span className="footer-value"> +91 70348 85119</span>
            </a>

            <a
              href="https://www.instagram.com/mashiartstore?igsh=Zzg5NW8xaG1rcGVs&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-bold footer-instagram"
            >
              INSTAGRAM
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}




