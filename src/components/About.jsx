import Section from "./Section";
import "./About.css";
import {
  Briefcase,
  GraduationCap,
  Award,
  Compass,
  CheckCircle,
  Terminal,
  Cloud,
} from "lucide-react";

const FACTS = [
  {
    icon: Briefcase,
    label: "Experience",
    value: "3+ Years in Production Software & Infrastructure",
  },
  {
    icon: Compass,
    label: "Current Role",
    value: "Team Leader & Cloud Practitioner at Mydocin IT Solutions",
  },
  {
    icon: Cloud,
    label: "Core Specialization",
    value: "AWS, Kubernetes (EKS), Terraform, CI/CD & Microservices",
  },
  {
    icon: GraduationCap,
    label: "Education",
    value: "MBA (Manav Rachna University) & BSc Computer Science (MDU Rohtak)",
  },
  {
    icon: Award,
    label: "Certification",
    value: "Python Developer Certified · AWS Cloud Architecture Trainee",
  },
];

export default function About() {
  return (
    <Section
      id="about"
      tag="Background & Philosophy"
      title="Engineering Beyond the Application Layer"
      subtitle="From building high-concurrency healthcare applications to orchestrating scalable, zero-downtime cloud infrastructure."
    >
      <div className="about-grid">
        <div className="about-bio">
          <p className="about-paragraph">
            I began my engineering journey as a full-stack developer, building multi-role systems with Node.js, Express, MongoDB, and modern frontend frameworks. As a <strong>Team Leader at Mydocin IT Solutions</strong>, I led the technical development of <em>Mydoctorsportal.com</em> — a live healthcare platform serving thousands of patient appointments.
          </p>

          <p className="about-paragraph">
            Managing live production incidents made one thing crystal clear: <strong>software quality doesn&apos;t end when the code is committed</strong>. What matters most is how safely it gets released, how resilience is architected into the network and database tiers, and how quickly automated telemetry can detect and self-heal failures.
          </p>

          <p className="about-paragraph">
            That realization fueled my transition into <strong>Cloud Engineering &amp; DevOps</strong>. Today, I combine my software development background with deep cloud-native practices: provisioning immutable infrastructure with <strong>Terraform</strong>, orchestrating microservices on <strong>AWS EKS &amp; ECS</strong>, and designing declarative <strong>GitOps pipelines</strong> that eliminate human error.
          </p>

          <div className="about-highlights">
            <div className="about-highlight-item">
              <CheckCircle size={16} className="about-check" />
              <span>Developer-Centric Cloud: I understand application code and container networking deeply.</span>
            </div>
            <div className="about-highlight-item">
              <CheckCircle size={16} className="about-check" />
              <span>Immutable Infrastructure: 100% Terraform codified, zero manual AWS console drift.</span>
            </div>
            <div className="about-highlight-item">
              <CheckCircle size={16} className="about-check" />
              <span>Reliability Mindset: Multi-AZ failover, automated snapshots, and SLO-based alerting.</span>
            </div>
          </div>
        </div>

        {/* Facts & Credentials Side Card */}
        <div className="about-facts-card">
          <div className="about-facts-header">
            <Terminal size={18} className="about-facts-icon" />
            <span className="about-facts-title">Professional Snapshot</span>
          </div>

          <div className="about-facts-list">
            {FACTS.map((fact) => {
              const Icon = fact.icon;
              return (
                <div key={fact.label} className="about-fact-item">
                  <div className="about-fact-icon-wrapper">
                    <Icon size={16} />
                  </div>
                  <div className="about-fact-details">
                    <span className="about-fact-label">{fact.label}</span>
                    <span className="about-fact-value">{fact.value}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
