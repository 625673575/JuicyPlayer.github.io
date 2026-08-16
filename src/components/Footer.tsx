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
        <p>
          &copy; 2026 Juicy Player. <span data-i18n="footerRights">All rights reserved.</span>
        </p>
        <div className="footer-links">
          <a
            href="https://github.com/625673575/JuicyPlayer.github.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
