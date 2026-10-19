import { useState } from "react";
import Section from "./Section";
import "./Contact.css";
import {
  Mail,
  Copy,
  Check,
  MapPin,
  Send,
  Calendar,
  Sparkles,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "Cloud Migration / DevOps", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const emailAddress = "rahul.clouddevops@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "Cloud Migration / DevOps", message: "" });
    }, 4000);
  };

  return (
    <Section
      id="contact"
      tag="Get in Touch"
      title="Let's Build Resilient Cloud Systems"
      subtitle="Looking for a Cloud / DevOps Engineer who bridges full-stack engineering with modern cloud infrastructure? Let's connect."
    >
      <div className="contact-grid">
        {/* Contact Info & Channels */}
        <div className="contact-info">
          <div className="contact-status-card">
            <div className="contact-status-indicator">
              <span className="contact-status-ping" />
              <span className="contact-status-dot" />
            </div>
            <div>
              <h4 className="contact-status-title">Currently Open for Opportunities</h4>
              <p className="contact-status-desc">
                Available for full-time Cloud Engineer, DevOps Engineer, or Platform Engineering roles.
              </p>
            </div>
          </div>

          {/* Quick Copy Email Box */}
          <div className="contact-email-box">
            <div className="contact-email-meta">
              <Mail size={18} className="contact-email-icon" />
              <div>
                <span className="contact-email-label">Direct Email</span>
                <p className="contact-email-text">{emailAddress}</p>
              </div>
            </div>
            <button
              type="button"
              className={`btn btn--sm ${copied ? "btn--primary" : "btn--secondary"} contact-copy-btn`}
              onClick={handleCopyEmail}
            >
              {copied ? (
                <>
                  <Check size={14} />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Detail Cards */}
          <div className="contact-cards">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="contact-card"
            >
              <GithubIcon size={20} className="contact-card__icon" />
              <div>
                <h4 className="contact-card__title">GitHub Profile</h4>
                <p className="contact-card__sub">View IaC, Terraform, & Kubernetes repos</p>
              </div>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="contact-card"
            >
              <LinkedinIcon size={20} className="contact-card__icon" />
              <div>
                <h4 className="contact-card__title">LinkedIn Network</h4>
                <p className="contact-card__sub">Connect professionally</p>
              </div>
            </a>

            <div className="contact-card">
              <MapPin size={20} className="contact-card__icon" />
              <div>
                <h4 className="contact-card__title">Location</h4>
                <p className="contact-card__sub">Faridabad / Delhi NCR, India (Open to Remote)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Contact Form */}
        <div className="contact-form-wrapper">
          {submitted ? (
            <div className="contact-success">
              <div className="contact-success-icon">
                <Sparkles size={28} />
              </div>
              <h3>Message Received!</h3>
              <p>
                Thank you, <strong>{formData.name || "there"}</strong>! Your message has been noted. I will reply to <strong>{formData.email}</strong> shortly.
              </p>
              <button
                type="button"
                className="btn btn--secondary btn--sm"
                onClick={() => setSubmitted(false)}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <h3 className="contact-form__title">Send a Message</h3>

              <div className="contact-form__group">
                <label htmlFor="name">Your Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="e.g. Alex Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="contact-form__group">
                <label htmlFor="email">Work Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="contact-form__group">
                <label htmlFor="subject">Subject / Inquiry Type</label>
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                >
                  <option value="Cloud Migration / DevOps">Cloud Migration / DevOps Opportunity</option>
                  <option value="Kubernetes & GitOps">Kubernetes / EKS Deployment</option>
                  <option value="Terraform & IaC">Terraform & AWS Architecture</option>
                  <option value="Full Time Role">Full Time Cloud / DevOps Role</option>
                  <option value="General Discussion">General Discussion</option>
                </select>
              </div>

              <div className="contact-form__group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="Tell me about the role, project, or infrastructure requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn--primary contact-submit-btn">
                <Send size={16} />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}
