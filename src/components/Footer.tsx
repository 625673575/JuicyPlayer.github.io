export default function Footer() {
  return (
    <footer>
      <div className="container footer-inner">
        <div className="footer-brand">
          <svg className="footer-logo" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" stroke="var(--accent)" strokeWidth="2" />
            <circle cx="16" cy="16" r="6" fill="var(--accent)" />
          </svg>
          <span>Juicy Player</span>
        </div>
        <nav className="footer-legal">
          <a href="terms.html" data-i18n="footerTerms">Terms</a>
          <a href="privacy.html" data-i18n="footerPrivacy">Privacy</a>
          <a href="remoter-privacy.html" data-i18n="footerPrivacyRemoter">Remoter Privacy</a>
          <a href="mailto:hifior@foxmail.com" data-i18n="footerContact">Contact</a>
        </nav>
      </div>
      <div className="container footer-meta">
        <p>
          &copy; 2026 Juicy Player. <span data-i18n="footerRights">All rights reserved.</span>
        </p>
        <p className="footer-powered">
          Powered by <span data-i18n="footerPoweredBrand">Juicy Player</span>
        </p>
      </div>
    </footer>
  )
}
