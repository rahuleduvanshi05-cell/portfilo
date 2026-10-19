import "./Footer.css";
import { Cloud, ArrowUp, Mail, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__brand-header">
              <div className="footer__brand-icon">
                <Cloud size={18} />
              </div>
              <span className="footer__brand-title">Rahul &bull; Cloud Engineer</span>
            </div>
            <p className="footer__brand-desc">
              Building resilient, automated, and observable cloud infrastructures across AWS and Kubernetes.
            </p>
          </div>

          <div className="footer__status-box">
            <div className="footer__status-header">
              <span className="footer__status-dot" />
              <span className="footer__status-text">Infrastructure Status: 99.99% Operational</span>
            </div>
            <p className="footer__status-sub">AWS Region: ap-south-1 &amp; us-east-1</p>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            &copy; {new Date().getFullYear()} Rahul. Designed with modern Cloud &amp; DevOps standards.
          </p>

          <div className="footer__socials">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="footer__social-link"
              aria-label="GitHub"
            >
              <GithubIcon size={17} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="footer__social-link"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={17} />
            </a>
            <a
              href="mailto:rahul.clouddevops@gmail.com"
              className="footer__social-link"
              aria-label="Email"
            >
              <Mail size={17} />
            </a>

            <button
              type="button"
              className="footer__top-btn"
              onClick={scrollToTop}
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
